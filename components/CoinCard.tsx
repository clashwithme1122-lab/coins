import { motion } from 'framer-motion'
import { Link2, ShieldCheck, Eye, Clock } from 'lucide-react'
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
  // Deterministic "randomness" based on coin ID/index to avoid hydration mismatches
  const viewersCount = (coin.id % 7) + 2
  const isScarce = coin.id % 3 === 0
  const urgencyText = coin.id % 2 === 0 ? "High demand" : "Recently discovered"

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-400"
    >
      {/* Rarity & Scarcity Badges */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
        {isScarce && (
          <span className="bg-red-600/90 backdrop-blur-md text-white px-2.5 py-1 rounded text-xs font-bold tracking-wider uppercase border border-red-500/50 shadow-lg">
            Rare Specimen
          </span>
        )}
        <span className="bg-[#1a1a1a]/80 backdrop-blur-md text-amber-500 border border-amber-500/30 px-2.5 py-1 rounded flex items-center gap-1.5 text-xs font-medium shadow-lg">
          <ShieldCheck className="w-3.5 h-3.5" /> Authentic
        </span>
      </div>

      {/* Coin Image */}
      <div className="relative h-56 sm:h-64 bg-gray-50 dark:bg-[#0a0a0a] overflow-hidden flex items-center justify-center p-6">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        
        <motion.img
          src={coin.frontImage}
          alt={`${coin.title}`}
          className="w-full h-full object-contain filter drop-shadow-xl relative z-0"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        
        {/* Hover overlay CTA */}
        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link 
            href={`/coins/${coin.id}`}
            className="bg-amber-600 text-white p-3 rounded-full hover:bg-amber-500 transition-colors shadow-lg transform translate-y-4 group-hover:translate-y-0"
          >
            <Link2 className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Coin Details */}
      <div className="p-5 sm:p-6 relative">
        {/* Price Anchor */}
        <div className="absolute -top-6 right-4 bg-amber-500 text-white px-4 py-1.5 rounded-sm text-sm font-bold shadow-lg transform group-hover:-translate-y-1 transition-transform">
          {coin.price}
        </div>

        <h3 className="text-lg sm:text-xl font-playfair font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 border-b border-gray-100 dark:border-gray-800 pb-3" style={{ fontFamily: '"Playfair Display", serif' }}>
          {coin.title}
        </h3>
        
        {/* Attributes */}
        <div className="grid grid-cols-2 gap-2 my-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-gray-800 dark:text-gray-200">Era:</span> {coin.year}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-gray-800 dark:text-gray-200">Wt:</span> {coin.weight}
          </div>
        </div>

        {/* Psychological Triggers */}
        <div className="space-y-2 mb-6">
          <div className="text-xs flex items-center text-amber-600 dark:text-amber-500 font-medium">
            <Eye className="w-3.5 h-3.5 mr-1.5 animate-pulse" />
            {viewersCount} collectors viewing this
          </div>
          <div className="text-xs flex items-center text-gray-500 dark:text-gray-500">
            <Clock className="w-3.5 h-3.5 mr-1.5" />
            {urgencyText}
          </div>
        </div>

        {/* Action Button */}
        <Link 
          href={`/coins/${coin.id}`}
          className="block w-full text-center bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 rounded text-sm font-bold hover:bg-amber-600 dark:hover:bg-amber-500 hover:text-white transition-colors duration-300"
        >
          Secure This Piece
        </Link>
      </div>
    </motion.div>
  )
}
