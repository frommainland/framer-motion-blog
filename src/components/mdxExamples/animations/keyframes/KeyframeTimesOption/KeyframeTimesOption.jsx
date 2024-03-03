'use client'
import React from 'react'
import { motion } from 'framer-motion'
import styles from './KeyframeTimesOption.module.scss'
import RestartDemoWrap from '@/components/RestartDemoWrap'

export default function KeyframeTimesOption() {
	return (
		<RestartDemoWrap>
			<div className={styles.wrap}>
				<motion.div
					className={styles.item}
					animate={{
						scale: [1, 0.5, 1.5, 1],
						y: [0, 100, -50, 0],
					}}
					transition={{
						duration: 2,
						times: [0, 0.33, 0.66, 1],
					}}
				></motion.div>
				<motion.div
					className={styles.item}
					animate={{
						scale: [1, 0.5, 1.5, 1],
						y: [0, 100, -50, 0],
					}}
					transition={{
						duration: 2,
						times: [0, 0.1, 0.8, 1],
					}}
				></motion.div>
			</div>
		</RestartDemoWrap>
	)
}
