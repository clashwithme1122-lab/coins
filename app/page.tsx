'use client'

import Link from 'next/link'
import { ArrowRight, Star, Shield, Clock, RotateCcw, Search, ChevronLeft, ChevronRight, Heart, Share2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useGlobal } from '@/contexts/GlobalContext'
import coinsData from '@/data/coins.json'

export default function HomePage() {
  const { formatPrice, theme } = useGlobal()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [currentCoinIndex, setCurrentCoinIndex] = useState(0)
  const [coinImageStates, setCoinImageStates] = useState<{[key: number]: 'front' | 'back'}>({})
  const [favorites, setFavorites] = useState<number[]>([])
  const [shareMessage, setShareMessage] = useState('')

  // Use admin uploaded coins
  const allCoins = coinsData
  
  // Convert price strings to numbers for formatting
  const processedCoins = allCoins.map(coin => ({
    ...coin,
    price: typeof coin.price === 'string' ? parseInt(coin.price.replace(/[$,]/g, '')) : coin.price
  }))

  // Search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim() === '') {
      setSearchResults([])
    } else {
      const results = processedCoins.filter(coin => 
        coin.title.toLowerCase().includes(query.toLowerCase()) ||
        coin.description.toLowerCase().includes(query.toLowerCase())
      )
      setSearchResults(results)
    }
  }

  // Carousel navigation
  const handleNext = () => {
    setCurrentCoinIndex((prev) => (prev + 1) % processedCoins.length)
  }

  const handlePrev = () => {
    setCurrentCoinIndex((prev) => (prev - 1 + processedCoins.length) % processedCoins.length)
  }

  // Get 3 coins to display (current, next, next-next)
  const getDisplayedCoins = () => {
    const displayed = []
    for (let i = 0; i < 3; i++) {
      const index = (currentCoinIndex + i) % processedCoins.length
      displayed.push(processedCoins[index])
    }
    return displayed
  }

  // Handle image errors with fallback
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/assets/dummycoin.jpg"
  }

  // Toggle coin image between front and back
  const toggleCoinImage = (coinId: number) => {
    setCoinImageStates(prev => ({
      ...prev,
      [coinId]: prev[coinId] === 'front' ? 'back' : 'front'
    }))
  }

  // Get current image for a coin
  const getCurrentImage = (coin: any) => {
    const currentState = coinImageStates[coin.id] || 'front'
    return currentState === 'front' ? coin.frontImage : coin.backImage
  }

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
    <div className="min-h-screen dark:bg-gray-900 transition-colors duration-200">
      {/* Share Message Toast */}
      {shareMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-pulse">
          {shareMessage}
        </div>
      )}
      
      {/* Hero Section */}
      <section className="relative min-h-screen sm:h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/assets/home.webp")' }}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
            Taksila Coins
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover rare and historical coins from around the world
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search for coins..."
                className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                  theme === 'dark' 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
            
            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className={`mt-4 rounded-lg border shadow-lg max-h-80 overflow-y-auto ${
                theme === 'dark' 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}>
                <div className="p-2">
                  <p className={`text-sm font-medium mb-2 px-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Found {searchResults.length} coins
                  </p>
                  {searchResults.map((coin: any) => (
                    <Link 
                      key={coin.id}
                      href={`/coin/${coin.id}`}
                      className={`block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
                    >
                      <div className="flex items-center space-x-3">
                        <img 
                          src={coin.frontImage} 
                          alt={coin.title}
                          className="w-12 h-12 object-cover rounded-lg"
                          onError={handleImageError}
                        />
                        <div className="flex-1">
                          <h4 className={`font-medium ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                            {coin.title}
                          </h4>
                          <p className={`text-sm ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {coin.year} • {coin.weight}
                          </p>
                        </div>
                        <div className={`text-lg font-semibold ${
                          theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                        }`}>
                          {formatPrice(coin.price)}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <Link 
            href={`/coins${searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ''}`}
            className="inline-flex items-center bg-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200 text-sm sm:text-base lg:text-lg"
          >
            Search Coins
            <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Why Choose Taksila Coins?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Your trusted marketplace for authentic numismatic treasures</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Authenticity Guaranteed</h3>
              <p className="text-gray-600 dark:text-gray-300">Every coin is professionally authenticated and verified by our expert numismatists</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Expert Curated Collection</h3>
              <p className="text-gray-600 dark:text-gray-300">Hand-picked selection of the finest antique and historical coins from around the world</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">30+ Years Experience</h3>
              <p className="text-gray-600 dark:text-gray-300">Decades of expertise in numismatic trading and historical coin authentication</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Coins Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Featured Antique Coins</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Discover our most prized numismatic treasures</p>
          </div>
          
          {/* Carousel Container */}
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 -ml-6"
              aria-label="Previous coins"
            >
              <ChevronLeft className="w-6 h-6 text-purple-600" />
            </button>
            
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 -mr-6"
              aria-label="Next coins"
            >
              <ChevronRight className="w-6 h-6 text-purple-600" />
            </button>

            {/* Coins Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-12">
              {getDisplayedCoins().map((coin) => (
                <div key={coin.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  {/* Coin Image */}
                  <div className="relative h-64 bg-gray-100 dark:bg-gray-700 overflow-hidden group">
                    {/* Reverse Icon */}
                    <div className="absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button 
                        onClick={() => toggleCoinImage(coin.id)}
                        className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                        title="Flip coin"
                      >
                        <RotateCcw className="w-4 h-4 text-purple-600" />
                      </button>
                    </div>
                    
                    <img
                      src={getCurrentImage(coin)}
                      alt={`${coin.title} - ${coinImageStates[coin.id] === 'back' ? 'Back' : 'Front'}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      onError={handleImageError}
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
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{coin.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{coin.description}</p>
                    
                    <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <span>Year: {coin.year}</span>
                      <span>Weight: {coin.weight}</span>
                    </div>

                    {coin.historicalValue && (
                      <div className="mb-4 p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <p className="text-xs text-purple-700 dark:text-purple-300 font-medium">
                          {coin.historicalValue}
                        </p>
                      </div>
                    )}

                    <Link 
                      href={`/coins/${coin.id}`}
                      className="block w-full bg-purple-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {processedCoins.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCoinIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentCoinIndex
                      ? 'bg-purple-600 w-8'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to coin ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Start Your Numismatic Journey</h2>
          <p className="text-xl mb-8 text-purple-100">
            Join thousands of collectors who trust Taksila Coins for their antique coin investments
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/coins" 
              className="inline-flex items-center bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 text-lg"
            >
              Browse Collection
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link 
              href="/about" 
              className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors duration-200 text-lg"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
