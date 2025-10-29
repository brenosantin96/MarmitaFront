import React from 'react'
import { Icon } from './svg/Icon'
import { Address } from '@/types/Address'

type AddressCardProps = {
    address: Address;
    selectAddress: (id: number) => void
}

const AddressCard = ({ address, selectAddress }: AddressCardProps) => {


    const selectedAddress = (id: number) => {
        selectAddress(id); //passing id to dad component
    }

    return (
        <li className='border border-gray-300 rounded-md p-3 w-[200px] hover:border-red-500 cursor-pointer'>
            <div className="flex justify-between gap-3">
                <div onClick={() => selectedAddress(address.id)} className="text-base flex-2/6  font-semibold text-wrap">{address.street}</div>
                <div className="cursor-pointer"><Icon svg='trash' height='24px' width='24px' /></div>
            </div>
            <div onClick={() => selectedAddress(address.id)} className="pt-1">
                <div className="text-sm">Nº {address.number}</div>
                <div className="text-sm">{address.neighborhood}, {address.city} - {address.state}</div>
            </div>
        </li>
    )
}

export default AddressCard