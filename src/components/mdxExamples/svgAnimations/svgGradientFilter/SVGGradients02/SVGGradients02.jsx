'use client'
import React from 'react'
import styles from './SVGGradients02.module.scss'
import { motion } from 'framer-motion'

export default function SVGGradients02() {
	return (
		<div className={styles.wrap}>
			<svg
				width="500"
				height="150"
				viewBox="0 0 500 150"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect
					x="3"
					y="3"
					width="494"
					height="144"
					rx="13"
					fill="url(#svg_gradient_02)"
					stroke="var(--color-text-100)"
					strokeWidth="6"
				/>
				<defs>
					<linearGradient
						id="svg_gradient_02"
						x1="0"
						y1="75"
						x2="500"
						y2="75"
						gradientUnits="userSpaceOnUse"
					>
						<stop stopColor="var(--color-accent-red)" />
						<motion.stop
							offset="0.225"
							stopColor="var(--color-accent-blue)"
							animate={{ offset: [0.15, 0.35] }}
							transition={{
								type: 'spring',
								duration: 4,
								repeat: Infinity,
								repeatType: 'mirror',
							}}
						/>
						<motion.stop
							offset="0.5"
							stopColor="var(--color-accent-yellow)"
							animate={{ offset: [0.4, 0.6] }}
							transition={{
								type: 'spring',
								duration: 6,
								repeat: Infinity,
								repeatType: 'mirror',
							}}
						/>
						<motion.stop
							offset="0.73"
							stopColor="var(--color-accent-purple)"
							animate={{ offset: [0.65, 0.85] }}
							transition={{
								type: 'spring',
								duration: 8,
								repeat: Infinity,
								repeatType: 'mirror',
							}}
						/>
						<stop
							offset="1"
							stopColor="var(--color-accent-green)"
						/>
					</linearGradient>
				</defs>
			</svg>
		</div>
	)
}
