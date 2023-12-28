'use client'
import React from 'react'
import styles from './Basic.module.scss'
import { motion } from 'framer-motion'
import RestartDemoWrap from '@/components/RestartDemoWrap'
import { smooth, flow } from '@/helper/easing'

export default function BasicAnimation() {
    return (
        <RestartDemoWrap>
            <div className={styles.wrap}>
                <motion.div
                    animate={{
                        backgroundColor: `var(--color-accent-yellow)`,
                        left: 'calc(90% - 15%)',
                        borderRadius: '100%',
                    }}
                    transition={{ duration: .8, delay: 0.5, ease: smooth }}
                ></motion.div>
            </div>
        </RestartDemoWrap>
    )
}
