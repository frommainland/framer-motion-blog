'use client'
import Link from "next/link";
import React from "react";
import styles from './SidebarListOnlyTitle.module.scss'

export function SidebarListOnlyTitle({ title, slug, isActive, setIsActive, setIsSidebarOpen }) {


    return (
        <div className={styles.sidebarCatergory}>
            <div className={styles.sidebarTitle}>
                <h3 className={isActive === slug ? styles.isActive : undefined}>
                    <Link href={`/${slug}`} onClick={() => {
                        setIsActive(slug)
                        setIsSidebarOpen(false)
                    }

                    }>{title}</Link>
                </h3>
            </div>
        </div >
    );
}

export default SidebarListOnlyTitle;



