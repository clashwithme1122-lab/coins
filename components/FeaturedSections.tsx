'use client';

import Link from 'next/link';
import { ArrowRight, Clock, TrendingUp, Star } from 'lucide-react';
import { useGlobal } from '@/contexts/GlobalContext';

export default function FeaturedSections() {
  const { formatPrice } = useGlobal();

  // Mock data for featured sections
  const newArrivals = [
    { id: 1, title: "Roman Denarius - 98 BC", price: 2500, image: "/coins/roman-denarius.jpg", badge: "New" },
    { id: 2, title: "Greek Drachm - 400 BC", price: 3200, image: "/coins/greek-drachm.jpg", badge: "Rare" },
    { id: 3, title: "Byzantine Solidus", price: 1800, image: "/coins/byzantine-solidus.jpg", badge: "New" },
  ];

  const endingSoon = [
    { id: 4, title: "Morgan Silver Dollar", price: 850, timeLeft: "2h 15m", bids: 12 },
    { id: 5, title: "Ancient Persian Coin", price: 1200, timeLeft: "5h 30m", bids: 8 },
    { id: 6, title: "Medieval European Coin", price: 950, timeLeft: "1d 3h", bids: 15 },
  ];

  const investorPicks = [
    { id: 7, title: "Gold Aureus - Roman Empire", price: 8500, trend: "up", roi: "+12%" },
    { id: 8, title: "Silver Tetradrachm", price: 4200, trend: "up", roi: "+8%" },
    { id: 9, title: "Ancient Gold Stater", price: 6800, trend: "stable", roi: "+5%" },
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* New Arrivals */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">New Arrivals</h2>
              <p className="text-gray-600">Fresh additions to our collection</p>
            </div>
            <Link 
              href="/coins?filter=new" 
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
            >
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newArrivals.map((coin) => (
              <div key={coin.id} className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative">
                  <div className="h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
                    <span className="text-gray-400">Coin Image</span>
                  </div>
                  <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                    {coin.badge}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{coin.title}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-blue-600">{formatPrice(coin.price)}</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Ending Soon Auctions */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Ending Soon</h2>
              <p className="text-gray-600">Last chance to bid on these rare coins</p>
            </div>
            <Link 
              href="/auction?filter=ending-soon" 
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
            >
              View All Auctions
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {endingSoon.map((coin) => (
              <div key={coin.id} className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative">
                  <div className="h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
                    <span className="text-gray-400">Coin Image</span>
                  </div>
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {coin.timeLeft}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{coin.title}</h3>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xl font-bold text-blue-600">{formatPrice(coin.price)}</span>
                    <span className="text-sm text-gray-600">{coin.bids} bids</span>
                  </div>
                  <button className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
                    Place Bid
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Investor Picks */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Investor Picks</h2>
              <p className="text-gray-600">High-potential coins for serious collectors</p>
            </div>
            <Link 
              href="/coins?filter=investor" 
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
            >
              View Investment Guide
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {investorPicks.map((coin) => (
              <div key={coin.id} className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative">
                  <div className="h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
                    <span className="text-gray-400">Coin Image</span>
                  </div>
                  <div className="absolute top-2 left-2 bg-purple-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {coin.roi}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{coin.title}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-blue-600">{formatPrice(coin.price)}</span>
                    <div className="flex items-center text-sm">
                      {coin.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                      ) : (
                        <TrendingUp className="w-4 h-4 text-gray-600 mr-1 rotate-90" />
                      )}
                      <span className={coin.trend === 'up' ? 'text-green-600' : 'text-gray-600'}>
                        {coin.trend === 'up' ? 'Rising' : 'Stable'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
