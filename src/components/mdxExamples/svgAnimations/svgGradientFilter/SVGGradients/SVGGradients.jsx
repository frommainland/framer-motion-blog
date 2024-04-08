'use client'
import React from 'react'
import styles from './SVGGradients.module.scss'
import { motion } from 'framer-motion'

export default function SVGGradients() {
	return (
		<div className={styles.wrap}>
			<svg
				width="150"
				height="150"
				viewBox="0 0 150 150"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect
					x="3"
					y="3"
					width="144"
					height="144"
					rx="13"
					fill="url(#svg_gradient_01)"
					stroke="var(--color-text-100)"
					strokeWidth="6"
				/>
				<defs>
					<motion.linearGradient
						id="svg_gradient_01"
						x1="75"
						y1="0"
						x2="75"
						y2="150"
						// gradientUnits="userSpaceOnUse"
						animate={{
							y1: [0, 0.6, 0.499, 0, 0, 0],
							y2: [1, 1, 0.501, 0.4, 1, 1],
						}}
						transition={{
							repeat: Infinity,
							duration: 5,
							ease: 'circInOut',
						}}
					>
						<stop
							offset={0}
							stopColor="var(--color-accent-yellow)"
						/>
						<stop offset={1} stopColor="var(--color-accent-red)" />
					</motion.linearGradient>
				</defs>
			</svg>
		</div>
	)
}
