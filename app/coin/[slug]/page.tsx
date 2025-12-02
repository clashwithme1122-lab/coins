import { notFound } from 'next/navigation'
import { promises as fs } from 'fs'
import path from 'path'
import PriceChart from '@/components/PriceChart'
import Link from 'next/link'
import { ArrowLeft, TrendingUp, TrendingDown, BarChart3, Activity } from 'lucide-react'

interface CoinData {
  id: string
  symbol: string
  name: string
  rank: number
  price: number
  change24h: number
  marketCap: number
  volume24h: number
  supply: number
  sparkline: number[]
}

async function getCoinData(slug: string): Promise<CoinData | null> {
  try {
    const coinsPath = path.join(process.cwd(), 'data', 'coins.json')
    const coinsData = await fs.readFile(coinsPath, 'utf-8')
    const coins: CoinData[] = JSON.parse(coinsData)
    return coins.find(coin => coin.id === slug) || null
  } catch (error) {
    console.error('Error loading coin data:', error)
    return null
  }
}

async function getRecentTrades() {
  // Sample recent trades data
  return [
    { time: '12:45:32', type: 'buy', amount: 0.523, price: 67321.12, total: 35212.45 },
    { time: '12:44:18', type: 'sell', amount: 1.234, price: 67315.89, total: 83045.67 },
    { time: '12:43:05', type: 'buy', amount: 0.876, price: 67322.34, total: 58978.12 },
    { time: '12:42:51', type: 'buy', amount: 2.456, price: 67320.98, total: 165289.34 },
    { time: '12:41:33', type: 'sell', amount: 0.345, price: 67318.76, total: 23245.97 },
  ]
}

export default async function CoinPage({ params }: { params: { slug: string } }) {
  const coin = await getCoinData(params.slug)
  const recentTrades = await getRecentTrades()

  if (!coin) {
    notFound()
  }

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`
    return `$${num.toFixed(2)}`
  }

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <Link href="/prices" className="inline-flex items-center text-gray-600 hover:text-purple-600 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Prices
        </Link>

        {/* Coin Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-white">{coin.symbol.substring(0, 2)}</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{coin.name}</h1>
                <p className="text-gray-600">{coin.symbol} • Rank #{coin.rank}</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900">
                {formatNumber(coin.price)}
              </div>
              <div className={`flex items-center justify-end ${coin.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {coin.change24h >= 0 ? <TrendingUp className="w-5 h-5 mr-1" /> : <TrendingDown className="w-5 h-5 mr-1" />}
                <span className="font-semibold">{coin.change24h.toFixed(2)}%</span>
              </div>
            </div>
          </div>

          {/* Market Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center text-gray-600 mb-2">
                <BarChart3 className="w-4 h-4 mr-2" />
                Market Cap
              </div>
              <div className="text-xl font-semibold text-gray-900">
                {formatNumber(coin.marketCap)}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center text-gray-600 mb-2">
                <Activity className="w-4 h-4 mr-2" />
                Volume (24h)
              </div>
              <div className="text-xl font-semibold text-gray-900">
                {formatNumber(coin.volume24h)}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-gray-600 mb-2">Circulating Supply</div>
              <div className="text-xl font-semibold text-gray-900">
                {coin.supply.toLocaleString()} {coin.symbol}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-gray-600 mb-2">Volume/Market Cap</div>
              <div className="text-xl font-semibold text-gray-900">
                {((coin.volume24h / coin.marketCap) * 100).toFixed(2)}%
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Price Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Price Chart</h2>
              <PriceChart sparkline={coin.sparkline} />
              
              {/* Time Range Buttons */}
              <div className="flex space-x-2 mt-6">
                {['1D', '7D', '1M', '3M', '1Y', 'ALL'].map((range) => (
                  <button
                    key={range}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Trades */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Trades</h2>
              <div className="space-y-3">
                {recentTrades.map((trade, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <div>
                      <div className="text-sm text-gray-600">{trade.time}</div>
                      <div className={`text-sm font-semibold ${trade.type === 'buy' ? 'text-green-600' : 'text-red-600'}`}>
                        {trade.type.toUpperCase()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-sm">{trade.amount} {coin.symbol}</div>
                      <div className="font-mono text-xs text-gray-600">{formatNumber(trade.total)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Buy/Sell Buttons */}
            <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Trade {coin.symbol}</h2>
              <div className="space-y-4">
                <button className="w-full crypto-button bg-green-600 hover:bg-green-700">
                  Buy {coin.symbol}
                </button>
                <button className="w-full crypto-button bg-red-600 hover:bg-red-700">
                  Sell {coin.symbol}
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-4 text-center">
                Trading functionality coming soon
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}