'use client'
import React from 'react'
import styles from './ScrollOffset.module.scss'
import {
	easeIn,
	motion,
	useMotionValueEvent,
	useScroll,
	useSpring,
	useTransform,
} from 'framer-motion'
import { useMeasure } from '@uidotdev/usehooks'

function Box({
	startElement,
	startViewport,
	endElement,
	endViewport,
	containerRef,
	measureRefWidth,
	containerRefHeight,
}) {
	// A ref to pass to the element
	const ref = React.useRef(null)

	// This element’s scroll progress·
	const { scrollYProgress } = useScroll({
		// container is default to viewport, but you can change it
		container: containerRef,
		target: ref,
		offset: [
			`${startElement} ${startViewport}`,
			`${endElement} ${endViewport}`,
		],
		// offset: ['end end', 'start start'],
        layoutEffect: false
	})

	const [progress, setProgress] = React.useState(0)
	useMotionValueEvent(scrollYProgress, 'change', (v) => {
		setProgress(v.toFixed(2))
	})

	const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])
	const x = useTransform(scrollYProgress, [0, 1], [0, measureRefWidth / 2], {
		ease: easeIn,
	})

	return (
		<motion.div
			className={styles.box}
			ref={ref}
			style={{ x, top: containerRefHeight }}
		>
			{progress}
		</motion.div>
	)
}

function Box2({
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
        layoutEffect: false
	})

	const [progress, setProgress] = React.useState(0)
	useMotionValueEvent(scrollYProgress, 'change', (v) => {
		setProgress(v.toFixed(2))
	})

	const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])
	const x = useTransform(scrollYProgress, [0, 1], [0, measureRefWidth / 2])
	// const xSpring = useSpring(x, {
	// 	stiffness: 500,
	// 	damping: 100,
	// 	restDelta: 0.001,
	// })
	const xSpring = useSpring(x, { mass: 0.01 })

	return (
		<motion.div
			className={styles.ghost}
			ref={ref}
			style={{ x: xSpring, top: containerRefHeight }}
		>
			{progress}
		</motion.div>
	)
}

export default function ScrollOffset() {
	const containerRef = React.useRef(null)
	const { scrollYProgress } = useScroll({ container: containerRef })
	const scaleX = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001,
	})

	const { scrollY } = useScroll({ container: containerRef })

	const [scrollYValue, setScrollYValue] = React.useState(scrollY.get())
	useMotionValueEvent(scrollY, 'change', (v) => {
		setScrollYValue(v)
	})

	const [measureRef, { width: measureRefWidth }] = useMeasure()
	const containerRefHeight = 600
	const offset = 100

	return (
		<div
			className={styles.wrap}
			ref={containerRef}
			style={{ height: containerRefHeight }}
		>
			<div ref={measureRef}>
				<div className={styles.legend}>
					<div className={styles.item}>
						<div className={styles.itemIcon}></div>
						<p>useTransform</p>
					</div>
					<div className={styles.item}>
						<div className={styles.itemIcon2}></div>
						<p>useSpring</p>
					</div>
				</div>
				<p
					style={{
						position: 'sticky',
						top: offset - 16,
						marginBottom: 0,
						marginRight: '.5em',
						textAlign: 'right',
					}}
				>
					<code>endViewport</code>
				</p>

				<p
					style={{
						position: 'sticky',
						top: containerRefHeight - offset - 16,
						marginBottom: 0,
						marginRight: '.5em',
						textAlign: 'right',
					}}
				>
					<code>startViewport</code>
				</p>

				<Box
					startElement="start"
					startViewport={`${containerRefHeight - offset}px`}
					endElement="start"
					endViewport={`${offset}px`}
					containerRef={containerRef}
					measureRefWidth={measureRefWidth}
					containerRefHeight={containerRefHeight}
				/>
				<Box2
					startElement="start"
					startViewport={`${containerRefHeight - offset}px`}
					endElement="start"
					endViewport={`${offset}px`}
					containerRef={containerRef}
					measureRefWidth={measureRefWidth}
					containerRefHeight={containerRefHeight}
				/>

				<div style={{ height: 2 * containerRefHeight }}></div>
			</div>
		</div>
	)
}
