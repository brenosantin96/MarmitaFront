import React from 'react'
import Button01 from './Button01'
import { formatPriceToBRL } from '@/utils/Formatter'

type CheckOutItemProps = {
    id: number
    title: string;
    imageUrl: string;
    price: number;
    portionGram: number;
    quantityInCart: number;
}

const CheckoutItem = ({id, title, imageUrl, price, quantityInCart} : CheckOutItemProps) => {

  return (
    
    <div className='flex rounded-lg justify-start items-center border-b border-gray-300 font-hindmadurai  w-full mb-1 p-2 cursor-pointer transition'>
            <div className="overflow-hidden rounded-t-lg h-[100px] w-[120px]">
                <img src={`${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/${imageUrl}`} alt={title} className="object-cover w-full h-full" />
            </div>
            <div className='font-semibold pt-2 px-5'>
                <div>{title}</div>
                <div id={"price"}>{formatPriceToBRL(price)}</div>
                <div>Qtde: {quantityInCart}</div>
                <div>Total Item: {formatPriceToBRL(quantityInCart * price)}</div>
            </div>
        </div>
  )
}

export default CheckoutItem