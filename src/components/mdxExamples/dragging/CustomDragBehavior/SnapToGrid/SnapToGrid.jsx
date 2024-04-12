'use client'
import React from 'react'
import styles from './SnapToGrid.module.scss'
import { motion } from 'framer-motion'
import SingleCheckBox from '@/components/SingleCheckBox'

export default function SnapToGrid() {
	const constraintsRef = React.useRef(null)
	const [drag, setdrag] = React.useState(false)

	const gridSize = 80

	const [modifyTarget, setmodifyTarget] = React.useState(true)
	return (
		<div className={styles.wrap}>
			<div
				className={styles.measure}
				ref={constraintsRef}
				style={{ backgroundSize: `${gridSize}px ${gridSize}px` }}
			>
				<motion.div
					animate={{
						backgroundColor: drag
							? 'var(--color-accent-yellow)'
							: 'var(--color-surface-200)',
					}}
					drag
					className={styles.box}
					onDrag={() => setdrag(true)}
					// onDrag={(e, i) => {
					//     setdrag(true)
					//     console.log(i.offset)
					// }}
					onDragEnd={() => setdrag(false)}
					dragConstraints={constraintsRef}
					dragTransition={
						modifyTarget
							? {
									power: 0.5,
									timeConstant: 100,
									modifyTarget: (target) => {
										let newTarget =
											Math.round(target / gridSize) *
											gridSize
										// console.log(target)
										return newTarget
									},
							  }
							: {
									power: 0.5,
									timeConstant: 100,
							  }
					}
				></motion.div>
			</div>
			<div
				style={{
					position: 'absolute',
					bottom: 20,
					left: '50%',
					transform: 'translateX(-50%)',
				}}
			>
				<SingleCheckBox
					value={modifyTarget}
					setValue={setmodifyTarget}
					id="modifyTarget"
					content="modifyTarget"
				/>
			</div>
		</div>
	)
}
