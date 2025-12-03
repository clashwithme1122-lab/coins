'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Gavel, Clock, TrendingUp, Users, Filter, Search, Heart } from 'lucide-react'
import { useGlobal } from '@/contexts/GlobalContext'

interface AuctionItem {
  id: number
  title: string
  description: string
  currentBid: number
  startingBid: number
  endTime: string
  image: string
  category: string
  bids: number
  watchlist: boolean
}

export default function AuctionPage() {
  const { formatPrice, theme } = useGlobal()
  const [auctions, setAuctions] = useState<AuctionItem[]>([
    {
      id: 1,
      title: "Ancient Roman Denarius",
      description: "Silver denarius from Emperor Marcus Aurelius reign, excellent condition",
      currentBid: 2500,
      startingBid: 1500,
      endTime: "2h 45m",
      image: "/assets/dummycoin.jpg",
      category: "Ancient",
      bids: 12,
      watchlist: false
    },
    {
      id: 2,
      title: "1909-S VDB Lincoln Cent",
      description: "Rare early Lincoln cent, VDB initials, VF condition",
      currentBid: 850,
      startingBid: 500,
      endTime: "5h 12m",
      image: "/assets/dummycoin.jpg",
      category: "US Coins",
      bids: 8,
      watchlist: true
    },
    {
      id: 3,
      title: "Gold Sovereign Victoria",
      description: "British gold sovereign, Queen Victoria, London mint",
      currentBid: 1200,
      startingBid: 800,
      endTime: "1d 3h",
      image: "/assets/dummycoin.jpg",
      category: "World Coins",
      bids: 6,
      watchlist: false
    },
    {
      id: 4,
      title: "Greek Tetradrachm",
      description: "Athens silver tetradrachm, classical period, nice toning",
      currentBid: 3200,
      startingBid: 2000,
      endTime: "18h 30m",
      image: "/assets/dummycoin.jpg",
      category: "Ancient",
      bids: 15,
      watchlist: true
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('ending')

  const categories = ['all', 'Ancient', 'US Coins', 'World Coins', 'Medieval', 'Modern']
  const sortOptions = [
    { value: 'ending', label: 'Ending Soon' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'bids', label: 'Most Bids' }
  ]

  const filteredAuctions = auctions
    .filter(auction => {
      const matchesSearch = auction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           auction.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || auction.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-high':
          return b.currentBid - a.currentBid
        case 'price-low':
          return a.currentBid - b.currentBid
        case 'bids':
          return b.bids - a.bids
        default:
          return 0 // Keep original order for "ending soon"
      }
    })

  const toggleWatchlist = (id: number) => {
    setAuctions(prev => prev.map(auction => 
      auction.id === id ? { ...auction, watchlist: !auction.watchlist } : auction
    ))
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Gavel className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Coin Auctions</h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Bid on rare and valuable coins from around the world. Live auctions ending daily.
            </p>
            <div className="mt-4 text-sm text-purple-200">
              Prices shown in {formatPrice(100).split('100')[0]}100
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg mr-4">
                <Gavel className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Active Auctions</p>
                <p className="text-2xl font-bold">{auctions.length}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg mr-4">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Total Bids Today</p>
                <p className="text-2xl font-bold">247</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg mr-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Active Bidders</p>
                <p className="text-2xl font-bold">89</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg mr-4">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Ending Soon</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 items-center flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search auctions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600 ${
                    theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                  }`}
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={`px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600 ${
                    theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                  }`}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600 ${
                  theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                }`}
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Auction Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAuctions.map((auction, index) => (
            <motion.div
              key={auction.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow`}
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={auction.image}
                  alt={auction.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-purple-600 text-white text-sm rounded-full">
                    {auction.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => toggleWatchlist(auction.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      auction.watchlist 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white/90 text-gray-600 hover:bg-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${auction.watchlist ? 'fill-current' : ''}`} />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center bg-red-600 text-white px-3 py-1 rounded-lg">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">{auction.endTime}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : ''}`}>{auction.title}</h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-sm mb-4 line-clamp-2`}>{auction.description}</p>

                {/* Bidding Info */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-sm`}>Current Bid</span>
                    <span className="text-2xl font-bold text-purple-600">{formatPrice(auction.currentBid)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Starting Bid</span>
                    <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{formatPrice(auction.startingBid)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Bids</span>
                    <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{auction.bids} bids</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 space-y-3">
                  <button className="w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                    Place Bid
                  </button>
                  <button className="w-full border border-purple-600 text-purple-600 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAuctions.length === 0 && (
          <div className="text-center py-12">
            <Gavel className={`w-16 h-16 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-300'} mx-auto mb-4`} />
            <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>No auctions found</h3>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* How It Works */}
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-center mb-8">How Coin Auctions Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">1</span>
              </div>
              <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : ''}`}>Browse Auctions</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Find coins you're interested in from our curated selection</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">2</span>
              </div>
              <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : ''}`}>Place Your Bid</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Submit your maximum bid or bid incrementally</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">3</span>
              </div>
              <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : ''}`}>Track Auction</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Monitor bidding activity and time remaining</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">4</span>
              </div>
              <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : ''}`}>Win & Pay</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>If you win, complete payment and receive your coin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
