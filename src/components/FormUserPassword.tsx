"use client"
import React from 'react'
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button01 from './Button01';
import { Icon } from './svg/Icon';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


//NESSE FORM NAO FOI USADO REACT HOOK FORM, SAO APENAS 3 CAMPOS A SEREM VALIDADOS E FOI FEITO DE FORMA MANUAL.


type FormUserPassword = {
    username: string;
    onChangeUsername: (newValueName: string) => void;
    password: string;
    onChangePassword: (newValuePassword: string) => void;
    passwordConfirmation: string;
    onChangePasswordConfirmation: (newValuePasswordConfirmation: string) => void;
    isPasswordVisible: boolean
    setPasswordVisible: (isVisible: boolean) => void;
    isInPageLogin: boolean
}

const FormUserPassword = ({ username, password, passwordConfirmation, isPasswordVisible, isInPageLogin, setPasswordVisible, onChangeUsername, onChangePassword, onChangePasswordConfirmation }: FormUserPassword) => {

    const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
    const router = useRouter();


    // Schema de validação com Zod
    const schema = z.object({
        email: z.email("Email inválido"),
        password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
        passwordConfirmation: z.string().optional(), // Tornar opcional primeiro
    }).refine((data) => {
        if (!isInPageLogin) {
            return data.password === data.passwordConfirmation;
        }
        return true;
    }, {
        message: "As senhas não coincidem",
        path: ["passwordConfirmation"], // Mostra o erro nesse campo
    });

    const validateField = (field: string, value: string) => {

        //safeParse analisa se as informacoes inseridas pelo usuario estão de acordo com o shcema
        const result = schema.safeParse({
            email: field === "email" ? value : username,
            password: field === "password" ? value : password,
            passwordConfirmation: field === "passwordConfirmation" ? value : passwordConfirmation
        });

        if (!result.success) {
            const issue = result.error.issues.find((i) => {
                console.log(i.path);
                return i.path[0] === field
            });
            setErrors((prev) => ({ ...prev, [field]: issue?.message ?? "" }));
        } else {
            // remove erro se o campo for válido
            setErrors((prev) => {
                const { [field]: removed, ...rest } = prev;
                return rest;
            });
        }
    }

    return (
        <form className='mx-4'>
            <div className='border-b border-gray-200 hover:border-gray-600 cursor-pointer'>
                <input
                    id="email"
                    name="email"
                    className='py-2 w-full'
                    placeholder='Email'
                    value={username}
                    onChange={(e) => onChangeUsername(e.target.value)}
                    onBlur={() => validateField("email", "username")}
                    onFocus={() => setErrors((prev) => ({ ...prev, email: "" }))}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div className='border-b border-gray-200 hover:border-gray-600 cursor-pointer flex items-center'>
                <input
                    id="password"
                    name="password"
                    className='py-2 border-none w-full'
                    placeholder='Senha'
                    value={password}
                    type={isPasswordVisible ? "text" : "password"}
                    onChange={(e) => onChangePassword(e.target.value)}
                    onBlur={() => validateField("password", "password")}
                    onFocus={() => setErrors((prev) => ({ ...prev, password: "" }))}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                <div
                    className=""
                    onClick={() => setPasswordVisible(!isPasswordVisible)}>
                    {isPasswordVisible ? <Icon svg='eyeopened' height='28px' width='28px'></Icon> : <Icon svg='eyeclosed' height='28px' width='28px' fillColor='#4a5565'></Icon>}
                </div>
            </div>
            {!isInPageLogin &&
                <div className='border-b border-gray-200 hover:border-gray-600 cursor-pointer'>
                    <input
                        id="passwordConfirmation"
                        name="passwordConfirmation"
                        type={isPasswordVisible ? "text" : "password"}
                        className='py-2 w-full'
                        placeholder='Confirmar senha'
                        value={passwordConfirmation}
                        onChange={(e) => onChangePasswordConfirmation(e.target.value)}
                        onBlur={() => validateField("passwordConfirmation", "passwordConfirmation")}
                        onFocus={() => setErrors((prev) => ({ ...prev, passwordConfirmation: "" }))}
                    />
                    {errors.passwordConfirmation && <p className="text-red-500 text-sm">{errors.passwordConfirmation}</p>}
                </div>
            }
            <div className='my-3.5'>
                <Button01 disabled={true} fontWeight='semibold' classes='mt-5 mb-5' >CONTINUAR</Button01>
                <Button01 onClick={(e) => {
                    e.preventDefault();
                    router.push(isInPageLogin ? "/signup" : "/login")
                }} outline={true} fontWeight='semibold'>
                    {isInPageLogin ? "NÃO TENHO UMA CONTA" : "JÁ TENHO UMA CONTA"}
                </Button01>

            </div>

        </form>
    )
}

export default FormUserPassword






