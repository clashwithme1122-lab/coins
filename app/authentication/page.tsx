'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, CheckCircle, AlertTriangle, Search, Camera, FileText, Award, Clock, Users } from 'lucide-react'

export default function AuthenticationPage() {
  const [selectedService, setSelectedService] = useState('basic')

  const services = [
    {
      id: 'basic',
      title: 'Basic Authentication',
      price: '$50',
      duration: '2-3 business days',
      features: ['Visual authentication', 'Basic condition report', 'Certificate of authenticity', 'Online verification']
    },
    {
      id: 'advanced',
      title: 'Advanced Authentication',
      price: '$125',
      duration: '5-7 business days',
      features: ['Expert visual authentication', 'Detailed grading report', 'Metal composition analysis', 'Historical verification', 'Market value assessment']
    },
    {
      id: 'premium',
      title: 'Premium Authentication',
      price: '$250',
      duration: '7-10 business days',
      features: ['Laboratory analysis', 'Scientific authentication', 'XRF testing', 'Microscopic examination', 'Comprehensive documentation', 'Insurance valuation']
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
      service: "Advanced Authentication",
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
    <div className="min-h-screen bg-gray-50">
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
              Professional authentication and certification by expert numismatists. Protect your investment with verified authenticity.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-gray-200">
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

      {/* Authentication Services */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">Choose Authentication Service</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all ${
                selectedService === service.id ? 'ring-2 ring-purple-600' : 'hover:shadow-xl'
              }`}
              onClick={() => setSelectedService(service.id)}
            >
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <div className="text-3xl font-bold text-purple-600 mb-1">{service.price}</div>
                <p className="text-sm text-gray-500">{service.duration}</p>
              </div>
              <ul className="space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full mt-6 bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                Select Service
              </button>
            </motion.div>
          ))}
        </div>

        {/* Service Details */}
        <motion.div
          key={selectedService}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-purple-50 rounded-xl p-8"
        >
          <h3 className="text-xl font-semibold mb-4">{currentService.title} - What's Included</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Authentication Process</h4>
              <ul className="space-y-2">
                {currentService.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Deliverables</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <FileText className="w-4 h-4 text-purple-600 mr-2" />
                  <span className="text-sm text-gray-700">Detailed authentication report</span>
                </li>
                <li className="flex items-center">
                  <Award className="w-4 h-4 text-purple-600 mr-2" />
                  <span className="text-sm text-gray-700">Certificate of authenticity</span>
                </li>
                <li className="flex items-center">
                  <Camera className="w-4 h-4 text-purple-600 mr-2" />
                  <span className="text-sm text-gray-700">High-resolution images</span>
                </li>
                <li className="flex items-center">
                  <Search className="w-4 h-4 text-purple-600 mr-2" />
                  <span className="text-sm text-gray-700">Online verification access</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Authentication Process */}
      <div className="bg-white border-t border-gray-200">
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
                <h3 className="font-medium mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Counterfeit Detection */}
      <div className="bg-gray-50 border-t border-gray-200">
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
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-center mb-8">Client Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6"
              >
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-lg">★</span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.comment}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.service}</p>
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
          <h2 className="text-2xl font-bold mb-4">Protect Your Investment</h2>
          <p className="text-purple-100 mb-6">
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
