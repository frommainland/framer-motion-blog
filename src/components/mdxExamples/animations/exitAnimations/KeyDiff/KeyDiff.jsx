'use client'
import React from 'react'
import styles from './KeyDiff.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'react-feather'

export default function KeyDiff() {
	const items = ['B', 'E', 'L', 'L']
	const [selected, setSelected] = React.useState(0)
	const colors = [
		'var(--color-accent-yellow)',
		'var(--color-accent-purple)',
		'var(--color-accent-red)',
		'var(--color-accent-green)',
	]
	function handleLeft() {
		if (selected > 0) {
			setSelected(selected - 1)
		} else {
			setSelected(items.length - 1)
		}
	}

	function handleRight() {
		if (selected < items.length - 1) {
			setSelected(selected + 1)
		} else {
			setSelected(0)
		}
	}

	return (
		<div className={styles.wrap}>
			<div className={styles.exampleWrap}>
				<motion.button onClick={handleLeft} whileTap={{ scale: 0.9 }}>
					<ArrowLeft />
				</motion.button>
				<AnimatePresence>
					<motion.div className={styles.item}>
						<motion.p
							key={items[selected]}
							initial={{ scale: 0, rotate: -180 }}
							animate={{ scale: 1, rotate: 0 }}
							exit={{ scale: 0, rotate: -180 }}
							style={{ color: colors[selected] }}
						>
							{items[selected]}
						</motion.p>
					</motion.div>
				</AnimatePresence>
				<AnimatePresence>
					<div className={styles.item}>
						<motion.p
							key={`${items[selected]}-${selected}`}
							initial={{ scale: 0, rotate: -180 }}
							animate={{ scale: 1, rotate: 0 }}
							exit={{ scale: 0, rotate: -180 }}
							style={{ color: colors[selected] }}
							transition={{
								type: 'spring',
								stiffness: 100,
								damping: 10,
							}}
						>
							{items[selected]}
						</motion.p>
					</div>
				</AnimatePresence>
				<motion.button onClick={handleRight} whileTap={{ scale: 0.9 }}>
					<ArrowRight />
				</motion.button>
			</div>
		</div>
	)
}
