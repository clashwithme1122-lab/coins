import { Metadata } from 'next'
import { Search, Book, MessageCircle, Mail, Phone, FileText, Video, AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Help Center - Taksila Coins',
  description: 'Get help with coin collecting, buying, and selling. Find answers to common questions, authentication guides, and expert support.',
}

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Help Center</h1>
            <p className="text-xl text-purple-100 mb-8">
              Find answers, guides, and support for all your coin collecting needs
            </p>
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for help articles..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Help Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              icon: Book,
              title: 'Getting Started',
              description: 'Learn coin collecting basics',
              articles: ['Account setup', 'First purchase', 'Authentication guide', 'Storage tips']
            },
            {
              icon: AlertCircle,
              title: 'Buying & Selling',
              description: 'Master marketplace transactions',
              articles: ['How to buy', 'Selling process', 'Payment methods', 'Shipping guide']
            },
            {
              icon: FileText,
              title: 'Authentication',
              description: 'Coin grading and verification',
              articles: ['Grading basics', 'Authentication process', 'Spotting fakes', 'Certification']
            },
            {
              icon: Video,
              title: 'Investment',
              description: 'Coin investment strategies',
              articles: ['Investment guide', 'Market analysis', 'Portfolio building', 'Risk management']
            }
          ].map((category, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center cursor-pointer hover:shadow-xl transition-shadow">
              <div className="p-3 bg-purple-100 rounded-lg inline-block mb-4">
                <category.icon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{category.description}</p>
              <div className="space-y-1">
                {category.articles.map((article, i) => (
                  <div key={i} className="text-sm text-purple-600 hover:text-purple-700">
                    {article}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Popular Articles */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8">Popular Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'How to Buy Your First Coin',
                category: 'Getting Started',
                excerpt: 'Step-by-step guide to purchasing your first collectible coin on Taksila Coins.',
                views: '15.2K views'
              },
              {
                title: 'Understanding Coin Grading',
                category: 'Authentication',
                excerpt: 'Learn about coin grading scales and how condition affects value.',
                views: '12.8K views'
              },
              {
                title: 'Selling Coins Guide',
                category: 'Buying & Selling',
                excerpt: 'Complete guide to selling your coins for the best price.',
                views: '10.5K views'
              },
              {
                title: 'Coin Investment Basics',
                category: 'Investment',
                excerpt: 'Introduction to investing in rare and collectible coins.',
                views: '9.3K views'
              },
              {
                title: 'Spotting Counterfeit Coins',
                category: 'Authentication',
                excerpt: 'Expert tips for identifying fake and counterfeit coins.',
                views: '8.7K views'
              },
              {
                title: 'Coin Storage Solutions',
                category: 'Getting Started',
                excerpt: 'Best practices for storing and preserving your coin collection.',
                views: '7.9K views'
              }
            ].map((article, index) => (
              <article key={index} className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                        {article.category}
                      </span>
                      <span className="text-sm text-gray-500">{article.views}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 hover:text-purple-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{article.excerpt}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Video Tutorials */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8">Video Tutorials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Taksila Coins Platform Overview',
                duration: '5:23',
                description: 'Complete tour of the coin marketplace platform'
              },
              {
                title: 'Coin Authentication Process',
                duration: '8:45',
                description: 'Learn how professional coin authentication works'
              },
              {
                title: 'Mobile App Tutorial',
                duration: '4:12',
                description: 'How to browse and buy coins using our mobile app'
              },
              {
                title: 'Coin Grading Guide',
                duration: '6:30',
                description: 'Understanding coin grades and their impact on value'
              },
              {
                title: 'Investment Strategies',
                duration: '10:15',
                description: 'Building a valuable coin investment portfolio'
              },
              {
                title: 'Collection Management',
                duration: '7:20',
                description: 'Track and manage your coin collection effectively'
              }
            ].map((video, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow">
                <div className="bg-gray-200 rounded-lg h-40 mb-4 flex items-center justify-center">
                  <Video className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="font-semibold mb-2">{video.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{video.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{video.duration}</span>
                  <span className="text-purple-600 text-sm font-medium hover:text-purple-700">Watch →</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                question: "How do I create a Taksila Coins account?",
                answer: "Creating an account is simple. Click 'Sign Up' on our homepage, enter your details and create a password, then verify your email address. Complete your profile to unlock full marketplace features."
              },
              {
                question: "What types of coins can I buy on Taksila Coins?",
                answer: "Taksila Coins offers ancient coins, US coins, world coins, bullion, and commemorative coins. We carefully curate our collection to ensure authenticity and quality."
              },
              {
                question: "How do I know if a coin is authentic?",
                answer: "All coins on our platform are professionally authenticated and graded by expert numismatists. Each coin comes with a certificate of authenticity and detailed condition report."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept credit/debit cards, bank transfers, PayPal, and cryptocurrency for purchases. All transactions are secure and encrypted."
              },
              {
                question: "How does shipping work?",
                answer: "We offer insured shipping worldwide. Coins are professionally packaged and tracked. Standard shipping takes 3-5 business days, express options available."
              },
              {
                question: "What is your return policy?",
                answer: "We offer a 30-day return policy for items that don't match their description. The coin must be returned in its original condition. Contact our support team to initiate a return."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8">Still Need Help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: MessageCircle,
                title: 'Live Chat',
                description: 'Chat with our coin experts in real-time',
                action: 'Start Chat',
                available: '24/7 for premium members'
              },
              {
                icon: Mail,
                title: 'Email Support',
                description: 'Send us a detailed message',
                action: 'Send Email',
                available: 'Response within 24 hours'
              },
              {
                icon: Phone,
                title: 'Phone Support',
                description: 'Speak with a numismatic expert',
                action: 'Call Now',
                available: 'Mon-Fri, 9AM-6PM EST'
              }
            ].map((contact, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="p-3 bg-purple-100 rounded-lg inline-block mb-4">
                  <contact.icon className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{contact.title}</h3>
                <p className="text-gray-600 mb-4">{contact.description}</p>
                <div className="text-sm text-gray-500 mb-4">{contact.available}</div>
                <button className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors w-full">
                  {contact.action}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Community Forum */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8">Community Forum</h2>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Join Our Community</h3>
                <p className="text-gray-600 mb-6">
                  Connect with other coin collectors, share collecting strategies, get tips from experienced numismatists, 
                  and stay updated on new arrivals and market trends.
                </p>
                <div className="space-y-3 mb-6">
                  {[
                    'Get help from experienced collectors',
                    'Share your collecting strategies',
                    'Stay updated on market trends',
                    'Participate in collecting discussions',
                    'Access exclusive collector content'
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
                <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                  Join Forum
                </button>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Recent Discussions</h3>
                <div className="space-y-3">
                  {[
                    { title: 'Best strategies for coin collecting', replies: 45, views: '1.2K' },
                    { title: 'How to identify rare coins', replies: 23, views: '890' },
                    { title: 'Coin storage best practices', replies: 67, views: '2.1K' },
                    { title: 'Investment tips for beginners', replies: 31, views: '1.5K' }
                  ].map((discussion, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3">
                      <h4 className="font-medium mb-1 hover:text-purple-600 cursor-pointer">
                        {discussion.title}
                      </h4>
                      <div className="text-sm text-gray-500">
                        {discussion.replies} replies • {discussion.views} views
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Page Link */}
        <div className="text-center p-8 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl text-white">
          <h2 className="text-3xl font-bold mb-4">Check System Status</h2>
          <p className="text-purple-100 mb-6">
            View real-time status of Taksila Coins services and ongoing maintenance
          </p>
          <a href="/status" className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center">
            View Status Page
            <AlertCircle className="w-5 h-5 ml-2" />
          </a>
        </div>
      </div>
    </div>
  )
}
