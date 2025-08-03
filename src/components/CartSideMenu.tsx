import React from 'react'
import { Icon } from './svg/Icon';
import { useCartContext } from '@/context/CartContext';


type PropsCartSideMenu = {

}

const CartSideMenu = () => {

    const { isOpen, openAndCloseCart } = useCartContext();

    return (
        <div className={` ${isOpen ? 'w-screen md:w-1/3' : 'w-0'}  bg-white fixed top-0 bottom-0 right-0 z-50 transition-all duration-200 ease-in overflow-hidden`}>
            <div className='flex justify-end items-center pr-3.5 h-14 border-b-1 border-gray-100'>
                <div className='text-xs font-bold mr-[-3px]'>OCULTAR</div>
                <div onClick={openAndCloseCart} className="cursor-pointer  rounded-full flex justify-center items-center w-8 h-8">
                    <Icon svg='close2' width='16' height='16' />
                </div>
            </div>

            <div id="CategoriesList" className='mx-auto h-screen'>
                <div className="flex flex-col justify-center items-center mt-10">
                    <img className='w-[160px]' src={"./images/emptyCart.png"}></img>
                    <div className='text-center w-2/3'>
                        <div className='font-amsi font-bold text-base uppercase'>Sua sacola está vazia</div>
                        <p className="text-sm">Navegue pelas categorias ou faça uma busca por produtos.</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CartSideMenu