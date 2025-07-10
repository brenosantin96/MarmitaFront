import React from 'react';
import { Icon } from './svg/Icon';

type PropsModal01 = {
    isOpen: boolean;
    handleClose: () => void;
    modalTitle : string;
};

const ModalAddress = ({ handleClose, isOpen, modalTitle }: PropsModal01) => {
    if (!isOpen) return null;

    return (

        <>
        {/* Fundo escuro semi-transparente */}
        <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={handleClose}></div>

         {/* Modal centralizado */}
         <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-lg shadow-lg z-50">
            
            <div id="headerModalAddress" className="flex border-b border-gray-300 p-4 justify-between items-center rounded-t-lg">
                <div className="text-base font-bold">{modalTitle}</div>
                <div className="cursor-pointer flex items-center" onClick={handleClose}>
                    <div className='font-bold px-3' style={{fontSize: 10}}>
                        FECHAR
                    </div>
                    <Icon svg='close2' height='20px' width='20px' />
                </div>
            </div>

            <div id="bodyModalAddress" className="p-4 text-sm">
                <p>Conta pra gente, <strong>onde é aí mesmo?</strong></p>
                <form>
                    <input className='border-b py-4 block w-full border-gray-200' placeholder='CEP de entrega'></input>
                </form>
            </div>
        </div>
        </>
    );
};

export default ModalAddress;