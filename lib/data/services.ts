import { Shield, Award, Warehouse } from 'lucide-react';
import { ReactNode } from 'react';

export interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
    pricing: string;
    turnaround: string;
    features: string[];
    learnMoreUrl: string;
    trustBadges: string[];
}

export const services: Service[] = [
    {
        id: 'authentication',
        title: 'Coin Authentication Service',
        description: 'Professional coin authentication services utilizing advanced metallurgical analysis and expert visual examination. Our certified numismatists verify authenticity using established industry standards, including weight measurement, metallic composition analysis, and die characteristic verification. We employ both traditional examination methods and modern technology to detect counterfeits, alterations, and reproductions. Each authentication includes a detailed certification report documenting the examination process and findings, providing you with confidence in your collection\'s authenticity. Our authentication process follows PCGS and NGC guidelines, ensuring your coins are evaluated to the highest industry standards.',
        icon: 'Shield',
        pricing: '$35 - $150 per coin',
        turnaround: '5-10 business days',
        features: [
            'Expert visual examination by certified numismatists',
            'Metallurgical composition analysis',
            'Weight and measurement verification',
            'Die characteristic comparison',
            'Counterfeit detection using advanced methods',
            'Detailed authentication certification',
            'Digital imaging and documentation',
            'Cross-reference with authenticated databases'
        ],
        learnMoreUrl: '/services/authentication',
        trustBadges: ['PCGS Certified', 'NGC Approved', 'ANSI Standards']
    },
    {
        id: 'grading',
        title: 'Professional Coin Grading',
        description: 'Industry-standard coin grading services using the Sheldon Scale (1-70) for precise condition assessment. Our team of experienced graders evaluates each coin\'s surface preservation, strike quality, luster, and overall eye appeal according to established PCGS and NGC standards. The grading process involves multiple expert examinations to ensure consistency and accuracy. Each graded coin receives encapsulation in archival-quality holders with certification labels and barcodes for verification. Our grading services enhance marketability and establish trusted value for your coins, whether for collection building or investment purposes.',
        icon: 'Award',
        pricing: '$25 - $200 per coin',
        turnaround: '10-15 business days',
        features: [
            'Sheldon Scale grading (1-70)',
            'Multiple expert grader evaluation',
            'Archival-quality encapsulation',
            'Certification labels and barcodes',
            'Online verification database',
            'High-resolution imaging service',
            'Variety attribution included',
            'Market value assessment'
        ],
        learnMoreUrl: '/services/grading',
        trustBadges: ['PCGS Standards', 'NGC Certified', 'CAC Approved']
    },
    {
        id: 'storage',
        title: 'Secure Storage Solutions',
        description: 'Bank-level secure storage facilities designed specifically for valuable coin collections. Our climate-controlled vaults maintain optimal environmental conditions with temperature and humidity monitoring to prevent corrosion and deterioration. Each storage location features 24/7 surveillance, access control systems, and insurance coverage up to $50,000 per item. Collections are stored in individual, labeled containers with comprehensive inventory management and regular condition reports. Our storage solutions provide peace of mind for serious collectors and investors, ensuring your numismatic assets remain protected while maintaining accessibility for viewing or retrieval.',
        icon: 'Warehouse',
        pricing: '$15 - $75 per month per box',
        turnaround: 'Immediate availability',
        features: [
            'Climate-controlled environment (68-72°F, 40-45% humidity)',
            '24/7 video surveillance and monitoring',
            'Individual secure storage containers',
            'Comprehensive insurance coverage',
            'Online inventory management system',
            'Regular condition reporting',
            'Discreet pickup and delivery service',
            'Access scheduling for collection viewing'
        ],
        learnMoreUrl: '/services/storage',
        trustBadges: ['Bank Security', 'Fully Insured', 'Climate Controlled']
    }
];

export const serviceFAQs = [
    {
        question: 'What is the difference between authentication and grading?',
        answer: 'Authentication verifies a coin\'s genuineness and detects counterfeits, while grading assesses the coin\'s condition on the Sheldon Scale (1-70). Authentication is essential first step, followed by grading for authentic coins to determine market value.'
    },
    {
        question: 'How do I submit coins for authentication or grading?',
        answer: 'Complete our online submission form with detailed coin information, package coins securely in appropriate holders, and ship to our facility with insurance. Include payment and submission forms. We\'ll notify you upon receipt and provide tracking throughout the process.'
    },
    {
        question: 'What if my coin receives a lower grade than expected?',
        answer: 'We offer a review service where you can request re-examination within 30 days. If the grade is confirmed, you keep the original grade. If changed, you receive the new grade. Review fees apply but are refunded if grade increases.'
    },
    {
        question: 'Are my coins insured during the authentication/grading process?',
        answer: 'Yes, all coins are fully insured from receipt to return delivery. Our standard coverage is up to $10,000 per coin, with additional insurance available for high-value items. Insurance is included in our service fees.'
    },
    {
        question: 'Can I store coins that are not authenticated or graded?',
        answer: 'Yes, our storage facilities accept all coins regardless of authentication status. However, we recommend authentication for valuable pieces to ensure proper insurance coverage and accurate inventory management.'
    }
];
