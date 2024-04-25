'use client'

import React from 'react';
import styles from './Header.module.scss'
import { Book } from 'react-feather';
import Link from 'next/link';
import { useGlobalContext } from '@/app/context/SidebarContext';
import { Menu } from 'react-feather';

import { useSidebarMenuContext } from '@/app/context/sidebarMenuContext';
import { motion } from 'framer-motion';


function Header({ theme }) {

    const { isActive, setIsActive } = useGlobalContext()

    const { isSidebarOpen, setIsSidebarOpen } = useSidebarMenuContext()

    React.useEffect(() => {
        document.body.style.overflow = isSidebarOpen ? 'hidden' : 'auto';
    }, [isSidebarOpen])


    return (
        <div className={styles.header}>
            {/* setIsAcvive(introduction) is the slug for introduction, so click on logo will make <li> in sidebar - introduction hilighted */}
            <Link href='/introduction?catergory=Introduction' className={styles.logoWrap} onClick={() => setIsActive('introduction')}>
                <Book size={32} className={styles.logo} />
                Motion Book</Link>

            {/* disabled for later revision */}
            {/* <div className={styles.navLinkWrap}>
                <ul className={styles.navLink}>
                    <li>Github</li>
                    <li>ChangeLog</li>
                    <li>About</li>
                </ul>
                <button>{theme}</button>
            </div> */}
            <p style={{ color: 'var(--color-text-300)' }}>work in progress</p>
            {/* <Link href='/about'>About</Link> */}
            <motion.button
                className={styles.sidebarMenu}
                // onClick={() => {
                //     const newIsSidebarOpen = !isSidebarOpen;
                //     setIsSidebarOpen(newIsSidebarOpen);
                //     document.body.style.overflow = newIsSidebarOpen ? 'hidden' : 'auto';
                // }}
                onClick={() => {
                    setIsSidebarOpen(!isSidebarOpen);
                }}
                whileHover={{ backgroundColor: 'var(--color-surface-300)' }}
            >
                <Menu color='var(--color-text-100)' />
            </motion.button>

        </div>
    )
}

export default Header;
