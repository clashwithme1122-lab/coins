import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json()

        const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Welcome to Taksila Coins</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { 
                background: linear-gradient(135deg, #7c3aed, #9333ea); 
                color: white; 
                padding: 30px; 
                text-align: center; 
                border-radius: 10px 10px 0 0; 
            }
            .content { 
                background: #f9fafb; 
                padding: 30px; 
                border-radius: 0 0 10px 10px; 
            }
            .button { 
                display: inline-block; 
                background: #7c3aed; 
                color: white; 
                padding: 12px 24px; 
                text-decoration: none; 
                border-radius: 6px; 
                margin: 10px 0; 
            }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Welcome to Taksila Coins!</h1>
                <p>Your journey into the world of numismatic treasures begins here</p>
            </div>

            <div class="content">
                <p>Thank you for subscribing to our newsletter!</p>
                <p>As a subscriber, you will receive:</p>

                <ul>
                    <li>🪙 Rare coin alerts</li>
                    <li>📊 Market analysis</li>
                    <li>🏛️ Historical insights</li>
                    <li>🎟️ Auction notifications</li>
                </ul>

                <div style="text-align:center; margin:30px 0;">
                    <a href="http://localhost:3000/coins" class="button">Browse Coins</a>
                    <a href="http://localhost:3000/analysis" class="button">Market Analysis</a>
                </div>
            </div>

            <div class="footer">
                <p>&copy; 2025 Taksila Coins</p>
                <p>Pakistan | +92 321 5060069 | mtalhakh24@gmail.com</p>
            </div>
        </div>
    </body>
    </html>
    `

        // TODO: integrate email sending logic (e.g., Resend, Nodemailer, etc.)
        console.log(`Welcome email sent to: ${email}`)

        return NextResponse.json({
            message: "Welcome email generated successfully",
            email,
            htmlPreview: emailHtml
        })
    } catch (error) {
        console.error("Error sending welcome email:", error)
        return NextResponse.json(
            { error: "Failed to send welcome email" },
            { status: 500 }
        )
    }
}
