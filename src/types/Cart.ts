import { CartItem } from "./CartItem";

export type Cart = {
    userId: number;
    createdAt: Date;
    isCheckedOut: boolean;
    cartItems: CartItem[];
}