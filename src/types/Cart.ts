//src\types\Cart.ts

import { CartItem } from "./CartItem";

export type Cart = {
    id: number; 
    userId: number;
    createdAt: Date;
    isCheckedOut: boolean;
    cartItems: CartItem[];
}

//para um newCart que ainda nao possui ID
export type NewCart = Omit<Cart, "id">;