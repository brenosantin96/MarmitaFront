"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useUserContext } from "@/context/UserContext";
import Button01 from "./Button01";
import { Icon } from "./svg/Icon";
import { AddressFormDto } from "@/types/AddressFormDTO";

type PropsModal01 = {
  isOpen: boolean;
  handleClose: () => void;
  modalTitle: string;
  onAddressSaved?: () => void;
};

const ModalAddress = ({ isOpen, handleClose, modalTitle, onAddressSaved }: PropsModal01) => {
  const { user } = useUserContext();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<AddressFormDto>({
    mode: "onChange",
    defaultValues: {
      zipCode: "",
      street: "",
      neighborhood: "",
      number: "",
      complement: "",
      city: "",
      state: "",
    },
  });

  const zipCode = watch("zipCode");

  useEffect(() => {
    if (zipCode.length === 8) {
      checkCEP();
    }
  }, [zipCode]);

  const checkCEP = async () => {
    try {
      const res = await axios.get(`https://viacep.com.br/ws/${zipCode}/json/`);
      if (res.status === 200 && !res.data.erro) {
        const data = res.data;
        setValue("city", data.localidade || "");
        setValue("state", data.uf || "");
        setValue("street", data.logradouro || "");
        setValue("neighborhood", data.bairro || "");
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    }
  };

  const saveAddress = async (formData: AddressFormDto) => {


    if (user) {
      const normalizedRequest = {
        userId: user.id,
        zipCode: formData.zipCode,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        neighborhood: formData.neighborhood,
        number: formData.number,
        complement: formData.complement || "",
      };

      const response = await axios.post("/api/address", normalizedRequest);
      console.log("Response saveAddress ModalAddress:", response);

      reset();
      if (onAddressSaved) onAddressSaved();
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Fundo escuro do modal */}
      <div
        className="fixed inset-0 bg-black opacity-50 z-40"
        onClick={handleClose}
      ></div>

      {/* Conteúdo do modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-lg shadow-lg z-50">
        <div className="flex border-b border-gray-300 p-4 justify-between items-center rounded-t-lg">
          <div className="text-base font-bold">{modalTitle}</div>
          <div className="cursor-pointer flex items-center" onClick={handleClose}>
            <div className="font-bold px-3 text-xs">FECHAR</div>
            <Icon svg="close2" height="20px" width="20px" />
          </div>
        </div>

        <div className="p-4 text-sm">
          <p className="mb-5">
            Conta pra gente, <strong>onde é aí mesmo?</strong>
          </p>

          <form onSubmit={handleSubmit(saveAddress)}>
            <div className="mb-3">
              <label htmlFor="zipCode" className="font-semibold text-gray-700">
                CEP de entrega
              </label>
              <input
                {...register("zipCode", {
                  required: "CEP é obrigatório",
                  minLength: { value: 8, message: "CEP deve ter 8 dígitos" },
                  maxLength: { value: 8, message: "CEP deve ter 8 dígitos" },
                  onChange: (e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  },
                })}
                type="text"
                placeholder="CEP (apenas números)"
                className="border-b py-3 px-2 w-full border-gray-200 focus:border-gray-800 outline-none"
              />
              <p className="text-xs text-red-500 mt-1">{errors.zipCode?.message}</p>
            </div>

            <div className="mb-3">
              <input
                {...register("street", { required: "Endereço é obrigatório" })}
                placeholder="Rua / Avenida / Praça"
                className="border-b py-3 px-2 w-full border-gray-200 focus:border-gray-800 outline-none"
              />
              <p className="text-xs text-red-500 mt-1">{errors.street?.message}</p>
            </div>

            <div className="flex gap-2 mb-3">
              <input
                {...register("city")}
                disabled
                placeholder="Cidade"
                className="border-b py-3 px-2 w-1/2 border-gray-200 bg-gray-100 cursor-not-allowed"
              />
              <input
                {...register("state")}
                disabled
                placeholder="Estado"
                className="border-b py-3 px-2 w-1/2 border-gray-200 bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div className="mb-3">
              <input
                {...register("neighborhood", { required: "Bairro é obrigatório" })}
                placeholder="Bairro"
                className="border-b py-3 px-2 w-full border-gray-200 focus:border-gray-800 outline-none"
              />
              <p className="text-xs text-red-500 mt-1">{errors.neighborhood?.message}</p>
            </div>

            <div className="flex gap-2 mb-3">
              <div className="w-1/2">
                <input
                  {...register("number", { required: "Número é obrigatório" })}
                  placeholder="Número"
                  className="border-b py-3 px-2 w-full border-gray-200 focus:border-gray-800 outline-none"
                />
                <p className="text-xs text-red-500 mt-1">{errors.number?.message}</p>
              </div>

              <div className="w-1/2">
                <input
                  {...register("complement")}
                  placeholder="Complemento (opcional)"
                  className="border-b py-3 px-2 w-full border-gray-200 focus:border-gray-800 outline-none"
                />
              </div>
            </div>

            <Button01
              backgroundColor="bg-green-800"
              textColor="text-white"
              width="w-full"
              classes="h-10"
              disabled={!isValid}
            >
              CONTINUAR
            </Button01>
          </form>
        </div>
      </div>
    </>
  );
};

export default ModalAddress;
