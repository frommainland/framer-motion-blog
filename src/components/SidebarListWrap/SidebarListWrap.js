'use client'

import React from 'react';
import { useGlobalContext } from '@/app/context/SidebarContext';
import { useSidebarMenuContext } from '../../app/context/sidebarMenuContext';
import styles from './SidebarListWrap.module.scss'
import { motion } from 'framer-motion';
// import { useMediaQuery } from "@uidotdev/usehooks";
import { useIsClient } from "@uidotdev/usehooks"
import { smooth } from '@/helper/easing';

import { useMediaQuery } from '@react-hookz/web';

function SidebarListWrap({ children }) {


    const { isActive, setIsActive } = useGlobalContext()
    const { isSidebarOpen, setIsSidebarOpen } = useSidebarMenuContext();
    const isSmallDevice = useMediaQuery("only screen and (max-width : 900px)");

    const isClient = useIsClient()

    if (isClient === false) {
        return null
    }

    return (
        <motion.div className={styles.sidebarWrap}
            animate={{ y: !isSmallDevice || isSidebarOpen ? '0%' : '-100%' }}
            transition={{ duration: isSmallDevice ? 0.5 : 0, ease: smooth }}
        >
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, { isActive: isActive, setIsActive: setIsActive, setIsSidebarOpen: setIsSidebarOpen })
            })}
        </motion.div>
    )
}

export default SidebarListWrap;
