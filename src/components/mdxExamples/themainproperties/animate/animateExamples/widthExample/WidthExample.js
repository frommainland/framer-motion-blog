'use client'
import React from 'react'
import styles from './WidthExample.module.scss'
import { motion } from 'framer-motion'
import ExampleWrapper from '../exampleWrapper/ExampleWrapper'

export default function WidthExample() {
    const [isHover, setIsHover] = React.useState(false)
    return (
        <ExampleWrapper caption='height & width'>
            <div className={styles.wrapper} >
                <motion.div className={styles.innerWrap} onHoverStart={() => setIsHover(true)} onHoverEnd={() => setIsHover(false)} whileHover={{ backgroundColor: 'var(--color-accent-green)' }}>
                    <motion.div className={styles.ring}
                        animate={{ width: isHover ? '40%' : '10%', height: isHover ? '50%' : '10%' }}
                    ></motion.div>
                </motion.div>
            </div>
        </ExampleWrapper>
    )
}


