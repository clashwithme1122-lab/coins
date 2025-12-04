import { NextRequest, NextResponse } from 'next/server'

// Taksila AI Assistant responses for numismatic topics
const fallbackResponses = {
    // Greetings
    'hi': 'Hello! I\'m Taksila AI Assistant. I\'m here to help you with coins, artifacts, appraisal guidance, grading, or numismatics. How can I assist you today?',
    'hello': 'Hello! I\'m Taksila AI Assistant. I\'m here to help you with coins, artifacts, appraisal guidance, grading, or numismatics. How can I assist you today?',
    'hey': 'Hey there! I\'m Taksila AI Assistant. I\'m here to help you with coins, artifacts, appraisal guidance, grading, or numismatics. How can I assist you today?',
    'good morning': 'Good morning! I\'m Taksila AI Assistant. How can I help you with coins, artifacts, appraisal guidance, grading, or numismatics today?',
    'good afternoon': 'Good afternoon! I\'m Taksila AI Assistant. How can I help you with coins, artifacts, appraisal guidance, grading, or numismatics today?',
    'good evening': 'Good evening! I\'m Taksila AI Assistant. How can I help you with coins, artifacts, appraisal guidance, grading, or numismatics today?',
    'thanks': 'You\'re welcome! Is there anything else I can help you with regarding coins, artifacts, appraisal guidance, grading, or numismatics?',
    'thank you': 'You\'re welcome! Is there anything else I can help you with regarding coins, artifacts, appraisal guidance, grading, or numismatics?',
    'bye': 'Goodbye! Feel free to come back anytime you need help with coins, artifacts, appraisal guidance, grading, or numismatics.',
    'goodbye': 'Goodbye! Feel free to come back anytime you need help with coins, artifacts, appraisal guidance, grading, or numismatics.',

    // Coin Collecting
    'coin collecting': 'Coin collecting is the study and preservation of rare, historic, or unique coins. I can explain types of coins, rarity factors, or how to start building a collection.',
    'coin': 'Coin collecting is the study and preservation of rare, historic, or unique coins. I can explain types of coins, rarity factors, or how to start building a collection.',
    'coins': 'Coin collecting is the study and preservation of rare, historic, or unique coins. I can explain types of coins, rarity factors, or how to start building a collection.',
    'collecting': 'Coin collecting is the study and preservation of rare, historic, or unique coins. I can explain types of coins, rarity factors, or how to start building a collection.',
    'collect': 'Coin collecting is the study and preservation of rare, historic, or unique coins. I can explain types of coins, rarity factors, or how to start building a collection.',
    'numismatics': 'Numismatics is the study of coins and currency. I can help with coin identification, grading guidance, and collection building.',
    'rare coins': 'Rare coins are valuable due to limited mintage, historical significance, or exceptional condition. I can help identify rare coins and explain what makes them valuable.',
    'ancient coins': 'Ancient coins span from Greek and Roman civilizations to medieval times. They offer fascinating insights into history and culture.',
    'medieval coins': 'Medieval coins were minted during the Middle Ages, often featuring religious symbols and local rulers.',
    'modern coins': 'Modern coins include contemporary issues and commemorative pieces. I can help with recent releases and collecting strategies.',

    // Appraisal/Valuation
    'appraise': 'I can\'t assign exact value, but I can help determine what affects a coin\'s worth — rarity, metal, condition, mint marks, and historical significance.',
    'appraisal': 'I can\'t assign exact value, but I can help determine what affects a coin\'s worth — rarity, metal, condition, mint marks, and historical significance.',
    'value': 'I can\'t assign exact value, but I can help determine what affects a coin\'s worth — rarity, metal, condition, mint marks, and historical significance.',
    'worth': 'I can\'t assign exact value, but I can help determine what affects a coin\'s worth — rarity, metal, condition, mint marks, and historical significance.',
    'estimate': 'I can help you understand valuation factors like rarity, condition, and market demand, but cannot provide exact monetary values.',
    'price': 'I cannot provide exact prices, but I can explain what determines coin value: rarity, condition, mint marks, historical significance, and current market demand.',
    'evaluate': 'Coin evaluation involves assessing rarity, condition, authenticity, and market demand. I can guide you through these factors.',
    'evaluation': 'Coin evaluation involves assessing rarity, condition, authenticity, and market demand. I can guide you through these factors.',
    'authenticate': 'Authentication involves verifying a coin\'s legitimacy through metal analysis, weight measurements, and comparison with known examples.',
    'authenticity': 'Authentication involves verifying a coin\'s legitimacy through metal analysis, weight measurements, and comparison with known examples.',
    'money': 'While I cannot provide exact monetary values, I can explain what determines coin worth: rarity, condition, mint marks, historical significance, and market demand. Focus on building knowledge rather than quick profits.',
    'profit': 'Coin collecting should focus on knowledge and preservation first. Value comes from rarity, condition, and historical significance. I can help you understand these factors rather than promising profits.',
    'make money': 'I cannot guarantee profits, but I can explain coin valuation factors: rarity, condition, mint marks, historical significance, and market demand. Focus on learning and preservation first.',

    // Auctions
    'auction': 'Coin auctions are events where collectors can bid on rare and valuable coins. Our platform features both live and timed auctions. Make sure to research coin values beforehand and set a maximum bid to avoid overpaying.',
    'auctions': 'Coin auctions are events where collectors can bid on rare and valuable coins. Our platform features both live and timed auctions. Make sure to research coin values beforehand and set a maximum bid to avoid overpaying.',
    'bid': 'When bidding on coins, research the market value, set a maximum budget, and consider buyer\'s premiums. Always bid within your means.',
    'bidding': 'When bidding on coins, research the market value, set a maximum budget, and consider buyer\'s premiums. Always bid within your means.',

    // Investment
    'investment': 'Coin investment requires knowledge of market trends and rarity factors. Focus on historically significant coins in good condition from reputable sources.',
    'invest': 'Coin investment requires knowledge of market trends and rarity factors. Focus on historically significant coins in good condition from reputable sources.',
    'investing': 'Coin investment requires knowledge of market trends and rarity factors. Focus on historically significant coins in good condition from reputable sources.',

    // Grading - Enhanced with more keywords
    'grading': 'Professional grading evaluates strike, luster, wear, and marks. I can walk you through the grading scale from Poor (P-1) to Mint State (MS-70). Key factors: surface preservation, strike quality, luster, and eye appeal.',
    'grade': 'Professional grading evaluates strike, luster, wear, and marks. I can walk you through the grading scale from Poor (P-1) to Mint State (MS-70). Key factors: surface preservation, strike quality, luster, and eye appeal.',
    'how to grade': 'To grade coins: 1) Examine surface for wear and marks 2) Check strike quality and detail 3) Assess luster and eye appeal 4) Compare to grading standards 5) Consider professional grading for valuable coins. I can explain specific grade levels.',
    'grade my coin': 'To grade your coin: 1) Examine surface for wear and marks 2) Check strike quality and detail 3) Assess luster and eye appeal 4) Compare to grading standards 5) Consider professional grading for valuable coins. Upload photos for specific guidance.',
    'condition': 'Coin condition ranges from Poor to Mint State. Key factors include wear, luster, strike quality, and surface marks. Professional grading uses standardized scales for consistency.',
    'g4': 'G-4 (Good) coin shows heavy wear with major design elements visible but lacking detail. Common for heavily circulated ancient coins.',
    'vf': 'VF (Very Fine) coins show moderate wear with clear details. Most circulated coins fall in this range.',
    'xf': 'XF (Extremely Fine) coins show light wear with sharp details. Higher grade collectible condition.',
    'au': 'AU (About Uncirculated) coins show minimal wear with nearly full luster. Just below mint state quality.',
    'mint state': 'Mint State coins have no wear and full original luster. Graded MS-60 to MS-70 based on strike and surface quality.',
    'ms60': 'MS-60 coins have no wear but may have marks and weak strike. Lowest mint state grade.',
    'ms70': 'MS-70 is perfect mint state with no marks, full luster, and sharp strike. The highest possible grade.',
    'preservation': 'Coin preservation involves proper storage, handling techniques, and environmental control to maintain condition.',

    // Identification
    'identify': 'If you upload a photo, I can help describe and identify the coin — such as origin, ruler, metal, and probable date range.',
    'id': 'If you upload a photo, I can help describe and identify the coin — such as origin, ruler, metal, and probable date range.',
    'identification': 'If you upload a photo, I can help describe and identify the coin — such as origin, ruler, metal, and probable date range.',
    'which coin': 'If you upload a photo, I can help describe and identify the coin — such as origin, ruler, metal, and probable date range.',
    'what coin': 'If you upload a photo, I can help describe and identify the coin — such as origin, ruler, metal, and probable date range.',
    'details': 'For coin details, I can help with identification, historical context, and significance if you provide images or descriptions.',

    // Storage
    'storage': 'Proper coin storage is crucial for preservation. Use archival-quality holders, avoid PVC materials, store in climate-controlled environments, and handle coins by the edges.',
    'store': 'Proper coin storage is crucial for preservation. Use archival-quality holders, avoid PVC materials, store in climate-controlled environments, and handle coins by the edges.',
    'preserve': 'Coin preservation involves using archival materials, climate control, and careful handling to maintain condition and value.',
    'handling': 'Handle coins by the edges only, wear cotton gloves, work over soft surfaces, and avoid touching the surfaces to preserve condition.',

    // Taksila Services
    'taksila': 'Taksila provides professional coin appraisal, grading guidance, and research documentation. Upload your coins for detailed analysis.',
    'upload': 'Taksila offers professional appraisal services. Upload your coin images for detailed analysis and documentation.',
    'service': 'Taksila offers comprehensive numismatic services including appraisal, research, grading guidance, and collection documentation.',
    'report': 'Taksila generates detailed research reports with coin identification, historical context, and condition assessment.',
    'research': 'Taksila provides professional numismatic research including historical context, rarity analysis, and market trends.',
    'documentation': 'Taksila creates museum-quality documentation for coin collections with detailed analysis and professional presentation.',
    'certificate': 'Taksila provides professional certificates of authenticity and appraisal for your valuable coins.',

    // Common misspellings and variations
    'colletion': 'Coin collecting is the study and preservation of rare, historic, or unique coins. I can explain types of coins, rarity factors, or how to start building a collection.',
    'apraisal': 'I can\'t assign exact value, but I can help determine what affects a coin\'s worth — rarity, metal, condition, mint marks, and historical significance.',
    'gradng': 'Professional grading evaluates strike, luster, wear, and marks. I can walk you through the grading scale from Poor (P-1) to Mint State (MS-70).',
    'valu': 'I can\'t assign exact value, but I can help determine what affects a coin\'s worth — rarity, metal, condition, mint marks, and historical significance.',
    'wirth': 'I can\'t assign exact value, but I can help determine what affects a coin\'s worth — rarity, metal, condition, mint marks, and historical significance.'
}

export async function POST(request: NextRequest) {
    try {
        const { message } = await request.json()

        if (!message) {
            return NextResponse.json(
                { error: 'Message is required' },
                { status: 400 }
            )
        }

        // Taksila AI Assistant keyword-based responses
        const lowerMessage = message.toLowerCase()
        let response = "I'm Taksila AI Assistant. I can help you with coins, artifacts, appraisal guidance, grading, or numismatics. Could you ask something in that area?"

        for (const [keyword, answer] of Object.entries(fallbackResponses)) {
            if (lowerMessage.includes(keyword)) {
                response = answer
                break
            }
        }

        // Create a streaming response
        const encoder = new TextEncoder()
        const stream = new ReadableStream({
            async start(controller) {
                try {
                    // Stream the response character by character for a live chat feel
                    const chars = response.split('')
                    for (let i = 0; i < chars.length; i++) {
                        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: chars[i] })}\n\n`))
                        // Small delay for streaming effect
                        await new Promise(resolve => setTimeout(resolve, 30))
                    }

                    controller.enqueue(encoder.encode('data: [DONE]\n\n'))
                    controller.close()
                } catch (error) {
                    console.error('Streaming error:', error)
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: "I apologize, but I encountered an error. Please try again." })}\n\n`))
                    controller.enqueue(encoder.encode('data: [DONE]\n\n'))
                    controller.close()
                }
            }
        })

        return new NextResponse(stream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
        })

    } catch (error) {
        console.error('Chat API error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
