import { notFound } from 'next/navigation'
import { promises as fs } from 'fs'
import path from 'path'
import ThemeWrapper from '@/components/ThemeWrapper'
import CoinDetailsClient from '@/components/CoinDetailsClient'

interface Coin {
  id: number
  title: string
  price: string
  weight: string
  year: string
  description: string
  frontImage: string
  backImage: string
  weightImage: string
  historicalValue?: string
}

async function getCoinData(slug: string): Promise<Coin | null> {
  try {
    const coinsPath = path.join(process.cwd(), 'data', 'coins.json')
    const coinsData = await fs.readFile(coinsPath, 'utf-8')
    const coins: Coin[] = JSON.parse(coinsData)
    return coins.find(coin => coin.id.toString() === slug) || null
  } catch (error) {
    console.error('Error loading coin data:', error)
    return null
  }
}

export default async function CoinPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const coin = await getCoinData(slug)

  if (!coin) {
    notFound()
  }

  return (
    <ThemeWrapper>
      <div className="py-16" id="coin-details-root">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CoinDetailsClient coin={coin} />
        </div>
      </div>
    </ThemeWrapper>
  )
}