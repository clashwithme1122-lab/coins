'use client'

import { useParams } from 'next/navigation'
import { Calendar, User, Clock, ArrowLeft, Share2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const blogPosts = [
  {
    id: 1,
    title: 'Mughal Empire Coins: The Golden Era of Islamic Numismatics',
    excerpt: 'Explore the magnificent coinage of the Mughal Empire, from Babur\'s early issues to Aurangzeb\'s late period. Discover how these silver rupees and gold mohurs tell the story of one of history\'s greatest Islamic empires.',
    content: `The Mughal Empire (1526-1857) produced some of the most beautiful and historically significant coins in South Asian numismatics. These coins not only served as currency but also as powerful propaganda tools for the emperors.

## Early Mughal Coinage (1526-1556)

Babur, the founder of the Mughal Empire, introduced the first Mughal coins based on the existing Delhi Sultanate designs. His son Humayun continued this tradition but faced challenges that led to his temporary exile.

## Akbar's Revolutionary Reforms (1556-1605)

Emperor Akbar revolutionized Mughal coinage by:
- Introducing the Ilahi calendar with unique dating
- Creating the famous "Ilahi coins" with zodiac signs
- Standardizing weights and purity across the empire
- Establishing mints in major cities like Delhi, Agra, and Lahore

## The Artistic Peak: Jahangir and Shah Jahan (1605-1658)

Jahangir introduced innovative features including:
- Portraits of zodiac animals on gold mohurs
- Poetic couplets praising the emperor
- Exceptionally high artistic standards

Shah Jahan's coins are renowned for:
- Perfect calligraphy and balance
- High silver purity (95-96%)
- Beautiful architectural motifs

## Aurangzeb's Orthodox Period (1658-1707)

Aurangzeb returned to more traditional Islamic designs:
- Removed figurative elements
- Emphasized Quranic verses
- Maintained high technical standards

## Collecting Mughal Coins Today

Modern collectors value Mughal coins for:
- Historical significance
- Artistic merit
- Investment potential
- Connection to Islamic heritage

Rare specimens like Jahangir's zodiac mohurs can fetch thousands of dollars at auction, while common silver rupees remain accessible to beginning collectors.`,
    author: 'Muhammad Talha',
    date: '2024-12-05',
    category: 'Mughal Coins',
    readTime: '8 min read',
    image: '/assets/Mughal Empire Coins.jpg'
  },
  {
    id: 2,
    title: 'British India Coinage: The Transition to Modern Currency',
    excerpt: 'From the East India Company to the Crown, trace the evolution of British coinage in India. Learn how these coins bridged ancient traditions and modern monetary systems.',
    content: `The British period in India (1757-1947) represents a fascinating transition in South Asian numismatics, blending Western monetary systems with local traditions.

## East India Company Period (1757-1858)

The East India Company issued coins in three presidencies:
- Bombay Presidency: Featuring the Bombay Mint mark
- Madras Presidency: Distinctive designs and denominations
- Bengal Presidency: Based on Mughal standards initially

Key characteristics:
- Bilingual inscriptions (English and Persian/Urdu)
- Portraits of British monarchs
- Traditional Islamic elements maintained

## The Crown Takes Over (1858-1901)

After the 1857 rebellion, the British Crown took direct control:
- Queen Victoria portrait coins introduced
- Standardized weight systems
- Introduction of decimal fractions

Notable series:
- Victoria Portrait Series (1862-1901)
- Uniform coinage across all presidencies

## Edward VII and George V Era (1901-1936)

Modernization continued with:
- Improved minting technology
- Higher relief portraits
- Introduction of commemorative issues

## George VI and Pre-Independence (1936-1947)

The final British period saw:
- World War II emergency issues
- Reduced silver content
- Preparation for Indian independence

## Collecting British India Coins

Popular collecting areas include:
- Portrait series of different monarchs
- Mint mark varieties (Bombay, Calcutta, Madras)
- Error coins and overdates
- Commemorative issues

## Investment Potential

British India coins offer:
- Historical significance
- Affordable entry points
- Strong collector base
- Clear attribution systems

These coins represent an important bridge between traditional Islamic coinage and modern Indian currency systems.`,
    author: 'Fatima Khan',
    date: '2024-12-03',
    category: 'British India',
    readTime: '6 min read',
    image: '/assets/British India Coinage.jpg'
  },
  {
    id: 3,
    title: 'Pakistan Coinage: From Independence to Modern Times',
    excerpt: 'Discover the complete history of Pakistani coins since 1948. From the first anna series to modern commemorative issues, trace the nation\'s monetary evolution.',
    content: `Pakistan's coinage history reflects the young nation's journey from independence to modern statehood. Each series tells a story of economic development and national identity.

## First Series (1948-1961)

Pakistan's first coins were issued in 1948:
- Denominations: 1 pice, 1/2 anna, 1 anna, 2 annas, 4 annas, 8 annas, 1 rupee
- Design: Featured the British monarch on obverse
- Reverse: Islamic designs and Urdu inscriptions
- Composition: Copper-nickel for most denominations

## Decimal Series (1961-1964)

Major reform introduced decimal system:
- 1 rupee = 100 paisa (replaced 16 annas)
- New denominations: 1, 2, 5, 10, 25, 50 paisa, 1 rupee
- Modern designs with national symbols
- Improved minting quality

## Islamic Series (1964-1972)

Under President Ayub Khan:
- Removed British monarch portraits
- Introduced Islamic motifs
- Featured national landmarks
- Enhanced security features

## Bhutto Era (1972-1977)

Significant changes included:
- Introduction of new denominations
- Nationalization of minting
- Emphasis on Islamic designs
- Higher quality standards

## Modern Period (1977-Present)

Contemporary developments:
- Introduction of commemorative coins
- Bimetallic coins for higher denominations
- Advanced security features
- International recognition

## Notable Commemorative Issues

Pakistan has issued many commemorative coins:
- Islamic Summit Conference (1974)
- Cricket World Cup victories
- National anniversaries
- Historical figures

## Collecting Pakistani Coins

Popular collecting areas:
- Complete date sets of each series
- Error coins and varieties
- Commemorative issues
- Proof and uncirculated sets
- Mint mark varieties

## Investment Considerations

Pakistani coins offer:
- Historical significance
- Affordable collecting
- Growing international interest
- Clear series organization

## Modern Developments

Recent trends include:
- Introduction of new security features
- Bimetallic technology
- International design competitions
- Digital integration possibilities

Pakistan's coinage continues to evolve while maintaining its unique cultural and Islamic identity in the modern world.`,
    author: 'Ali Malik',
    date: '2024-12-01',
    category: 'Modern Pakistan',
    readTime: '7 min read',
    image: '/assets/Pakistan Coinage.jpg'
  }
]

export default function BlogDetailPage() {
  const params = useParams()
  const postId = parseInt(params.id as string)
  
  const post = blogPosts.find(p => p.id === postId)
  
  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog post not found</h1>
          <Link href="/blog" className="text-purple-600 hover:text-purple-700">
            ← Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  const handleShare = async () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : ''
    
    if (navigator.share) {
      // Use Web Share API for native sharing
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: currentUrl,
        })
      } catch (error: any) {
        // Fallback to copying link if share is cancelled
        if (error.name !== 'AbortError') {
          navigator.clipboard.writeText(currentUrl)
          alert('Link copied to clipboard!')
        }
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(currentUrl)
      alert('Link copied to clipboard!')
    }
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Image */}
      <div className="relative h-96 bg-gradient-to-br from-purple-600 to-purple-700">
        <div className="absolute inset-0">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <Link 
              href="/blog"
              className="inline-flex items-center text-purple-200 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
            <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4 inline-block">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
            <p className="text-xl text-purple-100 mb-6">{post.excerpt}</p>
            
            {/* Meta Information */}
            <div className="flex items-center space-x-6 text-purple-100">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                {post.author}
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                {new Date(post.date).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                {post.readTime}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="prose prose-lg max-w-none">
            {post.content.split('\n').map((paragraph, index) => {
              if (paragraph.startsWith('##')) {
                return (
                  <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-gray-900">
                    {paragraph.replace('##', '').trim()}
                  </h2>
                )
              } else if (paragraph.startsWith('-')) {
                return (
                  <li key={index} className="ml-6 text-gray-600 mb-2">
                    {paragraph.replace('-', '').trim()}
                  </li>
                )
              } else if (paragraph.trim()) {
                return (
                  <p key={index} className="text-gray-600 mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                )
              }
              return null
            })}
          </div>

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Share this article</h3>
                <p className="text-gray-600">Help others discover the fascinating world of numismatics</p>
              </div>
              <button 
                onClick={handleShare}
                className="flex items-center text-purple-600 hover:text-purple-700 font-medium"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Share
              </button>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPosts
                .filter(p => p.id !== post.id)
                .slice(0, 2)
                .map(relatedPost => (
                  <Link 
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.id}`}
                    className="block p-6 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all"
                  >
                    <span className="text-sm text-purple-600 font-medium">{relatedPost.category}</span>
                    <h4 className="text-lg font-semibold text-gray-900 mt-2 mb-2">{relatedPost.title}</h4>
                    <p className="text-gray-600 text-sm line-clamp-2">{relatedPost.excerpt}</p>
                    <div className="flex items-center text-sm text-gray-500 mt-3">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(relatedPost.date).toLocaleDateString()}
                      <span className="mx-2">•</span>
                      <Clock className="w-4 h-4 mr-1" />
                      {relatedPost.readTime}
                    </div>
                  </Link>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
