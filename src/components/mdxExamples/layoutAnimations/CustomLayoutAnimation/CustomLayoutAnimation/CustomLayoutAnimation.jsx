'use client'
import React from 'react'
import styles from './CustomLayoutAnimation.module.scss'
import { motion } from 'framer-motion'

export default function CustomLayoutAnimation() {
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
					animate={{
						backgroundColor: clicked
							? 'var(--color-accent-yellow)'
							: 'var(--color-surface-200)',
					}}
					onClick={() => setClicked(!clicked)}
					transition={{
						layout: { delay: 1, type: 'spring', stiffness: 150 },
					}}
				>
					<motion.div layout className={styles.handle}></motion.div>
				</motion.div>
			</div>
		</div>
	)
}
