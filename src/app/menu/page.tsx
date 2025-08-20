"use client"

import CardItem01 from '@/components/CardItem01';
import Navbar from '@/components/Navbar';
import { SideMenu } from '@/components/SideMenu';
import React, { useEffect, useState } from 'react'
import MarmitasData from '../../Data/Marmitas.json';
import { MarmitaType } from '@/types/MarmitaType';
import { useSideMenu } from '@/context/SideMenuContext';
import CartSideMenu from '@/components/CartSideMenu';
import AdminButton from '@/components/AdminButton';
import { useUserContext } from '@/context/UserContext';

const MenuPage = () => {

    const [marmitas, setMarmitas] = useState<MarmitaType[]>(MarmitasData);

    const { user } = useUserContext();

    useEffect(() => {
        console.log(user)
    }, [user])


    const addMarmita = () => {
        console.log("Adding Marmita")
    }

    const removeMarmita = () => {
        console.log("Removing Marmita")
    }

    return (
        <>


            <SideMenu />

            <div id="menuPage" className="pt-28 px-4 w-full">




                <div
                    id="menuList"
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-screen-xl mx-auto justify-items-center"
                >
                    {marmitas.map((item) => (
                        <CardItem01
                            key={item.id}
                            title={item.title}
                            price={item.price}
                            portion={item.portion}
                            urlImage={item.urlImage}
                            onAdd={addMarmita}
                            onRemove={removeMarmita}
                        />
                    ))}
                </div>
            </div>

            <AdminButton />


        </>
    )
}

export default MenuPage