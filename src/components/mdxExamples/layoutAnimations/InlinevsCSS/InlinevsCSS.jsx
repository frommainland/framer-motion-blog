'use client'
import React from 'react'
import styles from './InlinevsCSS.module.scss'
import { motion, useMotionTemplate } from 'framer-motion'

export default function InlinevsCSS() {
	const [clicked, setClicked] = React.useState(false)

	return (
		<div className={styles.wrap}>
			<div className={styles.exampleWrap}>
				<div className={styles.mark}></div>
				<motion.div
					layout
					className={styles.item}
					style={{
						width: clicked ? 160 : 110,
						left: clicked ? 30 : 'calc(50% - 55px)',
						top: clicked ? 30 : 'calc(50% - 55px)',
						boxShadow: `10px 5px 5px var(--color-accent-yellow)`,
						borderRadius: 20,
					}}
					onClick={() => setClicked(!clicked)}
					transition={{ duration: 2 }}
				>
					<motion.p layout transition={{ duration: 2 }}>
						inline style
					</motion.p>
				</motion.div>
				{/* <p>inline style</p> */}
			</div>
			<div className={styles.exampleWrap}>
				<div className={styles.mark}></div>
				<motion.div
					layout
					className={`${clicked ? styles.big : styles.small}`}
					onClick={() => setClicked(!clicked)}
					transition={{ duration: 2 }}
				>
					<motion.p layout transition={{ duration: 2 }}>
						CSS class
					</motion.p>
				</motion.div>
			</div>
		</div>
	)
}
