'use client'
import React from 'react'
import styles from './DragConstraintsExactValue.module.scss'
import { motion } from 'framer-motion'

export default function DragConstraintsExactValue() {
	const constraintsRef = React.useRef(null)
	return (
		<div className={styles.wrap} ref={constraintsRef}>
			<div className={styles.measure}>
				<div className={styles.horizontal}>
					<span>70px</span>
					<span>70px</span>
				</div>
				<div className={styles.vertical}>
					<span>60px</span>
					<span>60px</span>
				</div>
				<div className={styles.original}></div>
			</div>
			<motion.div
				drag
				className={styles.box}
				dragConstraints={{
					top: -60,
					right: 70,
					bottom: 60,
					left: -70,
				}}
			></motion.div>
		</div>
	)
}
