'use client'
import React from 'react'
import styles from './UseStateSlider.module.scss'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { motion } from 'framer-motion'
import { useMeasure } from '@uidotdev/usehooks'

export default function UseStateSlider() {
	const [ref, { width: wrapWidth, height: wrapHeight }] = useMeasure()
	const leftPanelRef = React.useRef(null)
	const handleSize = 60
	const handleRef = React.useRef(null)
	const [initialHandleX, setInitialHandleX] = React.useState(0)
	const [handleX, setHandleX] = React.useState(0)
	const [leftPanelX, setLeftPanelX] = React.useState(0)

	React.useEffect(() => {
		setInitialHandleX(handleRef.current.getBoundingClientRect().x)
		setHandleX(handleRef.current.getBoundingClientRect().x)
		setLeftPanelX(leftPanelRef.current.getBoundingClientRect().x)
	}, [])

	return (
		<div className={styles.wrap}>
			<div className={styles.sliderWrap} ref={ref}>
				<motion.div
					className={styles.leftPanel}
					style={{
						width:
							handleX -
							initialHandleX -
							leftPanelX +
							wrapWidth / 2 +
							handleSize,

						borderTopLeftRadius: (wrapHeight * 2) / 9,
						borderBottomLeftRadius: (wrapHeight * 2) / 9,
						borderTopRightRadius: (wrapHeight * 1) / 18,
						borderBottomRightRadius: (wrapHeight * 1) / 18,
					}}
					ref={leftPanelRef}
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
						width:
							wrapWidth / 2 -
							(handleX - initialHandleX - leftPanelX) -
							handleSize,
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
