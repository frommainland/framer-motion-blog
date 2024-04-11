'use client'
import React from 'react'
import styles from './DraggingBasicDirectionLock.module.scss'
import { motion } from 'framer-motion'

export default function DraggingBasicDirectionLock() {
	const constraintsRef = React.useRef(null)
	return (
		<div className={styles.wrap} ref={constraintsRef}>
			<motion.div
				drag
				dragDirectionLock={true}
				className={styles.box}
				dragConstraints={constraintsRef}
			>
				Direction Lock
			</motion.div>
		</div>
	)
}
