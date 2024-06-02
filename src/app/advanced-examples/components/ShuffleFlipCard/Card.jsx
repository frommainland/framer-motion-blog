'use client'
import { bouncy, smooth } from '@/helper/easing'
import styles from './ShuffleFlipCard.module.scss'
import { motion, useMotionValue, useCycle } from 'framer-motion'
import React from 'react'
import Image from 'next/image'

const getRandomInt = (max) => {
	return Math.floor(Math.random() * (max + 1))
}

function rando(min, max) {
	return Math.random() * (max - min + 1) + min
}

const Card = ({
	containerSize,
	containerPos,
	cardSize,
	initialX,
	index,
	cardNum,
	item,
}) => {
	const [isClicked, setIsClicked] = React.useState(false)
	const [isDragging, setIsDragging] = React.useState(false)

	const [initialPos, setInitialPos] = React.useState(null)

	const [rotateDeg, setRotateDegree] = React.useState(null)

	React.useEffect(() => {
		const rotate = rando(-10, 10)
		setRotateDegree(rotate)
	}, [])

	React.useEffect(() => {
		const random = {
			x: getRandomInt(containerSize.width),
			y: containerSize.height,
		}
		setInitialPos(random)
	}, [containerSize])

	// find the card top left point when card is at the center of the container
	const cardTopLeft = {
		x: containerSize.width / 2 - cardSize.width / 2,
		y: containerSize.height / 2 - cardSize.height / 2,
	}

	const [cardFace, cycleCardFace] = useCycle('front', 'back')

	// random card y height
	const [cardY, setCardY] = React.useState(null)
	React.useEffect(() => {
		let cardYNum =
			containerSize.height / 2 - cardSize.height / 2 + rando(-30, 30)
		setCardY(cardYNum)
	}, [containerSize, cardSize])

	// get last drag stop positions
	const [lastClickPosX, setLastClickPosX] = React.useState(null)
	const [lastClickPosY, setLastClickPosY] = React.useState(null)

	React.useEffect(() => {
		setLastClickPosX(initialX)
		setLastClickPosY(cardY)
	}, [initialX, cardY])

	const x = useMotionValue(0)
	const y = useMotionValue(0)

	const handleClick = (e) => {
		if (!isDragging) {
			setIsClicked(!isClicked)
			cycleCardFace()
		}
	}

	const handleDragEnd = () => {
		setIsDragging(false)
		setLastClickPosX(x.get())
		setLastClickPosY(y.get())
	}

	return (
		<>
			{initialPos && (
				<motion.div
					className={styles.scene}
					style={{
						x,
						y,
						zIndex: isClicked ? 100 : index,
						width: cardSize.width,
						height: cardSize.height,
					}}
					drag={cardFace === 'front' ? true : false}
					dragMomentum={false}
					initial={{
						x: initialX,
						y: containerSize.height + 20,
						rotate: rotateDeg,
					}}
					animate={{
						x: isClicked ? cardTopLeft.x : lastClickPosX,
						y: isClicked ? cardTopLeft.y : lastClickPosY,
						scale: isClicked ? 2 : 1,
						rotate: isClicked ? 0 : rotateDeg,
						transition: {
							duration: 0.7,
							ease: bouncy,
							delay: 0.1 * index,
						},
					}}
					exit={{
						x: initialX,
						y: containerSize.height + 20,
						rotate: rotateDeg,
						transition: {
							duration: 0.35,
							ease: 'backOut',
							delay: 0.05 * Math.abs(index - (cardNum - 1)),
						},
					}}
					onClick={handleClick}
					onDragStart={() => setIsDragging(true)}
					onDragEnd={handleDragEnd}
				>
					<motion.div
						className={styles.card}
						animate={{ rotateY: isClicked ? 180 : 0 }}
						transition={{ duration: 0.35, ease: 'easeInOut' }}
					>
						<div
							className={`${styles.cardFace} ${styles.cardFace__front}`}
						>
							{item}
						</div>
						<div
							className={`${styles.cardFace} ${styles.cardFace__back}`}
						>
							<Image
								src={`/ShuffleFlipCard/${item}.jpg`}
								sizes="340px"
								fill
								style={{ objectFit: 'cover' }}
								alt={`${item}'s work`}
							/>
						</div>
					</motion.div>
				</motion.div>
			)}
			{isClicked && (
				<div className={styles.overlay} onClick={handleClick}></div>
			)}
		</>
	)
}
export default Card
