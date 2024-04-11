'use client'
import React from 'react'
import styles from './DragTransitionPower.module.scss'
import { motion } from 'framer-motion'
import { range } from '@/utils'

export default function DragTransitionPower() {
	const constraintsRef = React.useRef(null)
	const powers = [0.1, 0.8, 2]

	return (
		<div className={styles.wrap} ref={constraintsRef}>
			{powers.map((item) => (
				<motion.div
					key={item}
					drag
					className={styles.box}
					dragConstraints={constraintsRef}
					dragTransition={{ power: item }}
				>
					{item}
				</motion.div>
			))}
		</div>
	)
}
