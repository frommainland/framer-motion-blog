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
import { useMeasure } from '@uidotdev/usehooks'

function dampen(val, [min, max]) {
	if (val > max) {
		let extra = val - max
		let dampenedExtra = extra > 0 ? Math.sqrt(extra) : -Math.sqrt(-extra)
		return max + dampenedExtra * 2
	} else if (val < min) {
		let extra = val - min
		let dampenedExtra = extra > 0 ? Math.sqrt(extra) : -Math.sqrt(-extra)
		return min + dampenedExtra * 2
	} else {
		return val
	}
}

const VerticalCardStack = () => {
	const [ref, { width, height }] = useMeasure()
	const sceneRef = React.useRef(null)

	const CARD_SIZE = { width: 200, height: 300 }
	const cardNum = 5

	const [clicked, setIsClicked] = React.useState(false)
	const [clickedCardIndex, setClickedCardIndex] = React.useState(cardNum - 1)

	const rotationX = useMotionValue(0)
	const y = useMotionValue(0)
	// function handleDrag(_, info) {
	// 	rotationX.set(
	// 		Math.max(-80, Math.min(80, rotationX.get() + info.delta.y))
	// 	)
	// }

	useMotionValueEvent(y, 'change', (v) => console.log(v))
	function handleDrag(_, info) {
		if (sceneRef) {
			const sceneRect = sceneRef.current.getBoundingClientRect()
			// const deltaX = y.get() - refRect.top
			// console.log(deltaX)
		}
		// x.set(dampen(dx, [minX, maxX]))
		// y.set(dampen(dy, [minY, maxY]))
		// rotationX.set(rotationX.get() + info.delta.y)
		rotationX.set(rotationX.get() + dampen(info.delta.y, [-80, 80]))
	}

	// useMotionValueEvent(rotationX, 'change', (v) => console.log(v))

	const [dragDis, setDragDis] = React.useState(0)
	useMotionValueEvent(rotationX, 'change', (v) => setDragDis(v))

	const fakeTransform = useTransform(rotationX, (value) => {
		return `rotate3d(0, 0, 0, ${value}deg)`
	})

	return (
		<div className={styles.wrap} ref={ref}>
			{width && (
				<motion.div
					className={styles.scene}
					drag="y"
					ref={sceneRef}
					// dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
					onDrag={handleDrag}
					style={{
						transform: fakeTransform,
						width: CARD_SIZE.width * 1.5,
						height: CARD_SIZE.height * 1.5,
						y,
					}}
				>
					{range(cardNum).map((i) => (
						<motion.div
							className={styles.card}
							key={i}
							onClick={() => {
								setIsClicked(!clicked)
								setClickedCardIndex(i)
								rotationX.set(0)
							}}
							animate={
								clicked
									? 'stack'
									: i === clickedCardIndex
									? 'single'
									: 'down'
							}
							style={{
								zIndex: clicked
									? 0
									: i === clickedCardIndex
									? 10
									: 0,
							}}
							initial={{
								// top: height / 2 - CARD_SIZE.height / 2,
								// left: width / 2 - CARD_SIZE.width / 2,
								top: 72,
								left: 50,
								// backgroundColor: `hsl(${
								// 	Math.random() * 360
								// }, 100%, 80%)`,
								background:
									'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 68%), #FF0000',
							}}
							variants={{
								single: {
									// top: height / 2 - CARD_SIZE.height / 2,
									// left: width / 2 - CARD_SIZE.width / 2,
									// transform: `translateY(0) translateZ(100px) scale(1.5)`,
									// y: 0,
									y: 0,
									scale: 1.5,
									background:
										'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 68%), #FF0000',
								},
								stack: {
									// top: 0,
									// transform: `translateY(${
									// 	i * (height / (cardNum * 2)) + dragDis
									// }px) translateZ(${
									// 	i * 20
									// }px) scale(1) rotateX(${-45 + i * -3}deg)`,
									y:
										i * (height / (cardNum * 2)) +
										dragDis / 2 -
										70,
									z: i * 30 + dragDis / 2,
									scale: 1,
									rotateX: -45 + i * -3,
								},
								down: {
									// top: 0,
									// left: width / 2 - CARD_SIZE.width / 2,
									// transform: `translateY(0) translateZ(-100px) scale(1)`,
									y: height * 1.2,
									scale: 1,
									background:
										'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 68%), #FF0000',
								},
							}}
							transition={{
								type: 'spring',
								stiffness: 200,
								damping: 30,
							}}
						></motion.div>
					))}
				</motion.div>
			)}
		</div>
	)
}

export default VerticalCardStack
