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

  useEffect(() => {
    if (params.id) {
      fetchAuction(parseInt(params.id as string));
    }
  }, [params.id]);

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
    if (!auction || !bidAmount || !bidderName) return;

    try {
      const response = await fetch('/api/auctions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'place_bid',
          auctionId: auction.id,
          bidAmount: parseFloat(bidAmount),
          bidderName
        })
      });

      const result = await response.json();
      if (result.success) {
        setAuction(result.data);
        setShowBidModal(false);
        setBidAmount('');
        setBidderName('');
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error('Error placing bid:', error);
      alert('Failed to place bid');
    }
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
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/auction"
              className="flex items-center text-purple-600 hover:text-purple-700"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Auctions
            </Link>
            <div className="flex items-center space-x-2">
              {auction.sellerVerified && (
                <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  <Shield className="w-4 h-4 mr-1" />
                  Verified Seller
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Main Image */}
              <div className="relative aspect-square">
                <img
                  src={auction.images[selectedImage] || auction.image}
                  alt={auction.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {auction.category}
                </div>
              </div>

              {/* Image Gallery */}
              {auction.images.length > 1 && (
                <div className="p-4 border-t">
                  <div className="grid grid-cols-4 gap-2">
                    {[auction.image, ...auction.images].map((img, index) => (
                      <div key={index} className={selectedImage === index ? 'ring-2 ring-purple-600' : ''}>
                        <button
                          onClick={() => setSelectedImage(index)}
                          className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200 hover:border-purple-600 transition-colors"
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

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Title and Description */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{auction.title}</h1>
              <p className="text-gray-600 mb-6">{auction.description}</p>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <span className="text-sm text-gray-500">Year</span>
                  <p className="font-semibold">{auction.year}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <span className="text-sm text-gray-500">Mint</span>
                  <p className="font-semibold">{auction.mint}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <span className="text-sm text-gray-500">Grade</span>
                  <p className="font-semibold">{auction.grade}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <span className="text-sm text-gray-500">Certification</span>
                  <p className="font-semibold">{auction.certification}</p>
                </div>
              </div>

              {/* Physical Details */}
              {(auction.weight || auction.diameter || auction.composition) && (
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Physical Details</h3>
                  <div className="space-y-2 text-sm">
                    {auction.weight && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Weight:</span>
                        <span className="font-medium">{auction.weight}</span>
                      </div>
                    )}
                    {auction.diameter && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Diameter:</span>
                        <span className="font-medium">{auction.diameter}</span>
                      </div>
                    )}
                    {auction.composition && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Composition:</span>
                        <span className="font-medium">{auction.composition}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Bidding Section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-sm text-gray-500">Current Bid</span>
                    <p className="text-3xl font-bold text-purple-600">{formatPrice(auction.currentBid)}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-500">Total Bids</span>
                    <p className="text-2xl font-bold text-gray-900">{auction.bidCount}</p>
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Clock className="w-4 h-4 mr-1" />
                  {auction.timeLeft}
                </div>

                {auction.buyNowPrice && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                    <p className="text-sm text-green-800">
                      <strong>Buy Now Price:</strong> {formatPrice(auction.buyNowPrice)}
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={() => setShowBidModal(true)}
                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
              >
                Place Bid
              </button>
            </div>

            {/* Seller Info */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Seller Information</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{auction.seller}</p>
                  {auction.sellerVerified && (
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <Shield className="w-4 h-4 mr-1" />
                      Verified Seller
                    </p>
                  )}
                </div>
                <button className="text-purple-600 hover:text-purple-700">
                  Contact Seller
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bidding History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8"
        >
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Bidding History</h2>
            {auction.bids.length > 0 ? (
              <div className="space-y-3">
                {auction.bids.map((bid) => (
                  <div key={bid.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium">{bid.bidder}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(bid.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold text-purple-600">{formatPrice(bid.amount)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No bids yet. Be the first to bid!</p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Bid Modal */}
      {showBidModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">Place Your Bid</h2>
            
            <div className="mb-4">
              <h3 className="font-semibold text-lg mb-2">{auction.title}</h3>
              <p className="text-gray-600">Current Bid: {formatPrice(auction.currentBid)}</p>
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
                  min={auction.currentBid + 1}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                  placeholder={formatPrice(auction.currentBid + 100)}
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
