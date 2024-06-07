'use client'
import React from 'react'
import styles from './DiagonalCardStack.module.scss'
import { motion } from 'framer-motion'
import { range } from '@/utils'
import Image from 'next/image'

const DiagonalCardStack = () => {
	// cardContainer size
	const cardContainerRef = React.useRef(null)
	const [cardContainerSize, setCardContainerSize] = React.useState({
		width: 0,
		height: 0,
	})
	React.useEffect(() => {
		if (cardContainerRef.current) {
			const { width, height } =
				cardContainerRef.current.getBoundingClientRect()
			setCardContainerSize({ width, height })
		}
	}, [])

	//
	const CARD_NUM = 14
	const CARD_SIZE = cardContainerSize.width / 2
	const CARD_SCALE = 0.38
	const CARD_DISTANCE = 25
	const SmallCardSize = CARD_SIZE * CARD_SCALE

	const [currentIndex, setCurrentIndex] = React.useState(6)

	let moveleft = cardContainerSize.width / 2 - SmallCardSize / 2
	// distance of two nearest card to the center card
	// since it is a square card and container, the horizotal and vertical distance is the same
	let distanceToCenterCard =
		cardContainerSize.width / 2 - SmallCardSize / 2 - CARD_DISTANCE * 2

	return (
		<div className={styles.wrap}>
			<div
				className={styles.cardContainer}
				ref={cardContainerRef}
				style={{
					'--bg': `url('/DiagonalCardStack/nature${currentIndex}.webp')`,
				}}
			>
				<div className={styles.overlay}></div>
				{range(CARD_NUM).map((i) => (
					<motion.div
						key={i}
						className={styles.card}
						style={{ zIndex: CARD_NUM - i }}
						animate={{
							x:
								i < currentIndex
									? (distanceToCenterCard +
											(currentIndex - i) *
												CARD_DISTANCE) *
									  -1
									: i === currentIndex
									? 0
									: distanceToCenterCard +
									  (i - currentIndex) * CARD_DISTANCE,
							y:
								i < currentIndex
									? distanceToCenterCard +
									  (currentIndex - i) * CARD_DISTANCE
									: i === currentIndex
									? 0
									: (distanceToCenterCard +
											(i - currentIndex) *
												CARD_DISTANCE) *
									  -1,
							skewY: 15,
							scale: i === currentIndex ? 1 : CARD_SCALE,
						}}
						transition={{ duration: 0.35 }}
					>
						<Image
							alt="nature image"
							src={`/DiagonalCardStack/nature${i}.webp`}
							width={CARD_SIZE}
							height={CARD_SIZE}
							style={{ objectFit: 'cover' }}
						/>
					</motion.div>
				))}
				<button
					onClick={() => {
						setCurrentIndex((prevIndex) => {
							if (prevIndex === CARD_NUM - 1) {
								return CARD_NUM - 1
							} else {
								return prevIndex + 1
							}
						})
					}}
				>
					Next
				</button>
				<button
					onClick={() =>
						setCurrentIndex((prevIndex) => {
							if (prevIndex === 0) {
								return 0
							} else {
								return prevIndex - 1
							}
						})
					}
				>
					Previous
				</button>
			</div>
		</div>
	)
}

export default DiagonalCardStack
