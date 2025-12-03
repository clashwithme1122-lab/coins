'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, CheckCircle, Star, Award, Clock, Users, FileText, Camera, Search } from 'lucide-react'
import { useGlobal } from '@/contexts/GlobalContext'

export default function AuthenticationPage() {
  const { formatPrice, theme } = useGlobal()
  const [selectedService, setSelectedService] = useState('basic')

  const services = [
    {
      id: 'basic',
      title: 'Basic Authentication',
      price: formatPrice(50),
      duration: '5-7 business days',
      features: ['Visual authentication', 'Basic condition assessment', 'Certificate of authenticity', 'Digital records']
    },
    {
      id: 'standard',
      title: 'Standard Authentication',
      price: formatPrice(125),
      duration: '3-5 business days',
      features: ['Expert visual review', 'Detailed condition report', 'Photographic documentation', 'Official certificate', 'Online verification']
    },
    {
      id: 'premium',
      title: 'Premium Authentication',
      price: formatPrice(250),
      duration: '1-2 business days',
      features: ['Senior numismatist review', 'Scientific analysis', 'Historical research', 'Comprehensive report', 'Priority service', 'Insurance documentation']
    },
    {
      id: 'express',
      title: 'Express Authentication',
      price: formatPrice(400),
      duration: 'Same day service',
      features: ['Immediate expert review', 'Rapid authentication', 'Express certification', 'Priority processing', 'Same-day shipping', 'Digital + physical certificate']
    }
  ]

  const authenticationSteps = [
    {
      step: 1,
      title: 'Initial Assessment',
      description: 'Our experts examine your coin for obvious signs of authenticity',
      icon: Search
    },
    {
      step: 2,
      title: 'Detailed Analysis',
      description: 'Advanced testing methods including weight, measurements, and composition',
      icon: Camera
    },
    {
      step: 3,
      title: 'Historical Verification',
      description: 'Cross-reference with historical records and mint documentation',
      icon: FileText
    },
    {
      step: 4,
      title: 'Certification',
      description: 'Issue official certificate with unique serial number for verification',
      icon: Award
    }
  ]

  const counterfeitSigns = [
    {
      title: 'Weight Discrepancies',
      description: 'Counterfeit coins often have incorrect weight compared to genuine specimens',
      severity: 'high'
    },
    {
      title: 'Poor Detail Quality',
      description: 'Fuzzy or soft details, especially in high-relief areas like hairlines',
      severity: 'medium'
    },
    {
      title: 'Wrong Metal Composition',
      description: 'Incorrect metal color, density, or magnetic properties',
      severity: 'high'
    },
    {
      title: 'Incorrect Mint Marks',
      description: 'Wrong font, size, or placement of mint marks and dates',
      severity: 'high'
    },
    {
      title: 'Surface Texture',
      description: 'Unnatural surface texture, tool marks, or casting seams',
      severity: 'medium'
    },
    {
      title: 'Edge Problems',
      description: 'Incorrect reeding, seam lines, or edge lettering issues',
      severity: 'medium'
    }
  ]

  const testimonials = [
    {
      name: "David Mitchell",
      service: "Premium Authentication",
      comment: "They discovered my 'rare' coin was actually a sophisticated counterfeit. Saved me thousands!",
      rating: 5
    },
    {
      name: "Sarah Chen",
      service: "Standard Authentication",
      comment: "Professional service with detailed reports. Now I can sell my collection with confidence.",
      rating: 5
    },
    {
      name: "Robert Johnson",
      service: "Basic Authentication",
      comment: "Fast turnaround and affordable pricing. Perfect for verifying my inheritance coins.",
      rating: 5
    }
  ]

  const currentService = services.find(s => s.id === selectedService) || services[0]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
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
            <Shield className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Coin Authentication Services</h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Professional coin authentication services by certified numismatists. Get your coins verified and certified for maximum value and confidence.
            </p>
            <div className="mt-4 text-sm text-purple-200">
              Prices shown in {formatPrice(100).split('100')[0]}100
            </div>
          </motion.div>
        </div>
      </div>

      {/* Process */}
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">10,000+</div>
              <div className="text-sm text-gray-600">Coins Authenticated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">99.8%</div>
              <div className="text-sm text-gray-600">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">24h</div>
              <div className="text-sm text-gray-600">Express Service</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">50+</div>
              <div className="text-sm text-gray-600">Expert Numismatists</div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">Choose Authentication Service</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 cursor-pointer transition-all ${
                selectedService === service.id ? 'ring-2 ring-purple-600' : 'hover:shadow-xl'
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

      {/* Authentication Process */}
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-center mb-8">Our Authentication Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {authenticationSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8" />
                </div>
                <div className="text-lg font-semibold mb-2">Step {step.step}</div>
                <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : ''}`}>{step.title}</h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Counterfeit Detection */}
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border-t`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-center mb-8">Common Counterfeit Signs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {counterfeitSigns.map((sign, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`border rounded-xl p-6 ${
                  sign.severity === 'high' ? 'bg-red-50 border-red-200' :
                  sign.severity === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                  'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-start mb-3">
                  <AlertTriangle className={`w-5 h-5 mr-2 mt-0.5 ${
                    sign.severity === 'high' ? 'text-red-600' :
                    sign.severity === 'medium' ? 'text-yellow-600' :
                    'text-gray-600'
                  }`} />
                  <h3 className="font-semibold">{sign.title}</h3>
                </div>
                <p className="text-sm text-gray-600">{sign.description}</p>
                <div className="mt-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${getSeverityColor(sign.severity)}`}>
                    {sign.severity === 'high' ? 'High Risk' : sign.severity === 'medium' ? 'Medium Risk' : 'Low Risk'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-center mb-8">Client Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-6`}
              >
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-lg">★</span>
                    ))}
                  </div>
                </div>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>"{testimonial.comment}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{testimonial.service}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <Shield className="w-12 h-12 mx-auto mb-4" />
          <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-gray-100' : ''}`}>Ready to Authenticate Your Coins?</h2>
          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
            Don't risk buying or selling counterfeit coins. Get professional authentication from trusted experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Submit Coin for Authentication
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
