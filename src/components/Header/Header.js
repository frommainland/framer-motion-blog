'use client'

import React from 'react';
import styles from './Header.module.scss'
import { Book } from 'react-feather';
import Link from 'next/link';
import { useGlobalContext } from '@/app/context/SidebarContext';

function Header({ theme }) {

    const { isActive, setIsActive } = useGlobalContext()

    return (
        <div className={styles.header}>
            {/* setIsAcvive(introduction) is the slug for introduction, so click on logo will make <li> in sidebar - introduction hilighted */}
            <Link href='/' className={styles.logoWrap} onClick={() => setIsActive('introduction')}>

                <Book size={32} className={styles.logo} />
                Motion Book</Link>
            <div className={styles.navLinkWrap}>
                <ul className={styles.navLink}>
                    <li>Github</li>
                    <li>ChangeLog</li>
                    <li>About</li>
                </ul>
                <button>{theme}</button>
            </div>
        </div>
    );
}

export default Header;
