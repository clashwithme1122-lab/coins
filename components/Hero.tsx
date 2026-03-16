'use client'

import { ArrowRight, ShieldCheck, Award, Globe, Play } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Hero() {
  const trustMarkers = [
    { icon: ShieldCheck, text: 'Certificate of Authenticity' },
    { icon: Award, text: 'Expert Graded' },
    { icon: Globe, text: 'Global Insured Shipping' }
  ]

  return (
    <section className="relative min-h-screen bg-[#0a0a0a] text-[#e0e0e0] overflow-hidden flex items-center">
      {/* Deep Velvet Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1a1525] to-[#2d1b4e] opacity-90 z-0"></div>
      
      {/* Subtle Texture/Grain */}
      <div className="absolute inset-0 opacity-[0.03] z-0" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-10"
          >
            {/* Trust Badges Top */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              {trustMarkers.map((marker, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm md:text-base text-amber-500 font-medium">
                  <marker.icon className="w-5 h-5" />
                  <span>{marker.text}</span>
                </div>
              ))}
            </motion.div>

            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-5xl lg:text-7xl font-playfair font-bold leading-tight tracking-tight text-white"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                Curating <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
                  Authenticated
                </span><br />
                Numismatic Treasures
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl md:text-2xl text-gray-300 font-light max-w-xl leading-relaxed"
              >
                Invest in history. Browse our expertly curated collection of Roman, Greek, and Mughal antique coins. 
                <span className="block mt-2 font-medium text-amber-500">Secure your legacy from $85.</span>
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-5"
            >
              <Link href="/coins" className="group flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-700 text-white rounded-md font-semibold text-lg hover:from-amber-400 hover:to-amber-600 transition-all duration-300 shadow-[0_0_20px_rgba(217,119,6,0.3)] hover:shadow-[0_0_30px_rgba(217,119,6,0.5)]">
                Acquire Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link href="/about" className="flex items-center justify-center px-8 py-4 border border-white/20 rounded-md font-medium text-lg hover:bg-white/5 transition-all duration-300 backdrop-blur-sm">
                View Our Provenance
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Content - Luxury Coin Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            className="relative lg:h-[600px] flex items-center justify-center"
          >
            {/* Glowing orb behind coin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 bg-amber-500/20 rounded-full blur-[100px] z-0 pointer-events-none"></div>
            
            <motion.div 
              className="relative z-10 p-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl"
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Replace with actual high-res coin image */}
              <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden border-2 border-amber-500/30">
                <img 
                  src="/assets/home.webp" 
                  alt="Rare Authentic Antique Coin" 
                  className="w-full h-full object-cover object-center transform hover:scale-110 transition-transform duration-700" 
                />
              </div>
              
              {/* Floating Rarity Badge */}
              <motion.div 
                className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 bg-[#1a1a1a] border border-amber-500/50 p-4 rounded-lg shadow-2xl backdrop-blur-xl"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <div className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Featured</div>
                <div className="text-sm md:text-base font-bold text-white">Roman Denarius</div>
                <div className="text-amber-500 font-semibold mt-1">Unique Specimen</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}