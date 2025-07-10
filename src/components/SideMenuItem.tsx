import Link from 'next/link'
import React from 'react'
import { Icon } from './svg/Icon'

type PropsSideMenuItem = {
    itemText: string,
    itemLink: string,
}

const SideMenuItem = ({itemText, itemLink}: PropsSideMenuItem) => {
    return (
        <div className='flex justify-between pt-7 border-b border-gray-300'>
            <div className='text-xl line py-4 '>
                {itemText}
            </div>
            <div className='py-5'>
                <Link href={itemLink}>
                    <Icon svg='rightarrow' width='16px' height='16px' fillColor='#000' />
                </Link>
            </div>
        </div>
    )
}

export default SideMenuItem