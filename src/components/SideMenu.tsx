import React from 'react'
import { Icon } from './svg/Icon';

type PropsSidedMenu = {
    menuOpened: boolean;
    onClose: () => void;
}

export const SideMenu = ({menuOpened, onClose} : PropsSidedMenu) => {
  return (
    <div className={` ${menuOpened ? 'w-screen' : 'w-0'} bg-white fixed top-0 bottom-0 left-0 z-30 transition-all duration-200 ease-in overflow-hidden`}>
        <div className='flex justify-between p-3'>
            <div className='font-amsi font-bold text-lg'>CATEGORIAS</div>
            <div onClick={onClose} className="cursor-pointer bg-[#f6f3ea] rounded-full flex justify-center items-center w-8 h-8">
            <Icon svg='close' width='16' height='16' />
            </div>
        </div>

        <div>
            <p>Text</p>
            <p>Text</p>
            <p>Text</p>
        </div>
    </div>
  )
}


//a classe pai vai usar o sidemenu

//#f6f3ea