'use client'
import React from 'react'
import styles from './WidthExample.module.scss'
import { motion } from 'framer-motion'

export default function WidthExample() {
    const [isHover, setIsHover] = React.useState(false)
    return (
        <div className={styles.container}>
            <div className={styles.wrapper} >
                <motion.div className={styles.innerWrap} onHoverStart={() => setIsHover(true)} onHoverEnd={() => setIsHover(false)} whileHover={{ backgroundColor: 'var(--color-accent-green)' }}>
                    <motion.div className={styles.ring}
                        animate={{ width: isHover ? '3vw' : '1vw', height: isHover ? '4vw' : '1vw' }}></motion.div>
                </motion.div>
            </div>
            <p>height & width</p>
        </div>

    )
}


