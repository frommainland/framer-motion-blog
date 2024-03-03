'use client'
import React from 'react'
import { motion } from 'framer-motion'
import styles from './KeyframeMultiProps.module.scss'
import RestartDemoWrap from '@/components/RestartDemoWrap'

export default function KeyframeMultiProps() {
	return (
		<RestartDemoWrap>
			<div className={styles.wrap}>
				<motion.div
					className={styles.item}
					animate={{ scale: [1, 0.5, 1.5, 1], y: [0, 100, -50, 0] }}
					transition={{ duration: 2 }}
				/>
			</div>
		</RestartDemoWrap>
	)
}
