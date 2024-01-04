'use client'
import React from 'react'
import { motion } from 'framer-motion'
import ExampleWrapper from '../exampleWrapper/ExampleWrapper'
import styles from './BoxShadow.module.scss'

export default function BoxShadow() {
    const [isHover, setIsHover] = React.useState(false)
    return (
        <ExampleWrapper caption='box-shadow'>
            <div className={styles.wrapper} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                <motion.div className={styles.circle}
                    animate={{
                        boxShadow: isHover ? '0px 1px 3px 0px hsla(75, 4%, 18%, 0.2), 0px 6px 6px 0px hsla(75, 4%, 18%, 0.17), 0px 13px 8px 0px hsla(75, 4%, 18%, 0.1), 0px 24px 10px 0px hsla(75, 4%, 18%, 0.03), 0px 37px 10px 0px hsla(75, 4%, 18%, 0)' : '0px 1px 3px 0px hsla(75, 4%, 18%, 0.2)',
                        scale: isHover ? 1.35 : 1,
                    }} />
            </div>
        </ExampleWrapper>
    )
}
