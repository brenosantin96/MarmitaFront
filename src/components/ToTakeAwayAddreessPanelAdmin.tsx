import React, { useEffect, useState } from 'react'
import CategorieModal from './CategorieModal'
import { useUserContext } from '@/context/UserContext';
import { useCategorieContext } from '@/context/CategoryContext';
import { CategoryCreateUpdateDto } from '@/types/CategoryCreateUpdateDto';
import axios from 'axios';
import AdminCategorieItemGrid from './AdminCategorieItemGrid';
import Button01 from './Button01';
import { Icon } from './svg/Icon';
import { Address } from '@/types/Address';
import Modal01 from './Modal01';
import { AddressFormDto } from '@/types/AddressFormDTO';
import ModalAddress from './ModalAddress';
import AddressCard from './AddressCard';

const ToTakeAwayAddreessPanelAdmin = () => {

    const [isAddressModalOpened, setIsAddressModalOpened] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const [AddressToBeEdited, setAddressToBeEdited] = useState<Address | null>(null);
    const [isOpenModalDeleteAddress, setIsOpenModalDeleteAddress] = useState(false);

    const [addresses, setAddresses] = useState<Address[]>([])
    const { user } = useUserContext();

    useEffect(() => {
        if (user && user.isAdmin) {
          //  fetchAddresses();
        }
    }, [addresses])

    const onSubmitAddresses = async (dto: CategoryCreateUpdateDto) => {
        try {
            const res = await axios.post("/api/address", dto);
            if (res.status == 200 || res.status == 201) {
                fetchAddresses();
            }
        } catch (err) {
            console.log("Algum erro ocorreu: ", err)
        }
    };

    const getAddressesUser = async () => {
    if (user) {

      //mudar essa chamada para pegar endereços de TODOS usuarios que possuem status como ADMIN
      //atualmetne pega apenas do usuario logado
      let response = await axios.get(`/api/address/${user.id}`);
      console.log("Endereços do usuario: ", response.data);

      setAddresses(response.data)

    }
  }

    const fetchAddresses = async () => {
        const res = await axios.get("/api/addresses");
       // setAddressToBeEdited(res.data);
    };

    const getSelectedItem = (id: number) => {
        setSelectedId(id);
    };

    // Abrir modal para criar
    const handleCreateAddress = () => {
        setAddressToBeEdited(null);
        setIsAddressModalOpened(true);
    };

    const handleEditAddress = (id: number) => {
        const address = addresses.find(c => c.id === id);
        if (address) {
            setAddressToBeEdited(address);
            setIsAddressModalOpened(true);
        }
    };

    // Editar cateogria
    const onEditAddress = async (id: number, dto: AddressFormDto) => {

        try {

            const res = await axios.put(`/api/addresses/${id}`, dto, {
                withCredentials: true,
            });

            console.log("Endereco editado:", res.data);

            fetchAddresses();

        } catch (err) {
            console.error("Erro ao editar categoria:", err);
        }
    };

    const openModalDeleteAddress = (id: number) => {
        setSelectedId(id);
        setIsOpenModalDeleteAddress(true);
    }

    const deleteAddress = async (id: number) => {

        if (!id) {
            console.warn("Nenhum endereço selecionado para deletar");
            return;
        }

        try {
            console.log("Endereço de RETIRADA para deletar:", id);
        } catch (err) {
            console.log("Algum erro aconteceu ao deletar: ", err);
        }
    };

    return (
        <>
            <ModalAddress
                handleClose={() => setIsAddressModalOpened(false)}
                isOpen={isAddressModalOpened}
                modalTitle='Endereço'
                onAddressSaved={getAddressesUser}
            />

            <div className="border rounded-2xl p-6 shadow-md">
                <h2 className="text-xl font-bold mb-4 text-green-700">Endereços de retirada</h2>

                {/* Listagem */}
                <div className="grid grid-cols-1 md:grid-cols-1 gap-2 max-w-4xl mx-auto w-full">
                    {addresses.length > 0 ? (
                        addresses.map((address) => (
                            <AddressCard
                                key={address.id}
                                address={address}
                                clickedTrashIcon={openModalDeleteAddress}
                                isSelected={selectedId ? true : false}
                                selectAddress={getSelectedItem}
                            />
                        ))
                    ) : (
                        <p className="text-gray-500 text-center py-6">
                            Nenhum endereço de retirada cadastrado.
                        </p>
                    )}
                </div>

                {/* Rodapé com botões */}
                <div className="flex gap-3 mt-6 justify-end">
                    <Button01
                        classes="bg-green-700 text-white"
                        onClick={handleCreateAddress}
                    >
                        Novo
                    </Button01>
                </div>

            </div>



        </>
    )
}

export default ToTakeAwayAddreessPanelAdmin