import React from 'react'
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button01 from './Button01';

type FormUserPassword = {
    username: string;
    password: string;
    passwordConfirmation: string;
}

// Schema de validação com Zod
const schema = z.object({
    email: z.string().min(8, "CEP deve ter pelo menos 8 dígitos").regex(/^\d{8}$/, "CEP deve conter apenas números"),
    password: z.number({ error: (issue) => typeof issue.input !== "number" ? "Número inválido" : "Erro genérico" }).min(1, "Número é obrigatório"),
});

const FormUserPassword = ({ username, password, passwordConfirmation }: FormUserPassword) => {
    return (
        <form className='mx-4'>
            <div className='border-b border-gray-200 hover:border-gray-600 cursor-pointer'>
                <input className='py-2' placeholder='Email' />
            </div>
            <div className='border-b border-gray-200 hover:border-gray-600 cursor-pointer'>
                <input className='py-2' placeholder='Senha' />
            </div>
            <div className='border-b border-gray-200 hover:border-gray-600 cursor-pointer'>
                <input className='py-2' placeholder='Confirmar senha' />
            </div>

            <div className='my-3.5'>
                <Button01 disabled={true} fontWeight='semibold' classes='mt-5 mb-5'  >CONTINUAR</Button01>
                <Button01 outline={true} fontWeight='semibold' >JÁ TENHO UMA CONTA</Button01>
            </div>

        </form>
    )
}

export default FormUserPassword