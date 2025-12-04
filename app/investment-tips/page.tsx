import { Metadata } from 'next';
import InvestmentTipsPageContent from '@/components/InvestmentTipsPageContent';
import { investmentTips, investmentChecklist, portfolioAllocation } from '@/lib/data/investmentTips';

export const metadata: Metadata = {
  title: 'Coin Investment Strategies & Tips - Numismatic Investment Guide | Taksila',
  description: 'Comprehensive guide to investing in rare coins and numismatic treasures. Learn portfolio diversification, risk management, and long-term strategies for coin collecting investments.',
  keywords: 'coin investment, numismatic investing, rare coin investment, coin collection investment, portfolio diversification, coin grading investment',
  openGraph: {
    title: 'Coin Investment Strategies & Tips - Numismatic Investment Guide',
    description: 'Comprehensive guide to investing in rare coins and numismatic treasures with expert strategies and risk management.',
    type: 'article',
    url: 'https://taksila-nu.vercel.app/investment-tips',
    images: [
      {
        url: 'https://taksila-nu.vercel.app/assets/investment-tips/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Coin Investment Strategies'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coin Investment Strategies & Tips - Numismatic Investment Guide',
    description: 'Comprehensive guide to investing in rare coins and numismatic treasures with expert strategies and risk management.',
    images: ['https://taksila-nu.vercel.app/assets/investment-tips/og-image.jpg']
  },
  alternates: {
    canonical: 'https://taksila-nu.vercel.app/investment-tips'
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Comprehensive Guide to Coin Investment Strategies',
  description: 'Learn professional strategies for investing in rare coins and numismatic treasures, including portfolio diversification, risk management, and market analysis.',
  author: {
    '@type': 'Organization',
    name: 'Taksila'
  },
  publisher: {
    '@type': 'Organization',
    name: 'Taksila',
    url: 'https://taksila-nu.vercel.app'
  },
  datePublished: '2024-12-01',
  dateModified: '2024-12-01',
  url: 'https://taksila-nu.vercel.app/investment-tips',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://taksila-nu.vercel.app/investment-tips'
  }
};

export default function InvestmentTipsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <InvestmentTipsPageContent 
          investmentTips={investmentTips}
          investmentChecklist={investmentChecklist}
          portfolioAllocation={portfolioAllocation}
        />
      </div>
    </>
  );
}
