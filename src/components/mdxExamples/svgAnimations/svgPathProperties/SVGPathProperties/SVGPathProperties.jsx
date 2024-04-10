'use client'
import React from 'react'
import styles from './SVGPathProperties.module.scss'
import { motion, useMotionValue, useMotionValueEvent } from 'framer-motion'
import SingleSlider from '@/components/SingleSlider'

export default function SVGPathProperties() {
	const [pathLength, setpathLength] = React.useState(1)
	const [pathOffset, setpathOffset] = React.useState(0)
	const [pathSpacing, setpathSpacing] = React.useState(1)

	const pathOffsetMV = useMotionValue(pathOffset)
	const pathLengthMV = useMotionValue(pathLength)
	const pathSpacingMV = useMotionValue(pathSpacing)

	React.useEffect(() => {
		pathOffsetMV.set(pathOffset)
	}, [pathOffset])

	React.useEffect(() => {
		pathLengthMV.set(pathLength)
	}, [pathLength])

	React.useEffect(() => {
		pathSpacingMV.set(pathSpacing)
	}, [pathSpacing])

	return (
		<div className={styles.wrap}>
			<div className={styles.framerLogo}>
				<svg
					style={{
						width: 60,
						height: 60,
						background: 'var(--color-surface-200)',
						borderRadius: 10,
					}}
				>
					<motion.path
						d="M 30 39.5 V 56 L 13 39 h 34 L 13 4 h 34 v 17.5 H 13 v 17"
						stroke="var(--color-text-100)"
						strokeWidth={3}
						strokeLinecap="round"
						strokeLinejoin="round"
						fill="transparent"
						pathOffset={pathOffsetMV}
						pathLength={pathLengthMV}
						pathSpacing={pathSpacingMV}
						transition={{
							repeat: Infinity,
							repeatType: 'mirror',
							ease: 'easeInOut',
							duration: 3,
						}}
					/>
				</svg>
			</div>
			<div className={styles.configWrap}>
				<SingleSlider
					label="pathLength"
					id="svg animation pathLength"
					min={0}
					max={1}
					step={0.01}
					value={pathLength}
					setValue={setpathLength}
				/>
				<SingleSlider
					label="pathOffset"
					id="svg animation pathOffset"
					min={0}
					max={1}
					step={0.01}
					value={pathOffset}
					setValue={setpathOffset}
				/>
				<SingleSlider
					label="pathSpacing"
					id="svg animation pathSpacing"
					min={0}
					max={1}
					step={0.01}
					value={pathSpacing}
					setValue={setpathSpacing}
				/>
			</div>
		</div>
	)
}
