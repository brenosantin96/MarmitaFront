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

            <div className='pt-20'>
                <CardItem01
                    title={marmitas[0].title}
                    price={marmitas[0].price}
                    portion={marmitas[0].portion}
                    key={marmitas[0].id}
                    urlImage={marmitas[0].urlImage}
                    onAdd={addMarmita}
                    onRemove={removeMarmita}
                />
            </div>


        </>
    )
}

export default MenuPage