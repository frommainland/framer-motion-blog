'use client'
import React from 'react'
import { motion } from 'framer-motion'
import ExampleWrapper from '../exampleWrapper/ExampleWrapper'
import styles from './FontVariation.module.scss'

export default function FontVariation() {
    const [isHover, setIsHover] = React.useState(false)
    const letter = ['H', 'e', 'l', 'l', 'o']
    return (
        <ExampleWrapper caption='font-variation'>
            <div className={styles.wrapper} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                <div>
                    {letter.map((item, index) =>
                        <motion.span
                            key={index}
                            animate={{ fontVariationSettings: isHover ? `"wght" 900` : `"wght" 100` }}
                            transition={{
                                delay: 0.05 * index
                            }}
                        >{item}</motion.span>
                    )}
                </div>
            </div>
        </ExampleWrapper>
    )
}

