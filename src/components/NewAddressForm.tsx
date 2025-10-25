import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import Button01 from './Button01';


const NewAddressForm = () => {

    //React hook form
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        mode: "onChange", // importante! valida a cada mudança
        defaultValues: {
            zipCode: "",
            street: "",
            neighborhood: "",
            number: "",
            complement: ""
        }
    });

    console.log("ERRORS:", errors);

    return (
        <form onSubmit={handleSubmit((data) => {
            console.log(data)
        })} className='w-full p-2'>
            <div className='font-hindmadurai font-semibold text-gray-800'>
                <div>Em qual endereço você deseja receber?</div>
            </div>
            <div className='flex flex-col gap-2 text-gray-800 font-hindmadurai'>
                <input
                    {...register("zipCode", { required: "CEP é obrigatório", minLength: { value: 8, message: "CEP deve ter pelo menos 8 digitos" } })}
                    type='text'
                    placeholder='CEP'
                    className='px-1 w-full border-b border-gray-300 py-1 hover:border-gray-800 hover:placeholder:text-gray-800'
                />
                <p className='text-sm text-red-600' >{errors.zipCode?.message}</p>
                <div className='flex flex-row justify-between'>
                    <p className='font-hindmadurai font-semibold'>Tipo de endereço</p>
                    <div className='flex flex-row gap-2 mr-5'>
                        <div className='p-1 cursor-pointer text-green-800 bg-white border border-green-800 rounded-md font-semibold text-base uppercase hover:shadow-sm'>Casa</div>
                        <div className='p-1 cursor-pointer text-green-800 bg-white border border-green-800 rounded-md font-semibold text-base uppercase hover:shadow-sm'>Prédio</div>
                    </div>
                </div>
                <input
                    {...register("street", { required: "Endereço é obrigatório" })}
                    type='text'
                    placeholder='Endereço: Rua/Av/Praça'
                    className='px-1 w-full border-b border-gray-300 py-1 hover:border-gray-800 hover:placeholder:text-gray-800'
                />
                <p className='text-sm text-red-600'>{errors.street?.message}</p>
                <div className='flex gap-2'>
                    <div className='w-1/2 px-1'>
                        <input
                            disabled={true}
                            type='text'
                            placeholder='Cidade/Estado'
                            className='w-full border-b border-gray-300 py-1 hover:border-gray-800 hover:placeholder:text-gray-800'
                        />
                    </div>
                    <div className='w-1/2 px-1'>
                        <input
                            {...register("neighborhood", { required: "Bairro é obrigatório" })}
                            type='text'
                            placeholder='Bairro'
                            className='w-full border-b border-gray-300 py-1 hover:border-gray-800 hover:placeholder:text-gray-800'
                        />
                        <p className='text-sm text-red-600'>{errors.neighborhood?.message}</p>
                    </div>
                </div>
                <div className='flex gap-2'>
                    <div className='w-1/2 px-1'>
                        <input
                            {...register("number", { required: "Número é obrigatório" })}
                            type='text'
                            placeholder='Número'
                            className='w-full border-b border-gray-300 py-1 hover:border-gray-800 hover:placeholder:text-gray-800'
                        />
                        <p className='text-sm text-red-600'>{errors.number?.message}</p>
                    </div>

                    <div className='w-1/2 px-1'>
                        <input
                            {...register("complement")}
                            type='text'
                            placeholder='Complemento'
                            className='w-full border-b border-gray-300 py-1 hover:border-gray-800 hover:placeholder:text-gray-800'
                        />
                    </div>
                </div>

                <div>
                    <Button01
                        backgroundColor='bg-green-800'
                        textColor='text-white'
                        width='w-full'
                        classes='h-10'
                        disabled={!isValid} // 👈 desabilita se form não for válido
                        >
                        Salvar endereço
                    </Button01>
                </div>
            </div>
        </form>
    )
}

export default NewAddressForm


/*
São 6 campos: zipcode, street, city, neighborhood, number, complement
city vai ser autocompletado ao informar o campo zipcode
complement não é obrigatório, todos os demais sim.

https://react-hook-form.com/get-started
*/ 