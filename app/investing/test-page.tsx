'use client'

import { useState } from 'react'
import { DollarSign, Calculator, ArrowRight } from 'lucide-react'

export default function TestInvestingPage() {
  const [calculatorValues, setCalculatorValues] = useState({
    investment: 10000,
    years: 10,
    returnRate: 12
  })

  const calculateReturns = () => {
    const { investment, years, returnRate } = calculatorValues
    const futureValue = investment * Math.pow(1 + returnRate / 100, years)
    return Math.round(futureValue)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-center">Test Investment Page</h1>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-center mb-8">Investment Calculator</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <label className="block text-sm font-medium mb-2 text-gray-700">Initial Investment</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  value={calculatorValues.investment}
                  onChange={(e) => setCalculatorValues({...calculatorValues, investment: parseInt(e.target.value) || 0})}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600 border-gray-300"
                />
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <label className="block text-sm font-medium mb-2 text-gray-700">Investment Period</label>
              <select 
                value={calculatorValues.years}
                onChange={(e) => setCalculatorValues({...calculatorValues, years: parseInt(e.target.value)})}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600 border-gray-300"
              >
                <option value={5}>5 years</option>
                <option value={10}>10 years</option>
                <option value={15}>15 years</option>
                <option value={20}>20 years</option>
              </select>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <label className="block text-sm font-medium mb-2 text-gray-700">Expected Return</label>
              <select 
                value={calculatorValues.returnRate}
                onChange={(e) => setCalculatorValues({...calculatorValues, returnRate: parseInt(e.target.value)})}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600 border-gray-300"
              >
                <option value={6}>Conservative (6%)</option>
                <option value={10}>Moderate (10%)</option>
                <option value={15}>Aggressive (15%)</option>
                <option value={20}>High Growth (20%)</option>
              </select>
            </div>
          </div>
          <div className="mt-6 bg-purple-50 rounded-xl p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <Calculator className="w-6 h-6 mr-2 text-purple-600" />
              <p className="text-sm text-gray-600">Estimated Future Value</p>
            </div>
            <p className="text-4xl font-bold text-purple-600">PKR {calculateReturns().toLocaleString()}</p>
            <p className="text-sm mt-1 text-gray-500">
              Based on {calculatorValues.returnRate}% annual return over {calculatorValues.years} years
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-center mb-8">Test Educational Resources</h2>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h3 className="font-semibold mb-2">Test Article</h3>
            <p className="text-sm text-gray-600 mb-4">This is a test article to verify functionality</p>
            <div className="flex justify-end">
              <button
                onClick={() => window.open('https://www.pcgs.com', '_blank')}
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700"
              >
                Read More
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
