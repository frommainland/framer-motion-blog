'use client'
import React from 'react'
import styles from './AppleWatchDock.module.scss'
import { motion, useMotionValue } from 'framer-motion'
import { range } from '@/utils'
import SingleCheckBox from '@/components/SingleCheckBox'
import Ball from './Ball'

export default function AppleWatchDock() {
	const x = useMotionValue(0)
	const y = useMotionValue(0)

	const [overflowState, setOverflowState] = React.useState(false)
	const [duotone, setDuotone] = React.useState(false)
	return (
		<div className={styles.wrap}>
			<div className={styles.container}>
				<div
					className={styles.dock}
					style={{
						overflow: overflowState ? 'hidden' : 'visible',
						borderColor: overflowState
							? 'var(--color-surface-200)'
							: 'var(--color-surface-100)',
					}}
				>
					<motion.div
						className={styles.canvas}
						drag
						style={{ x, y }}
						// .canvas(500) - .dock(200)
						dragConstraints={{
							left: -300,
							right: 0,
							top: -300,
							bottom: 0,
						}}
					>
						{range(10).map((row, rowIndex) =>
							range(10).map((column, columnIndex) => (
								<Ball
									key={`${row}-${column}`}
									column={column}
									row={row}
									x={x}
									y={y}
									rowIndex={rowIndex}
									columnIndex={columnIndex}
									duotone={duotone}
								/>
							))
						)}
					</motion.div>
				</div>
			</div>
			<div className={styles.checkBoxWrap}>
				<SingleCheckBox
					content="overflow: hidden"
					id="apple-watch-dock-overflow"
					value={overflowState}
					setValue={setOverflowState}
				/>
				<SingleCheckBox
					content="duotone"
					id="apple-watch-dock-emoji"
					value={duotone}
					setValue={setDuotone}
				/>
			</div>
		</div>
	)
}
