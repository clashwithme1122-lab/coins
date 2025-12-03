import { NextRequest, NextResponse } from 'next/server'
import { uploadImage } from '@/lib/cloudinary'

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File
        const folder = formData.get('folder') as string || 'coins'

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 })
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            return NextResponse.json({ error: 'File must be an image' }, { status: 400 })
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json({ error: 'File size must be less than 5MB' }, { status: 400 })
        }

        const imageUrl = await uploadImage(file, folder)

        return NextResponse.json({
            success: true,
            url: imageUrl
        })
    } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json({
            error: 'Upload failed'
        }, { status: 500 })
    }
}
