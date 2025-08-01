"use client"
import React, { createContext, ReactNode, useContext, useState } from 'react'

// 1 - Tipagem do contexto
type CartContextType = {
    isOpen: boolean;
    openAndCloseCart: () => void;
}

// 2 - Criar o contexto, podemos startart como undefined.
const CartContext = createContext<CartContextType | undefined>(undefined);

// 3 - Provider que envolve o app e fornece o contexto
export const CartContextProvider = ({ children }: { children: ReactNode }) => {

    const [isOpen, setIsOpen] = useState(false);

    const openAndCloseCart = () => {
        setIsOpen((prev) => !prev);
        console.log("Executando")
    }

    return (
        <CartContext.Provider value={{ isOpen, openAndCloseCart }}>
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