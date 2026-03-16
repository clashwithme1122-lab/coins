import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { GlobalProvider } from '@/contexts/GlobalContext'
import { AuthProvider } from '@/contexts/AuthContext'
import Chatbot from '@/components/Chatbot'
import AdminChat from '@/components/AdminChat'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800'] })

export const metadata: Metadata = {
  title: 'Taksila Coins | Buy Authentic Rare & Antique Coins Online',
  description: 'Shop authenticated Roman, Greek, Mughal & Medieval coins. 30+ years experience. Expert-graded with Certificate of Authenticity. Secure your legacy from $85.',
  keywords: [
    'buy antique coins online',
    'rare coins for sale',
    'roman coins pakistan',
    'mughal coins authenticated',
    'how to buy authenticated ancient roman denarius',
    'invest in rare mughal coins',
    'numismatics',
    'authentic gold coins',
    'trusted coin dealers'
  ],
  authors: [{ name: 'Taksila Coins Experts' }],
  metadataBase: new URL('https://taksilacoins.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Taksila Coins | Rare & Antique Coin Marketplace',
    description: 'Invest in history. Browse expert-graded Roman, Greek, and Mughal coins. Certificates of Authenticity included with every numismatic treasure.',
    url: 'https://taksilacoins.com',
    siteName: 'Taksila Coins',
    images: [
      {
        url: '/assets/og-image-luxury-coins.jpg',
        width: 1200,
        height: 630,
        alt: 'Authenticated Rare Antique Coins - Taksila Coins',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Taksila Coins | Authentic Rare Coins',
    description: 'Buy expert-graded antique coins with Certificates of Authenticity. 30+ years experience.',
    images: ['/assets/og-image-luxury-coins.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="theme-color" content="#9333ea" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Taksila Coins",
              "url": "https://taksilacoins.com",
              "logo": "https://taksilacoins.com/assets/logo.png",
              "description": "Premium marketplace for rare, expert-graded antique coins including Roman, Greek, and Mughal numismatics.",
              "foundingDate": "1994",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "PK"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer support",
                "email": "contact@taksilacoins.com",
                "availableLanguage": ["English", "Urdu"]
              }
            }
          )}}
        />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <AuthProvider>
          <GlobalProvider>
            <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
              <div className="flex-1 backdrop-blur-sm bg-white/95 dark:bg-gray-800/95 transition-colors duration-200">
                <Navbar />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
              </div>
            </div>
            <Chatbot />
            <AdminChat />
          </GlobalProvider>
        </AuthProvider>
      </body>
    </html>
  )
}