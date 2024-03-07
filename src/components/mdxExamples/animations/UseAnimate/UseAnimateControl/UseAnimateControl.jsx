'use client'
import React from 'react'
import styles from './UseAnimateControl.module.scss'
import { motion, useAnimate } from 'framer-motion'
import { Play, Pause, StopCircle, X, SkipForward } from 'react-feather'
import { useMeasure } from '@uidotdev/usehooks'

export default function UseAnimateControl() {
	const [scope, animate] = useAnimate()

	const [measureRef, { width }] = useMeasure()
	const anim = React.useRef(null)
	const [state, setState] = React.useState('pause')

	React.useEffect(() => {
		anim.current = animate(
			scope.current,
			{ x: width - 120 - 32 * 2 },
			{ repeat: Infinity, repeatType: 'mirror', duration: 3 }
		)
		anim.current.pause()
	}, [width])

	return (
		<div className={styles.wrap} ref={measureRef}>
			<motion.div
				ref={scope}
				className={styles.item}
				whileTap={{ scale: 0.9 }}
			></motion.div>
			<div className={styles.controlWrap}>
				<motion.div
					className={styles.control}
					whileTap={{ scale: 0.9 }}
					onClick={() => {
						setState('play')
						anim.current.play()
						anim.current.speed = 1
					}}
					data-clicked={'play' === state}
				>
					<Play color="var(--color-text-100)" />
					<p>play</p>
				</motion.div>
				<motion.div
					className={styles.control}
					whileTap={{ scale: 0.9 }}
					onClick={() => {
						setState('speed')
						anim.current.play()
						anim.current.speed = 0.1
					}}
					data-clicked={'speed' === state}
				>
					<SkipForward color="var(--color-text-100)" />
					<p>0.1x speed</p>
				</motion.div>
				<motion.div
					className={styles.control}
					whileTap={{ scale: 0.9 }}
					onClick={() => {
						anim.current.pause()
						setState('pause')
					}}
					data-clicked={'pause' === state}
				>
					<Pause color="var(--color-text-100)" />
					<p>pause</p>
				</motion.div>

				<motion.div
					className={styles.control}
					whileTap={{ scale: 0.9 }}
					onClick={() => {
						setState('cancel')
						anim.current.play()
						anim.current.cancel()
					}}
					data-clicked={'cancel' === state}
				>
					<X color="var(--color-text-100)" />
					<p>cancel</p>
				</motion.div>
				<motion.div
					className={styles.control}
					whileTap={{ scale: 0.9 }}
					onClick={() => {
						setState('complete')
						anim.current.play()
						anim.current.complete()
					}}
					data-clicked={'complete' === state}
				>
					<SkipForward color="var(--color-text-100)" />
					<p>complete</p>
				</motion.div>

				<motion.div
					className={`${styles.control} ${styles.stop}`}
					whileTap={{ scale: 0.9 }}
					onClick={() => {
						anim.current.stop()
						setState('stop')
					}}
					data-clicked={'stop' === state}
				>
					<StopCircle color="var(--color-text-100)" />
					<p>stop</p>
				</motion.div>
			</div>
		</div>
	)
}
