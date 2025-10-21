"use client"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ModalAddressProvider, useModalAddress } from '../context/ModalAddressContext';
import ModalAddress from '../components/ModalAddress';
import ModalAddressGlobal from "@/components/ModalAddressGlobal";
import { SideMenuProvider } from "../context/SideMenuContext"
import { CartContextProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import { UserProvider } from "@/context/UserContext";
import { CategoryProvider } from "@/context/CategoryContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

  const pathname = usePathname();

  //Array de rotas que nao vão ter a NAVBAR
  const noNavbarRoutes = ["/checkout/delivery"];

  //Exibe a Navbar apenas se a rota atual NÃO estiver na lista "noNavbarRoutes"
  const showNavbar = !noNavbarRoutes.includes(pathname);


  return (
    <html lang="en">
      <body className={``}>
        <UserProvider>
          <GoogleOAuthProvider clientId="486411282466-hki87kvtqucbgvgk964h91c2tpnvi6j0.apps.googleusercontent.com">
            <CategoryProvider>
              <CartContextProvider>
                <SideMenuProvider>
                  <ModalAddressProvider>
                    {/* formatacao condicional para exibir paginas */}
                    {showNavbar && <Navbar />} 
                    {children}
                    <ModalAddressGlobal />
                  </ModalAddressProvider>
                </SideMenuProvider>
              </CartContextProvider>
            </CategoryProvider>
          </GoogleOAuthProvider>
        </UserProvider>
      </body>
    </html>
  );
}

