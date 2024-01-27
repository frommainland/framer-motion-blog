'use client'
import React from 'react'
import styles from './TransitionReset.module.scss'
import { motion } from 'framer-motion'
import RestartDemoWrap from '@/components/RestartDemoWrap'

export default function TransitionReset() {
	return (
		<RestartDemoWrap>
			<div className={styles.wrap}>
				<div className={styles.flexWrap}>
					<motion.div
						className={styles.item}
						animate={{
							rotate: 360,
						}}
						transition={{
							duration: 2,
							repeat: Infinity,
						}}
						whileHover={{
							backgroundColor: 'var(--color-accent-yellow)',
							scale: 1.2,
						}}
					/>
					<p>without reset</p>
				</div>
				<div className={styles.flexWrap}>
					<motion.div
						className={styles.item}
						animate={{
							rotate: 360,
							transition: {
								duration: 2,
								repeat: Infinity,
							},
						}}
						whileHover={{
							backgroundColor: 'var(--color-accent-yellow)',
							scale: 1.2,
						}}
					/>
					<p>with reset</p>
				</div>
			</div>
		</RestartDemoWrap>
	)
}
