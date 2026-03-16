import {
    collection,
    doc,
    setDoc,
    getDoc,
    getDocs,
    query,
    where,
    orderBy,
    limit,
    updateDoc,
    serverTimestamp,
    Timestamp,
    arrayUnion,
    arrayRemove,
    FieldValue
} from 'firebase/firestore'
import { db } from '@/lib/firebase'

export interface Auction {
    id: string
    title: string
    description: string
    startingPrice: number
    currentBid: number
    endTime: Timestamp | FieldValue
    status: 'active' | 'ended' | 'cancelled'
    coinId: string
    coinName: string
    coinImage: string
    sellerId: string
    sellerName: string
    createdAt: Timestamp | FieldValue
    bids: Bid[]
    winner?: string
    finalPrice?: number
}

export interface Bid {
    id: string
    userId: string
    userName: string
    amount: number
    timestamp: Timestamp | FieldValue
    isWinning: boolean
}

export interface AuctionHistory {
    userId: string
    auctionId: string
    action: 'created' | 'bid' | 'won' | 'lost'
    timestamp: Timestamp | FieldValue
    details: any
}

class AuctionService {
    // Create a new auction
    async createAuction(auctionData: Omit<Auction, 'id' | 'createdAt' | 'bids' | 'currentBid'>): Promise<string> {
        try {
            const auctionRef = doc(collection(db, 'auctions'))
            const auction: Auction = {
                ...auctionData,
                id: auctionRef.id,
                createdAt: serverTimestamp(),
                bids: [],
                currentBid: auctionData.startingPrice
            }

            await setDoc(auctionRef, auction)

            // Log to auction history
            await this.logAuctionHistory({
                userId: auctionData.sellerId,
                auctionId: auctionRef.id,
                action: 'created',
                timestamp: serverTimestamp(),
                details: {
                    title: auctionData.title,
                    startingPrice: auctionData.startingPrice
                }
            })

            return auctionRef.id
        } catch (error) {
            console.error('Error creating auction:', error)
            throw error
        }
    }

    // Place a bid on an auction
    async placeBid(auctionId: string, userId: string, userName: string, amount: number): Promise<void> {
        try {
            const auctionRef = doc(db, 'auctions', auctionId)
            const auctionDoc = await getDoc(auctionRef)

            if (!auctionDoc.exists()) {
                throw new Error('Auction not found')
            }

            const auction = auctionDoc.data() as Auction

            // Check if auction is still active
            if (auction.status !== 'active') {
                throw new Error('Auction is no longer active')
            }

            // Check if bid is higher than current bid
            if (amount <= auction.currentBid) {
                throw new Error('Bid must be higher than current bid')
            }

            // Create new bid
            const bid: Bid = {
                id: Date.now().toString(),
                userId,
                userName,
                amount,
                timestamp: serverTimestamp(),
                isWinning: true
            }

            // Update existing bids to not be winning
            const updatedBids = auction.bids.map(b => ({ ...b, isWinning: false }))

            // Add new bid
            updatedBids.push(bid)

            // Update auction
            await updateDoc(auctionRef, {
                currentBid: amount,
                bids: updatedBids,
                lastBidAt: serverTimestamp()
            })

            // Log to auction history
            await this.logAuctionHistory({
                userId,
                auctionId,
                action: 'bid',
                timestamp: serverTimestamp(),
                details: {
                    amount,
                    previousBid: auction.currentBid
                }
            })
        } catch (error) {
            console.error('Error placing bid:', error)
            throw error
        }
    }

    // Get active auctions
    async getActiveAuctions(limitCount: number = 20): Promise<Auction[]> {
        try {
            const q = query(
                collection(db, 'auctions'),
                where('status', '==', 'active'),
                orderBy('endTime', 'asc'),
                limit(limitCount)
            )

            const querySnapshot = await getDocs(q)
            return querySnapshot.docs.map(doc => doc.data() as Auction)
        } catch (error) {
            console.error('Error getting active auctions:', error)
            throw error
        }
    }

    // Get auction by ID
    async getAuctionById(auctionId: string): Promise<Auction | null> {
        try {
            const auctionDoc = await getDoc(doc(db, 'auctions', auctionId))
            return auctionDoc.exists() ? auctionDoc.data() as Auction : null
        } catch (error) {
            console.error('Error getting auction:', error)
            throw error
        }
    }

    // Get user's auction history
    async getUserAuctionHistory(userId: string): Promise<AuctionHistory[]> {
        try {
            const q = query(
                collection(db, 'auctionHistory'),
                where('userId', '==', userId),
                orderBy('timestamp', 'desc')
            )

            const querySnapshot = await getDocs(q)
            return querySnapshot.docs.map(doc => doc.data() as AuctionHistory)
        } catch (error) {
            console.error('Error getting user auction history:', error)
            throw error
        }
    }

    // Get user's active bids
    async getUserActiveBids(userId: string): Promise<Auction[]> {
        try {
            const q = query(
                collection(db, 'auctions'),
                where('status', '==', 'active'),
                where('bids', 'array-contains', { userId })
            )

            const querySnapshot = await getDocs(q)
            return querySnapshot.docs.map(doc => doc.data() as Auction)
        } catch (error) {
            console.error('Error getting user active bids:', error)
            throw error
        }
    }

    // End auction and determine winner
    async endAuction(auctionId: string): Promise<void> {
        try {
            const auctionRef = doc(db, 'auctions', auctionId)
            const auctionDoc = await getDoc(auctionRef)

            if (!auctionDoc.exists()) {
                throw new Error('Auction not found')
            }

            const auction = auctionDoc.data() as Auction

            // Find winning bid
            const winningBid = auction.bids.find(bid => bid.isWinning)

            let updateData: any = {
                status: 'ended',
                endedAt: serverTimestamp()
            }

            if (winningBid) {
                updateData.winner = winningBid.userId
                updateData.finalPrice = winningBid.amount

                // Log winner history
                await this.logAuctionHistory({
                    userId: winningBid.userId,
                    auctionId,
                    action: 'won',
                    timestamp: serverTimestamp(),
                    details: {
                        finalPrice: winningBid.amount,
                        auctionTitle: auction.title
                    }
                })

                // Log other bidders as lost
                const otherBidders = auction.bids
                    .filter(bid => bid.userId !== winningBid.userId)
                    .map(bid => bid.userId)

                for (const bidderId of otherBidders) {
                    await this.logAuctionHistory({
                        userId: bidderId,
                        auctionId,
                        action: 'lost',
                        timestamp: serverTimestamp(),
                        details: {
                            auctionTitle: auction.title
                        }
                    })
                }
            }

            await updateDoc(auctionRef, updateData)
        } catch (error) {
            console.error('Error ending auction:', error)
            throw error
        }
    }

    // Private method to log auction history
    private async logAuctionHistory(history: Omit<AuctionHistory, 'id'>): Promise<void> {
        try {
            const historyRef = doc(collection(db, 'auctionHistory'))
            await setDoc(historyRef, {
                ...history,
                id: historyRef.id
            })
        } catch (error) {
            console.error('Error logging auction history:', error)
            throw error
        }
    }

    // Get auction statistics for a user
    async getUserAuctionStats(userId: string): Promise<{
        totalAuctionsCreated: number
        totalBids: number
        auctionsWon: number
        totalSpent: number
    }> {
        try {
            const history = await this.getUserAuctionHistory(userId)

            const stats = {
                totalAuctionsCreated: history.filter(h => h.action === 'created').length,
                totalBids: history.filter(h => h.action === 'bid').length,
                auctionsWon: history.filter(h => h.action === 'won').length,
                totalSpent: 0
            }

            // Calculate total spent
            const wonAuctions = history.filter(h => h.action === 'won')
            for (const won of wonAuctions) {
                if (won.details.finalPrice) {
                    stats.totalSpent += won.details.finalPrice
                }
            }

            return stats
        } catch (error) {
            console.error('Error getting user auction stats:', error)
            throw error
        }
    }
}

export const auctionService = new AuctionService()
