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

const AdminPanelPage = () => {
  const [isMarmitaModalOpened, setIsMarmitaModalOpened] = useState(false);
  const [isCategorieModalOpened, setIsCategorieModalOpened] = useState(false);
  const [marmitas, setMarmitas] = useState<Lunchbox[]>([]);
  const [selectedMarmitaId, setSelectedMarmitaId] = useState<number | null>(null);
  const [editingMarmita, setEditingMarmita] = useState<Lunchbox | null>(null);

  const { categories, fetchCategories } = useCategorieContext();
  const { user } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (!user.isAdmin) {
      router.replace("/login");
      return;
    }
    fetchMarmitas();
  }, [user, router]);

  useEffect(() => {
    console.log("Marmitas: ", marmitas)
   // console.log(`${process.env.NEXT_PUBLIC_API_BASE_URL}${marmitas[1].ImageUrl}`)
  }, [marmitas]);



  // Buscar marmitas
  const fetchMarmitas = async () => {
    try {
      const res = await axios.get(`/api/lunchboxes`);

      console.log("RES: ", res);
      if (res.status === 200) {
        setMarmitas(res.data);
      }
    } catch (err) {
      console.error("Erro ao buscar marmitas:", err);
    }
  };

  // Criar marmita
  const onSubmitMarmita = async (dto: MarmitaCreateDto) => {
    try {
      const fd = new FormData();
      fd.append("name", dto.name);
      fd.append("description", dto.description);
      fd.append("price", String(dto.price));
      fd.append("portionGram", String(dto.portionGram));
      fd.append("categoryId", String(dto.categoryId));

      if (dto.image) fd.append("image", dto.image);

      const res = await axios.post(`/api/lunchboxes`, fd, { withCredentials: true });

      console.log("Marmita criada:", res.data);
      fetchMarmitas();
    } catch (err) {
      console.error("Erro ao criar marmita:", err);
    }
  };

  // Editar marmita
  const onEditMarmita = async (id: number, dto: MarmitaCreateDto) => {
    try {
      const fd = new FormData();
      fd.append("id", String(id));
      fd.append("name", dto.name);
      fd.append("description", dto.description);
      fd.append("price", String(dto.price));
      fd.append("portionGram", String(dto.portionGram));
      fd.append("categoryId", String(dto.categoryId));
      if (dto.image) fd.append("image", dto.image);

      const res = await axios.put(`/api/lunchboxes`, fd, { withCredentials: true });

      console.log("Marmita editada:", res.data);
      fetchMarmitas();
    } catch (err) {
      console.error("Erro ao editar marmita:", err);
    }
  };

  // Fechar modal (reseta edição)
  const handleCloseMarmitaModal = () => {
    setIsMarmitaModalOpened(false);
    setEditingMarmita(null);
  };

  // Abrir modal para criar
  const handleCreateMarmita = () => {
    setEditingMarmita(null);
    setIsMarmitaModalOpened(true);
  };

  // Abrir modal para editar
  const handleEditMarmita = () => {
    const marmita = marmitas.find(m => m.id === selectedMarmitaId);
    if (marmita) {
      setEditingMarmita(marmita);
      setIsMarmitaModalOpened(true);
    }
  };

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

  if (!user.isAdmin) {
    return <p className="text-center mt-20">Redirecionando...</p>;
  }

  return (
    <>
      <CartSideMenu />
      <SideMenu />

      <MarmitaModal
        handleClose={handleCloseMarmitaModal}
        categories={categories}
        isOpen={isMarmitaModalOpened}
        modalTitle={editingMarmita ? "Editar Marmita" : "Nova Marmita"}
        onSubmitMarmita={onSubmitMarmita}
        onEditMarmita={onEditMarmita}
        marmita={editingMarmita ?? undefined}
      />

      <CategorieModal
        handleClose={() => setIsCategorieModalOpened}
        isOpen={isCategorieModalOpened}
        modalTitle='Categoria'
        onSubmitCategorie={onSubmitCategory}
      />

      <div className="px-12 pt-15 mt-12">
        <div className="border rounded-2xl p-6 shadow-md">
          <h2 className="text-xl font-bold mb-4 text-green-700">Marmitas</h2>

          {/* Listagem */}
          <div className="flex flex-wrap gap-4">
            {marmitas.length > 0 ? (
              marmitas.map((marmita) => (
                <CardItem01AdminPanel
                  key={marmita.id}
                  id={marmita.id}
                  title={marmita.name}
                  imageUrl={`${process.env.NEXT_PUBLIC_API_BASE_URL}${marmita.imageUrl}`}
                  price={marmita.price}
                  portionGram={marmita.portionGram}
                  selected={selectedMarmitaId === marmita.id}
                  onSelect={setSelectedMarmitaId}
                />
              ))
            ) : (
              <p className="text-gray-500">Nenhuma marmita cadastrada.</p>
            )}
          </div>

          {/* Rodapé com botões */}
          <div className="flex gap-3 mt-6 justify-end">
            <Button01
              classes="bg-green-700 text-white"
              onClick={handleCreateMarmita}
            >
              Criar Marmita
            </Button01>

            <Button01
              classes="bg-yellow-500 text-white"
              disabled={!selectedMarmitaId}
              onClick={handleEditMarmita}
            >
              Editar Marmita
            </Button01>

            <Button01
              classes="bg-red-600 text-white"
              disabled={!selectedMarmitaId}
            >
              Apagar Marmita
            </Button01>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminPanelPage;
