import React from 'react';
import { createContext } from 'react';

type CartContextType = {
    id: number;
    userId: number;
    isCheckedOut: boolean;
}