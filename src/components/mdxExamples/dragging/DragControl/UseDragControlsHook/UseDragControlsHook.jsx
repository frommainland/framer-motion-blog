'use client'
import React from 'react'
import styles from './UseDragControlsHook.module.scss'
import { motion, useDragControls } from 'framer-motion'

export default function UseDragControlsHook() {
	const constraintsRef = React.useRef(null)
	const dragControls = useDragControls()
	return (
		<div className={styles.wrap} ref={constraintsRef}>
			<div
				className={styles.useDragControlArea}
				onPointerDown={(event) => dragControls.start(event)}
			>
				<motion.div
					drag
					className={styles.box}
					dragConstraints={constraintsRef}
					dragControls={dragControls}
				></motion.div>
			</div>
		</div>
	)
}
