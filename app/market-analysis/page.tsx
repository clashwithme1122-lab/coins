import { Metadata } from 'next';
import MarketAnalysisPageContent from '@/components/MarketAnalysisPageContent';
import { marketInsights, marketNews, collectorSentiment, marketTrends, priceIndicators } from '@/lib/data/marketAnalysis';

export const metadata: Metadata = {
  title: 'Coin Market Analysis & Trends - Numismatic Market Data | Taksila',
  description: 'Real-time coin market analysis, price trends, and collector sentiment indicators. Comprehensive dashboard for numismatic market insights and investment data.',
  keywords: 'coin market analysis, numismatic trends, coin prices, collector sentiment, market data, rare coin values, investment trends',
  openGraph: {
    title: 'Coin Market Analysis & Trends - Numismatic Market Data',
    description: 'Real-time coin market analysis, price trends, and collector sentiment indicators for informed numismatic investment decisions.',
    type: 'website',
    url: 'https://taksila-nu.vercel.app/market-analysis',
    images: [
      {
        url: 'https://taksila-nu.vercel.app/assets/market-analysis/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Coin Market Analysis Dashboard'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coin Market Analysis & Trends - Numismatic Market Data',
    description: 'Real-time coin market analysis, price trends, and collector sentiment indicators for informed numismatic investment decisions.',
    images: ['https://taksila-nu.vercel.app/assets/market-analysis/og-image.jpg']
  },
  alternates: {
    canonical: 'https://taksila-nu.vercel.app/market-analysis'
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Coin Market Analysis & Trends',
  description: 'Comprehensive coin market analysis dashboard with real-time data, price trends, and collector sentiment indicators',
  url: 'https://taksila-nu.vercel.app/market-analysis',
  mainEntity: {
    '@type': 'Dataset',
    name: 'Numismatic Market Data',
    description: 'Real-time and historical data on coin market trends, prices, and collector sentiment'
  },
  provider: {
    '@type': 'Organization',
    name: 'Taksila',
    url: 'https://taksila-nu.vercel.app'
  }
};

export default function MarketAnalysisPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
        <MarketAnalysisPageContent 
          marketInsights={marketInsights}
          marketNews={marketNews}
          collectorSentiment={collectorSentiment}
          marketTrends={marketTrends}
          priceIndicators={priceIndicators}
        />
      </div>
    </>
  );
}
