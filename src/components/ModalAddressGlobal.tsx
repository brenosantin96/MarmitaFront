"use client";

import { useModalAddress } from "../context/ModalAddressContext";
import ModalAddress from "@/components/ModalAddress";

const ModalAddressGlobal = () => {
  const { isOpen, closeModal } = useModalAddress();

  return (
    <ModalAddress
      isOpen={isOpen}
      handleClose={closeModal}
      modalTitle="Será que entrega?"
    />
  );
};

export default ModalAddressGlobal;
