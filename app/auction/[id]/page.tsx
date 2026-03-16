'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Users, Shield, Award, Gavel, Image as ImageIcon } from 'lucide-react';
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

export default function AuctionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { formatPrice, currency } = useGlobal();
  const [auction, setAuction] = useState<AuctionItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showBidModal, setShowBidModal] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [bidderName, setBidderName] = useState('');
  const [user, setUser] = useState<any>(null);
  const [bidError, setBidError] = useState('');

  useEffect(() => {
    if (params.id) {
      fetchAuction(parseInt(params.id as string));
      loadUser();
    }
  }, [params.id]);

  const loadUser = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  };

  const fetchAuction = async (id: number) => {
    try {
      const response = await fetch('/api/auctions');
      const result = await response.json();
      if (result.success) {
        const foundAuction = result.data.find((item: AuctionItem) => item.id === id);
        if (foundAuction) {
          setAuction(foundAuction);
        } else {
          router.push('/auction');
        }
      }
    } catch (error) {
      console.error('Error fetching auction:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBid = async () => {
    if (!auction) return;
    
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
    const minBidIncrement = auction.currentBid < 50 ? 1 : auction.currentBid < 500 ? 5 : 10;
    const minRequiredBid = auction.currentBid + minBidIncrement;
    
    if (bidValue < minRequiredBid) {
      setBidError(`Minimum bid is ${formatPrice(minRequiredBid)} (increment of ${formatPrice(minBidIncrement)})`);
      return;
    }

    // Check if auction has ended
    if (new Date(auction.endTime) <= new Date()) {
      setBidError('This auction has ended');
      return;
    }

    try {
      const response = await fetch('/api/auctions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'place_bid',
          auctionId: auction.id,
          bidAmount: bidValue,
          bidderName: user.name,
          bidderEmail: user.email,
          userId: user.id
        })
      });

      const result = await response.json();
      if (result.success) {
        setAuction(result.data);
        setShowBidModal(false);
        setBidAmount('');
        setBidderName('');
        setBidError('');
        
        // Update user's bid history
        const userBids = JSON.parse(localStorage.getItem('userBids') || '[]');
        userBids.push({
          auctionId: auction.id,
          auctionTitle: auction.title,
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
          <p className="text-xl text-gray-600">Loading auction details...</p>
        </div>
      </div>
    );
  }

  if (!auction) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Auction not found</h2>
          <Link href="/auction" className="text-purple-600 hover:text-purple-700">
            ← Back to Auctions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* eBay-style Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <Link
              href="/auction"
              className="flex items-center text-blue-600 hover:text-blue-700 text-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to list
            </Link>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-800 text-sm">Save this item</button>
              <button className="text-gray-600 hover:text-gray-800 text-sm">Watch</button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Images */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Main Image */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="md:col-span-2"
              >
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="relative aspect-square">
                    <img
                      src={auction.images[selectedImage] || auction.image}
                      alt={auction.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Image Gallery */}
                  {auction.images.length > 1 && (
                    <div className="p-4 border-t border-gray-200">
                      <div className="grid grid-cols-6 gap-2">
                        {[auction.image, ...auction.images].map((img, index) => (
                          <div key={index} className={selectedImage === index ? 'ring-2 ring-blue-500' : ''}>
                            <button
                              onClick={() => setSelectedImage(index)}
                              className="relative aspect-square rounded overflow-hidden border-2 border-gray-200 hover:border-blue-500 transition-colors"
                            >
                              <img
                                src={img}
                                alt={`${auction.title} ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Item Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="md:col-span-2"
              >
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">{auction.title}</h1>
                  <p className="text-gray-600 mb-6">{auction.description}</p>

                  {/* Item Specifications */}
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Item specifics</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Year:</span>
                        <span className="ml-2 font-medium">{auction.year}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Mint:</span>
                        <span className="ml-2 font-medium">{auction.mint}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Grade:</span>
                        <span className="ml-2 font-medium">{auction.grade}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Certification:</span>
                        <span className="ml-2 font-medium">{auction.certification}</span>
                      </div>
                      {auction.weight && (
                        <div>
                          <span className="text-gray-500">Weight:</span>
                          <span className="ml-2 font-medium">{auction.weight}</span>
                        </div>
                      )}
                      {auction.diameter && (
                        <div>
                          <span className="text-gray-500">Diameter:</span>
                          <span className="ml-2 font-medium">{auction.diameter}</span>
                        </div>
                      )}
                      {auction.composition && (
                        <div>
                          <span className="text-gray-500">Composition:</span>
                          <span className="ml-2 font-medium">{auction.composition}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bidding History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6"
            >
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">History</h2>
                {auction.bids.length > 0 ? (
                  <div className="space-y-2">
                    {auction.bids.slice(0, 10).map((bid, index) => (
                      <div key={bid.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <Users className="w-4 h-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{bid.bidder}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(bid.timestamp).toLocaleDateString()} {new Date(bid.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                        <p className="font-semibold text-gray-900">{formatPrice(bid.amount)}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No bids yet</p>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Bidding Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-6 space-y-4">
              {/* Current Price */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="text-center mb-4">
                  <div className="text-sm text-gray-500 mb-1">Current bid</div>
                  <div className="text-3xl font-bold text-gray-900">{formatPrice(auction.currentBid)}</div>
                  <div className="text-sm text-gray-500">{auction.bidCount} bids</div>
                </div>

                {/* Time Left */}
                <div className="flex items-center justify-center text-sm mb-4">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className={getTimeLeftColor(auction.endTime)}>
                    {formatTimeLeft(auction.endTime)}
                  </span>
                </div>

                {/* Buy Now Option */}
                {auction.buyNowPrice && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                    <div className="text-center">
                      <div className="text-sm text-green-800 mb-1">Buy it now for</div>
                      <div className="text-xl font-bold text-green-800">{formatPrice(auction.buyNowPrice)}</div>
                    </div>
                  </div>
                )}

                {/* Bid Button */}
                <button
                  onClick={() => setShowBidModal(true)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Place bid
                </button>

                {auction.buyNowPrice && (
                  <button
                    onClick={() => {
                      if (!user) {
                        alert('Please login to use Buy Now functionality');
                        router.push('/auth/login');
                        return;
                      }
                      if (confirm(`Are you sure you want to buy this item for ${formatPrice(auction.buyNowPrice || 0)}?`)) {
                        // Handle Buy Now
                        alert('Buy Now functionality would be implemented here');
                      }
                    }}
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold mt-2"
                  >
                    Buy it now
                  </button>
                )}
              </div>

              {/* Seller Info */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Seller info</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{auction.seller}</span>
                    {auction.sellerVerified && (
                      <div className="flex items-center text-green-600">
                        <Shield className="w-4 h-4 mr-1" />
                        <span className="text-xs">Verified</span>
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">
                    <div>• 99.8% positive feedback</div>
                    <div>• 1.2K items sold</div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Contact seller
                  </button>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Shipping info</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>• Free shipping</div>
                  <div>• 30 day returns</div>
                  <div>• Ships within 3 days</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bid Modal */}
      {showBidModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Place bid</h2>
              <button
                onClick={() => {
                  setShowBidModal(false);
                  setBidAmount('');
                  setBidderName('');
                  setBidError('');
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-4">
              <h3 className="font-semibold text-lg mb-2">{auction.title}</h3>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Current bid:</span>
                  <span className="font-semibold text-gray-900">{formatPrice(auction.currentBid)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Time left:</span>
                  <span className={getTimeLeftColor(auction.endTime)}>
                    {formatTimeLeft(auction.endTime)}
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
                      min={auction.currentBid + 1}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder={`Enter ${formatPrice(auction.currentBid + 100)} or more`}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Minimum bid: {formatPrice(auction.currentBid + 1)}
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

            <div className="border-t border-gray-200 px-0 py-4 mt-4">
              <div className="flex gap-3">
                <button
                  onClick={handleBid}
                  disabled={!user}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Place bid
                </button>
                <button
                  onClick={() => {
                    setShowBidModal(false);
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
