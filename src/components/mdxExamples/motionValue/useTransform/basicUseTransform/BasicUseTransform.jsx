'use client'
import React from 'react'
import styles from './BasicUseTransform.module.scss'
import {
	backIn,
	clamp,
	motion,
	useMotionValue,
	useMotionValueEvent,
	useTransform,
} from 'framer-motion'
import { useMeasure } from '@uidotdev/usehooks'
import { ChevronDown, ChevronUp } from 'react-feather'

export default function BasicUseTransform() {
	const items = ['default', 'with ease function', 'clamp disabled']
	const handleHeight = 90
	const [ref, { height }] = useMeasure()

	const y = useMotionValue(0)
	const [ystate, setYState] = React.useState(y.get())
	useMotionValueEvent(y, 'change', (v) => setYState(v.toFixed(0)))

	const valueA = useTransform(y, [0, height - handleHeight], [0, 20])
	const valueB = useTransform(y, [0, height - handleHeight], [0, 20], {
		ease: backIn,
	})
	const valueC = useTransform(y, [0, height - handleHeight], [0, 20], {
		clamp: false,
	})

	return (
		<div className={styles.wrap}>
			<div className={styles.containner}>
				<div className={styles.itemsWrap}>
					<div className={styles.item}>
						<div className={`${styles.number} ${styles.variant1}`}>
							{valueA.get().toFixed(0)}
						</div>
						<p>default</p>
					</div>
					<div className={styles.item}>
						<div className={`${styles.number} ${styles.variant2}`}>
							{valueB.get().toFixed(0)}
						</div>
						<p>with ease function</p>
					</div>
					<div className={styles.item}>
						<div className={`${styles.number} ${styles.variant3}`}>
							{valueC.get().toFixed(0)}
						</div>
						<p>clamp disabled</p>
					</div>
				</div>
				<div className={styles.handleWrap} ref={ref}>
					<motion.div
						className={styles.handle}
						drag="y"
						dragConstraints={{
							top: 0,
							bottom: height - handleHeight,
						}}
						dragTransition={{ power: 1 }}
						style={{ height: handleHeight, y }}
					>
						<ChevronUp color="var(--color-text-300)" />
						<ChevronDown color="var(--color-text-300)" />
					</motion.div>
					<div className={styles.line}></div>
				</div>
			</div>
		</div>
	)
}
