'use client'
import Link from "next/link";
import React from "react";
import { ChevronDown } from "react-feather";
import styles from "./SidebarList.module.scss";
import { motion } from 'framer-motion'

// turn mdx file 'title: an-example-here' to 'An Example Here'
// deprecated, like 'title: useTransform hook' isnt suitable for this func. 
function titleCase(str) {
    const words = str.split(/[-_]/);
    const titleCasedWords = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    return titleCasedWords.join(' ');
}


export function SidebarList({ title, content, isActive, setIsActive, setIsSidebarOpen }) {
    return (
        <div className={styles.sidebarCatergory}>
            <div className={styles.sidebarTitle}>
                <h3>{title}</h3>
                {/* <ChevronDown size={24} /> */}
            </div>

            <ul>
                {content?.map((item) => {
                    const href = `/${item.slug}`;
                    {/* const titledCase = titleCase(item.title) */ }
                    const titledCase = item.title
                    return (
                        <motion.li
                            key={item.slug}
                            onClick={() => {
                                setIsActive(item.slug)
                                setIsSidebarOpen(false)
                            }}
                            className={isActive === item.slug ? styles.isActive : undefined}>
                            <Link
                                href={{
                                    pathname: href,
                                    query: { catergory: title }
                                }}
                                prefetch={true}
                            >{titledCase}
                            </Link>
                        </motion.li>
                    );
                }
                )}
            </ul>
        </div>
    );
}

export default SidebarList;