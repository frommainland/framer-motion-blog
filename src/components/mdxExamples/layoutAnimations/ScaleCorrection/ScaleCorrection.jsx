'use client'
import React from 'react'
import styles from './ScaleCorrection.module.scss'
import { motion } from 'framer-motion'

export default function ScaleCorrection() {
	const [clicked, setClicked] = React.useState(false)

	return (
		<div className={styles.wrap}>
			<div className={styles.exampleWrap}>
				<motion.div
					layout
					className={styles.item}
					style={{
						width: clicked ? 160 : 120,
						height: clicked ? 160 : 120,
					}}
					onClick={() => setClicked(!clicked)}
				>
					<div className={styles.handle}></div>
				</motion.div>
				<p>layout only on parent</p>
			</div>
			<div className={styles.exampleWrap}>
				<motion.div
					layout
					className={styles.item}
					style={{
						width: clicked ? 160 : 120,
						height: clicked ? 160 : 120,
					}}
					onClick={() => setClicked(!clicked)}
				>
					<motion.div layout className={styles.handle}></motion.div>
				</motion.div>

				<p>layout only on both parent & child</p>
			</div>
			<div className={styles.exampleWrap}>
				<motion.div
					className={styles.item}
					animate={{
						width: clicked ? 160 : 120,
						height: clicked ? 160 : 120,
					}}
					onClick={() => setClicked(!clicked)}
				>
					<div className={styles.handle}></div>
				</motion.div>
				<p>Just animate</p>
			</div>
		</div>
	)
}
