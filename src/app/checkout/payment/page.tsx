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
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);


  //changeAddress
  const [changingAddress, setChangingAddress] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([])
  const [pickupAddresses, setPickupAddresses] = useState<Address[]>([]);
  const [isDeliveryOrPickup, setIsDeliveryOrPickup] = useState<"DELIVERY" | "PICKUP">("DELIVERY");
  const [canLeaveAtDoor, setCanLeaveAtDoor] = useState(false);
  const [idSelectedAddress, setIdSelectedAddress] = useState<number | null>(null);

  useEffect(() => {
    if (!cart) return;
    const newTotal = cart.cartItems.reduce((valueAcumulated, item) => {
      return valueAcumulated + item.cartItem.price * item.quantity;
    }, 0);
    setTotal(newTotal);
  }, [cart]);

  useEffect(() => {
    fetchAddress();
  }, [deliveryInfo])

  useEffect(() => {
    fetchAddresses();
    fetchAdminPickupAddresses();
  }, [deliveryInfo, changingAddress])


  const fetchAddress = async (): Promise<Address[]> => {
    if (deliveryInfo) {
      const response = await axios.get(`/api/addressIndividual/${deliveryInfo.addressId}`);
      console.log("ADDRESSS: ", response.data);
      setSelectedAddress(response.data);
    }
    return [];
  };

  const fetchAddresses = async (): Promise<Address[]> => {
    if (user) {
      const response = await axios.get(`/api/address/${user.id}`);
      setAddresses(response.data);
      return response.data; // retornamos array atualizado
    }
    return [];
  };

  //change this later after creating a controller to get adminAddresses
  const fetchAdminPickupAddresses = async (): Promise<Address[]> => {

    const response = await axios.get(`/api/address`);
    if (!response) {
      return []
    }

    const addresses: Address[] = response.data;
    const pickupAddresses = addresses.filter((a) => a.userId === 5)
    setPickupAddresses(pickupAddresses);
    return response.data; // retornamos array atualizado
  };

  const changeDeliveryTime = () => {
    if (deliveryInfo) {
      setDeliveryInfo(prev => {
        if (!prev) return prev;

        return {
          ...prev,
          deliveryPeriod: null,
          deliveryDate: null,
        };
      });

      route.push("/checkout/deliveryTime");
    }
  };

  const changeAddressDeliveryInfo = () => {
    if (!deliveryInfo) return;
    setChangingAddress((prev) => !prev);
  };

  const getSelectedAddress = (id: number) => {
    console.log("SELECIONANDO ADDRESS: ", id)
    setIdSelectedAddress(id)
  }

    const hitDeliveryButton = () => {
    setIsDeliveryOrPickup("DELIVERY");
    setIdSelectedAddress(null);
  }

  const hitPickupButton = () => {
    setIsDeliveryOrPickup("PICKUP");
    setIdSelectedAddress(null);
  }


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
          <div className="rounded-md gap-3 p-4 lg:col-span-8 lg:row-start-2 lg:row-end-4 flex flex-col justify-center lg:justify-start">

            <div className="font-hindmadurai font-bold text-lg sm:text-xl uppercase mb-3 tracking-tight text-center lg:text-left">
              Revisão do pedido
            </div>

            <div>
              <ReviewCard
                description="Receber em"
                subdescription={`${selectedAddress?.street}, ${selectedAddress?.number}`}
                svg="truck"
                heightSvg="32px"
                widthSvg="32px"
                handleClick={changeAddressDeliveryInfo}
              />

              {changingAddress && (
              <div className="rounded-md p-4 lg:col-span-4 lg:row-start-1 lg:row-end-4 flex flex-col lg:flex-row justify-center">
                <div>
                  <div id="selectAddress">
                    <div className="flex flex-col sm:flex-row lg:flex-row justify-around gap-3">
                      {/* DELIVERY */}
                      <div
                        onClick={() => hitDeliveryButton()}
                        className={`
                            border cursor-pointer w-full sm:w-1/2 lg:w-1/2 
                            hover:shadow-md p-3 flex items-center justify-center rounded-md 
                            ${isDeliveryOrPickup === "DELIVERY" ? "border-red-500" : "border-gray-300"}
                          `}
                      >
                        <Icon svg="truck" height="25px" width="25px" />
                        <div className="font-semibold text-base pl-2">ENTREGA</div>
                      </div>

                      {/* PICKUP */}
                      <div
                        onClick={() => hitPickupButton()}
                        className={`
                            border cursor-pointer w-full sm:w-1/2 lg:w-1/2 
                            hover:shadow-md p-3 flex items-center justify-center rounded-md 
                            ${isDeliveryOrPickup === "PICKUP" ? "border-red-500" : "border-gray-300"}
                          `}
                      >
                        <Icon svg="store" height="25px" width="25px" />
                        <div className="font-semibold text-base pl-2">RETIRADA</div>
                      </div>
                    </div>
                    <div className="mb-3">
                      {isDeliveryOrPickup === "DELIVERY"
                        ? <>Em qual endereço você deseja <span className="font-bold">RECEBER</span> o pedido?</>
                        : <>Em qual endereço você deseja <span className="font-bold">RETIRAR</span> o pedido?</>}
                    </div>
                    {isDeliveryOrPickup === "DELIVERY" ?
                      <ul id="AddressesArea" className="flex items-center gap-2 flex-wrap justify-center lg:flex-row lg:justify-start">
                        {addresses.map((item) => (
                          <AddressCard key={item.id} address={item} selectAddress={getSelectedAddress} clickedTrashIcon={() => console.log("n")} isSelected={item.id === idSelectedAddress} haveExcludeIcon={false} />
                        ))}
                      </ul>
                      :
                      <ul id="AddressesArea" className="flex items-center gap-2 flex-wrap justify-center lg:flex-row lg:justify-start">
                        {pickupAddresses.map((item) => (
                          <AddressCard key={item.id} address={item} selectAddress={getSelectedAddress} clickedTrashIcon={() => console.log("n")} isSelected={item.id === idSelectedAddress} haveExcludeIcon={false} />
                        ))}
                      </ul>
                    }


                  </div>

                  {isDeliveryOrPickup === "DELIVERY" &&
                    <div className="my-3 flex items-center justify-between">
                      <h3 className="text-base font-bold text-gray-700">
                        Deixar na portaria
                      </h3>

                      <label className="relative inline-flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          checked={canLeaveAtDoor}
                          onChange={(e) => setCanLeaveAtDoor(e.target.checked)}
                          className="peer sr-only"
                        />

                        {/* trilho */}
                        <div
                          className="h-6 w-11 rounded-full bg-gray-300 transition-colors duration-300 peer-checked:bg-blue-500"></div>

                        {/* bolinha */}
                        <div className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full  bg-white shadow transition-transform duration-300 peer-checked:translate-x-5"></div>
                      </label>
                    </div>
                  }

                  <div className="mt-3">
                    <Button01
                      onClick={() => console.log("CU")}
                      backgroundColor='bg-blue-800'
                      textColor='text-white'
                      width='w-full'
                      classes='h-10'
                      disabled={false}
                    // 👈 desabilita se form não for válido
                    >
                      SALVAR
                    </Button01>
                  </div>
                </div>

              </div>
              )}


            </div>

            <div>
              <ReviewCard
                description={
                  deliveryInfo?.deliveryDate
                    ? format(deliveryInfo.deliveryDate as Date, "dd-MMM-yyyy", { locale: ptBR })
                    : ""
                }
                subdescription={
                  deliveryInfo?.deliveryPeriod === "MORNING"
                    ? "Pela manhã, de 8h às 13h"
                    : deliveryInfo?.deliveryPeriod === "AFTERNOON"
                      ? "Pela tarde, de 14h às 19h"
                      : deliveryInfo?.deliveryPeriod === "NIGHT"
                        ? "Pela noite, de 18h às 22h"
                        : ""
                }
                svg="calendar"
                heightSvg="32px"
                widthSvg="32px"
                handleClick={() => changeDeliveryTime()}
              />
            </div>
            <div>
              <ReviewCard
                description="PIX"
                subdescription="Pagamento instantâneo"
                svg="money"
                heightSvg="32px"
                widthSvg="32px"
                handleClick={() => console.log("Clicado")}
              />
            </div>

            <div className="mt-4">
              <Button01
                onClick={() => console.log("pagando")}
                backgroundColor='bg-blue-800'
                textColor='text-white'
                width='w-full'
                classes='h-10'
                disabled={false}
              >
                Continuar
              </Button01>
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