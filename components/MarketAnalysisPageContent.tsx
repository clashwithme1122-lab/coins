'use client';

import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, TrendingDown, DollarSign, Globe, Calendar, Eye, ArrowUp, ArrowDown, Minus, Activity, Newspaper } from 'lucide-react';
import MarketAnalysisCard from '@/components/MarketAnalysisCard';
import { marketInsights, marketNews, collectorSentiment, marketTrends, priceIndicators } from '@/lib/data/marketAnalysis';

interface MarketAnalysisPageContentProps {
  marketInsights: typeof marketInsights;
  marketNews: typeof marketNews;
  collectorSentiment: typeof collectorSentiment;
  marketTrends: typeof marketTrends;
  priceIndicators: typeof priceIndicators;
}

export default function MarketAnalysisPageContent({ 
  marketInsights, 
  marketNews, 
  collectorSentiment, 
  marketTrends, 
  priceIndicators 
}: MarketAnalysisPageContentProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <BarChart3 className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Coin Market Analysis
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-indigo-100 max-w-3xl mx-auto">
              Real-time market insights, price trends, and collector sentiment indicators 
              for informed numismatic investment decisions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Insights Summary */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Market Performance Indicators
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Key metrics driving the numismatic market and investment landscape
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {marketInsights.map((insight, index) => (
              <MarketAnalysisCard
                key={insight.id}
                {...insight}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Market Trends */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Market Trends Analysis
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Emerging patterns and developments shaping the coin collecting market
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {marketTrends.map((trend, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{trend.category}</h3>
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                    trend.trend === 'Strong' || trend.trend === 'Rising' ? 'bg-green-100 text-green-700' :
                    trend.trend === 'Stable' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {trend.trend}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{trend.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Growth Rate</span>
                  <span className="font-semibold text-gray-900">{trend.growth}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Price Indicators */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Price Performance Indicators
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive analysis of price movements across different coin categories
            </p>
          </motion.div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {priceIndicators.map((indicator, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="text-center"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${
                    indicator.change > 0 ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {indicator.change > 0 ? (
                      <ArrowUp className="w-6 h-6 text-green-600" />
                    ) : (
                      <ArrowDown className="w-6 h-6 text-red-600" />
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{indicator.indicator}</h3>
                  <div className={`text-2xl font-bold mb-1 ${
                    indicator.change > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {indicator.change > 0 ? '+' : ''}{indicator.change}%
                  </div>
                  <p className="text-sm text-gray-500">{indicator.period}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Collector Sentiment */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Collector Sentiment Analysis
            </h2>
            <p className="text-lg text-gray-600">
              Market psychology and confidence indicators from the collecting community
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-4">
                <Activity className="w-10 h-10 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-blue-600 mb-2">{collectorSentiment.level}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{collectorSentiment.label}</h3>
              <p className="text-gray-600">{collectorSentiment.description}</p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 mb-3">Key Factors Influencing Sentiment:</h4>
              {collectorSentiment.factors.map((factor, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
                  <span className="text-gray-700">{factor}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Market News */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Latest Market News
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Recent developments and announcements impacting the numismatic market
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {marketNews.map((news, index) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                    news.category === 'auction' ? 'bg-purple-100 text-purple-700' :
                    news.category === 'trend' ? 'bg-blue-100 text-blue-700' :
                    news.category === 'market' ? 'bg-green-100 text-green-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {news.category}
                  </span>
                  <span className="text-sm text-gray-500">{news.date}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {news.headline}
                </h3>
                <p className="text-gray-600 mb-4">{news.summary}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{news.source}</span>
                  <ArrowUp className="w-4 h-4 text-blue-600 transform rotate-45" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Summary */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Market Summary & Outlook</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed mb-4">
                The global coin collection market continues to demonstrate robust growth, reaching $4.71 billion in 2024 
                with a projected CAGR of 5.5% through 2035. Key market drivers include increasing collector participation, 
                technological innovations in authentication and trading platforms, and growing interest from international markets, 
                particularly in the Asia-Pacific region.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Major auction houses report strong results with record-breaking sales, indicating sustained demand for 
                high-quality rare coins. The market shows particular strength in certified, graded coins with clear 
                provenance, while modern commemoratives and coins with historical significance continue to attract new collectors.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Looking ahead, digital transformation and blockchain technology are expected to further enhance market 
                transparency and accessibility. Collector sentiment remains optimistic at 78, driven by strong auction results 
                and improved authentication technologies. Investors should focus on diversification across different coin 
                categories and maintain a long-term perspective to capitalize on market opportunities.
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
            <a href="https://www.wiseguyreports.com/reports/coin-collection-market" 
               className="text-blue-600 hover:text-blue-700 underline" 
               target="_blank" 
               rel="noopener noreferrer">
              WiseGuy Reports - Coin Collection Market Analysis
            </a>
            <a href="https://www.heritageauctions.com" 
               className="text-blue-600 hover:text-blue-700 underline" 
               target="_blank" 
               rel="noopener noreferrer">
              Heritage Auctions - Market Data and Results
            </a>
            <a href="https://www.ngccoin.com" 
               className="text-blue-600 hover:text-blue-700 underline" 
               target="_blank" 
               rel="noopener noreferrer">
              NGC - Market Trends and Analysis
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
