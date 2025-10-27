import React from 'react'
import Button01 from './Button01'
import { formatPriceToBRL } from '@/utils/Formatter'

type CheckOutItemProps = {
    
}

const CheckoutItem = () => {

  return (
    
    <div className='flex rounded-lg justify-start items-center font-hindmadurai border w-full border-gray-300 mb-3 p-2 cursor-pointer transition'>
            <div className="overflow-hidden rounded-t-lg h-[100px] w-[120px]">
                <img src={"imageUrl"} alt={"title"} className="object-cover w-full h-full" />
            </div>
            <div className='pt-2 px-5'>
                <div>Titlediv</div>
                <div id="price">{3}</div>
                <div id="portionGram" className='text-gray-400'>{200}g</div>
            </div>
        </div>
  )
}

export default CheckoutItem