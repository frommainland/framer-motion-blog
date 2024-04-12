'use client'
import React from 'react'
import styles from './DragModifyTarget.module.scss'
import { motion } from 'framer-motion'

export default function DragModifyTarget() {
	const constraintsRef = React.useRef(null)
	return (
		<div className={styles.wrap}>
			<div className={styles.measure} ref={constraintsRef}>
				<motion.div
					drag
					className={styles.box}
					dragConstraints={constraintsRef}
					dragTransition={{
						timeConstant: 300,
						modifyTarget: (target) => target + 40,
					}}
					whileDrag={{
						backgroundColor: 'var(--color-accent-yellow)',
					}}
				></motion.div>
				<p>drag here</p>
			</div>
		</div>
	)
}
