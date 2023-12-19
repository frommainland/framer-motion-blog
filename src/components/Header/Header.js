import React from 'react';
import styles from './Header.module.scss'
import { Book } from 'react-feather';
import Link from 'next/link';

function Header({ theme }) {
    return (
        <div className={styles.header}>
            <Link href='/' className={styles.logoWrap}>
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
