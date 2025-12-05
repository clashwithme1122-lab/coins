import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disclaimer - Taksila Coins',
  description: 'Taksila Coins Disclaimer. Important information about coin collecting risks, authentication limitations, and investment considerations.',
}

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Disclaimer</h1>
            <p className="text-xl text-purple-100 mb-8">
              Last updated: December 2, 2025
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Important Notice</h2>
              <p className="text-gray-600 mb-4">
                PLEASE READ THIS DISCLAIMER CAREFULLY BEFORE USING TAKSILA COINS SERVICES.
                This disclaimer contains important information about risks associated with coin collecting, 
                numismatic investments, and the limitations of our services. By using Taksila Coins, 
                you acknowledge that you have read, understood, and agree to this disclaimer.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Investment Risk Warning</h2>
              <p className="text-gray-600 mb-4">
                Coin collecting and numismatic investing involve substantial risk and are not suitable for all investors. 
                You should carefully consider your investment objectives, level of experience, and risk appetite.
              </p>
              <p className="text-gray-600 mb-4 font-semibold">Key Risks Include:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Market volatility and price fluctuations in rare coins</li>
                <li>Authentication and grading uncertainties</li>
                <li>Counterfeit and altered coin risks</li>
                <li>Market liquidity and resale challenges</li>
                <li>Storage and preservation risks</li>
                <li>Regulatory and legal uncertainties regarding cultural artifacts</li>
                <li>Economic conditions affecting collectible markets</li>
              </ul>
              <p className="text-gray-600 mt-4 font-semibold text-red-600">
                You could lose your entire investment. Never invest more than you can afford to lose.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">No Financial Advice</h2>
              <p className="text-gray-600 mb-4">
                Taksila Coins does not provide financial, investment, tax, legal, or other professional advice. 
                The information provided on our platform is for informational and educational purposes only.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>We are not registered investment advisors</li>
                <li>Content should not be considered investment recommendations</li>
                <li>Past performance does not guarantee future results</li>
                <li>You should consult with qualified professionals before making investment decisions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Authentication and Grading Limitations</h2>
              <p className="text-gray-600 mb-4">
                While we strive to provide accurate authentication and grading services, we make no guarantees about:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>The absolute accuracy of authentication determinations</li>
                <li>The consistency of grading across different experts</li>
                <li>The detection of all sophisticated counterfeits</li>
                <li>The future market acceptance of our grading opinions</li>
                <li>The investment potential based on our assessments</li>
              </ul>
              <p className="text-gray-600 mt-4">
                Authentication and grading are subjective processes that may vary between experts and grading services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Market Data Limitations</h2>
              <p className="text-gray-600 mb-4">
                While we strive to provide accurate and timely market data, we make no guarantees about:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>The accuracy, completeness, or reliability of market data</li>
                <li>Timeliness of price updates and market information</li>
                <li>Availability of trading services during market disruptions</li>
                <li>Continuity of real-time data feeds</li>
              </ul>
              <p className="text-gray-600 mt-4">
                Market data may be delayed, inaccurate, or unavailable due to technical issues, market conditions, 
                or other factors beyond our control.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Service Availability</h2>
              <p className="text-gray-600 mb-4">
                Our services are provided "as is" and "as available" without warranties of any kind. We do not guarantee:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Uninterrupted or error-free operation</li>
                <li>Continuous availability of auction services</li>
                <li>Execution of all orders or transactions</li>
                <li>Protection against service interruptions or failures</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Third-Party Content</h2>
              <p className="text-gray-600 mb-4">
                Our platform may contain links to third-party websites, content, or services. We are not responsible 
                for the accuracy, reliability, or legality of third-party content. Your use of third-party services 
                is at your own risk.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Security and Protection</h2>
              <p className="text-gray-600 mb-4">
                While we implement robust security measures, no system is completely secure. You acknowledge that:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Coin transactions may be irreversible in certain circumstances</li>
                <li>Lost or stolen items may not be recoverable</li>
                <li>You are responsible for securing your account and information</li>
                <li>We are not liable for losses due to security breaches beyond our control</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Regulatory Compliance</h2>
              <p className="text-gray-600 mb-4">
                Coin collecting regulations vary by jurisdiction and are constantly evolving. You are responsible 
                for ensuring compliance with applicable laws and regulations in your location, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Cultural heritage and export/import restrictions</li>
                <li>Tax obligations on coin transactions</li>
                <li>Licensing requirements for dealers</li>
                <li>Anti-money laundering regulations</li>
              </ul>
              <p className="text-gray-600 mt-4">
                Some services may not be available in certain jurisdictions due to regulatory restrictions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
              <p className="text-gray-600 mb-4">
                To the fullest extent permitted by law, Taksila Coins and its affiliates, officers, directors, 
                employees, and agents shall not be liable for any indirect, incidental, special, consequential, 
                or punitive damages, including without limitation:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Trading losses or investment losses</li>
                <li>Damages from service interruptions or failures</li>
                <li>Damages from inaccurate or incomplete data</li>
                <li>Damages from authentication or grading errors</li>
                <li>Damages from security breaches or theft incidents</li>
                <li>Damages from regulatory actions or legal proceedings</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Indemnification</h2>
              <p className="text-gray-600 mb-4">
                You agree to indemnify, defend, and hold harmless Taksila Coins and its affiliates from any 
                claims, damages, losses, liabilities, costs, and expenses arising from your use of our services 
                or violation of these terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">User Responsibility</h2>
              <p className="text-gray-600 mb-4">
                You are solely responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Conducting your own research and due diligence</li>
                <li>Making independent purchasing decisions</li>
                <li>Understanding the risks of coin collecting</li>
                <li>Complying with applicable laws and regulations</li>
                <li>Securing your account and personal information</li>
                <li>Monitoring your account activity and transactions</li>
                <li>Verifying the authenticity of items before purchase</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Changes and Updates</h2>
              <p className="text-gray-600 mb-4">
                We reserve the right to modify or update this disclaimer at any time without notice. 
                Continued use of our services constitutes acceptance of any changes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about this disclaimer, please contact us at:
              </p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-700">
                  Email: mtalhakh24@gmail.com<br />
                  Address: Pakistan<br />
                  Phone: +92 321 5060069
                </p>
              </div>
            </section>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mt-8">
              <p className="text-red-800 font-bold text-center">
                TRADING COLLECTIBLE COINS CARRIES SIGNIFICANT RISK AND MAY RESULT IN THE LOSS OF YOUR ENTIRE INVESTMENT. 
                COLLECT AND INVEST AT YOUR OWN RISK.
              </p>
            </div>
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
            <p className="text-sm text-gray-600">Learn about data protection</p>
          </a>
          <a href="/cookies" className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <h3 className="font-semibold mb-2">Cookie Policy</h3>
            <p className="text-sm text-gray-600">Learn about cookie usage</p>
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
