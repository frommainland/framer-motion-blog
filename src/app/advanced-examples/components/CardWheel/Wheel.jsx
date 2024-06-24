'use client'
import { MotionConfig, motion } from 'framer-motion'
import styles from './CardWheel.module.scss'
import React from 'react'
import { useMeasure } from '@uidotdev/usehooks'
import { gentleEase } from '@/helper/easing'

const Wheel = ({
	currentSignIndex,
	setCurrentSignIndex,
	setWheelDirection,
}) => {
	const signsItem = [
		'§',
		'#',
		'*',
		'{ }',
		'~',
		'&',
		';',
		'@',
		'^',
		'¡',
		'¿',
		'⁏',
	]

	const signSize = 44
	const [ref, { width: wrapWidth, height: wrapHeight }] = useMeasure()
	const visibleSigns = 9
	const visibleSignsGapNum = visibleSigns - 1
	const GapDis = (wrapHeight - visibleSigns * signSize) / visibleSignsGapNum
	const currentIndexY = wrapHeight / 2 - signSize / 2

	// i need this pesuedo element to get the currentSignIndex element getBoundingBoxRect().y
	// so it can be compared with clicked sign to make sure is the wheel go 'up' or 'down'
	const signCurrentRef = React.useRef(null)

	const [signCurrentRefY, setSignCurrentRefY] = React.useState(0)

	React.useEffect(() => {
		if (signCurrentRef) {
			let rect = signCurrentRef.current.getBoundingClientRect()
			setSignCurrentRefY(rect.top)
		}
	}, [])

	return (
		<div className={styles.signWrap} ref={ref}>
			<MotionConfig transition={{ type: 'spring', ...gentleEase }}>
				{signsItem.map((item, i) => {
					if (Math.abs(i - currentSignIndex) <= 5) {
						return (
							<motion.div
								key={item}
								className={styles.sign}
								style={{
									width: signSize,
									borderWidth: i === currentSignIndex ? 1 : 0,
								}}
								animate={{
									x: Math.abs(i - currentSignIndex) * 25,
									y:
										(i - currentSignIndex) *
											(GapDis + signSize) +
										currentIndexY,
									opacity:
										1 -
										Math.abs(i - currentSignIndex) * 0.25,
								}}
								onClick={(e) => {
									setCurrentSignIndex(i)
									const verticalDistance = e.clientY
									let direction =
										verticalDistance - signCurrentRefY > 0
											? 'up'
											: 'down'
									setWheelDirection(direction)
								}}
							>
								<p>{item}</p>
							</motion.div>
						)
					} else {
						return (
							<motion.div
								key={item}
								className={styles.sign}
								style={{ width: signSize }}
								animate={{
									x:
										Math.abs(
											i -
												currentSignIndex -
												signsItem.length *
													Math.sign(
														i - currentSignIndex
													)
										) * 25,
									y:
										(i -
											currentSignIndex -
											signsItem.length *
												Math.sign(
													i - currentSignIndex
												)) *
											(GapDis + signSize) +
										currentIndexY,
									opacity:
										1 -
										Math.abs(
											i -
												currentSignIndex -
												signsItem.length *
													Math.sign(
														i - currentSignIndex
													)
										) *
											0.25,
								}}
								onClick={(e) => {
									setCurrentSignIndex(i)
									const verticalDistance = e.clientY
									let direction =
										verticalDistance - signCurrentRefY > 0
											? 'up'
											: 'down'
									setWheelDirection(direction)
								}}
							>
								{item}
							</motion.div>
						)
					}
				})}
			</MotionConfig>
			<div className={styles.signCurrent} ref={signCurrentRef}></div>
		</div>
	)
}

export default Wheel
