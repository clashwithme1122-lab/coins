import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, User, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog - Taksila Coins',
  description: 'Latest numismatic insights, coin collecting tips, and historical discoveries from the Taksila Coins team.',
}

const blogPosts = [
  {
    id: 1,
    title: 'Ancient Roman Coins: A Window into Imperial History',
    excerpt: 'Discover how Roman coins tell the story of emperors, conquests, and daily life in the ancient world. Learn what makes these silver and bronze treasures so valuable to collectors.',
    author: 'Dr. Marcus Thompson',
    date: '2024-12-01',
    category: 'Ancient Coins',
    readTime: '5 min read',
    image: '/blog/roman-coins.jpg'
  },
  {
    id: 2,
    title: 'The Art of Coin Grading: Understanding Numismatic Values',
    excerpt: 'Professional coin grading can dramatically impact value. Our expert guide explains the grading process and how to assess your collection\'s true worth.',
    author: 'Elena Rodriguez',
    date: '2024-11-28',
    category: 'Collecting Tips',
    readTime: '7 min read',
    image: '/blog/coin-grading.jpg'
  },
  {
    id: 3,
    title: 'Medieval European Coins: From Byzantium to the Renaissance',
    excerpt: 'Explore the fascinating evolution of European coinage through the Middle Ages, from Byzantine gold to the first modern currencies.',
    author: 'Prof. William Harrison',
    date: '2024-11-25',
    category: 'Medieval Coins',
    readTime: '6 min read',
    image: '/blog/medieval-coins.jpg'
  }
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Numismatic Insights</h1>
            <p className="text-xl text-purple-100 mb-8">
              Expert articles on coin collecting, historical discoveries, and market trends
            </p>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              {/* Post Image */}
              <div className="h-48 bg-gray-200 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 line-clamp-2">{post.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                
                {/* Meta Information */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </div>
                  <span>{post.readTime}</span>
                </div>

                {/* Read More Link */}
                <Link 
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium transition-colors"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated with Numismatic News</h2>
          <p className="text-xl text-purple-100 mb-8">
            Get the latest coin collecting tips and historical discoveries delivered to your inbox
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
