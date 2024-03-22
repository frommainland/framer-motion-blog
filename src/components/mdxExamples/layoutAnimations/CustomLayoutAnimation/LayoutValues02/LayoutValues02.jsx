'use client'
import React from 'react'
import styles from './LayoutValues02.module.scss'
import { motion } from 'framer-motion'

export default function LayoutValues02() {
	const [isOpen, setIsOpen] = React.useState(false)

	return (
		<motion.div className={styles.wrap} layout>
			<div>
				<p className={styles.title}>layout</p>
				<div className={styles.exampleWrap}>
					<motion.div
						className={styles.item}
						layout
						onClick={() => setIsOpen(!isOpen)}
						style={{
							borderRadius: 16,
							width: isOpen ? 100 : 40,
						}}
					></motion.div>
				</div>
			</div>

			<div>
				<p className={styles.title}>layout='size'</p>
				<div className={styles.exampleWrap}>
					<motion.div
						className={styles.item}
						layout="size"
						onClick={() => setIsOpen(!isOpen)}
						style={{
							borderRadius: 16,
							width: isOpen ? 100 : 40,
						}}
					></motion.div>
				</div>
			</div>

			<div>
				<p className={styles.title}>ayout='position'</p>
				<div className={styles.exampleWrap}>
					<motion.div
						className={styles.item}
						layout="position"
						onClick={() => setIsOpen(!isOpen)}
						style={{
							borderRadius: 16,
							width: isOpen ? 100 : 40,
						}}
					></motion.div>
				</div>
			</div>
		</motion.div>
	)
}
