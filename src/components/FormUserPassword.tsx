"use client"
import React from 'react'
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button01 from './Button01';
import { Icon } from './svg/Icon';

type FormUserPassword = {
    username: string;
    onChangeUsername: (newValueName: string) => void;
    password: string;
    onChangePassword: (newValuePassword: string) => void;
    passwordConfirmation: string;
    onChangePasswordConfirmation: (newValuePasswordConfirmation: string) => void;
    isPasswordVisible: boolean
    setPasswordVisible: (isVisible: boolean) => void;
}

const FormUserPassword = ({ username, password, passwordConfirmation, isPasswordVisible, setPasswordVisible, onChangeUsername, onChangePassword, onChangePasswordConfirmation }: FormUserPassword) => {

    // Schema de validação com Zod
    const schema = z.object({
        email: z.string().min(8, "CEP deve ter pelo menos 8 dígitos").regex(/^\d{8}$/, "CEP deve conter apenas números"),
        password: z.number({ error: (issue) => typeof issue.input !== "number" ? "Número inválido" : "Erro genérico" }).min(1, "Número é obrigatório"),
    });

    return (
        <form className='mx-4'>
            <div className='border-b border-gray-200 hover:border-gray-600 cursor-pointer'>
                <input className='py-2 w-full' placeholder='Email' value={username} onChange={(e) => onChangeUsername(e.target.value)} />
            </div>
            <div className='border-b border-gray-200 hover:border-gray-600 cursor-pointer flex items-center'>
                <input
                    className='py-2 border-none w-full'
                    placeholder='Senha'
                    value={password}
                    type={isPasswordVisible ? "text" : "password"}
                    onChange={(e) => onChangePassword(e.target.value)}
                />
                <div 
                className="" 
                onClick={() => setPasswordVisible(!isPasswordVisible)}>
                    {isPasswordVisible ? <Icon svg='eyeopened' height='28px' width='28px'></Icon> : <Icon svg='eyeclosed' height='28px' width='28px' fillColor='#4a5565'></Icon>}
                </div>
            </div>
            <div className='border-b border-gray-200 hover:border-gray-600 cursor-pointer'>
                <input className='py-2 w-full' placeholder='Confirmar senha' value={passwordConfirmation} onChange={(e) => onChangePasswordConfirmation(e.target.value)} />
            </div>

            <div className='my-3.5'>
                <Button01 disabled={true} fontWeight='semibold' classes='mt-5 mb-5'  >CONTINUAR</Button01>
                <Button01 outline={true} fontWeight='semibold' >JÁ TENHO UMA CONTA</Button01>
            </div>

        </form>
    )
}

export default FormUserPassword


