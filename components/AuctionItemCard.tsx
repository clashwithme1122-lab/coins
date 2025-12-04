'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingUp, Users, Award, ExternalLink, Heart, Star } from 'lucide-react';
import CountdownTimer from './CountdownTimer';

interface AuctionItemProps {
  id: string;
  title: string;
  shortDesc: string;
  detailedDesc: string;
  image: string;
  startBid: number;
  currentBid: number;
  currency: string;
  startDate: string;
  endDate: string;
  seller: {
    name: string;
    rating: number;
  };
  provenance?: string;
  sku: string;
  bidderCount?: number;
  delay?: number;
}

export default function AuctionItemCard({
  id,
  title,
  shortDesc,
  detailedDesc,
  image,
  startBid,
  currentBid,
  currency,
  startDate,
  endDate,
  seller,
  provenance,
  sku,
  bidderCount = 0,
  delay = 0
}: AuctionItemProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [showBidModal, setShowBidModal] = useState(false);
  const [bidAmount, setBidAmount] = useState(currentBid + 100);
  const [isEndingSoon, setIsEndingSoon] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(endDate).getTime() - new Date().getTime();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        
        setTimeLeft({ days, hours, minutes, seconds });
        setIsEndingSoon(days === 0 && hours < 24);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handlePlaceBid = () => {
    setShowBidModal(true);
  };

  const handleBidSubmit = () => {
    if (bidAmount > currentBid) {
      // Here you would normally send the bid to your backend
      alert(`Bid placed successfully: ${formatPrice(bidAmount)}`);
      setShowBidModal(false);
      // Update current bid and bidder count
      // setCurrentBid(bidAmount);
      // setBidderCount(prev => prev + 1);
    } else {
      alert('Bid must be higher than current bid');
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Here you would normally save to backend/localStorage
    const message = isFavorite ? 'Removed from favorites' : 'Added to favorites';
    console.log(message);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
        isEndingSoon ? 'ring-2 ring-red-500' : ''
      }`}
    >
      {/* Image Container */}
      <div className="relative h-48 bg-gray-100">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://source.unsplash.com/400x300/?coin,auction`;
          }}
        />
        
        {/* Ending Soon Badge */}
        {isEndingSoon && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            Ending Soon
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-2 left-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
          aria-label="Add to favorites"
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'
            }`}
          />
        </button>

        {/* SKU */}
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
          SKU: {sku}
        </div>
      </div>

      <div className="p-4">
        {/* Title and Description */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">{title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{shortDesc}</p>
        </div>

        {/* Bidding Info */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="flex items-center space-x-1 mb-1">
              <TrendingUp className="w-3 h-3 text-green-600" />
              <span className="text-xs text-gray-500">Current Bid</span>
            </div>
            <div className="text-lg font-bold text-gray-900">{formatPrice(currentBid)}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="flex items-center space-x-1 mb-1">
              <Users className="w-3 h-3 text-blue-600" />
              <span className="text-xs text-gray-500">Bidders</span>
            </div>
            <div className="text-lg font-bold text-gray-900">{bidderCount}</div>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="mb-3">
          <CountdownTimer timeLeft={timeLeft} />
        </div>

        {/* Seller Info */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-blue-600">
                {seller.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">{seller.name}</div>
              <div className="flex items-center space-x-1">
                {renderStars(seller.rating)}
                <span className="text-xs text-gray-500">({seller.rating}.0)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Provenance */}
        {provenance && (
          <div className="mb-3">
            <div className="flex items-center space-x-1 mb-1">
              <Award className="w-3 h-3 text-purple-600" />
              <span className="text-xs font-medium text-gray-700">Provenance</span>
            </div>
            <p className="text-xs text-gray-600 line-clamp-2">{provenance}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button 
            onClick={handlePlaceBid}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            Place Bid
          </button>
          <button 
            onClick={toggleFavorite}
            className={`p-2 border rounded-lg transition-colors ${
              isFavorite 
                ? 'bg-red-50 border-red-300 hover:bg-red-100' 
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
          </button>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <ExternalLink className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Bid Modal */}
        {showBidModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Place Your Bid</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bid Amount (USD)
                </label>
                <input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(Number(e.target.value))}
                  min={currentBid + 1}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Minimum bid: {formatPrice(currentBid + 1)}
                </p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleBidSubmit}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Confirm Bid
                </button>
                <button
                  onClick={() => setShowBidModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
