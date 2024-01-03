'use client'
import React from 'react'
import styles from './YExample.module.scss'
import { motion } from 'framer-motion'
import ExampleWrapper from '../exampleWrapper/ExampleWrapper'

export default function YExample() {

    const range = [1, -1, 1, -1]

    const [isHover, setIsHover] = React.useState(false)

    return (
        <ExampleWrapper caption='y'>
            <div className={styles.wrapper} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                <div className={styles.innerWrap}>
                    {range.map((item, i) =>
                        <motion.div className={styles.ball} key={i} animate={{ y: isHover ? 20 * item : 0 }} />
                    )}
                </div>
            </div>
        </ExampleWrapper>
    )
}
