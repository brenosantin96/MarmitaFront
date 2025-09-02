// types/MarmitaCreateDto.ts
export type MarmitaCreateDto = {
  name: string;
  description: string;
  price: number;
  portionGram: number;
  categoryId: number;
  image: File; // arquivo real
};