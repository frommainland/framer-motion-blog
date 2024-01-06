'use client'
import React from 'react'
import { motion } from 'framer-motion'
import ExampleWrapper from '../exampleWrapper/ExampleWrapper'
import styles from './Filter.module.scss'

export default function Filter() {
    const [isHover, setIsHover] = React.useState(false)
    return (
        <ExampleWrapper caption='filter: drop-shadow'>
            <div className={styles.wrapper} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                <motion.div
                    className={styles.circle}
                    animate={{
                        filter: isHover ? `drop-shadow(15px 15px 0 var(--color-accent-red)) drop-shadow(-15px -15px 0 var(--color-accent-green))` : 'drop-shadow(0 0 0 var(--color-surface-200))',
                        backgroundColor: isHover ? 'var(--color-surface-200)' : 'var(--color-surface-300)'
                    }}
                ></motion.div>
            </div>
        </ExampleWrapper>
    )
}
