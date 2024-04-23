'use client'
import React from 'react'
import { motion } from 'framer-motion'
import styles from './TweenExample.module.scss'
import RestartDemoWrap from '@/components/RestartDemoWrap'
import { useMeasure } from '@uidotdev/usehooks'

export default function TweenExample() {
	const easeCurve = ['easeIn', 'easeOut', 'easeInOut']
	const circCurve = ['circIn', 'circOut', 'circInOut']
	const backCurve = ['backIn', 'backOut', 'backInOut']
	const standAloneCurve = ['linear', 'anticipate']
	return (
		<RestartDemoWrap>
			<div className={styles.wrap}>
				<div className={styles.spacer}>
					{easeCurve.map((item, i) => (
						<Tweentype curve={item} key={item} index={i} />
					))}
				</div>

				<div className={styles.spacer}>
					{circCurve.map((item, i) => (
						<Tweentype curve={item} key={item} index={i} />
					))}
				</div>

				<div className={styles.spacer}>
					{backCurve.map((item, i) => (
						<Tweentype curve={item} key={item} index={i} />
					))}
				</div>

				<div className={styles.spacer}>
					{standAloneCurve.map((item, i) => (
						<Tweentype curve={item} key={item} index={i} />
					))}
				</div>
			</div>
		</RestartDemoWrap>
	)
}

function Ball1({ width, curve }) {
	return (
		<motion.svg
			width={60}
			height={60}
			viewBox="0 0 80 80"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			ref={width}
			animate={{ rotate: 1080 }}
			transition={{
				ease: curve,
				duration: 1,
			}}
		>
			<circle cx={40} cy={40} r={40} fill="#9CD72B" />
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M 62 7 V 45 C 62 48 60 53 57 57 C 53 62 48 65 40 65 C 32 65 27 62 23 57 C 20 53 18 48 18 45 V 7 C 17 8 15 9 14 10 V 45 L 14 45 C 14 49 16 55 20 60 C 24 65 31 69 40 69 C 49 69 56 65 60 60 C 64 55 66 49 66 45 L 66 45 V 10 C 65 9 63 8 62 7 Z"
				fill="#FFFCE1"
			/>
		</motion.svg>
	)
}

function Ball2({ width, curve }) {
	return (
		<motion.svg
			width={60}
			height={60}
			viewBox="0 0 80 80"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			ref={width}
			animate={{ rotate: 1080 }}
			transition={{
				ease: curve,
				duration: 1,
			}}
		>
			<circle cx={40} cy={40} r={40} fill="#9CD72B" />
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M 77 26 C 73 30 70 36 70 43 C 70 49 72 54 76 58 C 75 59 74 61 74 62 C 69 57 66 50 66 43 C 66 35 70 27 76 22 C 76 23 77 25 77 26 Z M 4 22 C 10 27 14 35 14 43 C 14 50 11 57 6 62 C 6 61 5 59 4 58 C 8 54 10 49 10 43 C 10 36 7 30 3 26 C 3 25 4 23 4 22 Z"
				fill="#FFFCE1"
			/>
		</motion.svg>
	)
}

function Tweentype({ curve, index }) {
	const [ballRef, { width }] = useMeasure()
	const [parentRef, { width: parentWidth }] = useMeasure()
	return (
		<div className={styles.container} ref={parentRef}>
			<motion.p
				className={styles.name}
				// this will cauese error, because it generates negative blur pixel value during animation
				animate={{
					filter: ['blur(0px)', 'blur(5px)', 'blur(0px)'],
				}}
				transition={{
					ease: curve,
					duration: 1,
				}}
			>
				{curve}
			</motion.p>
			<motion.div
				animate={{ x: parentWidth - width }}
				transition={{
					ease: curve,
					duration: 1,
				}}
			>
				{index % 2 == 0 ? (
					<Ball1 width={ballRef} curve={curve} />
				) : (
					<Ball2 width={ballRef} curve={curve} />
				)}
			</motion.div>
		</div>
	)
}
