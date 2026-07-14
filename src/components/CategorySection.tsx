"use client";

import React from "react";
import CardItem01 from "./CardItem01";
import { Lunchbox } from "@/types/Lunchbox";
import { Category } from "@/types/Category";
import { banners } from "@/types/Banners";

type CategorySectionProps = {
    category: Category;
    lunchboxes: Lunchbox[];
    onAdd: (id: number) => void;
    onRemove: (id: number) => void;
};

const CategorySection = ({
    category,
    lunchboxes,
    onAdd,
    onRemove,
}: CategorySectionProps) => {

    // Não renderiza categorias vazias
    if (lunchboxes.length === 0) {
        return null;
    }


    console.log(banners[category.name as keyof typeof banners]);

    return (
        <section
            id={`category-${category.id}`}
            className="mb-14"
        >
            <div className="flex justify-center">
                <img
                    src={banners[category.name as keyof typeof banners]}
                    alt={category.name}
                    className="
            w-full
            md:max-w-[768px]
            h-auto
            rounded-xl
        "
                />
            </div>

            {/* Espaço de 15px */}
            <div className="h-[15px]" />

            {/* Grid das marmitas */}
            <div
                className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-4
                    gap-6
                    justify-items-center
                "
            >
                {lunchboxes.map((item) => (
                    <CardItem01
                        key={item.id}
                        id={item.id}
                        title={item.name}
                        price={item.price}
                        portionGram={item.portionGram}
                        imageUrl={`${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}${item.imageUrl}`}
                        onAdd={onAdd}
                        onRemove={onRemove}
                    />
                ))}
            </div>
        </section>
    );
};

export default CategorySection;