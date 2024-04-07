'use client'
import React from 'react'
import styles from './SVGPathBasic.module.scss'
import { motion } from 'framer-motion'

export default function SVGPathBasic() {
	return (
		<div className={styles.wrap}>
			<svg
				style={{
					width: 120,
					height: 120,
					background: 'var(--color-surface-200)',
					borderRadius: 10,
				}}
			>
				<motion.path
					d="M 24 24 C 96 24 96 96 96 96"
					animate={{ d: 'M 96 96 C 58 58 24 96 24 96' }}
					stroke="var(--color-accent-green)"
					strokeWidth={10}
					strokeLinecap="round"
					fill="transparent"
					transition={{
						repeat: Infinity,
						repeatType: 'mirror',
						ease: 'easeInOut',
						duration: 3,
					}}
				/>
			</svg>
		</div>
	)
}
