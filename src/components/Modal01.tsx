import React from 'react';
import { Icon } from './svg/Icon';
import Button01 from './Button01';

type PropsModal01 = {
    isOpen: boolean;
    handleClose: () => void;
    modalTitle: string;
    modalText: string;
    isModalForDelete?: boolean
    idToDelete?: number
    handleConfirmDelete?: (id : number) => void;
    reqToDelete?: string;


};

const Modal01 = ({ handleClose, isOpen, modalTitle, modalText, isModalForDelete, handleConfirmDelete, idToDelete }: PropsModal01) => {


    if (!isOpen) return null; 

    const handleDeleteAndCloseModal = () => {

        if (isModalForDelete && handleConfirmDelete) {
            console.log("deletando id selecionado desde modal01: ", idToDelete)
            handleConfirmDelete(idToDelete as number);
            handleClose();
        } else {
            handleClose();
        }
    }

    return (

        <>
            {/* Fundo escuro semi-transparente */}
            <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={handleClose}></div>

            {/* Modal centralizado */}
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-lg shadow-lg z-50">

                <div id="headerModal01" className="flex bg-red-300 p-4 justify-between items-center rounded-t-lg">
                    <div className="text-lg font-bold">{modalTitle}</div>
                    <div className="cursor-pointer text-3xl" onClick={handleClose}>
                        <Icon svg='close2' height='20px' width='20px' />
                    </div>
                </div>

                <div id="contentHeader" className="p-4">
                    <div>{modalText}</div>
                    {isModalForDelete === true && (
                        <div className='flex gap-4 pt-4'>
                            <Button01 backgroundColor='bg-red-700' textColor='text-white' onClick={handleDeleteAndCloseModal} >Confirmar</Button01>
                            <Button01 backgroundColor='bg-gray-400' textColor='text-white' onClick={handleClose}>Cancelar</Button01>

                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Modal01;