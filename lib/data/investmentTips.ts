import { Target, Shield, TrendingUp, BookOpen } from 'lucide-react';
import { ReactNode } from 'react';

export interface InvestmentTip {
    id: string;
    title: string;
    description: string;
    category: 'strategy' | 'risk' | 'opportunity' | 'education';
    icon: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    readTime: number;
    keyTakeaways: string[];
    content: string;
}

export const investmentTips: InvestmentTip[] = [
    {
        id: 'portfolio-diversification',
        title: 'Building a Diversified Numismatic Portfolio',
        description: 'Learn how to create a balanced coin collection that minimizes risk while maximizing potential returns through strategic diversification across different coin types, metals, and historical periods.',
        category: 'strategy',
        icon: 'Target',
        difficulty: 'intermediate',
        readTime: 8,
        keyTakeaways: [
            'Diversify across U.S., world, and ancient coins',
            'Include both bullion and numismatic pieces',
            'Balance different precious metals (gold, silver, platinum)',
            'Consider various grade levels and price points',
            'Maintain liquidity with some easily sellable pieces'
        ],
        content: 'A well-diversified numismatic portfolio should include classic United States coins such as half cents, large cents, early nickels, dimes, quarters, half dollars and silver dollars. You may also choose to invest in precious metals such as gold bullion coins. Classic gold coins ranging from one dollar gold coins through $20 gold double eagles will also provide diversification in your rare coin portfolio.'
    },
    {
        id: 'risk-management',
        title: 'Understanding and Managing Investment Risks',
        description: 'Essential strategies for identifying, assessing, and mitigating risks in coin collecting investments, including market volatility, counterfeit concerns, and liquidity challenges.',
        category: 'risk',
        icon: 'Shield',
        difficulty: 'beginner',
        readTime: 6,
        keyTakeaways: [
            'Always buy certified, graded coins from reputable dealers',
            'Diversify to reduce concentration risk',
            'Understand market cycles and timing',
            'Maintain proper insurance for valuable collections',
            'Stay informed about market trends and news'
        ],
        content: 'Risk management is crucial for successful coin investing. The primary risks include counterfeit coins, market . . .'
    },
    {
        id: 'market-opportunities',
        title: 'Identifying Emerging Market Opportunities',
        description: 'Discover how to spot undervalued coins and emerging collecting trends that offer significant growth potential in the current numismatic market.',
        category: 'opportunity',
        icon: 'TrendingUp',
        difficulty: 'advanced',
        readTime: 10,
        keyTakeaways: [
            'Research historical price trends and patterns',
            'Monitor auction results and market indicators',
            'Identify collecting trends among younger demographics',
            'Research emerging markets and international opportunities'
        ],
        content: 'Market opportunities in numismatics require careful analysis of emerging trends and demographic shifts. Younger collectors are showing increased interest in modern commemoratives and coins with historical significance, while international markets are experiencing rapid growth.'
    },
    {
        id: 'grading-education',
        title: 'Mastering Coin Grading for Investment Success',
        description: 'Comprehensive guide to understanding coin grading systems, how grading affects value, and using grading knowledge to make better investment decisions.',
        category: 'education',
        icon: 'BookOpen',
        difficulty: 'intermediate',
        readTime: 12,
        keyTakeaways: [
            'Learn the Sheldon Scale (1-70) grading system',
            'Understand how grading affects market value',
            'Recognize grading inconsistencies between services',
            'Develop your own grading skills for better evaluation',
            'Use third-party grading for authentication and value',
            'Understand the importance of coin preservation'
        ],
        content: 'Coin grading is the foundation of numismatic investing. The Sheldon Scale, ranging from 1 to 70, provides a standardized method for assessing coin condition. Understanding this system is essential for making informed investment decisions.'
    }
];

export const investmentChecklist = [
    'Research the coin\'s historical significance and rarity',
    'Verify authenticity through reputable grading services',
    'Compare recent auction prices and market trends',
    'Assess the coin\'s condition and eye appeal',
    'Consider the seller\'s reputation and return policy',
    'Evaluate long-term appreciation potential',
    'Plan for proper storage and insurance',
    'Understand tax implications of coin investments',
    'Set a maximum bid or purchase price',
    'Keep detailed records of all transactions'
];

export const portfolioAllocation = [
    { category: 'U.S. Type Coins', percentage: 25, description: 'Classic American coins like Morgan dollars, Walking Liberty halves' },
    { category: 'World Coins', percentage: 20, description: 'International coins from major mints and historical periods' },
    { category: 'Ancient Coins', percentage: 15, description: 'Greek, Roman, and other ancient civilizations' },
    { category: 'Bullion/Precious Metals', percentage: 20, description: 'Gold and silver coins for metal value backing' },
    { category: 'Modern Commemoratives', percentage: 10, description: 'Limited edition modern issues and proof sets' },
    { category: 'Currency/Tokens', percentage: 10, description: 'Paper money, medals, and historical tokens' }
];
