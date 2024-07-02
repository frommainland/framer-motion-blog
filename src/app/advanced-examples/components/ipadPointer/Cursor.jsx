'use client'
import React from 'react'
import { motion, transform, useMotionValue, useTransform } from 'framer-motion'

const Cursor = ({ mvX, mvY, rect, wrapperRect, originX, originY, origin }) => {
	const originXMV = useMotionValue(0)
	const originYMV = useMotionValue(0)

	React.useEffect(() => {
		originXMV.set(originX)
		originYMV.set(originY)
	}, [originX, originY])

	const x = useTransform(originXMV, [0, 1], [-9, 9])
	const y = useTransform(originYMV, [0, 1], [-9, 9])

	return (
		<motion.div
			style={{
				borderRadius: 16,
				position: 'absolute',
				top: 0,
				left: 0,
				// border: '1px solid white',
				x: rect ? rect.x - wrapperRect.x : mvX.get(),
				y: rect ? rect.y - wrapperRect.y : mvY.get(),
				width: rect ? rect.width : 32,
				height: rect ? rect.height : 32,
			}}
		>
			<motion.div
				style={{
					x,
					y,
					pointerEvents: 'none',
					borderRadius: 16,
					position: 'absolute',
					height: '100%',
					width: '100%',
					originX: origin.xPercent,
					originY: origin.yPercent,
				}}
				animate={{
					scale: rect ? 1 : 0.5,
					backgroundColor: rect
						? 'rgba(255, 255, 255, 0.15)'
						: 'rgba(255, 255, 255, 0.45)',
				}}
			></motion.div>
		</motion.div>
	)
}

export default Cursor
