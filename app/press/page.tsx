import { Metadata } from 'next'
import { Calendar, ExternalLink, Download, TrendingUp, Award, Users, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Press - CryptoCoin',
  description: 'CryptoCoin press releases, media coverage, and company news. Get the latest updates about our cryptocurrency platform.',
}

export default function PressPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Press & Media</h1>
            <p className="text-xl text-purple-100 mb-8">
              Latest news, press releases, and media coverage about CryptoCoin
            </p>
            <div className="flex justify-center space-x-4">
              <a href="#press-releases" className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Press Releases
              </a>
              <a href="#media-kit" className="border border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
                Media Kit
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Company Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="crypto-card mb-12">
          <h2 className="text-3xl font-bold mb-6">Company Overview</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">
                CryptoCoin is a leading cryptocurrency analytics and trading platform founded in 2020. 
                We provide professional-grade tools and real-time market data to over 500,000 traders 
                across 150+ countries worldwide.
              </p>
              <p className="text-gray-600 mb-4">
                Our mission is to democratize access to professional cryptocurrency trading tools, 
                enabling traders of all levels to make informed decisions in the rapidly evolving crypto market.
              </p>
              <p className="text-gray-600">
                With $50M in Series B funding and a team of 150+ experts, we're committed to innovation 
                and excellence in the cryptocurrency space.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Users, label: 'Active Users', value: '500K+' },
                { icon: Globe, label: 'Countries', value: '150+' },
                { icon: TrendingUp, label: 'Trading Volume', value: '$2.3B+' },
                { icon: Award, label: 'Founded', value: '2020' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="p-3 bg-purple-100 rounded-lg inline-block mb-2">
                    <stat.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Press Releases */}
        <div id="press-releases" className="mb-12">
          <h2 className="text-3xl font-bold mb-8">Press Releases</h2>
          <div className="space-y-6">
            {[
              {
                date: '2024-11-15',
                title: 'CryptoCoin Reaches 500,000 Active Users Milestone',
                excerpt: 'Leading cryptocurrency platform celebrates rapid growth and user adoption across global markets.',
                category: 'Company News'
              },
              {
                date: '2024-10-28',
                title: 'CryptoCoin Launches AI-Powered Trading Signals',
                excerpt: 'New machine learning features provide traders with predictive analytics and automated trading recommendations.',
                category: 'Product Launch'
              },
              {
                date: '2024-09-12',
                title: 'CryptoCoin Secures $50M Series B Funding',
                excerpt: 'Investment round led by top venture capital firms to fuel global expansion and product development.',
                category: 'Funding'
              },
              {
                date: '2024-08-05',
                title: 'CryptoCoin Expands to European Markets',
                excerpt: 'Platform now available in 15 new European countries with localized support and regulatory compliance.',
                category: 'Expansion'
              },
              {
                date: '2024-07-20',
                title: 'CryptoCoin Introduces Mobile Trading App',
                excerpt: 'Native iOS and Android apps bring professional trading tools to mobile devices worldwide.',
                category: 'Product Launch'
              },
              {
                date: '2024-06-10',
                title: 'CryptoCoin Partners with Major Exchanges',
                excerpt: 'Strategic partnerships enable seamless integration with leading cryptocurrency exchanges.',
                category: 'Partnership'
              }
            ].map((release, index) => (
              <article key={index} className="crypto-card">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-4 mb-2">
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                        {release.category}
                      </span>
                      <span className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {release.date}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{release.title}</h3>
                    <p className="text-gray-600">{release.excerpt}</p>
                  </div>
                  <div className="flex space-x-4 mt-4 lg:mt-0">
                    <a href="#" className="crypto-button inline-flex items-center text-sm">
                      Read More
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                    <a href="#" className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors inline-flex items-center text-sm">
                      <Download className="w-4 h-4 mr-2" />
                      PDF
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Media Coverage */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8">Media Coverage</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                publication: 'TechCrunch',
                title: 'CryptoCoin Raises $50M to Democratize Crypto Trading',
                date: '2024-09-15',
                excerpt: 'The platform aims to make professional crypto trading tools accessible to retail investors.'
              },
              {
                publication: 'Forbes',
                title: 'How CryptoCoin is Changing the Game for Crypto Traders',
                date: '2024-08-20',
                excerpt: 'With advanced analytics and AI-powered insights, CryptoCoin levels the playing field.'
              },
              {
                publication: 'Bloomberg',
                title: 'Crypto Trading Platform CryptoCoin Hits 500K Users',
                date: '2024-11-20',
                excerpt: 'Rapid adoption highlights growing demand for sophisticated crypto trading tools.'
              },
              {
                publication: 'Reuters',
                title: 'CryptoCoin Expands European Operations',
                date: '2024-09-05',
                excerpt: 'San Francisco-based crypto trading platform continues global expansion efforts.'
              },
              {
                publication: 'CoinDesk',
                title: 'CryptoCoin Launches AI Trading Signals Feature',
                date: '2024-10-30',
                excerpt: 'New machine learning capabilities provide predictive analytics for traders.'
              },
              {
                publication: 'The Wall Street Journal',
                title: 'Retail Flock to Crypto Trading Platforms Amid Market Volatility',
                date: '2024-07-15',
                excerpt: 'Platforms like CryptoCoin see surge in user growth as retail investors seek professional tools.'
              }
            ].map((coverage, index) => (
              <div key={index} className="crypto-card">
                <div className="mb-3">
                  <span className="font-semibold text-purple-600">{coverage.publication}</span>
                  <span className="text-sm text-gray-500 ml-2">{coverage.date}</span>
                </div>
                <h3 className="font-semibold mb-2">{coverage.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{coverage.excerpt}</p>
                <a href="#" className="text-purple-600 hover:text-purple-700 text-sm font-medium inline-flex items-center">
                  Read Article
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Media Kit */}
        <div id="media-kit" className="mb-12">
          <h2 className="text-3xl font-bold mb-8">Media Kit</h2>
          <div className="crypto-card">
            <p className="text-gray-600 mb-6">
              Download our media kit for official logos, brand guidelines, executive photos, and company information.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Company Logo Pack', size: '2.5 MB', format: 'PNG, SVG' },
                { name: 'Brand Guidelines', size: '1.2 MB', format: 'PDF' },
                { name: 'Executive Photos', size: '8.7 MB', format: 'JPG' },
                { name: 'Product Screenshots', size: '3.4 MB', format: 'PNG' },
                { name: 'Company Fact Sheet', size: '0.8 MB', format: 'PDF' },
                { name: 'Press Release Template', size: '0.3 MB', format: 'DOCX' },
                { name: 'B-roll Video', size: '125 MB', format: 'MP4' },
                { name: 'Complete Media Kit', size: '145 MB', format: 'ZIP' }
              ].map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">{item.name}</h4>
                  <div className="text-sm text-gray-500 mb-3">
                    <div>{item.size} • {item.format}</div>
                  </div>
                  <a href="#" className="text-purple-600 hover:text-purple-700 text-sm font-medium inline-flex items-center">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8">Media Contact</h2>
          <div className="crypto-card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Press Inquiries</h3>
                <div className="space-y-3">
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-gray-600">press@cryptocoin.com</div>
                  </div>
                  <div>
                    <div className="font-medium">Phone</div>
                    <div className="text-gray-600">+1 (555) 123-4567 ext. 200</div>
                  </div>
                  <div>
                    <div className="font-medium">Response Time</div>
                    <div className="text-gray-600">Within 24 hours</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Request Interview</h3>
                <p className="text-gray-600 mb-4">
                  For interview requests with our executive team or to arrange product demos, 
                  please contact our media relations team.
                </p>
                <button className="crypto-button">
                  Request Interview
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Facts */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8">Quick Facts</h2>
          <div className="crypto-card">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                'Founded: 2020',
                'Headquarters: San Francisco, CA',
                'Employees: 150+',
                'Users: 500,000+',
                'Countries: 150+',
                'Supported Cryptocurrencies: 500+',
                'Trading Volume: $2.3B+',
                'Funding: $50M Series B',
                'CEO: Sarah Chen',
                'CTO: Michael Rodriguez',
                'Category: Fintech, Cryptocurrency',
                'Target Market: Retail & Professional Traders'
              ].map((fact, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span className="text-gray-700">{fact}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
