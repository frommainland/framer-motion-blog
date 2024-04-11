'use client'
import React from 'react'
import styles from './DragMomentum.module.scss'
import { motion } from 'framer-motion'
import SingleCheckBox from '@/components/SingleCheckBox'

export default function DragMomentum() {
	const constraintsRef = React.useRef(null)
	const [dragMomentum, setdragMomentum] = React.useState(true)
	return (
		<div className={styles.wrap} ref={constraintsRef}>
			<motion.div
				drag
				className={styles.box}
				dragConstraints={constraintsRef}
				dragMomentum={dragMomentum}
			></motion.div>
			<div
				style={{
					position: 'absolute',
					bottom: 20,
					left: '50%',
					transform: 'translateX(-50%)',
				}}
			>
				<SingleCheckBox
					value={dragMomentum}
					setValue={setdragMomentum}
					id="dragMomentum"
					content="dragMomentum"
				/>
			</div>
		</div>
	)
}
