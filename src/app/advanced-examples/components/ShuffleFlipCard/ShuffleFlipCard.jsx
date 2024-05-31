'use client'
import styles from './ShuffleFlipCard.module.scss'
import {
	motion,
	AnimatePresence,
	useMotionValue,
	useTransform,
	useMotionValueEvent,
} from 'framer-motion'
import React from 'react'
import Card from './Card'
import { range } from '@/utils'
import { X } from 'react-feather'

const ShuffleFlipCard = () => {
	const dragcontrol = React.useRef(null)

	const [containerSize, setContainerSize] = React.useState({
		width: 0,
		height: 0,
	})
	const [containerPos, setContainerPos] = React.useState({ x: 0, y: 0 })

	React.useEffect(() => {
		const containerRect = dragcontrol.current.getBoundingClientRect()
		setContainerPos({
			x: Math.floor(containerRect.x),
			y: Math.floor(containerRect.y),
		})
		setContainerSize({
			width: containerRect.width,
			height: containerRect.height,
		})
	}, [])

	const CARDSIZE = { width: 100, height: 130 }
	const CARDNUM = 5

	// show cards stack together, 1/2 card covers the previous card, the last card show 100%
	// total stacked card width
	const stackedWidth = (CARDSIZE.width / 2) * (CARDNUM - 1) + CARDSIZE.width
	const firstCardX = (containerSize.width - stackedWidth) / 2
	// the rest of the card will be placed at the right of the first card by half of the card width

	const [removeClicked, setRemoveClicked] = React.useState(false)

	return (
		<motion.div ref={dragcontrol} className={styles.wrap}>
			<button
				className={styles.remove}
				onClick={() => setRemoveClicked(!removeClicked)}
			>
				<X color="var(--color-text-300)" />
			</button>
			<AnimatePresence>
				{!removeClicked && (
					<>
						{range(CARDNUM).map((item, i) => (
							<Card
								key={i}
								containerSize={containerSize}
								containerPos={containerPos}
								cardSize={CARDSIZE}
								initialX={firstCardX + (CARDSIZE.width / 2) * i}
								index={item}
							/>
						))}
					</>
				)}
			</AnimatePresence>
		</motion.div>
	)
}

export default ShuffleFlipCard
