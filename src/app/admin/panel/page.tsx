"use client"
import Button01 from '@/components/Button01'
import CategorieModal from '@/components/CategorieModal';
import MarmitaModal from '@/components/MarmitaModal';
import { useCategorieContext } from '@/context/CategoryContext';
import { useUserContext } from '@/context/UserContext';
import { Category } from '@/types/Category';
import { CategoryCreateUpdateDto } from '@/types/CategoryCreateUpdateDto';
import { MarmitaCreateDto } from '@/types/MarmitaCreateDto';
import { MarmitaType } from '@/types/MarmitaType';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const AdminPanelPage = () => {

  const [isMarmitaModalOpened, setIsMarmitaModalOpened] = useState(false);
  const [isCategorieModalOpened, setIsCategorieModalOpened] = useState(false);
  const { categories, fetchCategories } = useCategorieContext();


  const { user } = useUserContext();
  const router = useRouter();


  useEffect(() => {
    if (!user.isAdmin) {
      // se não for admin, redireciona para home (ou login)
      router.replace("/login");
      return;
    }

    // só busca categorias se for admin
    getAllCategories();
  }, [user, router]);

  const getAllCategories = async () => {

    const res = await axios.get(`/api/categories`)
    if (res.status !== 200) {
      console.log("Algo ocorreu, nao foi possivel retornar as categorias")
      return []
    } else {
      console.log(res.data);
    }
  }

  const handleCloseMarmitaModal = () => {
    setIsMarmitaModalOpened(false);
  }

  const handleCloseCategorieModal = () => {
    setIsCategorieModalOpened(false);
  }

  const onSubmitMarmita = async (dto: MarmitaCreateDto) => {
    try {
      const fd = new FormData();
      fd.append("name", dto.name);
      fd.append("description", dto.description);
      fd.append("price", String(dto.price));            // "15.99"
      fd.append("portionGram", String(dto.portionGram));
      fd.append("categoryId", String(dto.categoryId));  // 👈 dinâmico
      fd.append("image", dto.image);

      const res = await axios.post(
        `/api/lunchboxes`,
        fd,
        {
          withCredentials: true,
          // não setar manualmente Content-Type; o browser define o boundary
        }
      );

      console.log("Marmita criada:", res.data);
    } catch (err) {
      console.error("Erro ao criar marmita:", err);
    }
  };

  const onSubmitCategory = async (dto: CategoryCreateUpdateDto) => {
    try {
      const res = await axios.post("/api/categories", dto);

      if (res.status !== 200 && res.status !== 201) {
        console.log("Requisição nao foi bem sucedida: STATUS ", res.status);
      }

      fetchCategories();
      console.log("Categoria criada:", res.data);
    } catch (err) {
      console.log("ERRO: ", err);
    }
  };


  // Se não for admin, mostra só um loading (até o redirect acontecer)
  if (!user.isAdmin) {
    return <p className="text-center mt-20">Redirecionando...</p>;
  }

  return (
    <>
      <MarmitaModal handleClose={handleCloseMarmitaModal} categories={categories} isOpen={isMarmitaModalOpened} modalTitle='Marmita' onSubmitMarmita={onSubmitMarmita} />
      <CategorieModal handleClose={handleCloseCategorieModal} isOpen={isCategorieModalOpened} modalTitle='Categoria' onSubmitCategorie={onSubmitCategory} />


      <div className="flex justify-center items-center pt-28 px-4 ">
        <Button01
          width='w-1/2'
          classes="bg-green-700 text-white"
          onClick={() => setIsMarmitaModalOpened(true)}>Criar Marmita</Button01>
      </div>

      <div className="flex justify-center items-center mt-3 px-4 ">
        <Button01
          width='w-1/2'
          classes="bg-green-700 text-white"
          onClick={() => setIsCategorieModalOpened(true)}>Criar Categoria</Button01>
      </div>

    </>
  )
}

export default AdminPanelPage