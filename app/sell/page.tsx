'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, Upload, Info, CheckCircle, X, RotateCcw } from 'lucide-react'

export default function SellCoinsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    coinType: '',
    year: '',
    condition: '',
    description: '',
    images: [] as File[]
  })
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {}
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }
    
    // Coin type validation
    if (!formData.coinType.trim()) {
      newErrors.coinType = 'Coin type is required'
    }
    
    // Year validation
    if (!formData.year.trim()) {
      newErrors.year = 'Year is required'
    } else if (!/^\d{1,4}$/.test(formData.year)) {
      newErrors.year = 'Please enter a valid year'
    }
    
    // Condition validation
    if (!formData.condition) {
      newErrors.condition = 'Please select coin condition'
    }
    
    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters'
    }
    
    // Images validation
    if (formData.images.length === 0) {
      newErrors.images = 'Please upload at least one image'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Clear previous errors
    setErrors({})
    
    // Validate form
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)

    try {
      // Convert images to base64 or URLs for storage
      const imageUrls = await Promise.all(
        formData.images.map(async (file) => {
          return new Promise<string>((resolve) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result as string)
            reader.readAsDataURL(file)
          })
        })
      )

      // Create submission object
      const submission = {
        id: Date.now(), // Simple ID generation
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        coinType: formData.coinType,
        year: formData.year,
        condition: formData.condition,
        description: formData.description,
        images: imageUrls,
        submittedAt: new Date().toLocaleString(),
        status: 'pending' as const
      }

      // Save to localStorage (in real app, this would be an API call)
      const existingSubmissions = JSON.parse(localStorage.getItem('userSubmissions') || '[]')
      localStorage.setItem('userSubmissions', JSON.stringify([...existingSubmissions, submission]))

      // Show success popup
      setShowSuccessPopup(true)
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        coinType: '',
        year: '',
        condition: '',
        description: '',
        images: []
      })

    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Error submitting form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }))
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
            <DollarSign className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Sell Your Coins</h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Turn your coin collection into cash. We buy rare coins, historical currency, and valuable numismatic items.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sell Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold mb-6">Sell Your Coins</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value })
                          if (errors.name) {
                            setErrors(prev => ({ ...prev, name: '' }))
                          }
                        }}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600 ${
                          errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-300'
                        }`}
                        required
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value })
                          if (errors.email) {
                            setErrors(prev => ({ ...prev, email: '' }))
                          }
                        }}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600 ${
                          errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300'
                        }`}
                        required
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value })
                          if (errors.phone) {
                            setErrors(prev => ({ ...prev, phone: '' }))
                          }
                        }}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600 ${
                          errors.phone ? 'border-red-500 focus:border-red-500' : 'border-gray-300'
                        }`}
                        required
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Coin Information */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold mb-4">Coin Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Coin Type
                      </label>
                      <select
                        value={formData.coinType}
                        onChange={(e) => {
                          setFormData({ ...formData, coinType: e.target.value })
                          if (errors.coinType) {
                            setErrors(prev => ({ ...prev, coinType: '' }))
                          }
                        }}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600 ${
                          errors.coinType ? 'border-red-500 focus:border-red-500' : 'border-gray-300'
                        }`}
                        required
                      >
                        <option value="">Select coin type</option>
                        <option value="ancient">Ancient Coins</option>
                        <option value="medieval">Medieval Coins</option>
                        <option value="modern">Modern Coins</option>
                        <option value="bullion">Bullion Coins</option>
                        <option value="commemorative">Commemorative Coins</option>
                        <option value="world">World Coins</option>
                        <option value="us">US Coins</option>
                      </select>
                      {errors.coinType && (
                        <p className="mt-1 text-sm text-red-600">{errors.coinType}</p>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Year
                        </label>
                        <input
                          type="text"
                          value={formData.year}
                          onChange={(e) => {
                            setFormData({ ...formData, year: e.target.value })
                            if (errors.year) {
                              setErrors(prev => ({ ...prev, year: '' }))
                            }
                          }}
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600 ${
                            errors.year ? 'border-red-500 focus:border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="e.g., 1890"
                          required
                        />
                        {errors.year && (
                          <p className="mt-1 text-sm text-red-600">{errors.year}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Condition
                        </label>
                        <select
                          value={formData.condition}
                          onChange={(e) => {
                            setFormData({ ...formData, condition: e.target.value })
                            if (errors.condition) {
                              setErrors(prev => ({ ...prev, condition: '' }))
                            }
                          }}
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600 ${
                            errors.condition ? 'border-red-500 focus:border-red-500' : 'border-gray-300'
                          }`}
                        >
                          <option value="">Select condition</option>
                          <option value="unc">Uncirculated</option>
                          <option value="au">About Uncirculated</option>
                          <option value="xf">Extremely Fine</option>
                          <option value="vf">Very Fine</option>
                          <option value="f">Fine</option>
                          <option value="vg">Very Good</option>
                          <option value="g">Good</option>
                        </select>
                        {errors.condition && (
                          <p className="mt-1 text-sm text-red-600">{errors.condition}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => {
                          setFormData({ ...formData, description: e.target.value })
                          if (errors.description) {
                            setErrors(prev => ({ ...prev, description: '' }))
                          }
                        }}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600 ${
                          errors.description ? 'border-red-500 focus:border-red-500' : 'border-gray-300'
                        }`}
                        rows={4}
                        placeholder="Describe your coin, including any notable features, history, or markings..."
                      />
                      {errors.description && (
                        <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Upload Images</h3>
                  <div className={`border-2 border-dashed rounded-lg p-6 text-center ${
                    errors.images ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}>
                    <Upload className={`w-12 h-12 mx-auto mb-4 ${errors.images ? 'text-red-400' : 'text-gray-400'}`} />
                    <p className={`mb-2 ${errors.images ? 'text-red-600' : 'text-gray-600'}`}>
                      {errors.images || 'Upload clear images of your coins'}
                    </p>
                    <p className="text-sm text-gray-500 mb-4">Front, back, and any notable details</p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => {
                        handleImageUpload(e)
                        if (errors.images) {
                          setErrors(prev => ({ ...prev, images: '' }))
                        }
                      }}
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
                      <p className="text-sm text-gray-600 mb-4">
                        {formData.images.length} image(s) selected
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {formData.images.map((file, index) => (
                          <div key={index} className="relative">
                            <div className="relative h-32 bg-gray-100 rounded-lg overflow-hidden">
                              {/* Reverse Icon */}
                              <div className="absolute top-2 left-2 z-10 opacity-100">
                                <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors">
                                  <RotateCcw className="w-3 h-3 text-purple-600" />
                                </button>
                              </div>
                              
                              {/* Image Preview */}
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`Upload preview ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                            {/* File Name */}
                            <div className="mt-1">
                              <p className="text-xs text-gray-600 truncate">{file.name}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit for Evaluation'}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Why Sell to Us */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold mb-4">Why Sell to Taksila Coins?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Competitive prices based on current market values</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Free professional appraisals</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Fast and secure payment processing</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Expert numismatists on staff</span>
                </li>
              </ul>
            </motion.div>

            {/* Process */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold mb-4">How It Works</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Submit Your Coins</h4>
                    <p className="text-sm text-gray-600">Fill out the form with coin details</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Get Evaluation</h4>
                    <p className="text-sm text-gray-600">Our experts review and appraise your coins</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Receive Offer</h4>
                    <p className="text-sm text-gray-600">Get a competitive purchase offer</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                    4
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Get Paid</h4>
                    <p className="text-sm text-gray-600">Accept offer and receive payment</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-purple-50 rounded-xl p-6"
            >
              <div className="flex items-center mb-4">
                <Info className="w-6 h-6 text-purple-600 mr-2" />
                <h3 className="text-lg font-semibold">Questions?</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Have questions about selling your coins? Our expert team is here to help.
              </p>
              <div className="space-y-2">
                <p className="text-sm">
                  <strong>Email:</strong> sell@taksilacoins.com
                </p>
                <p className="text-sm">
                  <strong>Phone:</strong> +1 (555) SELL-123
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-2xl p-8 max-w-md mx-4"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Submission Successful!</h3>
              <p className="text-gray-600 mb-6">
                Thank you for submitting your coin for evaluation. Our expert team will review your submission and get back to you within 24-48 hours with a competitive offer.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <h4 className="font-semibold text-gray-900 mb-2">What happens next:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Our numismatists will review your coin details</li>
                  <li>• You'll receive an email with our evaluation</li>
                  <li>• We'll send a competitive purchase offer</li>
                  <li>• Accept or decline the offer - no obligation</li>
                </ul>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-purple-800">
                  <strong>Reference ID:</strong> #{Date.now()}<br />
                  <strong>Email:</strong> {formData.email || 'N/A'}
                </p>
              </div>
              <button
                onClick={() => setShowSuccessPopup(false)}
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Got it, thanks!
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
