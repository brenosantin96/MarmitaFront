import React from 'react'
import { Icon } from './svg/Icon'

type NavBarProps = {
    isMenuOpened: boolean;
    onMenuToggle: () => void;
}


const Navbar = ({isMenuOpened, onMenuToggle} : NavBarProps) => {

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md h-[56px] flex items-center justify-around px-4" >
        <div onClick={(onMenuToggle)}>
            <Icon svg="menu" height='24' width='24'/>
        </div>
        <div>
            <Icon svg="search" height='24' width='24'/>
        </div>
        <div>
            <Icon svg="logo2" height='32' width='32' fillColor='#000'/>
        </div>
        <div>
            <Icon svg="user" height='24' width='24'/>
        </div>
        <div>
            <Icon svg="cart2" height='24' width='24'/>
        </div>
    </nav>
  )
}

export default Navbar