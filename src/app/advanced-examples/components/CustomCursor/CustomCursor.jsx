'use client'

import React from 'react'
import styles from './CustomCursor.module.scss'
import Image from 'next/image'
import album from '../CustomCursor/bobbyChen.jpg'
import { useMotionValue, motion, useTransform, useSpring } from 'framer-motion'
import { useMouse } from '@uidotdev/usehooks'
import BackgroundColor from '@/components/mdxExamples/themainproperties/animate/animateExamples/backgroundcolor/BackgroundColor'

export const CustomCursor = () => {
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
	}, [mouse])

	const rotateX = useSpring(0, springValues)
	const rotateY = useSpring(0, springValues)
	const scale = useSpring(1, springValues)

	const handleMouse = (e) => {
		if (!ref.current) return
		const rect = ref.current.getBoundingClientRect()

		const offsetX = e.clientX - rect.left - rect.width / 2
		const offsetY = e.clientY - rect.top - rect.height / 2

		// The division by `(rect.height / 2)` and `(rect.width / 2)` is used to normalize the mouse position to a range of -1 to 1
		const rotationX = (offsetY / (rect.height / 2)) * -14
		const rotationY = (offsetX / (rect.width / 2)) * 14

		rotateX.set(rotationX)
		rotateY.set(rotationY)
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
	return (
		<div
			className={styles.wrap}
			ref={ref}
			onMouseMove={handleMouse}
			onMouseEnter={() => {
				scale.set(1.1)
			}}
			onMouseLeave={() => {
				scale.set(1)
				rotateX.set(0)
				rotateY.set(0)
			}}
			style={{ perspective: 800 }}
		>
			<motion.div
				style={{
					rotateX,
					rotateY,
					scale,
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
					src={album}
					width={300}
					height={300}
					alt="Picture of the author"
					style={{
						borderRadius: 8,
					}}
				/>
			</motion.div>

			{/* mouse dot */}
			<motion.div
				className={styles.cursor}
				style={{
					x,
					y,
					width: cursorSize,
					height: cursorSize,
				}}
				variants={variants}
				animate={cursorVariant}
				transition={{ type: 'spring', stiffness: 1000, damping: 70 }}
			>
				<motion.span
					variants={{
						default: {
							scale: 0,
						},
						view: {
							scale: 1,
							transition: {
								type: 'spring',
								stiffness: 1000,
								damping: 70,
								delay: 0.05,
							},
						},
					}}
				>
					{cursorText}
				</motion.span>
			</motion.div>
		</div>
	)
}
