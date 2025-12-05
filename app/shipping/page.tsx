'use client'

import { Metadata } from 'next'
import { useGlobal } from '@/contexts/GlobalContext'

export default function ShippingPage() {
  const { formatPrice, currency } = useGlobal()

  const getShippingCost = (usdPrice: number) => {
    return formatPrice(usdPrice)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Shipping Policy</h1>
            <p className="text-xl text-purple-100 mb-8">
              Last updated: December 2, 2025
            </p>
          </div>
        </div>
      </div>

      {/* Shipping Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Shipping Overview</h2>
              <p className="text-gray-600 mb-4">
                At Taksila Coins, we understand the importance of secure and reliable shipping for your valuable 
                numismatic treasures. We offer specialized shipping services designed to protect rare coins, 
                ancient artifacts, and precious metals during transit.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Shipping Methods</h2>
              <p className="text-gray-600 mb-4">We offer several shipping options to meet your needs:</p>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">Standard Shipping (5-7 business days)</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Suitable for coins under {formatPrice(500)} in value</li>
                <li>Secure packaging with bubble wrap and protective materials</li>
                <li>Tracking included</li>
                <li>Basic insurance up to {formatPrice(100)}</li>
                <li>Cost: {getShippingCost(15.99)} domestic, {getShippingCost(29.99)} international</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">Premium Shipping (3-5 business days)</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Recommended for coins valued {formatPrice(500)} - {formatPrice(5000)}</li>
                <li>Professional numismatic packaging</li>
                <li>Signature required</li>
                <li>Enhanced insurance coverage</li>
                <li>Cost: {getShippingCost(29.99)} domestic, {getShippingCost(59.99)} international</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">Express Secure Shipping (1-2 business days)</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Required for coins over {formatPrice(5000)} in value</li>
                <li>Bank-grade security packaging</li>
                <li>Armed courier service available</li>
                <li>Full insurance coverage</li>
                <li>Cost: {getShippingCost(49.99)} domestic, {getShippingCost(99.99)} international</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">Local Pickup (Available in Pakistan)</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Free pickup from our Lahore location</li>
                <li>By appointment only</li>
                <li>Identity verification required</li>
                <li>Secure handover process</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Packaging Standards</h2>
              <p className="text-gray-600 mb-4">All coins are professionally packaged using:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Archival-safe coin holders and capsules</li>
                <li>Climate-controlled packaging materials</li>
                <li>Tamper-evident security seals</li>
                <li>Shock-absorbing protective layers</li>
                <li>Discrete outer packaging to prevent theft</li>
                <li>Water-resistant packaging for international shipments</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Insurance Coverage</h2>
              <p className="text-gray-600 mb-4">Insurance options based on coin value:</p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Coin Value</th>
                      <th className="text-left py-2">Standard Insurance</th>
                      <th className="text-left py-2">Additional Coverage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">Up to {formatPrice(500)}</td>
                      <td className="py-2">{formatPrice(100)} included</td>
                      <td className="py-2">{formatPrice(0.50)} per {formatPrice(100)} additional</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">{formatPrice(500)} - {formatPrice(2000)}</td>
                      <td className="py-2">{formatPrice(500)} included</td>
                      <td className="py-2">{formatPrice(1.00)} per {formatPrice(100)} additional</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">{formatPrice(2000)} - {formatPrice(10000)}</td>
                      <td className="py-2">{formatPrice(2000)} included</td>
                      <td className="py-2">{formatPrice(2.00)} per {formatPrice(100)} additional</td>
                    </tr>
                    <tr>
                      <td className="py-2">Over {formatPrice(10000)}</td>
                      <td className="py-2">Full coverage required</td>
                      <td className="py-2">Custom quote</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">International Shipping</h2>
              <p className="text-gray-600 mb-4">International orders require special consideration:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Customs declaration with accurate coin descriptions</li>
                <li>Compliance with import/export regulations</li>
                <li>Additional processing time (2-4 extra days)</li>
                <li>Customs duties and taxes are buyer's responsibility</li>
                <li>Some countries have restrictions on precious metals</li>
                <li>Express Secure Shipping required for orders over {formatPrice(1000)}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Delivery Requirements</h2>
              <p className="text-gray-600 mb-4">For your security, all deliveries require:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Adult signature (18+ years) for orders over {formatPrice(100)}</li>
                <li>Photo ID verification for high-value items</li>
                <li>Secure delivery address (no PO boxes for valuable items)</li>
                <li>Someone must be available to receive the package</li>
                <li>Delivery instructions can be provided at checkout</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Shipping Restrictions</h2>
              <p className="text-gray-600 mb-4">We cannot ship to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>PO Boxes, APO/FPO addresses for orders over {formatPrice(500)}</li>
                <li>Countries with strict cultural artifact import laws</li>
                <li>Addresses with previous delivery fraud incidents</li>
                <li>Unverified addresses without proper documentation</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Lost or Damaged Packages</h2>
              <p className="text-gray-600 mb-4">In the unlikely event of issues:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Report lost packages within 7 days of expected delivery</li>
                <li>Document any damage immediately upon receipt</li>
                <li>Keep all packaging materials for inspection</li>
                <li>Insurance claims processed within 14 business days</li>
                <li>Replacement or refund provided based on insurance coverage</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Return Shipping</h2>
              <p className="text-gray-600 mb-4">For approved returns:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Free return shipping label provided</li>
                <li>Same security standards as outbound shipping</li>
                <li>Insurance coverage during return transit</li>
                <li>Tracking included for all return shipments</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Shipping Costs</h2>
              <p className="text-gray-600 mb-4">Shipping costs are calculated based on:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Package weight and dimensions</li>
                <li>Shipping method selected</li>
                <li>Insurance coverage amount</li>
                <li>Destination (domestic vs international)</li>
                <li>Total order value (affects security requirements)</li>
              </ul>
              <p className="text-gray-600 mt-4">
                Free standard shipping available for orders over {formatPrice(500)} (domestic only).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Processing Time</h2>
              <p className="text-gray-600 mb-4">Order processing typically takes:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>1-2 business days for in-stock items</li>
                <li>3-5 business days for graded coins requiring verification</li>
                <li>5-7 business days for auction wins requiring consolidation</li>
                <li>Additional time for international customs preparation</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <p className="text-gray-600 mb-4">
                For shipping inquiries or special arrangements, contact us at:
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
            <p className="text-sm text-gray-600">Learn about data protection</p>
          </a>
          <a href="/cookies" className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <h3 className="font-semibold mb-2">Cookie Policy</h3>
            <p className="text-sm text-gray-600">Learn about cookie usage</p>
          </a>
          <a href="/disclaimer" className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <h3 className="font-semibold mb-2">Disclaimer</h3>
            <p className="text-sm text-gray-600">Important legal information</p>
          </a>
        </div>
      </div>
    </div>
  )
}
