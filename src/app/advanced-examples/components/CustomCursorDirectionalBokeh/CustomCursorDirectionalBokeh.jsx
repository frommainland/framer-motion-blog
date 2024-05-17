'use client'

import React from 'react'
import styles from './CustomCursorDirectionalBokeh.module.scss'
import Image from 'next/image'
import {
	useMotionValue,
	motion,
	useTransform,
	useSpring,
	useMotionTemplate,
	animate,
	spring,
} from 'framer-motion'
import { useMouse } from '@uidotdev/usehooks'

export const CustomCursorDirectionalBokeh = () => {
	const cursorSize = 15

	const springValues = {
		damping: 30,
		stiffness: 100,
		mass: 2,
	}

	const x = useMotionValue(0)
	const y = useMotionValue(0)

	const [mouse, ref] = useMouse()

	React.useEffect(() => {
		x.set(mouse.elementX)
		y.set(mouse.elementY)
		// animate(x, mouse.elementX, springValues)
		// animate(y, mouse.elementY, springValues)
	}, [mouse])

	const globalAperture = 1.6
	const rotateX = useSpring(0, springValues)
	const rotateY = useSpring(0, springValues)
	const scale = useSpring(1, springValues)

	const angle = useSpring(0, springValues)
	const blur = useSpring(0, springValues)

	const cursorScale = useSpring(1, springValues)

	function calcAngleDegrees(x, y) {
		return (Math.atan2(y, x) * 180) / Math.PI
	}

	const handleMouse = (e) => {
		if (!ref.current) return
		const rect = ref.current.getBoundingClientRect()

		const offsetX = e.clientX - rect.left - rect.width / 2
		const offsetY = e.clientY - rect.top - rect.height / 2

		// The division by `(rect.height / 2)` and `(rect.width / 2)` is used to normalize the mouse position to a range of -1 to 1
		const rotationX = (offsetY / (rect.height / 2)) * -14
		const rotationY = (offsetX / (rect.width / 2)) * 14

		// get mask angel
		const angleDeg = calcAngleDegrees(offsetX, offsetY)

		//get blur
		const blurIntensity = Math.hypot(offsetX, offsetY) / globalAperture / 50

		rotateX.set(rotationX)
		rotateY.set(rotationY)
		angle.set(angleDeg)
		blur.set(blurIntensity)
	}

	const [cursorText, setCursorText] = React.useState('')
	const [cursorVariant, setCursorVariant] = React.useState('default')

	const variants = {
		default: {
			height: cursorSize,
			width: cursorSize,
			backgroundColor: 'rgba(255, 252, 225, .5)',
		},
		view: {
			height: cursorSize * 4,
			width: cursorSize * 4,
			backgroundColor: 'rgba(255, 252, 225, 1)',
		},
	}

	const mask = useMotionTemplate`linear-gradient(
    ${angle}deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) 10%,
    rgba(0, 0, 0, 1) 35%,
    rgba(0, 0, 0, 1) 65%,
    rgba(0, 0, 0, 0) 90%,
    rgba(0, 0, 0, 0) 100%
)`

	const mediumMask = useMotionTemplate`linear-gradient(
        ${angle}deg,
        rgba(0, 0, 0, 1) 0%,
        rgba(0, 0, 0, 1) 35%,
        rgba(0, 0, 0, 0) 45%,
        rgba(0, 0, 0, 0) 55%,
        rgba(0, 0, 0, 1) 65%,
        rgba(0, 0, 0, 1) 100%
      )`

	const maskFar = useMotionTemplate`linear-gradient(
        ${angle}deg,
        rgba(0, 0, 0, 1) 0%,
        rgba(0, 0, 0, 1) 10%,
        rgba(0, 0, 0, 0) 30%,
        rgba(0, 0, 0, 0) 70%,
        rgba(0, 0, 0, 1) 90%,
        rgba(0, 0, 0, 1) 100%
        )`

	const blurMedium = useMotionTemplate`blur(${blur.get() * 0.5}px)`
	const blurFar = useMotionTemplate`blur(${blur}px)`

	return (
		<div
			className={styles.wrap}
			ref={ref}
			onMouseMove={handleMouse}
			onMouseEnter={() => {
				scale.set(1.1)
				cursorScale.set(4)
			}}
			onMouseLeave={() => {
				scale.set(1)
				rotateX.set(0)
				rotateY.set(0)
				cursorScale.set(1)
			}}
		>
			<div className={styles.imagesWrap}>
				{/* image 1 */}
				<motion.div
					className={styles.imageItem}
					style={{
						rotateX,
						rotateY,
						scale,
						maskImage: mask,
					}}
					onMouseEnter={() => {
						setCursorText('View')
						setCursorVariant('view')
					}}
					onMouseLeave={() => {
						setCursorText('')
						setCursorVariant('default')
					}}
				>
					<Image
						src="/CustomCursor/bobbyChen.jpg"
						width={300}
						height={300}
						priority
						alt="Bobby Chen album cover image"
						style={{
							borderRadius: 8,
							objectFit: 'cover',
						}}
					/>
				</motion.div>

				{/* image 2 */}
				<motion.div
					className={styles.imageItem}
					style={{
						rotateX,
						rotateY,
						scale,
						maskImage: mediumMask,
						filter: blurMedium,
					}}
					onMouseEnter={() => {
						setCursorText('View')
						setCursorVariant('view')
					}}
					onMouseLeave={() => {
						setCursorText('')
						setCursorVariant('default')
					}}
				>
					<Image
						src="/CustomCursor/bobbyChen.jpg"
						width={300}
						height={300}
						priority
						alt="Bobby Chen album cover image"
						style={{
							borderRadius: 8,
							objectFit: 'cover',
						}}
					/>
				</motion.div>

				{/* image 3 */}
				<motion.div
					className={styles.imageItem}
					style={{
						rotateX,
						rotateY,
						scale,
						maskImage: maskFar,
						filter: blurFar,
					}}
					onMouseEnter={() => {
						setCursorText('View')
						setCursorVariant('view')
					}}
					onMouseLeave={() => {
						setCursorText('')
						setCursorVariant('default')
					}}
				>
					<Image
						src="/CustomCursor/bobbyChen.jpg"
						width={300}
						height={300}
						priority
						alt="Bobby Chen album cover image"
						style={{
							borderRadius: 8,
							objectFit: 'cover',
						}}
					/>
				</motion.div>
			</div>

			{/* mouse dot */}
			<motion.div
				layout="position"
				className={styles.cursor}
				style={{
					x,
					y,
					width: cursorSize,
					height: cursorSize,
					pointerEvents: 'none',
				}}
				variants={variants}
				animate={cursorVariant}
				// transition={springValues}
			>
				<motion.span
					layout
					variants={{
						default: {
							scale: 0,
						},
						view: {
							scale: 1,
						},
					}}
				>
					{cursorText}
				</motion.span>
			</motion.div>
		</div>
	)
}
