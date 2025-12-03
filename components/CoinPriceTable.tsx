'use client'

import { useGlobal } from '@/contexts/GlobalContext'
import Link from 'next/link'
import { DollarSign, ArrowRight } from 'lucide-react'

interface CoinPriceTableProps {
  coins: any[]
}

export default function CoinPriceTable({ coins }: CoinPriceTableProps) {
  const { formatPrice } = useGlobal()

  return (
    <>
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
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {formatPrice(parseFloat(coin.price.replace(/[$,]/g, '')))}
                    </td>
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
    </>
  )
}
