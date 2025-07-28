import React from 'react'
import { Icon } from './svg/Icon';
import { useCartContext } from '@/context/CartContext';


type PropsCartSideMenu = {

}

const CartSideMenu = () => {

    const {isOpen, openAndCloseCart} = useCartContext();

    return (
        <div className={` ${isOpen ? 'w-screen' : 'w-0'}  bg-white fixed top-0 bottom-0 right-0 z-50 transition-all duration-200 ease-in overflow-hidden`}>
            <div className='flex justify-end items-center pr-3.5 h-14 border-b-1 border-gray-100'>
                <div className='text-xs font-bold mr-[-3px]'>OCULTAR</div>
                <div onClick={openAndCloseCart} className="cursor-pointer  rounded-full flex justify-center items-center w-8 h-8">
                    <Icon svg='close2' width='16' height='16' />
                </div>
            </div>

            <div id="CategoriesList" className='mx-auto h-screen'>
                <img src={"./emptyCart.png"}></img>
            </div>

        </div>
    )
}

export default CartSideMenu