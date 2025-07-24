import React, { Children, ReactNode } from 'react'
import { createContext } from 'react'

type ContextUser = {
    name: string,
    age: number
}

type ContextProviderUser = {
    children: React.ReactNode
}

const initialState = {
    name: 'Breno',
    age: 90
}


export const Context = createContext<ContextUser>(initialState);

export const ContextoExample = ({children}: ContextProviderUser) => {
    return(
        <Context.Provider value={initialState}>
            {children}
        </Context.Provider>
    )
}