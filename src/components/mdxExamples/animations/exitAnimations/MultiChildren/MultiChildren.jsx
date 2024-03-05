'use client'
import React from 'react'
import styles from './MultiChildren.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus } from 'react-feather'
import { range } from '@/utils'

export default function MultiChildren() {
	const maxItems = 10
	const [items, setItems] = React.useState(5)
	function handlePlus() {
		if (items < maxItems) {
			setItems(items + 1)
		} else {
			setItems(maxItems)
		}
	}

	function handleMinus() {
		if (items > 0) {
			setItems(items - 1)
		} else {
			setItems(0)
		}
	}

	return (
		<div className={styles.wrap}>
			<div className={styles.exampleWrap}>
				<div className={styles.buttonsWrap}>
					<button className={styles.button} onClick={handlePlus}>
						<Plus color="var(--color-text-100)" />
					</button>
					<button className={styles.button} onClick={handleMinus}>
						<Minus color="var(--color-text-100)" />
					</button>
				</div>
				<div className={styles.itemsWrap}>
					<AnimatePresence mode="popLayout">
						{range(items).map((item) => (
							<motion.div
								className={styles.item}
								key={item}
								style={{
									backgroundColor:
										item > 8
											? 'var(--color-accent-red)'
											: item < 9 && item > 6
											? 'var(--color-accent-yellow)'
											: 'var(--color-accent-green)',
									originY: 1,
								}}
								initial={{ scaleY: 0 }}
								animate={{ scaleY: 1 }}
								exit={{ scaleY: 0 }}
							></motion.div>
						))}
					</AnimatePresence>
				</div>
			</div>
		</div>
	)
}
