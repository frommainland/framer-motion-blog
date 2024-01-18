'use client'
import React from 'react'
import Stripes from '../delay/Stripes'
import styles from './DelayMix.module.scss'
import { useMeasure } from '@uidotdev/usehooks'

export default function DelayMix() {
	const [wrapRef, { width: wrapRefWidth }] = useMeasure()
	const [values] = React.useState({
		size: 10,
		stripeNum: 20,
		singleTime: 0.8,
		totalTime: 8,
		easingName: 'custom01',
		color: 'var(--color-accent-purple)',
	})

	const [values2] = React.useState({
		size: 10,
		stripeNum: 20,
		singleTime: 0.8,
		totalTime: 8,
		easingName: 'custom02',
		color: 'var(--color-text-300)',
	})

	return (
		<div className={styles.wrap} ref={wrapRef}>
			<div className={styles.positionWrap}>
				<Stripes
					values={values}
					wrapRefWidth={wrapRefWidth}
					backgroundImage="none"
					repeat={true}
				/>
			</div>
			<div className={styles.positionWrap}>
				<Stripes
					values={values2}
					wrapRefWidth={wrapRefWidth}
					backgroundImage="none"
					repeat={true}
				/>
			</div>
		</div>
	)
}
