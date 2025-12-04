'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, BarChart3, PieChart, Activity, DollarSign, Eye, Calendar, Filter } from 'lucide-react'
import { useGlobal } from '@/contexts/GlobalContext'

export default function MarketAnalysisPage() {
  const { formatPrice, theme } = useGlobal()
  const [selectedPeriod, setSelectedPeriod] = useState('1M')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const periods = ['1D', '1W', '1M', '3M', '6M', '1Y', 'ALL']
  const categories = ['all', 'ancient', 'modern', 'us', 'world', 'bullion']

  const marketStats = [
    {
      title: "Market Cap",
      value: formatPrice(2400000),
      change: "+12.5%",
      trend: "up",
      description: "Total market value"
    },
    {
      title: "24h Volume",
      value: formatPrice(45200),
      change: "+8.3%",
      trend: "up", 
      description: "Trading volume today"
    },
    {
      title: "Active Listings",
      value: "1,247",
      change: "-2.1%",
      trend: "down",
      description: "Coins for sale"
    },
    {
      title: "Avg. Price",
      value: formatPrice(1847),
      change: "+5.7%",
      trend: "up",
      description: "Average coin price"
    }
  ]

  const topGainers = [
    { name: "1909-S VDB Lincoln", price: formatPrice(3200), change: "+24.5%", volume: "High", category: "us" },
    { name: "Roman Aureus", price: formatPrice(8500), change: "+18.2%", volume: "Medium", category: "ancient" },
    { name: "Morgan Dollar 1893-S", price: formatPrice(2100), change: "+15.8%", volume: "High", category: "us" },
    { name: "Greek Tetradrachm", price: formatPrice(4300), change: "+12.3%", volume: "Low", category: "ancient" },
    { name: "British Sovereign", price: formatPrice(1450), change: "+10.1%", volume: "Medium", category: "world" }
  ]

  const topLosers = [
    { name: "Modern Commemorative", price: formatPrice(120), change: "-8.5%", volume: "Low", category: "modern" },
    { name: "Common Wheat Cent", price: formatPrice(45), change: "-6.2%", volume: "High", category: "us" },
    { name: "Silver Eagle 2022", price: formatPrice(28), change: "-4.3%", volume: "High", category: "bullion" },
    { name: "Buffalo Nickel", price: formatPrice(85), change: "-3.8%", volume: "Medium", category: "us" },
    { name: "Jefferson Nickel", price: formatPrice(12), change: "-2.1%", volume: "Low", category: "us" }
  ]

  // Filter data based on selected category
  const filteredGainers = selectedCategory === 'all' 
    ? topGainers 
    : topGainers.filter(coin => coin.category === selectedCategory)
  
  const filteredLosers = selectedCategory === 'all'
    ? topLosers
    : topLosers.filter(coin => coin.category === selectedCategory)

  const marketTrends = [
    {
      category: "Ancient Coins",
      performance: "+18.5%",
      description: "Strong demand for classical period coins",
      outlook: "Bullish"
    },
    {
      category: "US Coins",
      performance: "+12.3%",
      description: "Morgan dollars and early cents leading gains",
      outlook: "Bullish"
    },
    {
      category: "World Coins",
      performance: "+8.7%",
      description: "European gold coins showing strength",
      outlook: "Neutral"
    },
    {
      category: "Modern Bullion",
      performance: "-2.4%",
      description: "Precious metals price volatility",
      outlook: "Bearish"
    }
  ]

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? (
      <TrendingUp className="w-4 h-4 text-green-500" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-500" />
    )
  }

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-500' : 'text-red-500'
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <BarChart3 className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Market Analysis</h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Real-time market analysis and trends for the coin collecting community. Track prices, volumes, and market movements.
            </p>
            <div className="mt-4 text-sm text-purple-200">
              Prices shown in {formatPrice(100).split('100')[0]}100
            </div>
          </motion.div>
        </div>
      </div>

      {/* Market Stats */}
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-6`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <DollarSign className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex items-center">
                    {getTrendIcon(stat.trend)}
                    <span className={`ml-1 text-sm font-medium ${getTrendColor(stat.trend)}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.title}</div>
                <div className="text-xs text-gray-500 mt-1">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              {periods.map(period => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedPeriod === period
                      ? 'bg-purple-600 text-white'
                      : theme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Filter className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600 ${
                  theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                }`}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Gainers & Losers */}
          <div className="lg:col-span-2 space-y-8">
            {/* Top Gainers */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center">
                  <TrendingUp className="w-5 h-5 text-green-500 mr-2" />
                  Top Gainers
                </h2>
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Last 24 hours</span>
              </div>
              <div className="space-y-4">
                {filteredGainers.map((coin, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 ${
                      theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                    } rounded-lg transition-colors`}>
                    <div className="flex-1">
                      <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{coin.name}</h3>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Volume: {coin.volume}</p>
                    </div>
                    <div className="text-right">
                      <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{coin.price}</div>
                      <div className="text-sm text-green-500 font-medium">{coin.change}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Top Losers */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center">
                  <TrendingDown className="w-5 h-5 text-red-500 mr-2" />
                  Top Losers
                </h2>
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Last 24 hours</span>
              </div>
              <div className="space-y-4">
                {filteredLosers.map((coin, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 ${
                      theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                    } rounded-lg transition-colors`}>
                    <div className="flex-1">
                      <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{coin.name}</h3>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Volume: {coin.volume}</p>
                    </div>
                    <div className="text-right">
                      <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{coin.price}</div>
                      <div className="text-sm text-red-500 font-medium">{coin.change}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Market Trends */}
          <div className="space-y-8">
            {/* Market Trends by Category */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}
            >
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <PieChart className="w-5 h-5 text-purple-600 mr-2" />
                Market Trends
              </h2>
              <div className="space-y-4">
                {marketTrends.map((trend, index) => (
                  <div key={index} className={`border-b pb-4 last:border-0 ${
                    theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{trend.category}</h3>
                      <span className={`text-sm font-semibold ${
                        trend.performance.startsWith('+') ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {trend.performance}
                      </span>
                    </div>
                    <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{trend.description}</p>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Outlook</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        trend.outlook === 'Bullish' ? 'bg-green-100 text-green-700' :
                        trend.outlook === 'Bearish' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {trend.outlook}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Market Activity */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}
            >
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Activity className="w-5 h-5 text-purple-600 mr-2" />
                Market Activity
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Active Traders</span>
                  <span className="font-semibold">847</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Total Trades Today</span>
                  <span className="font-semibold">1,293</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Market Sentiment</span>
                  <span className="text-green-500 font-semibold">Bullish</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Volatility Index</span>
                  <span className="font-semibold">Medium</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Market Insights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-purple-50 rounded-xl p-8 mt-8"
        >
          <h2 className="text-2xl font-bold mb-6">Market Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6">
              <Eye className="w-8 h-8 text-purple-600 mb-4" />
              <h3 className="font-semibold mb-2">Watch This Week</h3>
              <p className="text-sm text-gray-600">
                Ancient Roman coins showing increased institutional interest. Look for rare mint marks.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <Calendar className="w-8 h-8 text-purple-600 mb-4" />
              <h3 className="font-semibold mb-2">Upcoming Auctions</h3>
              <p className="text-sm text-gray-600">
                Major coin show next month expected to drive prices for US type coins higher.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <BarChart3 className="w-8 h-8 text-purple-600 mb-4" />
              <h3 className="font-semibold mb-2">Investment Outlook</h3>
              <p className="text-sm text-gray-600">
                Strong fundamentals in rare coin market with 15% annual growth projected.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Ahead of the Market</h2>
          <p className="text-gray-600 mb-6">
            Get daily market analysis and investment insights delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
            />
            <button className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
