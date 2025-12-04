'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Shield, BookOpen, Target, Lightbulb, ArrowRight } from 'lucide-react';

const iconMap = {
  Target,
  Shield,
  TrendingUp,
  BookOpen
};

interface InvestmentTipCardProps {
  title: string;
  description: string;
  category: 'strategy' | 'risk' | 'opportunity' | 'education';
  icon: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  readTime: number;
  keyTakeaways: string[];
  delay?: number;
}

export default function InvestmentTipCard({
  title,
  description,
  category,
  icon,
  difficulty,
  readTime,
  keyTakeaways,
  delay = 0
}: InvestmentTipCardProps) {
  const IconComponent = iconMap[icon as keyof typeof iconMap] || Target;
  
  const getCategoryColor = () => {
    switch (category) {
      case 'strategy':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'risk':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'opportunity':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'education':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-600';
      case 'intermediate':
        return 'text-yellow-600';
      case 'advanced':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getCategoryIcon = () => {
    switch (category) {
      case 'strategy':
        return <Target className="w-4 h-4" />;
      case 'risk':
        return <Shield className="w-4 h-4" />;
      case 'opportunity':
        return <TrendingUp className="w-4 h-4" />;
      case 'education':
        return <BookOpen className="w-4 h-4" />;
      default:
        return <Lightbulb className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <IconComponent className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{title}</h3>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor()}`}>
                  {getCategoryIcon()}
                  <span className="capitalize">{category}</span>
                </span>
                <span className={`text-xs font-medium ${getDifficultyColor()}`}>
                  {difficulty}
                </span>
                <span className="text-xs text-gray-500">• {readTime} min read</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>

        {/* Key Takeaways */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Takeaways:</h4>
          <ul className="space-y-2">
            {keyTakeaways.slice(0, 3).map((takeaway, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm text-gray-600">{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between">
          <button className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium text-sm group-hover:space-x-3 transition-all duration-200">
            <span>Read More</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </motion.div>
  );
}
