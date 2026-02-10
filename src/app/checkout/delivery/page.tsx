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

const DeliveryPage = () => {

  const route = useRouter();
  const { user, isLoadingUser } = useUserContext();
  const { isOpen, openAndCloseCart, cart, cartItems, setCart, setCartItems, getActualCart } = useCartContext();

  const [total, setTotal] = useState(0);
  const [receiveInAnotherAddress, setReceiveInAnotherAddress] = useState(false);

  const [addresses, setAddresses] = useState<Address[]>([])
  const [pickupAddresses, setPickupAddresses] = useState<Address[]>([]);

  //modalDeleteAdress
  const [isOpenModalDeleteAddress, setIsOpenModalDeleteAddress] = useState(false);
  const [idSelectedAddress, setIdSelectedAddress] = useState<number | null>(null);


  //deliveryInfo
  const [isDeliveryOrPickup, setIsDeliveryOrPickup] = useState<"DELIVERY" | "PICKUP">("DELIVERY");
  const [canLeaveAtDoor, setCanLeaveAtDoor] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Value>(null);
  const [selectedAddressDelivery, setSelectedAddressDelivery] = useState<Address>();



  const handleDateClick = (value: Value) => {
    // Para o TS não reclamar do format, garantimos que é uma Date única
    const date = Array.isArray(value) ? value[0] : value;

    if (date) {
      const formattedDate = format(date, 'dd-MMM-yyyy', { locale: ptBR });
      console.log('Data selecionada:', formattedDate);
    }

    setSelectedDate(value);
  };


  const hitDeliveryButton = () => {
    setIsDeliveryOrPickup("DELIVERY");
    setIdSelectedAddress(null);
  }

  const hitPickupButton = () => {
    setIsDeliveryOrPickup("PICKUP");
    setIdSelectedAddress(null);
  }

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


  //get user addresses
  useEffect(() => {
    if (user) {
      fetchAddresses();
      fetchAdminPickupAddresses();
    }
  }, [user]);

  useEffect(() => {
    if (addresses.length <= 0) {
      setReceiveInAnotherAddress(true)
    } else {
      setReceiveInAnotherAddress(false)
      if (addresses.length === 1) {
        const lastAddress = addresses[addresses.length - 1]
        setIdSelectedAddress(lastAddress.id);
      }
    }
  }, [addresses])

  if (isLoadingUser) {
    return <p className="text-center mt-20">Carregando usuário...</p>;
  }

  if (user === null) {
    return <p className="text-center mt-20">Redirecionando...</p>;
  }

  const fetchAddresses = async (): Promise<Address[]> => {
    if (user) {
      const response = await axios.get(`/api/address/${user.id}`);
      console.log("ADDRESSES: ", response.data);
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
    console.log("pickupAddresses: ", pickupAddresses);
    setPickupAddresses(pickupAddresses);
    return response.data; // retornamos array atualizado


  };

  //pegamos o retorno de fetchAddress
  const onAddressSaved = async () => {
    const updatedAddresses = await fetchAddresses();
    setReceiveInAnotherAddress(false);

    const lastAddress = updatedAddresses.at(-1); // sempre seguro
    if (lastAddress) {
      setIdSelectedAddress(lastAddress.id);
    }
  };

  const getSelectedAddress = (id: number) => {
    console.log("SELECIONANDO ADDRESS: ", id)
    setIdSelectedAddress(id)
  }

  const openModalDeleteAddress = async (id: number) => {
    console.log("AQUI o ID a ser deletado: ID: ", id)
    setIsOpenModalDeleteAddress(true)
    setIdSelectedAddress(id);
  }

  const confirmDeleteSelectedAddress = async (id: number) => {

    try {
      let response = await axios.delete(`/api/address/${id}`)

      setAddresses((prevAddresses) =>
        prevAddresses.filter((item) => item.id !== id)
      );

      setIdSelectedAddress(null);

      fetchAddresses();

    } catch (error) {
      console.error("Erro ao deletar endereço: ", error)
    }


  }

  const goToNextStepDeliveryTime = async () => {

    if (cart) {

      const normalizedRequest = {
        cartId: cart.id,
        addressId: idSelectedAddress,
        deliveryType: isDeliveryOrPickup,
        canLeaveAtDoor: canLeaveAtDoor,
      };

      const response = await axios.post("/api/deliveryinfo",  normalizedRequest );
      console.log("nextStep: ", response)
      route.push("/checkout/deliveryTime");


    }
    //cartId, addressId, deliveryType, canLeaveAtDoor
    //const response = await axios.post()

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
          lg:grid-rows-[70px_auto_1fr]
          min-h-[calc(100vh-45px)]
          gap-4
          font-hindmadurai
        "
        >



          {/* === LINHA 1 - primeira coluna === */}
          <div className=" flex flex-wrap justify-center items-center gap-2 py-3 rounded-md shadow-sm lg:col-span-4 lg:row-start-1 lg:m-2">
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
          <div className=" rounded-md p-4 lg:col-span-4 lg:row-start-2 flex flex-col justify-center lg:justify-start">

            <div className="font-hindmadurai font-bold text-lg sm:text-xl uppercase mb-3 tracking-tight text-center lg:text-left">
              Como você prefere receber seus produtos?
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col justify-around gap-3">
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
          </div>





          { /* linha 1,2,3 / segunda coluna*/}
          <div className=" rounded-md p-4 lg:col-span-4 lg:row-start-1 lg:row-end-4 flex flex-col lg:flex-row justify-center">
            <div>
              <div id="selectAddress">
                <div className="mb-3">
                  {isDeliveryOrPickup === "DELIVERY"
                    ? <>Em qual endereço você deseja <span className="font-bold">RECEBER</span> o pedido?</>
                    : <>Em qual endereço você deseja <span className="font-bold">RETIRAR</span> o pedido?</>}
                </div>
                {isDeliveryOrPickup === "DELIVERY" ?
                  <ul id="AddressesArea" className="flex items-center gap-2 flex-wrap justify-center lg:flex-row lg:justify-start">
                    {addresses.map((item) => (
                      <AddressCard key={item.id} address={item} selectAddress={getSelectedAddress} clickedTrashIcon={openModalDeleteAddress} isSelected={item.id === idSelectedAddress} haveExcludeIcon={true} />
                    ))}
                  </ul>
                  :
                  <ul id="AddressesArea" className="flex items-center gap-2 flex-wrap justify-center lg:flex-row lg:justify-start">
                    {pickupAddresses.map((item) => (
                      <AddressCard key={item.id} address={item} selectAddress={getSelectedAddress} clickedTrashIcon={openModalDeleteAddress} isSelected={item.id === idSelectedAddress} haveExcludeIcon={false} />
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
                      className="
        h-6 w-11 rounded-full
        bg-gray-300
        transition-colors duration-300
        peer-checked:bg-blue-500
      "
                    ></div>

                    {/* bolinha */}
                    <div
                      className="
        absolute left-0.5 top-0.5
        h-5 w-5 rounded-full
        bg-white
        shadow
        transition-transform duration-300
        peer-checked:translate-x-5
      "
                    ></div>
                  </label>
                </div>
              }


              <div id="newAddress" className={`${isDeliveryOrPickup === "PICKUP" ? "hidden" : ""}`}>
                <div className="flex justify-between my-3">
                  <div onClick={() => setReceiveInAnotherAddress(!receiveInAnotherAddress)} >{addresses.length > 0 ? "Quero receber em outro endereço" : "Cadastrar endereço de entrega"}</div>
                  <div
                    id="downArrow"
                    onClick={() => setReceiveInAnotherAddress(!receiveInAnotherAddress)}
                    className={`${receiveInAnotherAddress ? 'rotate-90' : '-rotate-90'} transition-transform duration-300`}
                  >
                    <Icon svg="rightarrow" height="24px" width="24px" />
                  </div>
                </div>
                {receiveInAnotherAddress &&
                  <NewAddressForm onAddressSaved={onAddressSaved} />
                }
              </div>
              <div className="mt-3">
                <Button01
                  onClick={() => goToNextStepDeliveryTime()}
                  backgroundColor='bg-blue-800'
                  textColor='text-white'
                  width='w-full'
                  classes='h-10'
                  disabled={idSelectedAddress == null}
                // 👈 desabilita se form não for válido
                >
                  Continuar
                </Button01>
              </div>
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


      <Modal01
        handleClose={() => setIsOpenModalDeleteAddress(false)}
        isOpen={isOpenModalDeleteAddress}
        modalTitle="Confirma deletar endereço?"
        modalText="Tem certeza que deseja eliminar o endereço selecionado?"
        isModalForDelete={true}
        idToDelete={idSelectedAddress as number}
        handleConfirmDelete={confirmDeleteSelectedAddress}
      />
    </>
  );

};

export default DeliveryPage;
