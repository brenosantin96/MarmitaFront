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
import Modal01 from "@/components/Modal01";
import axios from "axios";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Calendar from 'react-calendar'
import CalendarComponent from "@/components/CalendarComponent";
import { DeliveryInfoDraft } from "@/types/DeliveryType";

type selectedDateType = Date | null;

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const DeliveryTimePage = () => {

  const route = useRouter();
  const { user, isLoadingUser } = useUserContext();
  const { isOpen, openAndCloseCart, cart, cartItems, setCart, setCartItems, getActualCart } = useCartContext();

  const [total, setTotal] = useState(0);

  //deliveryInfo
  const [deliveryDate, setDeliveryDate] = useState<Value>(null);
  const [deliveryPeriod, setDeliveryPeriod] = useState("");


  const handleDateClick = (value: Value) => {
    // Para o TS não reclamar do format, garantimos que é uma Date única
    const date = Array.isArray(value) ? value[0] : value;

    if (date) {
      const formattedDate = format(date, 'dd-MMM-yyyy', { locale: ptBR });
      console.log('Data selecionada:', formattedDate);
    }

    setDeliveryDate(value);
  };


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
    if (!isLoadingUser && user === null) {
      console.log("Usuário não logado, redirecionando...");
      route.push("/login");
    }
  }, [isLoadingUser, user]);


  if (isLoadingUser) {
    return <p className="text-center mt-20">Carregando usuário...</p>;
  }

  if (user === null) {
    return <p className="text-center mt-20">Redirecionando...</p>;
  }


  const goToNextStepDeliveryTime = async () => {

    if (cart) {

    }
    //PRIMEIRO MOMENTO OBTER DELIVERYPERIOD COM id, cartId, addressId, deliveryType, canLeaveAtDoor
    //SEGUNDO MOMENTO ENVIAR OUTRA REQUISICAO NOVAMENTE COM TUDO ISSO + selectedDate + DeliveryDate

  }


  return (
    <>
      {/* HEADER FIXO */}
      <header className="w-full bg-green-400 h-[45px] text-white flex items-center justify-center px-3 text-sm sm:text-base">
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
          lg:grid-rows-[70px_auto_1fr]
          min-h-[calc(100vh-45px)]
          gap-4
          font-hindmadurai
        "
        >



          {/* === LINHA 1 - primeira coluna === */}
          <div className=" flex flex-wrap justify-center items-center gap-2 py-3 rounded-md shadow-sm lg:col-span-8 lg:row-start-1 lg:m-2">
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
          </div>


          {/*linha 2 - primeira coluna*/}
          <div className="bg-red-300 rounded-md p-4 lg:col-span-8 lg:row-start-2 flex flex-col justify-center lg:justify-start">

            <div className="font-hindmadurai font-bold text-lg sm:text-xl uppercase mb-3 tracking-tight text-center lg:text-left">
              Quando você prefere receber seus produtos?
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col justify-around gap-3">
              <div className="flex items-center justify-center">
                <CalendarComponent onChange={handleDateClick} selectedDate={deliveryDate} />
              </div>
            </div>
          </div>

          {/*linha 3 - primeira coluna*/}
          <div className="bg-red-300 rounded-md p-4 lg:col-span-8 lg:row-start-3 flex flex-col justify-center lg:justify-start">

            <div className="font-hindmadurai font-bold text-lg sm:text-xl uppercase mb-3 tracking-tight text-center lg:text-left">
              Em qual período você prefere receber seus produtos?
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-row justify-around gap-3">
              <div>ComponenteCard</div>
              <div>ComponenteCard</div>
              <div>ComponenteCard</div>
            </div>
          </div>


          { /* linha 1,2,3 / terceira coluna */}
          <div className="bg-gray-100 rounded-md p-4 lg:col-span-4 lg:row-start-1 lg:row-end-4 flex flex-col">
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

export default DeliveryTimePage;
