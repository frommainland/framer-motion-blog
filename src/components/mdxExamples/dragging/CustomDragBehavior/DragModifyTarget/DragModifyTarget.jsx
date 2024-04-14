'use client'
import React from 'react'
import styles from './DragModifyTarget.module.scss'
import { motion } from 'framer-motion'

export default function DragModifyTarget() {
	const constraintsRef = React.useRef(null)
	let targets = []
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
						// modifyTarget: (target) => {
						// 	targets.push(target)
						// 	if (targets.length === 2) {
						// 		var [a, b] = targets
						// 		targets = []
						// 		console.log(`a: ${a}`)
						// 		console.log(`b: ${b}`)
						// 	}
						// 	return target
						// },
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
