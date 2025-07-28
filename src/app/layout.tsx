import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ModalAddressProvider, useModalAddress } from '../context/ModalAddressContext';
import ModalAddress from '../components/ModalAddress';
import ModalAddressGlobal from "@/components/ModalAddressGlobal";
import { SideMenuProvider } from "../context/SideMenuContext"
import { CartContextProvider } from "@/context/CartContext";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={``}>
        <CartContextProvider>
          <SideMenuProvider>
            <ModalAddressProvider>
              {children}
              <ModalAddressGlobal />
            </ModalAddressProvider>
          </SideMenuProvider>
        </CartContextProvider>
      </body>
    </html>
  );
}

