import { NextRequest, NextResponse } from "next/server"

// HuggingFace API configuration
const HUGGINGFACE_API_URL =
    "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium"

const HF_TOKEN = process.env.HUGGINGFACE_TOKEN;


// === SYSTEM PROMPT — Controls Chatbot Behavior ===
const TAKSILA_SYSTEM_PROMPT = `
You are Taksila AI Assistant — an expert numismatics consultant for Taksila Coins (https://taksila-nu.vercel.app).

Your ONLY job is to provide:
- Coin investment guidance (PKR + USD)
- Beginner coin collecting guidance
- Portfolio recommendations (Beginner, Growth, High-Value)
- Coin grading, rarity, appraisal advice
- Help related to auctions, appraisal, authentication & storage
- Help about services/pages on Taksila Coins

You MUST NOT reply outside numismatics or Taksila Coins.

When a beginner asks:
• Ask budget (PKR + USD)
• Ask risk level
• Suggest a portfolio
• Explain why
• Recommend 3–5 coin categories
• Give PKR + USD ROI examples
• Provide next steps using Taksila services

Off topic reply:
"I am trained only for numismatics, coin investment, and Taksila Coins services."
`

// === RELEVANCY CHECK ===
function isTaksilaRelevant(message: string) {
    const lower = message.toLowerCase()
    const keywords = [
        "coin", "coins", "numismatic", "numismatics", "grading",
        "grade", "appraisal", "appraise", "ancient", "historic",
        "auction", "bid", "taksila", "collection", "collect",
        "currency", "mint", "rare", "value", "worth", "identify",
        "authentication", "storage", "investment", "portfolio",
        "budget", "risk", "pkr", "pakistan", "market", "sell",
        "buy", "purchase", "return", "roi", "usd", "dollar"
    ]
    return keywords.some(k => lower.includes(k)) || lower.includes("taksila")
}

// === STREAM RESPONSE (SSE) ===
function streamResponse(text: string) {
    const encoder = new TextEncoder()

    const stream = new ReadableStream({
        async start(controller) {
            try {
                const chars = text.split("")
                for (const ch of chars) {
                    controller.enqueue(
                        encoder.encode(`data: ${JSON.stringify({ content: ch })}\n\n`)
                    )
                    await new Promise(res => setTimeout(res, 15))
                }
                controller.enqueue(encoder.encode("data: [DONE]\n\n"))
                controller.close()
            } catch {
                controller.close()
            }
        },
    })

    return new NextResponse(stream, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
            "Access-Control-Allow-Origin": "*",
        },
    })
}

// =========================
//         MAIN POST
// =========================
export async function POST(request: NextRequest) {
    try {
        const { message } = await request.json()

        if (!message) {
            return NextResponse.json({ error: "Message required" }, { status: 400 })
        }

        // OFF TOPIC BLOCK
        if (!isTaksilaRelevant(message)) {
            return streamResponse(
                "I am trained only for numismatics, coin investment, and Taksila Coins services."
            )
        }

        // =========================
        //  Try HuggingFace First
        // =========================
        try {
            const hfRes = await fetch(HUGGINGFACE_API_URL, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${HF_TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    inputs: `${TAKSILA_SYSTEM_PROMPT}\nUser: ${message}\nAssistant:`,
                    parameters: {
                        max_length: 350,
                        temperature: 0.7,
                        top_p: 0.9,
                        do_sample: true,
                        return_full_text: false,
                    },
                }),
            })

            if (hfRes.ok) {
                const data = await hfRes.json()
                const output =
                    Array.isArray(data) &&
                        data[0] &&
                        typeof data[0].generated_text === "string"
                        ? data[0].generated_text.trim()
                        : ""

                if (output.length > 40 && isTaksilaRelevant(output)) {
                    return streamResponse(output)
                }
            }
        } catch (e) {
            console.error("HuggingFace error:", e)
        }

        // =========================
        //   FALLBACK ANSWERS
        // =========================
        const lower = message.toLowerCase()

        // Beginner question
        if (lower.includes("start") || lower.includes("beginner")) {
            return streamResponse(`
Welcome to Taksila Coins! To begin your coin investment journey:

1️⃣ What is your budget in PKR & USD?  
2️⃣ What is your risk level? (Low / Moderate / High)

Once you answer, I will provide:
• A personalized portfolio  
• Recommended coin categories  
• PKR & USD ROI ranges  
• Taksila services to use next  
`)
        }

        // Investment / Portfolio
        if (lower.includes("invest") || lower.includes("portfolio")) {
            return streamResponse(`
Here are Taksila Coins recommended portfolios:

💼 Beginner (PKR 50k–200k / $150–$600)
• British India silver  
• Pakistani commemoratives  
• Modern bullion  
Expected ROI: 10–18%

📈 Growth (PKR 200k–1M / $600–$3,500)
• Roman/Greek coins  
• High-grade Pakistan coins  
• Historical silver  
Expected ROI: 18–28%

🏆 High-Value (PKR 1M+ / $3,500+)
• Mughal Empire coins  
• Rare ancient specimens  
• Precious metal artifacts  
Expected ROI: 25–45%

Tell me your budget & risk tolerance for a personalized plan.
`)
        }

        // Appraisal / Identification
        if (
            lower.includes("identify") ||
            lower.includes("value") ||
            lower.includes("worth")
        ) {
            return streamResponse(`
I can help with identification & value estimation.

For accurate appraisal:
• Visit: https://taksila-nu.vercel.app/appraisal  
• Upload clear photos (front, back, edge)  
• Provide weight, metal & diameter if possible  

You can also describe the coin here for a preliminary evaluation.
`)
        }

        // Default fallback
        return streamResponse(
            "How can I help you with coin investment, appraisal, or numismatic guidance?"
        )
    } catch (error) {
        console.error("API Error:", error)
        return NextResponse.json({ error: "Server error" }, { status: 500 })
    }
}
