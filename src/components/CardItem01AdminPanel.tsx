import React from 'react';
import { formatPriceToBRL } from '@/utils/Formatter';

type PropsCardItem01AdminPanel = {
    id: number;
    title: string;
    imageUrl: string | File;
    price: number;
    portionGram: number;
    selected: boolean;
    onSelect: (id: number) => void;
}

const CardItem01AdminPanel = ({ id, title, price, imageUrl, portionGram, selected, onSelect }: PropsCardItem01AdminPanel) => {
    return (
        <div
            className={`inline-flex flex-col rounded-lg font-hindmadurai border mb-3 pb-5 max-w-[200px] cursor-pointer transition
        ${selected ? 'border-green-700 shadow-lg' : 'border-gray-400 hover:border-green-400'}
      `}
            onClick={() => onSelect(id)}
        >
            <div className="overflow-hidden rounded-t-lg h-[150px]">
                <img src={imageUrl as string} alt={title} className="object-cover w-full h-full" />
            </div>
            <div className="pt-2 px-3">
                <div className="font-semibold text-sm truncate">{title}</div>
                <div className="flex justify-between text-sm text-gray-700">
                    <div>{formatPriceToBRL(price)}</div>
                    <div className="text-gray-400">{portionGram}g</div>
                </div>
            </div>
        </div>
    )
}

export default CardItem01AdminPanel;
