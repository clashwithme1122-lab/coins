'use client'

import { useGlobal } from '@/contexts/GlobalContext'
import { DollarSign, Star, TrendingUp, ArrowRight } from 'lucide-react'

interface PriceStatsProps {
  coins: any[]
}

export default function PriceStats({ coins }: PriceStatsProps) {
  const { formatPrice } = useGlobal()

  const totalValue = coins.reduce((sum: number, coin: any) => sum + parseFloat(coin.price.replace(/[$,]/g, '')), 0)
  const highestValue = coins.length > 0 ? Math.max(...coins.map((coin: any) => parseFloat(coin.price.replace(/[$,]/g, '')))) : 0
  const averagePrice = coins.length > 0 ? Math.round(totalValue / coins.length) : 0

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <div className="bg-white rounded-xl shadow-lg p-6 text-center">
        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <DollarSign className="w-6 h-6 text-purple-600" />
        </div>
        <div className="text-2xl font-bold text-gray-900 mb-1">
          {formatPrice(totalValue)}
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
          {formatPrice(highestValue)}
        </div>
        <div className="text-sm text-gray-600">Highest Value</div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6 text-center">
        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ArrowRight className="w-6 h-6 text-purple-600" />
        </div>
        <div className="text-2xl font-bold text-gray-900 mb-1">
          {formatPrice(averagePrice)}
        </div>
        <div className="text-sm text-gray-600">Average Price</div>
      </div>
    </div>
  )
}
