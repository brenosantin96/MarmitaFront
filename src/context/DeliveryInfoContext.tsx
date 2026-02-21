//src\context\DeliveryInfoContext.tsx
"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { useUserContext } from "./UserContext";
import { useCartContext } from "./CartContext";

// Tipagem baseada na  tabela
export type DeliveryInfo = {
  id?: number;
  tenantId?: number;
  cartId: number;
  userId: number;
  addressId: number | null;
  deliveryType: string | null;
  deliveryDate: Date | null;
  deliveryPeriod: string | null;
  canLeaveAtDoor: boolean;
};

// Tipagem do Context
type DeliveryInfoContextType = {
  deliveryInfo: DeliveryInfo | null;
  setDeliveryInfo: React.Dispatch<React.SetStateAction<DeliveryInfo | null>>;
  getActualDeliveryInfo: () => Promise<void>;
  clearDeliveryInfo: () => void;
};

//  Criando contexto
const DeliveryInfoContext = createContext<
  DeliveryInfoContextType | undefined
>(undefined);

//  Provider
export const DeliveryInfoContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo | null>(null);

  const { user } = useUserContext();
  const { cart } = useCartContext();

  useEffect(() => {
    if (user && cart) {
      getActualDeliveryInfo();
    }
  }, [user, cart]);

  const getActualDeliveryInfo = async () => {
    
    if (!user || !cart) return;

    try {
      const response = await axios.get(
        `/api/deliveryinfo/${cart.id}`
      );

      if (response.status === 200) {
        const apiData = response.data;

        const normalized: DeliveryInfo = {
          id: apiData.id,
          tenantId: apiData.tenantId,
          cartId: apiData.cartId,
          userId: apiData.userId,
          addressId: apiData.addressId ?? null,
          deliveryType: apiData.deliveryType ?? null,
          deliveryDate: apiData.deliveryDate
            ? new Date(apiData.deliveryDate)
            : null,
          deliveryPeriod: apiData.deliveryPeriod ?? null,
          canLeaveAtDoor: apiData.canLeaveAtDoor ?? false,
        };

        setDeliveryInfo(normalized);
      }
    } catch (err) {
      console.log("Usuário não possui DeliveryInfo ainda.", err);
      setDeliveryInfo(null);
    }
  };

  const clearDeliveryInfo = () => {
    setDeliveryInfo(null);
  };

  return (
    <DeliveryInfoContext.Provider
      value={{
        deliveryInfo,
        setDeliveryInfo,
        getActualDeliveryInfo,
        clearDeliveryInfo,
      }}
    >
      {children}
    </DeliveryInfoContext.Provider>
  );
};

//  Hook seguro
export const useDeliveryInfoContext = () => {
  const context = useContext(DeliveryInfoContext);
  if (!context) {
    throw new Error("Error using DeliveryInfoContext");
  }
  return context;
};
