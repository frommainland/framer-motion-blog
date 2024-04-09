'use client'
import React from 'react'
import styles from './SVGPathHamberger.module.scss'
import { MotionConfig, motion } from 'framer-motion'

export default function SVGPathHamberger() {
	const [open, setOpen] = React.useState(false)
	return (
		<div className={styles.wrap}>
			<motion.svg
				style={{
					width: 120,
					height: 120,
					background: 'var(--color-surface-200)',

					cursor: 'pointer',
				}}
				animate={{
					background: open
						? 'var(--color-surface-100)'
						: 'var(--color-surface-200)',
					borderRadius: open ? 120 : 10,
				}}
				onClick={() => setOpen(!open)}
			>
				<MotionConfig>
					<motion.path
						stroke="var(--color-text-100)"
						animate={{
							d: open ? 'M 40 40 L 80 80' : 'M 35 40 L 85 40',
						}}
						strokeWidth={10}
						strokeLinecap="round"
						fill="transparent"
					/>
					<motion.path
						d="M 35 60 H 85"
						stroke="var(--color-text-100)"
						animate={{ opacity: open ? 0 : 1 }}
						transition={{ duration: 0.1 }}
						strokeWidth={10}
						strokeLinecap="round"
						fill="transparent"
					/>
					<motion.path
						animate={{
							d: open ? 'M 40 80 L 80 40' : 'M 35 80 L 85 80',
						}}
						stroke="var(--color-text-100)"
						strokeWidth={10}
						strokeLinecap="round"
						fill="transparent"
					/>
				</MotionConfig>
			</motion.svg>
		</div>
	)
}
