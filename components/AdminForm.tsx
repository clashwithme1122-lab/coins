import { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, X } from 'lucide-react'

interface Coin {
  id?: number
  title: string
  price: string
  weight: string
  year: string
  description: string
  frontImage: string
  backImage: string
  weightImage: string
  historicalValue?: string
}

interface FormErrors {
  title?: string
  price?: string
  weight?: string
  year?: string
  description?: string
  frontImage?: string
  backImage?: string
  weightImage?: string
  historicalValue?: string
}

interface AdminFormProps {
  coin?: Coin
  onSubmit: (coin: Omit<Coin, 'id'>) => void
  onCancel: () => void
}

export default function AdminForm({ coin, onSubmit, onCancel }: AdminFormProps) {
  const [formData, setFormData] = useState<Omit<Coin, 'id'>>({
    title: coin?.title || '',
    price: coin?.price || '',
    weight: coin?.weight || '',
    year: coin?.year || '',
    description: coin?.description || '',
    frontImage: coin?.frontImage || '/assets/dummycoin.jpg',
    backImage: coin?.backImage || '/assets/dummycoin.jpg',
    weightImage: coin?.weightImage || '/assets/dummycoinweight..jpg',
    historicalValue: coin?.historicalValue || ''
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters'
    }
    
    if (!formData.price.trim()) {
      newErrors.price = 'Price is required'
    } else if (!/^\$?\d+(\.\d{2})?$/.test(formData.price)) {
      newErrors.price = 'Invalid price format (e.g., $2,450 or 2450)'
    }
    
    if (!formData.weight.trim()) {
      newErrors.weight = 'Weight is required'
    } else if (!/^\d+(\.\d+)?g?$/i.test(formData.weight)) {
      newErrors.weight = 'Invalid weight format (e.g., 3.8g or 3.8)'
    }
    
    if (!formData.year.trim()) {
      newErrors.year = 'Year is required'
    } else if (!/^\d+\s*(AD|BC|CE|BCE)?$/i.test(formData.year)) {
      newErrors.year = 'Invalid year format (e.g., 150 AD or 2023)'
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters'
    }
    
    if (!formData.frontImage || formData.frontImage === '/assets/dummycoin.jpg') {
      newErrors.frontImage = 'Front image is required'
    }
    
    if (!formData.backImage || formData.backImage === '/assets/dummycoin.jpg') {
      newErrors.backImage = 'Back image is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleChange = (field: keyof Omit<Coin, 'id'>, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">
          {coin ? 'Edit Coin' : 'Add New Coin'}
        </h2>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600 ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Coin title"
              required
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
            <input
              type="text"
              value={formData.price}
              onChange={(e) => handleChange('price', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600 ${
                errors.price ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="$2,450"
              required
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">{errors.price}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
            <input
              type="text"
              value={formData.weight}
              onChange={(e) => handleChange('weight', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600 ${
                errors.weight ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="3.8g"
              required
            />
            {errors.weight && (
              <p className="mt-1 text-sm text-red-600">{errors.weight}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
            <input
              type="text"
              value={formData.year}
              onChange={(e) => handleChange('year', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600 ${
                errors.year ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="150 AD"
              required
            />
            {errors.year && (
              <p className="mt-1 text-sm text-red-600">{errors.year}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              rows={4}
              placeholder="Coin description..."
              required
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Historical Value</label>
            <input
              type="text"
              value={formData.historicalValue}
              onChange={(e) => handleChange('historicalValue', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
              placeholder="Historical significance..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Front Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (!file) return
                const url = URL.createObjectURL(file)
                handleChange('frontImage', url)
              }}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600 ${
                errors.frontImage ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.frontImage && (
              <p className="mt-1 text-sm text-red-600">{errors.frontImage}</p>
            )}
            {formData.frontImage && formData.frontImage !== '/assets/dummycoin.jpg' && (
              <img src={formData.frontImage} alt="Front preview" className="mt-2 h-20 w-20 object-cover rounded-lg" />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Back Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (!file) return
                const url = URL.createObjectURL(file)
                handleChange('backImage', url)
              }}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600 ${
                errors.backImage ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.backImage && (
              <p className="mt-1 text-sm text-red-600">{errors.backImage}</p>
            )}
            {formData.backImage && formData.backImage !== '/assets/dummycoin.jpg' && (
              <img src={formData.backImage} alt="Back preview" className="mt-2 h-20 w-20 object-cover rounded-lg" />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Weight Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (!file) return
                const url = URL.createObjectURL(file)
                handleChange('weightImage', url)
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
            />
            {formData.weightImage && formData.weightImage !== '/assets/dummycoinweight..jpg' && (
              <img src={formData.weightImage} alt="Weight preview" className="mt-2 h-20 w-20 object-cover rounded-lg" />
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>{coin ? 'Update' : 'Save'}</span>
          </button>
        </div>
      </form>
    </motion.div>
  )
}
