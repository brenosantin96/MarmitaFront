"use client";
import React from "react";

const DeliveryPage = () => {
    return (
        
        <div className="grid grid-cols-12 min-h-screen bg-green-200">

            <header className="col-span-12 bg-red-500 text-white flex items-center">
                <p className="pl-3">São <span className="underline">2 itens</span> no total de <strong>R$ 40,98</strong></p>
            </header>

            <div className="col-span-12 grid grid-cols-12">
                <div className="col-span-8 bg-gray-300">ksx</div>
            </div>

            <div className="col-span-12 grid grid-cols-12">
                <div className="col-span-8 bg-gray-100">teste</div>
            </div>

        </div>
    );
};

export default DeliveryPage;
