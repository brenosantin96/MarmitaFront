import React, { useState } from 'react'
import CategorieModal from './CategorieModal'
import { useUserContext } from '@/context/UserContext';
import { useCategorieContext } from '@/context/CategoryContext';
import { CategoryCreateUpdateDto } from '@/types/CategoryCreateUpdateDto';
import axios from 'axios';
import AdminCategorieItemGrid from './AdminCategorieItemGrid';
import Button01 from './Button01';

const CategoriesGridPanelAdmin = () => {

  const [isCategorieModalOpened, setIsCategorieModalOpened] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

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

  const getSelectedItem = (id: number) => {
    setSelectedId(id);
    console.log("Categoria selecionada:", id);
  };

  // Abrir modal para criar
    const handleCreateCategory = () => {
        setIsCategorieModalOpened(true);
    };

  return (
    <>
      <CategorieModal
        handleClose={() => setIsCategorieModalOpened(false)}
        isOpen={isCategorieModalOpened}
        modalTitle='Categoria'
        onSubmitCategorie={onSubmitCategory}
      />

      <div className="border rounded-2xl p-6 shadow-md">
        <h2 className="text-xl font-bold mb-4 text-green-700">Categorias</h2>

        {/* Listagem */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-2 max-w-4xl mx-auto w-full">
          {categories.length > 0 ? (
            categories.map((categorie) => (
              <AdminCategorieItemGrid
                key={categorie.id}
                id={categorie.id}
                name={categorie.name}
                onSelect={getSelectedItem}
                isSelected={selectedId === categorie.id}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center py-6">
              Nenhuma categoria cadastrada.
            </p>
          )}
        </div>

        {/* Rodapé com botões */}
            <div className="flex gap-3 mt-6 justify-end">
                <Button01
                    classes="bg-green-700 text-white"
                    onClick={handleCreateCategory}
                >
                    Novo
                </Button01>
            </div>

      </div>


    </>
  )
}

export default CategoriesGridPanelAdmin