'use client'
import React from 'react'
import styles from './OffsetConfig.module.scss'
import {
	easeIn,
	motion,
	useMotionValueEvent,
	useScroll,
	useSpring,
	useTransform,
} from 'framer-motion'
import { useMeasure } from '@uidotdev/usehooks'

import SingleSlider from '@/components/SingleSlider'

import RestartDemoWrap from '@/components/RestartDemoWrap'

function Box({
	startElement,
	startViewport,
	endElement,
	endViewport,
	containerRef,
	measureRefWidth,
	containerRefHeight,
}) {
	const ref = React.useRef(null)

	const { scrollYProgress } = useScroll({
		container: containerRef,
		target: ref,
		offset: [
			`${startElement} ${startViewport}`,
			`${endElement} ${endViewport}`,
		],
	})

	const [scrollV, setScrollV] = React.useState(0)

	const [inViewStatus, setInViewStatus] = React.useState(false)
	useMotionValueEvent(scrollYProgress, 'change', (v) => {
		if (v > 0 && v < 1) {
			setInViewStatus(true)
		} else {
			setInViewStatus(false)
		}
		setScrollV(v.toFixed(2))
	})

	const boxHeight = 100
	return (
		<motion.div
			className={styles.box}
			ref={ref}
			style={{
				top: containerRefHeight,
				left: measureRefWidth / 2 - boxHeight,
				color: inViewStatus
					? 'var(--color-accent-green)'
					: 'var(--color-accent-red)',
			}}
		>
			{inViewStatus.toString()}
			<br />
			{scrollV}
			<div
				className={styles.startEle}
				style={{ top: startElement * boxHeight }}
			>
				startElement
			</div>
			<div
				className={styles.endEle}
				style={{ top: endElement * boxHeight }}
			>
				endElement
			</div>
		</motion.div>
	)
}

export default function OffsetConfig() {
	const containerRef = React.useRef(null)

	// const { scrollY } = useScroll({ container: containerRef })

	// const [scrollYValue, setScrollYValue] = React.useState(scrollY.get())
	// useMotionValueEvent(scrollY, 'change', (v) => {
	// 	setScrollYValue(v)
	// })

	const [measureRef, { width: measureRefWidth }] = useMeasure()
	const containerRefHeight = 600

	const [startElementValues, setstartElementValues] = React.useState(0)
	const [startViewportValues, setstartViewportValues] = React.useState(0.8)
	const [endElementValues, setEndElementValues] = React.useState(1)
	const [endViewportValues, setEndViewportValues] = React.useState(0.2)

	return (
		<div
			className={styles.wrap}
			ref={containerRef}
			style={{ height: containerRefHeight }}
		>
			<div ref={measureRef} style={{ height: 2 * containerRefHeight }}>
				<p
					style={{
						position: 'sticky',
						top: containerRefHeight * endViewportValues,
						marginBottom: 0,
						marginRight: '.5em',
						textAlign: 'right',
					}}
				>
					<code style={{ color: 'var(--color-accent-yellow)' }}>
						endViewport
					</code>
				</p>

				<p
					style={{
						position: 'sticky',
						top: containerRefHeight * startViewportValues,
						marginBottom: 0,
						marginRight: '.5em',
						textAlign: 'right',
					}}
				>
					<code style={{ color: 'var(--color-accent-purple)' }}>
						startViewport
					</code>
				</p>

				<Box
					startElement={startElementValues}
					startViewport={startViewportValues}
					endElement={endElementValues}
					endViewport={endViewportValues}
					containerRef={containerRef}
					measureRefWidth={measureRefWidth}
					containerRefHeight={containerRefHeight}
				/>

				<div className={styles.sliderWrap}>
					<SingleSlider
						label="startElement"
						id="startElement"
						min={0}
						max={1}
						step={0.01}
						value={startElementValues}
						setValue={setstartElementValues}
					/>

					<SingleSlider
						label="startViewport"
						id="startViewport"
						min={0}
						max={1}
						step={0.01}
						value={startViewportValues}
						setValue={setstartViewportValues}
					/>

					<SingleSlider
						label="endElement"
						id="endElement"
						min={0}
						max={1}
						step={0.01}
						value={endElementValues}
						setValue={setEndElementValues}
					/>

					<SingleSlider
						label="endViewport"
						id="endViewport"
						min={0}
						max={1}
						step={0.01}
						value={endViewportValues}
						setValue={setEndViewportValues}
					/>
				</div>
				<div
					style={{
						height: 2 * containerRefHeight,
						position: 'absolute',
						top: 0,
					}}
				></div>
			</div>
		</div>
	)
}
