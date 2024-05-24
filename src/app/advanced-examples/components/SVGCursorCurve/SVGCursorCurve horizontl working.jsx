'use client'
import React from 'react'
import styles from './SVGCursorCurve.module.scss'
import {
	animate,
	motion,
	useMotionTemplate,
	useMotionValue,
} from 'framer-motion'

const SVGCursorCurve = () => {
	const svgWrapRef = React.useRef(null)

	let yValue = 120

	const x = useMotionValue(200)
	const y = useMotionValue(120)

	const xAnimationRef = React.useRef(null)
	const yAnimationRef = React.useRef(null)

	const handleMouseEnter = () => {
		// Stop any ongoing animations
		if (xAnimationRef.current) {
			xAnimationRef.current.stop()
		}
		if (yAnimationRef.current) {
			yAnimationRef.current.stop()
		}
	}

	const handleMouseMove = (e) => {
		if (!svgWrapRef.current) return
		const { clientX, clientY, movementY } = e
		const rect = svgWrapRef.current.getBoundingClientRect()
		const mouseX = clientX - rect.left

		yValue = yValue + movementY
		x.set(mouseX)
		y.set(yValue)
	}

	const pathPoint = useMotionTemplate`M 0 120 Q ${x} ${y} 400 120`

	function handleMouseLeave() {
		yValue = 120
		// animate(y, 120, {
		// 	type: 'spring',
		// 	stiffness: 300,
		// })
		// animate(x, 200, {
		// 	type: 'spring',
		// 	stiffness: 300,
		// })
		// animationx.play()
		// animationy.play()
		xAnimationRef.current = animate(x, 200, {
			type: 'spring',
			stiffness: 300,
		})
		yAnimationRef.current = animate(y, 120, {
			type: 'spring',
			stiffness: 300,
		})
		// animate(y, 120, {
		// 	type: 'spring',
		// 	stiffness: 300,
		// 	onUpdate: (v) => console.log(v),
		// })
	}

	return (
		<div className={styles.wrap}>
			<div className={styles.line}>
				<div
					className={styles.box}
					onMouseEnter={handleMouseEnter}
					onMouseMove={handleMouseMove}
					onMouseLeave={handleMouseLeave}
				></div>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240">
					<motion.path
						d={pathPoint}
						stroke="#FF0000"
						strokeWidth="1"
						fill="none"
						ref={svgWrapRef}
					/>
				</svg>
			</div>
		</div>
	)
}

export default SVGCursorCurve
