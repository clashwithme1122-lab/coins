'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gavel, Clock, TrendingUp, Users, Filter, Search, Shield, Award, ExternalLink, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useGlobal } from '@/contexts/GlobalContext';

interface AuctionItem {
  id: number;
  title: string;
  description: string;
  shortDesc: string;
  currentBid: number;
  startingBid: number;
  buyNowPrice?: number;
  bidCount: number;
  timeLeft: string;
  endTime: Date;
  image: string;
  images: string[];
  category: string;
  grade: string;
  certification: string;
  weight: string;
  diameter: string;
  composition: string;
  mint: string;
  year: string;
  seller: string;
  sellerVerified: boolean;
  bids: Array<{
    id: number;
    amount: number;
    bidder: string;
    timestamp: Date;
  }>;
}

export default function AuctionPage() {
  const { formatPrice, currency } = useGlobal();
  const [auctionItems, setAuctionItems] = useState<AuctionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<AuctionItem | null>(null);
  const [showBidModal, setShowBidModal] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [bidderName, setBidderName] = useState('');

  useEffect(() => {
    fetchAuctions();
  }, []);

  const fetchAuctions = async () => {
    try {
      const response = await fetch('/api/auctions');
      const result = await response.json();
      if (result.success) {
        setAuctionItems(result.data);
      }
    } catch (error) {
      console.error('Error fetching auctions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBid = async () => {
    if (!selectedItem || !bidAmount || !bidderName) return;

    try {
      const response = await fetch('/api/auctions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'place_bid',
          auctionId: selectedItem.id,
          bidAmount: parseFloat(bidAmount),
          bidderName
        })
      });

      const result = await response.json();
      if (result.success) {
        setAuctionItems(prev => 
          prev.map(item => item.id === selectedItem.id ? result.data : item)
        );
        setShowBidModal(false);
        setBidAmount('');
        setBidderName('');
      }
    } catch (error) {
      console.error('Error placing bid:', error);
    }
  };

  const filteredItems = auctionItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(auctionItems.map(item => item.category)))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Gavel className="w-16 h-16 mx-auto mb-4 text-purple-600 animate-pulse" />
          <p className="text-xl text-gray-600">Loading auctions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
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
                <span className="text-2xl font-bold">
                  {formatPrice(auctionItems.reduce((sum, item) => sum + item.currentBid, 0)).split('.')[0]}
                </span>
              </div>
              <p className="text-sm text-gray-600">Total Value</p>
            </div>
            <div>
              <div className="flex items-center justify-center space-x-2 text-blue-600 mb-1">
                <Users className="w-5 h-5" />
                <span className="text-2xl font-bold">
                  {auctionItems.reduce((sum, item) => sum + item.bidCount, 0)}
                </span>
              </div>
              <p className="text-sm text-gray-600">Total Bids</p>
            </div>
            <div>
              <div className="flex items-center justify-center space-x-2 text-orange-600 mb-1">
                <Clock className="w-5 h-5" />
                <span className="text-2xl font-bold">
                  {auctionItems.filter(item => {
                    const timeLeft = new Date(item.endTime).getTime() - new Date().getTime();
                    return timeLeft < 24 * 60 * 60 * 1000; // Less than 24 hours
                  }).length}
                </span>
              </div>
              <p className="text-sm text-gray-600">Ending Soon</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 items-center flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search auctions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Auction Items */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {item.category}
                  </div>
                  {item.sellerVerified && (
                    <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <Shield className="w-4 h-4 mr-1" />
                      Verified
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.shortDesc}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-gray-500">Current Bid:</span>
                      <p className="font-bold text-lg text-purple-600">{formatPrice(item.currentBid)}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Bids:</span>
                      <p className="font-bold text-lg">{item.bidCount}</p>
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Clock className="w-4 h-4 mr-1" />
                    {item.timeLeft}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedItem(item);
                        setShowBidModal(true);
                      }}
                      className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Place Bid
                    </button>
                    <Link
                      href={`/auction/${item.id}`}
                      className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors text-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <Gavel className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No auctions found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>

      {/* Bid Modal */}
      {showBidModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">Place Your Bid</h2>
            
            <div className="mb-4">
              <h3 className="font-semibold text-lg mb-2">{selectedItem.title}</h3>
              <p className="text-gray-600">Current Bid: {formatPrice(selectedItem.currentBid)}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  value={bidderName}
                  onChange={(e) => setBidderName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                  placeholder="Enter your name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bid Amount ({currency})</label>
                <input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  min={selectedItem.currentBid + 1}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                  placeholder={formatPrice(selectedItem.currentBid + 100)}
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleBid}
                className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Place Bid
              </button>
              <button
                onClick={() => {
                  setShowBidModal(false);
                  setSelectedItem(null);
                  setBidAmount('');
                  setBidderName('');
                }}
                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
