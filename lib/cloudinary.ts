import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary using environment URL
const cloudinaryUrl = process.env.CLOUDINARY_URL
if (cloudinaryUrl) {
    cloudinary.config(cloudinaryUrl)
} else {
    // Fallback configuration
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dvzojxwma',
        api_key: process.env.CLOUDINARY_API_KEY || '729162437537885',
        api_secret: process.env.CLOUDINARY_API_SECRET || 'mjwWeCPuRvwZp8pvMF1c9vmmljI',
        secure: true
    })
}

export { cloudinary }

// Upload image to Cloudinary
export async function uploadImage(file: File, folder: string = 'coins'): Promise<string> {
    return new Promise((resolve, reject) => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', 'coins_upload') // You'll need to create this in Cloudinary dashboard
        formData.append('folder', folder)

        fetch(`https://api.cloudinary.com/v1_1/dvzojxwma/image/upload`, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.secure_url) {
                    resolve(data.secure_url)
                } else {
                    reject(new Error('Upload failed'))
                }
            })
            .catch(error => reject(error))
    })
}

// Delete image from Cloudinary
export async function deleteImage(publicId: string): Promise<boolean> {
    try {
        const result = await cloudinary.uploader.destroy(publicId)
        return result.result === 'ok'
    } catch (error) {
        console.error('Error deleting image:', error)
        return false
    }
}

// Get public ID from Cloudinary URL
export function getPublicIdFromUrl(url: string): string {
    const parts = url.split('/')
    const filename = parts[parts.length - 1]
    return filename.split('.')[0]
}
