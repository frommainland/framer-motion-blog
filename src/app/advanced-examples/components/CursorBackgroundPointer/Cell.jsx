'use client'

import React from 'react'
import styles from './CursorBackgroundPointer.module.scss'
import { motion, useSpring, useTransform } from 'framer-motion'

const Cell = ({ mouseXMV, mouseYMV, cellSize, springConfig }) => {
	const ref = React.useRef(null)

	const [cellCenter, setCellCenter] = React.useState({ x: 0, y: 0 })

	React.useEffect(() => {
		if (ref) {
			const rect = ref.current.getBoundingClientRect()
			const rectLeft = ref.current.offsetLeft
			const rectTop = ref.current.offsetTop
			// const centerX = rect.left + cellSize / 2
			// const centerY = rect.top + cellSize / 2
			const centerX = rectLeft + cellSize / 2
			const centerY = rectTop + cellSize / 2
			setCellCenter({ x: centerX, y: centerY })
		}
	}, [ref.current])

	const direction = useTransform([mouseXMV, mouseYMV], ([newX, newY]) => {
		const diffY = newY - cellCenter.y
		const diffX = newX - cellCenter.x
		const angleRadians = Math.atan2(diffY, diffX)
		const angleDegrees = Math.floor(angleRadians * (180 / Math.PI))
		return angleDegrees
	})

	const scale = useTransform([mouseXMV, mouseYMV], ([x, y]) => {
		const distance = Math.hypot(x - cellCenter.x, y - cellCenter.y)
		return Math.min(1.5, (1 / distance) * 50)
	})

	const diretionSmooth = useSpring(direction, springConfig)
	const scaleSmooth = useSpring(scale, springConfig)

	return (
		<motion.div className={styles.cell} ref={ref}>
			<motion.p
				style={{
					rotate: diretionSmooth,
					margin: 0,
					scale: scaleSmooth,
					color: 'var(--text-color-200)',
					userSelect: 'none',
				}}
			>
				-
			</motion.p>
		</motion.div>
	)
}

export default Cell
