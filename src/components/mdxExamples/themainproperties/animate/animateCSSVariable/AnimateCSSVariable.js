'use client'
import React from 'react'
import styles from './AnimateCSSVariable.module.scss'
import { motion } from 'framer-motion'
import { range } from '@/utils'



// calc(var(--base-hue) + ${diagonalIndex})

function Box({ row, column }) {
    const diagnalDirection = (row + column) * 6
    return (
        <div className={styles.box} key={column}
            // style={{ backgroundColor: `hsl(70, 5%, var(--rotate)` }}
            style={{ backgroundColor: `hsl(70, 5%, calc(var(--rotate) + ${diagnalDirection}%))` }}
        >{row}{column}</div>
    )
}

export default function AnimateCSSVariable() {
    return (
        <div className={styles.wrap}>
            <motion.div
                className={styles.boxesWrap}
                initial={{ '--rotate': '25%' }}
                animate={{ '--rotate': ['25%', '-54%', '25%'] }}
                transition={{ duration: 6, repeat: 'Infinity', repeatDelay: 1 }}>
                {range(4).map((row) => {
                    return (
                        range(4).map((column) =>
                            <Box row={row} column={column} key={column} />
                        ))
                })}
            </motion.div>

        </div>

    )
}
