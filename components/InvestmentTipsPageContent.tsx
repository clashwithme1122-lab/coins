'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Shield, BookOpen, Target, Lightbulb, CheckCircle, AlertTriangle, DollarSign } from 'lucide-react';
import InvestmentTipCard from '@/components/InvestmentTipCard';
import { investmentTips, investmentChecklist, portfolioAllocation } from '@/lib/data/investmentTips';

interface InvestmentTipsPageContentProps {
  investmentTips: typeof investmentTips;
  investmentChecklist: typeof investmentChecklist;
  portfolioAllocation: typeof portfolioAllocation;
}

export default function InvestmentTipsPageContent({ 
  investmentTips, 
  investmentChecklist, 
  portfolioAllocation 
}: InvestmentTipsPageContentProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <TrendingUp className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Coin Investment Strategies
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
              Expert guidance on building wealth through strategic numismatic investments 
              with proven portfolio management techniques
            </p>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg prose-gray max-w-none"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              The Ultimate Guide to Coin Investment Success
            </h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              Investing in rare coins and numismatic treasures has emerged as a sophisticated alternative investment strategy, 
              combining historical appreciation with tangible asset security. Unlike traditional financial markets, the coin 
              collecting industry offers unique advantages including tax benefits, inflation hedging, and the satisfaction of 
              owning pieces of history. This comprehensive guide explores proven strategies for building a successful coin 
              investment portfolio that balances risk management with long-term growth potential.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Understanding the Numismatic Market Landscape</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              The global coin collection market reached $4.71 billion in 2024, with steady growth driven by increasing collector 
              interest and investment demand. Major auction houses reported strong results with several record-breaking sales, 
              indicating robust demand for high-quality rare coins. The market encompasses various segments including U.S. type 
              coins, world coins, ancient numismatics, and modern commemoratives, each offering distinct investment characteristics 
              and market dynamics.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Portfolio Diversification Strategies</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Successful coin investing requires strategic diversification across different categories and price points. A well-balanced 
              portfolio should include classic United States coins such as half cents, large cents, early nickels, dimes, quarters, 
              half dollars and silver dollars. Additionally, consider precious metals such as gold bullion coins and classic gold 
              coins ranging from one dollar gold coins through $20 gold double eagles. This approach minimizes market fluctuations 
              while maximizing potential returns through strategic diversification across different coin types, metals, and historical periods.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Risk Management and Due Diligence</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Risk management is crucial for successful coin investing. The primary risks include counterfeit coins, market volatility, 
              and liquidity challenges. Always buy certified, graded coins from reputable dealers and maintain proper insurance for 
              valuable collections. Stay informed about market trends and news, and understand market cycles and timing. 
              Diversification reduces concentration risk, while maintaining some easily sellable pieces ensures liquidity when needed.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Market Timing and Opportunity Identification</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Market opportunities in numismatics require careful analysis of emerging trends and demographic shifts. Younger collectors 
              are showing increased interest in modern commemoratives and coins with historical significance, while international markets 
              are experiencing rapid growth. Research historical price trends and patterns, monitor auction results and market indicators, 
              and identify collecting trends among younger demographics. Research emerging markets and international opportunities to 
              maximize investment potential.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">The Importance of Professional Grading</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Coin grading is the foundation of numismatic investing. The Sheldon Scale, ranging from 1 to 70, provides a standardized 
              method for assessing coin condition. Understanding this system is essential for making informed investment decisions. 
              Learn the Sheldon Scale grading system, understand how grading affects market value, recognize grading inconsistencies 
              between services, and develop your own grading skills for better evaluation. Use third-party grading for authentication 
              and value, and understand the importance of coin preservation.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Long-term Investment Philosophy</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              The most successful investors in coins had an extremely long-term vision that took years, if not decades, to assemble. 
              This time was spent learning about the coins they were purchasing and studying the market valuation of each and every 
              coin they purchased. This enabled them to spot coins of truly exceptional value. Avoid the temptation of "flipping" 
              coins for quick profits, as this carries a high amount of risk and is the rare exception rather than the rule.
            </p>
          </motion.article>
        </div>
      </section>

      {/* Investment Tips Cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Essential Investment Strategies
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Proven techniques for building and managing a successful coin investment portfolio
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {investmentTips.map((tip, index) => (
              <InvestmentTipCard
                key={tip.id}
                {...tip}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Investment Checklist */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Investment Due Diligence Checklist
            </h2>
            <p className="text-lg text-gray-600">
              Essential steps to take before making any coin investment
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="grid md:grid-cols-2 gap-4">
              {investmentChecklist.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Allocation */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Recommended Portfolio Allocation
            </h2>
            <p className="text-lg text-gray-600">
              Strategic diversification for balanced risk and growth
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="space-y-4">
              {portfolioAllocation.map((allocation, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{allocation.category}</h4>
                      <span className="text-lg font-bold text-blue-600">{allocation.percentage}%</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{allocation.description}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${allocation.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Risk Warning */}
      <section className="py-16 bg-yellow-50 border-y border-yellow-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-start space-x-4"
          >
            <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Investment Risk Disclaimer</h3>
              <p className="text-gray-700">
                Coin investing involves significant risks including market volatility, counterfeit coins, and liquidity challenges. 
                Past performance does not guarantee future results. Always conduct thorough research and consider consulting 
                with financial advisors before making investment decisions. The information provided here is for educational 
                purposes only and should not be considered as financial advice.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sources Section */}
      <section className="py-12 bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sources</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <a href="https://www.thesprucecrafts.com/strategies-for-investing-in-rare-coins-4142092" 
               className="text-blue-600 hover:text-blue-700 underline" 
               target="_blank" 
               rel="noopener noreferrer">
              The Spruce Crafts - Strategies for Investing in Rare Coins
            </a>
            <a href="https://www.wiseguyreports.com/reports/coin-collection-market" 
               className="text-blue-600 hover:text-blue-700 underline" 
               target="_blank" 
               rel="noopener noreferrer">
              WiseGuy Reports - Coin Collection Market Analysis
            </a>
            <a href="https://www.pcgs.com/investing" 
               className="text-blue-600 hover:text-blue-700 underline" 
               target="_blank" 
               rel="noopener noreferrer">
              PCGS - Coin Investment Guide and Strategies
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
