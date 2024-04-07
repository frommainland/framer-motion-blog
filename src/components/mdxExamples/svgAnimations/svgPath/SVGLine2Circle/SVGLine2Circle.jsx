'use client'
import React from 'react'
import styles from './SVGLine2Circle.module.scss'
import { MotionConfig, motion } from 'framer-motion'

export default function SVGLine2Circle() {
	return (
		<div className={styles.wrap}>
			<div
				style={{
					width: 120,
					height: 120,
					// background: 'var(--color-surface-200)',
					borderRadius: 10,
				}}
			>
				<motion.svg
					style={{ width: 120, height: 120 }}
					animate={{ rotate: 720 }}
					transition={{
						duration: 2,
						delay: 1,
						repeat: Infinity,
						repeatDelay: 4,
						repeatType: 'nmirror',
					}}
				>
					<MotionConfig
						transition={{
							repeat: Infinity,
							repeatType: 'mirror',
							repeatDelay: 2,
							ease: 'easeInOut',
							duration: 1,
						}}
					>
						<motion.path
							d="M 85 90 C 65 90 55 90 35 90"
							animate={{ d: 'M 110 60 C 110 32 88 10 60 10' }}
							stroke="var(--color-accent-red)"
							strokeWidth={10}
							strokeLinecap="round"
							fill="transparent"
						/>
						<motion.path
							d="M 85 70 C 65 70 54 70 34 70"
							animate={{ d: 'M 110 60 C 110 88 88 110 60 110' }}
							stroke="var(--color-accent-green)"
							strokeWidth={10}
							strokeLinecap="round"
							fill="transparent"
						/>
						<motion.path
							d="M 85 50 C 65 50 55 50 35 50"
							animate={{ d: 'M 60 110 C 32 110 10 88 10 60' }}
							stroke="var(--color-accent-yellow)"
							strokeWidth={10}
							strokeLinecap="round"
							fill="transparent"
						/>
						<motion.path
							d="M 35 30 C 64 30 85 30 85 30"
							animate={{ d: 'M 10 60 C 10 32 32 10 60 10' }}
							stroke="var(--color-accent-purple)"
							strokeWidth={10}
							strokeLinecap="round"
							fill="transparent"
						/>
					</MotionConfig>
				</motion.svg>
			</div>
		</div>
	)
}
