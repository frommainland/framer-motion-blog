'use client'
import React from 'react'
import styles from './DraggingBasicDirection.module.scss'
import { motion } from 'framer-motion'

export default function DraggingBasicDirection() {
	const containerRef = React.useRef(null)
	return (
		<div className={styles.wrap} ref={containerRef}>
			<motion.div
				drag="x"
				className={styles.box}
				dragConstraints={containerRef}
			>
				Horizontal
			</motion.div>
			<motion.div
				drag="y"
				className={styles.box}
				dragConstraints={containerRef}
			>
				Vertical
			</motion.div>
		</div>
	)
}
