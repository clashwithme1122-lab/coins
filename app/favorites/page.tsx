'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Heart, Star } from 'lucide-react'

interface Coin {
  id: number
  title: string
  price: string
  weight: string
  year: string
  description: string
  frontImage: string
  backImage: string
  weightImage: string
  historicalValue?: string
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Coin[]>([])

  useEffect(() => {
    loadFavorites()
  }, [])

  const loadFavorites = () => {
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]')
    setFavorites(favs)
  }

  const removeFromFavorites = (id: number) => {
    const updatedFavorites = favorites.filter(coin => coin.id !== id)
    setFavorites(updatedFavorites)
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/coins" 
            className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Coins
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 mr-3" />
              <h1 className="text-3xl md:text-4xl font-bold">My Favorites</h1>
            </div>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Your personal collection of favorite antique and historical coins
            </p>
          </motion.div>
        </div>
      </div>

      {/* Favorites Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">No favorites yet</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start adding coins to your favorites to build your personal collection of antique treasures.
            </p>
            <Link 
              href="/coins" 
              className="inline-flex items-center bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Browse Coins
              <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-md p-6 mb-8"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-purple-600">{favorites.length}</div>
                  <div className="text-sm text-gray-600">Favorite Coins</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">
                    {favorites.reduce((sum, coin) => sum + 1, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total Items</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">
                    ${favorites.reduce((sum, coin) => {
                      const price = parseFloat(coin.price.replace(/[$,]/g, ''))
                      return sum + price
                    }, 0).toFixed(0)}
                  </div>
                  <div className="text-sm text-gray-600">Total Value</div>
                </div>
              </div>
            </motion.div>

            {/* Favorites Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {favorites.map((coin, index) => (
                <motion.div
                  key={coin.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                >
                  {/* Coin Image */}
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    <motion.img
                      src={coin.frontImage}
                      alt={`${coin.title} - Front`}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {coin.price}
                    </div>
                    <div className="absolute top-4 left-4">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <Heart className="w-4 h-4 text-red-500 fill-current" />
                      </div>
                    </div>
                  </div>

                  {/* Coin Details */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2 line-clamp-1">{coin.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{coin.description}</p>
                    
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
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
                      <button 
                        onClick={() => removeFromFavorites(coin.id)}
                        className="px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200"
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Clear All Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mt-12"
            >
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to clear all favorites?')) {
                    setFavorites([])
                    localStorage.setItem('favorites', JSON.stringify([]))
                  }
                }}
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Clear All Favorites
              </button>
            </motion.div>
          </>
        )}
      </div>

      {/* CTA Section */}
      {favorites.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to expand your collection?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Discover more rare and valuable antique coins from around the world
            </p>
            <Link 
              href="/coins" 
              className="inline-flex items-center bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200"
            >
              Browse More Coins
              <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
            </Link>
          </div>
        </section>
      )}
    </div>
  )
}
