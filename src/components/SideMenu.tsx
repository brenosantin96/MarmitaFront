import React from 'react'
import { Icon } from './svg/Icon';
import Link from 'next/link';
import SideMenuItem from './SideMenuItem';
import { useSideMenu } from '@/context/SideMenuContext';

type PropsSidedMenu = {

}

export const SideMenu = () => {


  const { openAndCloseSideMenu, isOpen } = useSideMenu();

  return (
    <div className={` ${isOpen ? 'w-screen' : 'w-0'}  bg-white fixed top-0 bottom-0 left-0 z-30 transition-all duration-200 ease-in overflow-hidden`}>
      <div className='flex justify-between pt-3 px-3'>
        <div className='font-amsi font-bold text-lg'>CATEGORIAS</div>
        <div onClick={openAndCloseSideMenu} className="cursor-pointer bg-[#f6f3ea] rounded-full flex justify-center items-center w-8 h-8">
          <Icon svg='close' width='16' height='16' />
        </div>
      </div>

      <div id="CategoriesList" className='mx-auto w-11/12'>
        <SideMenuItem itemLink='#' itemText='Marmitas' />
        <SideMenuItem itemLink='#' itemText='Fit' />
        <SideMenuItem itemLink='#' itemText='Guloseimas' />
      </div>

    </div>
  )
}


//a classe pai vai usar o sidemenu

//#f6f3ea