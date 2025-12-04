import { TrendingUp, BarChart3, DollarSign, Globe } from 'lucide-react';
import { ReactNode } from 'react';

export interface MarketInsight {
    id: string;
    title: string;
    value: string;
    change: number;
    changeType: 'increase' | 'decrease' | 'neutral';
    period: string;
    description: string;
    icon: string;
    trendData: { date: string; value: number }[];
}

export interface MarketNews {
    id: string;
    headline: string;
    summary: string;
    source: string;
    date: string;
    url: string;
    category: 'auction' | 'market' | 'regulation' | 'trend';
}

export interface SentimentIndicator {
    level: number; // 0-100
    label: string;
    description: string;
    factors: string[];
}

export const marketInsights: MarketInsight[] = [
    {
        id: 'market-volume',
        title: 'Total Market Volume',
        value: '$4.71 Billion',
        change: 5.5,
        changeType: 'increase',
        period: '2024 YTD',
        description: 'The global coin collection market reached $4.71 billion in 2024, with steady growth driven by increasing collector interest and investment demand.',
        icon: 'DollarSign',
        trendData: [
            { date: '2024-01', value: 4200 },
            { date: '2024-02', value: 4350 },
            { date: '2024-03', value: 4500 },
            { date: '2024-04', value: 4600 },
            { date: '2024-05', value: 4680 },
            { date: '2024-06', value: 4710 }
        ]
    },
    {
        id: 'auction-results',
        title: 'Major Auction Results',
        value: '$285.4 Million',
        change: 12.3,
        changeType: 'increase',
        period: 'Q3 2024',
        description: 'Major auction houses reported strong results with several record-breaking sales, indicating robust demand for high-quality rare coins.',
        icon: 'BarChart3',
        trendData: [
            { date: '2024-07', value: 245 },
            { date: '2024-08', value: 268 },
            { date: '2024-09', value: 285 }
        ]
    },
    {
        id: 'collector-growth',
        title: 'Active Collectors',
        value: '2.8 Million',
        change: 8.2,
        changeType: 'increase',
        period: '2024',
        description: 'The number of active coin collectors continues to grow globally, with significant increases in Asia-Pacific markets.',
        icon: 'Globe',
        trendData: [
            { date: '2021', value: 2.1 },
            { date: '2022', value: 2.3 },
            { date: '2023', value: 2.6 },
            { date: '2024', value: 2.8 }
        ]
    }
];

export const marketNews: MarketNews[] = [
    {
        id: 'news-001',
        headline: 'Heritage Auctions Sets Record with $18.2 Million 1804 Silver Dollar Sale',
        summary: 'A pristine 1804 silver dollar sold for $18.2 million at Heritage Auctions, setting a new world record for a U.S. coin and demonstrating continued strong demand for the rarest American numismatic treasures.',
        source: 'Heritage Auctions',
        date: '2024-11-15',
        url: 'https://www.ha.com',
        category: 'auction'
    },
    {
        id: 'news-002',
        headline: 'PCGS and NGC Announce Joint Digital Grading Platform',
        summary: 'The two leading grading services announced a collaboration to develop a unified digital platform for coin authentication and grading, streamlining the process for collectors and dealers worldwide.',
        source: 'PCGS/NGC',
        date: '2024-11-10',
        url: 'https://www.pcgs.com',
        category: 'trend'
    },
    {
        id: 'news-003',
        headline: 'Asian Market Drives 15% Growth in World Coin Collections',
        summary: 'Market analysis reveals significant growth in coin collecting across Asia-Pacific countries, with China and Japan leading the expansion in world coin acquisitions and rare coin investments.',
        source: 'Coin World Magazine',
        date: '2024-11-08',
        url: 'https://www.coinworld.com',
        category: 'market'
    },
    {
        id: 'news-004',
        headline: 'U.S. Mint Reports Record Bullion Sales for 2024',
        summary: 'The U.S. Mint announced record-breaking silver and gold bullion coin sales for 2024, with American Silver Eagle sales exceeding 50 million ounces for the first time.',
        source: 'U.S. Mint',
        date: '2024-11-05',
        url: 'https://www.usmint.gov',
        category: 'market'
    },
    {
        id: 'news-005',
        headline: 'New Regulations Proposed for Cross-Border Coin Trading',
        summary: 'International trade organizations proposed new standardized regulations for cross-border numismatic transactions, aimed at preventing illicit trade while facilitating legitimate collector commerce.',
        source: 'International Numismatic Council',
        date: '2024-11-01',
        url: 'https://www.incouncil.org',
        category: 'regulation'
    },
    {
        id: 'news-006',
        headline: 'Blockchain Technology Verified for Coin Authentication',
        summary: 'Major grading services successfully implemented blockchain-based verification systems for coin authentication, providing enhanced security and transparency for rare coin transactions.',
        source: 'Numismatic News',
        date: '2024-10-28',
        url: 'https://www.numismaticnews.net',
        category: 'trend'
    }
];

export const collectorSentiment: SentimentIndicator = {
    level: 78,
    label: 'Optimistic',
    description: 'Collector sentiment remains strongly positive, driven by robust auction results, growing market participation, and technological innovations in authentication and trading.',
    factors: [
        'Strong auction prices across all market segments',
        'Increased participation from new collectors',
        'Improved authentication and grading technologies',
        'Growing international market expansion',
        'Stable precious metals prices supporting bullion demand'
    ]
};

export const marketTrends = [
    {
        category: 'Ancient Coins',
        trend: 'Rising',
        description: 'Increased interest in Greek and Roman coins, particularly high-quality examples with historical significance.',
        growth: 12.5
    },
    {
        category: 'U.S. Type Coins',
        trend: 'Stable',
        description: 'Classic American coins maintain steady demand with particular strength in Morgan dollars and Walking Liberty halves.',
        growth: 3.2
    },
    {
        category: 'World Coins',
        trend: 'Rising',
        description: 'International coins showing strong growth, especially from European and Asian mints.',
        growth: 8.7
    },
    {
        category: 'Bullion Coins',
        trend: 'Strong',
        description: 'Precious metals coins benefiting from economic uncertainty and inflation concerns.',
        growth: 15.3
    }
];

export const priceIndicators = [
    {
        indicator: 'Gold Coin Index',
        current: 2456.8,
        change: 2.3,
        period: '1 Month',
        description: 'Tracking premium gold coin values across major series'
    },
    {
        indicator: 'Silver Dollar Index',
        current: 89.2,
        change: -1.2,
        period: '1 Month',
        description: 'Morgan and Peace silver dollar market performance'
    },
    {
        indicator: 'Rare Coin Index',
        current: 156.4,
        change: 5.8,
        period: '1 Month',
        description: 'Overall rare coin market performance across all categories'
    }
];
