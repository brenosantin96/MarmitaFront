import React from 'react'
import Button01 from './Button01';
import { formatPriceToBRL } from '@/utils/Formatter';
import { useUserContext } from '@/context/UserContext';

type PropsCardItem01 = {
    title: string;
    imageUrl: string;
    price: number;
    portion: number;
    oldPrice?: number;
    onAdd: () => void;
    onRemove: () => void;
}

const CardItem01 = ({ title, price, imageUrl, portion, oldPrice, onAdd, onRemove }: PropsCardItem01) => {

    const userContext = useUserContext();

    const addItemToCart = () => {
        console.log("Adicionado item no cart")
        //pegar contexto do carrinho e adicionar

        if(userContext){
            console.log(userContext.user); //testando o context
        }
    }

    return (

        <div className='inline-flex flex-col rounded-lg font-hindmadurai border border-gray-400 mb-3 pb-5 max-w-fit'>
            <div className='overflow-hidden rounded-t-lg'>
                <img src={imageUrl} alt={title} className='object-cover' />
            </div>
            <div className='pt-2 px-5'>
                <div className='pb-2'>{title}</div>
                <div className='flex justify-between px-2 pb-2'>
                    <div id="price">{formatPriceToBRL(price)}</div>
                    <div id="portion" className='text-gray-400'>{portion}g</div>
                </div>
            </div>
            <div className='px-5'>
                <Button01 onClick={addItemToCart} outline={true}>Adicionar</Button01>
            </div>
        </div>

    )
}

export default CardItem01