'use client'
import React from 'react'
import styles from './CursorTrack.module.scss'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { useMeasure } from '@uidotdev/usehooks'

export default function CursorTrack() {
	const [ref, { width, height }] = useMeasure()

	const x = useMotionValue(width / 2)
	const y = useMotionValue(height / 2)

	const handleMove = (e) => {
		const rect = e.currentTarget.getBoundingClientRect()
		x.set(e.clientX - rect.left)
		y.set(e.clientY - rect.top)
		console.log(x.current)
	}

	const handleOut = () => {
		animate(x, width / 2, { duration: 0.7 })
		animate(y, height / 2)
	}

	function calcHypotenuse(a, b) {
		return Math.sqrt(a * a + b * b)
	}

	let distance = useTransform(() =>
		calcHypotenuse(
			Math.abs(x.get() - width / 2),
			Math.abs(y.get() - height / 2)
		)
	)

	const rotateX = useTransform(y, [0, height], [-45, 45])
	const rotateY = useTransform(x, [0, width], [45, -45])
	const backgroundImage = useTransform(
		distance,
		[0, calcHypotenuse(width / 2, height / 2)],
		[
			'repeating-linear-gradient(45deg, #42433D 25%, transparent 25%, transparent 75%, #42433D 75%, #42433D), repeating-linear-gradient(45deg, #42433D 25%, #0E100F 25%, #0E100F 75%, #42433D 75%, #42433D)',
			'repeating-linear-gradient(45deg, #0e100f 25%, transparent 25%, transparent 75%, #0e100f 75%, #0e100f), repeating-linear-gradient(45deg, #0e100f 25%, #0E100F 25%, #0E100F 75%, #0e100f 75%, #0e100f)',
		]
	)

	return (
		<div
			className={styles.wrap}
			onMouseMove={handleMove}
			onMouseOutCapture={handleOut}
			ref={ref}
		>
			<motion.div
				className={styles.pad}
				style={{ rotateX, rotateY, backgroundImage }}
			></motion.div>
		</div>
	)
}
