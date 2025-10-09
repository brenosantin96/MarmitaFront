//src\context\UserContext.tsx
"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from '../types/User';
import axios from 'axios';

// Tipo do contexto
type ContextUser = {
  user: User | null;
  setUser: (user: User | null) => void;
};

// Tipo do provedor
type ContextProviderUser = {
  children: React.ReactNode;
};

// Estado inicial do usuário
const initialUser: User | null = null;

// Criação do contexto com valor inicial **parcial**
export const UserContext = createContext<ContextUser>({
  user: initialUser,
  setUser: () => { }, // placeholder para função
});

// Provedor do contexto
export const UserProvider = ({ children }: ContextProviderUser) => {

  const [user, setUser] = useState<User | null>(initialUser);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/me", { withCredentials: true });
        //console.log("RES.DATA.USER.USER: ", res.data.user.user);
        if (res.data.user) {
          setUser(res.data.user.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    };

    fetchUser();
  }, []);



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
