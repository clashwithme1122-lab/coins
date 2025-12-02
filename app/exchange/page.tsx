import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpDown, TrendingUp, TrendingDown, Search, Filter } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Exchange - CryptoCoin',
  description: 'Advanced cryptocurrency exchange with real-time trading, advanced charts, and professional tools.',
}

export default function ExchangePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Advanced Crypto Exchange</h1>
            <p className="text-xl text-purple-100 mb-8">
              Trade 500+ cryptocurrencies with professional tools and lightning-fast execution
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/get-started" className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Start Trading
              </Link>
              <Link href="/prices" className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
                View Markets
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Trading Interface Preview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">BTC/USDT</h2>
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-bold">$43,256.78</span>
              <span className="bg-green-100 text-green-600 px-2 py-1 rounded-lg flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                +2.34%
              </span>
            </div>
          </div>

          {/* Trading Pairs */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Markets</h3>
                <div className="flex space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Search className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                {['BTC/USDT', 'ETH/USDT', 'BNB/USDT', 'SOL/USDT'].map((pair) => (
                  <div key={pair} className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{pair}</span>
                      <div className="text-right">
                        <div className="font-semibold">{pair === 'BTC/USDT' ? '$43,256.78' : pair === 'ETH/USDT' ? '$2,234.56' : pair === 'BNB/USDT' ? '$312.45' : '$98.76'}</div>
                        <div className="text-green-600 text-sm">+{Math.random() * 5 + 1}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
                <p className="text-gray-500">Advanced Trading Chart</p>
              </div>
            </div>

            <div className="lg:col-span-1">
              <h3 className="font-semibold mb-4">Quick Trade</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Buy/Sell</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">Buy</button>
                    <button className="bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors">Sell</button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                  <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total</label>
                  <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600" placeholder="0.00" />
                </div>
                <button className="w-full crypto-button">Place Order</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-center mb-12">Exchange Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Lightning Fast', description: 'Execute trades in milliseconds with our optimized infrastructure' },
            { title: 'Advanced Charts', description: 'Professional trading tools with technical indicators and drawing tools' },
            { title: 'Deep Liquidity', description: 'Access to deep liquidity pools for minimal slippage on large trades' },
            { title: 'Security First', description: 'Multi-signature wallets and cold storage for maximum security' },
            { title: '24/7 Support', description: 'Round-the-clock customer support for all your trading needs' },
            { title: 'API Access', description: 'Full-featured API for algorithmic trading and automation' },
          ].map((feature, index) => (
            <div key={index} className="crypto-card">
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
