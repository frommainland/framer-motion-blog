'use client'
import React from 'react'
import styles from './DragTransitionBounceDamping.module.scss'
import { motion } from 'framer-motion'
import { range } from '@/utils'

export default function DragTransitionBounceDamping() {
	const constraintsRef = React.useRef(null)
	const stiffness = [2, 10, 20]

	return (
		<div className={styles.wrap} ref={constraintsRef}>
			{stiffness.map((item) => (
				<motion.div
					key={item}
					drag
					className={styles.box}
					dragConstraints={constraintsRef}
					dragTransition={{ bounceDamping: item }}
					whileDrag={{
						backgroundColor: 'var(--color-accent-yellow)',
					}}
				>
					{item}
				</motion.div>
			))}
		</div>
	)
}
