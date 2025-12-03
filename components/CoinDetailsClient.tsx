'use client'

import { useState } from 'react'
import { Star, ShoppingCart, Heart, Share2 } from 'lucide-react'
import Image from 'next/image'
import { useGlobal } from '@/contexts/GlobalContext'

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

interface CoinDetailsClientProps {
  coin: Coin
}

export default function CoinDetailsClient({ coin }: CoinDetailsClientProps) {
  const { formatPrice, theme } = useGlobal()
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Images Section */}
      <div>
        {/* Main Image */}
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden`}>
          <div className="relative h-64 sm:h-80 lg:h-96 bg-gray-100">
            <Image
              src={imageTabs.find(tab => tab.key === activeImage)?.image || coin.frontImage}
              alt={`${coin.title} - ${activeImage}`}
              fill
              className="object-cover"
            />
          </div>
          
          {/* Image Tabs */}
          <div className={`flex ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} border-t`}>
            {imageTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveImage(tab.key as 'front' | 'back' | 'weight')}
                className={`flex-1 py-3 text-center border-b-2 transition-colors text-sm sm:text-base ${
                  activeImage === tab.key
                    ? 'border-purple-600 text-purple-600 font-medium'
                    : `border-transparent ${theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'}`
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Thumbnail Gallery */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-4 sm:mt-6">
          {imageTabs.map((tab, index) => (
            <button
              key={tab.key}
              onClick={() => setActiveImage(tab.key as 'front' | 'back' | 'weight')}
              className={`relative h-16 sm:h-24 bg-gray-100 rounded-lg overflow-hidden transition-all ${
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
      </div>

      {/* Details Section */}
      <div>
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-4 sm:p-6 lg:p-8`}>
          {/* Title and Price */}
          <div className="mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">{coin.title}</h1>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <span className="text-2xl sm:text-3xl font-bold text-purple-600">
                {formatPrice(parseFloat(coin.price.replace(/[^0-9.]/g, '')))}
              </span>
              <div className={`flex space-x-2`}>
                <button className={`p-2 border rounded-lg transition-colors ${
                  theme === 'dark' ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'
                }`}>
                  <Heart className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} />
                </button>
                <button className={`p-2 border rounded-lg transition-colors ${
                  theme === 'dark' ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'
                }`}>
                  <Share2 className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} p-3 sm:p-4 rounded-lg`}>
              <div className={`text-xs sm:text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Year</div>
              <div className={`font-semibold text-sm sm:text-base ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{coin.year}</div>
            </div>
            <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} p-3 sm:p-4 rounded-lg`}>
              <div className={`text-xs sm:text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Weight</div>
              <div className={`font-semibold text-sm sm:text-base ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{coin.weight}</div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6 sm:mb-8">
            <h2 className={`text-lg sm:text-xl font-semibold mb-3 sm:mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Description</h2>
            <p className={`leading-relaxed text-sm sm:text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{coin.description}</p>
          </div>

          {/* Historical Value */}
          {coin.historicalValue && (
            <div className="mb-6 sm:mb-8">
              <h2 className={`text-lg sm:text-xl font-semibold mb-3 sm:mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Historical Significance</h2>
              <div className={`${theme === 'dark' ? 'bg-purple-900 border-purple-700' : 'bg-purple-50 border-purple-200'} border rounded-lg p-3 sm:p-4`}>
                <p className={`text-sm sm:text-base ${theme === 'dark' ? 'text-purple-200' : 'text-purple-800'}`}>{coin.historicalValue}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3 sm:space-y-4">
            <button 
              onClick={addToCart}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center text-sm sm:text-base"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Add to Cart
            </button>
            
            <button 
              onClick={addToFavorites}
              className="w-full border border-purple-600 text-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors duration-200 flex items-center justify-center text-sm sm:text-base"
            >
              <Star className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Add to Favorites
            </button>
          </div>

          {/* Additional Info */}
          <div className={`mt-6 sm:mt-8 pt-6 sm:pt-8 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} border-t`}>
            <div className="grid grid-cols-3 gap-4 sm:gap-6 text-center">
              <div>
                <div className="text-lg sm:text-2xl font-bold text-purple-600 mb-1">Authentic</div>
                <div className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Guaranteed</div>
              </div>
              <div>
                <div className="text-lg sm:text-2xl font-bold text-purple-600 mb-1">Certified</div>
                <div className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Expert Verified</div>
              </div>
              <div>
                <div className="text-lg sm:text-2xl font-bold text-purple-600 mb-1">Insured</div>
                <div className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Shipping</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
