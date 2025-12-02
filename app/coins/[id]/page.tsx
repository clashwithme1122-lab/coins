import { Metadata } from 'next'
import { promises as fs } from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
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

async function getCoin(id: string): Promise<Coin | null> {
  try {
    const coinsPath = path.join(process.cwd(), 'data', 'coins.json')
    const coinsData = await fs.readFile(coinsPath, 'utf-8')
    const coins: Coin[] = JSON.parse(coinsData)
    return coins.find(coin => coin.id === parseInt(id)) || null
  } catch (error) {
    // Return dummy data if file doesn't exist
    const dummyCoins: Coin[] = [
      {
        id: 1,
        title: "Ancient Roman Denarius",
        price: "$2,450",
        weight: "3.8g",
        year: "150 AD",
        description: "Rare silver denarius from Emperor Marcus Aurelius reign. This exceptional coin features the portrait of the emperor on the obverse and various military symbols on the reverse. The coin has been professionally graded and authenticated by leading numismatic experts.",
        frontImage: "/assets/dummycoin.jpg",
        backImage: "/assets/dummycoin.jpg",
        weightImage: "/assets/dummycoinweight.jpg",
        historicalValue: "Extremely rare - Only 200 known specimens in existence"
      }
    ]
    return dummyCoins.find(coin => coin.id === parseInt(id)) || null
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const coin = await getCoin(id)
  
  if (!coin) {
    return {
      title: 'Coin Not Found - Taksila Coins',
      description: 'The requested coin could not be found.',
    }
  }

  return {
    title: `${coin.title} - Taksila Coins`,
    description: coin.description,
  }
}

export default async function CoinDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const coin = await getCoin(id)

  if (!coin) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/coins" 
            className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Coins
          </Link>
        </div>
      </div>

      {/* Coin Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CoinDetailsClient coin={coin} />
      </div>
    </div>
  )
}
