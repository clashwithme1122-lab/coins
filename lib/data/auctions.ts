export interface AuctionItem {
    id: string;
    title: string;
    shortDesc: string;
    detailedDesc: string;
    image: string;
    startBid: number;
    currentBid: number;
    currency: string;
    startDate: string;
    endDate: string;
    seller: {
        name: string;
        rating: number;
    };
    provenance?: string;
    sku: string;
    bidderCount: number;
}

export const auctionItems: AuctionItem[] = [
    {
        id: 'auction-001',
        title: '1804 Draped Bust Silver Dollar - Class I Original',
        shortDesc: 'One of the finest known examples of the legendary 1804 silver dollar, Class I original strike.',
        detailedDesc: 'This extraordinary 1804 Draped Bust Silver Dollar represents one of the most coveted coins in American numismatics. As a Class I original strike, it was actually minted in 1834 for diplomatic presentation purposes, not in 1804 as the date suggests. This particular specimen exhibits remarkable preservation with strong cartwheel luster, sharp strike details, and attractive toning. The coin has been authenticated and graded by PCGS as PR67, placing it among the finest known examples. Its provenance includes notable collections from the 20th century, including the Garrett Collection and the Eliasberg Collection.',
        image: '/assets/auctions/1804-silver-dollar.jpg',
        startBid: 850000,
        currentBid: 925000,
        currency: 'USD',
        startDate: '2024-12-01T10:00:00Z',
        endDate: '2024-12-15T20:00:00Z',
        seller: {
            name: 'Heritage Auctions',
            rating: 5
        },
        provenance: 'Garrett Collection (1976), Eliasberg Collection (1982), Private Collection (1990-Present)',
        sku: 'HA-1804-USD-001',
        bidderCount: 12
    },
    {
        id: 'auction-002',
        title: '1933 Saint-Gaudens Double Eagle - XF45',
        shortDesc: 'Rare surviving example of the famous 1933 double eagle, one of few legally owned specimens.',
        detailedDesc: 'The 1933 Saint-Gaudens Double Eagle stands as perhaps the most famous and controversial U.S. coin. Nearly all 1933 double eagles were melted down, making legally owned examples exceedingly rare. This specimen, graded XF45 by PCGS, shows moderate circulation wear but retains excellent design detail and attractive surfaces. The coin has a fascinating history, having been part of the King Farouk collection before returning to the United States. Its legal status has been confirmed through extensive documentation and court proceedings, making it one of the few 1933 double eagles that can be legally owned by private collectors.',
        image: '/assets/auctions/1933-double-eagle.jpg',
        startBid: 750000,
        currentBid: 820000,
        currency: 'USD',
        startDate: '2024-12-02T10:00:00Z',
        endDate: '2024-12-16T18:00:00Z',
        seller: {
            name: 'Stack\'s Bowers',
            rating: 5
        },
        provenance: 'King Farouk Collection (1944), Sotheby\'s (2002), Private Collection (2002-Present)',
        sku: 'SB-1933-SG-002',
        bidderCount: 8
    },
    {
        id: 'auction-003',
        title: '1794 Flowing Hair Silver Dollar - SP66',
        shortDesc: 'Exceptional specimen of the first U.S. silver dollar, believed to be among the finest known examples.',
        detailedDesc: 'The 1794 Flowing Hair Silver Dollar holds a special place in American numismatic history as the first silver dollar minted by the United States. This particular example, graded SP66 by PCGS, represents one of the finest known specimens. The coin exhibits extraordinary preservation with prooflike surfaces, deep mirror fields, and exceptional strike quality. Research suggests this may be one of the first silver dollars struck, possibly even the presentation piece for Secretary of State Edmund Randolph. The coin\'s surfaces are pristine with no significant marks or imperfections, and its historical significance combined with its exceptional condition makes it truly irreplaceable.',
        image: '/assets/auctions/1794-flowing-hair.jpg',
        startBid: 450000,
        currentBid: 525000,
        currency: 'USD',
        startDate: '2024-12-01T12:00:00Z',
        endDate: '2024-12-14T22:00:00Z',
        seller: {
            name: 'GreatCollections',
            rating: 4
        },
        provenance: 'Contest of the Homer Collection (2013), Private Collection (2013-Present)',
        sku: 'GC-1794-FH-003',
        bidderCount: 15
    },
    {
        id: 'auction-004',
        title: '1907 Saint-Gaudens Ultra High Relief - PR67',
        shortDesc: 'Stunning example of the iconic ultra high relief double eagle, considered America\'s most beautiful coin design.',
        detailedDesc: 'The 1907 Ultra High Relief Saint-Gaudens Double Eagle represents the pinnacle of American coinage artistry. Designed by renowned sculptor Augustus Saint-Gaudens, this coin required multiple strikes to achieve its extraordinary depth and detail. This PR67 example features perfect surfaces, deeply frosted devices, and mirror-like fields creating a stunning cameo contrast. The ultra high relief design was only produced briefly in 1907 before being modified to the high relief version, making these early examples particularly desirable. This coin represents not just numismatic excellence but also artistic achievement, embodying Saint-Gaudens\' vision for American coinage.',
        image: '/assets/auctions/1907-ultra-relief.jpg',
        startBid: 2500000,
        currentBid: 2850000,
        currency: 'USD',
        startDate: '2024-12-03T10:00:00Z',
        endDate: '2024-12-17T20:00:00Z',
        seller: {
            name: 'Heritage Auctions',
            rating: 5
        },
        provenance: 'Amon Carter Collection (1945), Private Collection (1945-Present)',
        sku: 'HA-1907-UHR-004',
        bidderCount: 10
    },
    {
        id: 'auction-005',
        title: '1822 Capped Head Gold Eagle - AU58',
        shortDesc: 'Rare surviving example of the 1822 $10 gold eagle, one of only three known specimens.',
        detailedDesc: 'The 1822 Capped Head Gold Eagle ranks among the rarest U.S. coins, with only three examples known to exist. This AU58 specimen represents the second-finest known example of this legendary rarity. The coin shows minimal circulation wear with strong luster remaining in protected areas. All major design elements are sharp and well-defined. The 1822 eagle had an original mintage of 3,795 coins, but nearly all were melted due to rising gold values in the 1830s. This coin\'s survival is remarkable, and its appearance at auction represents a once-in-a-generation opportunity for advanced collectors.',
        image: '/assets/auctions/1822-gold-eagle.jpg',
        startBid: 5000000,
        currentBid: 6800000,
        currency: 'USD',
        startDate: '2024-12-02T14:00:00Z',
        endDate: '2024-12-16T21:00:00Z',
        seller: {
            name: 'Stack\'s Bowers',
            rating: 5
        },
        provenance: 'Louis E. Eliasberg Collection (1982), Private Collection (1982-Present)',
        sku: 'SB-1822-GE-005',
        bidderCount: 6
    },
    {
        id: 'auction-006',
        title: '1913 Liberty Head Nickel - PR66',
        shortDesc: 'One of the legendary five 1913 Liberty Head nickels, this PR66 example is among the finest known.',
        detailedDesc: 'The 1913 Liberty Head Nickel is one of America\'s most famous rarities, with only five examples known to exist. Struck clandestinely at the Philadelphia Mint after the official design change to the Buffalo nickel, these coins represent a fascinating chapter in numismatic history. This PR66 specimen is tied for the finest certified example and features pristine surfaces with deep cameo contrast between frosted devices and mirror fields. The coin\'s provenance includes some of the most famous collections in American numismatics, and its appearance at auction represents a historic opportunity for serious collectors.',
        image: '/assets/auctions/1913-liberty-nickel.jpg',
        startBid: 4500000,
        currentBid: 5200000,
        currency: 'USD',
        startDate: '2024-12-01T16:00:00Z',
        endDate: '2024-12-15T19:00:00Z',
        seller: {
            name: 'GreatCollections',
            rating: 4
        },
        provenance: 'Colonel E.H.R. Green Collection (1940), Private Collection (1940-Present)',
        sku: 'GC-1913-LN-006',
        bidderCount: 9
    }
];

export const auctionCategories = [
    { id: 'us-coins', name: 'U.S. Coins', count: 156 },
    { id: 'world-coins', name: 'World Coins', count: 89 },
    { id: 'ancient-coins', name: 'Ancient Coins', count: 67 },
    { id: 'currency', name: 'Currency & Paper Money', count: 34 },
    { id: 'medals', name: 'Medals & Tokens', count: 28 }
];

export const auctionFAQs = [
    {
        question: 'How do I place a bid in an auction?',
        answer: 'Create an account, complete identity verification, and deposit funds or arrange payment methods. Once approved, you can place bids online through our platform, by phone, or in person at live auction events. All bids are binding commitments to purchase if you win.'
    },
    {
        question: 'What are buyer\'s premiums and fees?',
        answer: 'Buyer\'s premium is a percentage added to the winning bid amount, typically 15-20% for online auctions. Additional fees may apply for shipping, insurance, and payment processing. All fees are clearly displayed before you confirm your bid.'
    },
    {
        question: 'How is payment handled after winning an auction?',
        answer: 'Payment is required within 3 business days of auction close. We accept wire transfers, certified checks, and major credit cards. High-value items may require wire transfer for security. All items ship only after payment clears.'
    },
    {
        question: 'Are auction items guaranteed authentic?',
        answer: 'Yes, all auction items come with our authenticity guarantee. We work with leading grading services and expert authenticators. If an item is later determined to be counterfeit, we offer a full refund including all premiums and fees.'
    },
    {
        question: 'What shipping and insurance options are available?',
        answer: 'We offer insured shipping through major carriers with full value coverage. International shipping available with proper customs documentation. Local pickup is also available at our facilities. Shipping costs vary by value and destination.'
    }
];
