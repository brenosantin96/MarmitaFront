"use client"
import React from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from './svg/Icon';
import Button01 from './Button01';

type PropsModal01 = {
    isOpen: boolean;
    handleClose: () => void;
    modalTitle: string;
};

// Schema de validação com Zod
const schema = z.object({
    cep: z.string().min(8, "CEP deve ter pelo menos 8 dígitos").regex(/^\d{8}$/, "CEP deve conter apenas números"),
    number: z.number({error: (issue) => typeof issue.input !== "number" ? "Número inválido" : "Erro genérico"}).min(1, "Número é obrigatório"),
    comp: z.string().min(1, "Complemento é obrigatório")
});

//Inferindo a tipagem do schema
type FormData = z.infer<typeof schema>;

const ModalAddress = ({ handleClose, isOpen, modalTitle }: PropsModal01) => {

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        setValue,
        watch
    } = useForm<FormData>({
        mode: "onChange",
        resolver: zodResolver(schema),
        defaultValues: {
            cep: '',
            number: undefined,
            comp: ''
        }
    });

    const cep = watch("cep");

    if (!isOpen) return null;

    const onSubmit = (data: FormData) => {
        console.log("Dados validados:", data);
        handleClose();
    };

    return (
        <>
            <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={handleClose}></div>

            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-lg shadow-lg z-50">
                <div className="flex border-b border-gray-300 p-4 justify-between items-center rounded-t-lg">
                    <div className="text-base font-bold">{modalTitle}</div>
                    <div className="cursor-pointer flex items-center" onClick={handleClose}>
                        <div className='font-bold px-3' style={{ fontSize: 10 }}>
                            FECHAR
                        </div>
                        <Icon svg='close2' height='20px' width='20px' />
                    </div>
                </div>

                <div className="p-4 text-sm">
                    <p className='mb-5'>Conta pra gente, <strong>onde é aí mesmo?</strong></p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='mb-4'>
                            <label htmlFor='cep'>CEP de entrega</label>
                            <input
                                id="cep"
                                {...register("cep")}
                                className='border-b py-3 px-2 block w-full border-gray-200'
                                placeholder='CEP de entrega (apenas números)'
                            />
                            {errors.cep && <p className="text-red-500 text-xs mt-1">{errors.cep.message}</p>}
                        </div>

                        <div className='flex mb-5'>
                            <div className='w-1/2 mx-1'>
                                <input
                                    id="number"
                                    type="number"
                                    {...register("number", { valueAsNumber: true })}
                                    className='border-b py-3 px-2 block w-full border-gray-200'
                                    placeholder='Número'
                                />
                                {errors.number && <p className="text-red-500 text-xs mt-1">{errors.number.message}</p>}
                            </div>

                            <div className='w-1/2 mx-1'>
                                <input
                                    id="comp"
                                    {...register("comp")}
                                    className='border-b py-3 px-2 block w-full border-gray-200'
                                    placeholder='Complemento'
                                />
                                {errors.comp && <p className="text-red-500 text-xs mt-1">{errors.comp.message}</p>}
                            </div>
                        </div>

                        <Button01 disabled={!isValid}>CONTINUAR</Button01>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ModalAddress;
