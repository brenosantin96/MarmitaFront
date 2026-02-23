//src\app\checkout\payment\page.tsx
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
import PeriodCard from "@/components/PeriodCard";
import { useDeliveryInfoContext } from "@/context/DeliveryInfoContext";
import PaymentMethodCard from "@/components/PaymentMethodCard";
import ReviewCard from "@/components/ReviewCard";


const PaymentPage = () => {

  const route = useRouter();
  const { user, isLoadingUser } = useUserContext();
  const { isOpen, openAndCloseCart, cart, cartItems, setCart, setCartItems, getActualCart } = useCartContext();
  const { deliveryInfo, getActualDeliveryInfo, clearDeliveryInfo, setDeliveryInfo } = useDeliveryInfoContext();
  const [total, setTotal] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState<"PIX" | "CARTAO">("PIX");

  useEffect(() => {
    if (!cart) return;
    const newTotal = cart.cartItems.reduce((valueAcumulated, item) => {
      return valueAcumulated + item.cartItem.price * item.quantity;
    }, 0);
    setTotal(newTotal);
  }, [cart]);

  return (
    <>
      {/* HEADER FIXO */}
      <header className="w-full bg-red-700 h-[45px] text-white flex items-center justify-center px-3 text-sm sm:text-base">
        <div>
          São <span className="underline">{cart ? cart.cartItems.reduce((acc, item) => acc + item.quantity, 0) : 0} itens</span> no total de <strong>{formatPriceToBRL(total)}</strong>
        </div>
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
          <div className="rounded-md gap-3 p-4 lg:col-span-8 lg:row-start-2 flex flex-col justify-center lg:justify-start">

            <div className="font-hindmadurai font-bold text-lg sm:text-xl uppercase mb-3 tracking-tight text-center lg:text-left">
              Revisão do pedido
            </div>

            <div>
              <ReviewCard
                description="Receber em"
                subdescription="Avenida Paulista"
                svg="truck"
                heightSvg="32px"
                widthSvg="32px"
              />
            </div>
            <div>
              <ReviewCard
                description="Quarta, 25 de fev de 2026"
                subdescription="Pela tarde, das 14h às 19h"
                svg="calendar"
                heightSvg="32px"
                widthSvg="32px"
              />
            </div>
            <div>
              <ReviewCard
                description="PIX"
                subdescription="Pagamento instantâneo"
                svg="money"
                heightSvg="32px"
                widthSvg="32px"
              />
            </div>
          </div>

          {/*linha 3 - primeira coluna*/}
          <div className="rounded-md p-4 lg:col-span-8 lg:row-start-3 flex flex-col justify-center lg:justify-start">

            <Button01
                  onClick={() => console.log("pagando")}
                  backgroundColor='bg-blue-800'
                  textColor='text-white'
                  width='w-full'
                  classes='h-10'
                  disabled={false}
                // 👈 desabilita se form não for válido
                >
                  Continuar
                </Button01>
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

export default PaymentPage;


/*
              <div className="flex flex-col sm:flex-row gap-3">
                <PaymentMethodCard
                  label="PIX"
                  value="PIX"
                  selected={selectedPayment === "PIX"}
                  onSelect={setSelectedPayment}
                />
                <PaymentMethodCard
                  label="Cartão de crédito"
                  value="CARTAO"
                  selected={selectedPayment === "CARTAO"}
                  onSelect={setSelectedPayment}
                />
              </div>
*/