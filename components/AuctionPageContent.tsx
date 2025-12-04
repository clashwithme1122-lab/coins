'use client';

import { motion } from 'framer-motion';
import { Gavel, Clock, TrendingUp, Users, Filter, Search, Shield, Award, ExternalLink } from 'lucide-react';
import AuctionItemCard from '@/components/AuctionItemCard';
import { auctionItems, auctionCategories, auctionFAQs } from '@/lib/data/auctions';

interface AuctionPageContentProps {
  auctionItems: typeof auctionItems;
  auctionCategories: typeof auctionCategories;
  auctionFAQs: typeof auctionFAQs;
}

export default function AuctionPageContent({ 
  auctionItems, 
  auctionCategories, 
  auctionFAQs 
}: AuctionPageContentProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Gavel className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Live Coin Auctions
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto">
              Bid on authentic rare coins and numismatic treasures. 
              Competitive auctions with certified grading and buyer protection.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
          >
            <div>
              <div className="flex items-center justify-center space-x-2 text-purple-600 mb-1">
                <Gavel className="w-5 h-5" />
                <span className="text-2xl font-bold">{auctionItems.length}</span>
              </div>
              <p className="text-sm text-gray-600">Active Auctions</p>
            </div>
            <div>
              <div className="flex items-center justify-center space-x-2 text-green-600 mb-1">
                <TrendingUp className="w-5 h-5" />
                <span className="text-2xl font-bold">$2.4M</span>
              </div>
              <p className="text-sm text-gray-600">Total Value</p>
            </div>
            <div>
              <div className="flex items-center justify-center space-x-2 text-blue-600 mb-1">
                <Users className="w-5 h-5" />
                <span className="text-2xl font-bold">1,847</span>
              </div>
              <p className="text-sm text-gray-600">Active Bidders</p>
            </div>
            <div>
              <div className="flex items-center justify-center space-x-2 text-orange-600 mb-1">
                <Clock className="w-5 h-5" />
                <span className="text-2xl font-bold">12</span>
              </div>
              <p className="text-sm text-gray-600">Ending Soon</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Auctions */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Auctions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover rare numismatic treasures from our curated collection of authenticated coins
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {auctionItems.map((item, index) => (
              <AuctionItemCard
                key={item.id}
                {...item}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our diverse collection organized by coin types and historical periods
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {auctionCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                    <div className="w-6 h-6 bg-purple-200 rounded" />
                  </div>
                  <span className="text-sm text-gray-500">{category.count} items</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">Browse our collection of {category.name.toLowerCase()}</p>
                <div className="flex items-center text-purple-600 text-sm font-medium">
                  <span>Browse Category</span>
                  <ExternalLink className="w-4 h-4 ml-1" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about participating in our coin auctions
            </p>
          </motion.div>

          <div className="space-y-6">
            {auctionFAQs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h3 className="font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sources Section */}
      <section className="py-12 bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sources</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <a href="https://www.ha.com" 
               className="text-blue-600 hover:text-blue-700 underline" 
               target="_blank" 
               rel="noopener noreferrer">
              Heritage Auctions - Industry Leader
            </a>
            <a href="https://www.stacksbowers.com" 
               className="text-blue-600 hover:text-blue-700 underline" 
               target="_blank" 
               rel="noopener noreferrer">
              Stack's Bowers Galleries - Auction Results
            </a>
            <a href="https://www.ngccoin.com" 
               className="text-blue-600 hover:text-blue-700 underline" 
               target="_blank" 
               rel="noopener noreferrer">
              NGC - Grading Standards
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
