export type MarmitaType = {
    id: number;
    name: string;
    description: string;
    imageUrl: string | File;
    price: number;
    portionGram: number;
    oldPrice?: number;
}