'use client'
import React from 'react'
import styles from './AnimatePresenceBasic.module.scss'
import { AnimatePresence, motion } from 'framer-motion'

export default function AnimatePresenceBasic() {
	const [leftButtonClicked, setLeftButtonClicked] = React.useState(false)
	const [rightButtonClicked, setRightButtonClicked] = React.useState(false)

	function handleClickLeft() {
		setLeftButtonClicked(!leftButtonClicked)
	}

	function handleClickRight() {
		setRightButtonClicked(!rightButtonClicked)
	}

	return (
		<div className={styles.wrap}>
			<div className={styles.exampleWrap}>
				<motion.div
					className={styles.item}
					onClick={handleClickLeft}
					whileTap={{ scale: 0.9 }}
				>
					{leftButtonClicked && (
						<motion.svg
							width={60}
							height={60}
							viewBox="0 0 60 60"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							animate={{ scale: 1 }}
							initial={{ scale: 0 }}
						>
							<path
								d="M50 15L22.5 42.5L10 30"
								stroke="var(--color-text-100)"
								strokeWidth={8}
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</motion.svg>
					)}
				</motion.div>
				<p>without exiting animation</p>
			</div>
			<div className={styles.exampleWrap}>
				<motion.div
					className={styles.item}
					onClick={handleClickRight}
					whileTap={{ scale: 0.9 }}
				>
					<AnimatePresence>
						{rightButtonClicked && (
							<motion.svg
								width={60}
								height={60}
								viewBox="0 0 60 60"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								animate={{ scale: 1, opacity: 1 }}
								initial={{ scale: 0, opacity: 0 }}
								exit={{ scale: 0, opacity: 0 }}
							>
								<path
									d="M50 15L22.5 42.5L10 30"
									stroke="var(--color-text-100)"
									strokeWidth={8}
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</motion.svg>
						)}
					</AnimatePresence>
				</motion.div>
				<p>with AnimatePresence</p>
			</div>
		</div>
	)
}
