import Link from 'next/link'
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, TrendingUp, Shield } from 'lucide-react'

// Animated Coin Component
const AnimatedCoin = () => {
  return (
    <div className="relative w-12 h-12 sm:w-16 sm:h-16 mx-auto cursor-pointer group">
      {/* Outer glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full shadow-2xl animate-spin-slow group-hover:animate-coin-flip transition-all duration-300"></div>
      
      {/* Inner coin design */}
      <div className="absolute inset-2 sm:inset-2 bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 rounded-full flex items-center justify-center shadow-inner">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-yellow-600 to-yellow-800 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-sm sm:text-lg animate-pulse">T</span>
        </div>
      </div>
      
      {/* Coin details */}
      <div className="absolute inset-3 sm:inset-3 border-2 border-yellow-400 rounded-full opacity-50"></div>
      <div className="absolute inset-4 sm:inset-4 border border-yellow-300 rounded-full opacity-30"></div>
      
      {/* Floating particles */}
      <div className="absolute -top-1 sm:-top-2 -left-1 sm:-left-2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full animate-pulse"></div>
      <div className="absolute -bottom-1 sm:-bottom-2 -right-1 sm:-right-2 w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full animate-pulse delay-75"></div>
      
      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl"></div>
    </div>
  )
}

// Animated Trending Up Component
const AnimatedTrendingUp = () => {
  return (
    <div className="relative w-12 h-12 sm:w-16 sm:h-16 mx-auto cursor-pointer group">
      {/* Outer glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-full shadow-2xl animate-coin-bounce transition-all duration-300"></div>
      
      {/* Inner icon design */}
      <div className="absolute inset-2 sm:inset-2 bg-gradient-to-r from-green-500 via-green-600 to-green-700 rounded-full flex items-center justify-center shadow-inner">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-600 to-green-800 rounded-full flex items-center justify-center shadow-lg">
          <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6 text-white animate-pulse" />
        </div>
      </div>
      
      {/* Icon details */}
      <div className="absolute inset-3 sm:inset-3 border-2 border-green-400 rounded-full opacity-50"></div>
      <div className="absolute inset-4 sm:inset-4 border border-green-300 rounded-full opacity-30"></div>
      
      {/* Floating particles */}
      <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse"></div>
      <div className="absolute -bottom-1 sm:-bottom-2 -left-1 sm:-left-2 w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse delay-75"></div>
      
      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl"></div>
    </div>
  )
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    marketplace: [
      { name: 'Browse Coins', href: '/coins' },
      { name: 'My Cart', href: '/cart' },
      { name: 'Favorites', href: '/favorites' },
      { name: 'Sell Coins', href: '/sell' },
      { name: 'Auction', href: '/auction' },
    ],
    services: [
      { name: 'Coin Appraisal', href: '/appraisal' },
      { name: 'Authentication', href: '/authentication' },
      { name: 'Grading Service', href: '/grading' },
      { name: 'Storage Solutions', href: '/storage' },
    ],
    resources: [
      { name: 'Coin Guide', href: '/guide' },
      { name: 'Price Trends', href: '/prices' },
      { name: 'Market Analysis', href: '/analysis' },
      { name: 'Investment Tips', href: '/investing' },
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Shipping Info', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
    ],
  }

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="font-bold text-xl">Taksila Coins</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Trusted marketplace for rare and historical coins. Buy, sell, and trade 
              authentic numismatic treasures with confidence. Professional grading and authentication services available.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center text-gray-400">
                <Mail className="w-4 h-4 mr-2" />
                <span className="text-sm">mtalhakh24@gmail.com</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-sm">+92 321 5060069</span>
              </div>
              <div className="flex items-center text-gray-400">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">Pakistan</span>
              </div>
            </div>

            {/* Social Links with Animations */}
            <div className="mt-6">
              <div className="flex space-x-4 mb-12 sm:mb-8">
                {socialLinks.map((social, index) => (
                  <div key={social.label} className="relative">
                    <a
                      href={social.href}
                      className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors block"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                    {/* Animation below specific icons */}
                    {index === 0 && (
                      <div className="absolute -bottom-16 sm:-bottom-20 left-1/2 transform -translate-x-1/2">
                        <AnimatedCoin />
                      </div>
                    )}
                    {index === 3 && (
                      <div className="absolute -bottom-16 sm:-bottom-20 left-1/2 transform -translate-x-1/2">
                        <AnimatedTrendingUp />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {/* Spacer to account for animations */}
              <div className="h-16 sm:h-20"></div>
            </div>
          </div>

          {/* Marketplace Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Marketplace</h3>
            <ul className="space-y-2">
              {footerLinks.marketplace.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 p-6 bg-gray-800 rounded-xl">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-semibold mb-2">Coin Collector's Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Get rare coin alerts, market trends, and exclusive auction updates delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-purple-600 text-white placeholder-gray-400"
              />
              <button className="crypto-button">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Taksila Coins. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/shipping" className="text-gray-400 hover:text-white transition-colors">
                Shipping Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
