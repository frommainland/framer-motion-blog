'use client'
import React from 'react'
import styles from './ComplexProps.module.scss'
import { motion } from 'framer-motion'
import { flow } from '@/helper/easing'

export default function ComplexProps() {
    return (
        <div className={styles.outerFlex}>
            <motion.div
                className={styles.wrap}
                whileHover={{
                    maskPosition: '0% 0%',
                    transform: 'translate3d(0px, 0px, -250px)',
                    borderColor: 'var(--color-text-300)'
                }}
                transition={{
                    duration: 0.35,
                    ease: flow
                }}
            ></motion.div>
        </div>

    )
}

