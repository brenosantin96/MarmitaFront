import React, { useState } from 'react'
import CategorieModal from './CategorieModal'
import { useUserContext } from '@/context/UserContext';
import { useCategorieContext } from '@/context/CategoryContext';
import { CategoryCreateUpdateDto } from '@/types/CategoryCreateUpdateDto';
import axios from 'axios';
import AdminCategorieItemGrid from './AdminCategorieItemGrid';
import Button01 from './Button01';
import { Icon } from './svg/Icon';
import { Category } from '@/types/Category';
import Modal01 from './Modal01';

const CategoriesGridPanelAdmin = () => {

  const [isCategorieModalOpened, setIsCategorieModalOpened] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [categorieToBeEdited, setCategorieToBeEdited] = useState<Category | null>(null);
  const [isOpenModalDeleteCategorie, setIsOpenModalDeleteCategorie] = useState(false);

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
  };

  // Abrir modal para criar
  const handleCreateCategory = () => {
    setCategorieToBeEdited(null);
    setIsCategorieModalOpened(true);
  };

  const handleEditCategory = (id: number) => {
    const category = categories.find(c => c.id === id);
    if (category) {
      setCategorieToBeEdited(category);
      setIsCategorieModalOpened(true);
    }
  };

  // Editar cateogria
  const onEditCategory = async (id: number, dto: CategoryCreateUpdateDto) => {

    try {

      const res = await axios.put(`/api/categories/${id}`, dto, {
        withCredentials: true,
      });

      console.log("Categoria editada:", res.data);
      fetchCategories();

    } catch (err) {
      console.error("Erro ao editar categoria:", err);
    }
  };

  const openModalDeleteCategory = (id: number) => {
    setIsOpenModalDeleteCategorie(true);
  }

  const deleteCategory = async (id: number) => {

    if (!id) {
    console.warn("Nenhuma categoria selecionada para deletar");
    return;
  }

  try {
    const response = await axios.delete(`/api/categories/${id}`, {
      withCredentials: true,
    });

    console.log("Categoria deletada:", response.data);

    // Atualiza lista
    fetchCategories();

    // Fecha o modal após deletar
    setIsOpenModalDeleteCategorie(false);
    setSelectedId(null);
  } catch (err) {
    console.log("Algum erro aconteceu ao deletar: ", err);
  }
};

  return (
    <>
      <CategorieModal
        handleClose={() => setIsCategorieModalOpened(false)}
        isOpen={isCategorieModalOpened}
        modalTitle={categorieToBeEdited ? "Editar Categoria" : "Nova Categoria"}
        onSubmitCategorie={onSubmitCategory}
        onEditCategorie={onEditCategory}
        category={categorieToBeEdited ?? undefined}
      />

      <Modal01
        handleClose={() => setIsOpenModalDeleteCategorie(false)}
        isOpen={isOpenModalDeleteCategorie}
        modalTitle="Confirma deletar categoria?"
        modalText="Tem certeza que deseja eliminar a categoria selecionada?"
        isModalForDelete={true}
        idToDelete={selectedId as number}
        handleConfirmDelete={deleteCategory}
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
                onEdit={handleEditCategory}
                onRemove={openModalDeleteCategory}
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