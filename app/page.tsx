import { Metadata } from 'next'
import HomePageClient from './page-client'

export const metadata: Metadata = {
  title: 'Buy & Sell Authentic Rare Coins Online | Taksila Coins',
  description: 'Join thousands of collectors on Pakistan’s premier antique coin marketplace. Buy and sell authenticated Roman, Greek, Mughal, and British India coins safely.',
}

export default function HomePage() {
  return <HomePageClient />
}
