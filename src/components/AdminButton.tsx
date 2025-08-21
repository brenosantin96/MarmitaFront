"use client";
import React from 'react';
import { useUserContext } from '@/context/UserContext';
import { useRouter } from 'next/navigation';

const AdminButton = () => {
  const { user } = useUserContext();

  const router = useRouter();
  if (!user.isAdmin) return null;

  return (
    <button className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer mb-2" onClick={()=> router.push("/admin/panel")}>
      Painel do Admin
    </button>
  );
};

export default AdminButton;