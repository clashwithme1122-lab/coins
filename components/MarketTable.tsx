'use client'

import { useState, useMemo } from 'react'
import { ArrowUpDown, Search, TrendingUp, TrendingDown, Eye, ArrowUp, ArrowDown } from 'lucide-react'
import { LineChart, Line, ResponsiveContainer } from 'recharts'
import Link from 'next/link'

interface CoinData {
  id: string
  symbol: string
  name: string
  rank: number
  price: number
  change24h: number
  marketCap: number
  volume24h: number
  sparkline: number[]
}

interface MarketTableProps {
  coins?: CoinData[]
  showPagination?: boolean
  itemsPerPage?: number
}

export default function MarketTable({ 
  coins = [], 
  showPagination = true, 
  itemsPerPage = 10 
}: MarketTableProps) {
  const [sortField, setSortField] = useState<keyof CoinData>('rank')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredAndSortedCoins = useMemo(() => {
    let filtered = coins.filter(coin =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )

    filtered.sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
      }
      
      return 0
    })

    return filtered
  }, [coins, searchTerm, sortField, sortDirection])

  const paginatedCoins = useMemo(() => {
    if (!showPagination) return filteredAndSortedCoins
    
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredAndSortedCoins.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredAndSortedCoins, currentPage, itemsPerPage, showPagination])

  const totalPages = Math.ceil(filteredAndSortedCoins.length / itemsPerPage)

  const handleSort = (field: keyof CoinData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`
    return `$${num.toFixed(2)}`
  }

  return (
    <div className="crypto-card">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search cryptocurrencies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                <button
                  onClick={() => handleSort('rank')}
                  className="flex items-center space-x-1 hover:text-purple-600 transition-colors"
                >
                  <span>#</span>
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Coin</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">
                <button
                  onClick={() => handleSort('price')}
                  className="flex items-center space-x-1 hover:text-purple-600 transition-colors justify-end"
                >
                  <span>Price</span>
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">
                <button
                  onClick={() => handleSort('change24h')}
                  className="flex items-center space-x-1 hover:text-purple-600 transition-colors justify-end"
                >
                  <span>24h %</span>
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">
                <button
                  onClick={() => handleSort('marketCap')}
                  className="flex items-center space-x-1 hover:text-purple-600 transition-colors justify-end"
                >
                  <span>Market Cap</span>
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">
                <button
                  onClick={() => handleSort('volume24h')}
                  className="flex items-center space-x-1 hover:text-purple-600 transition-colors justify-end"
                >
                  <span>Volume (24h)</span>
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </th>
              <th className="text-center py-3 px-4 font-semibold text-gray-700">Last 7 Days</th>
              <th className="text-center py-3 px-4 font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCoins.map((coin) => (
              <tr key={coin.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4 text-gray-600">{coin.rank}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-crypto-purple to-crypto-gold rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">{coin.symbol.substring(0, 2)}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{coin.name}</div>
                      <div className="text-sm text-gray-500">{coin.symbol}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-right font-mono text-gray-900">
                  {formatNumber(coin.price)}
                </td>
                <td className="py-4 px-4 text-right">
                  <div className={`flex items-center justify-end ${coin.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {coin.change24h >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                    <span className="font-semibold">{coin.change24h.toFixed(2)}%</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-right font-mono text-gray-900">
                  {formatNumber(coin.marketCap)}
                </td>
                <td className="py-4 px-4 text-right font-mono text-gray-900">
                  {formatNumber(coin.volume24h)}
                </td>
                <td className="py-4 px-4">
                  <div className="h-12">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={coin.sparkline.slice(-7).map((price, index) => ({ value: price }))}>
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke={coin.change24h >= 0 ? '#10b981' : '#ef4444'} 
                          strokeWidth={2} 
                          dot={false} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </td>
                <td className="py-4 px-4 text-center">
                  <Link href={`/coin/${coin.id}`}>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {showPagination && totalPages > 1 && (
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-600">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedCoins.length)} of {filteredAndSortedCoins.length} results
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 border rounded-md transition-colors ${
                  currentPage === index + 1
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                {index + 1}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}