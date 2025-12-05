import { motion } from 'framer-motion'
import { Star, RotateCcw } from 'lucide-react'
import Link from 'next/link'

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

interface CoinCardProps {
  coin: Coin
  index?: number
}

export default function CoinCard({ coin, index = 0 }: CoinCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
    >
      {/* Coin Image */}
      <div className="relative h-40 sm:h-48 bg-gray-100 overflow-hidden group">
        {/* Reverse Icon */}
        <div className="absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white/90 backdrop-blur-sm p-1.5 sm:p-2 rounded-full shadow-lg hover:bg-white transition-colors">
            <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
          </button>
        </div>
        
        <motion.img
          src={coin.frontImage}
          alt={`${coin.title} - Front`}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-purple-600 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold">
          {coin.price}
        </div>
      </div>

      {/* Coin Details */}
      <div className="p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold mb-2 line-clamp-1">{coin.title}</h3>
        <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-2">{coin.description}</p>
        
        <div className="flex justify-between items-center text-xs sm:text-sm text-gray-500 mb-4">
          <span>{coin.year}</span>
          <span>{coin.weight}</span>
        </div>

        <div className="flex space-x-3">
          <Link 
            href={`/coins/${coin.id}`}
            className="flex-1 bg-purple-600 text-white text-center py-2 sm:py-2.5 rounded-lg hover:bg-purple-700 transition-colors duration-200 text-xs sm:text-sm"
          >
            View Details
          </Link>
          <button className="px-2 sm:px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
