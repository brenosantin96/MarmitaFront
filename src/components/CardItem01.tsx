import React from 'react'
import Button01 from './Button01';

type PropsCardItem01 = {
    title: string;
    urlImage: string;
    price: number;
    portion: number;
    oldPrice?: number;
    onAdd: () => void;
    onRemove: () => void;
}

const CardItem01 = ({ title, price, urlImage, portion, oldPrice, onAdd, onRemove }: PropsCardItem01) => {
    return (

        <div className='flex flex-col rounded-lg font-hindmadurai border-gray-400 border-1'>
            <div className='w-full object-cover'>
                <img src={urlImage} alt={title} />
            </div>
            <div className='pt-2'>
                <div className='pb-2'>{title}</div>
                <div className='flex justify-between px-2 pb-2'>
                    <div id="price">{price}</div>
                    <div id="portion" className='text-gray-400'>{portion}g</div>
                </div>
            </div>
            <div>
                <Button01>Adicionar </Button01>
            </div>
        </div>
    )
}

export default CardItem01