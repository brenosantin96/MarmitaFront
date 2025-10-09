import React, { useEffect, useState } from 'react'
import Button01 from './Button01';
import { formatPriceToBRL } from '@/utils/Formatter';
import { useUserContext } from '@/context/UserContext';
import { useCartContext } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

type PropsCardItem01 = {
    id: number
    title: string;
    imageUrl: string;
    price: number;
    portionGram: number;
    oldPrice?: number;
    onAdd: (id: number) => void;
    onRemove: (id: number) => void;
    onClick: (id: number) => void;
}

const CardItem01 = ({ id, title, price, imageUrl, portionGram, oldPrice, onAdd, onRemove, onClick }: PropsCardItem01) => {

    const { user } = useUserContext(); // aqui você acessa o usuário logado
    const { cart, cartItems, isOpen, openAndCloseCart, setCart, setCartItems } = useCartContext();
    const router = useRouter();
    const [countItems, setCountItems] = useState(0);

    //se ja tiver algum item no cart, countItems vai ser a quantidade desse item no cart,
    //se NAO tiver item no cart, countItems vai ser 0

    useEffect(() => {
        if (!cart || !cart.cartItems) return;

        const itemInCart = cart.cartItems.find((item) => item.cartItem.id === id);
        if (itemInCart) {
            setCountItems(itemInCart.quantity);
        } else {
            setCountItems(0);
        }
    }, [cart, id])


    const addItemToCart = (id: number) => {

        if (!user) {
            alert("Faça login antes de comprar")
            router.push("/login")
            return;
        }

        onAdd(id); //enviando para o componente pai

        setCountItems((prev) => prev + 1);
        console.log("Adicionado item no cart")
        //pegar contexto do carrinho e adicionar
    }

    const removeItemToCart = (id: number) => {

        if (!user) {
            alert("Faça login antes de comprar")
            router.push("/login")
            return;
        }

        onRemove(id); //enviando para o componente pai

        setCountItems((prev) => prev - 1);
        console.log("Removendo item do cart")
        //pegar contexto do carrinho e adicionar
    }

    return (

        <div
            onClick={() => onClick(id)}
            className='inline-flex flex-col rounded-lg font-hindmadurai border border-gray-300 mb-3 pb-2 w-[200px] cursor-pointer transition'>
            <div className="overflow-hidden rounded-t-lg h-[150px]">
                <img src={imageUrl as string} alt={title} className="object-cover w-full h-full" />
            </div>
            <div className='pt-2 px-5'>
                <div className='pb-2'>{title}</div>
                <div className='flex justify-between px-2 pb-2'>
                    <div id="price">{formatPriceToBRL(price)}</div>
                    <div id="portionGram" className='text-gray-400'>{portionGram}g</div>
                </div>
            </div>
            <div className='px-5 py-3'>
                {countItems === 0 &&
                    <Button01 onClick={() => addItemToCart(id)} outline={true} classes={`hover:bg-green-700 hover:text-white`}>Adicionar</Button01>
                }
                {countItems > 0 && (
                    <div className="flex gap-5 items-center">
                        <Button01 onClick={() => addItemToCart(id)} outline={true} classes={`hover:bg-green-700 hover:text-white`}>+</Button01>
                        <div className="text-sm font-oswald font-semibold">{countItems}</div>
                        <Button01 onClick={() => removeItemToCart(id)} outline={true} classes={`hover:bg-green-700 hover:text-white`}>-</Button01>
                    </div>
                )
                }
            </div>
        </div>

    )
}

export default CardItem01