import React, { useEffect, useState } from 'react'
import { Icon } from './svg/Icon';
import { useCartContext } from '@/context/CartContext';
import { useUserContext } from '@/context/UserContext';
import { Cart } from '@/types/Cart';
import CardItem01Cart from './CardItem01Cart';
import Button01 from './Button01';
import axios from 'axios';
import { CreateOrUpdateCartWithItemsDto } from '@/types/CreateOrUpdateCartWithItemsDto';


type PropsCartSideMenu = {

}

const CartSideMenu = () => {

    const { isOpen, openAndCloseCart, cart, cartItems, setCart, setCartItems, getActualCart } = useCartContext();
    const { user } = useUserContext();
    const [total, setTotal] = useState(0);


    //To adjust total
    useEffect(() => {
        if (!user || !cart) return

        const newTotal = cart.cartItems.reduce((valueAcumulated, item) => {
            return valueAcumulated + item.cartItem.price * item.quantity;
        }, 0);

        setTotal(newTotal);
    }, [user, cart])

    const confirmCart = async (cart: Cart) => {

        if (!cart || cart.cartItems.length === 0) return;

        try {

            const body = {
                userId: cart.userId,
                createdAt: new Date().toISOString(),
                isCheckedOut: cart.isCheckedOut ?? false,
                cartItems: cart.cartItems.map(item => ({
                    quantity: item.quantity,
                    lunchboxId: item.lunchboxId ?? null,
                    kitId: item.kitId ?? null
                }))
            };

            const res = await axios.post("/api/carts", body);

            if (res.status === 200 || res.status === 201) {
                console.log("Carrinho confirmado com sucesso:", res.data);
                // opcional: atualizar contexto
                setCart(res.data);
            }

        } catch (e) {
            console.error("Erro ao realizar confirmCart:", e);
        }
    };


    const addMarmita = (idMarmita: number) => {
        if (cart && cart.cartItems.length > 0) {

            // nova lista de itens do carrinho com a quantidade atualizada
            //no map ja realizando a validação se trata do carrinho selecionado.
            const updatedItems = cart.cartItems.map((item) =>
                item.cartItem.id === idMarmita
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );

            // atualiza o contexto
            setCart({
                ...cart,
                cartItems: updatedItems
            });

            setCartItems(updatedItems);

        }
    };

    const removeMarmita = (idMarmita: number) => {
        if (cart && cart.cartItems.length > 0) {
            // Atualiza os itens: diminui a quantidade ou remove o item
            const updatedItems = cart.cartItems
                .map((item) =>
                    item.cartItem.id === idMarmita
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0); // remove itens com quantidade <= 0

            // Atualiza o contexto
            setCart({
                ...cart,
                cartItems: updatedItems
            });

            setCartItems(updatedItems);
        }
    };



    return (
        <div className={` ${isOpen ? 'w-screen md:w-1/3' : 'w-0'}  bg-white fixed top-0 bottom-0 right-0 z-50 transition-all duration-200 ease-in overflow-hidden`}>
            <div className='flex justify-end items-center pr-3.5 h-14 border-b-1 border-gray-100'>
                <div className='text-xs font-bold mr-[-3px]'>OCULTAR</div>
                <div onClick={() => openAndCloseCart(false)} className="cursor-pointer  rounded-full flex justify-center items-center w-8 h-8">
                    <Icon svg='close2' width='16' height='16' />
                </div>
            </div>

            <div id="CategoriesList" className='mx-auto h-screen'>
                {cart && cart.cartItems.length > 0 ? (
                    <>
                        <div className='h-4/5 shadow-md overflow-y-auto'>
                            {cart.cartItems.map((item, idx) => (
                                <div key={idx} className="flex items-center p-2">
                                    <CardItem01Cart
                                        id={item.cartItem.id}
                                        title={item.cartItem.name}
                                        price={item.cartItem.price}
                                        portionGram={item.cartItem.portionGram}
                                        imageUrl={`${process.env.NEXT_PUBLIC_API_BASE_URL}${item.cartItem.imageUrl}`}
                                        quantityInCart={item.quantity}
                                        onAdd={addMarmita}
                                        onRemove={removeMarmita}

                                    />
                                </div>
                            ))}
                        </div>
                        {cart.cartItems.length > 0 &&
                            <div className='h-24 flex justify-start gap-8 items-center'>
                                <div className='text-2xl'>Total: R${total.toString()}</div>
                                <Button01 backgroundColor='bg-green-800' textColor='text-white' width='w-1/3' classes='h-10'>Continuar</Button01>
                            </div>
                        }

                    </>
                ) : (
                    <div className="flex flex-col justify-center items-center mt-10">
                        <img className='w-[160px]' src={"./images/emptyCart.png"}></img>
                        <div className='text-center w-2/3'>
                            <div className='font-amsi font-bold text-base uppercase'>Sua sacola está vazia</div>
                            <p className="text-sm">Navegue pelas categorias ou faça uma busca por produtos.</p>
                        </div>
                    </div>
                )}

            </div>

        </div>
    )
}

export default CartSideMenu