'use client'
import React from 'react'
import styles from './SVGTurbulenceFilter.module.scss'
import { animate, motion, useMotionValue } from 'framer-motion'

export default function SVGTurbulenceFilter() {
	let numOctaves = useMotionValue(40)
	let baseFrequency = useMotionValue(0.01)
	animate(numOctaves, [40, 60], {
		repeat: Infinity,
		duration: 4,
		repeatType: 'mirror',
		type: 'spring',
	})

	animate(baseFrequency, [0.01, 0.1], {
		repeat: Infinity,
		duration: 4,
		repeatType: 'mirror',
		type: 'spring',
	})

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
						<motion.feTurbulence
							type="fractalNoise"
							baseFrequency={baseFrequency}
							numOctaves={numOctaves}
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
