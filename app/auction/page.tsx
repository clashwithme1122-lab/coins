'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List, Clock, Users, Eye, Heart, ChevronDown, Calendar, MapPin, Award, Gavel, Shield } from 'lucide-react';
import AuctionItemCard from '@/components/AuctionItemCard';
import AuctionPageContent from '@/components/AuctionPageContent';
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
  const router = useRouter();
  const { formatPrice, currency } = useGlobal();
  const [auctionItems, setAuctionItems] = useState<AuctionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<AuctionItem | null>(null);
  const [showBidModal, setShowBidModal] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [bidderName, setBidderName] = useState('');
  const [user, setUser] = useState<any>(null);
  const [bidError, setBidError] = useState('');

  useEffect(() => {
    fetchAuctions();
    loadUser();
  }, []);

  const loadUser = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  };

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
    if (!selectedItem) return;
    
    // Check if user is logged in
    if (!user) {
      setBidError('Please login to place a bid');
      return;
    }

    // Validate bid amount
    const bidValue = parseFloat(bidAmount);
    if (!bidValue || isNaN(bidValue)) {
      setBidError('Please enter a valid bid amount');
      return;
    }

    // eBay-style bidding validation
    const minBidIncrement = selectedItem.currentBid < 50 ? 1 : selectedItem.currentBid < 500 ? 5 : 10;
    const minRequiredBid = selectedItem.currentBid + minBidIncrement;
    
    if (bidValue < minRequiredBid) {
      setBidError(`Minimum bid is ${formatPrice(minRequiredBid)} (increment of ${formatPrice(minBidIncrement)})`);
      return;
    }

    // Check if auction has ended
    if (new Date(selectedItem.endTime) <= new Date()) {
      setBidError('This auction has ended');
      return;
    }

    try {
      const response = await fetch('/api/auctions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'place_bid',
          auctionId: selectedItem.id,
          bidAmount: bidValue,
          bidderName: user.name,
          bidderEmail: user.email,
          userId: user.id
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
        setBidError('');
        
        // Update user's bid history
        const userBids = JSON.parse(localStorage.getItem('userBids') || '[]');
        userBids.push({
          auctionId: selectedItem.id,
          auctionTitle: selectedItem.title,
          bidAmount: bidValue,
          timestamp: new Date().toISOString()
        });
        localStorage.setItem('userBids', JSON.stringify(userBids));
      } else {
        setBidError(result.message || 'Failed to place bid');
      }
    } catch (error) {
      console.error('Error placing bid:', error);
      setBidError('Failed to place bid. Please try again.');
    }
  };

  const handleBuyNow = async (item: AuctionItem) => {
    if (!item.buyNowPrice) return;
    
    // Check if user is logged in
    if (!user) {
      alert('Please login to use Buy Now functionality');
      router.push('/auth/login');
      return;
    }

    if (confirm(`Are you sure you want to buy this item for ${formatPrice(item.buyNowPrice)}?`)) {
      try {
        const response = await fetch('/api/auctions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'buy_now',
            auctionId: item.id,
            userId: user.id,
            buyerName: user.name,
            buyerEmail: user.email
          })
        });

        const result = await response.json();
        if (result.success) {
          alert('Purchase successful! You will be redirected to your dashboard.');
          router.push('/dashboard');
        } else {
          alert('Purchase failed: ' + (result.message || 'Unknown error'));
        }
      } catch (error) {
        console.error('Error with Buy Now:', error);
        alert('Purchase failed. Please try again.');
      }
    }
  };

  const filteredItems = auctionItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(auctionItems.map(item => item.category)))];

  // eBay-style time formatting functions
  const formatTimeLeft = (endTime: Date) => {
    const now = new Date().getTime();
    const end = new Date(endTime).getTime();
    const difference = end - now;

    if (difference <= 0) return 'Ended';
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);

    if (days > 0) return `${days}d ${hours}h left`;
    if (hours > 0) return `${hours}h ${minutes}m left`;
    return `${minutes}m left`;
  };

  const getTimeLeftColor = (endTime: Date) => {
    const now = new Date().getTime();
    const end = new Date(endTime).getTime();
    const difference = end - now;

    if (difference <= 0) return 'text-gray-500';
    if (difference < 60 * 60 * 1000) return 'text-red-600 font-semibold'; // Less than 1 hour
    if (difference < 24 * 60 * 60 * 1000) return 'text-orange-600'; // Less than 24 hours
    return 'text-gray-600';
  };

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
    <div className="min-h-screen bg-white">
      {/* eBay-style Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-gray-900">Auction</h1>
              <div className="hidden md:flex space-x-6">
                <button className="text-gray-700 hover:text-gray-900 font-medium">Saved</button>
                <button className="text-gray-700 hover:text-gray-900 font-medium">Selling</button>
                <button className="text-gray-700 hover:text-gray-900 font-medium">Bids/Offers</button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{auctionItems.length} results</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Sort:</span>
              <select className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500">
                <option>Time: ending soonest</option>
                <option>Time: newly listed</option>
                <option>Price: highest first</option>
                <option>Price: lowest first</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">View:</span>
              <button className="p-1 border border-gray-300 rounded bg-blue-50 text-blue-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM13 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search auctions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* eBay-style Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-lg transition-all duration-200 cursor-pointer"
              onClick={() => window.location.href = `/auction/${item.id}`}
            >
              {/* Image Container */}
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://source.unsplash.com/400x300/?coin,auction`;
                  }}
                />
                {item.sellerVerified && (
                  <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-medium flex items-center">
                    <Shield className="w-3 h-3 mr-1" />
                    Verified
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Title */}
                <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 hover:text-blue-600">
                  {item.title}
                </h3>

                {/* Price and Bids */}
                <div className="mb-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-gray-900">{formatPrice(item.currentBid)}</span>
                    <span className="text-xs text-gray-500">{item.bidCount} bids</span>
                  </div>
                  {item.buyNowPrice && (
                    <div className="text-sm text-gray-600 mt-1">
                      Buy It Now: {formatPrice(item.buyNowPrice)}
                    </div>
                  )}
                </div>

                {/* Time Left */}
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className={getTimeLeftColor(item.endTime)}>
                    {formatTimeLeft(item.endTime)}
                  </span>
                </div>

                {/* Shipping */}
                <div className="text-sm text-gray-600 mb-3">
                  <span className="text-green-600 font-medium">Free shipping</span>
                </div>

                {/* Seller */}
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>{item.seller}</span>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-yellow-400 rounded-full mr-1"></div>
                    <span>4.8</span>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedItem(item);
                      setShowBidModal(true);
                    }}
                    className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-xs font-medium hover:bg-blue-700 transition-colors"
                  >
                    Place Bid
                  </button>
                  {item.buyNowPrice && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBuyNow(item);
                      }}
                      className="flex-1 bg-green-600 text-white py-2 px-3 rounded text-xs font-medium hover:bg-green-700 transition-colors"
                    >
                      Buy Now
                    </button>
                  )}
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                  >
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* eBay-style Bid Modal */}
      {showBidModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Place bid</h2>
                <button
                  onClick={() => {
                    setShowBidModal(false);
                    setSelectedItem(null);
                    setBidAmount('');
                    setBidderName('');
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="px-6 py-4">
              <div className="mb-4">
                <h3 className="font-medium text-gray-900 mb-2">{selectedItem.title}</h3>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Current bid:</span>
                    <span className="font-semibold text-gray-900">{formatPrice(selectedItem.currentBid)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Time left:</span>
                    <span className={getTimeLeftColor(selectedItem.endTime)}>
                      {formatTimeLeft(selectedItem.endTime)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {!user ? (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-sm text-yellow-800">
                      Please <a href="/auth/login" className="text-blue-600 hover:underline">login</a> to place a bid.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-700">
                        <strong>Bidding as:</strong> {user.name} ({user.email})
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your maximum bid ({currency})
                      </label>
                      <input
                        type="number"
                        value={bidAmount}
                        onChange={(e) => {
                          setBidAmount(e.target.value);
                          setBidError('');
                        }}
                        min={selectedItem.currentBid + 1}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        placeholder={`Enter ${formatPrice(selectedItem.currentBid + 100)} or more`}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Minimum bid: {formatPrice(selectedItem.currentBid + 1)}
                      </p>
                    </div>
                  </>
                )}
                
                {bidError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-sm text-red-800">{bidError}</p>
                  </div>
                )}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                <p className="text-sm text-blue-800">
                  <strong>Important:</strong> By placing a bid, you're committing to buy this item if you win.
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 px-6 py-4">
              <div className="flex gap-3">
                <button
                  onClick={handleBid}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Place bid
                </button>
                <button
                  onClick={() => {
                    setShowBidModal(false);
                    setSelectedItem(null);
                    setBidAmount('');
                    setBidderName('');
                    setBidError('');
                  }}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
