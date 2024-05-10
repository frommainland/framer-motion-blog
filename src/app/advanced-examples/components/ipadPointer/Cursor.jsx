'use client'
import React from 'react'
import { motion, transform, useMotionValue, useTransform } from 'framer-motion'

const Cursor = ({ mvX, mvY, rect, wrapperRect, originX, originY }) => {
	const offsetX = rect
		? transform(
				[rect.left - wrapperRect.left, rect.right - wrapperRect.left],
				[-6, 6]
		  )(mvX.get())
		: 0

	const offsetY = rect
		? transform(
				[rect.top - wrapperRect.top, rect.bottom - wrapperRect.top],
				[-6, 6]
		  )(mvY.get())
		: 0

	const originXMV = useMotionValue(0)
	const originYMV = useMotionValue(0)

	React.useEffect(() => {
		originXMV.set(originX)
		originYMV.set(originY)
	}, [originX, originY])

	const x = useTransform(originXMV, [0, 1], [-6, 6])
	const y = useTransform(originYMV, [0, 1], [-6, 6])

	return (
		<motion.div
			style={{
				borderRadius: 16,
				position: 'absolute',
				top: 0,
				left: 0,
				width: 16,
				height: 16,
				// border: '1px solid white',
				originX: originXMV,
				originY: originYMV,
			}}
			animate={{
				x: rect ? rect.x - wrapperRect.x : mvX.get(),
				y: rect ? rect.y - wrapperRect.y : mvY.get(),
				width: rect ? rect.width : 16,
				height: rect ? rect.height : 16,
			}}
			transition={{
				y: {
					damping: 20,
					stiffness: 300,
					mass: 0.2,
				},
				x: {
					damping: 20,
					stiffness: 300,
					mass: 0.2,
				},
				// width: { type: 'spring', stiffness: 1000, damping: 70 },
				// height: { type: 'spring', stiffness: 1000, damping: 70 },
				type: 'spring',
				stiffness: 1000,
				damping: 70,
			}}
		>
			<motion.div
				style={{
					x,
					y,
					pointerEvents: 'none',
					borderRadius: 16,
					backgroundColor: 'rgba(255, 255, 255, .45)',
					opacity: 0.5,
					position: 'absolute',
					top: 0,
					left: 0,
					height: '100%',
					width: '100%',
				}}
				animate={{
					backgroundColor: rect
						? 'rgba(255, 255, 255, 0.2)'
						: 'rgba(255, 255, 255, .6)',
				}}
			/>
		</motion.div>
	)
}

export default Cursor
