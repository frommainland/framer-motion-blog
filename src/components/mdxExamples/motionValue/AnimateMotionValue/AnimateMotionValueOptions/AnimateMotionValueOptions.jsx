'use client'
import React from 'react'
import styles from './AnimateMotionValueOptions.module.scss'
import {
	animate,
	motion,
	useMotionValue,
	useMotionValueEvent,
} from 'framer-motion'

export default function AnimateMotionValueOptions() {
	const backgroundSizeBig = '50px 50px'

	const backgroundSizeSmall = '1px 1px'

	const dragContainerRef = React.useRef(null)
	const y = useMotionValue(0)
	const [bgImgSize, setBgImgSize] = React.useState(backgroundSizeSmall)

	const [updateValue, setUpdateValue] = React.useState(null)

	return (
		<div className={styles.wrap}>
			<div className={styles.areaWrap} ref={dragContainerRef}>
				<motion.div
					className={styles.item}
					drag="y"
					dragConstraints={dragContainerRef}
					style={{ y }}
					animate={{ backgroundSize: bgImgSize }}
				>
					{updateValue}
				</motion.div>
			</div>

			<div className={styles.buttons}>
				<motion.button
					whileTap={{ scale: 0.95 }}
					whileHover={{ backgroundColor: 'var(--color-surface-300)' }}
					onTap={() => {
						if (y.get() !== -150) {
							setBgImgSize(backgroundSizeBig)
							animate(y, -150, {
								duration: 1,
								onUpdate: (v) => setUpdateValue(v.toFixed(0)),
							}).then(() => setBgImgSize(backgroundSizeSmall))
						}
					}}
				>
					-150
				</motion.button>
				<motion.button
					whileTap={{ scale: 0.95 }}
					whileHover={{ backgroundColor: 'var(--color-surface-300)' }}
					onTap={() => {
						if (y.get() !== 0) {
							setBgImgSize(backgroundSizeBig)
							animate(y, 0, {
								duration: 1,
								onUpdate: (v) => setUpdateValue(v.toFixed(0)),
							}).then(() => setBgImgSize(backgroundSizeSmall))
						}
					}}
				>
					0
				</motion.button>
				<motion.button
					whileTap={{ scale: 0.95 }}
					whileHover={{ backgroundColor: 'var(--color-surface-300)' }}
					onTap={() => {
						if (y.get() !== 150) {
							setBgImgSize(backgroundSizeBig)
							animate(y, 150, {
								type: 'spring',
								stiffness: 300,
								onUpdate: (v) => setUpdateValue(v.toFixed(0)),
							}).then(() => setBgImgSize(backgroundSizeSmall))
						}
					}}
				>
					150
				</motion.button>
			</div>
		</div>
	)
}
