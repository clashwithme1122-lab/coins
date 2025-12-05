'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Shield, Target, PiggyBank, AlertTriangle, CheckCircle, DollarSign, BarChart3, Award, BookOpen, Lock, Eye, Star, Calculator, ArrowRight } from 'lucide-react'
import { useGlobal } from '@/contexts/GlobalContext'
import Link from 'next/link'

export default function InvestingPage() {
  const { formatPrice, theme } = useGlobal()
  const [selectedStrategy, setSelectedStrategy] = useState('beginner')
  const [calculatorValues, setCalculatorValues] = useState({
    investment: 10000,
    years: 10,
    returnRate: 12
  })

  const handleGetStarted = () => {
    window.location.href = '/coins'
  }

  const handleDownloadGuide = () => {
    window.open('/investment-tips', '_blank')
  }

  const calculateReturns = () => {
    const { investment, years, returnRate } = calculatorValues
    // More realistic coin investment calculation with compound interest
    // Historical coin investments average 8-15% annually depending on strategy
    const futureValue = investment * Math.pow(1 + returnRate / 100, years)
    return Math.round(futureValue)
  }

  const educationalArticles = [
    {
      id: 'diversification',
      title: 'Building a Diversified Numismatic Portfolio',
      category: 'strategy',
      level: 'intermediate',
      readTime: '8 min read',
      description: 'Learn how to create a balanced coin collection that minimizes risk while maximizing potential returns through strategic diversification across different coin types, metals, and historical periods.',
      keyTakeaways: [
        'Diversify across U.S., world, and ancient coins',
        'Include both bullion and numismatic pieces',
        'Balance different precious metals (gold, silver, platinum)'
      ],
      url: 'https://www.pcgs.com/guides/diversify-coin-portfolio'
    },
    {
      id: 'risk-management',
      title: 'Understanding and Managing Investment Risks',
      category: 'risk',
      level: 'beginner',
      readTime: '6 min read',
      description: 'Essential strategies for identifying, assessing, and mitigating risks in coin collecting investments, including market volatility, counterfeit concerns, and liquidity challenges.',
      keyTakeaways: [
        'Always buy certified, graded coins from reputable dealers',
        'Diversify to reduce concentration risk',
        'Understand market cycles and timing'
      ],
      url: 'https://www.ngccoin.com/coin-collecting-investing/coin-investment-risks'
    },
    {
      id: 'market-opportunities',
      title: 'Identifying Emerging Market Opportunities',
      category: 'opportunity',
      level: 'advanced',
      readTime: '10 min read',
      description: 'Discover how to spot undervalued coins and emerging collecting trends that offer significant growth potential in the current numismatic market.',
      keyTakeaways: [
        'Research historical price trends and patterns',
        'Monitor auction results and market indicators',
        'Identify collecting trends among younger demographics'
      ],
      url: 'https://www.coinworld.com/news/coin-market-trends'
    },
    {
      id: 'coin-grading',
      title: 'Mastering Coin Grading for Investment Success',
      category: 'education',
      level: 'intermediate',
      readTime: '12 min read',
      description: 'Comprehensive guide to understanding coin grading systems, how grading affects value, and using grading knowledge to make better investment decisions.',
      keyTakeaways: [
        'Learn the Sheldon Scale (1-70) grading system',
        'Understand how grading affects market value',
        'Recognize grading inconsistencies between services'
      ],
      url: 'https://www.pcgs.com/grades/understanding-coin-grading'
    }
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'strategy': return 'bg-blue-100 text-blue-700'
      case 'risk': return 'bg-red-100 text-red-700'
      case 'opportunity': return 'bg-green-100 text-green-700'
      case 'education': return 'bg-purple-100 text-purple-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-700'
      case 'intermediate': return 'bg-yellow-100 text-yellow-700'
      case 'advanced': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const strategies = [
    {
      id: 'beginner',
      title: 'Starter Portfolio',
      minInvestment: formatPrice(1000),
      riskLevel: 'Low',
      expectedReturn: '8-12%',
      timeframe: '3-5 years',
      description: 'Begin with affordable, graded modern coins and bullion',
      coins: ['American Silver Eagles', 'Modern Commemoratives', 'Common Date Morgan Dollars', 'Canadian Maples'],
      allocation: [
        { type: 'Modern Bullion', percentage: 40 },
        { type: 'US Silver Coins', percentage: 30 },
        { type: 'World Bullion', percentage: 20 },
        { type: 'Modern Commemoratives', percentage: 10 }
      ],
      features: ['Low entry barrier', 'High liquidity', 'Inflation hedge', 'Easy to understand']
    },
    {
      id: 'intermediate',
      title: 'Growth Portfolio',
      minInvestment: formatPrice(10000),
      riskLevel: 'Medium',
      expectedReturn: '12-18%',
      timeframe: '5-7 years',
      description: 'Balanced mix of key date coins and semi-rare numismatic pieces',
      coins: ['Key Date Coins', 'Mint Error Coins', 'Type Sets', 'World Gold Coins'],
      allocation: [
        { type: 'Key Date US Coins', percentage: 35 },
        { type: 'World Gold Coins', percentage: 25 },
        { type: 'Ancient Coins', percentage: 20 },
        { type: 'Mint Errors & Varieties', percentage: 20 }
      ],
      features: ['Strong appreciation potential', 'Collector demand', 'Historical significance', 'Portfolio balance']
    },
    {
      id: 'advanced',
      title: 'High-Value Portfolio',
      minInvestment: formatPrice(50000),
      riskLevel: 'High',
      expectedReturn: '18-25%',
      timeframe: '7-10 years',
      description: 'Focus on ultra-rare, investment-grade coins and historical treasures',
      coins: ['Ultra-Rare Coins', 'Proof Sets', 'Pattern Coins', 'Historical Medals'],
      allocation: [
        { type: 'Ultra-Rare US Coins', percentage: 35 },
        { type: 'Ancient Gold Coins', percentage: 30 },
        { type: 'Pattern & Experimental', percentage: 20 },
        { type: 'Historical Significance', percentage: 15 }
      ],
      features: ['Exceptional rarity', 'Museum quality', 'Prestige value', 'Generational wealth']
    }
  ]

  const currentStrategy = strategies.find(s => s.id === selectedStrategy) || strategies[0]

  const benefits = [
    {
      icon: Shield,
      title: 'Tangible Asset',
      description: 'Physical coins you can hold and store securely',
      details: 'Unlike digital assets, coins are real, physical items you possess'
    },
    {
      icon: TrendingUp,
      title: 'Historical Growth',
      description: 'Coins have shown consistent appreciation over decades',
      details: 'Rare coins have outperformed traditional investments over 20+ year periods'
    },
    {
      icon: Target,
      title: 'Portfolio Diversification',
      description: 'Alternative investment class uncorrelated with stocks',
      details: 'Coin values often move independently of traditional financial markets'
    },
    {
      icon: PiggyBank,
      title: 'Inflation Hedge',
      description: 'Precious metals retain value during economic uncertainty',
      details: 'Gold and silver coins have preserved wealth through inflationary periods'
    },
    {
      icon: Star,
      title: 'Historical Significance',
      description: 'Own pieces of history and cultural heritage',
      details: 'Each coin tells a story and connects you to historical moments'
    },
    {
      icon: Lock,
      title: 'Privacy & Security',
      description: 'Private ownership with secure storage options',
      details: 'No public reporting requirements and multiple secure storage methods'
    }
  ]

  const risks = [
    {
      icon: AlertTriangle,
      title: 'Market Volatility',
      description: 'Coin prices can fluctuate based on collector demand',
      mitigation: 'Maintain long-term perspective and diversify holdings'
    },
    {
      icon: AlertTriangle,
      title: 'Liquidity Risk',
      description: 'Rare coins may take time to sell at fair market value',
      mitigation: 'Keep some liquid coins and plan for longer holding periods'
    },
    {
      icon: AlertTriangle,
      title: 'Authentication Costs',
      description: 'Professional grading and authentication required',
      mitigation: 'Factor in 3-5% of coin value for grading and certification'
    },
    {
      icon: AlertTriangle,
      title: 'Storage & Insurance',
      description: 'Secure storage and insurance add to costs',
      mitigation: 'Budget 1-2% annually for professional storage and insurance'
    },
    {
      icon: AlertTriangle,
      title: 'Counterfeit Risk',
      description: 'Fake coins exist in the marketplace',
      mitigation: 'Only buy graded coins from reputable dealers'
    },
    {
      icon: AlertTriangle,
      title: 'Knowledge Barrier',
      description: 'Requires expertise to identify good opportunities',
      mitigation: 'Start with common coins and gradually build knowledge'
    }
  ]

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low': return 'bg-green-100 text-green-700'
      case 'Medium': return 'bg-yellow-100 text-yellow-700'
      case 'High': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                <BarChart3 className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Coin Investment Guide</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
              Expert guidance on building a valuable coin collection portfolio. From beginner strategies to advanced investment techniques.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/coins"
                className="bg-white text-purple-700 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors inline-flex items-center"
              >
                Browse Investment Coins
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link 
                href="/investment-tips"
                className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors inline-flex items-center"
              >
                Investment Tips
                <BookOpen className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Investment Calculator */}
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Investment Calculator</h2>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Estimate potential returns on your coin investment
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-6`}>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Initial Investment
              </label>
              <div className="relative">
                <DollarSign className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'} w-5 h-5`} />
                <input
                  type="number"
                  value={calculatorValues.investment}
                  onChange={(e) => setCalculatorValues({...calculatorValues, investment: parseInt(e.target.value) || 0})}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600 ${
                    theme === 'dark' ? 'border-gray-600 bg-gray-600 text-white' : 'border-gray-300'
                  }`}
                />
              </div>
            </div>
            <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-6`}>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Investment Period
              </label>
              <select 
                value={calculatorValues.years}
                onChange={(e) => setCalculatorValues({...calculatorValues, years: parseInt(e.target.value)})}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600 ${
                  theme === 'dark' ? 'border-gray-600 bg-gray-600 text-white' : 'border-gray-300'
                }`}
              >
                <option value={5}>5 years</option>
                <option value={10}>10 years</option>
                <option value={15}>15 years</option>
                <option value={20}>20 years</option>
              </select>
            </div>
            <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-6`}>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Expected Return
              </label>
              <select 
                value={calculatorValues.returnRate}
                onChange={(e) => setCalculatorValues({...calculatorValues, returnRate: parseInt(e.target.value)})}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600 ${
                  theme === 'dark' ? 'border-gray-600 bg-gray-600 text-white' : 'border-gray-300'
                }`}
              >
                <option value={6}>Conservative (6%) - High-grade bullion</option>
                <option value={10}>Moderate (10%) - Mixed portfolio</option>
                <option value={15}>Aggressive (15%) - Rare coins</option>
                <option value={20}>High Growth (20%) - Ultra-rare coins</option>
              </select>
            </div>
          </div>
          <div className={`mt-6 ${theme === 'dark' ? 'bg-purple-900' : 'bg-purple-50'} rounded-xl p-6 text-center`}>
            <div className="flex items-center justify-center mb-2">
              <Calculator className={`w-6 h-6 mr-2 ${theme === 'dark' ? 'text-purple-300' : 'text-purple-600'}`} />
              <p className={`text-sm ${theme === 'dark' ? 'text-purple-200' : 'text-gray-600'}`}>Estimated Future Value</p>
            </div>
            <p className="text-4xl font-bold text-purple-600">{formatPrice(calculateReturns())}</p>
            <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-purple-300' : 'text-gray-500'}`}>
              Based on {calculatorValues.returnRate}% annual return over {calculatorValues.years} years
            </p>
            <div className={`mt-3 p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-purple-100'}`}>
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-purple-700'}`}>
                <strong>Note:</strong> These estimates are based on historical coin investment data. 
                Actual returns may vary based on market conditions, coin quality, and timing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Strategy Selection */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Choose Your Investment Strategy</h2>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Select a portfolio strategy that matches your investment goals and risk tolerance
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {strategies.map((strategy, index) => (
            <motion.div
              key={strategy.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 cursor-pointer transition-all ${
                selectedStrategy === strategy.id ? 'ring-2 ring-purple-600 transform scale-105' : 'hover:shadow-xl hover:transform hover:scale-102'
              }`}
              onClick={() => setSelectedStrategy(strategy.id)}
            >
              <div className="text-center mb-4">
                <h3 className="text-xl font-semibold mb-2">{strategy.title}</h3>
                <div className="text-3xl font-bold text-purple-600 mb-1">{strategy.minInvestment}</div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Minimum investment</p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Risk Level</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(strategy.riskLevel)}`}>
                    {strategy.riskLevel}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Expected Return</span>
                  <span className="text-sm font-medium text-green-600">{strategy.expectedReturn}</span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Timeframe</span>
                  <span className="text-sm font-medium">{strategy.timeframe}</span>
                </div>
              </div>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mt-4 mb-4`}>{strategy.description}</p>
              <div className="border-t pt-3">
                <p className={`text-xs font-medium mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Key Features:</p>
                <div className="flex flex-wrap gap-1">
                  {strategy.features.slice(0, 2).map((feature, idx) => (
                    <span key={idx} className={`text-xs px-2 py-1 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Strategy Details */}
        <motion.div
          key={selectedStrategy}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8`}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">{currentStrategy.title} Details</h3>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(currentStrategy.riskLevel)}`}>
              {currentStrategy.riskLevel} Risk
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Portfolio Allocation */}
            <div>
              <h4 className="font-medium mb-4 flex items-center">
                <Target className="w-4 h-4 mr-2 text-purple-600" />
                Portfolio Allocation
              </h4>
              <div className="space-y-3">
                {currentStrategy.allocation.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{item.type}</span>
                      <span className="text-sm text-gray-600">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-600 to-purple-700 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Coins */}
            <div>
              <h4 className="font-medium mb-4 flex items-center">
                <Star className="w-4 h-4 mr-2 text-purple-600" />
                Recommended Coin Types
              </h4>
              <div className="space-y-2">
                {currentStrategy.coins.map((coin, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{coin}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                <p className="text-xs text-purple-700">
                  <strong>Strategy Tip:</strong> Focus on graded coins from reputable dealers to ensure authenticity and value.
                </p>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-medium mb-3">Portfolio Features</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {currentStrategy.features.map((feature, index) => (
                <div key={index} className="flex items-center text-sm">
                  <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Benefits */}
      <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Why Invest in Coins?</h2>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Discover the unique advantages of numismatic investments
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} rounded-xl shadow-lg p-6 hover:shadow-xl transition-all`}
              >
                <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-3`}>{benefit.description}</p>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{benefit.details}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Educational Articles Section */}
      <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Educational Resources</h2>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              In-depth guides to enhance your coin investment knowledge
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {educationalArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} rounded-xl shadow-lg p-6 border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'} hover:shadow-xl transition-all`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                        {article.category}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(article.level)}`}>
                        {article.level}
                      </span>
                      <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {article.readTime}
                      </span>
                    </div>
                    <h3 className="font-semibold mb-2">{article.title}</h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                      {article.description}
                    </p>
                    <div className="mb-4">
                      <p className={`text-xs font-medium mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Key Takeaways:</p>
                      <ul className="space-y-1">
                        {article.keyTakeaways.map((takeaway, idx) => (
                          <li key={idx} className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} flex items-start`}>
                            <CheckCircle className="w-3 h-3 text-green-500 mr-1 flex-shrink-0 mt-0.5" />
                            {takeaway}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => window.open(article.url, '_blank')}
                    className="inline-flex items-center px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Risks */}
      <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Investment Risks & Mitigation</h2>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Understanding risks and how to manage them effectively
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {risks.map((risk, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${theme === 'dark' ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'} rounded-xl p-6 border`}
              >
                <div className="flex items-center mb-3">
                  <risk.icon className="w-5 h-5 text-red-600 mr-2" />
                  <h3 className="font-semibold">{risk.title}</h3>
                </div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-3`}>{risk.description}</p>
                <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-red-100'}`}>
                  <p className={`text-xs font-medium ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>Mitigation:</p>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-red-600'}`}>{risk.mitigation}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Getting Started */}
      <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-purple-50'} border-t ${theme === 'dark' ? 'border-gray-700' : 'border-purple-200'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Getting Started Guide</h2>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Your path to successful coin investing in 4 simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-semibold mb-2">Research & Learn</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Study coin types, grading systems, and market trends</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-semibold mb-2">Set Strategy & Budget</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Choose your investment strategy and determine your budget</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-semibold mb-2">Buy Quality Coins</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Purchase authenticated, graded coins from reputable dealers</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="font-semibold mb-2">Monitor & Grow</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Track performance and rebalance your portfolio as needed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced CTA */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-8"
          >
            <Award className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Coin Investment Journey?</h2>
            <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
              Join thousands of successful coin investors building wealth through numismatic treasures. 
              Start with our curated collection of investment-grade coins.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleGetStarted}
                className="bg-white text-purple-700 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-colors inline-flex items-center text-lg"
              >
                Browse Investment Coins
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button 
                onClick={handleDownloadGuide}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors inline-flex items-center text-lg"
              >
                View Investment Tips
                <BookOpen className="w-5 h-5 ml-2" />
              </button>
            </div>
            <div className="mt-8 text-purple-100">
              <p className="text-sm mb-2">Need personalized guidance?</p>
              <p className="text-xs">Our expert team is here to help you make informed investment decisions.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
