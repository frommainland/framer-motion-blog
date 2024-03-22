'use client'
import React from 'react'
import styles from './LayoutValues.module.scss'
import { motion } from 'framer-motion'

const transition = {
	duration: 0.5,
}

const summary = `
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
`

const long = `
${summary} The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.
`

export default function LayoutValues() {
	const [isOpen, setIsOpen] = React.useState(false)

	return (
		<motion.div
			className={styles.wrap}
			layout="position"
			transition={transition}
		>
			<div className={styles.exampleWrap}>
				<motion.div
					className={styles.item}
					layout
					transition={transition}
					onClick={() => setIsOpen(!isOpen)}
					style={{
						borderRadius: 16,
						// width: '80%',
					}}
				>
					<motion.div layout="position" transition={transition}>
						{isOpen ? long : summary}
					</motion.div>
				</motion.div>
			</div>
			<div className={styles.exampleWrap}>
				<motion.div
					className={styles.item}
					layout
					transition={transition}
					onClick={() => setIsOpen(!isOpen)}
					style={{
						borderRadius: 16,
						// width: '80%',
					}}
				>
					<motion.div layout transition={transition}>
						{isOpen ? long : summary}
					</motion.div>
				</motion.div>
			</div>
		</motion.div>
	)
}
