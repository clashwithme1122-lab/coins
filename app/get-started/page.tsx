import { Metadata } from 'next'
import { Check, Star, Users, Shield, Zap, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Get Started - CryptoCoin',
  description: 'Start your cryptocurrency trading journey with CryptoCoin. Sign up in minutes and access professional trading tools.',
}

export default function GetStartedPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Get Started with CryptoCoin</h1>
            <p className="text-xl text-purple-100 mb-8">
              Join thousands of traders using our advanced cryptocurrency platform
            </p>
            <div className="flex justify-center space-x-4">
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
              </div>
              <span className="text-purple-200">4.9/5 from 10,000+ reviews</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sign Up Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md mx-auto">
          <div className="crypto-card">
            <h2 className="text-2xl font-bold text-center mb-6">Create Your Account</h2>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                  placeholder="Create a strong password"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                  placeholder="Confirm your password"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  required
                  className="mr-2"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the <a href="/terms" className="text-purple-600 hover:underline">Terms of Service</a> and <a href="/privacy" className="text-purple-600 hover:underline">Privacy Policy</a>
                </label>
              </div>

              <button type="submit" className="w-full crypto-button">
                Create Account
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Already have an account? <a href="/login" className="text-purple-600 hover:underline">Sign in</a>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose CryptoCoin?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Bank-Grade Security',
                description: 'Multi-signature wallets, cold storage, and insurance protection for your assets.'
              },
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Execute trades in milliseconds with our optimized trading infrastructure.'
              },
              {
                icon: Users,
                title: 'Expert Support',
                description: '24/7 customer support from cryptocurrency trading experts.'
              }
            ].map((benefit, index) => (
              <div key={index} className="crypto-card text-center">
                <div className="p-3 bg-purple-100 rounded-lg inline-block mb-4">
                  <benefit.icon className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Get Started in 3 Simple Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Sign Up',
                description: 'Create your free account in less than 2 minutes'
              },
              {
                step: '2',
                title: 'Verify Identity',
                description: 'Complete quick KYC verification to secure your account'
              },
              {
                step: '3',
                title: 'Start Trading',
                description: 'Deposit funds and start trading 500+ cryptocurrencies'
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-6 left-full w-full">
                    <ArrowRight className="w-6 h-6 text-purple-400 mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Features List */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">What You Get</h2>
          <div className="max-w-3xl mx-auto">
            <div className="crypto-card">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  'Real-time market data for 500+ cryptocurrencies',
                  'Advanced charting tools with 50+ technical indicators',
                  'Professional trading interface',
                  'Mobile app for iOS and Android',
                  'Price alerts and trading signals',
                  'Portfolio tracking and analytics',
                  'Secure wallet with multi-signature protection',
                  '24/7 customer support',
                  'API access for algorithmic trading',
                  'Educational resources and tutorials'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Chen',
                role: 'Professional Trader',
                content: 'CryptoCoin has transformed my trading experience. The analytics tools are unmatched and the execution speed is incredible.',
                rating: 5
              },
              {
                name: 'Michael Rodriguez',
                role: 'Crypto Enthusiast',
                content: 'As a beginner, I found the platform incredibly easy to use. The educational resources helped me get started quickly.',
                rating: 5
              },
              {
                name: 'Emma Wilson',
                role: 'Investment Manager',
                content: 'The API integration was seamless. We\'ve been able to automate our trading strategies effectively.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="crypto-card">
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Trading?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of successful traders on CryptoCoin today
          </p>
          <button className="crypto-button text-lg px-8 py-4">
            Create Your Free Account
          </button>
        </div>
      </div>
    </div>
  )
}
