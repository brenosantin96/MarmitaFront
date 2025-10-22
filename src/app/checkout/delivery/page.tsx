"use client";
import React from "react";

const DeliveryPage = () => {



    return (
        
        <div className="grid grid-cols-12 grid-rows-[45px_100px_1fr] min-h-screen bg-green-200 grid-flow-row-dense">

            {/* linha 1 */}
            <header className="col-span-12 bg-red-700 h-[45px] text-white flex items-center">
                <p className="pl-3">São <span className="underline">2 itens</span> no total de <strong>R$ 40,98</strong></p>
            </header>

            {/* linha 2 */}
            <div className="col-span-4 bg-green-300">
                Endereco entrega revisao
            </div> 

            <div className="col-span-4 bg-purple-400 row-span-2">
                COLUNA com dados do endereco ou entrega
            </div>

            <div className="col-span-4 bg-blue-400 row-span-2">
                ITENS comprados pelo usuario
            </div>

            {/* linha 3 */}
            <div className="col-span-4 bg-gray-300">
                <div>Como você prefere receber seus produtos?</div>
                <div>
                    <div>ENTREGA</div>
                    <div>RETIRADA</div>
                </div>
            </div> 
            

            

        </div>
    );
};

export default DeliveryPage;
