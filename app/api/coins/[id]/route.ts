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

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const idNum = parseInt(id)
        const updatedCoin: Coin = await request.json()
        const coins = await getCoins()

        const index = coins.findIndex(coin => coin.id === idNum)
        if (index === -1) {
            return NextResponse.json({ error: 'Coin not found' }, { status: 404 })
        }

        coins[index] = { ...updatedCoin, id: idNum }
        await saveCoins(coins)

        return NextResponse.json(coins[index])
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update coin' }, { status: 500 })
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const idNum = parseInt(id)
        const coins = await getCoins()

        const index = coins.findIndex(coin => coin.id === idNum)
        if (index === -1) {
            return NextResponse.json({ error: 'Coin not found' }, { status: 404 })
        }

        coins.splice(index, 1)
        await saveCoins(coins)

        return NextResponse.json({ message: 'Coin deleted successfully' })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete coin' }, { status: 500 })
    }
}
