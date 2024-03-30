'use client'
import React from 'react'
import styles from './LayoutGroup03.module.scss'
import {
	motion,
	LayoutGroup,
	MotionConfig,
	useTransform,
	useMotionValue,
	AnimatePresence,
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
			onClick={() => handleClick(index)}
			onDoubleClick={() => {
				setDoubleClicked(!doubleClicked)
				handleDoubleClick(index, doubleClicked)
			}}
			style={{
				width: index === currentIndex ? 120 : 40,
				borderRadius: 8,
			}}
			animate={{
				backgroundColor: backgroundColor.get(),
				marginLeft: index === currentIndex ? '6%' : 0,
				marginRight: index === currentIndex ? '6%' : 0,
			}}
		>
			<AnimatePresence>
				{doubleClicked && (
					<motion.div layout>
						<motion.svg
							width={24}
							height={24}
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							exit={{ scale: 0 }}
						>
							<path
								d="M20 6L9 17L4 12"
								stroke="#FFFCE1"
								strokeWidth={3}
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</motion.svg>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	)
}

function CloneBox({ currentIndex, index }) {
	return (
		<motion.div
			layoutId={`${index}-sharedLayout03`}
			className={styles.item}
			style={{
				width: index === currentIndex ? 120 : 40,
				borderRadius: 8,
			}}
			animate={{
				marginLeft: index === currentIndex ? '6%' : 0,
				marginRight: index === currentIndex ? '6%' : 0,
			}}
		></motion.div>
	)
}

export default function LayoutGroup03() {
	const totalBox = 14
	const [currentIndex, setCurrentIndex] = React.useState(0)

	const [cloneIndex, setcloneIndex] = React.useState([])
	console.log(cloneIndex)
	// const cloneBoxesInitial = range(totalBox).map((value) => ({
	// 	index: value,
	// 	doubleClicked: false,
	// }))

	// const [cloneBoxes, setCloneBoxes] = React.useState(cloneBoxesInitial)

	function handleDoubleClick(index, doubleClicked) {
		if (doubleClicked === false) {
			let newcloneIndexes = [...cloneIndex, index]
			setcloneIndex(newcloneIndexes)
		} else {
			let newcloneIndexes = cloneIndex.filter((v) => v !== index)
			setcloneIndex(newcloneIndexes)
		}
	}

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
						<div className={styles.exampleWrap} data-name="clone">
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
									<CloneBox
										key={item}
										index={index}
										currentIndex={currentIndex}
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

				<motion.div className={styles.selectedBoxWrap}>
					<AnimatePresence>
						{cloneIndex.length !== 0 && (
							<>
								{cloneIndex.map((v, i) => (
									<motion.div
										key={i}
										layoutId={`${v}-sharedLayout03`}
										className={styles.selectedBox}
										style={{ borderRadius: 20 }}
										transition={{ duration: .35 }}
									></motion.div>
								))}
							</>
						)}
					</AnimatePresence>
				</motion.div>
			</div>
		</MotionConfig>
	)
}
