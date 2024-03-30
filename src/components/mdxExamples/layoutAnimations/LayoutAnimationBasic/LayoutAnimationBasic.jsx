'use client'
import React from 'react'
import styles from './LayoutAnimationBasic.module.scss'
import { motion } from 'framer-motion'
import SingleCheckBox from '@/components/SingleCheckBox'

export default function LayoutAnimationBasic() {
	const [clicked, setClicked] = React.useState(false)

	const [layout, setlayout] = React.useState(true)

	return (
		<div className={styles.wrap}>
			{layout ? (
				<div className={styles.exampleWrap}>
					<motion.div
						className={styles.item}
						style={{
							justifyContent: clicked ? 'flex-start' : 'flex-end',
						}}
						animate={{
							backgroundColor: clicked
								? 'var(--color-surface-200)'
								: 'var(--color-text-100)',
						}}
					>
						<motion.div
							className={styles.handle}
							animate={{
								backgroundColor: clicked
									? 'var(--color-surface-300)'
									: 'var(--color-accent-green)',
							}}
							onClick={() => setClicked(!clicked)}
							layout
						></motion.div>
					</motion.div>
				</div>
			) : (
				<div className={styles.exampleWrap}>
					<motion.div
						className={styles.item}
						style={{
							justifyContent: clicked ? 'flex-start' : 'flex-end',
						}}
						animate={{
							backgroundColor: clicked
								? 'var(--color-surface-200)'
								: 'var(--color-text-100)',
						}}
					>
						<motion.div
							className={styles.handle}
							animate={{
								backgroundColor: clicked
									? 'var(--color-surface-300)'
									: 'var(--color-accent-green)',
							}}
							onClick={() => setClicked(!clicked)}
						></motion.div>
					</motion.div>
				</div>
			)}

			<div
				style={{
					position: 'absolute',
					bottom: 20,
					left: '50%',
					transform: 'translateX(-50%)',
				}}
			>
				<SingleCheckBox
					value={layout}
					setValue={setlayout}
					id="layout"
					content="layout"
				/>
			</div>
		</div>
	)
}
