//src\app\test2\page.tsx
"use client"

import ModalTest from '@/components/ModalTest';
import React, { useState } from 'react'

const pageTest = () => {

  const [isModalOpened, setIsModalOpened] = useState(false);

  return (
    <>
      <ModalTest
      isOpen={isModalOpened}
      onClose={() => setIsModalOpened(false)}
      />
      <div className='mt-[55px] md:mt-[95px]'>

        <button onClick={() => setIsModalOpened(true)}
          className='p-3 rounded-2xl bg-blue-600 text-white font-semibold mt-3 ml-3 cursor-pointer'
        >Abrir modal</button>

      </div>
    </>
  );



}

export default pageTest