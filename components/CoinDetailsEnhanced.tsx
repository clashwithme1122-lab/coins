'use client';

import { Shield, Award, Globe, Scale, Clock, TrendingUp } from 'lucide-react';

interface CoinDetailsEnhancedProps {
  coin: {
    metal?: string;
    purity?: string;
    diameter?: string;
    thickness?: string;
    mint?: string;
    grade?: string;
    rarity?: 'common' | 'uncommon' | 'rare' | 'extremely rare';
    condition?: string;
    provenance?: string;
    historicalContext?: string;
    marketTrend?: 'stable' | 'increasing' | 'decreasing';
  };
}

export default function CoinDetailsEnhanced({ coin }: CoinDetailsEnhancedProps) {
  const getRarityColor = (rarity?: string) => {
    switch (rarity) {
      case 'extremely rare': return 'text-red-600 bg-red-50';
      case 'rare': return 'text-orange-600 bg-orange-50';
      case 'uncommon': return 'text-yellow-600 bg-yellow-50';
      case 'common': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getMarketTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'decreasing': return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />;
      default: return <TrendingUp className="w-4 h-4 text-gray-600 rotate-90" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Authentication & Grading */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Shield className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Authentication & Grading</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <Award className="w-5 h-5 text-purple-600" />
            <div>
              <div className="font-medium text-gray-900">Grade: {coin.grade || 'Not specified'}</div>
              <div className="text-sm text-gray-600">Professional numismatic grading</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Globe className="w-5 h-5 text-green-600" />
            <div>
              <div className="font-medium text-gray-900">Mint: {coin.mint || 'Unknown'}</div>
              <div className="text-sm text-gray-600">Original mint location</div>
            </div>
          </div>
        </div>
      </div>

      {/* Physical Specifications */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Physical Specifications</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-sm text-gray-600 mb-1">Metal</div>
            <div className="font-medium text-gray-900">{coin.metal || 'Not specified'}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">Purity</div>
            <div className="font-medium text-gray-900">{coin.purity || 'Not specified'}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">Diameter</div>
            <div className="font-medium text-gray-900">{coin.diameter || 'Not specified'}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">Thickness</div>
            <div className="font-medium text-gray-900">{coin.thickness || 'Not specified'}</div>
          </div>
        </div>
      </div>

      {/* Rarity & Condition */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Rarity & Condition</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-sm text-gray-600 mb-2">Rarity Level</div>
            <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getRarityColor(coin.rarity)}`}>
              {coin.rarity ? coin.rarity.charAt(0).toUpperCase() + coin.rarity.slice(1) : 'Not specified'}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-2">Condition</div>
            <div className="font-medium text-gray-900">{coin.condition || 'Not specified'}</div>
          </div>
        </div>
      </div>

      {/* Historical Context */}
      {coin.historicalContext && (
        <div className="bg-amber-50 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="w-6 h-6 text-amber-600" />
            <h3 className="text-lg font-semibold text-gray-900">Historical Context</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">{coin.historicalContext}</p>
        </div>
      )}

      {/* Provenance */}
      {coin.provenance && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Provenance</h3>
          <p className="text-gray-700 leading-relaxed">{coin.provenance}</p>
        </div>
      )}

      {/* Market Information */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Information</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {getMarketTrendIcon(coin.marketTrend)}
            <span className="font-medium text-gray-900">
              Market Trend: {coin.marketTrend ? coin.marketTrend.charAt(0).toUpperCase() + coin.marketTrend.slice(1) : 'Unknown'}
            </span>
          </div>
        </div>
      </div>

      {/* Investment Highlights */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="w-6 h-6 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">Investment Highlights</h3>
        </div>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
            <span>Historically significant piece with documented provenance</span>
          </li>
          <li className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
            <span>Professional grading ensures authenticity and condition verification</span>
          </li>
          <li className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
            <span>Rarity level indicates strong collector demand and potential appreciation</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
