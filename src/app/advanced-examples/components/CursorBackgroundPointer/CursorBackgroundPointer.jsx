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
			mouseXMV.set(e.clientX)
			mouseYMV.set(e.clientY)
		}
		window.addEventListener('mousemove', handleMouseMove)
		return () => window.removeEventListener('mousemove', handleMouseMove)
	})

	const [wrapRef, { width, height }] = useMeasure()

	const [column, setColumn] = React.useState(0)
	const [row, setRow] = React.useState(0)

	React.useEffect(() => {
		setColumn(Math.ceil(width / cellSize))
		setRow(Math.ceil(height / cellSize))
	}, [width, height])

	const cellContainerRef = React.useRef(null)
	const positionX = useTransform(mouseXMV, (x) => {
		if (cellContainerRef.current) {
			const percent =
				((x - cellContainerRef.current.getBoundingClientRect().left) /
					width) *
				100
			// console.log(Math.min(100, Math.max(0, percent)))
			return Math.min(100, Math.max(0, percent))
		}
	})

	const positionY = useTransform(mouseYMV, (y) => {
		if (cellContainerRef.current) {
			const percent =
				((y - cellContainerRef.current.getBoundingClientRect().top) /
					height) *
				100
			return Math.min(100, Math.max(0, percent))
		}
	})

	const WebkitMaskPosition = useMotionTemplate`${positionX}% ${positionY}%`

	return (
		<div className={styles.wrap} ref={wrapRef}>
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
