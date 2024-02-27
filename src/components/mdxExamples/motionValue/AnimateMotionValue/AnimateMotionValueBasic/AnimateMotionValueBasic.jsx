'use client'
import React from 'react'
import styles from './AnimateMotionValueBasic.module.scss'
import {
	animate,
	motion,
	useMotionValue,
	useMotionValueEvent,
} from 'framer-motion'

export default function AnimateMotionValueBasic() {
	const dragContainerRef = React.useRef(null)
	const y = useMotionValue(0)
	return (
		<div className={styles.wrap}>
			<div className={styles.areaWrap} ref={dragContainerRef}>
				<motion.div
					className={styles.item}
					drag="y"
					dragConstraints={dragContainerRef}
					style={{ y }}
				></motion.div>
			</div>
			<div className={styles.buttons}>
				<motion.button
					whileTap={{ scale: 0.95 }}
					whileHover={{ backgroundColor: 'var(--color-surface-300)' }}
					onTap={() => animate(y, -150, { duration: 1 })}
				>
					-150
				</motion.button>
				<motion.button
					whileTap={{ scale: 0.95 }}
					whileHover={{ backgroundColor: 'var(--color-surface-300)' }}
					onTap={() => animate(y, 0)}
				>
					0
				</motion.button>
				<motion.button
					whileTap={{ scale: 0.95 }}
					whileHover={{ backgroundColor: 'var(--color-surface-300)' }}
					onTap={() =>
						animate(y, 150, {
							type: 'spring',
							stiffness: 300,
						})
					}
				>
					150
				</motion.button>
			</div>
		</div>
	)
}
