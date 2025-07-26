import React from 'react';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { Icon } from './svg/Icon';
import Link from 'next/link';
import categoriesData from '../Data/Categories.json';

type NavBarProps = {
    isMenuOpened: boolean;
    onMenuToggle: () => void;
};

const Navbar = ({ isMenuOpened, onMenuToggle }: NavBarProps) => {
    const isScreenMDOrHigher = useBreakpoint('md');

    return (
        <nav className="fixed top-0 left-0 w-full z-50 font-hindmadurai bg-white shadow-md h-[56px] flex items-center justify-around px-4">
            {!isScreenMDOrHigher ? (
                <>
                    <div onClick={onMenuToggle} className="cursor-pointer">
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
                        <Icon svg="user" height="24" width="24" />
                    </div>
                    <div className="cursor-pointer">
                        <Icon svg="cart2" height="24" width="24" />
                    </div>
                </>
            ) : (
                <>
                    <div id="MDHigherLogoLeft" className="cursor-pointer">
                        <Link href="/">
                            <Icon svg="logo2" height="50" width="50" fillColor="#ff0000" />
                        </Link>
                    </div>
                    <div id="MDOptionsLeft" className="font-semibold text-sm">
                        <ul className="flex gap-6">
                            <li className="relative group cursor-pointer-300 px-4 py-4">
                                Marmitas
                                <ul className="absolute left-0 top-full shadow-md rounded-md flex-col z-50 min-w-[150px] text-sm 
                                opacity-0 scale-95 pointer-events-none 
                                group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto 
                                transition-all duration-200 ease-out">
                                    {categoriesData.map((category) => (
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
                        </ul>

                    </div>
                    <div id="MDOptionsRight">
                        Teste
                    </div>

                </>
            )}
        </nav>
    );
};

export default Navbar;
