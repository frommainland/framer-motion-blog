'use client'
import { AnimatePresence, motion } from 'framer-motion'
import styles from './MovingDigits.module.scss'
import { Heart } from 'react-feather'
import { useMeasure } from 'react-use'
import { gentleEase, gentle } from '@/helper/easing'

import React from 'react'

function Distance() {
	const [distance, setDistance] = React.useState(10)

	React.useEffect(() => {
		const timer = setInterval(() => {
			setDistance((pre) => {
				if (pre < 500) {
					return pre + 1
				} else {
					return 0
				}
			})
		}, Math.random() * 4000 + 2000)

		return () => {
			clearInterval(timer)
		}
	}, [])

	const distanceDigits = distance.toString().padStart(3, '0').split('')
	let formattedDistance = [
		distanceDigits[0],
		'.',
		...(distanceDigits.slice(1) || []),
	].join('')

	formattedDistance = formattedDistance.toString().split('')

	const [digitRef, { width: digitWidth, height: digitHeight }] = useMeasure()
	const [dotRef, { width: dotWidth, height: dotHeight }] = useMeasure()

	return (
		<div className={styles.distance}>
			<div className={styles.primary} style={{ height: digitHeight }}>
				{formattedDistance.map((item, index) => (
					<span
						key={index}
						className={styles.digitsContainer}
						style={{
							width: item === '.' ? dotWidth : digitWidth,
							height: digitHeight,
						}}
					>
						<AnimatePresence initial={false}>
							<motion.span
								className={styles.digits}
								ref={digitRef}
								key={item}
								initial={{
									y: '100%',
									opacity: 0,
									scaleY: 0.1,
									originY: 0,
								}}
								animate={{
									y: '0%',
									opacity: 1,
									scaleY: 1,
									originY: 0,
								}}
								exit={{
									y: '-100%',
									opacity: 0,
									scaleY: 0.1,
									originY: 1,
								}}
								transition={{ duration: 1.9 }}
							>
								{item}
							</motion.span>
						</AnimatePresence>
					</span>
				))}
			</div>
			<span>km</span>
			<span
				className={styles.primary}
				ref={dotRef}
				style={{
					display: 'inline-block',
					lineHeight: 0.9,
					visibility: 'hidden',
				}}
			>
				.
			</span>
		</div>
	)
}

function Duration() {
	const [timeElapsed, setTimeElapsed] = React.useState(0)

	React.useEffect(() => {
		const intervalId = setInterval(() => {
			setTimeElapsed((timeElapsed) => timeElapsed + 1)
		}, 1000) // increment every 1 second

		return () => {
			clearInterval(intervalId)
		}
	}, [])

	React.useEffect(() => {
		if (timeElapsed >= 180) {
			// 3 minutes in seconds
			setTimeElapsed(0)
		}
	}, [timeElapsed])

	const timeArray = [...formatTime(timeElapsed)]

	function formatTime(seconds) {
		const minutes = Math.floor(seconds / 60)
		const remainingSeconds = seconds % 60
		return `${padZero(minutes)}:${padZero(remainingSeconds)}`
	}

	function padZero(value) {
		return (value < 10 ? '0' : '') + value
	}

	const [digitRef, { width: digitWidth, height: digitHeight }] = useMeasure()
	const [dotRef, { width: dotWidth, height: dotHeight }] = useMeasure()

	return (
		<div className={styles.duration}>
			{timeArray.map((char, index) => (
				<motion.div
					className={styles.container}
					key={index}
					style={{
						width: char === ':' ? dotWidth : digitWidth,
						height: digitHeight,
					}}
				>
					<AnimatePresence initial={false}>
						<motion.div
							key={char}
							style={{ y: '-50%' }}
							className={styles.digitContainer}
							initial={{
								rotate: index % 2 ? 36 : -36,
								opacity: 0,
							}}
							animate={{ rotate: 0, opacity: 1 }}
							exit={{ rotate: index % 2 ? -36 : 36, opacity: 0 }}
							transition={{
								duration: 0.9,
								type: 'spring',
								...gentleEase,
							}}
						>
							<span className={styles.digit}>{char}</span>
						</motion.div>
					</AnimatePresence>
				</motion.div>
			))}
			<div style={{ visibility: 'hidden' }}>
				<span className={styles.digit} ref={digitRef}>
					0
				</span>
				<span className={styles.digit} ref={dotRef}>
					:
				</span>
			</div>
		</div>
	)
}

function Calories() {
	const [counter, setCounter] = React.useState(0)

	const [digitRef, { width: digitWidth, height: digitHeight }] = useMeasure()

	React.useEffect(() => {
		const timer = setInterval(() => {
			setCounter((pre) => pre + 1)
		}, Math.random() * 2000 + 1000)

		return () => {
			clearInterval(timer)
		}
	}, [])

	React.useEffect(() => {
		if (counter >= 900) {
			setCounter(0)
		}
	}, [counter])

	const counterDigits = counter.toString().split('')

	return (
		<div className={styles.calories}>
			<div className={styles.digitsWrap} style={{ height: digitHeight }}>
				{counterDigits.map((item, index) => (
					<motion.div
						className={styles.digit}
						key={index}
						style={{ width: digitWidth, height: digitHeight }}
					>
						<AnimatePresence initial={false}>
							<motion.span
								key={item}
								ref={digitRef}
								initial={{
									filter: 'blur(2px)',
									opacity: 0,
									scale: 0.6,
									y: '50%',
									transition: {
										filter: {
											ease: 'linear',
										},
									},
								}}
								animate={{
									y: '0%',
									filter: 'blur(0px)',
									opacity: 1,
									scale: 1,
									transition: {
										filter: {
											ease: 'linear',
										},
									},
								}}
								exit={{
									y: '-50%',
									filter: 'blur(2px)',
									opacity: 0,
									scale: 0.6,
									transition: {
										filter: {
											ease: 'linear',
										},
									},
								}}
								transition={{ type: 'spring', ...gentle }}
							>
								{item}
							</motion.span>
						</AnimatePresence>
					</motion.div>
				))}
			</div>
			<span className={styles.content}>Calories</span>
		</div>
	)
}

function HeartRate() {
	const [rate, setRate] = React.useState(90)

	React.useEffect(() => {
		const timer = setInterval(() => {
			let rando = Math.random() * 6 - 2.5
			setRate((prevRate) => Math.floor(prevRate + rando))
		}, 500)

		return () => {
			clearInterval(timer)
		}
	}, [rate])

	React.useEffect(() => {
		if (rate >= 165 || rate <= 85) {
			setRate(90)
		}
	}, [rate])

	return (
		<div className={styles.heartrate}>
			<span className={styles.tertiary}>{rate}</span>
			<motion.div
				animate={{ scale: [1, 1.2, 1] }}
				transition={{ repeat: Infinity }}
				style={{ marginBottom: 1 }}
			>
				<Heart
					size={18}
					color="var(--color-accent-red)"
					fill="var(--color-accent-red)"
				/>
			</motion.div>
		</div>
	)
}
const MovingDigits = () => {
	return (
		<div className={styles.wrap}>
			<div className={styles.watchContainer}>
				<div className={styles.nav}></div>
				<Distance />
				<Duration />
				<Calories />
				<HeartRate />
			</div>
		</div>
	)
}

export default MovingDigits
