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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={``}>
        <GoogleOAuthProvider clientId="486411282466-hki87kvtqucbgvgk964h91c2tpnvi6j0.apps.googleusercontent.com">
          <UserProvider>
            <CategoryProvider>
              <CartContextProvider>
                <SideMenuProvider>
                  <ModalAddressProvider>
                    <Navbar />
                    {children}
                    <ModalAddressGlobal />
                  </ModalAddressProvider>
                </SideMenuProvider>
              </CartContextProvider>
            </CategoryProvider>
          </UserProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}

