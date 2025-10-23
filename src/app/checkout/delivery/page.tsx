"use client";
import { Icon } from "@/components/svg/Icon";
import React from "react";

const DeliveryPage = () => {



    return (

        <div className="grid grid-cols-12 grid-rows-[45px_70px_1fr] min-h-screen grid-flow-row-dense font-hindmadurai">

            {/* linha 1 */}
            <header className="col-span-12 bg-red-700 h-[45px] text-white flex items-center">
                <p className="pl-3">São <span className="underline">2 itens</span> no total de <strong>R$ 40,98</strong></p>
            </header>

            {/* linha 2 */}
            <div className="col-span-4  flex justify-center items-center m-2">
                <div className="flex h-full w-full items-center justify-center gap-1 ">
                    <div className="bg-[#f6f3ea] h-[30px] p-2 rounded-full text-gray-700 font-bold flex items-center justify-center">1</div>
                    <div className=" text-gray-700 font-bold">Endereço</div>
                </div>
                <div className="flex h-full w-full items-center justify-center gap-1 ">
                    <div className="bg-[#f6f3ea] h-[30px] p-2 rounded-full text-gray-700 font-bold flex items-center justify-center">2</div>
                    <div className=" text-gray-700">Entrega</div>
                </div>
                <div className="flex h-full w-full items-center justify-center gap-1 ">
                    <div className="bg-[#f6f3ea] h-[30px] p-2 rounded-full text-gray-700 font-bold flex items-center justify-center">3</div>
                    <div className=" text-gray-700">Revisão</div>
                </div>
            
            </div>

            <div className="col-span-4 bg-purple-400 row-span-2">
                COLUNA com dados do endereco ou entrega
            </div>

            <div className="col-span-4 bg-blue-400 row-span-2">
                ITENS comprados pelo usuario
            </div>

            {/* linha 3 */}
            <div className="col-span-4 mx-4 mt-3 ">
                <div className="font-hindmadurai font-bold text-[18px] uppercase m-2 tracking-tight">Como você <br /> prefere receber <br /> seus produtos?</div>
                <div className="flex flex-col justify-around gap-2 mx-3">
                    <div className="border cursor-pointer border-gray-300 w-1/2 hover:shadow-sm p-2 flex items-center">
                        <div><Icon svg="truck" height="25px" width="25px" /></div>
                        <div className="font-semibold text-base pl-2">ENTREGA</div>
                    </div>
                    <div className="border cursor-pointer border-gray-300 w-1/2 hover:shadow-sm p-2 flex items-center">
                        <div><Icon svg="store" height="30px" width="30px" /></div>
                        <div className="font-semibold text-base pl-2">RETIRADA</div>
                    </div>
                </div>
            </div>




        </div>
    );
};

export default DeliveryPage;
