'use client'
import React from 'react'
import styles from './WhileTapHoverDrag.module.scss'
import { motion, easeOut } from 'framer-motion'

export default function WhileTapHoverDrag() {
	const containerRef = React.useRef(null)
	return (
		<div className={styles.wrap} ref={containerRef}>
			<div className={styles.exampleWrap}>
				<motion.div
					className={styles.item}
					whileTap={{
						scale: 0.8,
						backgroundColor: 'var(--color-surface-300)',
					}}
				></motion.div>
				<p>whileTap</p>
			</div>
			<div className={styles.exampleWrap}>
				<motion.div
					className={styles.item}
					initial={{ border: 'solid 0px var(--color-surface-300)' }}
					whileHover={{
						border: 'solid 6px var(--color-surface-300)',
					}}
					transition={{ ease: easeOut }}
				></motion.div>
				<p>whileHover</p>
			</div>
			<div className={styles.exampleWrap}>
				<motion.div
					className={styles.item}
					drag="x"
					dragConstraints={containerRef}
					whileDrag={{
						scale: 0.2,
						backgroundColor: 'var(--color-surface-300)',
						borderRadius: '100%',
					}}
				></motion.div>
				<p>whileDrag</p>
			</div>
		</div>
	)
}
