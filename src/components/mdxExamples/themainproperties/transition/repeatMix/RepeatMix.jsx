'use client'
import React from 'react'
import { easeIn, motion } from 'framer-motion'
import styles from './RepeatMix.module.scss'
import Petal from './Petal'
import Gauge from './Gauge'

export default function RepeatMix() {
	const animOptions = {
		duration: 1.2,
		repeatDelay: 1,
	}

	return (
		<div className={styles.wrap}>
			<div className={styles.petalWrap}>
				<Petal repeatType="reverse" animOptions={animOptions} />
				<Petal repeatType="mirror" animOptions={animOptions} />
			</div>
			<div className={styles.gaugeWrap}>
				<Gauge repeatType="reverse" animOptions={animOptions} />
				<Gauge repeatType="mirror" animOptions={animOptions} />
			</div>
		</div>
	)
}
