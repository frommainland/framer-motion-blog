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
				d="M62 6.58789V44.9525C61.8413 48.169 60.2121 53.2244 56.645 57.4618C53.1204 61.6487 47.7417 64.9998 40 64.9998C32.2583 64.9998 26.8796 61.6487 23.355 57.4618C19.7879 53.2244 18.1587 48.1689 18 44.9525V6.58789C16.603 7.50962 15.2672 8.51661 14 9.60146V45.0452L14.0021 45.0906C14.1893 49.2097 16.1615 55.1277 20.295 60.0378C24.487 65.0176 30.9417 68.9998 40 68.9998C49.0583 68.9998 55.513 65.0176 59.705 60.0378C63.8385 55.1277 65.8107 49.2097 65.9979 45.0906L66 45.0452V9.60146C64.7328 8.51661 63.397 7.50962 62 6.58789Z"
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
				d="M77.4882 26.0175C72.8865 30.2231 70 36.2743 70 42.9996C70 48.7887 72.1387 54.0782 75.6692 58.1211C75.0332 59.3706 74.3334 60.5822 73.5742 61.7516C68.8847 56.8948 66 50.2841 66 42.9996C66 34.6156 69.8213 27.1241 75.8172 22.1719C76.4388 23.4181 76.9972 24.7014 77.4882 26.0175ZM4.1827 22.1719C10.1786 27.1241 14 34.6156 14 42.9996C14 50.2841 11.1152 56.8948 6.42578 61.7516C5.66656 60.5822 4.96678 59.3706 4.33072 58.1211C7.8612 54.0782 9.99997 48.7887 9.99997 42.9996C9.99997 36.2743 7.11344 30.2231 2.51172 26.0175C3.00279 24.7014 3.56118 23.4181 4.1827 22.1719Z"
				fill="#FFFCE1"
			/>
		</motion.svg>
	)
}

function Tweentype({ curve, index }) {
	const [ballRef, { width }] = useMeasure()
	const [parentRef, { width: parentWidth }] = useMeasure()
	console.log(width)
	return (
		<div className={styles.container} ref={parentRef}>
			<p className={styles.name}>{curve}</p>
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
