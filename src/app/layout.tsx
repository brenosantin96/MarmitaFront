import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ModalAddressProvider, useModalAddress } from '../context/ModalAddressContext';
import ModalAddress from '../components/ModalAddress';
import ModalAddressGlobal from "@/components/ModalAddressGlobal";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={``}>
        <ModalAddressProvider>
          {children}
          <ModalAddressGlobal />
        </ModalAddressProvider>
      </body>
    </html>
  );
}

