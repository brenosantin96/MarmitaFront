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
            <div className="col-span-4 border flex justify-center items-center">
                <div className="flex items-center justify-center">
                    <div className="bg-amber-300 rounded-full text-gray-700 font-bold flex items-center justify-center">1</div>
                    <div className=" text-gray-700">Endereco</div>
                </div>
                <div className="flex items-center justify-center">
                    <div className="bg-amber-300 rounded-full text-gray-700 font-bold flex items-center justify-center">2</div>
                    <div className=" text-gray-700">Entrega</div>
                </div>
                <div className="flex items-center justify-center">
                    <div className="bg-amber-300 rounded-full text-gray-700 font-bold flex items-center justify-center">3</div>
                    <div className=" text-gray-700">Pagamento</div>
                </div>

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
