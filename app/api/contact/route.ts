import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'

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

    // Log the contact form data (in production, you'd send this to a database or email service)
    console.log('Contact form submission:', {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
      userAgent: headersList.get('user-agent'),
      ip: headersList.get('x-forwarded-for') || headersList.get('x-real-ip')
    })

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