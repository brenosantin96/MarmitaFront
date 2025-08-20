//src\context\UserContext.tsx
"use client"

import React, { createContext, useContext, useState } from 'react';
import type { User } from '../types/User';

// Tipo do contexto
type ContextUser = {
  user: User;
  setUser: (user: User) => void;
};

// Tipo do provedor
type ContextProviderUser = {
  children: React.ReactNode;
};

// Estado inicial do usuário
const initialUser: User = {
  id: 0,
  name: '',
  email: '',
  isAdmin: false,
};

// Criação do contexto com valor inicial **parcial**
export const UserContext = createContext<ContextUser>({
  user: initialUser,
  setUser: () => {}, // placeholder para função
});

// Provedor do contexto
export const UserProvider = ({ children }: ContextProviderUser) => {
    
  const [user, setUser] = useState<User>(initialUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook customizado para usar o contexto com segurança
export const useUserContext = () => {
  return useContext(UserContext);
};
