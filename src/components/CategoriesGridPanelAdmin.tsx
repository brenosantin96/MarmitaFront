import React, { useState } from 'react'
import CategorieModal from './CategorieModal'
import { useUserContext } from '@/context/UserContext';
import { useCategorieContext } from '@/context/CategoryContext';
import { CategoryCreateUpdateDto } from '@/types/CategoryCreateUpdateDto';
import axios from 'axios';

const CategoriesGridPanelAdmin = () => {

    const [isCategorieModalOpened, setIsCategorieModalOpened] = useState(false);

    const { categories, fetchCategories } = useCategorieContext();
    const { user } = useUserContext();

    // Criar categoria
  const onSubmitCategory = async (dto: CategoryCreateUpdateDto) => {
    try {
      const res = await axios.post("/api/categories", dto);
      if (res.status == 200 || res.status == 201) {
        fetchCategories();
      }
    } catch (err) {
      console.log("Algum erro ocorreu: ", err)
    }
  };

    return (
        <>
            <CategorieModal
                handleClose={() => setIsCategorieModalOpened}
                isOpen={isCategorieModalOpened}
                modalTitle='Categoria'
                onSubmitCategorie={onSubmitCategory}
            />


        </>
    )
}

export default CategoriesGridPanelAdmin