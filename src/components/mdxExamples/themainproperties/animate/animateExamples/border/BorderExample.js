'use client'
import { motion } from 'framer-motion'
import ExampleWrapper from '../exampleWrapper/ExampleWrapper'
import styles from './BorderExample.module.scss'

import React from 'react'

export default function BorderExample() {
    const [isHover, setIsHover] = React.useState(false)

    return (
        <ExampleWrapper caption='border & drop-shadow'>
            <div className={styles.wrapper} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                <motion.div className={styles.ring}
                    animate={{
                        borderWidth: isHover ? '10px' : '1px',
                        filter: isHover ? 'drop-shadow(0px 0px 3.6px #fff) drop-shadow(0px 0px 7.2px #fff) drop-shadow(0px 0px 25.2px #fff) drop-shadow(0px 0px 50.4px #fff) drop-shadow(0px 0px 86.4px #fff) drop-shadow(0px 0px 151.2px #fff)' : 'drop-shadow(0px 0px 0px transparent)'
                    }}></motion.div>
            </div>
        </ExampleWrapper>
    )
}
