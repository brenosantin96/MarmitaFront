"use client"

import React, { useState } from 'react'
import { Icon } from './svg/Icon';

type CategorieItemProps = {
    id: number;
    name: string;
    onSelect: (id: number) => void;
    isSelected: boolean; // nova prop controlada pelo pai
    onEdit: (id: number) => void;
    onRemove: (id: number) => void;
}

const AdminCategorieItemGrid = ({ id, name, onSelect, isSelected, onEdit, onRemove }: CategorieItemProps) => {


    const handleSelect = () => {
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

            <div className="flex gap-3">
                <div onClick={() => onEdit(id)}>
                    <Icon svg='edit' height='24px' width='24px' fillColor="#7A7878"></Icon>
                </div>
                <div onClick={() => onRemove(id)}>
                    <Icon svg='trash' height='24px' width='24px' fillColor="#7A7878"></Icon>
                </div>
            </div>
        </div>
    )
}

export default AdminCategorieItemGrid