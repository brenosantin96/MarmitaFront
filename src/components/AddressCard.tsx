import React from 'react'
import { Icon } from './svg/Icon'
import { Address } from '@/types/Address'

type AddressCardProps = {
    address: Address;
    selectAddress: (id: number) => void
    clickedTrashIcon : (id: number) => void
    isSelected : boolean;
    haveExcludeIcon? : boolean;
}

const AddressCard = ({ address, selectAddress, clickedTrashIcon, isSelected, haveExcludeIcon }: AddressCardProps) => {


    const selectedAddress = (id: number) => {
        selectAddress(id); //passing id to dad component
    }

    return (
        <li
      className={`border rounded-md p-3 w-[200px] cursor-pointer transition-all duration-200
        ${isSelected ? 'border-red-500 shadow-xl' : 'border-gray-300 hover:border-gray-800'}`}
    >
      <div className="flex justify-between gap-3">
        <div
          onClick={() => selectedAddress(address.id)}
          className="text-base flex-2/6 font-semibold text-wrap"
        >
          {address.street}
        </div>
        <div
          onClick={() => clickedTrashIcon(address.id)}
          className={haveExcludeIcon === true ? "cursor-pointer p-2" : "hidden"}
        >
          <Icon svg='trash' height='24px' width='24px' />
        </div>
      </div>
      <div onClick={() => selectedAddress(address.id)} className="pt-1">
        <div className="text-sm">Nº {address.number}</div>
        <div className="text-sm">{address.neighborhood}, {address.city} - {address.state}</div>
      </div>
    </li>
    )
}

export default AddressCard