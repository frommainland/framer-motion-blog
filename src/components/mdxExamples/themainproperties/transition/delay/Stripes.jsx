'use client'
import React from 'react'
import { motion } from 'framer-motion'
import styles from './Stripes.module.scss'
import { useMeasure } from '@uidotdev/usehooks'
import { range } from '@/utils'
import bezier from 'bezier-easing'

export default function Stripes({ values, wrapRefWidth, isPlay, ...rest }) {
	const { backgroundImage, repeat } = rest

	const EASINGS = {
		easeIn: [0.42, 0, 1, 1],
		easeOut: [0, 0, 0.58, 1.0],
		easeInOut: [0.42, 0, 0.58, 1.0],
		'easeIn-Cubic': [0.32, 0, 0.67, 0],
		'easeOut-Cubic': [0.33, 1, 0.68, 1],
		'easeInOut-Cubic': [0.65, 0, 0.35, 1],
		// backIn: [0.6, -0.28, 0.735, 0.045],
		// backOut: [0.175, 0.885, 0.32, 1.275],
		// backInOut: [0.68, -0.55, 0.265, 1.55],
        'custom01':[0.65, 0, 0.35, 1],
        'custom02':[0.45, 0.1, 0.45, .8],
		linear: [0, 0, 1, 1],
	}

	// generate id
	const id = React.useId()

	// get width
	const [stripeRef, { width: stripeRefWidth }] = useMeasure()

	//---------------

	const { size, stripeNum, singleTime, totalTime, easingName, color } = values
	// console.log(size)
	// const curve = [0.12, 0.57, 0.63, 0.21]

	const curve = EASINGS[easingName]
	// const curve = [0, 0, 1, 1]
	//y stands for animate outcome percentage, like 25%
	//x stands for animate time, like 0.2s
	// so every y has its only mapping x
	//for examplemeans, a curve [0.12, 0.57, 0.63, 0.21], when x is 0.2(s), the element travells y(25%).

	// use bezier-easing, you can get x when know y, and vice versa.
	// https://github.com/gre/bezier-easing/issues/38#issuecomment-1681852165

	// resolve y
	// const interpolate = bezier(0.12, 0.57, 0.63, 0.21)
	const interpolate = bezier(curve[0], curve[1], curve[2], curve[3])

	// resolve x,
	// const uninterpolate = bezier(0.57, 0.12, 0.21, 0.63)
	const uninterpolate = bezier(
		Math.abs(curve[1]),
		curve[0],
		Math.abs(curve[3]),
		curve[2]
	)

	// const x = 0.25
	// const y = interpolate(x)
	// console.log(y)
	// console.log(uninterpolate(y) === x)
	// true
	//----------------

	// config for div numbers and aniamtion times

	// const totalTime = 6
	// const totalDiv = 10
	// const singleAnimDuration = 1
	// const ballSize = 20

	// get the delay time array for stripes
	let delayArray = []
	for (let index = 0; index < stripeNum; index++) {
		const res = uninterpolate(index / stripeNum) * totalTime
		delayArray.push(res)
	}

	const ballStartPoint =
		(wrapRefWidth - stripeRefWidth) / 2 +
		stripeRefWidth / stripeNum / 2 -
		size / 2 -
		1

	const gridXPencent = ((1 / stripeNum) * 100).toFixed()

	return (
		<>
			{wrapRefWidth && (
				<motion.div
					key={`${id}-${isPlay}`}
					className={styles.ball}
					style={{
						width: size,
						height: size,
						left: ballStartPoint,
						borderColor: color,
					}}
					animate={{
						left:
							ballStartPoint +
							stripeRefWidth -
							stripeRefWidth / stripeNum,
					}}
					transition={{
						duration: totalTime,
						ease: curve,
						repeat: repeat ? Infinity : null,
                        repeatDelay: singleTime
					}}
				/>
			)}

			<div
				className={styles.stripeWrap}
				ref={stripeRef}
				style={{
					backgroundSize: `${gridXPencent}% 100%`,
					backgroundImage,
				}}
			>
				{range(stripeNum).map((_, i) => {
					const widthPercent = (1 / stripeNum).toFixed(2) * 100
					return (
						<motion.div
							key={`${i}-${isPlay}`}
							className={styles.stripe}
							style={{
								height: `100%`,
								width: `${widthPercent}%`,
								backgroundColor: values.color,
							}}
							initial={{ rotateY: 90 }}
							animate={{
								rotateY: wrapRefWidth ? 90 + 180 : 90,
							}}
							transition={{
								duration: singleTime,
								delay: delayArray[i],
								repeat: repeat ? Infinity : null,
								repeatDelay: totalTime,
							}}
						></motion.div>
					)
				})}
			</div>
		</>
	)
}
