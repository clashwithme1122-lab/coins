'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Shield, Target, PiggyBank, AlertTriangle, CheckCircle, DollarSign, BarChart3, Award } from 'lucide-react'
import { useGlobal } from '@/contexts/GlobalContext'

export default function InvestingPage() {
  const { formatPrice, theme } = useGlobal()
  const [selectedStrategy, setSelectedStrategy] = useState('beginner')

  const strategies = [
    {
      id: 'beginner',
      title: 'Beginner Portfolio',
      minInvestment: formatPrice(500),
      riskLevel: 'Low',
      expectedReturn: '8-12%',
      timeframe: '2-5 years',
      description: 'Start with affordable, historically stable coins',
      coins: ['Common Date Morgan Dollars', 'Modern Commemoratives', 'Silver Eagles'],
      allocation: [
        { type: 'US Silver Coins', percentage: 40 },
        { type: 'Modern Bullion', percentage: 30 },
        { type: 'World Coins', percentage: 20 },
        { type: 'Ancient Coins', percentage: 10 }
      ]
    },
    {
      id: 'intermediate',
      title: 'Growth Portfolio',
      minInvestment: formatPrice(5000),
      riskLevel: 'Medium',
      expectedReturn: '12-18%',
      timeframe: '3-7 years',
      description: 'Balanced mix of rare and semi-rare coins',
      coins: ['Key Date Coins', 'Mint Error Coins', 'Type Sets'],
      allocation: [
        { type: 'Key Date US Coins', percentage: 35 },
        { type: 'World Gold Coins', percentage: 25 },
        { type: 'Ancient Coins', percentage: 25 },
        { type: 'Mint Errors', percentage: 15 }
      ]
    },
    {
      id: 'advanced',
      title: 'High-Value Portfolio',
      minInvestment: formatPrice(25000),
      riskLevel: 'High',
      expectedReturn: '18-25%',
      timeframe: '5-10 years',
      description: 'Focus on rare, investment-grade coins',
      coins: ['Ultra-Rare Coins', 'Proof Sets', 'Historical Significance'],
      allocation: [
        { type: 'Ultra-Rare US Coins', percentage: 40 },
        { type: 'Ancient Gold Coins', percentage: 30 },
        { type: 'Pattern Coins', percentage: 20 },
        { type: 'Historical Medals', percentage: 10 }
      ]
    }
  ]

  const currentStrategy = strategies.find(s => s.id === selectedStrategy) || strategies[0]

  const benefits = [
    {
      icon: Shield,
      title: 'Tangible Asset',
      description: 'Physical coins you can hold and store securely'
    },
    {
      icon: TrendingUp,
      title: 'Historical Growth',
      description: 'Coins have shown consistent appreciation over decades'
    },
    {
      icon: Target,
      title: 'Portfolio Diversification',
      description: 'Alternative investment class uncorrelated with stocks'
    },
    {
      icon: PiggyBank,
      title: 'Inflation Hedge',
      description: 'Precious metals retain value during economic uncertainty'
    }
  ]

  const risks = [
    {
      icon: AlertTriangle,
      title: 'Market Volatility',
      description: 'Coin prices can fluctuate based on collector demand'
    },
    {
      icon: AlertTriangle,
      title: 'Liquidity Risk',
      description: 'Rare coins may take time to sell at fair market value'
    },
    {
      icon: AlertTriangle,
      title: 'Authentication Costs',
      description: 'Professional grading and authentication required'
    },
    {
      icon: AlertTriangle,
      title: 'Storage & Insurance',
      description: 'Secure storage and insurance add to costs'
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
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <BarChart3 className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Coin Investment Guide</h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Expert guidance on building a valuable coin collection portfolio. From beginner strategies to advanced investment techniques.
            </p>
            <div className="mt-4 text-sm text-purple-200">
              Investment amounts shown in {formatPrice(100).split('100')[0]}100
            </div>
          </motion.div>
        </div>
      </div>

      {/* Investment Calculator */}
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-center mb-8">Investment Calculator</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-6`}>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Initial Investment</label>
              <div className="relative">
                <DollarSign className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'} w-5 h-5`} />
                <input
                  type="text"
                  value={formatPrice(10000)}
                  readOnly
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600 ${
                    theme === 'dark' ? 'border-gray-600 bg-gray-600 text-white' : 'border-gray-300'
                  }`}
                />
              </div>
            </div>
            <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-6`}>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Investment Period</label>
              <select className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600 ${
                theme === 'dark' ? 'border-gray-600 bg-gray-600 text-white' : 'border-gray-300'
              }`}>
                <option>5 years</option>
                <option>10 years</option>
                <option>15 years</option>
                <option>20 years</option>
              </select>
            </div>
            <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-6`}>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Expected Return</label>
              <select className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600 ${
                theme === 'dark' ? 'border-gray-600 bg-gray-600 text-white' : 'border-gray-300'
              }`}>
                <option>Conservative (8%)</option>
                <option>Moderate (12%)</option>
                <option>Aggressive (18%)</option>
              </select>
            </div>
          </div>
          <div className={`mt-6 ${theme === 'dark' ? 'bg-purple-900' : 'bg-purple-50'} rounded-xl p-6 text-center`}>
            <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-purple-200' : 'text-gray-600'}`}>Estimated Future Value</p>
            <p className="text-4xl font-bold text-purple-600">{formatPrice(23467)}</p>
            <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-purple-300' : 'text-gray-500'}`}>Based on 12% annual return over 10 years</p>
          </div>
        </div>
      </div>

      {/* Strategy Selection */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">Choose Your Investment Strategy</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {strategies.map((strategy, index) => (
            <motion.div
              key={strategy.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 cursor-pointer transition-all ${
                selectedStrategy === strategy.id ? 'ring-2 ring-purple-600' : 'hover:shadow-xl'
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
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mt-4`}>{strategy.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Strategy Details */}
        <motion.div
          key={selectedStrategy}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8`}
        >
          <h3 className="text-xl font-semibold mb-6">{currentStrategy.title} Details</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Portfolio Allocation */}
            <div>
              <h4 className="font-medium mb-4">Portfolio Allocation</h4>
              <div className="space-y-3">
                {currentStrategy.allocation.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{item.type}</span>
                      <span className="text-sm text-gray-600">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full" 
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Coins */}
            <div>
              <h4 className="font-medium mb-4">Recommended Coin Types</h4>
              <div className="space-y-2">
                {currentStrategy.coins.map((coin, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-700">{coin}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Benefits */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-center mb-8">Why Invest in Coins?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 text-center"
              >
                <benefit.icon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Risks */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-center mb-8">Investment Risks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {risks.map((risk, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-red-50 rounded-xl p-6 text-center"
              >
                <risk.icon className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{risk.title}</h3>
                <p className="text-sm text-gray-600">{risk.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Getting Started */}
      <div className="bg-purple-50 border-t border-purple-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-center mb-8">Getting Started Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Research</h3>
              <p className="text-sm text-gray-600">Learn about coin types, grading, and market trends</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">Set Budget</h3>
              <p className="text-sm text-gray-600">Determine your investment amount and risk tolerance</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">Buy Quality</h3>
              <p className="text-sm text-gray-600">Purchase authenticated, graded coins from reputable dealers</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">4</span>
              </div>
              <h3 className="font-semibold mb-2">Monitor & Adjust</h3>
              <p className="text-sm text-gray-600">Track performance and rebalance portfolio as needed</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <Award className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your Coin Investment Journey?</h2>
          <p className="text-purple-100 mb-6">
            Join thousands of successful coin investors building wealth through numismatic treasures.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get Started
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Download Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
