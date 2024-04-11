'use client'
import React from 'react'
import styles from './DragTransitionTimeConstant.module.scss'
import { motion } from 'framer-motion'

export default function DragTransitionTimeConstant() {
	const constraintsRef = React.useRef(null)
	const timeConstants = [100, 700, 1400]

	return (
		<div className={styles.wrap} ref={constraintsRef}>
			{timeConstants.map((item) => (
				<motion.div
					key={item}
					drag
					className={styles.box}
					dragConstraints={constraintsRef}
					dragTransition={{ timeConstant: item }}
				>
					{item}
				</motion.div>
			))}
		</div>
	)
}
