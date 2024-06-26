import React from 'react'
import styles from './ExampleWrapper.module.scss'

export default function ExampleWrapper({ children, caption }) {
    return (
        <div className={styles.container}>
            {children}
            <p className={styles.sub}>{caption}</p>
        </div>
    )
}
