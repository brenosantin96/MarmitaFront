"use client";
import { ReactNode, createContext, useContext, useState } from "react";

type ModalAddressContextType = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const ModalAddressContext = createContext<ModalAddressContextType | undefined>(undefined);

export const ModalAddressProvider = ({ children }: { children: ReactNode }) => {
  
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <ModalAddressContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </ModalAddressContext.Provider>
  );
};

export const useModalAddress = (): ModalAddressContextType => {
  const context = useContext(ModalAddressContext);
  if (!context) {
    throw new Error("useModalAddress must be used within a ModalAddressProvider");
  }
  return context;
};
