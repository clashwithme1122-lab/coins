import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disclaimer - CryptoCoin',
  description: 'CryptoCoin Disclaimer. Important information about risks associated with cryptocurrency trading and our platform.',
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
              Last updated: November 1, 2024
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="crypto-card">
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Important Notice</h2>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-red-800 font-semibold">
                  PLEASE READ THIS DISCLAIMER CAREFULLY BEFORE USING CRYPTOCOIN SERVICES.
                </p>
              </div>
              <p className="text-gray-600 mb-4">
                This disclaimer contains important information about risks associated with cryptocurrency 
                trading and the limitations of our services. By using CryptoCoin, you acknowledge that you 
                have read, understood, and agree to this disclaimer.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Investment Risk Warning</h2>
              <p className="text-gray-600 mb-4">
                Cryptocurrency trading involves substantial risk and is not suitable for all investors. 
                You should carefully consider your investment objectives, level of experience, and risk appetite.
              </p>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-yellow-800 mb-2">Key Risks Include:</h3>
                <ul className="list-disc pl-6 space-y-1 text-yellow-800">
                  <li>Market volatility and price fluctuations</li>
                  <li>Regulatory and legal uncertainties</li>
                  <li>Cybersecurity threats and hacking risks</li>
                  <li>Exchange failures or insolvency</li>
                  <li>Operational and technical failures</li>
                  <li>Liquidity risks and market manipulation</li>
                </ul>
              </div>
              
              <p className="text-gray-600 mb-4">
                <strong>You could lose your entire investment.</strong> Never invest more than you can afford to lose.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">No Financial Advice</h2>
              <p className="text-gray-600 mb-4">
                CryptoCoin does not provide financial, investment, tax, legal, or other professional advice. 
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
              
              <p className="text-gray-600 mb-4">
                Market data may be delayed, inaccurate, or unavailable due to technical issues, market conditions, 
                or other factors beyond our control.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Service Availability</h2>
              <p className="text-gray-600 mb-4">
                Our services are provided "as is" and "as available" without warranties of any kind. 
                We do not guarantee:
              </p>
              
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Uninterrupted or error-free operation</li>
                <li>Continuous availability of trading services</li>
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
                <li>Cryptocurrency transactions are irreversible</li>
                <li>Lost or stolen funds cannot be recovered</li>
                <li>You are responsible for securing your account and private keys</li>
                <li>We are not liable for losses due to security breaches</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Regulatory Compliance</h2>
              <p className="text-gray-600 mb-4">
                Cryptocurrency regulations vary by jurisdiction and are constantly evolving. You are responsible 
                for ensuring compliance with applicable laws and regulations in your location.
              </p>
              
              <p className="text-gray-600 mb-4">
                Some services may not be available in certain jurisdictions due to regulatory restrictions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
              <p className="text-gray-600 mb-4">
                To the fullest extent permitted by law, CryptoCoin and its affiliates, officers, directors, 
                employees, and agents shall not be liable for any indirect, incidental, special, consequential, 
                or punitive damages, including without limitation:
              </p>
              
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Trading losses or investment losses</li>
                <li>Damages from service interruptions or failures</li>
                <li>Damages from inaccurate or incomplete data</li>
                <li>Damages from security breaches or hacking incidents</li>
                <li>Damages from regulatory actions or legal proceedings</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Indemnification</h2>
              <p className="text-gray-600 mb-4">
                You agree to indemnify, defend, and hold harmless CryptoCoin and its affiliates from any claims, 
                damages, losses, liabilities, costs, and expenses arising from your use of our services or 
                violation of these terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">User Responsibility</h2>
              <p className="text-gray-600 mb-4">
                You are solely responsible for:
              </p>
              
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Conducting your own research and due diligence</li>
                <li>Making independent investment decisions</li>
                <li>Understanding the risks of cryptocurrency trading</li>
                <li>Complying with applicable laws and regulations</li>
                <li>Securing your account and private information</li>
                <li>Monitoring your account activity and transactions</li>
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
                  Email: legal@cryptocoin.com<br />
                  Address: 123 Crypto Street, San Francisco, CA 94105<br />
                  Phone: +1 (555) 123-4567
                </p>
              </div>
            </section>

            {/* Final Warning */}
            <section className="mb-8">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 font-semibold text-center">
                  TRADING CRYPTOCURRENCIES CARRIES SIGNIFICANT RISK AND MAY RESULT IN THE LOSS OF YOUR ENTIRE INVESTMENT. 
                  TRADE AT YOUR OWN RISK.
                </p>
              </div>
            </section>
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
          <a href="/cookies" className="crypto-card text-center hover:shadow-lg transition-shadow">
            <h3 className="font-semibold mb-2">Cookie Policy</h3>
            <p className="text-sm text-gray-600">Learn about cookie usage</p>
          </a>
        </div>
      </div>
    </div>
  )
}
