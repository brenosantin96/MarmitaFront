"use client"
import Button01 from '@/components/Button01'
import CartSideMenu from '@/components/CartSideMenu';
import CategorieModal from '@/components/CategorieModal';
import MarmitaModal from '@/components/MarmitaModal';
import { SideMenu } from '@/components/SideMenu';
import { useCategorieContext } from '@/context/CategoryContext';
import { useUserContext } from '@/context/UserContext';
import { CategoryCreateUpdateDto } from '@/types/CategoryCreateUpdateDto';
import { MarmitaCreateDto } from '@/types/MarmitaCreateDto';
import { Lunchbox } from '@/types/Lunchbox';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import CardItem01AdminPanel from '@/components/CardItem01AdminPanel';
import Modal01 from '@/components/Modal01';
import { MenuOption } from "@/types/AdminPanelMenuOption"
import AdminPanelMenuOptionJson from "../../../Data/AdminPanelMenuOptionJson.json"
import MarmitasGridPanelAdmin from '@/components/MarmitasGridPanelAdmin';

const AdminPanelPage = () => {

  const { user } = useUserContext();
  const [menuOptions, setMenuOptions] = useState<MenuOption[]>(AdminPanelMenuOptionJson);


  if (user === null) {
    return <p className="text-center mt-20">Redirecionando...</p>;
  }

  return (
    <>
      <CartSideMenu />
      <SideMenu />

      <div className="px-12 pt-15 mt-12">

        <div className="p-2 font-hindmadurai text-xl">
          <ul className="flex gap-7">
            {menuOptions.map((item) => (
              <li
                key={item.id}
                onClick={() =>
                  setMenuOptions((prev) =>
                    prev.map((opt) =>
                      opt.id === item.id
                        ? { ...opt, isSelected: true }
                        : { ...opt, isSelected: false }
                    )
                  )
                }
                className={`cursor-pointer hover:font-bold ${item.isSelected ? "text-black-600 font-bold" : ""
                  }`}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        <MarmitasGridPanelAdmin />
        
      </div>
    </>
  )
}

export default AdminPanelPage;

//Essa pagina vai renderizar GRIDS diferentes de acordo com a opção selecionada no MENU.