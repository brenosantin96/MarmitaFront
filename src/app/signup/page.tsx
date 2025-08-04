"use client"
import FormUserPassword from '@/components/FormUserPassword'
import { Icon } from '@/components/svg/Icon'
import React, { useState } from 'react'

const SignUp = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <div className='pt-13 md:pt-24 h-[97vh] grid grid-cols-12'>
            {/* Coluna 1: Formulário - ocupa 5 colunas */}
            <div className='col-span-12 lg:col-span-7 md:col-span-5 flex flex-col mt-7 px-4'>
                <div id="createUserDiv" className='flex flex-col w-full'>
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
                        username={username}
                        password={password}
                        passwordConfirmation={passwordConfirmation}
                        isPasswordVisible={isPasswordVisible}
                        setPasswordVisible={setIsPasswordVisible}
                        onChangeUsername={setUsername}
                        onChangePassword={setPassword}
                        onChangePasswordConfirmation={setPasswordConfirmation}
                    />
                </div>
            </div>

            {/* Coluna 2: Imagem - ocupa 7 colunas */}
            <div className='hidden md:block col-span-7 lg:col-span-5 relative'>
                <div className='absolute inset-0 bg-[url(/images/foods2circle.png)] bg-cover bg-no-repeat bg-left h-full w-full' />
            </div>
        </div>


    )
}

export default SignUp