'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Lock, Package, Thermometer, Droplets, AlertTriangle, CheckCircle, Users, Clock } from 'lucide-react'
import { useGlobal } from '@/contexts/GlobalContext'

export default function StoragePage() {
  const { formatPrice, theme } = useGlobal()
  const [selectedPlan, setSelectedPlan] = useState('individual')

  const storagePlans = [
    {
      id: 'individual',
      title: 'Individual Storage',
      price: formatPrice(15) + '/month',
      capacity: 'Up to 50 coins',
      features: ['Climate-controlled vault', 'Individual sealed containers', '24/7 surveillance', 'Insurance coverage up to ' + formatPrice(10000), 'Online inventory access'],
      recommended: false
    },
    {
      id: 'collector',
      title: 'Collector Storage',
      price: formatPrice(45) + '/month',
      capacity: 'Up to 200 coins',
      features: ['Premium climate control', 'Custom display options', 'Priority access', 'Insurance coverage up to ' + formatPrice(50000), 'Professional appraisal included', 'Quarterly condition reports'],
      recommended: true
    },
    {
      id: 'institutional',
      title: 'Institutional Storage',
      price: 'Custom pricing',
      capacity: 'Unlimited',
      features: ['Bank-level security', 'Multiple vault locations', 'Dedicated manager', 'Full insurance coverage', 'Custom solutions', 'Audit services', 'Transportation services'],
      recommended: false
    }
  ]

  const securityFeatures = [
    {
      icon: Shield,
      title: 'Bank-Level Security',
      description: 'Military-grade security systems with biometric access controls and armed guards'
    },
    {
      icon: Lock,
      title: 'Multi-Layer Protection',
      description: 'Redundant security systems including motion sensors, infrared detectors, and seismic sensors'
    },
    {
      icon: Package,
      title: 'Individual Sealing',
      description: 'Each coin collection is individually sealed and logged with tamper-evident containers'
    },
    {
      icon: Users,
      title: 'Background-Checked Staff',
      description: 'All personnel undergo extensive background checks and regular security training'
    }
  ]

  const environmentalControls = [
    {
      icon: Thermometer,
      title: 'Temperature Control',
      description: 'Constant 68°F (20°C) with ±2°F tolerance to prevent metal expansion and contraction',
      details: ['HVAC systems with redundancy', '24/7 temperature monitoring', 'Emergency backup power']
    },
    {
      icon: Droplets,
      title: 'Humidity Control',
      description: 'Maintained at 45% RH with ±5% tolerance to prevent corrosion and toning',
      details: ['Industrial dehumidifiers', 'Moisture barriers', 'Regular humidity testing']
    }
  ]

  const insuranceOptions = [
    {
      coverage: `Up to ${formatPrice(10000)}`,
      premium: 'Included in Individual plan',
      deductible: formatPrice(250),
      covered: ['Theft', 'Fire', 'Water damage', 'Natural disasters', 'Accidental damage']
    },
    {
      coverage: `Up to ${formatPrice(50000)}`,
      premium: 'Included in Collector plan',
      deductible: formatPrice(500),
      covered: ['All Individual coverage', 'Transit insurance', 'Market value protection', 'Restoration costs']
    },
    {
      coverage: 'Custom Coverage',
      premium: 'Based on collection value',
      deductible: 'Customizable',
      covered: ['All Collector coverage', 'Worldwide protection', 'War risk', 'Political risk', 'Extended coverage']
    }
  ]

  const currentPlan = storagePlans.find(p => p.id === selectedPlan) || storagePlans[0]

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
            <h1 className="text-4xl font-bold mb-4">Secure Coin Storage Solutions</h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Professional coin storage solutions with bank-level security, climate control, and comprehensive insurance protection.
            </p>
            <div className="mt-4 text-sm text-purple-200">
              Prices shown in {formatPrice(100).split('100')[0]}100
            </div>
          </motion.div>
        </div>
      </div>

      {/* Storage Plans */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">Storage Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {storagePlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 cursor-pointer transition-all relative ${
                selectedPlan === plan.id ? 'ring-2 ring-purple-600' : 'hover:shadow-xl'
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    RECOMMENDED
                  </span>
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
                <div className="text-3xl font-bold text-purple-600 mb-1">{plan.price}</div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>{plan.capacity}</p>
              </div>
              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full mt-6 bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                Select Plan
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Security Features */}
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-center mb-8">Security Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Environmental Controls */}
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border-t`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-center mb-8">Environmental Controls</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {environmentalControls.map((control, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} rounded-xl shadow-lg p-6`}
              >
                <div className="flex items-center mb-4">
                  <control.icon className="w-8 h-8 text-purple-600 mr-3" />
                  <h3 className="text-xl font-semibold">{control.title}</h3>
                </div>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>{control.description}</p>
                <ul className="space-y-2">
                  {control.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className={`flex items-center text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Insurance Coverage */}
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-center mb-8">Insurance Coverage</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {insuranceOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-6`}
              >
                <h3 className="font-semibold text-lg mb-4">{option.coverage}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Premium</span>
                    <span className="font-medium">{option.premium}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Deductible</span>
                    <span className="font-medium">{option.deductible}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Covered Events:</h4>
                  <ul className="space-y-1">
                    {option.covered.map((item, itemIndex) => (
                      <li key={itemIndex} className={`flex items-center text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Access & Management */}
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border-t`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-center mb-8">Access & Collection Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} rounded-xl shadow-lg p-6`}
            >
              <h3 className="text-xl font-semibold mb-4">Access Options</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-purple-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-medium">Scheduled Access</h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Visit your collection by appointment during business hours</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="w-5 h-5 text-purple-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-medium">Representative Service</h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Our staff can retrieve specific coins for inspection</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Package className="w-5 h-5 text-purple-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-medium">Secure Delivery</h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Insured delivery to your location for viewing</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} rounded-xl shadow-lg p-6`}
            >
              <h3 className="text-xl font-semibold mb-4">Digital Management</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-medium">Online Inventory</h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>View your complete collection with photos and details</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-orange-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-medium">Condition Monitoring</h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Regular reports on coin condition and environmental status</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield className="w-5 h-5 text-purple-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-medium">Value Tracking</h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Market value updates and appraisal reports</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Plan Details */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-purple-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">{currentPlan.title} - Full Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-4">What's Included</h3>
                <ul className="space-y-2">
                  {currentPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Plan Benefits</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Shield className="w-4 h-4 text-purple-600 mr-2" />
                    <span className="text-sm text-gray-700">Peace of mind with professional security</span>
                  </li>
                  <li className="flex items-center">
                    <Thermometer className="w-4 h-4 text-purple-600 mr-2" />
                    <span className="text-sm text-gray-700">Optimal preservation conditions</span>
                  </li>
                  <li className="flex items-center">
                    <Package className="w-4 h-4 text-purple-600 mr-2" />
                    <span className="text-sm text-gray-700">Comprehensive insurance protection</span>
                  </li>
                  <li className="flex items-center">
                    <Clock className="w-4 h-4 text-purple-600 mr-2" />
                    <span className="text-sm text-gray-700">Flexible access options</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 text-center">
              <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                Get Started with {currentPlan.title}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <Shield className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Protect Your Coin Collection</h2>
          <p className="text-purple-100 mb-6">
            Don't risk your valuable collection to home storage risks. Trust professional vault services with bank-level security.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Storage Plan
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
