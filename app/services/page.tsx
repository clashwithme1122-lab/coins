import { Metadata } from 'next';
import ServicesPageContent from '@/components/ServicesPageContent';
import { services, serviceFAQs } from '@/lib/data/services';

export const metadata: Metadata = {
  title: 'Professional Coin Services - Authentication, Grading & Storage | Taksila',
  description: 'Expert coin authentication, professional grading services, and secure storage solutions. PCGS & NGC certified processes with bank-level security for your valuable numismatic collection.',
  keywords: 'coin authentication, coin grading services, coin storage, PCGS, NGC, numismatic services, coin certification, rare coin storage',
  openGraph: {
    title: 'Professional Coin Services - Authentication, Grading & Storage',
    description: 'Expert coin authentication, professional grading services, and secure storage solutions for valuable numismatic collections.',
    type: 'website',
    url: 'https://taksila-nu.vercel.app/services',
    images: [
      {
        url: 'https://taksila-nu.vercel.app/assets/services/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Professional Coin Services'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional Coin Services - Authentication, Grading & Storage',
    description: 'Expert coin authentication, professional grading services, and secure storage solutions.',
    images: ['https://taksila-nu.vercel.app/assets/services/og-image.jpg']
  },
  alternates: {
    canonical: 'https://taksila-nu.vercel.app/services'
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Taksila Coin Services',
  description: 'Professional coin authentication, grading, and storage services for numismatic collectors and investors',
  url: 'https://taksila-nu.vercel.app/services',
  telephone: '+1-555-COINS',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Numismatic Way',
    addressLocality: 'Coin City',
    addressRegion: 'CC',
    postalCode: '12345',
    addressCountry: 'US'
  },
  provider: {
    '@type': 'Organization',
    name: 'Taksila',
    url: 'https://taksila-nu.vercel.app'
  },
  serviceType: [
    'Coin Authentication',
    'Coin Grading',
    'Secure Storage'
  ],
  areaServed: 'Worldwide',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Coin Services',
    itemListElement: services.map((service, index) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service.title,
        description: service.description,
        serviceType: service.id
      },
      price: service.pricing
    }))
  }
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <ServicesPageContent 
          services={services}
          serviceFAQs={serviceFAQs}
        />
      </div>
    </>
  );
}
