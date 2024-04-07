'use client'
import React from 'react'
import styles from './SVGPathProperties.module.scss'
import { motion, useMotionValue, useMotionValueEvent } from 'framer-motion'
import SingleSlider from '@/components/SingleSlider'

export default function SVGPathProperties() {
	const [pathLength, setpathLength] = React.useState(0.5)
	const [pathOffset, setpathOffset] = React.useState(0.5)
	const [pathSpacing, setpathSpacing] = React.useState(0.5)

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
						d="M 12.5 40 V 22.5 H 47.5 V 5 H 12.5 L 47.5 40 H 30 M 12.5 40 L 30 57.5 V 40 M 12.5 40 H 30"
						stroke="var(--color-text-100)"
						strokeWidth={4}
						strokeLinecap="round"
						fill="transparent"
						style={{
							pathOffset: pathOffsetMV,
							pathLength: pathLengthMV,
							pathSpacing: pathSpacingMV,
						}}
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
