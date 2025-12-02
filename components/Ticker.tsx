'use client'

import { TrendingUp, TrendingDown } from 'lucide-react'
import { useEffect, useState } from 'react'

interface CoinData {
  id: string
  symbol: string
  name: string
  price: number
  change24h: number
}

export default function Ticker() {
  const [coins, setCoins] = useState<CoinData[]>([])

  useEffect(() => {
    // Load sample data
    const sampleCoins = [
      { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', price: 67321.12, change24h: -1.2 },
      { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', price: 3521.88, change24h: 2.4 },
      { id: 'binancecoin', symbol: 'BNB', name: 'BNB', price: 631.45, change24h: 0.5 },
      { id: 'ripple', symbol: 'XRP', name: 'XRP', price: 0.623, change24h: -0.7 },
      { id: 'cardano', symbol: 'ADA', name: 'Cardano', price: 0.382, change24h: 3.1 },
      { id: 'solana', symbol: 'SOL', name: 'Solana', price: 142.67, change24h: -2.5 },
      { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin', price: 0.0823, change24h: 1.8 },
      { id: 'polkadot', symbol: 'DOT', name: 'Polkadot', price: 4.23, change24h: -1.3 },
    ]
    setCoins(sampleCoins)
  }, [])

  return (
    <div className="bg-gray-900 text-white py-3 overflow-hidden">
      <div className="ticker-container">
        <div className="marquee">
          {/* Duplicate the array for seamless scrolling */}
          {[...coins, ...coins].map((coin, index) => (
            <div key={`${coin.id}-${index}`} className="inline-flex items-center space-x-4 px-6 border-r border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{coin.symbol.substring(0, 2)}</span>
                </div>
                <div>
                  <div className="font-semibold text-sm">{coin.symbol}</div>
                  <div className="text-xs text-gray-400">{coin.name}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono text-sm">
                  ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className={`flex items-center text-xs ${coin.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {coin.change24h >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                  {Math.abs(coin.change24h).toFixed(2)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}