"use client";
import AddressCard from "@/components/AddressCard";
import Button01 from "@/components/Button01";
import CheckoutItem from "@/components/CheckoutItem";
import CartIcon from "@/components/Icons/CartIcon";
import NewAddressForm from "@/components/NewAddressForm";
import { Icon } from "@/components/svg/Icon";
import { useCartContext } from "@/context/CartContext";
import { useUserContext } from "@/context/UserContext";
import { formatPriceToBRL } from "@/utils/Formatter";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import addressesData from "../../../Data/Addresses.json"
import { Address } from '@/types/Address'

const DeliveryPage = () => {

  const route = useRouter();
  const { user, isLoadingUser } = useUserContext();
  const { isOpen, openAndCloseCart, cart, cartItems, setCart, setCartItems, getActualCart } = useCartContext();

  const [total, setTotal] = useState(0);
  const [receiveInAnotherAddress, setReceiveInAnotherAddress] = useState(false);
  
  const [addresses, setAddresses] = useState<Address[]>(addressesData)

  //To adjust total
  useEffect(() => {
    if (!user || !cart) return

    const newTotal = cart.cartItems.reduce((valueAcumulated, item) => {
      return valueAcumulated + item.cartItem.price * item.quantity;
    }, 0);

    setTotal(newTotal);
  }, [user, cart])

  useEffect(() => {
    if (!isLoadingUser && user === null) {
      console.log("Usuário não logado, redirecionando...");
      route.push("/login");
    }
  }, [isLoadingUser, user]);

  useEffect(() => {
    console.log("CART diretamente da pagina delivery: ", cart)
  }, [cart])

  if (isLoadingUser) {
    return <p className="text-center mt-20">Carregando usuário...</p>;
  }

  if (user === null) {
    return <p className="text-center mt-20">Redirecionando...</p>;
  }



  const getSelectedAddress = (id: number) => {
    console.log("Aqui desde o componente PAI exibindo o id do CARD SELECIONADO: ", id)
  }




  return (
    <>
      {/* HEADER FIXO */}
      <header className="w-full bg-red-700 h-[45px] text-white flex items-center justify-center px-3 text-sm sm:text-base">
        <p>
          São <span className="underline">2 itens</span> no total de <strong>R$ 40,98</strong>
        </p>
      </header>

      <div className="container mx-auto px-2 sm:px-4">
        {/* GRID PRINCIPAL */}
        <div
          className="
          grid 
          grid-cols-1
          lg:grid-cols-12 
          lg:grid-rows-[70px_1fr]
          min-h-[calc(100vh-45px)]
          gap-4
          font-hindmadurai
        "
        >
          {/* === LINHA 1 - FASE ATUAL === */}
          <div
            className=" flex flex-wrap justify-center items-center gap-2 py-3 bg-[#fefefe] rounded-md shadow-sm
            lg:col-span-4 lg:row-span-1 lg:m-2"
          >
            {[
              { num: 1, label: 'Endereço' },
              { num: 2, label: 'Entrega' },
              { num: 3, label: 'Revisão' },
            ].map((step) => (
              <div key={step.num} className="flex items-center justify-center gap-1">
                <div className="bg-[#f6f3ea] h-[30px] w-[30px] rounded-full text-gray-700 font-bold flex items-center justify-center">
                  {step.num}
                </div>
                <div className="text-gray-700 font-semibold text-sm sm:text-base">{step.label}</div>
              </div>
            ))}
            <div
              className="bg-white rounded-md p-4
            lg:col-span-4 lg:row-span-1
            flex flex-col justify-center lg:justify-start
          "
            >
              <div className="font-hindmadurai font-bold text-lg sm:text-xl uppercase mb-3 tracking-tight text-center lg:text-left">
                Como você prefere receber seus produtos?
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col justify-around gap-3">
                <div className="border cursor-pointer border-gray-300 w-full sm:w-1/2 lg:w-1/2 hover:shadow-md p-3 flex items-center justify-center rounded-md">
                  <Icon svg="truck" height="25px" width="25px" />
                  <div className="font-semibold text-base pl-2">ENTREGA</div>
                </div>
                <div className="border cursor-pointer border-gray-300 w-full sm:w-1/2 lg:w-1/2 hover:shadow-md p-3 flex items-center justify-center rounded-md">
                  <Icon svg="store" height="30px" width="30px" />
                  <div className="font-semibold text-base pl-2">RETIRADA</div>
                </div>
              </div>
            </div>
            {/* Fim das 4 primeiras colunas linha 1 */}


          </div>

          {/* === NOVO ENDEREÇO === */}
          <div
            className="
            bg-gray-50 rounded-md p-4
            lg:col-span-4 lg:row-span-2
            flex flex-col lg:flex-row justify-center
          "
          >
            <div>
              <div id="selectAddress">
                <div className="mb-3">Em qual endereço você deseja receber?</div>
                <ul id="AddressesArea" className="flex gap-2 flex-wrap justify-center lg:justify-start">
                  {addresses.map((item) => (
                    <AddressCard address={item} selectAddress={getSelectedAddress} />
                  ))}
                </ul>
              </div>
              <div id="newAddress">
                <div className="flex justify-between my-3">
                  <div>Quero receber em outro endereço</div>
                  <div
                    id="downArrow"
                    onClick={() => setReceiveInAnotherAddress(!receiveInAnotherAddress)}
                    className={`${receiveInAnotherAddress ? 'rotate-90' : '-rotate-90'} transition-transform duration-300`}
                  >
                    <Icon svg="rightarrow" height="24px" width="24px" />
                  </div>
                </div>
                {receiveInAnotherAddress &&
                  <NewAddressForm />
                }
              </div>
            </div>

          </div>

          {/* === ITENS DO CARRINHO === */}
          <div
            className="
            bg-gray-100 rounded-md p-4
            lg:col-span-4 lg:row-span-2
            flex flex-col
          "
          >
            <div className="text-xl font-bold mb-3">Resumo do pedido</div>
            {cart && cart.cartItems.length > 0 ? (
              <div className="flex flex-col gap-2 overflow-y-auto max-h-[60vh] pr-2">
                {cart.cartItems.map((item) => (
                  <CheckoutItem
                    key={item.cartItem.id}
                    id={item.lunchboxId ? item.lunchboxId : (item.kitId as number)}
                    title={item.cartItem.name}
                    imageUrl={item.cartItem.imageUrl as string}
                    portionGram={200}
                    price={item.cartItem.price}
                    quantityInCart={item.quantity}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Seu carrinho está vazio</p>
            )}

            <div className="flex justify-start mt-4 items-center px-2">
              <div className="text-2xl font-semibold">
                Total: R$ {total.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

};

export default DeliveryPage;
