import React from 'react'
import styles from './ModeCompare.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import { range } from '@/utils'

export default function ModeCompare() {
	const num = 4
	const count = React.useRef(num)
	const [items, setItems] = React.useState(range(num))

	function handleClick(item) {
		let newItems = [...items].filter((v) => v !== item)
		setItems(newItems)
		setTimeout(() => {
			count.current++
			setItems([...newItems, count.current])
		}, 200)
	}

	return (
		<div className={styles.wrap}>
			<div className={styles.exampleWrap}>
				<p>sync</p>
				<div className={styles.itemsWrap}>
					<AnimatePresence mode="sync">
						{items.map((item) => (
							<motion.div
								layout
								key={item}
								className={styles.item}
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								exit={{ scale: 0 }}
								onClick={() => handleClick(item)}
							></motion.div>
						))}
					</AnimatePresence>
				</div>
			</div>
			<div className={styles.exampleWrap}>
				<p>popLayout</p>
				<div className={styles.itemsWrap}>
					<AnimatePresence mode="popLayout">
						{items.map((item) => (
							<motion.div
								layout
								key={item}
								className={styles.item}
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								exit={{ scale: 0 }}
								onClick={() => handleClick(item)}
							></motion.div>
						))}
					</AnimatePresence>
				</div>
			</div>
			<div className={styles.exampleWrap}>
				<p>wait</p>
				<div className={styles.itemsWrap}>
					<AnimatePresence mode="wait">
						{items.map((item) => (
							<motion.div
								layout
								key={item}
								className={styles.item}
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								exit={{ scale: 0 }}
								onClick={() => handleClick(item)}
							></motion.div>
						))}
					</AnimatePresence>
				</div>
			</div>
		</div>
	)
}
