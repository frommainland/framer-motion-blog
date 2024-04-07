'use client'
import React from 'react'
import styles from './SVGPathKeyframe.module.scss'
import { motion } from 'framer-motion'

export default function SVGPathKeyframe() {
	const keyframes = [
		'M 24 24 C 96 24 96 96 96 96',
		'M 96 96 C 58 58 24 96 24 96',
		'M 96 96 C 58 58 24 23 24 23',
		'M 24 96 C 24 23 96 23 96 23',
		'M 24 24 C 96 24 96 96 96 96',
	]
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
					animate={{ d: keyframes }}
					stroke="var(--color-accent-green)"
					strokeWidth={10}
					strokeLinecap="round"
					fill="transparent"
					transition={{
						repeat: Infinity,
						repeatType: 'loop',
						ease: 'easeInOut',
						duration: 6,
					}}
				/>
			</svg>
		</div>
	)
}
