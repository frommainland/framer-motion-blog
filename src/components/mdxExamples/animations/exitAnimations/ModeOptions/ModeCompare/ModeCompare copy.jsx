'use client'
import React from 'react'
import styles from './ModeCompare.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import { range } from '@/utils'

export default function ModeCompare() {
	const [num, setNum] = React.useState(3)
	const [items, setItems] = React.useState(range(num))

	function handleClick(item) {
		let newItems = [...items].filter((v) => v !== item)
		console.log(newItems)
		setItems(newItems)
	}

	return (
		<div className={styles.wrap}>
			<div className={styles.exampleWrap}>
				<AnimatePresence mode="popLayout">
					<motion.div className={styles.itemsWrap}>
						{items.map((item) => (
							<motion.div
								key={item}
								className={styles.item}
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								exit={{ scale: 0 }}
								onClick={() => handleClick(item)}
							></motion.div>
						))}
					</motion.div>
				</AnimatePresence>

				<p>sync</p>
			</div>
		</div>
	)
}
