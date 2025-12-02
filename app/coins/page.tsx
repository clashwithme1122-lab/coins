'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Star, ArrowRight } from 'lucide-react'
import { useGlobal } from '@/contexts/GlobalContext'

export default function CoinsPage() {
  const { formatPrice } = useGlobal()
  const [coins, setCoins] = useState<{
    id: number;
    title: string;
    price: number;
    weight: string;
    year: string;
    description: string;
    frontImage: string;
  }[]>([])

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
              description: "Rare silver denarius from Emperor Marcus Aurelius reign. This exceptional coin features the portrait of the emperor on the obverse and various military symbols on the reverse.",
              frontImage: "/assets/dummycoin.jpg"
            },
            {
              id: 2,
              title: "Greek Silver Tetradrachm",
              price: 3200,
              weight: "17.2g",
              year: "350 BC",
              description: "Classical Athenian silver coin with owl design. Minted during the golden age of Athens, this coin represents the pinnacle of Greek numismatic art.",
              frontImage: "/assets/dummycoin.jpg"
            }
          ])
        }
      } catch (error) {
        console.error('Failed to load coins:', error)
      }
    }

    loadCoins()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
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
        {coins.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">No coins available</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Check back soon for new additions to our collection</p>
            <Link 
              href="/admin/login" 
              className="inline-flex items-center bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Add Coins as Admin
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {coins.map((coin, index) => (
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
                  />
                  <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {formatPrice(coin.price)}
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
