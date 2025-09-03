"use client"

import { Category } from "@/types/Category";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

// CategoryContext.tsx
const CategoryContext = createContext({
    categories: [] as Category[],
    fetchCategories: async () => { }
});

export const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
    const [categories, setCategories] = useState<Category[]>([]);

    const fetchCategories = async () => {
        const res = await axios.get("/api/categories");
        setCategories(res.data);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <CategoryContext.Provider value={{ categories, fetchCategories }}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategorieContext = () => {
    const context = useContext(CategoryContext);
    if (!context) {
        throw new Error("Error using CategoryContext");
    }
    return context;
}