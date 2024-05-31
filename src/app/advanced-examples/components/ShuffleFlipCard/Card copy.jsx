'use client'
import styles from './ShuffleFlipCard.module.scss'
import {
	motion,
	useMotionValue,
	useTransform,
	useMotionValueEvent,
} from 'framer-motion'
import React from 'react'

const Card = React.forwardRef(function (props, ref) {
	const [isClicked, setIsClicked] = React.useState(false)
	const [isDragging, setIsDragging] = React.useState(false)

	// get ref container size and initial rect left and top

	const [containerSize, setContainerSize] = React.useState({
		width: 0,
		height: 0,
	})

	const [initialPosContainer, setInitialPosContainer] = React.useState({
		x: 0,
		y: 0,
	})

	React.useEffect(() => {
		const containerRect = ref.current.getBoundingClientRect()
		setInitialPosContainer({
			x: Math.floor(containerRect.x),
			y: Math.floor(containerRect.y),
		})
		setContainerSize({
			width: containerRect.width,
			height: containerRect.height,
		})
	}, [])

	// generate random pos down below container
	const getRandomInt = (max) => {
		return Math.floor(Math.random() * (max + 1))
	}

	const [initialPos, setInitialPos] = React.useState({ x: 0, y: 0 })

    console.log(initialPos)
	React.useEffect(() => {
		const initialPosition = {
			x: getRandomInt(containerSize.width),
			y: containerSize.height,
		}
		setInitialPos(initialPosition)
	}, [])

	const boxRef = React.useRef(null)

	React.useEffect(() => {
		const rect = boxRef.current.getBoundingClientRect()
		setInitialPos({
			x: Math.floor(rect.x),
			y: Math.floor(rect.y),
		})
	}, [])

	const x = useMotionValue(0)
	const y = useMotionValue(0)

	const [realDragX, setRealDragX] = React.useState(0)
	const [realDragY, setRealDragY] = React.useState(0)

	useMotionValueEvent(x, 'change', (v) => setRealDragX(Math.round(v)))
	useMotionValueEvent(y, 'change', (v) => setRealDragY(Math.round(v)))

	let xToParent = initialPos.x - initialPosContainer.x + realDragX
	let yToParent = initialPos.y - initialPosContainer.y + realDragY

	const [lastPos, setLastPos] = React.useState({
		x: initialPos.x,
		y: initialPos.y,
	})

	const handleClick = (e) => {
		if (!isDragging) {
			setIsClicked(!isClicked)
		}
	}

	const handleDragEnd = (event, info) => {
		setIsDragging(false)
		setLastPos({ x: xToParent, y: yToParent - 700 })
	}

	return (
		<motion.div
			ref={boxRef}
			drag
			dragMomentum={false}
			onDragStart={() => setIsDragging(true)}
			onDragEnd={handleDragEnd}
			onClick={handleClick}
			className={styles.scene}
			style={{
				x,
				y,
				borderRadius: 20,
			}}
			initial={{ y: initialPos.y, x: initialPos.x }}
			// animate={{
			// 	scale: isClicked ? 2 : 1,
			// 	borderRadius: 20,
			// 	x: isClicked ? 330 : lastPos.x,
			// 	y: isClicked ? 330 : lastPos.y,
			// }}
			transition={{ duration: 1, ease: 'circInOut' }}
		>
			<motion.div
				className={styles.card}
				animate={{ rotateY: isClicked ? 180 : 0 }}
				transition={{ duration: 0.75 }}
			>
				<div
					className={`${styles.cardFace} ${styles.cardFace__front}`}
				></div>
				<div className={`${styles.cardFace} ${styles.cardFace__back}`}>
					1
				</div>
			</motion.div>
		</motion.div>
	)
})
export default Card

Card.displayName = 'Card'
