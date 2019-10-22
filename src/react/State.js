import React, { createContext, useContext, useReducer } from 'react';

export const StateContext = createContext()

export const StateProvider = ({reducer, state, children}) => (
    <StateContext.Provider value={{
        reducer,
        state
    }}>
        {children}
    </StateContext.Provider>
)

export const useGlobalState = () => useContext(StateContext)