// src\app\menu\page.tsx
"use client";

import CardItem01 from '@/components/CardItem01';
import { SideMenu } from '@/components/SideMenu';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CartSideMenu from '@/components/CartSideMenu';
import { Lunchbox } from '@/types/Lunchbox';
import { useCartContext } from '@/context/CartContext';
import { useUserContext } from '@/context/UserContext';
import { CartItem } from '@/types/CartItem';
import { useCategorieContext } from '@/context/CategoryContext';
import CategorySection from '@/components/CategorySection';
import AllMenuWithoutCategory from '@/components/AllMenuWithoutCategory';

const MenuPage = () => {

  const [marmitas, setMarmitas] = useState<Lunchbox[]>([]);
  const [loading, setLoading] = useState(true);

  const cartContext = useCartContext(); //inicializando cartContext
  const userContext = useUserContext();

  const { categories } = useCategorieContext();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);


  // Função para buscar marmitas do backend
  const getMarmitas = async () => {

    console.log("NEXT_PUBLIC_BASE_URL_BACKEND: ", process.env.NEXT_PUBLIC_BASE_URL_BACKEND)

    try {
      const res = await axios.get(`/api/lunchboxes`, {
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



  //aqui a funcao é especificamente para lunchboxes ja que eesta na pagina de MENU....
  const addMarmita = (idMarmita: number) => {

    const marmitaToAdd = marmitas.find(m => m.id === idMarmita);
    if (!marmitaToAdd || !userContext.user) return;

    cartContext.openAndCloseCart(true);


    cartContext.setCart((prevCart) => {

      // se não existe carrinho ainda
      if (!prevCart) {
        return {
          userId: userContext.user?.id as number,
          createdAt: new Date(),
          isCheckedOut: false,
          cartItems: [{
            cartItem: marmitaToAdd,
            quantity: 1, kitId: null, lunchboxId: marmitaToAdd.id
          }],
        };
      }

      // se já existe carrinho
      const existingItemIndex = prevCart.cartItems.findIndex(
        (ci) => ci.cartItem.id === marmitaToAdd.id
      );

      let updatedItems: CartItem[];

      if (existingItemIndex >= 0) {
        updatedItems = prevCart.cartItems.map((ci, idx) =>
          idx === existingItemIndex ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      } else {
        updatedItems = [...prevCart.cartItems, {
          cartItem: marmitaToAdd,
          quantity: 1,
          kitId: null,
          lunchboxId: marmitaToAdd.id,
        }];
      }

      return {
        ...prevCart,
        cartItems: updatedItems,
      };
    });

  };


  //aqui a funcao é especificamente para lunchboxes ja que esta na pagina de MENU....
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
      <div
        id="categoriesList"
        className="mt-[55px] md:mt-[95px] bg-white fixed left-0 w-full shadow overflow-x-auto whitespace-nowrap px-3 py-2 md:flex md:justify-center z-50"
      >

        <div className="flex gap-2 w-max md:w-auto md:mx-auto">

          <button
            onClick={() => {
              setSelectedCategoryId(null);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className={`
      shrink-0
      cursor-pointer
      font-hindmadurai
      border
      border-gray-300
      rounded-3xl
      px-4
      py-2
      transition-colors
      duration-200
      ${selectedCategoryId === null
                ? "bg-green-800 text-white"
                : "bg-white text-black hover:bg-gray-100"
              }
    `}
          >
            Todos
          </button>

          {categories
            ?.filter((category) =>
              marmitas.some((marmita) => marmita.categoryId === category.id)
            )
            .map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategoryId(category.id);
                  document
                    .getElementById(`category-${category.id}`)
                    ?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                }}
                className={`
        shrink-0
        cursor-pointer
        font-hindmadurai
        border
        border-gray-300
        rounded-3xl
        px-4
        py-2
        transition-colors
        duration-200
        ${selectedCategoryId === category.id
                    ? "bg-green-800 text-white"
                    : "bg-white text-black hover:bg-gray-100"
                  }
      `}
              >
                {category.name}
              </button>
            ))}
        </div>
      </div>

      <SideMenu />
      <CartSideMenu />

      <div id="menuPage" className="pt-[146px] w-full">
        <div className="flex justify-center mb-[15px]">
          <img
            src="/images/banner-home.png"
            alt="Banner Principal"
            className="
            w-full
            max-w-full
            md:max-w-[768px]
            rounded-xl
            object-cover
          "
          />
        </div>

        <div id="menuList" className="mt-5 w-full">

          {selectedCategoryId === null ? (

            <div className="max-w-6xl mx-auto px-4">
              <AllMenuWithoutCategory
                marmitas={marmitas}
                onAdd={addMarmita}
                onRemove={removeMarmita}
              />
            </div>

          ) : (

            categories
              .filter(
                (category) =>
                  category.id === selectedCategoryId &&
                  marmitas.filter((m) => m.categoryId === category.id).length > 0
              )
              .map((category) => (
                <section
                  id={`category-${category.id}`}
                  key={category.id}
                  className="
            w-full
            bg-gradient-to-b
            from-[#f3eed9]
            to-white
            py-6
          "
                >
                  <div className="max-w-6xl mx-auto px-4">
                    <CategorySection
                      category={category}
                      lunchboxes={marmitas.filter(
                        (m) => m.categoryId === category.id
                      )}
                      onAdd={addMarmita}
                      onRemove={removeMarmita}
                    />
                  </div>
                </section>
              ))

          )}

        </div>
      </div>
    </>
  );
};

export default MenuPage;

//altura navbar devices md 96
//altura navbar devices sm 56
//altura categories devices md 50
//altura categories devices sm 50

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