'use client'
import React from 'react'
import styles from './DragElastic.module.scss'
import { motion } from 'framer-motion'

export default function DragElastic() {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const dragContainers = [0, 1, 2].map(() => React.useRef(null))

	const content = [0.2, 'default', 1]
	const dragElastic = [0.2, 0.5, 1]

	return (
		<div className={styles.wrap}>
			{dragContainers.map((dragContainer, index) => (
				<div
					key={index}
					className={styles.dragContainer}
					ref={dragContainer}
				>
					<motion.div
						drag="x"
						className={styles.box}
						dragConstraints={dragContainer}
						dragElastic={dragElastic[index]}
						whileDrag={{
							backgroundColor: 'var(--color-accent-yellow)',
						}}
					>
						{content[index]}
					</motion.div>
				</div>
			))}
		</div>
	)
}
