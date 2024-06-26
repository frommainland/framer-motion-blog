'use client'
import React from 'react'
import styles from './DragModifyTarget02.module.scss'
import { motion } from 'framer-motion'

export default function DragModifyTarget02() {
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
						modifyTarget: (target) => 0,
					}}
					whileDrag={{
						backgroundColor: 'var(--color-accent-yellow)',
					}}
				></motion.div>
			</div>
		</div>
	)
}
