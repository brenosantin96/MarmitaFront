"use client"
import React, { createContext, ReactNode, useContext, useState } from 'react'

// 1 - Tipagem do contexto
type SideMenuContextType = {
    isOpen: boolean;
    openAndCloseSideMenu: () => void;
}

// 2 - Criar o contexto, podemos startart como undefined.
const SideMenuContext = createContext<SideMenuContextType | undefined>(undefined);

// 3 - Provider que envolve o app e fornece o contexto
export const SideMenuProvider = ({ children }: { children: ReactNode }) => {

    const [isOpen, setIsOpen] = useState(false);

    const openAndCloseSideMenu = () => {
        setIsOpen((prev) => !prev);
        console.log("Executando")
    }

    return (
        <SideMenuContext.Provider value={{ isOpen, openAndCloseSideMenu }}>
            {children}
        </SideMenuContext.Provider>
    )

}

//4 - Hook customizado para usar contexto com segurança
export const useSideMenu = () => {
    const context = useContext(SideMenuContext);
    if (!context) {
        throw new Error("Error using SideMenuContext");
    }
    return context;
}