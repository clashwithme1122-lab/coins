'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, BarChart3, Calendar, Eye, ArrowUp, ArrowDown, Minus, DollarSign, Globe } from 'lucide-react';

const iconMap = {
  DollarSign,
  BarChart3,
  Globe,
  TrendingUp,
  TrendingDown
};

interface MarketAnalysisCardProps {
  title: string;
  value: string;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  period: string;
  description: string;
  icon: string;
  trendData?: { date: string; value: number }[];
  delay?: number;
}

export default function MarketAnalysisCard({
  title,
  value,
  change,
  changeType,
  period,
  description,
  icon,
  trendData = [],
  delay = 0
}: MarketAnalysisCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const IconComponent = iconMap[icon as keyof typeof iconMap] || BarChart3;

  const getChangeColor = () => {
    switch (changeType) {
      case 'increase':
        return 'text-green-600 bg-green-50';
      case 'decrease':
        return 'text-red-600 bg-red-50';
      case 'neutral':
        return 'text-gray-600 bg-gray-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getChangeIcon = () => {
    switch (changeType) {
      case 'increase':
        return <ArrowUp className="w-4 h-4" />;
      case 'decrease':
        return <ArrowDown className="w-4 h-4" />;
      case 'neutral':
        return <Minus className="w-4 h-4" />;
      default:
        return <Minus className="w-4 h-4" />;
    }
  };

  const formatChange = (value: number) => {
    const sign = value > 0 ? '+' : '';
    return `${sign}${value}%`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <IconComponent className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">{title}</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Calendar className="w-3 h-3" />
                <span>{period}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label={`Toggle ${title} details`}
          >
            <Eye className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Main Value */}
        <div className="mb-4">
          <div className="text-2xl font-bold text-gray-900 mb-2">{value}</div>
          <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-sm font-medium ${getChangeColor()}`}>
            {getChangeIcon()}
            <span>{formatChange(change)}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4">{description}</p>

        {/* Mini Chart Preview */}
        {trendData.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <BarChart3 className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Trend Overview</span>
            </div>
            <div className="h-16 flex items-end space-x-1">
              {trendData.slice(-7).map((data, index) => {
                const maxValue = Math.max(...trendData.slice(-7).map(d => d.value));
                const height = (data.value / maxValue) * 100;
                const isPositive = data.value > (trendData[index - 1]?.value || 0);
                
                return (
                  <div
                    key={index}
                    className="flex-1 bg-blue-500 rounded-t"
                    style={{ height: `${height}%` }}
                    title={`${data.date}: ${data.value}`}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Expanded Details */}
        {isExpanded && trendData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t pt-4"
          >
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Recent Data Points</h4>
            <div className="space-y-1">
              {trendData.slice(-5).reverse().map((data, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-500">{data.date}</span>
                  <span className="font-medium text-gray-900">{data.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
