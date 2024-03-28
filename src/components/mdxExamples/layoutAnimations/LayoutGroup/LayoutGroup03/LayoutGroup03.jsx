'use client'
import React from 'react'
import styles from './LayoutGroup03.module.scss'
import {
	motion,
	LayoutGroup,
	MotionConfig,
	useTransform,
	useMotionValue,
} from 'framer-motion'
import { range } from '@/utils'
import useKeypress from 'react-use-keypress'
import { Check } from 'react-feather'

function Box({ currentIndex, index, handleClick, handleDoubleClick }) {
	const indexMotionValue = useMotionValue(index)
	const backgroundColor = useTransform(
		indexMotionValue,
		[currentIndex - 5, currentIndex, currentIndex + 5],
		['#2C2D29', '#F3B53F', '#2C2D29']
	)

	const [doubleClicked, setDoubleClicked] = React.useState(false)

	return (
		<motion.div
			layout
			className={styles.item}
			initial={{ borderRadius: 8 }}
			onClick={() => handleClick(index)}
			onDoubleClick={() => {
				setDoubleClicked(!doubleClicked)
				handleDoubleClick(index)
			}}
			style={{
				width: index === currentIndex ? 120 : 40,
			}}
			animate={{
				backgroundColor: backgroundColor.get(),
				marginLeft: index === currentIndex ? '6%' : 0,
				marginRight: index === currentIndex ? '6%' : 0,
			}}
		>
			{doubleClicked && (
				<motion.div layout>
					<Check />
				</motion.div>
			)}
		</motion.div>
	)
}

export default function LayoutGroup03() {
	const totalBox = 14
	const [currentIndex, setCurrentIndex] = React.useState(0)

	const cloneBoxesInitial = range(totalBox).map((value) => ({
		index: value,
		doubleClicked: false,
	}))

	const [cloneBoxes, setCloneBoxes] = React.useState(cloneBoxesInitial)

	function handleDoubleClick(index) {
		let newValue = [...cloneBoxes]
		newValue[index].doubleClicked = !newValue[index].doubleClicked
		setCloneBoxes(newValue)
	}

	let cloneBoxesIn = cloneBoxes.filter((item) => item.doubleClicked === false)
	let cloneBoxesOut = cloneBoxes.filter((item) => item.doubleClicked === true)

	function handleClick(index) {
		setCurrentIndex(index)
	}

	useKeypress('ArrowLeft', () => {
		if (currentIndex < totalBox - 1) {
			setCurrentIndex(currentIndex + 1)
		}
	})

	useKeypress('ArrowRight', () => {
		if (currentIndex > 0) {
			setCurrentIndex(currentIndex - 1)
		}
	})
	return (
		<MotionConfig transition={{ ease: [0.32, 0.72, 0, 1], duration: 0.7 }}>
			<div className={styles.wrap}>
				<LayoutGroup>
					<div className={styles.exampleWrapContainer}>
						{/* cloned boxes */}
						<div className={styles.exampleWrap} data-clone={true}>
							<motion.div
								className={styles.exampleViewbox}
								animate={{
									x: `-${
										(1 / 3) * 100 * currentIndex +
										6 +
										currentIndex * 4
									}%`,
								}}
							>
								{cloneBoxesIn.map((item, index) => (
									<Box
										key={item.index}
										index={index}
										currentIndex={currentIndex}
										handleClick={handleClick}
									/>
								))}
							</motion.div>
						</div>

						{/* original boxes */}
						<div
							className={styles.exampleWrap}
							style={{ position: 'absolute', top: 0, left: 0 }}
						>
							<motion.div
								className={styles.exampleViewbox}
								animate={{
									x: `-${
										(1 / 3) * 100 * currentIndex +
										6 +
										currentIndex * 4
									}%`,
								}}
							>
								{range(totalBox).map((item, index) => (
									<Box
										key={item}
										index={index}
										currentIndex={currentIndex}
										handleClick={handleClick}
										handleDoubleClick={handleDoubleClick}
									/>
								))}
							</motion.div>
						</div>
					</div>
				</LayoutGroup>
			</div>
		</MotionConfig>
	)
}
