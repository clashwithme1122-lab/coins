import { NextRequest, NextResponse } from 'next/server';

// Mock storage for development
const mockBids: any[] = [
    // Test bid for user uuWST5KTFYP1VibEYQcnj1k12jJ2
    {
        id: 'bid_1',
        userId: 'uuWST5KTFYP1VibEYQcnj1k12jJ2',
        auctionId: '1',
        amount: 2600,
        timestamp: new Date().toISOString(),
        auctionStatus: 'active',
        type: 'bid'
    },
    {
        id: 'bid_2',
        userId: 'uuWST5KTFYP1VibEYQcnj1k12jJ2',
        auctionId: '2',
        amount: 3100,
        timestamp: new Date(Date.now() - 60000).toISOString(), // 1 minute ago
        auctionStatus: 'active',
        type: 'bid'
    }
];
const mockAuctions: any[] = [
    {
        id: '1',
        title: '1877 Morgan Silver Dollar - AU58',
        description: 'Rare Morgan Silver Dollar in AU58 condition',
        currentBid: 2500,
        buyNowPrice: 3500,
        endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
        image: 'https://via.placeholder.com/300x300/4A5568/FFFFFF?text=Morgan+1877',
        status: 'active',
        createdAt: new Date().toISOString()
    },
    {
        id: '2',
        title: '1921 Peace Silver Dollar - MS65',
        description: 'Beautiful Peace Silver Dollar in MS65 condition',
        currentBid: 3200,
        buyNowPrice: 4500,
        endsAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(), // 48 hours from now
        image: 'https://via.placeholder.com/300x300/4A5568/FFFFFF?text=Peace+1921',
        status: 'active',
        createdAt: new Date().toISOString()
    },
    {
        id: '3',
        title: '1893-S Morgan Silver Dollar - AU50',
        description: 'Key date Morgan Silver Dollar from San Francisco mint',
        currentBid: 4500,
        buyNowPrice: 5500,
        endsAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Ended yesterday
        image: 'https://via.placeholder.com/300x300/4A5568/FFFFFF?text=Morgan+1893-S',
        status: 'ended',
        createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString()
    }
];

// Auto-cleanup function to remove expired auctions
function cleanupExpiredAuctions() {
    const now = new Date();
    mockAuctions.forEach(auction => {
        if (auction.status === 'active' && new Date(auction.endsAt) <= now) {
            auction.status = 'ended';
            console.log(`Auction ${auction.id} automatically ended: ${auction.title}`);
        }
    });
}

export async function GET(request: NextRequest) {
    try {
        // Auto-cleanup expired auctions
        cleanupExpiredAuctions();

        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');
        const type = searchParams.get('type'); // 'active', 'won', 'purchased', 'all'
        const adminId = searchParams.get('adminId'); // For admin to get all auctions

        console.log(`API GET request - userId: ${userId}, type: ${type}, adminId: ${adminId}`);
        console.log(`Total bids in storage: ${mockBids.length}`);
        console.log(`Total auctions: ${mockAuctions.length}`);

        if (!userId && !adminId) {
            return NextResponse.json({ error: 'User ID or Admin ID is required' }, { status: 400 });
        }

        if (type === 'active') {
            // Get active bids for this user
            const userBids = mockBids.filter(bid =>
                bid.userId === userId
            );

            console.log(`User bids found: ${userBids.length} for userId: ${userId}`);

            // Get only active auctions
            const activeAuctions = mockAuctions.filter(auction =>
                auction.status === 'active'
            );

            console.log(`Active auctions: ${activeAuctions.length}`);

            // Filter bids to only include those from active auctions
            const activeUserBids = userBids.filter(bid =>
                activeAuctions.some(auction => auction.id === bid.auctionId)
            );

            console.log(`Active user bids: ${activeUserBids.length}`);

            // Enrich with auction data
            const activeBids = activeUserBids.map(bid => {
                const auction = activeAuctions.find(a => a.id === bid.auctionId);
                if (!auction) return null;

                const isWinning = bid.amount >= auction.currentBid;
                const timeLeft = new Date(auction.endsAt).getTime() - new Date().getTime();

                return {
                    id: bid.id,
                    title: auction.title,
                    image: auction.image,
                    currentBid: auction.currentBid,
                    yourBid: bid.amount,
                    endsAt: auction.endsAt,
                    status: isWinning ? 'winning' : 'outbid',
                    auctionId: auction.id,
                    isEnded: timeLeft <= 0,
                    bidType: bid.type || 'bid' // 'bid' or 'buy_now'
                };
            }).filter(Boolean);

            console.log(`Final active bids to return: ${activeBids.length}`);
            activeBids.forEach(bid => {
                if (bid) {
                    console.log(`- ${bid.title}: $${bid.yourBid} vs $${bid.currentBid} (${bid.status})`);
                }
            });

            return NextResponse.json({ success: true, bids: activeBids });
        }

        if (type === 'won') {
            // Get auctions the user has won
            const wonAuctions = mockAuctions
                .filter(auction =>
                    auction.status === 'ended' &&
                    mockBids.some(bid =>
                        bid.userId === userId &&
                        bid.auctionId === auction.id &&
                        bid.amount >= auction.currentBid
                    )
                )
                .map(auction => {
                    const winningBid = mockBids.find(bid =>
                        bid.userId === userId &&
                        bid.auctionId === auction.id &&
                        bid.amount >= auction.currentBid
                    );

                    return {
                        id: auction.id,
                        title: auction.title,
                        image: auction.image,
                        finalPrice: winningBid?.amount || auction.currentBid,
                        wonAt: auction.endsAt,
                        status: 'won',
                        purchaseType: winningBid?.type || 'bid'
                    };
                });

            return NextResponse.json({ success: true, auctions: wonAuctions });
        }

        if (type === 'purchased') {
            // Get buy now purchases
            const purchasedAuctions = mockAuctions
                .filter(auction =>
                    mockBids.some(bid =>
                        bid.userId === userId &&
                        bid.auctionId === auction.id &&
                        bid.type === 'buy_now'
                    )
                )
                .map(auction => {
                    const purchaseBid = mockBids.find(bid =>
                        bid.userId === userId &&
                        bid.auctionId === auction.id &&
                        bid.type === 'buy_now'
                    );

                    return {
                        id: auction.id,
                        title: auction.title,
                        image: auction.image,
                        purchasePrice: purchaseBid?.amount || auction.buyNowPrice,
                        purchasedAt: purchaseBid?.timestamp || auction.endsAt,
                        status: 'purchased',
                        purchaseType: 'buy_now'
                    };
                });

            return NextResponse.json({ success: true, auctions: purchasedAuctions });
        }

        if (adminId) {
            // Admin gets all auctions
            return NextResponse.json({ success: true, auctions: mockAuctions });
        }

        // Get all bids for user
        const userBids = mockBids.filter(bid => bid.userId === userId);
        return NextResponse.json({ success: true, bids: userBids });

    } catch (error) {
        console.error('Error fetching bids:', error);
        return NextResponse.json({ error: 'Failed to fetch bids' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const { userId, auctionId, amount, type = 'bid' } = await request.json();

        if (!userId || !auctionId || !amount) {
            return NextResponse.json({
                error: 'User ID, auction ID, and amount are required'
            }, { status: 400 });
        }

        // Find the auction
        const auction = mockAuctions.find(a => a.id === auctionId);
        if (!auction) {
            return NextResponse.json({ error: 'Auction not found' }, { status: 404 });
        }

        // Check if auction is still active (for regular bids)
        if (type === 'bid' && (auction.status !== 'active' || new Date(auction.endsAt) <= new Date())) {
            return NextResponse.json({ error: 'Auction has ended' }, { status: 400 });
        }

        // For buy now, check if auction is still active
        if (type === 'buy_now' && (auction.status !== 'active' || new Date(auction.endsAt) <= new Date())) {
            return NextResponse.json({ error: 'Auction has ended' }, { status: 400 });
        }

        // Create new bid/purchase
        const newBid = {
            id: Date.now().toString(),
            userId,
            auctionId,
            amount,
            timestamp: new Date().toISOString(),
            auctionStatus: auction.status, // Match the auction's current status
            type: type // 'bid' or 'buy_now'
        };

        // Add to mock storage
        mockBids.push(newBid);

        if (type === 'buy_now') {
            // Buy now immediately ends the auction
            auction.status = 'ended';
            auction.currentBid = amount;
            console.log(`Auction ${auction.id} sold via buy now: ${auction.title}`);
        } else {
            // Update auction current bid for regular bids
            auction.currentBid = amount;
            console.log(`Bid placed on auction ${auction.id}: ${amount}`);
        }

        return NextResponse.json({
            success: true,
            message: type === 'buy_now' ? 'Purchase successful' : 'Bid placed successfully',
            bid: newBid
        });

    } catch (error) {
        console.error('Error placing bid:', error);
        return NextResponse.json({ error: 'Failed to place bid' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const auctionId = searchParams.get('auctionId');
        const adminId = searchParams.get('adminId');

        if (!auctionId || !adminId) {
            return NextResponse.json({
                error: 'Auction ID and Admin ID are required'
            }, { status: 400 });
        }

        // Find and remove the auction
        const auctionIndex = mockAuctions.findIndex(a => a.id === auctionId);
        if (auctionIndex === -1) {
            return NextResponse.json({ error: 'Auction not found' }, { status: 404 });
        }

        const removedAuction = mockAuctions[auctionIndex];
        mockAuctions.splice(auctionIndex, 1);

        // Also remove related bids
        const relatedBids = mockBids.filter(bid => bid.auctionId !== auctionId);
        mockBids.length = 0;
        mockBids.push(...relatedBids);

        console.log(`Admin removed auction: ${removedAuction.title}`);

        return NextResponse.json({
            success: true,
            message: 'Auction removed successfully',
            auction: removedAuction
        });

    } catch (error) {
        console.error('Error removing auction:', error);
        return NextResponse.json({ error: 'Failed to remove auction' }, { status: 500 });
    }
}
