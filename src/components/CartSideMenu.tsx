import React, { useEffect, useState } from 'react'
import { Icon } from './svg/Icon';
import { useCartContext } from '@/context/CartContext';
import { useUserContext } from '@/context/UserContext';
import { Cart } from '@/types/Cart';
import CardItem01Cart from './CardItem01Cart';
import Button01 from './Button01';
import axios from 'axios';
import { useRouter } from 'next/navigation';


const CartSideMenu = () => {

    const { isOpen, openAndCloseCart, cart, cartItems, setCart, setCartItems, getActualCart } = useCartContext();
    const { user } = useUserContext();
    const [total, setTotal] = useState(0);
    
    const router = useRouter();


    //To adjust total
    useEffect(() => {
        if (!user || !cart) return

        const newTotal = cart.cartItems.reduce((valueAcumulated, item) => {
            return valueAcumulated + item.cartItem.price * item.quantity;
        }, 0);

        setTotal(newTotal);
    }, [user, cart])

    // Confirma o carrinho (envia para backend)
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
                    kitId: item.kitId ?? null,
                })),
            };

            const res = await axios.post("/api/carts", body);

            if (res.status === 200 || res.status === 201) {
                console.log("Carrinho confirmado com sucesso:", res.data);
                setCart(res.data);
                router.push("/checkout/delivery");
                
            }
        } catch (e) {
            console.error("Erro ao realizar confirmCart:", e);
        }
    };


    // 🔹 Função genérica para adicionar item (marmita ou kit)
    const addItem = (id: number) => {
        if (!cart) return;

        const updatedItems = cart.cartItems.map(item => {
            if (item.cartItem.id === id) { //verifica em todos items do carrinho se existe um id do item enviado pelo componente filho
                if ("portionGram" in item.cartItem) { //ao verificar, realiza depois uma verificacao se esse item possui a propriedade portionGram
                    console.log("Adicionando Marmita:", item.cartItem.name); //todos cartItem.id nunca se repetem entao pode ser sim uma marmita ou um kit
                } else { //esse console.log é so pra revisar oq esta sendo adicioando, se quiser pode remover depois
                    console.log("Adicionando Kit:", item.cartItem.name);
                }
                return { ...item, quantity: item.quantity + 1 };  //aqui efetivamente retorna o item encontrado (se ja tiver no carrinho) e adiciona a quantidade de 1
            }
            return item; //se nao tiver o item, adiciona 1.
        });

        setCart({ ...cart, cartItems: updatedItems });
        setCartItems(updatedItems);
    };


    // 🔹 Função genérica para remover item (marmita ou kit)
    const removeItem = (id: number) => {
        if (!cart) return;

        const updatedItems = cart.cartItems
            .map(item => {
                if (item.cartItem.id === id) {
                    if ("portionGram" in item.cartItem) {
                        console.log("Removendo Marmita:", item.cartItem.name);
                    } else {
                        console.log("Removendo Kit:", item.cartItem.name);
                    }
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            })
            .filter(item => item.quantity > 0); // remove itens zerados

        setCart({ ...cart, cartItems: updatedItems });
        setCartItems(updatedItems);
    };


    return (
        <div className={` ${isOpen ? 'w-screen md:w-1/3' : 'w-0'}  bg-white fixed top-0 bottom-0 right-0 z-50 transition-all duration-200 ease-in overflow-hidden`}>
            {/* Cabeçalho */}
            <div className='flex justify-end items-center pr-3.5 h-14 border-b border-gray-100'>
                <div className='text-xs font-bold mr-[-3px]'>OCULTAR</div>
                <div onClick={() => openAndCloseCart(false)} className="cursor-pointer rounded-full flex justify-center items-center w-8 h-8">
                    <Icon svg='close2' width='16' height='16' />
                </div>
            </div>

            {/* Conteúdo */}
            <div id="CategoriesList" className='mx-auto h-screen'>
                {cart && cart.cartItems.length > 0 ? (
                    <>
                        {/* Lista de itens */}
                        <div className='h-4/5 shadow-md overflow-y-auto'>
                            {cart.cartItems.map((item, idx) => (
                                <div key={idx} className="flex items-center p-2">
                                    <CardItem01Cart
                                        id={item.lunchboxId ? item.lunchboxId : item.kitId as number}
                                        title={item.cartItem.name}
                                        price={item.cartItem.price}
                                        portionGram={"portionGram" in item.cartItem ? item.cartItem.portionGram : 0}
                                        imageUrl={`${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}${item.cartItem.imageUrl}`}
                                        quantityInCart={item.quantity}
                                        onAdd={addItem}
                                        onRemove={removeItem}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Rodapé com total */}
                        {cart.cartItems.length > 0 && (
                            <div className='h-24 flex justify-start gap-8 items-center px-4'>
                                <div className='text-2xl font-semibold'>
                                    Total: R$ {total.toFixed(2)}
                                </div>
                                <Button01
                                    backgroundColor='bg-green-800'
                                    textColor='text-white'
                                    width='w-1/3'
                                    classes='h-10'
                                    onClick={() => confirmCart(cart)}
                                >
                                    Continuar
                                </Button01>
                            </div>
                        )}
                    </>
                ) : (
                    // Carrinho vazio
                    <div className="flex flex-col justify-center items-center mt-10">
                        <img className='w-[160px]' src="./images/emptyCart.png" alt="Carrinho vazio" />
                        <div className='text-center w-2/3'>
                            <div className='font-amsi font-bold text-base uppercase'>Sua sacola está vazia</div>
                            <p className="text-sm text-gray-500">Navegue pelas categorias ou faça uma busca por produtos.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


export default CartSideMenu