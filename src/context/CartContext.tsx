"use client"
import { Cart } from '@/types/Cart';
import { CartItemType } from '@/types/CartItem';
import React, { createContext, ReactNode, useContext, useState } from 'react'

// 1 - Tipagem do contexto
type CartContextType = {
    isOpen: boolean;
    openAndCloseCart: () => void;
    cartItems: CartItemType[];
    cart: Cart | null;  // <- carrinho do banco
    setCart: (cart: Cart) => void; // função para atualizar
    setCartItems: (items: CartItemType[]) => void; // expõe também
}

// 2 - Criar o contexto, podemos startar como undefined.
const CartContext = createContext<CartContextType | undefined>(undefined);

// 3 - Provider que envolve o app e fornece o contexto
export const CartContextProvider = ({ children }: { children: ReactNode }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItemType[]>([]);
    const [cart, setCart] = useState<Cart | null>(null);


    const openAndCloseCart = () => {
        setIsOpen((prev) => !prev);
        console.log("Executando")
    }

    //para pegar Cart do id logado:
    // https://localhost:7192/api/Carts/GetCartByUserId/1

    return (
        <CartContext.Provider value={{ isOpen, openAndCloseCart, cartItems, cart, setCart, setCartItems }}>
            {children}
        </CartContext.Provider>
    )

}

//4 - Hook customizado para usar contexto com segurança
export const useCartContext = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("Error using CartContext");
    }
    return context;
}