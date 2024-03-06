'use client'
import React from 'react'
import styles from './OnExitComplete.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'react-feather'

export default function OnExitComplete() {
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
		setOpacity(0)
		setDisabled(true)
	}

	function handleRight() {
		if (selected < items.length - 1) {
			setSelected(selected + 1)
		} else {
			setSelected(0)
		}
		setOpacity(0)
		setDisabled(true)
	}

	const [opacity, setOpacity] = React.useState(1)
	const [disabled, setDisabled] = React.useState(false)

	return (
		<div className={styles.wrap}>
			<div className={styles.exampleWrap}>
				<motion.button
					disabled={disabled}
					onClick={handleLeft}
					whileTap={{ scale: 0.9 }}
					animate={{ opacity }}
				>
					<ArrowLeft />
				</motion.button>
				<div className={styles.itemRelative}>
					<AnimatePresence
						onExitComplete={() => {
							setOpacity(1)
							setDisabled(false)
						}}
					>
						<motion.p
							key={`${items[selected]}-${selected}`}
							initial={{
								scale: 0,
								rotate: -180,
								x: '-50%',
								y: '-50%',
							}}
							animate={{ scale: 1, rotate: 0 }}
							exit={{ scale: 0, rotate: -180 }}
							style={{ color: colors[selected] }}
							transition={{ duration: 1 }}
						>
							{items[selected]}
						</motion.p>
					</AnimatePresence>
				</div>
				<motion.button
					onClick={handleRight}
					whileTap={{ scale: 0.9 }}
					animate={{ opacity }}
				>
					<ArrowRight />
				</motion.button>
			</div>
		</div>
	)
}
