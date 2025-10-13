"use client"

import React, { useEffect, useState } from 'react';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { Icon } from './svg/Icon';
import Link from 'next/link';
import { useModalAddress } from '@/context/ModalAddressContext';
import { useSideMenu } from '@/context/SideMenuContext';
import { useCartContext } from '@/context/CartContext';
import { useUserContext } from '@/context/UserContext';
import AdminButton from './AdminButton';
import { Category } from '@/types/Category';
import axios from 'axios';
import { useCategorieContext } from '@/context/CategoryContext';

type NavBarProps = {
};

const Navbar = () => {

    const isScreenMDOrHigher = useBreakpoint('md');
    const { openModal } = useModalAddress();
    const { openAndCloseSideMenu } = useSideMenu();
    const { openAndCloseCart } = useCartContext();
    const { categories } = useCategorieContext();


    const { user } = useUserContext();

    useEffect(() => {
        getAllCategories();
    }, [categories]);


    const getAllCategories = async () => {

        const res = await axios.get(`/api/categories`)
        if (res.status !== 200) {
            console.log("Algo ocorreu, nao foi possivel retornar as categorias")
            return []
        } else {
            console.log(res.data);
        }
    }



    return (
        <nav className="fixed top-0 left-0 w-full z-40 font-hindmadurai bg-white shadow-md h-[56px] md:h-[96px] flex items-center justify-around px-4">
            {/*Se a screen NAO for maior que MD */}
            {!isScreenMDOrHigher ? (
                <>
                    <div onClick={openAndCloseSideMenu} className="cursor-pointer">
                        <Icon svg="menu" height="24" width="24" />
                    </div>
                    <div className="cursor-pointer">
                        <Icon svg="search" height="24" width="24" />
                    </div>
                    <div className="cursor-pointer">
                        <Link href="/">
                            <Icon svg="logo2" height="32" width="32" fillColor="#000" />
                        </Link>
                    </div>
                    <div className="cursor-pointer">
                        <Link href="/signup">
                            <Icon svg="user" height="24" width="24" />
                        </Link>
                    </div>
                    <div onClick={() => openAndCloseCart(true)} className="cursor-pointer">
                        <Icon svg="cart2" height="24" width="24" />
                    </div>
                    {user !== null &&
                        <div>
                            <AdminButton />
                        </div>
                    }
                </>
            ) : (
                <div className='w-full grid grid-col-12'>
                    <div id="MDHigherLogoLeft" className="cursor-pointer grid pl-7 col-start-1 col-end-1">
                        <Link href="/">
                            <Icon svg="logo2" height="80" width="80" fillColor="#ff0000" />
                        </Link>
                    </div> {/*Aqui tem q colocar que o grid comeca na linh */}
                    <div className='grid col-start-2 col-end-13'>
                        <div id="MDOptionsLeft" className="font-semibold text-sm flex justify-between items-center">
                            <ul className="flex items-center gap-6">

                                <li className="relative group cursor-pointer-300 px-4 py-4">
                                    <Link href="/menu">
                                        <p>Marmitas</p>
                                    </Link>
                                    <ul className="absolute bg-white left-0 top-full shadow-md rounded-md flex-col z-50 min-w-[150px] text-sm 
                                opacity-0 scale-95 pointer-events-none 
                                group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto 
                                transition-all duration-200 ease-out">
                                        {categories.map((category) => (
                                            <li
                                                key={category.id}
                                                className="px-4 py-2 hover:bg-color-2 cursor-pointer whitespace-nowrap"
                                            >
                                                {category.name}
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                                <li className="cursor-pointer">Mais categorias</li>
                                <li className="cursor-pointer">A Mimo Marmitas</li>
                                {user !== null &&
                                    <li className="cursor-pointer"><AdminButton /></li>
                                }
                            </ul>

                            <div className=' h-full flex items-center pr-10'>
                                <button className='h-12 cursor-pointer'>
                                    <div className='py-3 px-6'>
                                        <Icon svg='search' height='24' width='24' />
                                    </div>
                                </button>
                                <button className='h-12 cursor-pointer'
                                    onClick={openModal}
                                >
                                    <div className='py-3 px-6'>
                                        <Icon svg='location2' height='24' width='24' />
                                    </div>
                                </button>
                                <button className='h-12 cursor-pointer'>
                                    <div className='py-3 px-6'>
                                        <Link href="/signup">
                                            <Icon svg='user' height='24' width='24' />
                                        </Link>
                                    </div>
                                </button>
                                <button onClick={() => openAndCloseCart(true)} className='bg-green-700 rounded-full h-12 cursor-pointer flex items-center px-5'>
                                    <div className='pr-2'>
                                        <Icon svg='cart2' height='24' width='24' fillColor='#fff' strokeColor='#fff' />
                                    </div>
                                    <div className='text-white'>
                                        Sua sacola
                                    </div>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

            )
            }
        </nav >
    );
};

export default Navbar;


//navbar device mobiles 56px
//navbar medium devices 96px