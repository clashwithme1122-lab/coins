import { NextRequest, NextResponse } from 'next/server'
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

async function getCoins(): Promise<Coin[]> {
    return coinsData as Coin[]
}

export async function GET() {
    try {
        const coins = await getCoins()
        return NextResponse.json(coins)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch coins' }, { status: 500 })
    }
}
