'use client'
import React from 'react';
import { useGlobalContext } from '@/app/context/SidebarContext';

function SidebarListWrap({ children }) {
    // const [isActive, setIsActive] = React.useState(null)
    const {isActive, setIsActive} = useGlobalContext()
    return <>
        {React.Children.map(children, (child) => {
            return React.cloneElement(child, { isActive: isActive, setIsActive: setIsActive })
        })}
    </>;
}

export default SidebarListWrap;
