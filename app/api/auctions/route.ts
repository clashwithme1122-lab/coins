import { NextRequest, NextResponse } from 'next/server';

// Mock database - in production, this would be a real database
let auctionItems = [
    {
        id: 1,
        title: "1804 Silver Dollar - Class I",
        description: "One of the most famous rare coins in American numismatics",
        shortDesc: "The King of American Coins",
        currentBid: 3500000,
        startingBid: 2500000,
        buyNowPrice: 4500000,
        bidCount: 47,
        timeLeft: "2d 14h 23m",
        endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000 + 23 * 60 * 1000),
        image: "/assets/dummycoin.jpg",
        images: ["/assets/dummycoin.jpg", "/assets/dummycoin.jpg"],
        category: "US Coins",
        grade: "PR-68",
        certification: "PCGS",
        weight: "26.73g",
        diameter: "38.1mm",
        composition: "89.24% silver, 10.76% copper",
        mint: "Philadelphia",
        year: "1804",
        seller: "Taksila Coins",
        sellerVerified: true,
        bids: [
            { id: 1, amount: 2500000, bidder: "User123", timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) },
            { id: 2, amount: 2750000, bidder: "Collector456", timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000) },
            { id: 3, amount: 3500000, bidder: "Numismatic789", timestamp: new Date(Date.now() - 30 * 60 * 1000) }
        ]
    }
];

export async function GET() {
    try {
        // Filter out expired auctions
        const activeAuctions = auctionItems.filter(item => new Date(item.endTime) > new Date());

        return NextResponse.json({
            success: true,
            data: activeAuctions
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to fetch auction items' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { action, ...data } = body;

        if (action === 'place_bid') {
            const { auctionId, bidAmount, bidderName } = data;

            const auction = auctionItems.find(item => item.id === auctionId);
            if (!auction) {
                return NextResponse.json(
                    { success: false, error: 'Auction not found' },
                    { status: 404 }
                );
            }

            if (new Date(auction.endTime) < new Date()) {
                return NextResponse.json(
                    { success: false, error: 'Auction has ended' },
                    { status: 400 }
                );
            }

            if (bidAmount <= auction.currentBid) {
                return NextResponse.json(
                    { success: false, error: 'Bid must be higher than current bid' },
                    { status: 400 }
                );
            }

            // Add new bid
            const newBid = {
                id: auction.bids.length + 1,
                amount: bidAmount,
                bidder: bidderName,
                timestamp: new Date()
            };

            auction.bids.push(newBid);
            auction.currentBid = bidAmount;
            auction.bidCount = auction.bids.length;

            return NextResponse.json({
                success: true,
                message: 'Bid placed successfully',
                data: auction
            });
        }

        if (action === 'add_auction') {
            const newAuction = {
                id: auctionItems.length + 1,
                ...data,
                currentBid: data.startingBid,
                bidCount: 0,
                bids: [],
                endTime: new Date(Date.now() + data.duration * 24 * 60 * 60 * 1000)
            };

            auctionItems.push(newAuction);

            return NextResponse.json({
                success: true,
                message: 'Auction created successfully',
                data: newAuction
            });
        }

        return NextResponse.json(
            { success: false, error: 'Invalid action' },
            { status: 400 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to process request' },
            { status: 500 }
        );
    }
}
