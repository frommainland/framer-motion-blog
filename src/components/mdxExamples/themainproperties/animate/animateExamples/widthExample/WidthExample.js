'use client'
import React from 'react'
import styles from './WidthExample.module.scss'
import { motion } from 'framer-motion'

export default function WidthExample() {
    return (
        <motion.div className={styles.wrapper} >
            <motion.div className={styles.innerWrap} >
                <motion.div className={styles.ring} whileTap={{ width: 64, height: 128 }}></motion.div>
            </motion.div>
        </motion.div>
    )
}


