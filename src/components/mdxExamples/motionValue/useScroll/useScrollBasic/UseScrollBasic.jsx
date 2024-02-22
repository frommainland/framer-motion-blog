'use client'
import React from 'react'
import styles from './UseScrollBasic.module.scss'
import {
	motion,
	useMotionValueEvent,
	useScroll,
	useSpring,
} from 'framer-motion'

export default function UseScrollBasic() {
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

	const [isComplete, setIsComplete] = React.useState(false)

	useMotionValueEvent(scrollYProgress, 'change', (v) => {
		if (v >= 1) {
			setIsComplete(true)
		} else {
			setIsComplete(false)
		}
	})

	// how to add two refs on one div
	// ref={(el) => {
	//     ref.current = el
	//     containerRef.current = el
	// }}

	return (
		<div className={styles.wrap} ref={containerRef}>
			<motion.div
				className={styles.indicator}
				style={{ scaleX: scrollYProgress, originX: 0 }}
			></motion.div>

			<motion.div
				className={styles.indicator2}
				style={{ scaleX, originX: 0 }}
			></motion.div>

			<p
				style={{
					position: 'sticky',
					top: 40,
					marginBottom: 0,
					marginLeft: '2em',
				}}
			>
				scrollY:&nbsp;<code>{scrollYValue}</code>
			</p>
			<p style={{ position: 'sticky', top: 80, marginLeft: '2em' }}>
				scrollYProgress:&nbsp;
				<motion.code>{scrollYProgress}</motion.code>
			</p>

			<div className={styles.test}></div>
			<div className={styles.endMessage}>
				<svg
					width={25}
					height={25}
					viewBox="0 0 25 25"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					style={{ marginBottom: '1.25em' }}
				>
					<motion.path
						d="M4.5 13L9.5 18L20.5 7"
						stroke="var(--color-accent-green)"
						strokeWidth={2}
						strokeLinecap="round"
						strokeLinejoin="round"
						animate={{ pathLength: isComplete ? 1 : 0 }}
					/>
				</svg>

				<p className={styles.last}>you have reached the end</p>
			</div>
		</div>
	)
}
