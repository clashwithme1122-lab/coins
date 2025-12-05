import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - Taksila Coins',
  description: 'Taksila Coins Terms of Service. Read our terms and conditions for buying and selling rare coins and collectibles.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl text-purple-100 mb-8">
              Last updated: December 2, 2025
            </p>
          </div>
        </div>
      </div>

      {/* Terms Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 mb-4">
                By accessing and using Taksila Coins ("the Service"), you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
              <p className="text-gray-600 mb-4">
                Taksila Coins is a premier numismatic marketplace that provides collectors and investors with access to 
                rare coins, ancient artifacts, and precious metals. Our services include coin authentication, grading, 
                auction participation, and secure transactions. The service is provided "as is" and may include 
                advertisements from trusted numismatic partners.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. User Registration</h2>
              <p className="text-gray-600 mb-4">
                To use certain features of the Service, you must register for an account. You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain and update your account information</li>
                <li>Maintain the security of your password and account</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use</li>
                <li>Be at least 18 years old or have legal guardian consent</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. User Conduct</h2>
              <p className="text-gray-600 mb-4">
                You agree not to use the Service to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>List counterfeit, altered, or stolen coins</li>
                <li>Misrepresent the authenticity, grade, or provenance of coins</li>
                <li>Engage in fraudulent or illegal numismatic activities</li>
                <li>Manipulate auction prices or engage in shill bidding</li>
                <li>Upload viruses, malware, or other malicious code</li>
                <li>Spam, harass, or abuse other collectors or dealers</li>
                <li>Use automated bots or scrapers without permission</li>
                <li>Violate any applicable laws regarding cultural heritage artifacts</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Coin Trading and Investment Risks</h2>
              <p className="text-gray-600 mb-4">
                Numismatic collecting and investing involves substantial risk of loss and is not suitable for all investors. 
                You acknowledge and agree that:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Coin markets can be volatile and unpredictable</li>
                <li>You are solely responsible for your purchasing decisions</li>
                <li>Taksila Coins is not responsible for any investment losses</li>
                <li>Past performance does not guarantee future results</li>
                <li>You should only invest what you can afford to lose</li>
                <li>Market conditions can change rapidly affecting coin values</li>
                <li>Authentication and grading are subjective and may vary</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Fees and Payments</h2>
              <p className="text-gray-600 mb-4">
                Certain features of the Service may require payment of fees, including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Auction seller premiums (typically 10-15% of final price)</li>
                <li>Buyer premiums (typically 5-10% of final price)</li>
                <li>Authentication and grading services</li>
                <li>Shipping and insurance costs</li>
                <li>Listing fees for premium placements</li>
              </ul>
              <p className="text-gray-600 mt-4">
                All fees are non-refundable unless otherwise specified. We reserve the right to modify our fee structure 
                at any time with advance notice.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Authentication and Grading</h2>
              <p className="text-gray-600 mb-4">
                While we strive to provide accurate authentication and grading services, you acknowledge that:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Authentication opinions are based on current knowledge and technology</li>
                <li>Grading is subjective and may vary between grading services</li>
                <li>We are not liable for differences in opinion on authenticity or grade</li>
                <li>Third-party grading services have their own terms and conditions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. Privacy</h2>
              <p className="text-gray-600 mb-4">
                Your use of the Service is also governed by our Privacy Policy, which outlines how we collect, 
                use, and protect your personal information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">9. Intellectual Property</h2>
              <p className="text-gray-600 mb-4">
                The Service and its original content, features, and functionality are owned by Taksila Coins and are 
                protected by international copyright, trademark, patent, trade secret, and other intellectual 
                property laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">10. Termination</h2>
              <p className="text-gray-600 mb-4">
                We may terminate or suspend your account and bar access to the Service immediately, without prior 
                notice or liability, under our sole discretion, for any reason whatsoever and without limitation, 
                including breach of these terms or fraudulent activity.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">11. Disclaimer of Warranties</h2>
              <p className="text-gray-600 mb-4">
                The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no representations or 
                warranties of any kind, express or implied, as to the operation of the Service or the information, 
                content, materials, or products included on this Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">12. Limitation of Liability</h2>
              <p className="text-gray-600 mb-4">
                In no event shall Taksila Coins, our directors, employees, partners, agents, suppliers, or affiliates 
                be liable for any indirect, incidental, special, consequential, or punitive damages, including 
                without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">13. Indemnification</h2>
              <p className="text-gray-600 mb-4">
                You agree to defend, indemnify, and hold harmless Taksila Coins and our licensee and licensors, and 
                their employees, contractors, agents, officers and directors, from and against any and all claims, 
                damages, obligations, losses, liabilities, costs or debt, and expenses.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">14. Governing Law</h2>
              <p className="text-gray-600 mb-4">
                These Terms shall be interpreted and governed by the laws of Pakistan, without regard to its 
                conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">15. Changes to Terms</h2>
              <p className="text-gray-600 mb-4">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                If a revision is material, we will try to provide at least 30 days notice prior to any new terms 
                taking effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">16. Contact Information</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about these Terms, please contact us at:
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
          <a href="/privacy" className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <h3 className="font-semibold mb-2">Privacy Policy</h3>
            <p className="text-sm text-gray-600">Learn how we protect your data</p>
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
