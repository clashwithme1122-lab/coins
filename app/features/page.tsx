import { Metadata } from 'next'
import { Zap, Shield, BarChart3, Globe, Bell, Cpu, Database, Lock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Features - CryptoCoin',
  description: 'Explore the advanced features of CryptoCoin - real-time analytics, professional trading tools, and comprehensive market insights.',
}

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Platform Features</h1>
            <p className="text-xl text-purple-100 mb-8">
              Everything you need for professional cryptocurrency trading and analysis
            </p>
          </div>
        </div>
      </div>

      {/* Main Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: BarChart3,
              title: 'Real-Time Analytics',
              description: 'Advanced charting tools with 50+ technical indicators and customizable timeframes.',
              features: ['Live price updates', 'Technical indicators', 'Custom charts', 'Historical data']
            },
            {
              icon: Shield,
              title: 'Secure Trading',
              description: 'Bank-grade security with multi-signature wallets and cold storage for your assets.',
              features: ['2FA authentication', 'Cold storage', 'Insurance coverage', 'Regular audits']
            },
            {
              icon: Zap,
              title: 'Lightning Fast',
              description: 'Execute trades in milliseconds with our optimized trading infrastructure.',
              features: ['Sub-second execution', 'Low latency', 'High throughput', '99.9% uptime']
            },
            {
              icon: Globe,
              title: 'Global Markets',
              description: 'Access 500+ cryptocurrencies across 150+ countries with deep liquidity pools.',
              features: ['500+ coins', 'Global access', 'Deep liquidity', 'Multiple fiat pairs']
            },
            {
              icon: Bell,
              title: 'Smart Alerts',
              description: 'Customizable price alerts and trading signals delivered instantly to your devices.',
              features: ['Price alerts', 'Trading signals', 'Email/SMS notifications', 'Push notifications']
            },
            {
              icon: Cpu,
              title: 'API Access',
              description: 'Full-featured REST and WebSocket APIs for algorithmic trading and automation.',
              features: ['REST API', 'WebSocket streaming', 'Rate limits', 'Documentation']
            }
          ].map((feature, index) => (
            <div key={index} className="crypto-card">
              <div className="p-3 bg-purple-100 rounded-lg inline-block mb-4">
                <feature.icon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.features.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mr-2"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Advanced Features */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Advanced Trading Tools</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                title: 'Professional Charting',
                description: 'Industry-leading charting platform with advanced drawing tools and technical analysis.',
                tools: ['Candlestick charts', 'Volume analysis', 'Trend lines', 'Fibonacci retracements', 'Ichimoku clouds']
              },
              {
                title: 'Order Management',
                description: 'Sophisticated order types and management system for precise trading strategies.',
                tools: ['Limit orders', 'Stop-loss', 'Take-profit', 'Trailing stops', 'Iceberg orders']
              },
              {
                title: 'Portfolio Analytics',
                description: 'Comprehensive portfolio tracking and performance analytics with detailed reporting.',
                tools: ['Performance metrics', 'Risk analysis', 'Asset allocation', 'Tax reporting', 'P&L tracking']
              },
              {
                title: 'Market Scanner',
                description: 'Powerful scanning tools to identify trading opportunities across multiple markets.',
                tools: ['Price alerts', 'Volume spikes', 'Pattern recognition', 'Momentum indicators', 'Breakout detection']
              }
            ].map((tool, index) => (
              <div key={index} className="crypto-card">
                <h3 className="text-xl font-semibold mb-3">{tool.title}</h3>
                <p className="text-gray-600 mb-4">{tool.description}</p>
                <div className="flex flex-wrap gap-2">
                  {tool.tools.map((item, itemIndex) => (
                    <span key={itemIndex} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Features */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Security & Compliance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Lock,
                title: 'Data Encryption',
                description: 'End-to-end encryption for all data transmissions and storage'
              },
              {
                icon: Database,
                title: 'Cold Storage',
                description: '95% of assets held in secure offline cold storage'
              },
              {
                icon: Shield,
                title: 'Insurance',
                description: 'Comprehensive insurance coverage for digital assets'
              },
              {
                icon: Cpu,
                title: 'Compliance',
                description: 'Full regulatory compliance with KYC/AML requirements'
              }
            ].map((security, index) => (
              <div key={index} className="crypto-card text-center">
                <div className="p-3 bg-purple-100 rounded-lg inline-block mb-4">
                  <security.icon className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">{security.title}</h3>
                <p className="text-gray-600 text-sm">{security.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of traders using CryptoCoin for professional cryptocurrency trading
          </p>
          <div className="flex justify-center space-x-4">
            <a href="/get-started" className="crypto-button">
              Start Free Trial
            </a>
            <a href="/pricing" className="border border-purple-600 text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
              View Pricing
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
