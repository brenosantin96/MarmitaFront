"use client"
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "./svg/Icon";
import Button01 from "./Button01";
import { CategoryCreateUpdateDto } from "@/types/CategoryCreateUpdateDto";
import { Category } from "@/types/Category";

type PropsCategorieModal = {
  isOpen: boolean;
  handleClose: () => void;
  modalTitle: string;
  onSubmitCategorie: (data: CategoryCreateUpdateDto) => void;
  onEditCategorie?: (id: number, data: CategoryCreateUpdateDto) => void; // opcional
  category?: Category; // usado em EDICAO para quando for aberto o MODAL trazer os dados da CATEGORY selecionada.

};

// Schema de validação com Zod
const schema = z.object({
  name: z.string().min(3, "Nome da categoria é obrigatório"),
});

// Inferindo a tipagem do schema
type FormData = z.infer<typeof schema>;

const CategorieModal = ({ handleClose, isOpen, modalTitle, onSubmitCategorie, onEditCategorie, category }: PropsCategorieModal) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      name: ""
    },
  });

  if (!isOpen) return null;



  const onSubmit = (data: FormData) => {

    // Exemplo de como salvar no estado: no real você faria upload para o backend
    const newCategory: CategoryCreateUpdateDto = {
      name: data.name,
    };

    console.log("Category criada:", newCategory);

    if (onSubmitCategorie) {
      onSubmitCategorie(newCategory);
    }

    handleClose();
  };


  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50 z-40"
        onClick={handleClose}
      ></div>

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-lg shadow-lg z-50">
        {/* Header */}
        <div className="flex border-b border-gray-300 p-4 justify-between items-center rounded-t-lg">
          <div className="text-base font-bold">{modalTitle}</div>
          <div
            className="cursor-pointer flex items-center"
            onClick={handleClose}
          >
            <div className="font-bold px-3" style={{ fontSize: 10 }}>
              FECHAR
            </div>
            <Icon svg="close2" height="20px" width="20px" />
          </div>
        </div>

        {/* Body */}
        <div className="p-4 text-sm">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Title */}
            <div className="mb-4">
              <label htmlFor="name">Nome da categoria</label>
              <input
                id="name"
                {...register("name")}
                className="border-b py-3 px-2 block w-full border-gray-200"
                placeholder="Ex: Dia a dia"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>


            {/* Botão */}
            <Button01
              backgroundColor="bg-green-700"
              textColor="text-white"
              disabled={!isValid}>SALVAR</Button01>
          </form>
        </div>
      </div>
    </>
  );
};

export default CategorieModal;
