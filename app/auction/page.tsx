import { Metadata } from 'next';
import AuctionPageContent from '@/components/AuctionPageContent';
import { auctionItems, auctionCategories, auctionFAQs } from '@/lib/data/auctions';

export const metadata: Metadata = {
  title: 'Live Coin Auctions - Rare Coins & Numismatic Treasures | Taksila',
  description: 'Participate in live coin auctions featuring rare U.S. coins, world coins, and ancient numismatic treasures. Competitive bidding with buyer protection and authenticated items.',
  keywords: 'coin auctions, rare coin auctions, numismatic auctions, coin bidding, live auctions, certified coins, authenticated coins',
  openGraph: {
    title: 'Live Coin Auctions - Rare Coins & Numismatic Treasures',
    description: 'Participate in live coin auctions featuring rare U.S. coins, world coins, and ancient numismatic treasures.',
    type: 'website',
    url: 'https://taksila-nu.vercel.app/auction',
    images: [
      {
        url: 'https://taksila-nu.vercel.app/assets/auction/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Live Coin Auctions'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Live Coin Auctions - Rare Coins & Numismatic Treasures',
    description: 'Participate in live coin auctions featuring rare U.S. coins, world coins, and ancient numismatic treasures.',
    images: ['https://taksila-nu.vercel.app/assets/auction/og-image.jpg']
  },
  alternates: {
    canonical: 'https://taksila-nu.vercel.app/auction'
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Auction',
  name: 'Taksila Coin Auctions',
  description: 'Live and online coin auctions featuring rare numismatic items',
  url: 'https://taksila-nu.vercel.app/auction',
  organizer: {
    '@type': 'Organization',
    name: 'Taksila',
    url: 'https://taksila-nu.vercel.app'
  },
  itemOffered: auctionItems.map(item => ({
    '@type': 'Product',
    name: item.title,
    description: item.shortDesc,
    image: item.image,
    offers: {
      '@type': 'Offer',
      price: item.currentBid,
      priceCurrency: item.currency,
      availability: 'https://schema.org/InStock'
    }
  }))
};

export default function AuctionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <AuctionPageContent 
          auctionItems={auctionItems}
          auctionCategories={auctionCategories}
          auctionFAQs={auctionFAQs}
        />
      </div>
    </>
  );
}
