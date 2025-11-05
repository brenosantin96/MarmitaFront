"use client"

import React, { useState } from 'react'

type CategorieItemProps = {
    id: number;
    name: string;
    onSelect: (id: number) => void;
    isSelected: boolean; // nova prop controlada pelo pai
}

const AdminCategorieItemGrid = ({ id, name, onSelect, isSelected }: CategorieItemProps) => {

    const [selectedId, setSelectedId] = useState<number | null>(null);

    const handleSelect = () => {
    setSelectedId(id);

    console.log("ID sendo passado para o pai: ", id);

    onSelect(id);
  };


    return (
        <div
            onClick={handleSelect}
            className={`w-full flex justify-between items-center border-b px-4 py-3 rounded-md cursor-pointer transition-all duration-200
        ${isSelected
                    ? "bg-green-100 border-green-500 shadow-md"
                    : "hover:bg-gray-100 hover:shadow-sm"
                }`}
        >
            <span className="font-medium text-gray-800">{name}</span>
            <span
                className={`text-sm font-semibold ${isSelected ? "text-green-600" : "text-gray-400"
                    }`}
            >
                {isSelected ? "Selecionado" : "Clique para selecionar"}
            </span>
        </div>
    )
}

export default AdminCategorieItemGrid