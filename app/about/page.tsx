import { Metadata } from 'next'
import Link from 'next/link'
import { Users, Target, Shield, Globe, Award, Zap, MapPin, Calendar, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us - Taksila Coins',
  description: 'Learn about Taksila Coins - Pakistan\'s premier coin marketplace connecting collectors with authentic historical and modern coins.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">About Taksila Coins</h1>
            <p className="text-xl text-purple-100 mb-8">
              Connecting collectors with Pakistan's finest historical and modern coins since 2025
            </p>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            To preserve and share Pakistan's rich numismatic heritage by providing collectors with authentic, 
            professionally graded coins while fostering a community of passionate enthusiasts across South Asia and beyond.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Users, label: 'Active Collectors', value: '1K+', description: 'Growing community' },
            { icon: Globe, label: 'Countries', value: '15+', description: 'Regional shipping' },
            { icon: Shield, label: 'Authenticity', value: '100%', description: 'Guaranteed genuine' },
            { icon: Award, label: 'Expert Rating', value: '4.9/5', description: 'Customer satisfaction' },
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="p-3 bg-purple-100 rounded-lg inline-block mb-4">
                <stat.icon className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-2">{stat.value}</div>
              <div className="font-semibold mb-1">{stat.label}</div>
              <div className="text-sm text-gray-600">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Our Story */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Founded in December 2025, Taksila Coins emerged from a deep passion for preserving Pakistan's 
            numismatic heritage. Named after the ancient city of Taxila, a historic center of learning and 
            trade where coins were first minted in the region thousands of years ago, our mission is to connect 
            collectors with authentic pieces of history.
          </p>
          <p className="text-gray-600 mb-4">
            What began as a personal collection of rare Pakistani coins has evolved into a trusted marketplace 
            serving collectors across Pakistan and neighboring countries. We specialize in coins from the 
            Mughal Empire, British India period, and modern Pakistan, alongside carefully selected international 
            numismatic treasures.
          </p>
          <p className="text-gray-600">
            Today, Taksila Coins combines traditional numismatic expertise with modern technology, making it 
            easier than ever for collectors to discover, authenticate, and acquire historical coins while 
            building a vibrant community of enthusiasts passionate about preserving our monetary heritage.
          </p>
          <div className="mt-6 flex items-center text-purple-600">
            <Calendar className="w-5 h-5 mr-2" />
            <span className="font-semibold">Founded December 2, 2025 - Pakistan's Premier Coin Marketplace</span>
          </div>
        </div>

        {/* Our Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: Shield,
              title: 'Authenticity Guaranteed',
              description: 'Every coin we sell is professionally authenticated and graded by expert numismatists with full money-back guarantees.',
            },
            {
              icon: Target,
              title: 'Regional Expertise',
              description: 'Our team specializes in South Asian numismatics, with deep knowledge of Pakistani, Mughal, and British Indian coins.',
            },
            {
              icon: Users,
              title: 'Collector Community',
              description: 'We foster a welcoming community where collectors can share knowledge, showcase collections, and learn from experts.',
            },
          ].map((value, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <div className="p-3 bg-purple-100 rounded-lg inline-block mb-4">
                <value.icon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>

        {/* Our Expert Team */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6">Our Expert Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: 'Muhammad Talha',
                role: 'Founder & Chief Numismatist',
                expertise: '15 years experience, Pakistani & Mughal coins specialist',
              },
              {
                name: 'Fatima Khan',
                role: 'Head of Authentication',
                expertise: 'Certified grader, former State Bank historian',
              },
              {
                name: 'Ali Malik',
                role: 'Market Director',
                expertise: 'Expert in South Asian coins, auction specialist',
              },
              {
                name: 'Sara Ahmed',
                role: 'Customer Relations',
                expertise: 'Collector advocate, numismatic researcher',
              },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 bg-purple-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12 text-purple-600" />
                </div>
                <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                <p className="text-purple-600 font-semibold mb-2">{member.role}</p>
                <p className="text-sm text-gray-600">{member.expertise}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What We Offer */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Star,
                title: 'Rare Coin Sales',
                description: 'Curated collection of Pakistani, Mughal, British India, and select international coins with full authentication',
              },
              {
                icon: Target,
                title: 'Professional Appraisal',
                description: 'Expert valuation services for collections and individual coins, specializing in South Asian numismatics',
              },
              {
                icon: Shield,
                title: 'Authentication & Grading',
                description: 'Professional coin grading and certification services with detailed provenance documentation',
              },
            ].map((service, index) => (
              <div key={index} className="text-center">
                <div className="p-3 bg-purple-100 rounded-lg inline-block mb-4">
                  <service.icon className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Location & Contact */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl shadow-lg p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Visit Our Office</h2>
              <p className="text-purple-100 mb-4">
                Located in the heart of Lahore, our showroom welcomes collectors to view our curated collection 
                of historical coins and receive expert consultations.
              </p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>Pakistan</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  <span>By Appointment Only</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">Get Started</h3>
                <p className="text-purple-100 mb-4">
                  Join Pakistan's growing community of coin collectors
                </p>
                <div className="space-y-2">
                  <Link href="/coins">
                    <button className="w-full bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition">
                      Browse Collection
                    </button>
                  </Link>
                  <Link href="/contact">
                    <button className="w-full bg-purple-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-900 transition">
                      Contact Experts
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Become part of Pakistan's most trusted coin marketplace. Start your collecting journey 
            with Taksila Coins today and discover the rich history behind each piece.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/coins">
              <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
                Browse Coins
              </button>
            </Link>
            <Link href="/contact">
              <button className="bg-white text-purple-600 border-2 border-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition">
                Contact Experts
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
