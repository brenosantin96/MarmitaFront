import FormUserPassword from '@/components/FormUserPassword'
import { Icon } from '@/components/svg/Icon'
import React from 'react'

const SignUp = () => {
    return (
        <div className='pt-13 md:pt-24'>
            <div className='container mx-auto max-w-4xl'>
                <div id="createUserDiv" className='flex flex-col'>
                    <div className='font-amsi uppercase font-extrabold text-base md:w-1/2 text-center leading-6 my-4'>
                        Crie sua conta e vamos às compras
                    </div>
                    <div className='flex items-center justify-start mx-4 '>
                        <div id="firstLine" className="border-b border-gray-200 grow shrink "></div>
                        <p className='text-xs text-gray-500 text-left mx-2 py-3'>Use sua rede social para cadastrar sua conta</p>
                        <div id="secondLine" className="border-b border-gray-200 grow shrink"></div>
                    </div>
                    <div id="socialMedia" className='flex gap-2 items-center mx-4'>
                        <button className="rounded-lg h-14 border border-gray-200 w-full flex items-center justify-center">
                            <div>
                                <Icon svg='facebook' width="24px" height='24px' />
                            </div>
                        </button>
                        <button className="rounded-lg h-14 border border-gray-200  w-full flex items-center justify-center">
                            <div>
                                <Icon svg='google' width="24px" height='24px' />
                            </div>
                        </button>
                    </div>
                    <div className='flex items-center justify-start mx-4 '>
                        <div id="firstLine" className="border-b border-gray-200 grow shrink "></div>
                        <p className='text-xs text-gray-500 text-left mx-2 py-3'>Ou</p>
                        <div id="secondLine" className="border-b border-gray-200 grow shrink"></div>
                    </div>

                    <FormUserPassword password='' username='' passwordConfirmation='' />

                </div>
            </div>
        </div>
    )
}

export default SignUp