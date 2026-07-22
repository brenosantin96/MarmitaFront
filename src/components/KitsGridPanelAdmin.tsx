"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

import Button01 from "./Button01";
import CardItem01AdminPanel from "./CardItem01AdminPanel";

import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/UserContext";
import { Kit } from "@/types/Kit";

const KitsGridPanelAdmin = () => {

    const [kits, setKits] = useState<Kit[]>([]);
    const [selectedKitId, setSelectedKitId] = useState<number | null>(null);

    const { user } = useUserContext();
    const router = useRouter();

    useEffect(() => {
        if (user === null) {
            router.replace("/login");
            return;
        }
        fetchKits();
    }, [user, router]);



    const fetchKits = async () => {
        try {
            const res = await axios.get("/api/kits");
            if (res.status === 200) {
                setKits(res.data);
            }
        } catch (err) {
            console.error("Erro ao buscar kits:", err);
        }
    };

    const handleCreateKit = () => {
        console.log("Criando kit");
    };

    const handleEditKit = () => {
        console.log("Editando kit", selectedKitId);
    };

    const handleDeleteKit = () => {
        console.log("Apagando kit", selectedKitId);
    };

    return (
        <div className="border rounded-2xl p-6 shadow-md">
            <h2 className="text-xl font-bold mb-4 text-green-700">
                Kits
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto justify-items-center">

                {kits.length > 0 ? (

                    kits.map((kit) => (

                        <CardItem01AdminPanel
                            key={kit.id}
                            id={kit.id}
                            title={kit.name}
                            imageUrl={`${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}${kit.imageUrl}`}
                            price={kit.price}
                            selected={selectedKitId === kit.id}
                            onSelect={setSelectedKitId}
                            portionGram={100}
                        />

                    ))

                ) : (

                    <p className="text-gray-500">
                        Nenhum kit cadastrado.
                    </p>

                )}

            </div>



            <div className="flex gap-3 mt-6 justify-end">

                <Button01
                    classes="bg-green-700 text-white"
                    onClick={handleCreateKit}
                >
                    Criar Kit
                </Button01>

                <Button01
                    classes="bg-yellow-500 text-white"
                    disabled={!selectedKitId}
                    onClick={handleEditKit}
                >
                    Editar Kit
                </Button01>

                <Button01
                    classes="bg-red-600 text-white"
                    disabled={!selectedKitId}
                    onClick={handleDeleteKit}
                >
                    Apagar Kit
                </Button01>

            </div>

        </div>

    );

};

export default KitsGridPanelAdmin;