import { Metadata } from 'next'
import { CheckCircle, XCircle, AlertCircle, Clock, Zap, Database, Shield, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'System Status - CryptoCoin',
  description: 'Real-time status of CryptoCoin services. Monitor platform performance, uptime, and ongoing maintenance.',
}

export default function StatusPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">System Status</h1>
            <p className="text-xl text-purple-100 mb-8">
              Real-time status of CryptoCoin services and platform performance
            </p>
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <span className="text-2xl font-semibold">All Systems Operational</span>
            </div>
            <p className="text-purple-200 mt-2">Last updated: 2 minutes ago</p>
          </div>
        </div>
      </div>

      {/* Status Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="crypto-card mb-8">
          <h2 className="text-2xl font-bold mb-6">Service Status</h2>
          <div className="space-y-4">
            {[
              {
                name: 'Trading Platform',
                status: 'operational',
                description: 'Core trading functionality and order processing',
                uptime: '99.9%'
              },
              {
                name: 'API Services',
                status: 'operational',
                description: 'REST and WebSocket APIs for data and trading',
                uptime: '99.8%'
              },
              {
                name: 'Mobile App',
                status: 'operational',
                description: 'iOS and Android mobile applications',
                uptime: '99.7%'
              },
              {
                name: 'Database',
                status: 'operational',
                description: 'User data and transaction storage',
                uptime: '99.9%'
              },
              {
                name: 'Payment Processing',
                status: 'operational',
                description: 'Deposits, withdrawals, and payment methods',
                uptime: '99.5%'
              },
              {
                name: 'Market Data Feed',
                status: 'operational',
                description: 'Real-time price feeds and market data',
                uptime: '99.8%'
              }
            ].map((service, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${
                    service.status === 'operational' ? 'bg-green-100' : 
                    service.status === 'degraded' ? 'bg-yellow-100' : 'bg-red-100'
                  }`}>
                    {service.status === 'operational' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : service.status === 'degraded' ? (
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">{service.name}</h3>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    service.status === 'operational' ? 'bg-green-100 text-green-700' : 
                    service.status === 'degraded' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {service.status === 'operational' ? 'Operational' : 
                     service.status === 'degraded' ? 'Degraded Performance' : 'Outage'}
                  </span>
                  <div className="text-sm text-gray-500 mt-1">Uptime: {service.uptime}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              icon: Zap,
              title: 'Response Time',
              value: '125ms',
              status: 'good',
              description: 'Average API response time'
            },
            {
              icon: Database,
              title: 'Database Latency',
              value: '45ms',
              status: 'good',
              description: 'Average query response time'
            },
            {
              icon: Users,
              title: 'Active Users',
              value: '12,847',
              status: 'normal',
              description: 'Currently online users'
            },
            {
              icon: Shield,
              title: 'Security Score',
              value: 'A+',
              status: 'good',
              description: 'Overall security rating'
            }
          ].map((metric, index) => (
            <div key={index} className="crypto-card text-center">
              <div className={`p-3 rounded-lg inline-block mb-4 ${
                metric.status === 'good' ? 'bg-green-100' : 
                metric.status === 'warning' ? 'bg-yellow-100' : 'bg-red-100'
              }`}>
                <metric.icon className={`w-8 h-8 ${
                  metric.status === 'good' ? 'text-green-600' : 
                  metric.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
                }`} />
              </div>
              <div className="text-2xl font-bold mb-1">{metric.value}</div>
              <div className="font-semibold mb-1">{metric.title}</div>
              <div className="text-sm text-gray-600">{metric.description}</div>
            </div>
          ))}
        </div>

        {/* Recent Incidents */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8">Recent Incidents</h2>
          <div className="space-y-6">
            {[
              {
                date: '2024-11-20',
                time: '14:30 UTC',
                title: 'Scheduled Database Maintenance',
                status: 'resolved',
                duration: '15 minutes',
                description: 'Planned maintenance to upgrade database servers for improved performance.',
                impact: 'Minor - Some users experienced brief delays in order processing.'
              },
              {
                date: '2024-11-15',
                time: '09:45 UTC',
                title: 'API Rate Limiting Issue',
                status: 'resolved',
                duration: '2 hours',
                description: 'Some API users experienced rate limiting errors due to configuration issue.',
                impact: 'Moderate - API requests were temporarily limited for some users.'
              },
              {
                date: '2024-11-08',
                time: '16:20 UTC',
                title: 'Mobile App Login Issues',
                status: 'resolved',
                duration: '45 minutes',
                description: 'Authentication service degradation affecting mobile app logins.',
                impact: 'Minor - Some mobile users were unable to log in temporarily.'
              }
            ].map((incident, index) => (
              <div key={index} className="crypto-card">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        incident.status === 'resolved' ? 'bg-green-100 text-green-700' : 
                        incident.status === 'investigating' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {incident.status === 'resolved' ? 'Resolved' : 
                         incident.status === 'investigating' ? 'Investigating' : 'Ongoing'}
                      </span>
                      <span className="text-sm text-gray-500">{incident.date} at {incident.time}</span>
                      <span className="text-sm text-gray-500">Duration: {incident.duration}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{incident.title}</h3>
                    <p className="text-gray-600 mb-2">{incident.description}</p>
                    <p className="text-sm text-gray-500">Impact: {incident.impact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Uptime History */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8">Uptime History</h2>
          <div className="crypto-card">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { period: 'Last 24 hours', uptime: '100%', incidents: 0 },
                { period: 'Last 7 days', uptime: '99.9%', incidents: 1 },
                { period: 'Last 30 days', uptime: '99.8%', incidents: 3 },
                { period: 'Last 90 days', uptime: '99.7%', incidents: 7 },
                { period: 'Last 6 months', uptime: '99.6%', incidents: 15 },
                { period: 'Last 12 months', uptime: '99.5%', incidents: 28 }
              ].map((period, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="text-lg font-semibold mb-2">{period.period}</div>
                  <div className="text-2xl font-bold gradient-text mb-1">{period.uptime}</div>
                  <div className="text-sm text-gray-600">
                    {period.incidents} incident{period.incidents !== 1 ? 's' : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Subscribe to Updates */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8">Subscribe to Status Updates</h2>
          <div className="crypto-card">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Get Notified</h3>
                <p className="text-gray-600 mb-6">
                  Subscribe to receive notifications about service status, scheduled maintenance, 
                  and incidents via email, SMS, or webhook.
                </p>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notification Methods
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        <span>Email notifications</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>SMS notifications</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>Webhook notifications</span>
                      </label>
                    </div>
                  </div>
                  <button className="crypto-button">Subscribe</button>
                </form>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">What You'll Receive</h3>
                <div className="space-y-3">
                  {[
                    'Real-time incident notifications',
                    'Scheduled maintenance alerts',
                    'Service status updates',
                    'Monthly uptime reports',
                    'Performance metrics summaries'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="text-center p-8 bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl text-white">
          <h2 className="text-3xl font-bold mb-4">Experiencing Issues?</h2>
          <p className="text-purple-100 mb-6">
            If you're experiencing problems not reflected on this status page, contact our support team
          </p>
          <div className="flex justify-center space-x-4">
            <a href="/contact" className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Contact Support
            </a>
            <a href="/help" className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
              Visit Help Center
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
