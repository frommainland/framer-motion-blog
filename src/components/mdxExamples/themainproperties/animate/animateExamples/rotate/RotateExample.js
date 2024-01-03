'use client'
import React from 'react'
import styles from './RotateExample.module.scss'
import ExampleWrapper from '../exampleWrapper/ExampleWrapper'
import { motion } from 'framer-motion'

export default function RotateExample() {
    const [isHover, setIsHover] = React.useState(false)
    const range = [0, 45, 90, 135]

    return (
        <ExampleWrapper caption='rotate'>
            <div className={styles.wrapper} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                {range.map((item, i) =>
                    <motion.div
                        className={styles.bar}
                        animate={{ rotate: isHover ? 45 + item : 0 }}
                        key={i} />
                )}
            </div>
        </ExampleWrapper>
    )
}

