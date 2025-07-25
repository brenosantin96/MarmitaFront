import React from 'react';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { Icon } from './svg/Icon';
import Link from 'next/link';

type NavBarProps = {
    isMenuOpened: boolean;
    onMenuToggle: () => void;
};

const Navbar = ({ isMenuOpened, onMenuToggle }: NavBarProps) => {
    const isScreenMDOrHigher = useBreakpoint('md');

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md h-[56px] flex items-center justify-around px-4">
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
                <div className="text-gray-500">Tela MD ou maior</div>
            )}
        </nav>
    );
};

export default Navbar;
