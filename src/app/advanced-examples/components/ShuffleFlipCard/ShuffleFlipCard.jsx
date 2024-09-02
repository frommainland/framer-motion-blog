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
import { X, HardDrive } from 'react-feather'
import { bouncy } from '@/helper/easing'

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

	const CARDSIZE = { width: 120, height: 170 }
	const CardImages = ['JMT', 'Lucas', 'Rami', 'Tim', 'Xoana']

	// show cards stack together, 1/2 card covers the previous card, the last card show 100%
	// total stacked card width
	const stackedWidth =
		(CARDSIZE.width / 2) * (CardImages.length - 1) + CARDSIZE.width
	const firstCardX = (containerSize.width - stackedWidth) / 2
	// the rest of the card will be placed at the right of the first card by half of the card width

	const [removeClicked, setRemoveClicked] = React.useState(false)

	const [activeIndex, setActiveIndex] = React.useState(null)

	const handleIndex = (index) => {
		setActiveIndex(index)
	}

	return (
		<motion.div ref={dragcontrol} className={styles.wrap}>
			<motion.button
				style={{ x: '-50%' }}
				initial={{ top: -48 }}
				animate={{
					top: !removeClicked ? 50 : -48,
					transition: {
						duration: 0.35,
						ease: bouncy,
						delay: removeClicked ? 0.1 : 0.1 * CardImages.length,
					},
				}}
				className={styles.remove}
				onClick={() => setRemoveClicked(!removeClicked)}
				whileTap={{ scale: 0.8 }}
				whileHover={{ scale: 1.1 }}
			>
				<X color="var(--color-text-300)" />
			</motion.button>

			<motion.button
				className={styles.show}
				style={{ x: '-50%' }}
				initial={{ bottom: -48 }}
				animate={{
					bottom: removeClicked ? 50 : -48,
					transition: {
						duration: 0.35,
						ease: bouncy,
						delay: removeClicked ? 0.1 * CardImages.length : 0.1,
					},
				}}
				onClick={() => setRemoveClicked(!removeClicked)}
				whileTap={{ scale: 0.8 }}
				whileHover={{ scale: 1.1 }}
			>
				<HardDrive color="var(--color-text-300)" />
			</motion.button>

			<AnimatePresence>
				{!removeClicked && (
					<>
						{CardImages.map((item, i) => (
							<Card
								key={item}
								containerSize={containerSize}
								containerPos={containerPos}
								cardSize={CARDSIZE}
								initialX={firstCardX + (CARDSIZE.width / 2) * i}
                                handleIndex={handleIndex}
                                activeIndex={activeIndex}
								index={i}
								cardNum={CardImages.length}
								item={item}
							/>
						))}
					</>
				)}
			</AnimatePresence>
		</motion.div>
	)
}

export default ShuffleFlipCard
