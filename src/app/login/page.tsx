//src\app\login\page.tsx
"use client"
import CartSideMenu from '@/components/CartSideMenu';
import FormUserPassword from '@/components/FormUserPassword';
import { SideMenu } from '@/components/SideMenu';
import { Icon } from '@/components/svg/Icon';
import { useCartContext } from '@/context/CartContext';
import { useUserContext } from '@/context/UserContext';
import { Lunchbox } from '@/types/Lunchbox';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const LoginPage = () => {

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const { user, setUser } = useUserContext(); // UserContext
    const cartContext = useCartContext();

    const router = useRouter();

    useEffect(() => {
        if (!user) return;

        const fetchCart = async () => {
            try {
                const resCart = await axios.get(`/api/carts/${user.id}`);
                console.log("RESPOSTA da requisicao para ver se possui carrinho: ", resCart);
                if (resCart.status === 200) {
                    
                    /*
                    cartContext.setCart({
                        userId: resCart.data.userId,
                        createdAt: new Date(resCart.data.createdAt),
                        isCheckedOut: resCart.data.isCheckedOut,
                        cartItems: resCart.data.cartItems.map((item: any) => ({
                            quantity: item.quantity,
                            cartItem: {
                                id: item.lunchboxId ?? item.kitId, // prioriza lunchbox, mas aceita kit
                                name: item.name,
                                // se você tiver mais propriedades de Lunchbox/Kit, pode buscar da API
                                // ou inicializar vazio
                                price: 0,
                                portionGram: 0,
                                imageUrl: ""
                            }
                        }))
                    });
                    */

                }


            } catch (err) {
                console.error("Erro ao buscar carrinho:", err);
            }
        };

        fetchCart();
    }, [user]); // executa sempre que user mudar


    const handleLogin = async () => {
        try {
            const res1 = await axios.post("/api/login", { email: username, password: password });

            if (res1.status === 200 && res1.data.user) {
                const loggedUser = res1.data.user;
                setUser(loggedUser);
                setUsername("");
                setPassword("");
                router.push("/signup")
            }
        } catch (err) {
            console.error("Erro ao realizar login", err);
        }
    };

    //GOOGLE AUTH
    // Callback de sucesso
    const handleGoogleSuccess = async (response: any) => {
        try {
            console.log("RESPONSE DO GOOGLE:", response);

            // No flow "auth-code", o objeto vem com { code }
            const { code } = response;

            if (!code) {
                console.error("Nenhum code retornado pelo Google");
                return;
            }

            // Envia o code para o route handler do Next.js
            const res = await axios.post("/api/loginGoogle", { code });

            console.log("RESPOSTA DO NEXT:", res.data);

            if (res.data.success) {
                setUser(res.data.user);
            }
        } catch (err) {
            console.error("Erro ao autenticar com backend via Next:", err);
        }
    };

    const handleGoogleError = () => {
        console.error("Erro no login com Google");
    };

    // Hook do Google para usar com botão customizado
    const googleLogin = useGoogleLogin({
        onSuccess: handleGoogleSuccess,
        onError: handleGoogleError,
        flow: "auth-code",           // IMPORTANTE: flow auth-code retorna credential
        scope: "openid profile email",

    });

    const handleLogout = async () => {
        console.log("Entrou na funcao")
        try {
            const res2 = await axios.post("/api/logout")
            console.log("RES2: ", res2);
            if (res2.status === 200) {
                console.log("Logout feito com sucesso");

                // Limpa o estado do usuário no frontend
                setUser({ id: 0, name: "", email: "", isAdmin: false });

            }

        } catch (err) {
            console.log("Erro: ", err)
        }
    }


    return (
        <>
            <CartSideMenu />
            <SideMenu />

            <div className='pt-13 md:pt-24 h-screen grid grid-cols-12 overflow-x-hidden'>
                {/* Coluna 1: Formulário - ocupa 5 colunas */
                    !user &&
                    <div className='col-span-12 lg:col-span-7 md:col-span-5 flex flex-col mt-7 px-4'>
                        <div id="createUserDiv" className='flex flex-col w-full lg:w-1/2 mx-auto'>
                            <div className='font-amsi uppercase font-extrabold text-base text-center leading-6 my-4'>
                                Já tem uma conta?
                            </div>
                            <div className='flex items-center justify-start mx-4'>
                                <div id="firstLine" className="border-b border-gray-200 grow shrink"></div>
                                <p className='text-xs text-gray-500 text-left mx-2 py-3'>Use sua rede social para acessar sua conta</p>
                                <div id="secondLine" className="border-b border-gray-200 grow shrink"></div>
                            </div>
                            <div id="socialMedia" className='flex gap-2 items-center mx-4'>
                                <button className="rounded-lg h-14 border border-gray-200 w-full flex items-center justify-center cursor-pointer">
                                    <Icon svg='facebook' width="24px" height='24px' />
                                </button>
                                <button onClick={() => googleLogin()} className="rounded-lg h-14 border border-gray-200 w-full flex items-center justify-center cursor-pointer">
                                    <Icon svg='google' width="24px" height='24px' />
                                </button>
                            </div>
                            <div className='flex items-center justify-start mx-4 '>
                                <div className="border-b border-gray-200 grow shrink"></div>
                                <p className='text-xs text-gray-500 text-left mx-2 py-3'>ou</p>
                                <div className="border-b border-gray-200 grow shrink"></div>
                            </div>

                            <FormUserPassword
                                name={name}
                                username={username}
                                password={password}
                                passwordConfirmation={passwordConfirmation}
                                isPasswordVisible={isPasswordVisible}
                                setPasswordVisible={setIsPasswordVisible}
                                onChangeUsername={setUsername}
                                onChangePassword={setPassword}
                                onChangePasswordConfirmation={setPasswordConfirmation}
                                onChangeName={setName}
                                isInPageLogin={true}
                                onSubmit={handleLogin}

                            />
                        </div>
                    </div>
                }
                {user !== null &&
                    <div className='col-span-12 lg:col-span-7 md:col-span-5 flex flex-col mt-7 px-4 text-2xl'>
                        <h2>Bem vindo {user.name}</h2>
                        <div className="text-base pt-4">
                            Clique <strong className="cursor-pointer" onClick={() => handleLogout()}> aqui</strong> para sair de sua conta.
                        </div>
                    </div>
                }

                {/* Coluna 2: Imagem - ocupa 7 colunas */}
                <div className='hidden md:block col-span-7 lg:col-span-5 relative lg:mr-[-300px]'>
                    <div className='absolute inset-0 bg-[url(/images/foods2circle.png)] bg-cover bg-no-repeat bg-left h-full w-full' />
                </div>
            </div>
        </>
    )
}

export default LoginPage