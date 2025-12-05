import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - Taksila Coins',
  description: 'Taksila Coins Privacy Policy. Learn how we collect, use, and protect your personal information when buying and selling rare coins.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-purple-100 mb-8">
              Last updated: December 2, 2025
            </p>
          </div>
        </div>
      </div>

      {/* Privacy Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Introduction</h2>
              <p className="text-gray-600 mb-4">
                At Taksila Coins, we are committed to protecting your privacy. This Privacy Policy explains how we 
                collect, use, disclose, and safeguard your information when you visit our website and use our 
                numismatic services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
              <p className="text-gray-600 mb-4">We may collect several types of information from and about users of our Service:</p>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">Personal Information</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Name, email address, phone number, and mailing address</li>
                <li>Payment information (processed securely through third-party payment processors)</li>
                <li>Shipping and billing addresses</li>
                <li>Government-issued identification for verification purposes</li>
                <li>Communication preferences and interests</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">Numismatic Information</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Coin collection preferences and interests</li>
                <li>Purchase and bidding history</li>
                <li>Authentication and grading service requests</li>
                <li>Appraisal requests and results</li>
                <li>Consignment and selling activities</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">Technical Information</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>IP address and device information</li>
                <li>Browser type and operating system</li>
                <li>Pages visited and time spent on our website</li>
                <li>Referring website information</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
              <p className="text-gray-600 mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Process transactions and provide numismatic services</li>
                <li>Authenticate and grade coins submitted by users</li>
                <li>Manage auction participation and bidding processes</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Send transaction confirmations and shipping notifications</li>
                <li>Personalize your experience with relevant coin recommendations</li>
                <li>Improve our website and develop new features</li>
                <li>Comply with legal obligations and prevent fraud</li>
                <li>Send marketing communications (with your consent)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Information Sharing</h2>
              <p className="text-gray-600 mb-4">We may share your information with:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Third-party payment processors for transaction processing</li>
                <li>Shipping carriers for delivery of purchased coins</li>
                <li>Professional grading services (PCGS, NGC, etc.)</li>
                <li>Legal authorities when required by law</li>
                <li>Business partners with your explicit consent</li>
                <li>Service providers who assist in operating our business</li>
              </ul>
              <p className="text-gray-600 mt-4">
                We never sell your personal information to third parties for marketing purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Data Security</h2>
              <p className="text-gray-600 mb-4">
                We implement appropriate security measures to protect your information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>SSL encryption for all data transmissions</li>
                <li>Secure payment processing through PCI-compliant providers</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Restricted access to personal information</li>
                <li>Secure storage facilities for physical coin inventory</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Cookies and Tracking</h2>
              <p className="text-gray-600 mb-4">
                We use cookies and similar technologies to enhance your experience, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Essential cookies for website functionality</li>
                <li>Analytics cookies to understand user behavior</li>
                <li>Personalization cookies for customized content</li>
                <li>Advertising cookies for relevant marketing</li>
              </ul>
              <p className="text-gray-600 mt-4">
                You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
              <p className="text-gray-600 mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Access and review your personal information</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Request data portability</li>
                <li>Object to processing of your information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
              <p className="text-gray-600 mb-4">
                Our Service is not intended for children under 18 years of age. We do not knowingly collect 
                personal information from children under 18. If we become aware that we have collected personal 
                information from a child under 18, we will take steps to delete such information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">International Data Transfers</h2>
              <p className="text-gray-600 mb-4">
                Your information may be transferred to and processed in countries other than Pakistan. We ensure 
                appropriate safeguards are in place to protect your information in accordance with applicable 
                data protection laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
              <p className="text-gray-600 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by 
                posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
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
          <a href="/cookies" className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <h3 className="font-semibold mb-2">Cookie Policy</h3>
            <p className="text-sm text-gray-600">Understand our cookie usage</p>
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
