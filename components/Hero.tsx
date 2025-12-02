'use client'

import { ArrowRight, Play, TrendingUp, Shield, Zap, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(false)

  const features = [
    { icon: TrendingUp, title: 'Real-time Analytics', description: 'Track market movements instantly' },
    { icon: Shield, title: 'Secure Trading', description: 'Bank-grade security for your assets' },
    { icon: Zap, title: 'Lightning Fast', description: 'Execute trades in milliseconds' }
  ]

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-purple-500 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-20 bg-white/10 rounded-full backdrop-blur-sm"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)]">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
              >
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                <span className="text-sm">Live Market Data • 24/7 Trading</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl lg:text-6xl font-bold leading-tight"
              >
                Advanced
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-700">
                  Crypto Analytics
                </span>
                Platform
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-300 leading-relaxed"
              >
                Experience the future of cryptocurrency trading with real-time market data, 
                advanced analytics, and professional tools designed for serious traders.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button className="crypto-button bg-white text-purple-600 hover:bg-gray-100">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              
              <button
                onClick={() => setIsPlaying(true)}
                className="flex items-center justify-center px-6 py-3 border border-white/30 rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                <Play className="w-5 h-5 mr-2" />
                View Demo
              </button>
            </motion.div>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center space-x-3 p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10"
                >
                  <feature.icon className="w-5 h-5 text-purple-500" />
                  <div>
                    <div className="font-semibold text-sm">{feature.title}</div>
                    <div className="text-xs text-gray-400">{feature.description}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10">
              <div className="bg-gradient-to-r from-purple-700/20 to-purple-500/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="aspect-square bg-gradient-to-br from-purple-700 to-purple-500 rounded-xl flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-2xl font-bold">$2.3T+</div>
                    <div className="text-sm text-gray-300">24h Trading Volume</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-4 -right-4 w-24 h-24 bg-purple-500/20 backdrop-blur-sm rounded-full border border-purple-500/30"
            />
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 2 }}
              className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-700/20 backdrop-blur-sm rounded-full border border-purple-700/30"
            />
          </motion.div>
        </div>
      </div>

      {/* Demo Modal */}
      {isPlaying && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-semibold">Platform Demo</h3>
              <button
                onClick={() => setIsPlaying(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video bg-gray-900 flex items-center justify-center">
              <p className="text-gray-400">Demo video placeholder</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}