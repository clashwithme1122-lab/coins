'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, DollarSign, Award, Star, CheckCircle, FileText, Calendar, MapPin } from 'lucide-react'
import { useGlobal } from '@/contexts/GlobalContext'

export default function AppraisalPage() {
  const { formatPrice, theme } = useGlobal()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    coinType: '',
    description: '',
    images: [] as File[]
  })

  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 5000)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }))
  }

  const appraisalTypes = [
    {
      title: "Standard Appraisal",
      price: formatPrice(75),
      duration: "3-5 business days",
      features: ["Basic authentication", "Condition assessment", "Market value estimate", "Digital certificate"]
    },
    {
      title: "Premium Appraisal",
      price: formatPrice(150),
      duration: "1-2 business days",
      features: ["Expert authentication", "Detailed grading", "Historical research", "Comprehensive report", "Insurance valuation"]
    },
    {
      title: "Expert Appraisal",
      price: formatPrice(300),
      duration: "Same day service",
      features: ["Senior numismatist review", "Scientific analysis", "Rarity assessment", "Investment recommendation", "Priority service"]
    }
  ]

  const testimonials = [
    {
      name: "Robert Chen",
      rating: 5,
      comment: "Professional appraisal service. They identified a rare mint mark that doubled my coin's value!",
      coin: "1909-S VDB Lincoln Cent"
    },
    {
      name: "Maria Rodriguez",
      rating: 5,
      comment: "Fast turnaround and detailed report. Helped me insure my collection properly.",
      coin: "Ancient Roman Denarius Collection"
    },
    {
      name: "James Thompson",
      rating: 5,
      comment: "Expert knowledge and fair pricing. Found several valuable coins in my grandfather's collection.",
      coin: "Morgan Silver Dollar Set"
    }
  ]

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
            <h1 className="text-4xl font-bold mb-4">Professional Coin Appraisal</h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Expert valuation and authentication services for your coin collection by certified numismatists.
            </p>
            <div className="mt-4 text-sm text-purple-200">
              Prices shown in {formatPrice(100).split('100')[0]}100
            </div>
          </motion.div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 mx-auto max-w-4xl mt-4 rounded-lg"
        >
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            <span>Appraisal request submitted successfully! We'll contact you within 24 hours.</span>
          </div>
        </motion.div>
      )}

      {/* Appraisal Types */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">Choose Your Appraisal Service</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {appraisalTypes.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow`}
            >
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <div className="text-3xl font-bold text-purple-600 mb-1">{service.price}</div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>{service.duration}</p>
              </div>
              <ul className="space-y-3 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                Select This Service
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Appraisal Form */}
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold mb-8">Request Appraisal</h2>
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-8`}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600 ${
                      theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                    }`}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600 ${
                      theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                    }`}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600 ${
                      theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                    }`}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Appraisal Service
                  </label>
                  <select
                    value={formData.coinType}
                    onChange={(e) => setFormData({ ...formData, coinType: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600 ${
                      theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                    }`}
                    required
                  >
                    <option value="">Select service type</option>
                    <option value="standard">Standard Appraisal - {formatPrice(75)}</option>
                    <option value="premium">Premium Appraisal - {formatPrice(150)}</option>
                    <option value="expert">Expert Appraisal - {formatPrice(300)}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Coin Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600 ${
                      theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                    }`}
                  rows={4}
                  placeholder="Describe your coins, including quantity, types, years, and any notable features..."
                  required
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Upload Images
                </label>
                <div className={`border-2 border-dashed ${theme === 'dark' ? 'border-gray-600 bg-gray-800' : 'border-gray-300'} rounded-lg p-6 text-center`}>
                  <FileText className={`w-12 h-12 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} mx-auto mb-4`} />
                  <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-2`}>Upload clear images of your coins</p>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mb-4`}>Multiple files accepted (JPG, PNG)</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer"
                  >
                    Choose Files
                  </label>
                </div>
                {formData.images.length > 0 && (
                  <div className="mt-4">
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                      {formData.images.length} file(s) selected
                    </p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Submit Appraisal Request
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Process */}
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border-t`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-center mb-8">Our Appraisal Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6" />
              </div>
              <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : ''}`}>Initial Review</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>We examine your coins and documentation</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : ''}`}>Expert Analysis</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Certified numismatists authenticate and grade</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : ''}`}>Market Research</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Current market values and rarity assessment</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : ''}`}>Detailed Report</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Comprehensive appraisal certificate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-center mb-8">What Our Clients Say</h2>
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
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>"{testimonial.comment}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{testimonial.coin}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-purple-50'} border-t ${theme === 'dark' ? 'border-gray-600' : 'border-purple-200'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-gray-100' : ''}`}>Ready to Discover Your Coins' Value?</h2>
          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
            Get expert appraisal from certified numismatists with decades of experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
              Start Appraisal
            </button>
            <button className="border border-purple-600 text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
