'use client'
import React from 'react'
import styles from './LineNavigation.module.scss'
import { motion } from 'framer-motion'
import { range } from '@/utils'
import { gentleEase } from '@/helper/easing'

function getScaleX(index, hoveredIndex, scaleFactor) {
	if (hoveredIndex === null) return 1
	const distance = Math.abs(index - hoveredIndex)
	if (distance === 0) return 1 + scaleFactor * 3 // hovered element
	if (distance === 1) return 1 + scaleFactor * 2 // adjacent elements
	if (distance === 2) return 1 + scaleFactor // next adjacent elements
	if (distance === 3) return 1 // next next adjacent elements
	return 1 // rest of the elements
}

function getScaleY(index, hoveredIndex) {
	if (hoveredIndex === null) return 1
	const scaleFactor = 0.5
	const distance = Math.abs(index - hoveredIndex)
	if (distance === 0) return 1 + scaleFactor * 3 // hovered element
	if (distance === 1) return 1 + scaleFactor * 2 // adjacent elements
	if (distance === 2) return 1 + scaleFactor // next adjacent elements
	if (distance === 3) return 1 // next next adjacent elements
	return 1 // rest of the elements
}

function Line({ hoverIndex, setHoverIndex, i }) {
	const lineWidth = 20
	const [scaleX, setScaleX] = React.useState(1)
	const [scaleY, setScaleY] = React.useState(1)

	const scaleXFactor = 0.75

	React.useEffect(() => {
		let scaleX = getScaleX(i, hoverIndex, scaleXFactor)
		let scaleY = getScaleY(i, hoverIndex)
		setScaleX(scaleX)
		setScaleY(scaleY)
	}, [hoverIndex])

	return (
		<div
			className={styles.lineWrap}
			onMouseEnter={() => setHoverIndex(i)}
			onMouseLeave={() => setHoverIndex(null)}
		>
			<motion.div
				className={styles.line}
				style={{ originX: 0, width: lineWidth }}
				animate={{
					scaleX: scaleX,
					backgroundColor:
						hoverIndex === i
							? 'var(--color-accent-yellow)'
							: 'var(--color-surface-300)',
					scaleY: scaleY,
				}}
				transition={{ type: 'spring', ...gentleEase }}
			></motion.div>
			<motion.p
				className={styles.time}
				style={{ left: lineWidth * (1 + scaleXFactor * 3) + 8 }}
				initial={{ opacity: 0 }}
				animate={{ opacity: hoverIndex === i ? 1 : 0 }}
				transition={{
					delay: hoverIndex === i ? 0.25 : 0,
					duration: 0.1,
					type: 'spring',
					...gentleEase,
				}}
			>
				{i}
			</motion.p>
		</div>
	)
}

const LineNavigation = () => {
	const line_num = 15
	const [hoverIndex, setHoverIndex] = React.useState(null)

	return (
		<div className={styles.wrap}>
			{range(line_num).map((i) => (
				<Line
					key={i}
					i={i}
					hoverIndex={hoverIndex}
					setHoverIndex={setHoverIndex}
				/>
			))}
		</div>
	)
}

export default LineNavigation
