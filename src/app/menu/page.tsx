"use client"

import CardItem01 from '@/components/CardItem01';
import Navbar from '@/components/Navbar';
import { SideMenu } from '@/components/SideMenu';
import React, { useState } from 'react'
import MarmitasData from '../../Data/Marmitas.json';
import { MarmitaType } from '@/types/MarmitaType';

const MenuPage = () => {

    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const [marmitas, setMarmitas] = useState<MarmitaType[]>(MarmitasData);

    const handleMenuToggle = () => {
        setIsMenuOpened(prev => {
            return !prev
        });
    }

    const addMarmita = () => {
        console.log("Adding Marmita")
    }

    const removeMarmita = () => {
        console.log("Removing Marmita")
    }

    return (
        <>
            <Navbar isMenuOpened={isMenuOpened} onMenuToggle={handleMenuToggle} />
            <SideMenu menuOpened={isMenuOpened} onClose={handleMenuToggle} />

            <div className='container mx-auto pt-20 grid md:grid-cols-4 gap-4 place-items-center md:mx-5 justify-center'>
                {marmitas.map((item) => (
                    <CardItem01 key={item.id} title={item.title} price={item.price} portion={item.portion} urlImage={item.urlImage} onAdd={addMarmita} onRemove={removeMarmita} />
                ))}
            </div>


        </>
    )
}

export default MenuPage