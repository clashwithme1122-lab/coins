'use client'

import Link from 'next/link'
import { ArrowRight, Star, Shield, Clock, RotateCcw } from 'lucide-react'
import { useGlobal } from '@/contexts/GlobalContext'

export default function HomePage() {
  const { formatPrice } = useGlobal()

  // Dummy coins data
  const dummyCoins = [
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
  ]
  return (
    <div className="min-h-screen dark:bg-gray-900 transition-colors duration-200">
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
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-purple-100 px-4">
            Buy & Sell Antique, Historical & Valuable Coins
          </p>
          <Link 
            href="/coins" 
            className="inline-flex items-center bg-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200 text-sm sm:text-base lg:text-lg"
          >
            Browse Coins
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dummyCoins.map((coin) => (
              <div key={coin.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                {/* Coin Image */}
                <div className="relative h-64 bg-gray-100 dark:bg-gray-700 overflow-hidden group">
                  {/* Reverse Icon */}
                  <div className="absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors">
                      <RotateCcw className="w-4 h-4 text-purple-600" />
                    </button>
                  </div>
                  
                  <img
                    src={coin.frontImage}
                    alt={`${coin.title} - Front`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {formatPrice(coin.price)}
                  </div>
                </div>

                {/* Coin Details */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{coin.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{coin.description}</p>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span>Year: {coin.year}</span>
                    <span>Weight: {coin.weight}</span>
                  </div>

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
