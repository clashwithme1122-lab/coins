import { Metadata } from 'next'
import CoinsPageClient from './page-client'

export const metadata: Metadata = {
  title: 'Rare Coins For Sale | Authenticated Roman, Greek & Mughal',
  description: 'Shop our curated collection of authenticated historical coins. Secure Roman denarius, gold Mughal mohurs, and British India silver coins directly from expert numismatists.',
}

export default function CoinsPage() {
  return <CoinsPageClient />
}
