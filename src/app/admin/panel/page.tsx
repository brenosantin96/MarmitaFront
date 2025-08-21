"use client"
import Button01 from '@/components/Button01'
import MarmitaModal from '@/components/MarmitaModal';
import React, { useState } from 'react'

const AdminPanelPage = () => {

  const [isMarmitaModalOpened, setIsMarmitaModalOpened] = useState(false);

  const handleCloseMarmitaModal = () => {
    setIsMarmitaModalOpened(false);
  }

  const onSubmitMarmita = () => {
    console.log("Teste onSubmitMarmita")
  }

  return (
    <>
      <MarmitaModal handleClose={handleCloseMarmitaModal} isOpen={isMarmitaModalOpened} modalTitle='Marmita' onSubmitMarmita={onSubmitMarmita} />
     

        <div className="flex justify-center items-center pt-28 px-4 ">
          <Button01
          width='w-1/2'
          classes="bg-green-700 text-white"
          onClick={() => setIsMarmitaModalOpened(true)}>Criar Marmita</Button01>
        </div>
     
    </>
  )
}

export default AdminPanelPage