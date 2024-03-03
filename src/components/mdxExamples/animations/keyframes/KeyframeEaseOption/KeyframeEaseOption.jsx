'use client'
import React from 'react'
import {
	anticipate,
	backOut,
	circIn,
	easeIn,
	easeInOut,
	easeOut,
	motion,
} from 'framer-motion'
import styles from './KeyframeEaseOption.module.scss'
import RestartDemoWrap from '@/components/RestartDemoWrap'

export default function KeyframeEaseOption() {
	return (
		<RestartDemoWrap>
			<div className={styles.wrap}>
				<motion.div
					className={styles.item}
					animate={{
						scale: [1, 0.5, 1.5, 1],
						y: [0, 100, -50, 0],
					}}
					transition={{
						duration: 2,
						ease: [easeIn, easeOut, easeInOut],
					}}
				></motion.div>
				<motion.div
					className={styles.item}
					animate={{
						scale: [1, 0.5, 1.5, 1],
						y: [0, 100, -50, 0],
					}}
					transition={{
						duration: 2,
						ease: [anticipate, circIn, backOut],
					}}
				></motion.div>
			</div>
		</RestartDemoWrap>
	)
}
