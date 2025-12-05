import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy - Taksila Coins',
  description: 'Taksila Coins Cookie Policy. Learn how we use cookies and similar technologies on our coin collecting website.',
}

export default function CookiePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
            <p className="text-xl text-purple-100 mb-8">
              Last updated: December 2, 2025
            </p>
          </div>
        </div>
      </div>

      {/* Cookie Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Introduction</h2>
              <p className="text-gray-600 mb-4">
                At Taksila Coins, we use cookies and similar technologies to enhance your experience on our 
                numismatic platform. This Cookie Policy explains what cookies are, how we use them, and your 
                choices regarding their use.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">What Are Cookies?</h2>
              <p className="text-gray-600 mb-4">
                Cookies are small text files that are stored on your device (computer, smartphone, tablet) when 
                you visit our website. They help us enhance your experience by remembering your preferences and 
                providing personalized content.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">How We Use Cookies</h2>
              <p className="text-gray-600 mb-4">At Taksila Coins, we use cookies for various purposes:</p>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">Essential Cookies</h3>
              <p className="text-gray-600 mb-4">These cookies are necessary for the website to function properly:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Maintaining your shopping cart and wishlist</li>
                <li>Keeping you logged into your account</li>
                <li>Processing secure transactions and payments</li>
                <li>Managing auction bids and watchlists</li>
                <li>Ensuring website security and preventing fraud</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">Performance Cookies</h3>
              <p className="text-gray-600 mb-4">These cookies help us understand how our website is performing:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Tracking website traffic and visitor behavior</li>
                <li>Measuring page load times and performance</li>
                <li>Identifying popular coin categories and listings</li>
                <li>Detecting and fixing technical issues</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">Functional Cookies</h3>
              <p className="text-gray-600 mb-4">These cookies enhance your experience by remembering your preferences:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Remembering your currency preference (USD/PKR)</li>
                <li>Saving your search filters and browsing history</li>
                <li>Displaying personalized coin recommendations</li>
                <li>Remembering your language and display settings</li>
                <li>Customizing your dashboard and portfolio view</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">Marketing Cookies</h3>
              <p className="text-gray-600 mb-4">These cookies help us provide relevant marketing content:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Showing personalized coin recommendations</li>
                <li>Displaying relevant advertisements</li>
                <li>Tracking marketing campaign effectiveness</li>
                <li>Retargeting visitors who showed interest in specific coins</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Third-Party Cookies</h2>
              <p className="text-gray-600 mb-4">We use third-party services that may place cookies on your device:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li><strong>Payment Processors:</strong> Secure payment processing (Stripe, PayPal)</li>
                <li><strong>Analytics Services:</strong> Website performance tracking (Google Analytics)</li>
                <li><strong>Advertising Networks:</strong> Relevant ad display (Google Ads)</li>
                <li><strong>Social Media:</strong> Social sharing and authentication</li>
                <li><strong>Customer Support:</strong> Live chat and support services</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Cookie Duration</h2>
              <p className="text-gray-600 mb-4">Cookies have different lifespans:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li><strong>Session Cookies:</strong> Deleted when you close your browser</li>
                <li><strong>Persistent Cookies:</strong> Remain on your device for a set period</li>
                <li><strong>Authentication Cookies:</strong> Typically last 30 days</li>
                <li><strong>Preference Cookies:</strong> Usually last 6-12 months</li>
                <li><strong>Analytics Cookies:</strong> Typically last 2 years</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Managing Your Cookie Preferences</h2>
              <p className="text-gray-600 mb-4">You can control cookies in several ways:</p>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">Browser Settings</h3>
              <p className="text-gray-600 mb-4">Most browsers allow you to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Block all cookies</li>
                <li>Accept only first-party cookies</li>
                <li>Delete existing cookies</li>
                <li>Set notifications when cookies are placed</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">Our Cookie Consent Tool</h3>
              <p className="text-gray-600 mb-4">
                When you first visit our website, you'll see a cookie consent banner where you can:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Accept all cookies</li>
                <li>Reject non-essential cookies</li>
                <li>Customize your cookie preferences</li>
                <li>Change preferences at any time</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Impact of Disabling Cookies</h2>
              <p className="text-gray-600 mb-4">If you choose to disable cookies:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Some website features may not work properly</li>
                <li>Your shopping cart and preferences may not be saved</li>
                <li>You may need to log in more frequently</li>
                <li>Personalized recommendations may be limited</li>
                <li>Some third-party services may not function</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Cookie Policy Updates</h2>
              <p className="text-gray-600 mb-4">
                We may update this Cookie Policy from time to time to reflect changes in our practices or 
                applicable law. We will notify you of any changes by updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about our use of cookies, please contact us at:
              </p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-700">
                  Email: mtalhakh24@gmail.com<br />
                  Address: Pakistan<br />
                  Phone: +92 321 5060069
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <a href="/terms" className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <h3 className="font-semibold mb-2">Terms of Service</h3>
            <p className="text-sm text-gray-600">Read our terms and conditions</p>
          </a>
          <a href="/privacy" className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <h3 className="font-semibold mb-2">Privacy Policy</h3>
            <p className="text-sm text-gray-600">Learn how we protect your data</p>
          </a>
          <a href="/disclaimer" className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <h3 className="font-semibold mb-2">Disclaimer</h3>
            <p className="text-sm text-gray-600">Important legal information</p>
          </a>
          <a href="/shipping" className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <h3 className="font-semibold mb-2">Shipping Policy</h3>
            <p className="text-sm text-gray-600">Shipping and delivery information</p>
          </a>
        </div>
      </div>
    </div>
  )
}
