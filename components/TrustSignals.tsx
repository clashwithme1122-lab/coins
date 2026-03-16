'use client';

import { Shield, Award, Clock, CheckCircle, TrendingUp } from 'lucide-react';

export default function TrustSignals() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Collectors Trust Taksila Coins</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            With over 30 years of experience in numismatic trading, we provide authentic, 
            professionally graded coins with a commitment to transparency and collector satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-white rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Authenticity Guaranteed</h3>
            <p className="text-gray-600 text-sm">
              Every coin is verified by our expert team and comes with a certificate of authenticity
            </p>
          </div>

          <div className="text-center">
            <div className="bg-white rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg">
              <Award className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Professional Grading</h3>
            <p className="text-gray-600 text-sm">
              Coins are graded according to industry standards by certified numismatic experts
            </p>
          </div>

          <div className="text-center">
            <div className="bg-white rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg">
              <Clock className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">30+ Years Experience</h3>
            <p className="text-gray-600 text-sm">
              Established reputation in rare coins and ancient numismatic treasures
            </p>
          </div>

          <div className="text-center">
            <div className="bg-white rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg">
              <CheckCircle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">30-Day Return Policy</h3>
            <p className="text-gray-600 text-sm">
              Shop with confidence with our comprehensive money-back guarantee
            </p>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
              <p className="text-gray-600">Happy Collectors</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">4.9/5</div>
              <p className="text-gray-600">Customer Rating</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
              <p className="text-gray-600">Authenticity Verified</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-4 bg-white rounded-full px-6 py-3 shadow-lg">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-700">
              Investment-grade coins with documented provenance
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
