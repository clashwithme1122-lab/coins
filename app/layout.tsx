import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { GlobalProvider } from '@/contexts/GlobalContext'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800'] })

export const metadata: Metadata = {
  title: 'Taksila Coins – Antique & Valuable Coin Marketplace',
  description: 'Buy & Sell Antique, Historical & Valuable Coins. Discover rare numismatic treasures from around the world.',
  keywords: ['antique coins', 'historical coins', 'numismatics', 'coin collecting', 'rare coins', 'valuable coins'],
  authors: [{ name: 'Taksila Coins Team' }],
  icons: {
    icon: '/assets/home.webp',
    shortcut: '/assets/home.webp',
    apple: '/assets/home.webp',
  },
  verification: {
    google: '_kqY42InvzbfXtf6Vn4vOBTCJ01rQ4dhJFw1g3mBMq0',
  },
  openGraph: {
    title: 'Taksila Coins – Antique & Valuable Coin Marketplace',
    description: 'Buy & Sell Antique, Historical & Valuable Coins from around the world',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Taksila Coins – Antique & Valuable Coin Marketplace',
    description: 'Buy & Sell Antique, Historical & Valuable Coins',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <GlobalProvider>
          <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-200" style={{ backgroundImage: 'url("/assets/home.webp")', backgroundAttachment: 'fixed', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="backdrop-blur-sm bg-white/95 dark:bg-gray-800/95 transition-colors duration-200">
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </div>
        </GlobalProvider>
      </body>
    </html>
  )
}