import { POST } from '../contact/route'
import { NextRequest } from 'next/server'

describe('/api/contact', () => {
    it('returns success for valid contact form submission', async () => {
        const requestBody = {
            name: 'John Doe',
            email: 'john@example.com',
            subject: 'Test Subject',
            message: 'This is a test message'
        }

        const request = new NextRequest('http://localhost:3000/api/contact', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const response = await POST(request)
        const data = await response.json()

        expect(response.status).toBe(200)
        expect(data.success).toBe(true)
        expect(data.message).toBe('Contact form submitted successfully')
    })

    it('returns error for missing required fields', async () => {
        const requestBody = {
            name: 'John Doe',
            email: 'john@example.com'
            // Missing subject and message
        }

        const request = new NextRequest('http://localhost:3000/api/contact', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const response = await POST(request)
        const data = await response.json()

        expect(response.status).toBe(400)
        expect(data.success).toBe(false)
        expect(data.error).toBe('Missing required fields')
    })

    it('returns error for invalid email', async () => {
        const requestBody = {
            name: 'John Doe',
            email: 'invalid-email',
            subject: 'Test Subject',
            message: 'This is a test message'
        }

        const request = new NextRequest('http://localhost:3000/api/contact', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const response = await POST(request)
        const data = await response.json()

        expect(response.status).toBe(400)
        expect(data.success).toBe(false)
        expect(data.error).toBe('Invalid email address')
    })

    it('detects spam via honeypot field', async () => {
        const requestBody = {
            name: 'John Doe',
            email: 'john@example.com',
            subject: 'Test Subject',
            message: 'This is a test message',
            website: 'spam-field' // Honeypot field
        }

        const request = new NextRequest('http://localhost:3000/api/contact', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const response = await POST(request)
        const data = await response.json()

        expect(response.status).toBe(400)
        expect(data.success).toBe(false)
        expect(data.error).toBe('Spam detected')
    })
})