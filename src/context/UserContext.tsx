//src\context\UserContext.tsx
"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from '../types/User';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// Tipo do contexto
type ContextUser = {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoadingUser: boolean;

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
  isLoadingUser: true,
});

// Provedor do contexto
export const UserProvider = ({ children }: ContextProviderUser) => {

  const [user, setUser] = useState<User | null>(initialUser);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const router = useRouter();

  //ao rodar o projeto vai executar isso uma
  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("fetching user...")
        const res = await axios.get("/api/me", { withCredentials: true });
        if (res.data.user) {
          setUser(res.data.user.user);
        } else {
          setUser(null);
          router.push("/login")
        }
      } catch {
        setUser(null);
        router.push("/login")
      } finally {
        setIsLoadingUser(false);
      }
    };

    fetchUser();
  }, []);



  return (
    <UserContext.Provider value={{ user, setUser, isLoadingUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook customizado para usar o contexto com segurança
export const useUserContext = () => {
  return useContext(UserContext);
};
