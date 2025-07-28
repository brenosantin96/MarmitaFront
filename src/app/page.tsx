"use client"

import Button01 from "@/components/Button01";
import CartSideMenu from "@/components/CartSideMenu";
import ModalAddress from "@/components/ModalAddress";
import Navbar from "@/components/Navbar";
import { SideMenu } from "@/components/SideMenu";
import { Icon } from "@/components/svg/Icon";
import Link from "next/link";
import { useState } from "react";

const HomePage = () => {

  const [isModalAddressOpened, setIsModalAddressOpened] = useState(false);

  const handleCloseModalAddress = () => {
    setIsModalAddressOpened(false);
  }

  return (
    <>
      <Navbar />
      <SideMenu />
      <CartSideMenu />

      <div id="homepage" className="container mx-auto ">
        <div className="mt-14 bg-[#F8F5EC] flex items-center sm:hidden" onClick={() => setIsModalAddressOpened(prev => !prev)}>
          <div className="px-2">
            <Icon svg="location2" width="20px" height="20px" />
          </div>
          <div className="text-sm py-1">
            <div>Endereço de entrega</div>
            <div><strong>Será que entrega?</strong></div>
          </div>
        </div>

        <div id="newsBanner" className="mt-2 sm:mt-20 px-4 flex justify-center w-full">
          <img src="/images/bannerPerfomance.png" alt="banner" className="object-fit object-center w-full max-h-[280px] rounded-lg" />
        </div>

        <div className="flex justify-center items-center">
          <Link href={"/menu"} className="w-full mx-3 mt-5 sm:w-2/3">
            <Button01 disabled={false} classes=""> VER CARDÁPIO COMPLETO </Button01>
          </Link>
        </div>

      </div>     

      <ModalAddress handleClose={handleCloseModalAddress} isOpen={isModalAddressOpened} modalTitle="Será que entrega?" />

    </>
  );
}

export default HomePage;

//font-family: "Amsi Pro Normal", "Hind Madurai", -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";


/* 
      <div className="my-80 bg-red-200 font-oswald text-2xl">TESTE OSWALD Teste Oswald</div>
      <div className="my-80 bg-red-200 font-tiktok text-2xl">TESTE TIKTOK Teste Tiktok</div>
      <div className="my-80 bg-red-200 font-inter text-2xl">TESTE INTER Teste Inter</div>
      <div className="my-80 bg-red-200 font-amsi text-2xl font-semibold">TESTE ANSIPROBOLD Teste AnsiProBold</div>
      <div className="my-80 bg-red-200 font-hindmadurai text-2xl">TESTE hindmadurai Teste hindmadurai</div>
      <div className="my-80 bg-red-200 text-2xl">TESTE NORMAL Teste Normal</div> 
      
*/