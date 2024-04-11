'use client'
import React from 'react'
import styles from './DragConstraints.module.scss'
import { motion } from 'framer-motion'
import SingleCheckBox from '@/components/SingleCheckBox'

export default function DragConstraints() {
	const constraintsRef = React.useRef(null)
	const [dragConstraints, setdragConstraints] = React.useState(true)
	return (
		<div className={styles.wrap} ref={constraintsRef}>
			<motion.div
				drag
				className={styles.box}
				dragConstraints={constraintsRef}
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
					value={dragConstraints}
					setValue={setdragConstraints}
					id="dragConstraints"
					content="dragConstraints"
				/>
			</div>
		</div>
	)
}
