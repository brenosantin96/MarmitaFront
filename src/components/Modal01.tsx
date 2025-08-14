import React from 'react';
import { Icon } from './svg/Icon';

type PropsModal01 = {
    isOpen: boolean;
    handleClose: () => void;
    modalTitle : string;
    modalText: string;
};

const Modal01 = ({ handleClose, isOpen, modalTitle, modalText }: PropsModal01) => {


    if (!isOpen) return null; //essa linha deve ser corrigida!

    return (

        <>
        {/* Fundo escuro semi-transparente */}
        <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={handleClose}></div>

         {/* Modal centralizado */}
         <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-lg shadow-lg z-50">
            
            <div id="headerModal01" className="flex bg-green-300 p-4 justify-between items-center rounded-t-lg">
                <div className="text-lg font-bold">{modalTitle}</div>
                <div className="cursor-pointer text-3xl" onClick={handleClose}>
                    <Icon svg='close2' height='20px' width='20px' />
                </div>
            </div>

            <div id="contentHeader" className="p-4">
                <div>{modalText}</div>
            </div>
        </div>
        </>
    );
};

export default Modal01;