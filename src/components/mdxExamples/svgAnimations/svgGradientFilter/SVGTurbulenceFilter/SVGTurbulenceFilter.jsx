'use client'
import React from 'react'
import styles from './SVGTurbulenceFilter.module.scss'
import { motion } from 'framer-motion'

export default function SVGTurbulenceFilter() {
	return (
		<div className={styles.wrap}>
			<svg
				style={{
					width: 240,
					height: 200,
				}}
			>
				<defs>
					<filter id="displacementFilter3">
						<feTurbulence
							type="fractalNoise"
							baseFrequency="0.03"
							numOctaves="10"
							result="noise"
						/>
						<feDisplacementMap
							in="SourceGraphic"
							in2="noise"
							scale="40"
							result="displacement"
							xChannelSelector="R"
							yChannelSelector="G"
						/>
					</filter>
				</defs>
				<motion.path
					d="M 0 94 C 109 59 114 59 240 94 C 112 59 110 59 0 94 Z"
					fill="var(--color-surface-200)"
					animate={{
						d: 'M 0 94 C 80 141 160 141 240 94 C 160 -19 80 -19 0 94 Z',
						fill: 'var(--color-accent-yellow)',
					}}
					transition={{
						repeat: Infinity,
						duration: 4,
						repeatType: 'mirror',
						type: 'spring',
					}}
					filter="url(#displacementFilter3)"
				/>
			</svg>
		</div>
	)
}
