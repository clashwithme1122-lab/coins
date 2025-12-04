'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Star, ArrowRight, Filter, Search, Heart, Share2 } from 'lucide-react'
import { useGlobal } from '@/contexts/GlobalContext'

export default function CoinsPage() {
  const { formatPrice, theme, currency } = useGlobal()
  const [coins, setCoins] = useState<{
    id: number;
    title: string;
    price: number;
    weight: string;
    year: string;
    description: string;
    frontImage: string;
  }[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [priceRange, setPriceRange] = useState('')
  const [yearRange, setYearRange] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])
  const [shareMessage, setShareMessage] = useState('')

  useEffect(() => {
    // Load coins data
    const loadCoins = async () => {
      try {
        const response = await fetch('/api/coins')
        if (response.ok) {
          const data = await response.json()
          setCoins(data)
        } else {
          // Fallback to dummy data
          setCoins([
            {
              id: 1,
              title: "Ancient Roman Denarius",
              price: 2450,
              weight: "3.8g",
              year: "150 AD",
              description: "Rare silver denarius from Emperor Marcus Aurelius reign",
              frontImage: "/assets/dummycoin.jpg"
            },
            {
              id: 2,
              title: "Greek Silver Tetradrachm",
              price: 3200,
              weight: "17.2g",
              year: "350 BC",
              description: "Classical Athenian silver coin with owl design",
              frontImage: "/assets/dummycoin.jpg"
            },
            {
              id: 3,
              title: "Medieval Gold Florin",
              price: 5800,
              weight: "3.5g",
              year: "1252 AD",
              description: "Florentine gold coin from Renaissance period",
              frontImage: "/assets/dummycoin.jpg"
            }
          ])
        }
      } catch (error) {
        console.error('Error loading coins:', error)
      }
    }

    loadCoins()
  }, [])

  // Filter coins based on search and filters
  const filteredCoins = coins.filter(coin => {
    const matchesSearch = coin.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         coin.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    let matchesPrice = true
    // Since coin.price is a number, no need for string parsing
    const numericPrice = coin.price
    
    // Convert to USD for consistent filtering (if currency is PKR, convert back)
    const usdPrice = currency === 'PKR' ? numericPrice / 280 : numericPrice
    
    if (priceRange === '0-1000') matchesPrice = usdPrice <= 1000
    else if (priceRange === '1000-5000') matchesPrice = usdPrice > 1000 && usdPrice <= 5000
    else if (priceRange === '5000+') matchesPrice = usdPrice > 5000
    
    let matchesYear = true
    if (yearRange === 'ancient') matchesYear = coin.year.includes('BC') || parseInt(coin.year) < 500
    else if (yearRange === 'medieval') matchesYear = parseInt(coin.year) >= 500 && parseInt(coin.year) < 1500
    else if (yearRange === 'modern') matchesYear = parseInt(coin.year) >= 1500
    
    return matchesSearch && matchesPrice && matchesYear
  })

  // Toggle favorite
  const toggleFavorite = (coinId: number) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(coinId)
        ? prev.filter(id => id !== coinId)
        : [...prev, coinId]
      
      // Save to localStorage
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
      return newFavorites
    })
  }

  // Share coin
  const shareCoin = async (coin: any) => {
    const coinUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/coins/${coin.id}`
    
    // Check if Web Share API is available (mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: coin.title,
          text: `Check out this amazing coin: ${coin.title} - ${coin.description}`,
          url: coinUrl,
        })
      } catch (error) {
        // User cancelled sharing
        console.log('Share cancelled')
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(coinUrl)
        setShareMessage('Link copied to clipboard!')
        setTimeout(() => setShareMessage(''), 3000)
      } catch (error) {
        setShareMessage('Failed to copy link')
        setTimeout(() => setShareMessage(''), 3000)
      }
    }
  }

  // Load favorites from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedFavorites = localStorage.getItem('favorites')
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites))
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Share Message Toast */}
      {shareMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-pulse">
          {shareMessage}
        </div>
      )}
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Coins Collection</h1>
            <p className="text-xl text-purple-100 mb-8">
              Browse our extensive collection of antique, historical, and valuable coins from around the world
            </p>
            <div className="flex justify-center space-x-4">
              <Link 
                href="/admin/login" 
                className="inline-flex items-center bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Coins Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search coins by title or description..."
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
            </div>
            
            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors flex items-center ${
                theme === 'dark'
                  ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700'
                  : 'bg-white text-gray-900 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {(priceRange || yearRange) && (
                <span className="ml-2 px-2 py-1 bg-purple-600 text-white text-xs rounded-full">
                  Active
                </span>
              )}
            </button>
          </div>
          
          {/* Filter Options */}
          {showFilters && (
            <div className={`p-6 rounded-lg border ${
              theme === 'dark' 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Price Range Filter */}
                <div>
                  <label className={`block text-sm font-medium mb-3 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Price Range
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: '', label: 'All Prices' },
                      { value: '0-1000', label: `Under ${formatPrice(1000)}` },
                      { value: '1000-5000', label: `${formatPrice(1000)} - ${formatPrice(5000)}` },
                      { value: '5000+', label: `Over ${formatPrice(5000)}` }
                    ].map((option) => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="radio"
                          value={option.value}
                          checked={priceRange === option.value}
                          onChange={(e) => setPriceRange(e.target.value)}
                          className="mr-2 text-purple-600 focus:ring-purple-500"
                        />
                        <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Year Range Filter */}
                <div>
                  <label className={`block text-sm font-medium mb-3 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Historical Period
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: '', label: 'All Periods' },
                      { value: 'ancient', label: 'Ancient (Before 500 AD)' },
                      { value: 'medieval', label: 'Medieval (500-1500 AD)' },
                      { value: 'modern', label: 'Modern (1500+ AD)' }
                    ].map((option) => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="radio"
                          value={option.value}
                          checked={yearRange === option.value}
                          onChange={(e) => setYearRange(e.target.value)}
                          className="mr-2 text-purple-600 focus:ring-purple-500"
                        />
                        <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Clear Filters Button */}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => {
                    setPriceRange('')
                    setYearRange('')
                    setSearchQuery('')
                  }}
                  className="px-4 py-2 text-sm text-purple-600 hover:text-purple-700 font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
          
          {/* Results Count */}
          <div className={`mt-4 text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Showing {filteredCoins.length} of {coins.length} coins
          </div>
        </div>
        
        {filteredCoins.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">No coins found</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {searchQuery || priceRange || yearRange 
                ? 'Try adjusting your search or filters' 
                : 'Check back soon for new additions to our collection'
              }
            </p>
            {(searchQuery || priceRange || yearRange) && (
              <button
                onClick={() => {
                  setPriceRange('')
                  setYearRange('')
                  setSearchQuery('')
                }}
                className="px-6 py-3 text-purple-600 hover:text-purple-700 font-medium"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredCoins.map((coin, index) => (
              <div
                key={coin.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                {/* Coin Image */}
                <div className="relative h-48 bg-gray-100 dark:bg-gray-700 overflow-hidden">
                  <img
                    src={coin.frontImage}
                    alt={`${coin.title} - Front`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = "/assets/dummycoin.jpg"
                    }}
                  />
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                      onClick={() => toggleFavorite(coin.id)}
                      className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                      title={favorites.includes(coin.id) ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Heart className={`w-4 h-4 ${favorites.includes(coin.id) ? 'fill-red-500 text-red-500' : 'text-red-500'}`} />
                    </button>
                    <button
                      onClick={() => shareCoin(coin)}
                      className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                      title="Share coin"
                    >
                      <Share2 className="w-4 h-4 text-purple-600" />
                    </button>
                    <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {formatPrice(coin.price)}
                    </div>
                  </div>
                </div>

                {/* Coin Details */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{coin.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{coin.description}</p>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span>{coin.year}</span>
                    <span>{coin.weight}</span>
                  </div>

                  <div className="flex space-x-3">
                    <Link 
                      href={`/coins/${coin.id}`}
                      className="flex-1 bg-purple-600 text-white text-center py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 text-sm"
                    >
                      View Details
                    </Link>
                    <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                      <Star className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Can't find what you're looking for?</h2>
          <p className="text-xl mb-8 text-purple-100">
            Our collection is constantly growing. Check back regularly or contact us about specific coins you're seeking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="inline-flex items-center bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Contact Us
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link 
              href="/favorites" 
              className="inline-flex items-center border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors duration-200"
            >
              View Favorites
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
