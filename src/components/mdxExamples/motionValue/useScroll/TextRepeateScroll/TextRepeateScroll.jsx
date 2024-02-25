'use client'
import React, { use, useTransition } from 'react'
import {
	motion,
	useMotionValueEvent,
	useScroll,
	useTransform,
	useSpring,
	useMotionTemplate,
} from 'framer-motion'
import styles from './TextRepeateScroll.module.scss'
import { useMeasure } from '@uidotdev/usehooks'
import { range } from '@/utils'
import SingleCheckBox from '@/components/SingleCheckBox'

function Item({
	scrollYProgress,
	children,
	direction,
	yDis,
	yMass,
	delayDis,
	markersState,
}) {
	let mathAbsDelayDis = Math.abs(delayDis * direction)
	const y = useTransform(
		scrollYProgress,
		[0, mathAbsDelayDis, (1 - mathAbsDelayDis) / 2, 1],
		[0, 0, yDis * direction, 0]
	)
	const ySpring = useSpring(y, { mass: 0.05 })
	const yDistemplate = useMotionTemplate`${ySpring}%`
	return (
		<motion.span
			className={styles.item}
			style={{
				y: yDistemplate,
				borderColor: markersState
					? 'var(--color-accent-yellow)'
					: 'var(--color-surface-100)',
			}}
		>
			{children}
		</motion.span>
	)
}

export default function TextRepeateScroll() {
	const [wrapRef, { width, height }] = useMeasure()
	const containerRef = React.useRef(null)
	const textWrapRef = React.useRef(null)
	const { scrollYProgress } = useScroll({
		container: containerRef,
		target: textWrapRef,
		offset: ['start .9', 'end .1'],
	})

	const totalWords = 7
	const increment = 10

	// visually not working
	// const yDisArray = range(totalWords).map((item) => {
	// 	return (
	// 		((item % Math.floor(totalWords / 2)) - Math.floor(totalWords / 2)) *
	// 		increment
	// 	)
	// })

	// visually looks nice
	const yDisArray = [-60, -50, -30, -60, -50, -30, -60]

	const massIncrement = 0.3
	const yMass = range(totalWords).map((item) => {
		return ((item % Math.floor(totalWords / 2)) + 0.3) * massIncrement
	})

	// it will delay the ydis, make the crisp egdes not showing the same height
	const delayDisIncrement = 0.1
	const delayDis = range(totalWords).map((item) => {
		return (
			((item % Math.floor(totalWords / 2)) - Math.floor(totalWords / 2)) *
			delayDisIncrement
		)
	})

	const [textMeasureRef, { width: textMeasureWidth }] = useMeasure()

	// checkbox state
	const [markersState, setMarkersState] = React.useState(false)

	return (
		<div data-name="fake-container" ref={wrapRef}>
			<div className={styles.wrap} ref={containerRef}>
				<p
					style={{
						position: 'sticky',
						top: height * 0.9 - 16,
						marginBottom: 0,
						marginRight: '.5em',
						textAlign: 'right',
						zIndex: 100,
						visibility: markersState ? 'visible' : 'hidden',
					}}
				>
					<code>endViewport</code>
				</p>

				<p
					style={{
						position: 'sticky',
						top: height * 0.1 - 16,
						marginBottom: 0,
						marginRight: '.5em',
						textAlign: 'right',
						zIndex: 100,
						visibility: markersState ? 'visible' : 'hidden',
					}}
				>
					<code>startViewport</code>
				</p>

				<div
					className={styles.checkboxWrap}
					style={{ top: height - 100 }}
				>
					<SingleCheckBox
						content="show markers"
						id="text-repeate-scroll-overflow"
						value={markersState}
						setValue={setMarkersState}
					/>
				</div>

				<div
					data-name="fake-content"
					style={{ height: 2.2 * height }}
				></div>

				<motion.div
					className={styles.textWrap}
					style={{
						top: height,
						left: (width - textMeasureWidth) / 2,
					}}
					ref={textWrapRef}
				>
					<div data-name="fake-textWrap" ref={textMeasureRef}>
						{range(totalWords).map((item) => {
							let direction
							if (item == totalWords - 1) {
								direction = 0
							} else if (item < totalWords / 2 - 1) {
								direction = -1
							} else {
								direction = 1
							}
							return (
								<Item
									key={item}
									scrollYProgress={scrollYProgress}
									direction={direction}
									yDis={yDisArray[item]}
									increment={increment}
									yMass={yMass[item]}
									delayDis={delayDis[item]}
									markersState={markersState}
								>
									GALEXIO
								</Item>
							)
						})}
					</div>
				</motion.div>
			</div>
		</div>
	)
}
