import { CartItem } from "./CartItem";

export type Cart = {
    id?: number; 
    userId: number;
    createdAt: Date;
    isCheckedOut: boolean;
    cartItems: CartItem[];
}