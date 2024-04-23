'use client'
import React from 'react'
import styles from './UseStateSlider.module.scss'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { motion } from 'framer-motion'
import { useMeasure } from '@uidotdev/usehooks'

export default function UseStateSlider() {
	const [ref, { width: wrapWidth, height: wrapHeight }] = useMeasure()
	const handleSize = 60
	const [initialHandleX, setInitialHandleX] = React.useState(0)
	const [handleX, setHandleX] = React.useState(0)

	const handleRef = React.useRef()

	React.useEffect(() => {
		setInitialHandleX(handleRef.current.getBoundingClientRect().x)
		setHandleX(handleRef.current.getBoundingClientRect().x)
	}, [])

	return (
		<div className={styles.wrap}>
			<div className={styles.sliderWrap} ref={ref}>
				<motion.div
					className={styles.leftPanel}
					style={{
						width: handleX - initialHandleX,
						borderTopLeftRadius: (wrapHeight * 2) / 9,
						borderBottomLeftRadius: (wrapHeight * 2) / 9,
						borderTopRightRadius: (wrapHeight * 1) / 18,
						borderBottomRightRadius: (wrapHeight * 1) / 18,
					}}
				>
					<motion.div />
				</motion.div>
				<motion.div
					className={styles.handle}
					drag="x"
					ref={handleRef}
					onDrag={() =>
						setHandleX(handleRef.current.getBoundingClientRect().x)
					}
					style={{
						left: wrapWidth / 2 - handleSize / 2,
						top: wrapHeight / 2 - handleSize / 2,
					}}
					dragConstraints={{
						left: -(wrapWidth / 2 - handleSize / 2),
						right: wrapWidth / 2 - handleSize / 2,
					}}
				>
					<ChevronLeft color="var(--color-text-200)" />
					<ChevronRight color="var(--color-text-200)" />
				</motion.div>

				<motion.div
					className={styles.rightPanel}
					style={{
						width: wrapWidth - (handleX - initialHandleX),
						borderTopLeftRadius: (wrapHeight * 1) / 18,
						borderBottomLeftRadius: (wrapHeight * 1) / 18,
						borderTopRightRadius: (wrapHeight * 2) / 9,
						borderBottomRightRadius: (wrapHeight * 2) / 9,
					}}
				>
					<motion.div />
				</motion.div>
			</div>
		</div>
	)
}
