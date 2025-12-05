'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Plus, Edit2, Trash2, Save, X, LogOut, Coins, Eye, Check, XCircle, RotateCcw, Gavel, Clock, TrendingUp, Users } from 'lucide-react'
import { useGlobal } from '@/contexts/GlobalContext'
import { useToast } from '@/contexts/ToastContext'

interface Coin {
  id: number
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

interface UserSubmission {
  id: number
  name: string
  email: string
  phone: string
  coinType: string
  year: string
  condition: string
  description: string
  images: string[]
  submittedAt: string
  status: 'pending' | 'approved' | 'rejected'
}

interface AppraisalRequest {
  id: string
  name: string
  email: string
  phone: string
  coinType: string
  description: string
  images: File[]
  submittedAt: string
  status: 'pending' | 'approved' | 'rejected'
}

interface AuctionItem {
  id: number
  title: string
  description: string
  shortDesc: string
  currentBid: number
  startingBid: number
  buyNowPrice?: number
  bidCount: number
  timeLeft: string
  endTime: Date
  image: string
  images: string[]
  category: string
  grade: string
  certification: string
  weight: string
  diameter: string
  composition: string
  mint: string
  year: string
  seller: string
  sellerVerified: boolean
  bids: Array<{
    id: number
    amount: number
    bidder: string
    timestamp: Date
  }>
}

export default function AdminDashboardPage() {
  const { theme } = useGlobal()
  const { showSuccess, showError, showWarning, showInfo } = useToast()
  const [coins, setCoins] = useState<Coin[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingCoin, setEditingCoin] = useState<Coin | null>(null)
  const [userSubmissions, setUserSubmissions] = useState<UserSubmission[]>([])
  const [activeTab, setActiveTab] = useState<'coins' | 'submissions' | 'appraisals' | 'auctions'>('coins')
  const [appraisals, setAppraisals] = useState<AppraisalRequest[]>([])
  const [auctions, setAuctions] = useState<AuctionItem[]>([])
  const [selectedSubmission, setSelectedSubmission] = useState<UserSubmission | null>(null)
  const [selectedAppraisal, setSelectedAppraisal] = useState<AppraisalRequest | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({})
  const [formData, setFormData] = useState<Partial<Coin>>({
    title: '',
    price: '',
    weight: '',
    year: '',
    description: '',
    frontImage: '',
    backImage: '',
    weightImage: '',
    historicalValue: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [uploading, setUploading] = useState<{ [key: string]: boolean }>({})
  const router = useRouter()

  // Check admin authentication
  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin')
    if (!isAdmin) {
      router.push('/admin/login')
    } else {
      loadCoins()
      loadUserSubmissions()
      loadAppraisals()
      loadAuctions()
    }
  }, [router])

  const loadCoins = async () => {
    try {
      const response = await fetch('/api/coins')
      if (response.ok) {
        const data = await response.json()
        setCoins(data)
      }
    } catch (error) {
      console.error('Error loading coins:', error)
    }
  }

  const loadUserSubmissions = () => {
    // Load submissions from localStorage (in real app, this would be an API call)
    try {
      const savedSubmissions = JSON.parse(localStorage.getItem('userSubmissions') || '[]')
      
      // If no saved submissions, use mock data for demonstration
      if (savedSubmissions.length === 0) {
        const mockSubmissions: UserSubmission[] = [
          {
            id: 1,
            name: 'John Smith',
            email: 'john.smith@email.com',
            phone: '+1 (555) 123-4567',
            coinType: 'Ancient Roman Denarius',
            year: '150 AD',
            condition: 'Very Fine',
            description: 'Beautiful Roman denarius with Emperor Antoninus Pius. Clear details and minimal wear. Found in archaeological dig near Rome.',
            images: ['/assets/dummycoin.jpg', '/assets/dummycoinweight..jpg'],
            submittedAt: '2024-12-01 10:30 AM',
            status: 'pending'
          },
          {
            id: 2,
            name: 'Maria Garcia',
            email: 'maria.g@email.com',
            phone: '+1 (555) 987-6543',
            coinType: 'US Morgan Dollar',
            year: '1889',
            condition: 'Mint State 65',
            description: 'Gorgeous uncirculated Morgan dollar with full mint luster. No marks or scratches. PCGS graded MS65.',
            images: ['/assets/dummycoin.jpg'],
            submittedAt: '2024-12-01 09:15 AM',
            status: 'pending'
          },
          {
            id: 3,
            name: 'Robert Chen',
            email: 'r.chen@email.com',
            phone: '+1 (555) 456-7890',
            coinType: 'Greek Athenian Owl',
            year: '440 BC',
            condition: 'Fine',
            description: 'Classic Athenian owl tetradrachm. Good strike for the grade, clear owl detail. Some edge wear but overall attractive piece.',
            images: ['/assets/dummycoin.jpg', '/assets/dummycoinweight..jpg', '/assets/dummycoin.jpg'],
            submittedAt: '2024-11-30 03:45 PM',
            status: 'approved'
          }
        ]
        setUserSubmissions(mockSubmissions)
      } else {
        setUserSubmissions(savedSubmissions)
      }
    } catch (error) {
      console.error('Error loading submissions:', error)
      setUserSubmissions([])
    }
  }

  const loadAppraisals = () => {
    try {
      const savedAppraisals = JSON.parse(localStorage.getItem('appraisals') || '[]')
      setAppraisals(savedAppraisals)
    } catch (error) {
      console.error('Error loading appraisals:', error)
      setAppraisals([])
    }
  }

  const loadAuctions = async () => {
    try {
      const response = await fetch('/api/auctions')
      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          setAuctions(result.data)
        }
      }
    } catch (error) {
      console.error('Error loading auctions:', error)
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!formData.title?.trim()) {
      newErrors.title = 'Title is required'
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters'
    }
    
    if (!formData.price?.trim()) {
      newErrors.price = 'Price is required'
    } else if (!/^\$?\d+(\.\d{2})?$/.test(formData.price)) {
      newErrors.price = 'Invalid price format (e.g., $2,450 or 2450)'
    }
    
    if (!formData.weight?.trim()) {
      newErrors.weight = 'Weight is required'
    }
    
    if (!formData.year?.trim()) {
      newErrors.year = 'Year is required'
    }
    
    if (!formData.description?.trim()) {
      newErrors.description = 'Description is required'
    }
    
    if (!formData.frontImage?.trim()) {
      newErrors.frontImage = 'Front image is required'
    }
    
    if (!formData.backImage?.trim()) {
      newErrors.backImage = 'Back image is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const saveCoin = async () => {
    if (!validateForm()) return
    
    try {
      const method = editingCoin ? 'PUT' : 'POST'
      const url = editingCoin ? `/api/coins/${editingCoin.id}` : '/api/coins'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        await loadCoins()
        resetForm()
        showSuccess(
          editingCoin 
            ? 'Coin updated successfully!' 
            : 'Coin added successfully!',
          4000
        )
      } else {
        const errorData = await response.json()
        showError(`Failed to save coin: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error saving coin:', error)
      showError('Network error: Failed to save coin')
    }
  }

  const deleteCoin = async (id: number) => {
    if (confirm('Are you sure you want to delete this coin?')) {
      try {
        const response = await fetch(`/api/coins/${id}`, { method: 'DELETE' })
        
        if (response.ok) {
          await loadCoins()
          showSuccess('Coin deleted successfully!', 4000)
        } else {
          const errorData = await response.json()
          showError(`Failed to delete coin: ${errorData.error || 'Unknown error'}`)
        }
      } catch (error) {
        console.error('Error deleting coin:', error)
        showError('Network error: Failed to delete coin')
      }
    }
  }

  const approveAppraisal = (id: string) => {
    const updatedAppraisals = appraisals.map(appraisal => 
      appraisal.id === id 
        ? { ...appraisal, status: 'approved' as const }
        : appraisal
    )
    setAppraisals(updatedAppraisals)
    
    // Save to localStorage
    localStorage.setItem('appraisals', JSON.stringify(updatedAppraisals))
    
    const appraisal = appraisals.find(a => a.id === id)
    showSuccess(`Appraisal from ${appraisal?.name} approved successfully!`, 4000)
  }

  const rejectAppraisal = (id: string) => {
    if (confirm('Are you sure you want to reject this appraisal request?')) {
      const updatedAppraisals = appraisals.map(appraisal => 
        appraisal.id === id 
          ? { ...appraisal, status: 'rejected' as const }
          : appraisal
      )
      setAppraisals(updatedAppraisals)
      
      // Save to localStorage
      localStorage.setItem('appraisals', JSON.stringify(updatedAppraisals))
      
      const appraisal = appraisals.find(a => a.id === id)
      showWarning(`Appraisal from ${appraisal?.name} rejected`, 4000)
    }
  }

  const approveSubmission = (id: number) => {
    const updatedSubmissions = userSubmissions.map(submission => 
      submission.id === id 
        ? { ...submission, status: 'approved' as const }
        : submission
    )
    setUserSubmissions(updatedSubmissions)
    
    // Save to localStorage
    localStorage.setItem('userSubmissions', JSON.stringify(updatedSubmissions))
    
    const submission = userSubmissions.find(s => s.id === id)
    showSuccess(`Submission from ${submission?.name} approved successfully!`, 4000)
  }

  const rejectSubmission = (id: number) => {
    if (confirm('Are you sure you want to reject this submission?')) {
      const updatedSubmissions = userSubmissions.map(submission => 
        submission.id === id 
          ? { ...submission, status: 'rejected' as const }
          : submission
      )
      setUserSubmissions(updatedSubmissions)
      
      // Save to localStorage
      localStorage.setItem('userSubmissions', JSON.stringify(updatedSubmissions))
      
      const submission = userSubmissions.find(s => s.id === id)
      showWarning(`Submission from ${submission?.name} rejected.`, 4000)
    }
  }

  const viewSubmissionDetails = (submission: UserSubmission) => {
    setSelectedSubmission(submission)
    // Initialize image index for this submission if not already set
    if (!currentImageIndex[submission.id]) {
      setCurrentImageIndex(prev => ({ ...prev, [submission.id]: 0 }))
    }
  }

  const cycleImage = (submissionId: number) => {
    const submission = userSubmissions.find(s => s.id === submissionId)
    if (submission && submission.images.length > 1) {
      setCurrentImageIndex(prev => ({
        ...prev,
        [submissionId]: (prev[submissionId] || 0) === submission.images.length - 1 
          ? 0 
          : (prev[submissionId] || 0) + 1
      }))
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      price: '',
      weight: '',
      year: '',
      description: '',
      frontImage: '',
      backImage: '',
      weightImage: '',
      historicalValue: ''
    })
    setErrors({})
    setEditingCoin(null)
    setShowAddForm(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('isAdmin')
    router.push('/admin/login')
  }

  const startEdit = (coin: Coin) => {
    setEditingCoin(coin)
    setFormData(coin)
    setShowAddForm(true)
  }

  // Handle image upload
  const handleImageUpload = async (file: File, imageType: 'frontImage' | 'backImage' | 'weightImage') => {
    setUploading(prev => ({ ...prev, [imageType]: true }))
    
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', 'coins')

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()
      
      if (result.success) {
        setFormData(prev => ({ ...prev, [imageType]: result.url }))
        setErrors(prev => ({ ...prev, [imageType]: '' }))
      } else {
        setErrors(prev => ({ ...prev, [imageType]: 'Upload failed' }))
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, [imageType]: 'Upload error' }))
    } finally {
      setUploading(prev => ({ ...prev, [imageType]: false }))
    }
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Coins className="w-8 h-8" />
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('coins')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'coins'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Coins Collection ({coins.length})
              </button>
              <button
                onClick={() => setActiveTab('submissions')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'submissions'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                User Submissions ({userSubmissions.filter(s => s.status === 'pending').length} pending)
              </button>
              <button
                onClick={() => setActiveTab('appraisals')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'appraisals'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Appraisals ({appraisals.filter(a => a.status === 'pending').length} pending)
              </button>
              <button
                onClick={() => setActiveTab('auctions')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'auctions'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Auctions ({auctions.length} active)
              </button>
            </nav>
          </div>
        </div>

        {/* Coins Tab Content */}
        {activeTab === 'coins' && (
          <>
            {/* Add Coin Button */}
            <div className="mb-8">
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Add New Coin</span>
              </button>
            </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                {editingCoin ? 'Edit Coin' : 'Add New Coin'}
              </h2>
              <button
                onClick={resetForm}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600 ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Coin title"
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
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600 ${
                    errors.price ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="$2,450"
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
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600 ${
                    errors.weight ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="3.8g"
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
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600 ${
                    errors.year ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="150 AD"
                />
                {errors.year && (
                  <p className="mt-1 text-sm text-red-600">{errors.year}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600 ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  rows={4}
                  placeholder="Coin description..."
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
                  onChange={(e) => setFormData({ ...formData, historicalValue: e.target.value })}
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
                    handleImageUpload(file, 'frontImage')
                  }}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600 ${
                    errors.frontImage ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {uploading.frontImage && (
                  <p className="mt-1 text-sm text-blue-600">Uploading...</p>
                )}
                {errors.frontImage && (
                  <p className="mt-1 text-sm text-red-600">{errors.frontImage}</p>
                )}
                {formData.frontImage && (
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
                    handleImageUpload(file, 'backImage')
                  }}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600 ${
                    errors.backImage ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {uploading.backImage && (
                  <p className="mt-1 text-sm text-blue-600">Uploading...</p>
                )}
                {errors.backImage && (
                  <p className="mt-1 text-sm text-red-600">{errors.backImage}</p>
                )}
                {formData.backImage && (
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
                    handleImageUpload(file, 'weightImage')
                  }}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600 ${
                    errors.weightImage ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {uploading.weightImage && (
                  <p className="mt-1 text-sm text-blue-600">Uploading...</p>
                )}
                {errors.weightImage && (
                  <p className="mt-1 text-sm text-red-600">{errors.weightImage}</p>
                )}
                {formData.weightImage && (
                  <img src={formData.weightImage} alt="Weight preview" className="mt-2 h-20 w-20 object-cover rounded-lg" />
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={resetForm}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveCoin}
                className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>{editingCoin ? 'Update' : 'Save'}</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Coins List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Coins Collection ({coins.length})</h2>
          </div>

          {coins.length === 0 ? (
            <div className="p-12 text-center">
              <Coins className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No coins added yet</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Add your first coin →
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Coin
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Year
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Weight
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {coins.map((coin) => (
                    <tr key={coin.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{coin.title}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{coin.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{coin.price}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{coin.year}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{coin.weight}</td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => startEdit(coin)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteCoin(coin.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
          </>
        )}

        {/* Submissions Tab Content */}
        {activeTab === 'submissions' && (
          <>
            {/* Submission Details Modal */}
            {selectedSubmission && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6 mb-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Submission Details</h2>
                  <button
                    onClick={() => setSelectedSubmission(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-4">User Information</h3>
                    <div className="space-y-2">
                      <p><strong>Name:</strong> {selectedSubmission.name}</p>
                      <p><strong>Email:</strong> {selectedSubmission.email}</p>
                      <p><strong>Phone:</strong> {selectedSubmission.phone}</p>
                      <p><strong>Submitted:</strong> {selectedSubmission.submittedAt}</p>
                      <p><strong>Status:</strong> 
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                          selectedSubmission.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          selectedSubmission.status === 'approved' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {selectedSubmission.status}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Coin Information</h3>
                    <div className="space-y-2">
                      <p><strong>Coin Type:</strong> {selectedSubmission.coinType}</p>
                      <p><strong>Year:</strong> {selectedSubmission.year}</p>
                      <p><strong>Condition:</strong> {selectedSubmission.condition}</p>
                      <p><strong>Description:</strong></p>
                      <p className="text-gray-600 text-sm">{selectedSubmission.description}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold mb-4">Uploaded Images</h3>
                  {selectedSubmission.images.length > 0 ? (
                    <div className="max-h-64 overflow-y-auto">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {selectedSubmission.images.map((image, index) => (
                          <div key={index} className="relative">
                            <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center overflow-hidden">
                              <img 
                                src={image} 
                                alt={`Coin image ${index + 1}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = '/assets/dummycoin.jpg'
                                }}
                              />
                            </div>
                            <div className="absolute top-1 right-1 bg-purple-600 text-white px-2 py-1 rounded-full text-xs">
                              {index + 1}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center">
                      <span className="text-gray-500">No images uploaded</span>
                    </div>
                  )}
                </div>

                {selectedSubmission.status === 'pending' && (
                  <div className="mt-6 flex space-x-4">
                    <button
                      onClick={() => approveSubmission(selectedSubmission.id)}
                      className="flex items-center space-x-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => rejectSubmission(selectedSubmission.id)}
                      className="flex items-center space-x-2 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Reject</span>
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* Submissions List */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold">
                  User Submissions ({userSubmissions.length})
                </h2>
              </div>

              {userSubmissions.length === 0 ? (
                <div className="p-12 text-center">
                  <Coins className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No user submissions yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Coin Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Year
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Condition
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {userSubmissions.map((submission) => (
                        <tr key={submission.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{submission.name}</div>
                              <div className="text-sm text-gray-500">{submission.email}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">{submission.coinType}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{submission.year}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{submission.condition}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              submission.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              submission.status === 'approved' ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {submission.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => viewSubmissionDetails(submission)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              {submission.status === 'pending' && (
                                <>
                                  <button
                                    onClick={() => approveSubmission(submission.id)}
                                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                    title="Approve"
                                  >
                                    <Check className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => rejectSubmission(submission.id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Reject"
                                  >
                                    <XCircle className="w-4 h-4" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

        {/* Appraisals Tab Content */}
        {activeTab === 'appraisals' && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Appraisal Requests</h2>
            
            {appraisals.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 mb-2">No appraisal requests yet</div>
                <div className="text-sm text-gray-400">Appraisal requests will appear here when users submit them</div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Coin Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Submitted
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {appraisals.map((appraisal) => (
                      <tr key={appraisal.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{appraisal.name}</div>
                            <div className="text-sm text-gray-500">{appraisal.email}</div>
                            <div className="text-sm text-gray-500">{appraisal.phone}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {appraisal.coinType}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs truncate">
                            {appraisal.description}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(appraisal.submittedAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            appraisal.status === 'approved' 
                              ? 'bg-green-100 text-green-800'
                              : appraisal.status === 'rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {appraisal.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {appraisal.status === 'pending' && (
                            <>
                              <button
                                onClick={() => approveAppraisal(appraisal.id)}
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors mr-2"
                                title="Approve"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => rejectAppraisal(appraisal.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Reject"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Auctions Tab Content */}
        {activeTab === 'auctions' && (
          <>
            {/* Add Auction Button */}
            <div className="mb-8">
              <a
                href="/auction/add"
                className="inline-flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Add New Auction</span>
              </a>
            </div>

            {/* Auctions Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <Gavel className="w-8 h-8 text-purple-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Active Auctions</p>
                    <p className="text-2xl font-bold text-gray-900">{auctions.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <TrendingUp className="w-8 h-8 text-green-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Total Value</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ${auctions.reduce((sum, item) => sum + item.currentBid, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <Users className="w-8 h-8 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Total Bids</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {auctions.reduce((sum, item) => sum + item.bidCount, 0)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <Clock className="w-8 h-8 text-orange-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Ending Soon</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {auctions.filter(item => {
                        const timeLeft = new Date(item.endTime).getTime() - new Date().getTime();
                        return timeLeft < 24 * 60 * 60 * 1000;
                      }).length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Auctions List */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Active Auctions ({auctions.length})</h2>
              </div>

              {auctions.length === 0 ? (
                <div className="p-12 text-center">
                  <Gavel className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No active auctions</p>
                  <a
                    href="/auction/add"
                    className="text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Create your first auction →
                  </a>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Auction Item
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Current Bid
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Bids
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Time Left
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {auctions.map((auction) => (
                        <tr key={auction.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <img
                                src={auction.image}
                                alt={auction.title}
                                className="w-12 h-12 object-cover rounded-lg mr-3"
                              />
                              <div>
                                <div className="text-sm font-medium text-gray-900">{auction.title}</div>
                                <div className="text-sm text-gray-500">{auction.year} • {auction.category}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                            ${auction.currentBid.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">{auction.bidCount}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{auction.timeLeft}</td>
                          <td className="px-6 py-4">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Active
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <a
                                href={`/auction/${auction.id}`}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </a>
                              <button
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="End Auction"
                                onClick={() => {
                                  if (confirm('Are you sure you want to end this auction?')) {
                                    showWarning('Auction ended functionality coming soon!', 4000)
                                  }
                                }}
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
