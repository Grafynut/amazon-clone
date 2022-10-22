import React, { createContext, useContext, useReducer } from "react";

// prepares the dataLayer
export const StateContext = createContext();

//Wrap our app and provide dataLayer
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
)

//pull information from data layer
export const useStateValue = () => useContext(StateContext);