import React from 'react';

type PropsModal01 = {
    isOpen: boolean;
    handleClose: () => void;
    modalTitle : string;
};

const Modal01 = ({ handleClose, isOpen, modalTitle }: PropsModal01) => {


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
                    X
                </div>
            </div>

            <div id="contentHeader" className="p-4">
                <div>BLA</div>
                <div>BLA</div>
                <div>BLA</div>
                <div>BLA</div>
            </div>
        </div>
        </>
    );
};

export default Modal01;