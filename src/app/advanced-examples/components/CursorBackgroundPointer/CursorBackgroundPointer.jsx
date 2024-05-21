'use client'
import styles from './CursorBackgroundPointer.module.scss'
import React from 'react'
import { range } from '@/utils'
import { useMeasure } from '@uidotdev/usehooks'
import {
	motion,
	spring,
	useMotionTemplate,
	useMotionValue,
	useMotionValueEvent,
	useSpring,
	useTransform,
	useVelocity,
} from 'framer-motion'
import Cell from './Cell'

export const CursorBackgroundPointer = () => {
	const cellSize = 40
	const springConfig = { mass: 0.2, damping: 50, stiffness: 400 }

	const cellContainerRef = React.useRef(null)

	const mouseXMV = useMotionValue(0)
	const mouseYMV = useMotionValue(0)

	const mouseXVelocity = useVelocity(mouseXMV)
	const mouseXYelocity = useVelocity(mouseYMV)

	const mouseVelocity = useTransform(
		[mouseXVelocity, mouseXYelocity],
		([x, y]) => {
			return Math.hypot(x, y)
		}
	)

	const opacity = useTransform(mouseVelocity, [0, 500], [0, 1])
	const opacitySmooth = useSpring(opacity, springConfig)

	React.useEffect(() => {
		const handleMouseMove = (e) => {
			if (cellContainerRef.current) {
				const rect = cellContainerRef.current.getBoundingClientRect()
				// mouseXMV.set(e.clientX - rect.left)
				// mouseYMV.set(e.clientY - rect.top)
				mouseXMV.set(
					Math.min(rect.width, Math.max(0, e.clientX - rect.left))
				)
				mouseYMV.set(
					Math.min(rect.height, Math.max(0, e.clientY - rect.top))
				)
			}
		}
		// mouseXMV.set(e.clientX)
		// mouseYMV.set(e.clientY)

		if (cellContainerRef.current) {
			cellContainerRef.current.addEventListener(
				'mousemove',
				handleMouseMove
			)
		}

		return () => {
			if (cellContainerRef.current) {
				cellContainerRef.current.removeEventListener(
					'mousemove',
					handleMouseMove
				)
			}
		}
	}, [cellContainerRef, mouseXMV, mouseYMV])

	// const [wrapRef, { width, height }] = useMeasure()

	const [column, setColumn] = React.useState(0)
	const [row, setRow] = React.useState(0)

	// React.useEffect(() => {
	// 	setColumn(Math.ceil(width / cellSize))
	// 	setRow(Math.ceil(height / cellSize))
	// }, [width, height])

	React.useEffect(() => {
		if (cellContainerRef.current) {
			const rect = cellContainerRef.current.getBoundingClientRect()
			setColumn(Math.ceil(rect.width / cellSize))
			setRow(Math.ceil(rect.height / cellSize))
		}
	}, [cellContainerRef])

	const positionX = useTransform(mouseXMV, (x) => {
		if (cellContainerRef.current) {
			const rect = cellContainerRef.current.getBoundingClientRect()

			// const percent = ((x - rect.left) / rect.width) * 100
			const percent = (x / rect.width) * 100
			// console.log(Math.min(100, Math.max(0, percent)))
			// return Math.min(100, Math.max(0, percent))
			return percent
		}
	})

	const positionY = useTransform(mouseYMV, (y) => {
		if (cellContainerRef.current) {
			const rect = cellContainerRef.current.getBoundingClientRect()
			// const percent = ((y - rect.top) / rect.height) * 100
			// return Math.min(100, Math.max(0, percent))
			const percent = (y / rect.height) * 100
			return percent
		}
	})

	const WebkitMaskPosition = useMotionTemplate`${positionX}% ${positionY}%`

	return (
		// <div className={styles.wrap} ref={wrapRef}>
		<div className={styles.wrap}>
			<motion.div
				ref={cellContainerRef}
				className={styles.cellContainer}
				style={{
					gridTemplateColumns: `repeat(${column}, 1fr)`,
					gridTemplateRows: `repeat(${row}, 1fr)`,
					WebkitMaskPosition,
					opacity: opacitySmooth,
				}}
			>
				{range(row).map((i) =>
					range(column).map((j) => (
						<Cell
							key={`${i}-${j}`}
							mouseXMV={mouseXMV}
							mouseYMV={mouseYMV}
							cellSize={cellSize}
							springConfig={springConfig}
						/>
					))
				)}
			</motion.div>
		</div>
	)
}
