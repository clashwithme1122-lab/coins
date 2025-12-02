import { motion } from 'framer-motion'
import { Star, ShoppingCart, Heart, Share2 } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

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

interface CoinDetailsProps {
  coin: Coin
}

export default function CoinDetails({ coin }: CoinDetailsProps) {
  const [activeImage, setActiveImage] = useState<'front' | 'back' | 'weight'>('front')

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    cart.push({ ...coin, quantity: 1 })
    localStorage.setItem('cart', JSON.stringify(cart))
    alert('Added to cart!')
  }

  const addToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    if (!favorites.find((fav: Coin) => fav.id === coin.id)) {
      favorites.push(coin)
      localStorage.setItem('favorites', JSON.stringify(favorites))
      alert('Added to favorites!')
    } else {
      alert('Already in favorites!')
    }
  }

  const imageTabs = [
    { key: 'front', label: 'Front', image: coin.frontImage },
    { key: 'back', label: 'Back', image: coin.backImage },
    { key: 'weight', label: 'Weight', image: coin.weightImage }
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Images Section */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Main Image */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative h-96 bg-gray-100">
            <Image
              src={imageTabs.find(tab => tab.key === activeImage)?.image || coin.frontImage}
              alt={`${coin.title} - ${activeImage}`}
              fill
              className="object-cover"
            />
          </div>
          
          {/* Image Tabs */}
          <div className="flex border-t border-gray-200">
            {imageTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveImage(tab.key as 'front' | 'back' | 'weight')}
                className={`flex-1 py-3 text-center border-b-2 transition-colors ${
                  activeImage === tab.key
                    ? 'border-purple-600 text-purple-600 font-medium'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Thumbnail Gallery */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {imageTabs.map((tab, index) => (
            <button
              key={tab.key}
              onClick={() => setActiveImage(tab.key as 'front' | 'back' | 'weight')}
              className={`relative h-24 bg-gray-100 rounded-lg overflow-hidden transition-all ${
                activeImage === tab.key ? 'ring-2 ring-purple-600' : ''
              }`}
            >
              <Image
                src={tab.image}
                alt={`${coin.title} - ${tab.label}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </motion.div>

      {/* Details Section */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Title and Price */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{coin.title}</h1>
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl font-bold text-purple-600">{coin.price}</span>
              <div className="flex space-x-2">
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Heart className="w-5 h-5 text-gray-400" />
                </button>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Share2 className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Year</div>
              <div className="font-semibold">{coin.year}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Weight</div>
              <div className="font-semibold">{coin.weight}</div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-600 leading-relaxed">{coin.description}</p>
          </div>

          {/* Historical Value */}
          {coin.historicalValue && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Historical Significance</h2>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-purple-800">{coin.historicalValue}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-4">
            <button 
              onClick={addToCart}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </button>
            
            <button 
              onClick={addToFavorites}
              className="w-full border border-purple-600 text-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors duration-200 flex items-center justify-center"
            >
              <Star className="w-5 h-5 mr-2" />
              Add to Favorites
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-purple-600 mb-1">Authentic</div>
                <div className="text-sm text-gray-600">Guaranteed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600 mb-1">Certified</div>
                <div className="text-sm text-gray-600">Expert Verified</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600 mb-1">Insured</div>
                <div className="text-sm text-gray-600">Shipping</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
