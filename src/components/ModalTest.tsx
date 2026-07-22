//src\components\ModalTest.tsx

import React from 'react'

type ModalTestProps = {
    isOpen: boolean;
    onClose: () => void;
};

const ModalTest = ({ isOpen, onClose }: ModalTestProps) => {

    if (!isOpen) return null;


    return (

        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

            <div className="bg-white rounded-xl p-6 w-[400px]">

                <h1 className="text text-2xl font-bold">Meu modal</h1>

                <p>Conteudo do modal....</p>

                <button onClick={onClose}>
                    Fechar
                </button>
            </div>
        </div>

    )
}

export default ModalTest

/*
fixed: fixo na tela
inset-0 equivale a top:0; left:0; right:0; bottom:0; (ou seja, tela completa)
bg-black/60 fundo opaco


*/