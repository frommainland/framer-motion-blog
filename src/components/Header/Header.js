'use client'

import React from 'react';
import styles from './Header.module.scss'
import { Book } from 'react-feather';
import Link from 'next/link';
import { useGlobalContext } from '@/app/context/SidebarContext';

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
            <Link
                href='/introduction?catergory=Introduction' className={styles.logoWrap}
                onClick={() => setIsActive('introduction')}
            >
                <Book size={32} className={styles.logo} />
                Motion Book
            </Link>

            <div className={styles.navLinkWrap}>
                <ul className={styles.navLink}>
                    <Link
                        href='/changelog'
                        onClick={() => {
                            setIsActive('changelog')
                            setIsSidebarOpen(false)
                        }}
                        className={isActive === 'changelog' ? styles.isActive : undefined}
                    >
                        Changelog
                    </Link>
                    <Link
                        href='/advanced-examples'
                        onClick={() => {
                            setIsActive('advanced-examples')
                            setIsSidebarOpen(false)
                        }}
                        className={isActive === 'advanced-examples' ? styles.isActive : undefined}
                    >
                        Advanced Examples
                    </Link>
                </ul>
                {/* theme button */}
                {/* <button>{theme}</button> */}
            </div>

            <motion.button
                className={styles.sidebarMenu}
                onClick={() => {
                    setIsSidebarOpen(!isSidebarOpen)
                    console.log('menu clicked')
                }}
                whileHover={{ backgroundColor: 'var(--color-surface-300)' }}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path
                        stroke="var(--color-text-100)"
                        animate={{
                            d: isSidebarOpen ? 'M 6 6 L 18 18' : 'M 3 12 H21 12',
                        }}
                        strokeWidth={2}
                        strokeLinecap="round"
                        fill="transparent"
                    />
                    <motion.path
                        d="M 3 6 H 21 6"
                        stroke="var(--color-text-100)"
                        animate={{ opacity: isSidebarOpen ? 0 : 1 }}
                        transition={{ duration: 0.1 }}
                        strokeWidth={2}
                        strokeLinecap="round"
                        fill="transparent"
                    />
                    <motion.path
                        animate={{
                            d: isSidebarOpen ? 'M 6 18 L 18 6' : 'M 3 18 H 21 18',
                        }}
                        stroke="var(--color-text-100)"
                        strokeWidth={2}
                        strokeLinecap="round"
                        fill="transparent"
                    />
                </svg>
            </motion.button>

        </div>
    )
}

export default Header;
