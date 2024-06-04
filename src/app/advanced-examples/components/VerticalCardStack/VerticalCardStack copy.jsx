'use client'
import React from 'react'
import styles from './VerticalCardStack.module.scss'
import { range } from '@/utils'
import {
	motion,
	useMotionValue,
	useMotionValueEvent,
	useTransform,
} from 'framer-motion'
import { useMeasure } from '@uidotdev/usehooks'
const VerticalCardStack = () => {
	const [ref, { width, height }] = useMeasure()

	const cardNum = 5

	const [clicked, setIsClicked] = React.useState(false)

	const CARD_SIZE = { width: 200, height: 300 }
	const GAP = 16

	const rotationX = useMotionValue(0)
	function handleDrag(_, info) {
		rotationX.set(rotationX.get() + info.delta.y)
	}

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
					onDrag={handleDrag}
					style={{ transform: fakeTransform }}
				>
					{range(cardNum).map((i) => (
						<motion.div
							className={styles.card}
							key={i}
							onClick={() => setIsClicked(!clicked)}
							animate={clicked ? 'stack' : 'single'}
							initial={{
								y: 0,
								z: 0,
								top: height / 2 - CARD_SIZE.height / 2,
								left: width / 2 - CARD_SIZE.width / 2,
								backgroundColor: `hsl(${
									Math.random() * 360
								}, 100%, 80%)`,
							}}
							variants={{
								sinlge: {
									y: 0,
									z: 0,
									top: height / 2 - CARD_SIZE.height / 2,
									left: width / 2 - CARD_SIZE.width / 2,
								},
								stack: {
									y: i * (height / cardNum),
									z: i * 40,
									rotateX: -45 + i * -3,
									top: 0,
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
