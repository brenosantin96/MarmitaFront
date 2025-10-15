// src/types/CreateOrUpdateCartWithItemsDto.ts

export type CartItemInput = {
  quantity: number;
  lunchboxId?: number | null; // pode ser null ou undefined
  kitId?: number | null;      // pode ser null ou undefined
};

export type CreateOrUpdateCartWithItemsDto = {
  userId: number;
  createdAt: string; // ISO date string
  isCheckedOut: boolean;
  cartItems: CartItemInput[];
};