'use client'
import React from 'react';

function SidebarListWrap({ children }) {
    const [isActive, setIsActive] = React.useState(null)
    return <>
        {React.Children.map(children, (child) => {
            return React.cloneElement(child, { isActive: isActive, setIsActive: setIsActive })
        })}
    </>;
}

export default SidebarListWrap;
