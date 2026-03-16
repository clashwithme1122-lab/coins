import { Metadata } from 'next'
import BlogPageClient from './page-client'

export const metadata: Metadata = {
  title: 'Numismatic Intelligence | Antique Coin Experts Blog',
  description: 'Deep dives into historical coin discoveries, authentication guides, and rare coin market trends. Learn from 30+ years of numismatic expertise.',
}

export default function BlogPage() {
  return <BlogPageClient />
}
