import { Metadata } from 'next'
import { promises as fs } from 'fs'
import path from 'path'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ThemeWrapper from '@/components/ThemeWrapper'
import PriceStats from '@/components/PriceStats'
import CoinPriceTable from '@/components/CoinPriceTable'

async function getAllCoins() {
  try {
    const coinsPath = path.join(process.cwd(), 'data', 'coins.json')
    const coinsData = await fs.readFile(coinsPath, 'utf-8')
    return JSON.parse(coinsData)
  } catch (error) {
    console.error('Error loading coins data:', error)
    return []
  }
}

export const metadata: Metadata = {
  title: 'Coin Prices - Taksila Coins',
  description: 'View current prices and valuations for antique, historical, and valuable coins in our collection.',
}

export default async function PricesPage() {
  const coins = await getAllCoins()

  return (
    <ThemeWrapper>
      <div className="min-h-screen bg-gray-50" id="prices-page-root">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Coin Prices & Valuations</h1>
            <p className="text-xl text-purple-100 mb-8">
              Current market prices for our collection of antique and historical coins
            </p>
            <div className="text-sm text-purple-200">
              Prices shown in local currency
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PriceStats coins={coins} />

        {/* Coins Price Table */}
        <CoinPriceTable coins={coins} />
      </div>

      {/* CTA Section */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Interested in a specific coin?</h2>
          <p className="text-xl mb-8 text-purple-100">
            Contact our numismatic experts for detailed information about any coin in our collection
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
          >
            Get Expert Advice
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
      </div>
    </ThemeWrapper>
  )
}
