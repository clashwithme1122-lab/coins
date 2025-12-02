import { Metadata } from 'next'
import { Code, Zap, Database, Globe, Shield, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'API Documentation - CryptoCoin',
  description: 'Complete API documentation for CryptoCoin. REST and WebSocket APIs for cryptocurrency data and trading.',
}

export default function APIPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">API Documentation</h1>
            <p className="text-xl text-purple-100 mb-8">
              Powerful REST and WebSocket APIs for cryptocurrency data and trading
            </p>
            <div className="flex justify-center space-x-4">
              <a href="#rest-api" className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                REST API
              </a>
              <a href="#websocket-api" className="border border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
                WebSocket API
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* API Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            {
              icon: Zap,
              title: 'Lightning Fast',
              description: 'Sub-second response times with optimized infrastructure'
            },
            {
              icon: Database,
              title: 'Comprehensive Data',
              description: 'Access to 500+ cryptocurrencies with full market data'
            },
            {
              icon: Shield,
              title: 'Secure & Reliable',
              description: 'Enterprise-grade security with 99.9% uptime guarantee'
            }
          ].map((feature, index) => (
            <div key={index} className="crypto-card text-center">
              <div className="p-3 bg-purple-100 rounded-lg inline-block mb-4">
                <feature.icon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* REST API Section */}
        <div id="rest-api" className="mb-12">
          <h2 className="text-3xl font-bold mb-8">REST API</h2>
          
          <div className="crypto-card mb-8">
            <h3 className="text-xl font-semibold mb-4">Base URL</h3>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono">
              https://api.cryptocoin.com/v1
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Authentication</h3>
              <div className="crypto-card">
                <p className="text-gray-600 mb-4">
                  All API requests require authentication using API keys in the header:
                </p>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
                  Authorization: Bearer YOUR_API_KEY
                </div>
                <p className="text-gray-600">
                  Get your API key from the dashboard under Settings → API Keys.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Rate Limits</h3>
              <div className="crypto-card">
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Free Plan</span>
                    <span className="font-medium">1,000 requests/hour</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Professional</span>
                    <span className="font-medium">100,000 requests/hour</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Enterprise</span>
                    <span className="font-medium">Unlimited</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* API Endpoints */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Key Endpoints</h3>
            <div className="space-y-4">
              {[
                {
                  method: 'GET',
                  endpoint: '/coins',
                  description: 'Get list of all supported cryptocurrencies',
                  example: 'curl -X GET "https://api.cryptocoin.com/v1/coins"'
                },
                {
                  method: 'GET',
                  endpoint: '/coins/{id}/price',
                  description: 'Get current price for a specific cryptocurrency',
                  example: 'curl -X GET "https://api.cryptocoin.com/v1/coins/bitcoin/price"'
                },
                {
                  method: 'GET',
                  endpoint: '/coins/{id}/history',
                  description: 'Get historical price data for a cryptocurrency',
                  example: 'curl -X GET "https://api.cryptocoin.com/v1/coins/bitcoin/history?period=1d"'
                },
                {
                  method: 'POST',
                  endpoint: '/orders',
                  description: 'Place a new trading order',
                  example: 'curl -X POST "https://api.cryptocoin.com/v1/orders" -d "{...}"'
                }
              ].map((endpoint, index) => (
                <div key={index} className="crypto-card">
                  <div className="flex items-center space-x-4 mb-2">
                    <span className={`px-3 py-1 rounded text-sm font-medium ${
                      endpoint.method === 'GET' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {endpoint.method}
                    </span>
                    <code className="font-mono text-purple-600">{endpoint.endpoint}</code>
                  </div>
                  <p className="text-gray-600 mb-2">{endpoint.description}</p>
                  <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm">
                    {endpoint.example}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* WebSocket API Section */}
        <div id="websocket-api" className="mb-12">
          <h2 className="text-3xl font-bold mb-8">WebSocket API</h2>
          
          <div className="crypto-card mb-8">
            <h3 className="text-xl font-semibold mb-4">Real-time Data Streaming</h3>
            <p className="text-gray-600 mb-4">
              Connect to our WebSocket API for real-time price updates, order book data, and trade executions.
            </p>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
              wss://ws.cryptocoin.com/v1/stream
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Connection Example</h3>
              <div className="crypto-card">
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                  <pre>{`const ws = new WebSocket('wss://ws.cryptocoin.com/v1/stream');

ws.onopen = () => {
  // Subscribe to Bitcoin price updates
  ws.send(JSON.stringify({
    action: 'subscribe',
    channel: 'price',
    symbol: 'BTC-USDT'
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Price update:', data);
};`}</pre>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Available Channels</h3>
              <div className="crypto-card">
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>price</span>
                    <span className="text-gray-600">Real-time price updates</span>
                  </li>
                  <li className="flex justify-between">
                    <span>orderbook</span>
                    <span className="text-gray-600">Live order book data</span>
                  </li>
                  <li className="flex justify-between">
                    <span>trades</span>
                    <span className="text-gray-600">Recent trade executions</span>
                  </li>
                  <li className="flex justify-between">
                    <span>ticker</span>
                    <span className="text-gray-600">24h ticker statistics</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Code Libraries */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8">Official Libraries</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'JavaScript/Node.js', language: 'javascript', package: '@cryptocoin/api' },
              { name: 'Python', language: 'python', package: 'cryptocoin-python' },
              { name: 'Go', language: 'go', package: 'github.com/cryptocoin/go-api' },
              { name: 'Ruby', language: 'ruby', package: 'cryptocoin-ruby' },
              { name: 'PHP', language: 'php', package: 'cryptocoin/php-api' },
              { name: 'C#', language: 'csharp', package: 'CryptoCoin.API' }
            ].map((lib, index) => (
              <div key={index} className="crypto-card">
                <div className="flex items-center space-x-3 mb-3">
                  <Code className="w-6 h-6 text-purple-600" />
                  <h3 className="font-semibold">{lib.name}</h3>
                </div>
                <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm">
                  npm install {lib.package}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support */}
        <div className="text-center p-8 bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl text-white">
          <h2 className="text-3xl font-bold mb-4">Need Help?</h2>
          <p className="text-purple-100 mb-6">
            Our developer support team is here to help you integrate with our APIs
          </p>
          <div className="flex justify-center space-x-4">
            <a href="/contact" className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Contact Support
            </a>
            <a href="#" className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
              View Documentation
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
