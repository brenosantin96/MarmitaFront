"use client"

import SearchIcon from "@/components/Icons/SearchIcon";
import Modal01 from "@/components/Modal01";
import ModalAddress from "@/components/ModalAddress";
import Navbar from "@/components/Navbar";
import { SideMenu } from "@/components/SideMenu";
import { Icon } from "@/components/svg/Icon";
import { useState } from "react";

const HomePage = () => {


  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isModalAddressOpened, setIsModalAddressOpened] = useState(false);


  const handleMenuToggle = () => {
    setIsMenuOpened(prev => {
      return !prev
    });
  }

  const handleCloseModalAddress = () => {
    setIsModalAddressOpened(false);
  }

  return (
    <>
      <Navbar isMenuOpened={isMenuOpened} onMenuToggle={handleMenuToggle} />
      <SideMenu menuOpened={isMenuOpened} onClose={handleMenuToggle} />

      <div className="mt-14 bg-[#F8F5EC] flex items-center" onClick={() => setIsModalAddressOpened(prev => !prev)}>
        <div className="px-2">
          <Icon svg="location2" width="20px" height="20px" />
        </div>
        <div className="text-sm py-1">
          <div>Endereço de entrega</div>
          <div><strong>Será que entrega?</strong></div>
        </div>
      </div>

      <ModalAddress handleClose={handleCloseModalAddress} isOpen={isModalAddressOpened} modalTitle="Será que entrega?"/>

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