import { Metadata } from 'next'
import { Check, X, Star, Zap, Shield, Headphones } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Pricing - CryptoCoin',
  description: 'Choose the perfect plan for your cryptocurrency trading needs. Flexible pricing options for traders of all levels.',
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-purple-100 mb-8">
              Choose the perfect plan for your trading needs. No hidden fees.
            </p>
            <div className="flex justify-center space-x-4">
              <span className="bg-white/20 px-4 py-2 rounded-lg">Monthly Billing</span>
              <span className="text-purple-200">Save 20% with Annual Billing</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Starter Plan */}
          <div className="crypto-card">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Starter</h3>
              <p className="text-gray-600 mb-4">Perfect for beginners</p>
              <div className="text-4xl font-bold mb-2">
                $0<span className="text-lg text-gray-600">/month</span>
              </div>
            </div>
            
            <ul className="space-y-3 mb-8">
              {[
                'Basic market data',
                '5 cryptocurrency pairs',
                'Standard charting',
                'Email support',
                'Mobile app access'
              ].map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            
            <button className="w-full border border-purple-600 text-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
              Get Started
            </button>
          </div>

          {/* Professional Plan */}
          <div className="crypto-card border-2 border-purple-600 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </span>
            </div>
            
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Professional</h3>
              <p className="text-gray-600 mb-4">For serious traders</p>
              <div className="text-4xl font-bold mb-2">
                $49<span className="text-lg text-gray-600">/month</span>
              </div>
            </div>
            
            <ul className="space-y-3 mb-8">
              {[
                'Real-time market data',
                '100+ cryptocurrency pairs',
                'Advanced charting tools',
                'Technical indicators',
                'Price alerts',
                'Priority support',
                'API access',
                'Portfolio analytics'
              ].map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            
            <button className="w-full crypto-button">
              Start Free Trial
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="crypto-card">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
              <p className="text-gray-600 mb-4">For teams and institutions</p>
              <div className="text-4xl font-bold mb-2">
                Custom<span className="text-lg text-gray-600">/month</span>
              </div>
            </div>
            
            <ul className="space-y-3 mb-8">
              {[
                'Everything in Professional',
                'Unlimited cryptocurrency pairs',
                'Custom integrations',
                'Dedicated account manager',
                'SLA guarantee',
                'Custom reporting',
                'White-label options',
                'On-premise deployment'
              ].map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            
            <button className="w-full border border-purple-600 text-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>

        {/* Feature Comparison */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Feature Comparison</h2>
          <div className="crypto-card overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4">Feature</th>
                  <th className="text-center py-4 px-4">Starter</th>
                  <th className="text-center py-4 px-4">Professional</th>
                  <th className="text-center py-4 px-4">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Market Data', starter: 'Delayed', professional: 'Real-time', enterprise: 'Real-time' },
                  { feature: 'Chart Types', starter: '3', professional: '10+', enterprise: 'Unlimited' },
                  { feature: 'Technical Indicators', starter: '5', professional: '50+', enterprise: 'Custom' },
                  { feature: 'API Calls', starter: '1,000/month', professional: '100,000/month', enterprise: 'Unlimited' },
                  { feature: 'Support', starter: 'Email', professional: 'Priority', enterprise: 'Dedicated' },
                  { feature: 'Mobile App', starter: 'Basic', professional: 'Full', enterprise: 'Custom' }
                ].map((row, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-4 px-4 font-medium">{row.feature}</td>
                    <td className="text-center py-4 px-4">{row.starter}</td>
                    <td className="text-center py-4 px-4">{row.professional}</td>
                    <td className="text-center py-4 px-4">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "Can I change my plan later?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
              },
              {
                question: "Is there a free trial?",
                answer: "Professional plans come with a 14-day free trial. No credit card required."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept credit cards, bank transfers, and cryptocurrency payments."
              },
              {
                question: "Do you offer refunds?",
                answer: "We offer a 30-day money-back guarantee for all paid plans."
              }
            ].map((faq, index) => (
              <div key={index} className="crypto-card">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center p-8 bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl text-white">
          <h2 className="text-3xl font-bold mb-4">Start Your Free Trial Today</h2>
          <p className="text-purple-100 mb-6">
            Join thousands of traders using CryptoCoin for professional cryptocurrency analysis
          </p>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Start Free Trial
          </button>
        </div>
      </div>
    </div>
  )
}
