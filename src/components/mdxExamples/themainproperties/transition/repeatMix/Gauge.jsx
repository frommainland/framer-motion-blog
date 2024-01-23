'use client'
import React from 'react'
import styles from './Gauge.module.scss'
import { motion } from 'framer-motion'
import { useMeasure } from '@uidotdev/usehooks'

export default function Gauge({ repeatType, animOptions }) {
	const { duration, repeatDelay } = animOptions
	const [ref, { width }] = useMeasure()
	const ease =
		repeatType === 'reverse' ? ['easeIn', 'easeOut'] : ['easeIn', 'easeIn']
	return (
		<div className={styles.gauge}>
			<p>{repeatType}</p>
			<div className={styles.meter} ref={ref}>
				<div className={styles.middleMeterWrap}>
					<div className={styles.middleMeter}></div>
					<p>t/2</p>
				</div>
				<motion.div
					className={styles.meterHand}
					animate={{ x: [0, width / 2, width] }}
					transition={{
						duration: duration * 2,
						ease: ease,
						repeat: Infinity,
						repeatType: 'loop',
					}}
				></motion.div>
			</div>
		</div>
	)
}
