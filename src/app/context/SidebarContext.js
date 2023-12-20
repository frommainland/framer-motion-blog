'use client'
import React from "react"

const GlobalContext = React.createContext()

export const GlobalContextProvider = ({ children }) => {
    // for tracking on sidebar and logo clicks, so it memorizes which <li> click states.
    const [isActive, setIsActive] = React.useState('introduction')

    return (
        <GlobalContext.Provider value={{ isActive, setIsActive }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => React.useContext(GlobalContext);