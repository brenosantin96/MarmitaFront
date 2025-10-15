"use client"
import { Cart } from '@/types/Cart';
import { CartItem } from '@/types/CartItem';
import React, { createContext, ReactNode, useContext, useState } from 'react'
import { useUserContext } from './UserContext';
import axios from 'axios';

// 1 - Tipagem do contexto
type CartContextType = {
    isOpen: boolean;
    openAndCloseCart: (state: boolean) => void;
    cartItems: CartItem[];
    cart: Cart | null;  // <- carrinho do banco
    setCart: React.Dispatch<React.SetStateAction<Cart | null>>; // <- aceita objeto ou função
    setCartItems: (items: CartItem[]) => void; // expõe também
    getActualCart: () => Promise<void>;

}

// 2 - Criar o contexto, podemos startar como undefined.
const CartContext = createContext<CartContextType | undefined>(undefined);

// 3 - Provider que envolve o app e fornece o contexto
export const CartContextProvider = ({ children }: { children: ReactNode }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [cart, setCart] = useState<Cart | null>(null);
    const { user } = useUserContext();


    const openAndCloseCart = (state: boolean) => {

        if (state) {
            setIsOpen(true);
        }
        if (state === false) {
            setIsOpen(false) 
        }

    }

    const getActualCart = async () => {

        if (!user) return; //se nao tiver logado, retorna.

        try {
            const response = await axios.get(`/api/carts/${user.id}`)
            if (response.status === 200) {

                const apiCart = response.data

                // configurando items do cart, valor vindo da API difere do FRONT.
                const normalizedItems = apiCart.cartItems.map((item: any) => ({
                    quantity: item.quantity,
                    cartItem: {
                        id: item.lunchboxId ?? item.kitId, // caso venha kit
                        name: item.name,
                        price: item.price ?? 0,
                        portionGram: item.portionGram ?? 0,
                        imageUrl: item.imageUrl ?? "",
                        kitId: item.kitId,
                        lunchboxId: item.lunchboxId,
                    },
                    lunchboxId: item.lunchboxId ?? null,
                    kitId: item.kitId ?? null
                }));


                setCart({
                    userId: response.data.id,
                    createdAt: response.data.createdAt,
                    isCheckedOut: response.data.isCheckedOut,
                    cartItems: normalizedItems
                });

                // atualizando os cartItems no contexto
                setCartItems(normalizedItems);

            }
        } catch (err) {
            console.error("Erro ao buscar carrinho:", err);
        }

    }

    //para pegar Cart do id logado:
    // https://localhost:7192/api/Carts/GetCartByUserId/ (esse id vai vir dinamico.)

    return (
        <CartContext.Provider value={{ isOpen, openAndCloseCart, cartItems, cart, setCart, setCartItems, getActualCart }}>
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


/* 
 const response = await axios.get(`/api/carts/${user.id}`)

 {
    "id": 7,
    "userId": 16,
    "createdAt": "2025-09-17T19:00:00",
    "cartItems": [
        {
            "id": 24,
            "quantity": 1,
            "kitId": null,
            "lunchboxId": 5,
            "name": "Ovo"
        },
        {
            "id": 25,
            "quantity": 4,
            "kitId": null,
            "lunchboxId": 18,
            "name": "Bife e batata frita"
        }
    ],
    "isCheckedOut": false
} */