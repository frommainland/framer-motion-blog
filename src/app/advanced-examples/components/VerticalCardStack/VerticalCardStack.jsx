'use client'
import React from 'react'
import styles from './VerticalCardStack.module.scss'
import { range } from '@/utils'
import {
	animate,
	motion,
	useMotionValue,
	useMotionValueEvent,
	useTransform,
} from 'framer-motion'
import { Card } from './Card'
import { useMeasure } from '@uidotdev/usehooks'

const VerticalCardStack = () => {
	// prevent misinterpreting clicking and dragging
	const [isDragging, setIsDragging] = React.useState(false)

	const [cardClickedIndex, setCardClickedIndex] = React.useState(null)

	const CARD_SIZE = { width: 200, height: 300 }

	// because card posiiton is absolute, so no way to tell how tall when it ratateX, so i ball park the base height when card is in rotateX perspective
	const baseHeightStart = 266
	const baseCardHeight = 50
	const cardNum = 10

	const [singleView, setsingleView] = React.useState(false)

	const y = useMotionValue(0)

	// Create a new ref to store the dragContainer element
	const sceneRef = React.useRef(null)

	const [sceneHeight, setsceneHeight] = React.useState(0)

	React.useEffect(() => {
		if (sceneRef) {
			const height = sceneRef.current.clientHeight
			setsceneHeight(height)
		}
	}, [])

	return (
		<div className={styles.wrap}>
			{/* // scene only for overflow:hidden */}
			<motion.div
				ref={sceneRef}
				className={styles.scene}
				style={{
					width: CARD_SIZE.width * 1.5,
					height: CARD_SIZE.height * 1.5,
				}}
			>
				{/* dragContainer for drag area, when in stack view, it should expand to centain height, then make stack cards move like scroll with rubber band efffect at the edge */}
				<motion.div
					className={styles.dragContainer}
					drag={singleView ? false : 'y'}
					onDragStart={() => setIsDragging(true)}
					onDragEnd={() => setIsDragging(false)}
					style={{
						height: singleView
							? CARD_SIZE.height * 1.5
							: baseHeightStart + (cardNum - 1) * baseCardHeight,
						y,
					}}
					dragConstraints={{
						top:
							(baseHeightStart +
								(cardNum - 1) * baseCardHeight -
								CARD_SIZE.height * 1.5 +
								20) *
							-1,
						bottom: 20,
					}}
				>
					{range(cardNum).map((i) => {
						return (
							<Card
								key={i}
								i={i}
								CARD_SIZE={CARD_SIZE}
								singleView={singleView}
								isDragging={isDragging}
								setsingleView={setsingleView}
								cardClickedIndex={cardClickedIndex}
								setCardClickedIndex={setCardClickedIndex}
								y={y}
								sceneHeight={sceneHeight}
							/>
						)
					})}
				</motion.div>
			</motion.div>
		</div>
	)
}

export default VerticalCardStack
