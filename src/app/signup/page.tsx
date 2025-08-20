"use client"
import FormUserPassword from '@/components/FormUserPassword'
import { Icon } from '@/components/svg/Icon'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Modal01 from '@/components/Modal01';
import { useUserContext } from '@/context/UserContext';
//ALTERAR DINAMICAMENTE PRA USAR O REGISTERSERVICE NO FORM MAS VALIDAR SE ESTA NA PAGINA DE LOGIN OU REGISTER

const SignUp = () => {

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const [isOpenModalConfirmationRegister, setIsOpenModalConfirmationRegister] = useState(false);

    const { user, setUser } = useUserContext();

    useEffect(() => {
        console.log(user)
    }, [user])


    const handleRegister = async () => {
        try {
            const res1 = await axios.post("/api/register", { name: name, email: username, password: password, isAdmin: false })
            console.log("RES1: ", res1);
            if (res1.status === 201) {
                setName("");
                setUsername("");
                setPassword("");
                setPasswordConfirmation("");
                setIsOpenModalConfirmationRegister(true);
            }
        } catch (err) {
            console.error("Erro ao registrar usuário:", err);
        }
    };

    const handleLogout = async () => {
        console.log("Entrou na funcao")
        try {
            const res2 = await axios.post("/api/logout")
            console.log("RES2: ", res2);
            if (res2.status === 200) {
                console.log("Logout feito com sucesso");

                // Limpa o estado do usuário no frontend
                setUser({id: 0, name: "", email: "", isAdmin: false });

            }

        } catch (err) {
            console.log("Erro: ", err)
        }
    }



    return (
        <>
            <div className='pt-13 md:pt-24 h-screen grid grid-cols-12 overflow-x-hidden'>
                {/* Coluna 1: Formulário - ocupa 5 colunas */
                    !user || user.id == 0 &&
                    <div className='col-span-12 lg:col-span-7 md:col-span-5 flex flex-col mt-7 px-4'>
                        <div id="createUserDiv" className='flex flex-col w-full lg:w-1/2 mx-auto'>
                            <div className='font-amsi uppercase font-extrabold text-base text-center leading-6 my-4'>
                                Crie sua conta e vamos às compras
                            </div>
                            <div className='flex items-center justify-start mx-4'>
                                <div id="firstLine" className="border-b border-gray-200 grow shrink"></div>
                                <p className='text-xs text-gray-500 text-left mx-2 py-3'>Use sua rede social para cadastrar sua conta</p>
                                <div id="secondLine" className="border-b border-gray-200 grow shrink"></div>
                            </div>
                            <div id="socialMedia" className='flex gap-2 items-center mx-4'>
                                <button className="rounded-lg h-14 border border-gray-200 w-full flex items-center justify-center cursor-pointer">
                                    <Icon svg='facebook' width="24px" height='24px' />
                                </button>
                                <button className="rounded-lg h-14 border border-gray-200 w-full flex items-center justify-center cursor-pointer">
                                    <Icon svg='google' width="24px" height='24px' />
                                </button>
                            </div>
                            <div className='flex items-center justify-start mx-4 '>
                                <div className="border-b border-gray-200 grow shrink"></div>
                                <p className='text-xs text-gray-500 text-left mx-2 py-3'>Ou</p>
                                <div className="border-b border-gray-200 grow shrink"></div>
                            </div>

                            <FormUserPassword
                                name={name}
                                username={username}
                                password={password}
                                passwordConfirmation={passwordConfirmation}
                                isPasswordVisible={isPasswordVisible}
                                setPasswordVisible={setIsPasswordVisible}
                                onChangeName={setName}
                                onChangeUsername={setUsername}
                                onChangePassword={setPassword}
                                onChangePasswordConfirmation={setPasswordConfirmation}
                                isInPageLogin={false}
                                onSubmit={handleRegister}
                            />
                        </div>
                    </div>

                }
                {user.id > 0 &&
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
            <Modal01
                handleClose={() => setIsOpenModalConfirmationRegister(false)}
                isOpen={isOpenModalConfirmationRegister}
                modalTitle="Usuário registrado com sucesso."
                modalText="Favor conferir caixa de entrada ou pasta de SPAM no seu email para poder confirmar a criação de sua conta."
            />
        </>


    )
}

export default SignUp