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

  return (
    <UserContext.Provider value={{ user, setUser, isLoadingUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
