'use client'
import React from 'react'
import styles from './GridCardStack.module.scss'
import { AnimatePresence, animate, motion, useAnimate } from 'framer-motion'
import { range } from '@/utils'
import { gentle } from '@/helper/easing'
import Image from 'next/image'
import { useMeasure } from '@uidotdev/usehooks'

function randomIntBetween(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

function Card({
	i,
	setCurrentIndex,
	currentBoxPos,
	setCurrentBoxPos,
	setIsGridView,
	isGridView,
	size,
}) {
	const cardRef = React.useRef(null)

	const [cardPos, setCardPos] = React.useState(null)

	React.useEffect(() => {
		if (!cardRef) return
		const rect = cardRef.current.getBoundingClientRect()
		setCardPos(rect)
	}, [])

	const [test, setTest] = React.useState('')

	const [rotate, setRotate] = React.useState(0)
	const [duration, setDuration] = React.useState(0.35)

	React.useEffect(() => {
		const rando = randomIntBetween(-30, 30)
		const durationRando = randomIntBetween(0.35, 2)
		setRotate(rando)
		setDuration(durationRando)
	}, [cardRef, isGridView])

	const [scope, animate] = useAnimate()

	function getNewPosition(currentBoxPos, cardPos) {
		if (!currentBoxPos || !cardPos) return
		if (cardPos.bottom < currentBoxPos.top) {
			setTest('NORTH')
			animate(
				scope.current,
				{ y: -size / 2, rotate: rotate },
				{ duration: duration }
			)
		} else if (cardPos.top > currentBoxPos.bottom) {
			setTest('SOUTH')
			animate(
				scope.current,
				{ y: size / 2, rotate: rotate },
				{ duration: duration }
			)
		} else if (cardPos.right < currentBoxPos.left) {
			setTest('WEST')
			animate(
				scope.current,
				{ x: -size / 2, rotate: rotate },
				{ duration: duration }
			)
		} else if (cardPos.left > currentBoxPos.right) {
			setTest('EAST')
			animate(
				scope.current,
				{ x: size / 2, rotate: rotate },
				{ duration: duration }
			)
		}
	}

	function handleClick() {
		setCurrentIndex(i)
		setCurrentBoxPos(cardPos)
		setIsGridView(false)
	}

	React.useEffect(() => {
		if (!isGridView) {
			getNewPosition(currentBoxPos, cardPos)
		}
	}, [isGridView])

	React.useEffect(() => {
		if (isGridView) {
			animate(scope.current, { y: 0, x: 0, rotate: 0 }, gentle)
		}
	}, [isGridView])

	return (
		<motion.div
			ref={cardRef}
			className={`${styles[`grid${i + 1}`]} ${styles.box}`}
			layoutId={`${i}-item`}
			onClick={handleClick}
		>
			<motion.div ref={scope} className={styles.content}>
				<Image
					alt="typography"
					src={`/GridCardStack/type${i}.jpg`}
					fill
					sizes={96}
					style={{ objectFit: 'contain' }}
				/>
			</motion.div>
		</motion.div>
	)
}

const GridCardStack = () => {
	const cardNum = 13
	const [currentIndex, setCurrentIndex] = React.useState(null)
	const [currentBoxPos, setCurrentBoxPos] = React.useState(null)
	const [isGridView, setIsGridView] = React.useState(true)

	const [ref, { width, height }] = useMeasure()

	return (
		<div className={styles.wrap} ref={ref}>
			<div className={styles.container}>
				{range(cardNum).map((i) => (
					<Card
						key={i}
						i={i}
						setCurrentIndex={setCurrentIndex}
						setCurrentBoxPos={setCurrentBoxPos}
						currentBoxPos={currentBoxPos}
						setIsGridView={setIsGridView}
						isGridView={isGridView}
						size={width}
					/>
				))}
			</div>
			<AnimatePresence>
				{currentIndex !== null && (
					<div
						className={styles.boxOpenContainer}
						onClick={() => {
							setCurrentIndex(null)
							setIsGridView(true)
						}}
					>
						<motion.div
							layoutId={`${currentIndex}-item`}
							className={styles.boxOpen}
							style={{ width, height }}
						>
							<Image
								src={`/GridCardStack/type${currentIndex}.jpg`}
								alt="typography"
								fill
								sizes={width}
								style={{ objectFit: 'contain' }}
							/>
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default GridCardStack
