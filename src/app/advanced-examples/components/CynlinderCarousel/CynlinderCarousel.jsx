'use client'
import styles from './CynlinderCarousel.module.scss'

import React from 'react'
import {
	motion,
	useMotionValue,
	useTransform,
	useAnimation,
} from 'framer-motion'
import { range } from '@/utils'
import Image from 'next/image'

const CynlinderCarousel = () => {
	const cylinderWidth = 1800
	const faceCount = 12
	const faceSize = cylinderWidth / faceCount
	const radius = cylinderWidth / (2 * Math.PI)

	const rotation = useMotionValue(0)
	const dragFactor = 0.005

	const x = useMotionValue(0)

	const handleDrag = (_, info) => {
		rotation.set(rotation.get() + info.delta.x / 10)
	}

	const controls = useAnimation()

	const handleDragStart = () => {
		controls.stop()
	}

	const handleDragEnd = (_, info) => {
		controls.start({
			rotateY: rotation.get() + info.velocity.x * dragFactor * 10,
			transition: {
				type: 'spring',
				stiffness: 100,
				damping: 30,
				mass: 0.1,
			},
		})
	}

	// this was initial code, it will cause undraggabe because sometimes when .casousel get skewed, the draggabel area will be skewed too, hard to click or drag
	const transform = useTransform(rotation, (value) => {
		return `rotate3d(0, 1, 0, ${value}deg)`
	})

	// so when drag, it wont actually move, but scene size wont get skewed, it could be dragged any where.
	const test = useTransform(rotation, (value) => {
		return `rotate3d(0, 0, 0, ${value}deg)`
	})

	return (
		<div className={styles.wrap}>
			<div className={styles.leftmask} />
			<div className={styles.rightmask} />
			<motion.div
				className={styles.scene}
				drag="x"
				onDragStart={handleDragStart}
				onDrag={handleDrag}
				onDragEnd={handleDragEnd}
				style={{ transform: test }}
			>
				<motion.div
					className={styles.carousel}
					style={{ transform: transform, rotateY: rotation }}
					animate={controls}
				>
					{range(faceCount).map((i) => (
						<div
							key={i}
							className={styles.face}
							style={{
								width: `${faceSize + 5}px`,
								transform: `rotateY(${
									i * (360 / faceCount)
								}deg) translateZ(${radius}px)`,
							}}
						>
							<Image
								src={`/CynlinderCarousel/cover${i + 1}.webp`}
								alt="random"
								width={300}
								height={300}
								style={{
									objectFit: 'contain',
									height: 'auto',
								}}
							/>
						</div>
					))}
				</motion.div>
			</motion.div>
		</div>
	)
}

export default CynlinderCarousel
