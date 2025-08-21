"use client"
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "./svg/Icon";
import Button01 from "./Button01";
import { MarmitaType } from "@/types/MarmitaType";

type PropsMarmitaModal = {
  isOpen: boolean;
  handleClose: () => void;
  modalTitle: string;
  onSubmitMarmita?: (data: MarmitaType) => void;
};

// Schema de validação com Zod
const schema = z.object({
  title: z.string().min(3, "Título é obrigatório"),
  urlImage: z.string().url("Deve ser uma URL válida"),
  price: z.number().positive("Preço deve ser maior que zero"),
  portion: z.number().positive("Porção deve ser maior que zero"),
  oldPrice: z.number().positive("Preço antigo deve ser positivo").optional(),
});

// Inferindo a tipagem do schema
type FormData = z.infer<typeof schema>;

const MarmitaModal = ({ handleClose, isOpen, modalTitle, onSubmitMarmita }: PropsMarmitaModal) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      urlImage: "",
      price: undefined,
      portion: undefined,
      oldPrice: undefined,
    },
  });

  if (!isOpen) return null;

  const onSubmit = (data: FormData) => {
    const newMarmita: MarmitaType = {
      id: Date.now(), // apenas mock, no real seria gerado pelo backend
      ...data,
    };

    console.log("Marmita criada:", newMarmita);
    if (onSubmitMarmita) onSubmitMarmita(newMarmita);
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
              <label htmlFor="title">Título da Marmita</label>
              <input
                id="title"
                {...register("title")}
                className="border-b py-3 px-2 block w-full border-gray-200"
                placeholder="Ex: Frango grelhado com legumes"
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* URL da Imagem */}
            <div className="mb-4">
              <label htmlFor="urlImage">URL da Imagem</label>
              <input
                id="urlImage"
                {...register("urlImage")}
                className="border-b py-3 px-2 block w-full border-gray-200"
                placeholder="https://meusite.com/imagem.png"
              />
              {errors.urlImage && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.urlImage.message}
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
                  id="portion"
                  type="number"
                  {...register("portion", { valueAsNumber: true })}
                  className="border-b py-3 px-2 block w-full border-gray-200"
                  placeholder="Porção (g)"
                />
                {errors.portion && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.portion.message}
                  </p>
                )}
              </div>
            </div>

            {/* Preço antigo */}
            <div className="mb-4">
              <label htmlFor="oldPrice">Preço antigo (opcional)</label>
              <input
                id="oldPrice"
                type="number"
                step="0.01"
                {...register("oldPrice", { valueAsNumber: true })}
                className="border-b py-3 px-2 block w-full border-gray-200"
                placeholder="Ex: 21.50"
              />
              {errors.oldPrice && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.oldPrice.message}
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

export default MarmitaModal;
