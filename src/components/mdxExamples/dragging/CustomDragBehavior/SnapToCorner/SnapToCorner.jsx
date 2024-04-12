'use client'
import React from 'react'
import styles from './SnapToCorner.module.scss'
import {
	motion,
	useMotionValue,
	animate,
	useMotionValueEvent,
} from 'framer-motion'

export default function SnapToCorner() {
	const constraintsRef = React.useRef(null)
	const [drag, setdrag] = React.useState(false)

	const gridSize = 80

	const x = useMotionValue(0)
	const y = useMotionValue(0)

	const [scale, setscale] = React.useState(false)

	useMotionValueEvent(x, 'animationStart', () => {
		// console.log('animation started on x')
		setscale(true)
	})

	useMotionValueEvent(x, 'animationComplete', () => {
		// console.log('animation ended on x')
		setscale(false)
	})

	return (
		<div className={styles.wrap}>
			<div
				className={styles.measure}
				ref={constraintsRef}
				style={{ backgroundSize: `${gridSize}px ${gridSize}px` }}
			>
				<motion.div
					animate={{
						backgroundColor:
							drag || scale
								? 'var(--color-accent-yellow)'
								: 'var(--color-surface-200)',
						scale: scale ? 0.8 : 1,
					}}
					transition={{
						type: 'spring',
						damping: 20,
					}}
					style={{ x, y }}
					drag
					className={styles.box}
					onDrag={() => setdrag(true)}
					onDragEnd={(_, info) => {
						setdrag(false)
						let newX
						if (x.get() < 0) {
							newX = -80
							if (info.velocity.x > 100) {
								newX = 80
							}
						} else {
							newX = 80
							if (info.velocity.x < -100) {
								newX = -80
							}
						}

						let newY
						if (y.get() < 0) {
							newY = -160
							if (info.velocity.y > 100) {
								newY = 160
							}
						} else {
							newY = 160
							if (info.velocity.y < -100) {
								newY = -160
							}
						}

						animate(x, newX, { type: 'spring', damping: 20 })
						animate(y, newY, { type: 'spring', damping: 20 })
					}}
					dragConstraints={constraintsRef}
				></motion.div>
			</div>
		</div>
	)
}
