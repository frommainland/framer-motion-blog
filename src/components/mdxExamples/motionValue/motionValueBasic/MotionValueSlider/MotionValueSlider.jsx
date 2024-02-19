'use client'
import React from 'react'
import styles from './MotionValueSlider.module.scss'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useMeasure } from '@uidotdev/usehooks'

export default function MotionValueSlider() {
	const [ref, { width, height }] = useMeasure()
	const handleSize = 60
	const x = useMotionValue(0)
	const leftPanelWidth = useTransform(() => width / 2 + x.get())
	const rightPanelWidth = useTransform(() => width / 2 - x.get())
	const leftScale = useTransform(x, [-width / 2, 0, width / 2], [0.5, 1, 2])
	const rightScale = useTransform(x, [-width / 2, 0, width / 2], [2, 1, 0.5])

	return (
		<div className={styles.wrap}>
			<div className={styles.sliderWrap} ref={ref}>
				<motion.div
					className={styles.leftPanel}
					style={{
						width: leftPanelWidth,
						borderTopLeftRadius: (height * 2) / 9,
						borderBottomLeftRadius: (height * 2) / 9,
						borderTopRightRadius: (height * 1) / 18,
						borderBottomRightRadius: (height * 1) / 18,
					}}
				>
					<motion.div style={{ scale: leftScale }} />
				</motion.div>
				<motion.div
					className={styles.handle}
					drag="x"
					style={{
						left: width / 2 - handleSize / 2,
						top: height / 2 - handleSize / 2,
						x,
					}}
					dragConstraints={{
						left: -(width / 2 - handleSize / 2),
						right: width / 2 - handleSize / 2,
					}}
				>
					<ChevronLeft color="var(--color-text-200)" />
					<ChevronRight color="var(--color-text-200)" />
				</motion.div>

				<motion.div
					className={styles.rightPanel}
					style={{
						width: rightPanelWidth,
						borderTopLeftRadius: (height * 1) / 18,
						borderBottomLeftRadius: (height * 1) / 18,
						borderTopRightRadius: (height * 2) / 9,
						borderBottomRightRadius: (height * 2) / 9,
					}}
				>
					<motion.div style={{ scale: rightScale }} />
				</motion.div>
			</div>
		</div>
	)
}
