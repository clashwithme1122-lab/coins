import { Metadata } from 'next'
import { Puzzle, Zap, Shield, Globe, Code, Database } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Integrations - CryptoCoin',
  description: 'Connect CryptoCoin with your favorite tools and platforms. Seamless integrations for trading bots, portfolio trackers, and more.',
}

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Integrations</h1>
            <p className="text-xl text-purple-100 mb-8">
              Connect CryptoCoin with your favorite tools and platforms for seamless trading
            </p>
          </div>
        </div>
      </div>

      {/* Integration Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Code,
              title: 'Trading Bots',
              description: 'Connect with popular trading automation platforms',
              integrations: ['3Commas', 'CryptoHopper', 'Gunbot', 'Pionex']
            },
            {
              icon: Database,
              title: 'Portfolio Trackers',
              description: 'Sync your portfolio with leading tracking services',
              integrations: ['CoinTracker', 'CoinStats', 'Delta', 'Blockfolio']
            },
            {
              icon: Globe,
              title: 'Wallets',
              description: 'Secure wallet integrations for easy fund management',
              integrations: ['Ledger', 'Trezor', 'MetaMask', 'Trust Wallet']
            },
            {
              icon: Shield,
              title: 'Security Tools',
              description: 'Enhanced security with third-party authentication',
              integrations: ['Authy', 'Google Authenticator', 'YubiKey', 'LastPass']
            },
            {
              icon: Zap,
              title: 'Payment Methods',
              description: 'Multiple funding options for easy deposits and withdrawals',
              integrations: ['PayPal', 'Stripe', 'Bank Transfer', 'Credit Card']
            },
            {
              icon: Puzzle,
              title: 'Analytics Tools',
              description: 'Advanced analytics and reporting integrations',
              integrations: ['TradingView', 'CoinGecko', 'CoinMarketCap', 'Glassnode']
            }
          ].map((category, index) => (
            <div key={index} className="crypto-card">
              <div className="p-3 bg-purple-100 rounded-lg inline-block mb-4">
                <category.icon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <div className="space-y-2">
                {category.integrations.map((integration, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">{integration}</span>
                    <button className="text-purple-600 text-sm hover:underline">Connect</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Popular Integrations */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Popular Integrations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: 'TradingView',
                description: 'Advanced charting and technical analysis',
                category: 'Analytics',
                status: 'Available'
              },
              {
                name: 'MetaMask',
                description: 'Web3 wallet for DeFi integration',
                category: 'Wallet',
                status: 'Available'
              },
              {
                name: '3Commas',
                description: 'Automated trading bot platform',
                category: 'Trading Bots',
                status: 'Available'
              },
              {
                name: 'CoinTracker',
                description: 'Portfolio tracking and tax reporting',
                category: 'Portfolio',
                status: 'Available'
              },
              {
                name: 'Ledger',
                description: 'Hardware wallet security',
                category: 'Wallet',
                status: 'Available'
              },
              {
                name: 'Authy',
                description: 'Two-factor authentication',
                category: 'Security',
                status: 'Available'
              },
              {
                name: 'PayPal',
                description: 'Easy payment processing',
                category: 'Payments',
                status: 'Coming Soon'
              },
              {
                name: 'Stripe',
                description: 'Credit card processing',
                category: 'Payments',
                status: 'Coming Soon'
              }
            ].map((integration, index) => (
              <div key={index} className="crypto-card">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">{integration.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    integration.status === 'Available' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {integration.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{integration.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{integration.category}</span>
                  <button 
                    className={`text-sm font-medium ${
                      integration.status === 'Available' 
                        ? 'text-purple-600 hover:text-purple-700' 
                        : 'text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={integration.status !== 'Available'}
                  >
                    {integration.status === 'Available' ? 'Connect' : 'Notify Me'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* API Integration */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Build Your Own Integration</h2>
          <div className="crypto-card">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Developer API</h3>
                <p className="text-gray-600 mb-6">
                  Use our comprehensive API to build custom integrations and automate your trading workflow. 
                  Get access to real-time market data, trading functionality, and account management.
                </p>
                <div className="space-y-3 mb-6">
                  {[
                    'REST API for standard operations',
                    'WebSocket API for real-time data',
                    'Webhook support for event notifications',
                    'Comprehensive documentation',
                    'SDKs for popular programming languages',
                    'Sandbox environment for testing'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a href="/api" className="crypto-button">View API Docs</a>
                  <a href="#" className="border border-purple-600 text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                    Get API Key
                  </a>
                </div>
              </div>
              <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-sm">
                <pre>{`// Example: Get real-time Bitcoin price
const response = await fetch(
  'https://api.cryptocoin.com/v1/coins/bitcoin/price',
  {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
    }
  }
);
const data = await response.json();
console.log(\`BTC Price: $\${data.price}\`);`}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Integration Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Automated Trading',
                description: 'Connect with trading bots to execute strategies 24/7 without manual intervention'
              },
              {
                title: 'Enhanced Security',
                description: 'Add extra layers of security with multi-factor authentication and hardware wallet integration'
              },
              {
                title: 'Better Analytics',
                description: 'Combine data from multiple sources for comprehensive market analysis and insights'
              },
              {
                title: 'Portfolio Management',
                description: 'Track all your crypto assets in one place with automatic portfolio synchronization'
              },
              {
                title: 'Tax Reporting',
                description: 'Automatically generate tax reports and calculate gains/losses for easy filing'
              },
              {
                title: 'Mobile Access',
                description: 'Access your account and manage trades on the go with mobile wallet integrations'
              }
            ].map((benefit, index) => (
              <div key={index} className="crypto-card">
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center p-8 bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl text-white">
          <h2 className="text-3xl font-bold mb-4">Need a Custom Integration?</h2>
          <p className="text-purple-100 mb-6">
            Our team can help you build custom integrations tailored to your specific needs
          </p>
          <div className="flex justify-center space-x-4">
            <a href="/contact" className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Contact Sales
            </a>
            <a href="/api" className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
              View API Docs
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
