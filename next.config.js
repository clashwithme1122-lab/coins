/** @type {import('next').NextConfig} */
const nextConfig = {
    turbopack: {
        root: __dirname
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
}

module.exports = nextConfig
