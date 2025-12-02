import { Metadata } from 'next'
import { promises as fs } from 'fs'
import path from 'path'
import Link from 'next/link'
import { ArrowRight, TrendingUp, DollarSign, Star } from 'lucide-react'

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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Coin Prices & Valuations</h1>
            <p className="text-xl text-purple-100 mb-8">
              Current market prices for our collection of antique and historical coins
            </p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              ${coins.reduce((sum: number, coin: any) => sum + parseFloat(coin.price.replace(/[$,]/g, '')), 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Collection Value</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{coins.length}</div>
            <div className="text-sm text-gray-600">Total Coins</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              ${coins.length > 0 ? Math.max(...coins.map((coin: any) => parseFloat(coin.price.replace(/[$,]/g, '')))).toLocaleString() : 0}
            </div>
            <div className="text-sm text-gray-600">Highest Value</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ArrowRight className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              ${coins.length > 0 ? Math.round(coins.reduce((sum: number, coin: any) => sum + parseFloat(coin.price.replace(/[$,]/g, '')), 0) / coins.length).toLocaleString() : 0}
            </div>
            <div className="text-sm text-gray-600">Average Price</div>
          </div>
        </div>

        {/* Coins Price Table */}
        {coins.length > 0 ? (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Current Coin Prices</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Coin
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Year
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Weight
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {coins.map((coin: any) => (
                    <tr key={coin.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{coin.title}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{coin.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{coin.year}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{coin.weight}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{coin.price}</td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/coins/${coin.id}`}
                          className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No coins available</h3>
            <p className="text-gray-600 mb-6">Check back soon for pricing information on our coin collection</p>
            <Link
              href="/coins"
              className="inline-flex items-center bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Browse Coins
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        )}
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
  )
}
