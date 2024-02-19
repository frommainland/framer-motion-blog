'use client'
import React from 'react'
import styles from './OutputFormat.module.scss'
import {
	motion,
	useMotionValue,
	useMotionValueEvent,
	useTransform,
	useMotionTemplate,
	easeInOut,
} from 'framer-motion'
import { useMeasure } from '@uidotdev/usehooks'
import { ChevronDown, ChevronUp } from 'react-feather'

export default function OutputFormat() {
	const handleHeight = 90
	const [ref, { height }] = useMeasure()

	const y = useMotionValue(0)
	const [ystate, setYState] = React.useState(y.get())
	useMotionValueEvent(y, 'change', (v) => setYState(v.toFixed(0)))

	const valueA = useTransform(
		y,
		[0, (height - handleHeight) / 2, height - handleHeight],
		[5, 30, 5]
	)

	const valueC = useTransform(
		y,
		[
			0,
			(height - handleHeight) / 3,
			((height - handleHeight) / 3) * 2,
			height - handleHeight,
		],
		['#2C2D29', '#F3B53F', '#8874E3', '#2C2D29']
	)

	const backgroundImage2 = useTransform(
		y,
		[
			0,
			(height - handleHeight) / 3,
			((height - handleHeight) / 3) * 2,
			height - handleHeight,
		],
		[
			'repeating-linear-gradient(45deg, #2C2D29 0, #2C2D29 1px, var(--color-surface-100) 0, var(--color-surface-100) 50%)',
			'repeating-linear-gradient(135deg, #F3B53F 0, #F3B53F 1px, var(--color-surface-100) 0, var(--color-surface-100) 50%)',
			'repeating-linear-gradient(225deg, #8874E3 0, #8874E3 1px, var(--color-surface-100) 0, var(--color-surface-100) 50%)',
			'repeating-linear-gradient(315deg, #2C2D29 0, #2C2D29 1px, var(--color-surface-100) 0, var(--color-surface-100) 50%)',
		]
	)

	const backgroundSize = useMotionTemplate`${valueA}px ${valueA}px`

	const gradient = useTransform(
		y,
		[0, (height - handleHeight) / 2, height - handleHeight],
		[
			'radial-gradient(circle at 0% 0%, #2C2D29, #42433D)',
			'radial-gradient(circle at 100% 100%, #1C6F59, #52EFCC)',
			'radial-gradient(circle at 0% 0%, #2C2D29, #42433D)',
		],
		{ ease: easeInOut }
	)

	return (
		<div className={styles.wrap}>
			<div className={styles.containner}>
				<div className={styles.itemsWrap}>
					<div className={styles.item}>
						<div
							className={`${styles.number} ${styles.variant1}`}
							style={{
								backgroundSize: backgroundSize.get(),
							}}
						></div>
						<p>multiple ends</p>
					</div>
					<div className={styles.item}>
						<div
							className={`${styles.number} ${styles.variant2}`}
							style={{ backgroundImage: gradient.get() }}
						></div>
						<p>css value transform</p>
					</div>
					<div className={styles.item}>
						<div
							className={`${styles.number} ${styles.variant3}`}
							style={{
								backgroundImage: backgroundImage2.get(),
							}}
						></div>
						<p>color value transform</p>
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
