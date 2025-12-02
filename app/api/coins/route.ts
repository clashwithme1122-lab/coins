import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

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

const COINS_FILE = path.join(process.cwd(), 'data', 'coins.json')

async function getCoins(): Promise<Coin[]> {
    try {
        const data = await fs.readFile(COINS_FILE, 'utf-8')
        return JSON.parse(data)
    } catch (error) {
        return []
    }
}

async function saveCoins(coins: Coin[]): Promise<void> {
    await fs.writeFile(COINS_FILE, JSON.stringify(coins, null, 2))
}

export async function GET() {
    try {
        const coins = await getCoins()
        return NextResponse.json(coins)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch coins' }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const coinData: Omit<Coin, 'id'> = await request.json()
        const coins = await getCoins()

        const newCoin: Coin = {
            ...coinData,
            id: coins.length > 0 ? Math.max(...coins.map(c => c.id)) + 1 : 1
        }

        coins.push(newCoin)
        await saveCoins(coins)

        return NextResponse.json(newCoin, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create coin' }, { status: 500 })
    }
}
