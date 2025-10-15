import type { Kit } from './Kit';
import type { Lunchbox } from './Lunchbox';

export type CartItem = {
    cartItem: Kit | Lunchbox
    quantity: number;
    lunchboxId?: number
    kitId?: number
}