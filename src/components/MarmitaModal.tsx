"use client"
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "./svg/Icon";
import Button01 from "./Button01";
import { MarmitaType } from "@/types/MarmitaType";
import { MarmitaCreateDto } from "@/types/MarmitaCreateDto";
import { Category } from "@/types/Category";

type PropsMarmitaModal = {
  isOpen: boolean;
  handleClose: () => void;
  modalTitle: string;
  categories: Category[];
  onSubmitMarmita: (data: MarmitaCreateDto) => void;

};

//CORRIGIR ESSA PAGE

// Schema de validação com Zod
const schema = z.object({
  name: z.string().min(3, "Título é obrigatório"),
  description: z.string().min(3, "Descrição é obrigatório"),
  price: z.number().positive("Preço deve ser maior que zero"),
  portionGram: z.number().positive("Porção deve ser maior que zero"),
  oldPrice: z.number().positive("Preço antigo deve ser positivo").optional(),
  categoryId: z.number().int().positive(),
  image: z.any()
    .refine((files) => files?.length === 1, "Imagem é obrigatória")
    .refine((files) => ["image/jpeg", "image/jpg", "image/png"].includes(files?.[0]?.type),
      "A imagem deve ser JPG, JPEG ou PNG"),

});

// Inferindo a tipagem do schema
type FormData = z.infer<typeof schema>;

const MarmitaModal = ({ handleClose, isOpen, modalTitle, onSubmitMarmita, categories }: PropsMarmitaModal) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      image: "",
      price: undefined,
      portionGram: undefined,
      oldPrice: undefined,
    },
  });

  if (!isOpen) return null;

  const onSubmit2 = (data: FormData) => {

    // Pegando o arquivo
    const file = data.image[0];

    // Exemplo de como salvar no estado: no real você faria upload para o backend
    const newMarmita: MarmitaCreateDto = {

      name: data.name,
      image: file,
      price: data.price,
      portionGram: data.portionGram,
      description: data.description,
      categoryId: data.categoryId

    };

    console.log("Marmita criada:", newMarmita);

    if (onSubmitMarmita) {
      onSubmitMarmita(newMarmita);
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
          <form onSubmit={handleSubmit(onSubmit2)}>
            {/* Title */}
            <div className="mb-4">
              <label htmlFor="name">Título da Marmita</label>
              <input
                id="name"
                {...register("name")}
                className="border-b py-3 px-2 block w-full border-gray-200"
                placeholder="Ex: Frango grelhado com legumes"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="mb-4">
              <label htmlFor="description">Descrição da Marmita</label>
              <input
                id="description"
                {...register("description")}
                className="border-b py-3 px-2 block w-full border-gray-200"
                placeholder="Ex: A mais pedida da região"
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Category */}
            <div className="mb-3">
              <label htmlFor="categoryId">Categorias</label>
              <select
                id="categoryId"
                {...register("categoryId", { valueAsNumber: true })}
                className="border-b py-3 px-2 block w-full border-gray-200"
                defaultValue={""}
              >

                <option value="">Selecione...</option>
                {categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
              </select>
              {errors.categoryId && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.categoryId.message}
                </p>
              )}
            </div>

            {/* Upload de Imagem */}
            <div className="mb-4">
              <label htmlFor="image">Imagem da Marmita</label>
              <input
                id="image"
                type="file"
                accept=".jpg,.jpeg,.png"
                {...register("image")}
                className="block w-full text-sm mt-2 text-gray-600
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-green-700 file:text-white
                  hover:file:bg-green-800"
              />
              {errors.image && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.image.message as string}
                </p>
              )}
            </div>

            {/* Preço e Porção */}
            <div className="flex mb-4">
              <div className="w-1/2 mx-1">
                <input
                  id="price"
                  type="number"
                  step="0.01"
                  {...register("price", { valueAsNumber: true })}
                  className="border-b py-3 px-2 block w-full border-gray-200"
                  placeholder="Preço (R$)"
                />
                {errors.price && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>

              <div className="w-1/2 mx-1">
                <input
                  id="portionGram"
                  type="number"
                  {...register("portionGram", { valueAsNumber: true })}
                  className="border-b py-3 px-2 block w-full border-gray-200"
                  placeholder="Porção (g)"
                />
                {errors.portionGram && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.portionGram.message}
                  </p>
                )}
              </div>
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

export default MarmitaModal;
