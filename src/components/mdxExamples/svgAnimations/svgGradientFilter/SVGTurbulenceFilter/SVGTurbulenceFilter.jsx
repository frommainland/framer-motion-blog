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
					height: 120,
				}}
			>
				<defs>
					<filter id="displacementFilter3">
						<feTurbulence
							type="fractalNoise"
							baseFrequency="0.02"
							numOctaves="3"
							result="noise"
						/>
						<feDisplacementMap
							in="SourceGraphic"
							in2="noise"
							scale="80"
							result="displacement"
							xChannelSelector="R"
							yChannelSelector="G"
						/>
					</filter>
				</defs>
				<motion.path
					d="M0 57.6002C118.5 57.4999 120 57.501 240 57.6002C121.5 57.6 117 57.6 0 57.6002Z"
					fill="#FFFCE1"
					animate={{
						d: 'M0 57.6C80 140.8 160 140.8 240 57.6C160 -19.2 80 -19.2 0 57.6Z',
					}}
					transition={{
						repeat: Infinity,
						duration: 2,
					}}
					style="filter: url(#displacementFilter3)"
				/>
			</svg>
		</div>
	)
}
