import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'

// Check if email credentials are available
const hasEmailCredentials = !!(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD)

// Create transporter only if credentials are available
let transporter: any = null
if (hasEmailCredentials) {
  try {
    const nodemailer = require('nodemailer')
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })
  } catch (error) {
    console.error('Failed to initialize email transporter:', error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const headersList = await headers()
    const contentType = headersList.get('content-type')

    // Check content type
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { success: false, error: 'Invalid content type' },
        { status: 400 }
      )
    }

    const body = await request.json()

    // Validate required fields
    const { name, email, subject, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Check for honeypot field (simple spam protection)
    if (body.website || body.url) {
      return NextResponse.json(
        { success: false, error: 'Spam detected' },
        { status: 400 }
      )
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Send email to support (only if credentials are available)
    if (transporter && hasEmailCredentials) {
      try {
        const mailOptions = {
          from: process.env.GMAIL_USER,
          to: 'mtalhakh24@gmail.com',
          subject: `New Contact Form Submission: ${subject || 'No subject'}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #7c3aed;">New Contact Form Submission</h2>
              <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${body.phone || 'Not provided'}</p>
                <p><strong>Subject:</strong> ${subject || 'No subject'}</p>
                <p><strong>Message:</strong></p>
                <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
                  ${message.replace(/\n/g, '<br>')}
                </div>
              </div>
              <div style="color: #6b7280; font-size: 12px;">
                <p>Submitted at: ${new Date().toLocaleString()}</p>
                <p>IP: ${headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'Unknown'}</p>
              </div>
            </div>
          `,
        }

        await transporter.sendMail(mailOptions)

        // Send confirmation email to the user (optional)
        const confirmationMailOptions = {
          from: process.env.GMAIL_USER,
          to: email,
          subject: 'Thank you for contacting Taksila Coins',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #7c3aed;">Thank you for contacting Taksila Coins</h2>
              <p>Dear ${name},</p>
              <p>We have received your message and will get back to you within 24 hours. Here's a copy of your message:</p>
              <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Subject:</strong> ${subject || 'No subject'}</p>
                <p><strong>Message:</strong></p>
                <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
                  ${message.replace(/\n/g, '<br>')}
                </div>
              </div>
              <p>Best regards,<br>The Taksila Coins Team</p>
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                <p style="color: #6b7280; font-size: 12px;">
                  If you didn't send this message, please ignore this email.
                </p>
              </div>
            </div>
          `,
        }

        await transporter.sendMail(confirmationMailOptions)
      } catch (emailError) {
        console.error('Failed to send email:', emailError)
        // Continue with success response even if email fails
      }
    } else {
      console.log('Email credentials not configured - skipping email sending')
      // Log the contact form data for backup
      console.log('Contact form submission:', {
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString(),
        userAgent: headersList.get('user-agent'),
        ip: headersList.get('x-forwarded-for') || headersList.get('x-real-ip')
      })
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
      data: {
        name,
        email,
        subject: subject || 'No subject',
        submittedAt: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}