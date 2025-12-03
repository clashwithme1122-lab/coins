import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import CoinDetailsClient from '@/components/CoinDetailsClient'
import coinsData from '@/data/coins.json'

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
  const coins: Coin[] = coinsData as Coin[]
  return coins.find(coin => coin.id === parseInt(id)) || null
}

export async function generateStaticParams() {
  const coins: Coin[] = coinsData as Coin[]
  return coins.map(coin => ({
    id: coin.id.toString()
  }))
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
