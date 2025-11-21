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
            fetchAddresses();
        }
    }, [user]);

    const getAddressesUser = async () => {
        if (user) {
            fetchAddresses();
        }
    }

    const fetchAddresses = async () => {

        const res = await axios.get<Address[]>("/api/address/pickupAddress");

        console.log("PICKUP ENDEREÇOS: ", res.data)

        if(res.data && res.data.length > 0){
            setAddresses(res.data);    
        } else {
            setAddresses([]);
        }
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

    const confirmDeleteSelectedAddress = async (id: number) => {

        try {
            let response = await axios.delete(`/api/address/${id}`)
            console.log("RESPONSE: ", response);

            setAddresses((prevAddresses) =>
                prevAddresses.filter((item) => item.id !== id)
            );

            setSelectedId(null);

            fetchAddresses();

        } catch (error) {
            console.error("Erro ao deletar endereço: ", error)
        }


    }

    return (
        <>
            <ModalAddress
                handleClose={() => setIsAddressModalOpened(false)}
                isOpen={isAddressModalOpened}
                modalTitle='Endereço'
                onAddressSaved={getAddressesUser}
            />

            <Modal01
                handleClose={() => setIsOpenModalDeleteAddress(false)}
                isOpen={isOpenModalDeleteAddress}
                modalTitle="Confirma deletar endereço?"
                modalText="Tem certeza que deseja eliminar o endereço selecionado?"
                isModalForDelete={true}
                idToDelete={selectedId as number}
                handleConfirmDelete={confirmDeleteSelectedAddress}
            />

            <div className="border rounded-2xl p-6 shadow-md">
                <h2 className="text-xl font-bold mb-4 text-green-700">Endereços de retirada</h2>

                {/* Listagem */}
                <ul className=" grid grid-cols-1 md:grid-cols-2 gap-2 max-w-4xl mx-auto w-full">
                    {addresses.length > 0 ? (
                        addresses.map((address) => (
                            <AddressCard
                                key={address.id}
                                address={address}
                                clickedTrashIcon={openModalDeleteAddress}
                                isSelected={selectedId === address.id}
                                selectAddress={getSelectedItem}
                            />
                        ))
                    ) : (
                        <p className="text-gray-500 text-center py-6">
                            Nenhum endereço de retirada cadastrado.
                        </p>
                    )}
                </ul>

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