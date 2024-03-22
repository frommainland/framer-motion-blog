'use client'
import React from 'react'
import styles from './LayoutValues02.module.scss'
import { motion } from 'framer-motion'

export default function LayoutValues02() {
	const [isOpen, setIsOpen] = React.useState(false)

	return (
		<motion.div className={styles.wrap}>
			<div>
				<p className={styles.title}>layout</p>
				<div className={styles.exampleWrap}>
					<motion.div
						className={styles.item}
						layout
						onClick={() => setIsOpen(!isOpen)}
						style={{
							width: isOpen ? 100 : 40,
							borderRadius: 16,
						}}
					></motion.div>
				</div>
			</div>

			<div>
				<p className={styles.title}>layout=&apos;size&apos;</p>
				<div className={styles.exampleWrap}>
					<motion.div
						className={styles.item}
						layout="size"
						onClick={() => setIsOpen(!isOpen)}
						style={{
							width: isOpen ? 100 : 40,
							borderRadius: 16,
						}}
					></motion.div>
				</div>
			</div>

			<div>
				<p className={styles.title}>ayout=&apos;position&apos;</p>
				<div className={styles.exampleWrap}>
					<motion.div
						className={styles.item}
						layout="position"
						onClick={() => setIsOpen(!isOpen)}
						style={{
							width: isOpen ? 100 : 40,
							borderRadius: 16,
						}}
					></motion.div>
				</div>
			</div>
		</motion.div>
	)
}
