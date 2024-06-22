'use client'
import React from 'react'
import styles from './DraggingBasicUndescore.module.scss'
import { motion, useMotionValue, useMotionValueEvent } from 'framer-motion'

export default function DraggingBasicUndescore() {
	const constraintsRef = React.useRef(null)
	const dragX = useMotionValue(0)
	// useMotionValueEvent(dragX, 'change', (v) => console.log(v))
	return (
		<div className={styles.wrap} ref={constraintsRef}>
			<motion.div
				drag="x"
				// style={{ x: dragX }}
				_dragX={dragX}
				className={styles.box}
				dragConstraints={constraintsRef}
			>
				Drag me ↔
			</motion.div>
			<motion.div className={styles.ghostBox} style={{ x: dragX }}>
				action box
			</motion.div>
		</div>
	)
}
