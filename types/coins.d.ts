declare module '@/data/coins.json' {
    export interface Coin {
        id: number;
        title: string;
        price: string;
        weight: string;
        year: string;
        description: string;
        frontImage: string;
        backImage: string;
        weightImage: string;
        historicalValue?: string;
    }

    const coins: Coin[];
    export default coins;
}
