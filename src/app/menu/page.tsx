"use client";

import CardItem01 from '@/components/CardItem01';
import { SideMenu } from '@/components/SideMenu';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CartSideMenu from '@/components/CartSideMenu';
import { Lunchbox } from '@/types/Lunchbox';
import { useCartContext } from '@/context/CartContext';
import { useUserContext } from '@/context/UserContext';

const MenuPage = () => {
  const [marmitas, setMarmitas] = useState<Lunchbox[]>([]);
  const [loading, setLoading] = useState(true);

  const cartContext = useCartContext(); //inicializando cartContext
  const userContext = useUserContext();



  // Função para buscar marmitas do backend
  const getMarmitas = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/lunchboxes`, {
        withCredentials: true, // envia cookies HTTP-only
      });

      setMarmitas(res.data);
    } catch (err) {
      console.error("Erro ao buscar marmitas:", err);
      setMarmitas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMarmitas();
  }, []);


  useEffect(() => {
    console.log("CART: ", cartContext.cart);
  }, [cartContext]);


 const addMarmita = (idMarmita: number) => {
  console.log("Id da marmita recebida do componente filho para ser adicionada: ", idMarmita);
  const marmitaToAdd = marmitas.find((i) => i.id === idMarmita);

  if (!marmitaToAdd) {
    alert("Marmita não encontrada");
    return;
  }

  if (userContext.user) {
    cartContext.setCart((prevCart) => {
      // se não existe carrinho ainda
      if (!prevCart) {
        return {
          userId: userContext.user?.id as number,
          createdAt: new Date(),
          isCheckedOut: false,
          cartItems: [{ cartItem: marmitaToAdd, quantity: 1 }],
        };
      }

      // se já existe carrinho
      const existingItemIndex = prevCart.cartItems.findIndex(
        (ci) => ci.cartItem.id === marmitaToAdd.id
      );

      let updatedItems;
      if (existingItemIndex >= 0) {
        updatedItems = prevCart.cartItems.map((ci, idx) =>
          idx === existingItemIndex ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      } else {
        updatedItems = [...prevCart.cartItems, { cartItem: marmitaToAdd, quantity: 1 }];
      }

      return {
        ...prevCart,
        cartItems: updatedItems,
      };
    });
  }
};


  const removeMarmita = (idMarmita: number) => {
  console.log("Id da marmita recebida do componente filho para ser removida: ", idMarmita);

  if (userContext.user) {
    cartContext.setCart((prevCart) => {
      if (!prevCart) {
        return prevCart; // não existe carrinho ainda
      }

      const existingItemIndex = prevCart.cartItems.findIndex(
        (ci) => ci.cartItem.id === idMarmita
      );

      if (existingItemIndex === -1) {
        return prevCart; // marmita não está no carrinho
      }

      const itemToUpdate = prevCart.cartItems[existingItemIndex];

      let updatedItems;
      if (itemToUpdate.quantity > 1) {
        // apenas decrementa
        updatedItems = prevCart.cartItems.map((ci, idx) =>
          idx === existingItemIndex ? { ...ci, quantity: ci.quantity - 1 } : ci
        );
      } else {
        // remove do array se quantidade = 1
        updatedItems = prevCart.cartItems.filter((ci) => ci.cartItem.id !== idMarmita);
      }

      return {
        ...prevCart,
        cartItems: updatedItems,
      };
    });
  }
};


  if (loading) {
    return <div className="pt-28 px-4">Carregando marmitas...</div>;
  }

  if (marmitas.length === 0) {
    return <div className="pt-28 px-4">Nenhuma marmita encontrada.</div>;
  }

  return (
    <>
      <SideMenu />
      <CartSideMenu />
      <div id="menuPage" className="pt-28 px-4 w-full">
        <div
          id="menuList"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto justify-items-center"
        >
          {marmitas.map((item) => (
            <CardItem01
              id={item.id}
              key={item.id}
              title={item.name}
              price={item.price}
              portionGram={item.portionGram}
              imageUrl={`${process.env.NEXT_PUBLIC_API_BASE_URL}${item.imageUrl}`}
              onAdd={addMarmita}
              onRemove={removeMarmita}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default MenuPage;


/* {
  "userId": 16,
  "createdAt": "2025-09-17T19:00:00Z",
  "isCheckedOut": false,
  "items": [
    {
      "quantity": 3,
      "lunchboxId": 3
    },
    {
      "quantity": 2,
      "lunchboxId": 4
    }
  ]
} */