'use client'
import React from 'react'
import styles from './DraggingBasicDragPropagation.module.scss'
import { motion } from 'framer-motion'
import SingleCheckBox from '@/components/SingleCheckBox'

export default function DraggingBasicDragPropagation() {
	const constraintsRef = React.useRef(null)
	const [dragPropagation, setdragPropagation] = React.useState(false)
	return (
		<div className={styles.wrap} ref={constraintsRef}>
			<motion.div
				drag
				dragPropagation={dragPropagation}
				dragConstraints={constraintsRef}
				style={{
					width: 100,
					height: 100,
					backgroundColor: 'var(--color-accent-blue)',
					cursor: 'grab',
				}}
			>
				<motion.div
					drag
					dragConstraints={constraintsRef}
					style={{
						width: 50,
						height: 50,
						backgroundColor: 'var(--color-accent-yellow)',
						cursor: 'grab',
					}}
				/>
			</motion.div>
			<div
				style={{
					position: 'absolute',
					bottom: 20,
					left: '50%',
					transform: 'translateX(-50%)',
				}}
			>
				<SingleCheckBox
					value={dragPropagation}
					setValue={setdragPropagation}
					id="dragPropagation"
					content="dragPropagation"
				/>
			</div>
		</div>
	)
}
