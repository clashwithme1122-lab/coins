'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Award, Star, CheckCircle, Info, Search, Camera, FileText, TrendingUp, Shield } from 'lucide-react'
import { useGlobal } from '@/contexts/GlobalContext'

export default function GradingPage() {
  const { formatPrice, theme } = useGlobal()
  const [selectedGrade, setSelectedGrade] = useState('ms65')
  const [selectedService, setSelectedService] = useState('standard')

  const gradingScale = [
    { grade: 'PR70', name: 'Proof 70', description: 'Perfect proof coin with no imperfections', value: 'Ultra High' },
    { grade: 'MS70', name: 'Mint State 70', description: 'Perfect uncirculated coin, no flaws', value: 'Ultra High' },
    { grade: 'MS69', name: 'Mint State 69', description: 'Nearly perfect with minor imperfections', value: 'Very High' },
    { grade: 'MS67-68', name: 'Mint State 67-68', description: 'Superb uncirculated with minimal marks', value: 'High' },
    { grade: 'MS65-66', name: 'Mint State 65-66', description: 'Choice uncirculated with minor marks', value: 'Above Average' },
    { grade: 'MS63-64', name: 'Mint State 63-64', description: 'Average uncirculated with noticeable marks', value: 'Average' },
    { grade: 'AU58', name: 'About Uncirculated 58', description: 'Nearly uncirculated with slight wear', value: 'Good' },
    { grade: 'AU50-55', name: 'About Uncirculated 50-55', description: 'Slight wear on high points', value: 'Good' },
    { grade: 'XF45', name: 'Extremely Fine 45', description: 'Light wear on high points only', value: 'Fair' },
    { grade: 'VF20-35', name: 'Very Fine 20-35', description: 'Moderate wear, major details clear', value: 'Fair' },
    { grade: 'F12-15', name: 'Fine 12-15', description: 'Moderate to heavy wear, details visible', value: 'Low' },
    { grade: 'VG8-10', name: 'Very Good 8-10', description: 'Heavy wear, major design elements clear', value: 'Low' },
    { grade: 'G4-6', name: 'Good 4-6', description: 'Very heavy wear, outline clear', value: 'Very Low' }
  ]

  const services = [
    {
      id: 'standard',
      title: 'Standard Grading',
      price: formatPrice(35),
      duration: '7-10 business days',
      features: ['Professional visual grading', 'Grade assignment', 'Basic condition report', 'Plastic holder']
    },
    {
      id: 'premium',
      title: 'Premium Grading',
      price: formatPrice(75),
      duration: '5-7 business days',
      features: ['Expert visual grading', 'Detailed condition analysis', 'Photographic documentation', 'Slab with label', 'Online verification']
    },
    {
      id: 'express',
      title: 'Express Grading',
      price: formatPrice(125),
      duration: '2-3 business days',
      features: ['Priority service', 'Expert grading', 'Comprehensive analysis', 'Premium slab', 'Express shipping', 'Digital certificate']
    }
  ]

  const gradingFactors = [
    {
      title: 'Strike Quality',
      description: 'Sharpness and completeness of the coin\'s design details',
      weight: 'High',
      examples: ['Full details in hair and facial features', 'Clear lettering and dates', 'Defined rims and edges']
    },
    {
      title: 'Surface Preservation',
      description: 'Absence of scratches, marks, and damage',
      weight: 'High',
      examples: ['No bag marks or contact marks', 'Clean fields without scratches', 'Original mint luster']
    },
    {
      title: 'Luster',
      description: 'Quality and quantity of original mint luster',
      weight: 'Medium',
      examples: ['Cartwheel luster on silver coins', 'Frosty appearance on copper', 'Reflective surfaces']
    },
    {
      title: 'Eye Appeal',
      description: 'Overall visual attractiveness and color',
      weight: 'Medium',
      examples: ['Attractive toning', 'Natural color', 'Pleasant appearance']
    },
    {
      title: 'Wear',
      description: 'Amount of circulation wear on high points',
      weight: 'High',
      examples: ['No wear on high points for MS grades', 'Even wear pattern for circulated grades', 'No damage from cleaning']
    }
  ]

  const currentGrade = gradingScale.find(g => g.grade === selectedGrade) || gradingScale[0]
  const currentService = services.find(s => s.id === selectedService) || services[0]

  const getValueColor = (value: string) => {
    switch (value) {
      case 'Ultra High': return 'bg-purple-100 text-purple-700'
      case 'Very High': return 'bg-blue-100 text-blue-700'
      case 'High': return 'bg-green-100 text-green-700'
      case 'Above Average': return 'bg-yellow-100 text-yellow-700'
      case 'Average': return 'bg-orange-100 text-orange-700'
      case 'Good': return 'bg-red-100 text-red-700'
      case 'Fair': return 'bg-gray-100 text-gray-700'
      case 'Low': return 'bg-gray-200 text-gray-700'
      case 'Very Low': return 'bg-gray-300 text-gray-700'
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
            <Award className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Professional Coin Grading</h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Expert grading services using industry standards. Get your coins professionally graded and certified for maximum value.
            </p>
            <div className="mt-4 text-sm text-purple-200">
              Prices shown in {formatPrice(100).split('100')[0]}100
            </div>
          </motion.div>
        </div>
      </div>

      {/* Grading Scale Interactive */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">Coin Grading Scale</h2>
        
        {/* Grade Selector */}
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 mb-8`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : ''}`}>Select a Grade</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {gradingScale.map((grade) => (
                  <button
                    key={grade.grade}
                    onClick={() => setSelectedGrade(grade.grade)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedGrade === grade.grade
                        ? 'bg-purple-50 border-2 border-purple-600'
                        : theme === 'dark' ? 'bg-gray-700 border-2 border-transparent hover:bg-gray-600' : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-semibold">{grade.grade}</span>
                        <span className={`ml-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{grade.name}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getValueColor(grade.value)}`}>
                        {grade.value}
                      </span>
                    </div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mt-1`}>{grade.description}</p>
                  </button>
                ))}
              </div>
            </div>
            
            <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-purple-50'} rounded-xl p-6`}>
              <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : ''}`}>Grade Details: {currentGrade.grade}</h3>
              <div className="space-y-4">
                <div>
                  <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{currentGrade.name}</h4>
                  <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mt-1`}>{currentGrade.description}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Market Value Impact</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getValueColor(currentGrade.value)}`}>
                    {currentGrade.value}
                  </span>
                </div>
                <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg p-4`}>
                  <h4 className="font-medium mb-2">Typical Examples</h4>
                  <ul className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} space-y-1`}>
                    <li>• No visible imperfections</li>
                    <li>• Full mint luster (for uncirculated)</li>
                    <li>• No signs of circulation</li>
                    <li>• Perfect strike quality</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grading Services */}
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-center mb-8">Grading Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-6 cursor-pointer transition-all ${
                  selectedService === service.id ? 'ring-2 ring-purple-600' : 'hover:shadow-lg'
                }`}
                onClick={() => setSelectedService(service.id)}
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <div className="text-3xl font-bold text-purple-600 mb-1">{service.price}</div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>{service.duration}</p>
                </div>
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full mt-6 bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                  Select Service
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Grading Factors */}
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border-t`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-center mb-8">Key Grading Factors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gradingFactors.map((factor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} rounded-xl shadow-lg p-6`}
              >
                <div className="flex items-center mb-4">
                  <Star className="w-5 h-5 text-purple-600 mr-2" />
                  <h3 className="font-semibold">{factor.title}</h3>
                </div>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>{factor.description}</p>
                <div className="mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    factor.weight === 'High' ? 'bg-red-100 text-red-700' :
                    factor.weight === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {factor.weight} Priority
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">What We Look For:</h4>
                  <ul className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} space-y-1`}>
                    {factor.examples.map((example, exampleIndex) => (
                      <li key={exampleIndex}>• {example}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Grading Process */}
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-center mb-8">Our Grading Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-semibold mb-2">Initial Inspection</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Visual examination for authenticity and basic condition</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8" />
              </div>
              <h3 className="font-semibold mb-2">Detailed Analysis</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Magnified inspection of surfaces, edges, and details</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="font-semibold mb-2">Grade Assignment</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Expert consensus on final grade based on all factors</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="font-semibold mb-2">Certification</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Professional slabbing and certificate issuance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Value Impact */}
      <div className={`${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-purple-50 border-purple-200'} border-t`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-center mb-8">How Grading Affects Value</h2>
          <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl p-8`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-4">Value Multipliers by Grade</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">MS70/PR70</span>
                    <span className="text-green-600 font-semibold">100x+ Base Value</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">MS65-67</span>
                    <span className="text-green-600 font-semibold">10-25x Base Value</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">MS60-64</span>
                    <span className="text-blue-600 font-semibold">3-8x Base Value</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">AU50-58</span>
                    <span className="text-purple-600 font-semibold">2-4x Base Value</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">XF- VF Grades</span>
                    <span className="text-orange-600 font-semibold">1-2x Base Value</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Why Professional Grading Matters</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <TrendingUp className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                    <div>
                      <strong>Increased Value:</strong>
                      <p className="text-sm text-gray-600">Graded coins sell for significantly higher prices</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Shield className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
                    <div>
                      <strong>Buyer Confidence:</strong>
                      <p className="text-sm text-gray-600">Third-party authentication guarantees authenticity</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FileText className="w-5 h-5 text-purple-500 mr-2 mt-0.5" />
                    <div>
                      <strong>Market Liquidity:</strong>
                      <p className="text-sm text-gray-600">Easier to sell and trade graded coins</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Info className="w-5 h-5 text-orange-500 mr-2 mt-0.5" />
                    <div>
                      <strong>Preservation:</strong>
                      <p className="text-sm text-gray-600">Professional holders protect coins from damage</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <Award className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Ready to Get Your Coins Graded?</h2>
          <p className="text-purple-100 mb-6">
            Submit your coins for professional grading and maximize their market value.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Submit Coins for Grading
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              View Pricing Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
