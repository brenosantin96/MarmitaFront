"use client"
import React, { useEffect, useState } from 'react';
import { Icon } from './svg/Icon';
import Button01 from './Button01';

type PropsModal01 = {
    isOpen: boolean;
    handleClose: () => void;
    modalTitle: string;
};

const ModalAddress = ({ handleClose, isOpen, modalTitle }: PropsModal01) => {

    const [addressOnFocus, setAddressOnFocus] = useState(false);
    const [cep, setCep] = useState("");
    const [number, setNumber] = useState<number | null>(null);
    const [comp, setComp] = useState("");

    const [isAllInfoValidated, setIsAllInfoValidated] = useState(false);

    if (!isOpen) return null;

    useEffect(() => { 
        //aqui cada vez q um dos campos muda ele analisa se ta vazio ou nao
        const isValid = cep.trim() !== '' && number !== null && comp.trim() !== '';
        setIsAllInfoValidated(isValid);
    }, [cep, number, comp])

    return (

        <>
            {/* Fundo escuro semi-transparente */}
            <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={handleClose}></div>

            {/* Modal centralizado */}
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-lg shadow-lg z-50">

                <div id="headerModalAddress" className="flex border-b border-gray-300 p-4 justify-between items-center rounded-t-lg">
                    <div className="text-base font-bold">{modalTitle}</div>
                    <div className="cursor-pointer flex items-center" onClick={handleClose}>
                        <div className='font-bold px-3' style={{ fontSize: 10 }}>
                            FECHAR
                        </div>
                        <Icon svg='close2' height='20px' width='20px' />
                    </div>
                </div>

                <div id="bodyModalAddress" className="p-4 text-sm">
                    <p className='mb-5'>Conta pra gente, <strong>onde é aí mesmo?</strong></p>
                    <form>
                        {
                            <div className={`transition-opacity duration-300 ${addressOnFocus ? 'opacity-100' : 'opacity-0 h-0'} overflow-hidden`}>
                                <label htmlFor='ZipAddress' className="block text-sm mb-1">Cep de entrega</label>
                            </div>
                        }

                        <input
                            id="ZipAddress"
                            name="ZipAddress"
                            onFocus={() => setAddressOnFocus(true)}
                            onBlur={() => setAddressOnFocus(false)}
                            className='border-b py-3 px-2 block w-full border-gray-200'
                            placeholder='CEP de entrega'
                            value={cep}
                            onChange={(e) => setCep(e.target.value)}
                        />

                        <div className='flex mb-5'>
                            <input
                                id="NumberAddress"
                                name="NumberAddress"
                                className='mx-1 border-b py-3 px-2 block w-full border-gray-200'
                                placeholder='Número'
                                value={number === null ? '' : number}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setNumber(val === '' ? null : parseInt(val))
                                }}
                            />
                            <input
                                id="CompAddress"
                                name="CompAddress"
                                className='mx-1 border-b py-3 px-2 block w-full border-gray-200'
                                placeholder='Complemento'
                                value={comp}
                                onChange={(e) => setComp(e.target.value)}
                            />

                        </div>
                        <Button01 disabled={!isAllInfoValidated} >CONTINUAR</Button01>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ModalAddress;