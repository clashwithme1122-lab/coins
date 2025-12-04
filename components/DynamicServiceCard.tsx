'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Shield, DollarSign, Info, ChevronRight, Star, Award, Warehouse } from 'lucide-react';

const iconMap = {
  Shield,
  Award,
  Warehouse,
  Clock,
  DollarSign,
  Info,
  Star
};

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  pricing: string;
  turnaround: string;
  features: string[];
  learnMoreUrl?: string;
  trustBadges?: string[];
  delay?: number;
}

export default function DynamicServiceCard({
  title,
  description,
  icon,
  pricing,
  turnaround,
  features,
  learnMoreUrl = '#',
  trustBadges = [],
  delay = 0
}: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const IconComponent = iconMap[icon as keyof typeof iconMap] || Shield;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <IconComponent className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label={`Toggle ${title} details`}
          >
            <Info className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>

        {/* Key Info */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Pricing:</span>
            <span className="text-sm text-gray-600">{pricing}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Turnaround:</span>
            <span className="text-sm text-gray-600">{turnaround}</span>
          </div>
        </div>

        {/* Features */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Features:</h4>
          <ul className="space-y-1">
            {features.slice(0, isExpanded ? features.length : 3).map((feature, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
          {features.length > 3 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2"
            >
              {isExpanded ? 'Show less' : `Show ${features.length - 3} more`}
            </button>
          )}
        </div>

        {/* Trust Badges */}
        {trustBadges.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {trustBadges.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-1 px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs"
                >
                  <Shield className="w-3 h-3" />
                  <span>{badge}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <a
          href={learnMoreUrl}
          className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          <span>Learn More</span>
          <ChevronRight className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
}
