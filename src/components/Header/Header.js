import React from 'react';
import styles from './Header.module.scss'
import { Book } from 'react-feather';

function Header({ theme }) {
    return <div className={styles.header}>
        <div className={styles.logoWrap}>
            <Book size={32} className={styles.logo}/>
            Motion Book</div>
        <div className={styles.navLinkWrap}>
            <ul className={styles.navLink}>
                <li>Github</li>
                <li>ChangeLog</li>
                <li>About</li>
            </ul>
            <button>{theme}</button>
        </div>
    </div>;
}

export default Header;
