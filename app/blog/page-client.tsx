'use client'

import { Calendar, User, ArrowRight, Clock } from 'lucide-react'
import Link from 'next/link'

const blogPosts = [
  {
    id: 4,
    title: 'How to Identify an Authentic Roman Denarius: A Collector’s Guide',
    excerpt: 'Learn how to spot fake Roman coins. Discover expert techniques on weight, patina, and striking used by numismatists to authenticate an ancient Roman Denarius.',
    content: `Spotting fake Roman coins requires expertise in analyzing weight, die strikes, and patina...`,
    author: 'Taksila Experts',
    date: '2026-03-01',
    category: 'Authentication',
    readTime: '10 min read',
    image: '/assets/home.webp'
  },
  {
    id: 5,
    title: 'The Top 10 Most Valuable Mughal Coins and Their Current Market Worth',
    excerpt: 'Explore the rarest gold and silver Mughal empire coins. See auction records, current market values, and what makes these Islamic antique coins so valuable.',
    content: `Mughal empire coins represent some of the most sought-after numismatic treasures...`,
    author: 'Taksila Experts',
    date: '2026-03-05',
    category: 'Market Trends',
    readTime: '12 min read',
    image: '/assets/home.webp'
  },
  {
    id: 6,
    title: 'Beginner\'s Guide to Investing in Ancient Coins for Long-Term Wealth',
    excerpt: 'Start your numismatic investment portfolio. Learn which rare antique coins hold value, how to buy safely online, and secure expert-graded pieces from $85.',
    content: `Investing in history offers unique opportunities compared to traditional markets...`,
    author: 'Taksila Experts',
    date: '2026-03-10',
    category: 'Investing',
    readTime: '8 min read',
    image: '/assets/home.webp'
  },
  {
    id: 7,
    title: 'Coin Grading Explained: PCGS vs NGC & Understanding Authenticity',
    excerpt: 'Demystify ancient coin grading scales. We compare PCGS vs NGC and explain why a Certificate of Authenticity is vital before you buy rare coins online.',
    content: `Professional grading ensures the condition and authenticity of rare coins...`,
    author: 'Taksila Experts',
    date: '2026-03-12',
    category: 'Grading',
    readTime: '9 min read',
    image: '/assets/home.webp'
  },
  {
    id: 8,
    title: 'Where to Buy Authenticated Antique Coins Online Safely in 2026',
    excerpt: 'Avoid scams when building your collection. We review the safest marketplaces for buying authentic Roman, Greek, and Medieval coins with verified provenance.',
    content: `As the online market for antiquities grows, knowing where to safely acquire pieces is critical...`,
    author: 'Taksila Experts',
    date: '2026-03-15',
    category: 'Buying Guide',
    readTime: '7 min read',
    image: '/assets/home.webp'
  },
  {
    id: 1,
    title: 'Mughal Empire Coins: The Golden Era of Islamic Numismatics',
    excerpt: 'Explore the magnificent coinage of the Mughal Empire, from Babur\'s early issues to Aurangzeb\'s late period.',
    content: `The Mughal Empire (1526-1857) produced some of the most beautiful coins...`,
    author: 'Muhammad Talha',
    date: '2024-12-05',
    category: 'Mughal Coins',
    readTime: '8 min read',
    image: '/assets/Mughal Empire Coins.jpg'
  },
  {
    id: 2,
    title: 'British India Coinage: The Transition to Modern Currency',
    excerpt: 'From the East India Company to the Crown, trace the evolution of British coinage in India.',
    content: `The British period in India represents a fascinating transition...`,
    author: 'Fatima Khan',
    date: '2024-12-03',
    category: 'British India',
    readTime: '6 min read',
    image: '/assets/British India Coinage.jpg'
  },
  {
    id: 3,
    title: 'Pakistan Coinage: From Independence to Modern Times',
    excerpt: 'Discover the complete history of Pakistani coins since 1948. From the first anna series to modern issues.',
    content: `Pakistan's coinage history reflects the young nation's journey...`,
    author: 'Ali Malik',
    date: '2024-12-01',
    category: 'Modern Pakistan',
    readTime: '7 min read',
    image: '/assets/Pakistan Coinage.jpg'
  }
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300">
      {/* Hero Section */}
      <div className="bg-[#121212] border-b border-gray-800 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] z-0" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4 tracking-wider uppercase">Numismatic Intelligence</h1>
          <p className="text-xl text-amber-500 font-light max-w-2xl mx-auto">
            Expert articles on antique coin collecting, historical discoveries, and authentication insights.
          </p>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-[#1a1a1a] border border-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-amber-500/30 transition-all duration-300 group">
              {/* Post Image */}
              <div className="h-56 relative overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-black/20 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-amber-600/90 backdrop-blur-sm text-white px-3 py-1 rounded text-xs tracking-wider uppercase font-bold shadow-lg">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-6">
                <h3 className="text-lg font-playfair font-bold text-white mb-3 line-clamp-2 leading-tight">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                
                {/* Meta Information */}
                <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-800 pt-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-amber-500">
                      <User className="w-3 h-3 mr-1" />
                      {post.author}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {post.readTime}
                  </div>
                </div>

                {/* Read More Button */}
                <Link 
                  href={`/blog/${post.id}`}
                  className="mt-6 flex items-center justify-center w-full bg-transparent border border-amber-600 text-amber-500 hover:bg-amber-600 hover:text-white py-2.5 rounded font-semibold text-sm transition-colors duration-300"
                >
                  Read Analysis
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-[#121212] border-t border-gray-800 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-2xl font-playfair font-bold mb-4 tracking-wide uppercase text-amber-500">Curator's Dispatch</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Receive exclusive updates on recent acquisitions, upcoming auctions, and deep-dives into numismatic history.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 bg-[#1a1a1a] border border-gray-800 rounded text-white focus:outline-none focus:border-amber-500 transition-colors"
            />
            <button className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-3 rounded font-semibold tracking-wider uppercase text-sm transition-colors shadow-[0_0_15px_rgba(217,119,6,0.3)] hover:shadow-[0_0_25px_rgba(217,119,6,0.5)]">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
