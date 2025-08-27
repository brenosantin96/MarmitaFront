"use client";

import CardItem01 from '@/components/CardItem01';
import { SideMenu } from '@/components/SideMenu';
import React, { useEffect, useState } from 'react';
import { MarmitaType } from '@/types/MarmitaType';
import axios from 'axios';

const MenuPage = () => {
  const [marmitas, setMarmitas] = useState<MarmitaType[]>([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar marmitas do backend
  const getMarmitas = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/lunchboxes`, {
        withCredentials: true, // envia cookies HTTP-only
      });

      setMarmitas(res.data);
    } catch (err) {
      console.error("Erro ao buscar marmitas:", err);
      setMarmitas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMarmitas();
  }, []);

  // Funções temporárias
  const addMarmita = () => console.log("Adding Marmita");
  const removeMarmita = () => console.log("Removing Marmita");

  if (loading) {
    return <div className="pt-28 px-4">Carregando marmitas...</div>;
  }

  if (marmitas.length === 0) {
    return <div className="pt-28 px-4">Nenhuma marmita encontrada.</div>;
  }

  return (
    <>
      <SideMenu />
      <div id="menuPage" className="pt-28 px-4 w-full">
        <div
          id="menuList"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-screen-xl mx-auto justify-items-center"
        >
          {marmitas.map((item) => (
            <CardItem01
              key={item.id}
              title={item.name}
              price={item.price}
              portion={item.portion}
              imageUrl={item.imageUrl}
              onAdd={addMarmita}
              onRemove={removeMarmita}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default MenuPage;
