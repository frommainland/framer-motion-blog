'use client'

import React, { useEffect } from 'react'
import styles from './CursorTrail.module.scss'
import {
	distance,
	motion,
	useAnimation,
	useAnimationFrame,
	useMotionValue,
	useSpring,
	transform,
} from 'framer-motion'

import { useMouse } from '@uidotdev/usehooks'
// import img1 from './images/1.jpg'
// import img2 from './images/2.jpg'
// import img3 from './images/3.jpg'

export const CursorTrail = () => {
	const mouseInfo = React.useRef({
		now: { x: 0, y: 0 },
		prev: { x: 0, y: 0 },
		prevImage: { x: 0, y: 0 },
	}).current

	const positionRef = React.useRef({
		mouseX: 0,
		mouseY: 0,
		destinationX: 0,
		destinationY: 0,
		distanceX: 0,
		distanceY: 0,
	})

	const mouseRef = React.useRef(null)
	const mouseRef2 = React.useRef(null)

	const [mouse, ref] = useMouse()

	useAnimationFrame(() => {
		positionRef.current.mouseX = mouse.elementX
		positionRef.current.mouseY = mouse.elementY

		mouseRef.current.style.transform = `translate3d(${
			mouse.elementX - mouseRef.current.clientWidth / 2
		}px, ${mouse.elementY - mouseRef.current.clientHeight / 2}px, 0)
        `

		const { mouseX, mouseY } = positionRef.current
		positionRef.current.destinationX +=
			(mouseX - positionRef.current.destinationX) * 0.06
		positionRef.current.destinationY +=
			(mouseY - positionRef.current.destinationY) * 0.06

		mouseRef2.current.style.transform = `translate3d(${
			positionRef.current.destinationX - mouseRef.current.clientWidth / 2
		}px, ${
			positionRef.current.destinationY - mouseRef.current.clientHeight / 2
		}px, 0)`
	})

	return (
		<div className={styles.wrap} ref={ref}>
			<motion.div
				ref={mouseRef}
				style={{
					backgroundColor: 'red',
					height: 16,
					width: 16,
					position: 'absolute',
					top: 0,
					left: 0,
				}}
			/>
			<motion.div
				ref={mouseRef2}
				style={{
					backgroundColor: 'green',
					height: 16,
					width: 16,
					position: 'absolute',
					top: 0,
					left: 0,
				}}
			/>
		</div>
	)
}
