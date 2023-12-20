'use client'
import Link from "next/link";
import React from "react";
import styles from '../SidebarList/SidebarList.module.scss'


export function SidebarListOnlyTitle({ title, content, isActive, setIsActive }) {
    console.log(isActive)
    return (
        <div className={styles.sidebarCatergory}>
            <div className={styles.sidebarTitle}>
                <h3 style={{ color: isActive == null ? 'green' : 'white' }}>
                    <Link href='/' onClick={() => setIsActive(null)}>{title}</Link>
                </h3>
            </div>
        </div >
    );
}

export default SidebarListOnlyTitle;



