'use client'
import styles from './CardStack2.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import { range } from '@/utils'
import { softBounce, quick, criticalDamping } from '@/helper/easing'
import React from 'react'
import { useMeasure } from '@uidotdev/usehooks'
import Image from 'next/image'

function Card({ i, handleClick, currentIndex, disableClick, width }) {
	const zIndex = Math.abs(i - 5 - currentIndex)
	return (
		<motion.div
			className={styles.card}
			style={{ width: width }}
			initial={{ x: '200%', y: 5 * 5, scale: 1 - 0.12 * 4 }}
			animate={{
				x: (i - currentIndex) * 50,
				y: 5 * (i - currentIndex),
				zIndex: zIndex,
				rotateZ: (i - currentIndex) * 5,
				scale: 1 - (i - currentIndex) * 0.12,
			}}
			onClick={!disableClick ? () => handleClick(i) : null}
			exit={{
				x: -500,
				scale: 1,
				rotateZ: -90,
				zIndex: 1000,
				transition: {
					type: 'spring',
					...quick,
				},
			}}
			transition={{
				type: 'spring',
				...softBounce,
				delay: 0.05 * (i % currentIndex) + 0.05,
			}}
		>
			<Image
				alt="funny face example"
				src={`/CardStack2/funnyface${i % 15}.webp`}
				width={width}
				height={width / 0.75}
				style={{
					objectFit: 'cover',
					borderRadius: '1em',
				}}
			/>
			<motion.div
				className={styles.mask}
				style={{
					width: width,
					height: width / 0.75,
				}}
				animate={{ opacity: (i - currentIndex) * 0.25 }}
				whileHover={{
					opacity: 0,
					transition: {
						type: 'spring',
						...criticalDamping,
					},
				}}
			></motion.div>
		</motion.div>
	)
}

export const CardStack2 = () => {
	const [data, setData] = React.useState(() => {
		return range(5).map((item) => ({ item, id: crypto.randomUUID() }))
	})

	// i need a current front card index, so i can get the diff between current index and the card i will click next
	const [currentIndex, setCurrentIndex] = React.useState(0)
	const [disableClick, setDisableClick] = React.useState(false)

	function handleClick(i) {
		// if you click front card, the diff will be 0, i need it to be 0 + 1, so that newAddItem can be added and generate new data.
		let diff = i - currentIndex === 0 ? 1 : i - currentIndex

		// if click the front card or 2nd card, then newArray should be one thing,
		// but if you click 3rd card or more, the newArray should be everything after 3rd card, including 3rd card
		const newArray =
			diff === 1 ? data.slice(1) : data.slice(i - currentIndex)

		// since we remove items from data, we refill it with new items.
		const lastValueOfNewArray = newArray[newArray.length - 1].item
		for (let newValue = 0; newValue < diff; newValue++) {
			newArray.push({
				item: lastValueOfNewArray + newValue + 1,
				id: crypto.randomUUID(),
			})
		}

		setData(newArray)
		// if you click any front card, the currentIndex should be 1 bigger, if not, the next front card will be slanted
		setCurrentIndex(i === currentIndex ? i + 1 : i)
		setDisableClick(true)
	}

	const [ref, { width }] = useMeasure()
	return (
		<div className={styles.wrap} ref={ref}>
			<AnimatePresence
				onExitComplete={() => setDisableClick(false)} // Re-enable clicks after the exit animation completes
			>
				{data.map((item) => (
					<Card
						width={width * 0.3}
						key={item.id}
						i={item.item}
						handleClick={handleClick}
						currentIndex={currentIndex}
						disableClick={disableClick}
					/>
				))}
			</AnimatePresence>
		</div>
	)
}
