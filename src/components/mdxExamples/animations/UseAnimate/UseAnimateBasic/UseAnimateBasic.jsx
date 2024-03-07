'use client'
import React from 'react'
import styles from './UseAnimateBasic.module.scss'
import { motion, useAnimate } from 'framer-motion'

export default function UseAnimateBasic() {
	const dragConstaintRef = React.useRef(null)

	const [scope, animate] = useAnimate()
	let timer = React.useRef(null)

	return (
		<div className={styles.wrap} ref={dragConstaintRef}>
			<div className={styles.centerDot}></div>
			<motion.div
				ref={scope}
				className={styles.item}
				whileTap={{ scale: 0.9 }}
				drag
				dragConstraints={dragConstaintRef}
				onDragEnd={() => {
					timer = setTimeout(
						() =>
							animate(
								scope.current,
								{ x: 0, y: 0 },
								{ type: 'spring', duration: 0.8, bounce: 0.5 }
							),
						600
					)
				}}
				onDragStart={() => clearTimeout(timer)}
			></motion.div>
		</div>
	)
}
