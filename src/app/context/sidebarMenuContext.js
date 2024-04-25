'use client'
import React from 'react';

const SidebarMenuContext = React.createContext();


export function SidebarMenuProvider({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    return (
        <SidebarMenuContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
            {children}
        </SidebarMenuContext.Provider>
    );
}


export const useSidebarMenuContext = () => React.useContext(SidebarMenuContext);