"use client";
import React from 'react';
import { useUserContext } from '@/context/UserContext';

const AdminButton = () => {
  const { user } = useUserContext();

  if (!user.isAdmin) return null;

  return (
    <button className="bg-red-500 text-white px-4 py-2 rounded">
      Painel do Admin
    </button>
  );
};

export default AdminButton;