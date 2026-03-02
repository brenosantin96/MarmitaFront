// src/context/UserContext.tsx
"use client"

import React, { createContext, useContext, useEffect, useState } from "react";
import type { User } from "../types/User";
import axios from "axios";

// Tipo do contexto
type ContextUser = {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoadingUser: boolean;
};

type ContextProviderUser = {
  children: React.ReactNode;
};

export const UserContext = createContext<ContextUser>({
  user: null,
  setUser: () => {},
  isLoadingUser: true,
});

export const UserProvider = ({ children }: ContextProviderUser) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  // Verifica sessão chamando /api/me e, se 401, força logout + redirecionamento
  const verifySession = async () => {
    try {
      const res = await axios.get("/api/me", { withCredentials: true });

      if (!res.data?.user) {
        throw new Error("Sessão inválida");
      }
    } catch {
      // sessão expirada ou token inválido
      setUser(null);
      if (typeof window !== "undefined") {
        alert("Sessão expirada, favor entre novamente.");
        window.location.href = "/login";
      }
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/me", { withCredentials: true });

        if (res.data?.user) {
          setUser(res.data.user.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setIsLoadingUser(false);
      }
    };

    fetchUser();
  }, []);

  // Após estar logado, agenda uma checagem de sessão em 30 minutos
  useEffect(() => {
    if (!user) return;

    const timeoutId = setTimeout(() => {
      verifySession();
    }, 30 * 60 * 1000); // 30 minutos para ser 1 min é 1 * 60 * 1000 jwt revalidation

    return () => {
      clearTimeout(timeoutId);
    };
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, isLoadingUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
