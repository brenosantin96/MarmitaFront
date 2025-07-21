import React from 'react'
import Button01 from './Button01'
import { useForm } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";


let renderCount = 0

type FormValues = {
    username: string;
    email: string;
    channel: string;
}

const YoutubeForm = () => {

    //returns an object that contains several useful properties and methods that can be used in forms
    const form = useForm<FormValues>();
    const { register, control, handleSubmit } = form;
    const { name, ref, onChange, onBlur } = register("username");


    const onSubmit = (data : FormValues) => {
        console.log("Form submitted", data)
    }

    renderCount++
    return (
        <div className=' flex justify-center items-center mt-3'>
            <h1>Youtube Form</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='w-1/3 bg-amber-300'>
                <label className='flex font-bold mb-1' htmlFor='username'>Username</label>

                <input
                    className='block w-1/2 px-1.5 py-3 text-sm leading-5 border-[#CCC]'
                    type="text"
                    id="username"
                    name={name}
                    onChange={onChange}
                    ref={ref}
                    onBlur={onBlur}
                />

                <label className='flex font-bold mb-1' htmlFor='email'>Email</label>
                <input
                    className='block w-1/2 px-1.5 py-3 text-sm leading-5 border-[#CCC]'
                    type="text"
                    id="email"
                    {...register("email")}
                />

                <label className='flex font-bold mb-1' htmlFor='channel'>Channel</label>
                <input
                    className='block w-1/2 px-1.5 py-3 text-sm leading-5 border-[#CCC]'
                    type="text"
                    id="channel"
                    {...register("channel")}
                />

                <Button01 width='w-1/3'>Submit</Button01>

            </form>
            
        </div>
    )
}

//<DevTool control={control} />
export default YoutubeForm