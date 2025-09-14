import type { Kit } from './Kit';
import type { Lunchbox } from './Lunchbox';

export type CartItemType = {
    id: number; //nao sei se é necessario
    cartId: number;
    cartItem: Kit | Lunchbox
    quantity: number;

}