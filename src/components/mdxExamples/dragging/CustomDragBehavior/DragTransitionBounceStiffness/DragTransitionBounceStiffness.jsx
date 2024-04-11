'use client'
import React from 'react'
import styles from './DragTransitionBounceStiffness.module.scss'
import { motion } from 'framer-motion'
import { range } from '@/utils'

export default function DragTransitionBounceStiffness() {
	const constraintsRef = React.useRef(null)
	const stiffness = [50, 500, 1000]

	return (
		<div className={styles.wrap} ref={constraintsRef}>
			{stiffness.map((item) => (
				<motion.div
					key={item}
					drag
					className={styles.box}
					dragConstraints={constraintsRef}
					dragTransition={{ bounceStiffness: item }}
				>
					{item}
				</motion.div>
			))}
		</div>
	)
}
