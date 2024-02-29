'use client'
import React, { useState } from 'react'
import {
	animate,
	motion,
	useMotionValue,
	useSpring,
	useTransform,
} from 'framer-motion'
import styles from './DraggableItem.module.scss'
import { range } from '@/utils'

function mapRange(value, inMin, inMax, outMin, outMax) {
	// Clamp the value to the input range
	value = Math.min(Math.max(value, inMin), inMax)
	return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

function Item({
	row,
	column,
	activeItem,
	setActiveItem,
	x,
	y,
	dragContraintRef,
}) {
	let isDragging = row === activeItem.x && column === activeItem.y

	function handleDrag(e) {
		setActiveItem({ x: row, y: column })
	}

	const rowDif = (activeItem.x - row) ** 2
	const columnDif = (activeItem.y - column) ** 2
	const dis = Math.sqrt(rowDif + columnDif)

	const springConfig = {
		stiffness: Math.max(1000 - dis * 120, 0),
		damping: 20 + dis * 5,
	}

	const dx = useSpring(x, springConfig)
	const dy = useSpring(y, springConfig)

	let scale =
		activeItem.x !== null && activeItem.y !== null
			? mapRange(dis, 0, 5, 0.5, 1.5)
			: 1

	const itemSize = 60
	return (
		<motion.div
			className={styles.item}
			drag
			dragConstraints={dragContraintRef}
			onDrag={handleDrag}
			onDragEnd={(e, info) => {
				const rect = dragContraintRef.current.getBoundingClientRect()
				setActiveItem({ x: null, y: null })
				// x.jump(e.clientX - rect.left)
				// y.jump(e.clientY - rect.top)
				// let endX = e.clientX - e.currentTarget.offsetLeft
				// let endY = e.clientY - e.currentTarget.offsetTop
				// console.log(info.point.x - rect.left)
				// console.log(info.point.y - rect.top)
				// console.log(endX, endY)
				animate(x, 0)
				animate(y, 0)
			}}
			style={{
				x: isDragging ? x : dx,
				y: isDragging ? y : dy,
				scale,
			}}
			dragTransition={{ bounceStiffness: 500, bounceDamping: 20 }}
			dragElastic={1}
		>
			{row}-{column}
		</motion.div>
	)
}

export default function DraggableItem() {
	const [activeItem, setActiveItem] = React.useState({ x: null, y: null })
	const x = useMotionValue(0)
	const y = useMotionValue(0)
	const dragContraintRef = React.useRef(null)

	return (
		<div className={styles.wrap} ref={dragContraintRef}>
			<div className={styles.itemsWrap}>
				{range(5).map((row) => {
					return range(5).map((column) => (
						<Item
							column={column}
							row={row}
							key={column}
							activeItem={activeItem}
							setActiveItem={setActiveItem}
							x={x}
							y={y}
							dragContraintRef={dragContraintRef}
						/>
					))
				})}
			</div>
		</div>
	)
}
