//src\components\AllMenuWithoutCategory.tsx

import { Lunchbox } from '@/types/Lunchbox'
import React from 'react'
import CardItem01 from './CardItem01'

type AllMenuWithoutCategoryProps = {
    marmitas: Lunchbox[]
    onAdd: (marmitaId : number) => void
    onRemove: (marmitaId : number) => void
}

const AllMenuWithoutCategory = ({ marmitas, onAdd, onRemove }: AllMenuWithoutCategoryProps) => {
    return (
        <div
            id="menuList"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto justify-items-center"
        >
            {marmitas.map((item) => (
                <CardItem01
                    id={item.id}
                    key={item.id}
                    title={item.name}
                    price={item.price}
                    portionGram={item.portionGram}
                    imageUrl={`${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}${item.imageUrl}`}
                    onAdd={onAdd}
                    onRemove={onRemove}
                />
            ))}
        </div>
    )
}

export default AllMenuWithoutCategory