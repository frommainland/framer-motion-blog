'use client'
import React from 'react'
import styles from './SharedLayout02.module.scss'
import { LayoutGroup, motion, MotionConfig } from 'framer-motion'
import { range } from '@/utils'

export default function SharedLayout02() {
	const tabs = [
		{ color: 'var(--color-accent-red)', title: 'a' },
		{ color: 'var(--color-accent-blue)', title: 'b' },
		{ color: 'var(--color-accent-yellow)', title: 'c' },
		{ color: 'var(--color-accent-purple)', title: 'd' },
		{ color: 'var(--color-surface-300)', title: 'e' },
		{ color: 'var(--color-text-100)', title: 'f' },
	]

	const [currentIndex, setcurrentIndex] = React.useState(false)

	return (
		<MotionConfig>
			<div className={styles.wrap}>
				<div className={styles.exampleWrap}>
					{tabs.map(({ color, title }, index) => {
						return (
							<motion.div
								key={index}
								className={styles.item}
								onClick={() => {
									setcurrentIndex(index)
								}}
								style={{
									backgroundColor: color,
									borderRadius: 8,
								}}
								layoutId={`${title}-sharedLayout02`}
							></motion.div>
						)
					})}
				</div>

				{currentIndex !== false && (
					<motion.div
						className={styles.overlay}
						initial={{ opacity: 0 }}
						animate={{ opacity: 0.5 }}
						onClick={() => setcurrentIndex(false)}
					></motion.div>
				)}
				{currentIndex !== false && (
					<div
						className={styles.boxOpenContainer}
						onClick={() => setcurrentIndex(false)}
					>
						<motion.div
							layoutId={`${tabs[currentIndex].title}-sharedLayout02`}
							className={styles.boxOpen}
							style={{
								backgroundColor: `${tabs[currentIndex].color}`,
								borderRadius: 16,
							}}
						>
							{tabs[currentIndex].title}
						</motion.div>
					</div>
				)}
			</div>
		</MotionConfig>
	)
}
