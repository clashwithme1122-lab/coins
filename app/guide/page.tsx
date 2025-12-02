'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Search, Filter, TrendingUp, Shield, Award, Clock, Users, Star } from 'lucide-react'

export default function CoinGuidePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Topics', icon: BookOpen },
    { id: 'basics', name: 'Coin Basics', icon: BookOpen },
    { id: 'grading', name: 'Grading Guide', icon: Award },
    { id: 'investing', name: 'Investing', icon: TrendingUp },
    { id: 'authentication', name: 'Authentication', icon: Shield },
    { id: 'history', name: 'Historical', icon: Clock }
  ]

  const guides = [
    {
      id: 1,
      title: "Getting Started with Coin Collecting",
      category: "basics",
      difficulty: "Beginner",
      readTime: "5 min",
      excerpt: "Learn the fundamentals of coin collecting, from terminology to essential tools you'll need.",
      image: "/assets/dummycoin.jpg",
      rating: 4.8,
      views: 15420
    },
    {
      id: 2,
      title: "Understanding Coin Grading Systems",
      category: "grading",
      difficulty: "Intermediate",
      readTime: "8 min",
      excerpt: "Master the Sheldon grading scale and learn how to assess coin condition like a professional.",
      image: "/assets/dummycoin.jpg",
      rating: 4.9,
      views: 12350
    },
    {
      id: 3,
      title: "Investment Strategies for Rare Coins",
      category: "investing",
      difficulty: "Advanced",
      readTime: "12 min",
      excerpt: "Discover proven strategies for building a valuable coin portfolio and maximizing returns.",
      image: "/assets/dummycoin.jpg",
      rating: 4.7,
      views: 9870
    },
    {
      id: 4,
      title: "Spotting Counterfeit Coins",
      category: "authentication",
      difficulty: "Intermediate",
      readTime: "10 min",
      excerpt: "Learn expert techniques to identify fake coins and protect your collection from fraud.",
      image: "/assets/dummycoin.jpg",
      rating: 4.9,
      views: 11200
    },
    {
      id: 5,
      title: "Ancient Roman Coins: A Collector's Guide",
      category: "history",
      difficulty: "Beginner",
      readTime: "15 min",
      excerpt: "Explore the fascinating world of ancient Roman coinage and start your classical collection.",
      image: "/assets/dummycoin.jpg",
      rating: 4.6,
      views: 8900
    },
    {
      id: 6,
      title: "Morgan Silver Dollars: Complete Guide",
      category: "basics",
      difficulty: "Beginner",
      readTime: "7 min",
      excerpt: "Everything you need to know about collecting America's most popular silver dollar.",
      image: "/assets/dummycoin.jpg",
      rating: 4.8,
      views: 14500
    }
  ]

  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700'
      case 'Advanced': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
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
            <BookOpen className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Coin Collector's Guide</h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Expert guides, tips, and tutorials to help you master the art of coin collecting.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">150+</div>
              <div className="text-sm text-gray-600">Expert Guides</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">50K+</div>
              <div className="text-sm text-gray-600">Happy Readers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">4.8</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">Daily</div>
              <div className="text-sm text-gray-600">New Content</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search guides..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Guides */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold mb-8">Featured Guides</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {guides.slice(0, 3).map((guide, index) => (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative">
                <img
                  src={guide.image}
                  alt={guide.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(guide.difficulty)}`}>
                    {guide.difficulty}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500 capitalize">{guide.category}</span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {guide.readTime}
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{guide.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{guide.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex text-yellow-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(guide.rating) ? 'fill-current' : ''}`} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">{guide.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">{guide.views.toLocaleString()} views</span>
                </div>
                <button className="w-full mt-4 bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                  Read Guide
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* All Guides */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold mb-8">All Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuides.map((guide, index) => (
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative">
                  <img
                    src={guide.image}
                    alt={guide.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(guide.difficulty)}`}>
                      {guide.difficulty}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500 capitalize">{guide.category}</span>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {guide.readTime}
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2 line-clamp-1">{guide.title}</h3>
                  <p className="text-gray-600 text-xs mb-3 line-clamp-2">{guide.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex text-yellow-400 mr-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < Math.floor(guide.rating) ? 'fill-current' : ''}`} />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">{guide.rating}</span>
                    </div>
                    <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                      Read →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredGuides.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No guides found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Learning Path */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-center mb-8">Your Learning Path</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Beginner</h3>
              <p className="text-sm text-gray-600 mb-4">Start with coin basics and terminology</p>
              <div className="space-y-2">
                <div className="text-left bg-gray-50 rounded-lg p-3">
                  <p className="text-sm font-medium">Getting Started</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">Intermediate</h3>
              <p className="text-sm text-gray-600 mb-4">Learn grading and authentication</p>
              <div className="space-y-2">
                <div className="text-left bg-gray-50 rounded-lg p-3">
                  <p className="text-sm font-medium">Grading Systems</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">Advanced</h3>
              <p className="text-sm text-gray-600 mb-4">Master investing and rare coins</p>
              <div className="space-y-2">
                <div className="text-left bg-gray-50 rounded-lg p-3">
                  <p className="text-sm font-medium">Investment Strategies</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-purple-50 border-t border-purple-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <BookOpen className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Stay Updated with New Guides</h2>
          <p className="text-gray-600 mb-6">
            Get the latest coin collecting guides and expert tips delivered to your inbox weekly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
            />
            <button className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
