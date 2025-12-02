import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy - CryptoCoin',
  description: 'CryptoCoin Cookie Policy. Learn how we use cookies and similar technologies on our cryptocurrency trading platform.',
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
            <p className="text-xl text-purple-100 mb-8">
              Last updated: November 1, 2024
            </p>
          </div>
        </div>
      </div>

      {/* Cookie Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="crypto-card">
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">What Are Cookies?</h2>
              <p className="text-gray-600 mb-4">
                Cookies are small text files that are stored on your device (computer, tablet, or mobile) when 
                you visit a website. They allow the website to remember your actions and preferences over time.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">How We Use Cookies</h2>
              <p className="text-gray-600 mb-4">
                CryptoCoin uses cookies and similar technologies to enhance your experience, analyze traffic, 
                and provide personalized services. Here's how we use different types of cookies:
              </p>
            </section>

            {/* Cookie Categories */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Types of Cookies We Use</h2>
              
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2">Essential Cookies</h3>
                  <p className="text-gray-600 mb-2">
                    These cookies are necessary for the website to function and cannot be switched off in our systems.
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm text-gray-600">
                    <li>Maintain user sessions</li>
                    <li>Manage security tokens</li>
                    <li>Enable trading functionality</li>
                    <li>Remember your preferences</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2">Performance Cookies</h3>
                  <p className="text-gray-600 mb-2">
                    These cookies help us understand how visitors interact with our website by collecting and reporting information.
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm text-gray-600">
                    <li>Track website performance</li>
                    <li>Monitor traffic patterns</li>
                    <li>Identify technical issues</li>
                    <li>Optimize user experience</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2">Functional Cookies</h3>
                  <p className="text-gray-600 mb-2">
                    These cookies enable enhanced functionality and personalization, such as videos and live chats.
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm text-gray-600">
                    <li>Remember your login details</li>
                    <li>Save trading preferences</li>
                    <li>Customize dashboard layout</li>
                    <li>Enable social media features</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2">Targeting Cookies</h3>
                  <p className="text-gray-600 mb-2">
                    These cookies are used to deliver advertisements that are relevant to you and your interests.
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm text-gray-600">
                    <li>Personalize marketing content</li>
                    <li>Track ad campaign effectiveness</li>
                    <li>Limit ad frequency</li>
                    <li>Measure conversion rates</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Third-Party Cookies</h2>
              <p className="text-gray-600 mb-4">
                We use various third-party services that may set cookies on your device:
              </p>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Analytics Services</h3>
                  <p className="text-sm text-gray-600 mb-2">Google Analytics, Mixpanel</p>
                  <p className="text-sm text-gray-600">Used to analyze website traffic and user behavior</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Payment Processors</h3>
                  <p className="text-sm text-gray-600 mb-2">Stripe, PayPal</p>
                  <p className="text-sm text-gray-600">Required for processing payments and transactions</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Marketing Platforms</h3>
                  <p className="text-sm text-gray-600 mb-2">Facebook Pixel, Google Ads</p>
                  <p className="text-sm text-gray-600">Used for advertising and remarketing purposes</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Social Media</h3>
                  <p className="text-sm text-gray-600 mb-2">Twitter, LinkedIn</p>
                  <p className="text-sm text-gray-600">Enable social media integration and sharing</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Managing Your Cookie Preferences</h2>
              <p className="text-gray-600 mb-4">
                You have several options to manage cookies:
              </p>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Cookie Consent Banner</h3>
                  <p className="text-sm text-gray-600">
                    When you first visit our website, you'll see a cookie consent banner where you can 
                    accept or reject non-essential cookies.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Browser Settings</h3>
                  <p className="text-sm text-gray-600">
                    You can configure your browser to refuse cookies or to alert you when cookies are being sent. 
                    However, this may affect your ability to use certain features of our Service.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Cookie Preferences Center</h3>
                  <p className="text-sm text-gray-600">
                    You can access our Cookie Preferences Center at any time to update your cookie settings.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Cookie Duration</h2>
              <p className="text-gray-600 mb-4">
                Cookies have different lifespans depending on their purpose:
              </p>
              
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li><strong>Session Cookies:</strong> Deleted when you close your browser</li>
                <li><strong>Persistent Cookies:</strong> Remain on your device for a set period or until you delete them</li>
                <li><strong>Authentication Cookies:</strong> Typically last 30 days for security purposes</li>
                <li><strong>Analytics Cookies:</strong> Usually expire after 2 years</li>
                <li><strong>Marketing Cookies:</strong> Vary by provider, typically 90 days to 2 years</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
              <p className="text-gray-600 mb-4">
                Depending on your location, you may have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Accept or reject non-essential cookies</li>
                <li>Withdraw consent at any time</li>
                <li>View what cookies are stored on your device</li>
                <li>Delete cookies from your browser</li>
                <li>Opt out of targeted advertising</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Updates to This Policy</h2>
              <p className="text-gray-600 mb-4">
                We may update this Cookie Policy from time to time to reflect changes in our practices or 
                applicable law. We will notify you of any changes by posting the updated policy on this page.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about this Cookie Policy, please contact us at:
              </p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-700">
                  Email: privacy@cryptocoin.com<br />
                  Address: 123 Crypto Street, San Francisco, CA 94105<br />
                  Phone: +1 (555) 123-4567
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* Cookie Management */}
        <div className="mt-8 crypto-card">
          <h3 className="text-xl font-semibold mb-4">Manage Your Preferences</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="border border-purple-600 text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
              Review Cookie Settings
            </button>
            <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Clear All Cookies
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="/privacy" className="crypto-card text-center hover:shadow-lg transition-shadow">
            <h3 className="font-semibold mb-2">Privacy Policy</h3>
            <p className="text-sm text-gray-600">Learn about data protection</p>
          </a>
          <a href="/terms" className="crypto-card text-center hover:shadow-lg transition-shadow">
            <h3 className="font-semibold mb-2">Terms of Service</h3>
            <p className="text-sm text-gray-600">Read our terms and conditions</p>
          </a>
          <a href="/disclaimer" className="crypto-card text-center hover:shadow-lg transition-shadow">
            <h3 className="font-semibold mb-2">Disclaimer</h3>
            <p className="text-sm text-gray-600">Important legal information</p>
          </a>
        </div>
      </div>
    </div>
  )
}
