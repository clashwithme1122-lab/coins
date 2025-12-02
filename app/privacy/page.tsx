import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - CryptoCoin',
  description: 'CryptoCoin Privacy Policy. Learn how we collect, use, and protect your personal information on our cryptocurrency platform.',
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
              Last updated: November 1, 2024
            </p>
          </div>
        </div>
      </div>

      {/* Privacy Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="crypto-card">
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Introduction</h2>
              <p className="text-gray-600 mb-4">
                CryptoCoin ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy 
                explains how we collect, use, disclose, and safeguard your information when you visit our website 
                and use our cryptocurrency trading platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
              
              <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
              <p className="text-gray-600 mb-4">
                When you create an account or use our services, we may collect:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Name, email address, and contact information</li>
                <li>Government-issued identification for verification</li>
                <li>Financial information for payment processing</li>
                <li>Trading preferences and account settings</li>
              </ul>
              
              <h3 className="text-lg font-semibold mb-4 mt-6">Usage Data</h3>
              <p className="text-gray-600 mb-4">
                We automatically collect certain information when you visit our Service, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>IP address and browser type</li>
                <li>Device information and operating system</li>
                <li>Pages visited and time spent</li>
                <li>Click patterns and navigation paths</li>
                <li>Trading activity and transaction history</li>
              </ul>
              
              <h3 className="text-lg font-semibold mb-4 mt-6">Cookies and Tracking Technologies</h3>
              <p className="text-gray-600 mb-4">
                We use cookies and similar tracking technologies to enhance your experience, analyze traffic, 
                and personalize content. Please refer to our Cookie Policy for more details.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
              <p className="text-gray-600 mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and manage your account</li>
                <li>Send you technical notices and support messages</li>
                <li>Communicate with you about products, services, and promotional offers</li>
                <li>Monitor and analyze trends and usage</li>
                <li>Detect, investigate, and prevent security issues and fraud</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Information Sharing</h2>
              <p className="text-gray-600 mb-4">
                We may share your information in the following circumstances:
              </p>
              
              <h3 className="text-lg font-semibold mb-4">Service Providers</h3>
              <p className="text-gray-600 mb-4">
                We may share information with third-party service providers who perform services on our behalf, 
                such as payment processing, data analysis, and customer support.
              </p>
              
              <h3 className="text-lg font-semibold mb-4 mt-6">Legal Requirements</h3>
              <p className="text-gray-600 mb-4">
                We may disclose your information if required by law or in good faith belief that such action is 
                necessary to comply with legal obligations or protect our rights.
              </p>
              
              <h3 className="text-lg font-semibold mb-4 mt-6">Business Transfers</h3>
              <p className="text-gray-600 mb-4">
                In the event of a merger, acquisition, or sale of assets, your information may be transferred 
                to the acquiring company.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Data Security</h2>
              <p className="text-gray-600 mb-4">
                We implement appropriate technical and organizational measures to protect your information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Secure storage of sensitive information</li>
                <li>Regular security assessments and audits</li>
                <li>Access controls and authentication systems</li>
                <li>Employee training on privacy and security</li>
              </ul>
              <p className="text-gray-600 mb-4">
                However, no method of transmission over the internet is 100% secure, and we cannot guarantee 
                absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Data Retention</h2>
              <p className="text-gray-600 mb-4">
                We retain your information for as long as necessary to provide our services, comply with legal 
                obligations, resolve disputes, and enforce our agreements. The specific retention periods vary 
                depending on the type of information and legal requirements.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
              <p className="text-gray-600 mb-4">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Access to your personal information</li>
                <li>Correction of inaccurate information</li>
                <li>Deletion of your personal information</li>
                <li>Restriction of processing</li>
                <li>Data portability</li>
                <li>Objection to processing</li>
              </ul>
              <p className="text-gray-600 mb-4">
                To exercise these rights, please contact us at privacy@cryptocoin.com.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">International Data Transfers</h2>
              <p className="text-gray-600 mb-4">
                Your information may be transferred to and processed in countries other than your own. We ensure 
                appropriate safeguards are in place for international data transfers in accordance with applicable 
                data protection laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
              <p className="text-gray-600 mb-4">
                Our Service is not intended for individuals under the age of 18. We do not knowingly collect 
                personal information from children under 18. If we become aware of such collection, we will take 
                steps to delete the information immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-600 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by 
                posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
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

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="/terms" className="crypto-card text-center hover:shadow-lg transition-shadow">
            <h3 className="font-semibold mb-2">Terms of Service</h3>
            <p className="text-sm text-gray-600">Read our terms and conditions</p>
          </a>
          <a href="/cookies" className="crypto-card text-center hover:shadow-lg transition-shadow">
            <h3 className="font-semibold mb-2">Cookie Policy</h3>
            <p className="text-sm text-gray-600">Learn about cookie usage</p>
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
