'use client'

import React, { useRef, useState } from 'react'
import styles from './CursorTrail.module.scss'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export const CursorTrail = () => {
	const wrapRef = useRef(null)
	const [trail, setTrail] = useState([])
	const [index, setIndex] = useState(0)

	// console.log(index)

	function handleMouseMove(e) {
		const { clientX, clientY } = e
		if (!wrapRef.current) return

		const rect = wrapRef.current.getBoundingClientRect()
		const position = {
			x: clientX - rect.left,
			y: clientY - rect.top,
		}
		const newTrailItem = {
			id: `${index}-${position.x}-${position.y}`,
			position,
		}

		let lastPosition = trail[trail.length - 1]?.position

		if (!lastPosition) {
			setIndex(1)
			setTrail([newTrailItem])
			return
		}

		const distance = Math.sqrt(
			Math.pow(position.x - lastPosition.x, 2) +
				Math.pow(position.y - lastPosition.y, 2)
		)
        console.log(distance)

		if (distance < 1000) return

		setIndex((pre) => pre + 1)
		setTrail((prevEmojis) => [...prevEmojis, newTrailItem])
	}

	function removeItem(index) {
		setTrail(trail.filter((item) => item.index !== index))
	}

	return (
		<div
			className={styles.wrap}
			ref={wrapRef}
			onMouseMove={handleMouseMove}
		>
			<AnimatePresence>
				{trail.map(({ position, index }) => (
					<motion.div
						className={styles.trailItem}
						key={index}
						initial={{ x: position.x, y: position.y }}
						animate={{ x: 0, y: 0 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.5 }}
						onAnimationComplete={() => removeItem(index)}
					></motion.div>
				))}
			</AnimatePresence>
		</div>
	)
}
