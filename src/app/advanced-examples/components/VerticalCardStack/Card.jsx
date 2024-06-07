'use client'
import React from 'react'
import {
	AnimatePresence,
	animate,
	motion,
	useMotionValue,
	useMotionValueEvent,
	useTransform,
} from 'framer-motion'
import styles from './VerticalCardStack.module.scss'
import { clamp } from '@/utils'
import Image from 'next/image'
import { smooth } from '@/helper/easing'
import { NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER } from 'next/dist/lib/constants'

export const Card = ({
	i,
	CARD_SIZE,
	singleView,
	isDragging,
	setsingleView,
	cardClickedIndex,
	setCardClickedIndex,
	y,
	sceneHeight,
}) => {
	// track down when in stack view, click on card and track its current drag y value. So when click card on single view, it will go back where the card was clicked
	const stackViewYTrack = React.useRef(0)
	// const [stackViewYTrack, setStackViewYTrack] = React.useState(0)
	function handleCardClick(i) {
		if (!isDragging) {
			setCardClickedIndex(i)
			setsingleView(!singleView)
			if (singleView) {
				y.set(stackViewYTrack.current)
			}
			if (!singleView) {
				stackViewYTrack.current = y.get()
				y.set(0)
			}
		}
	}

	const rotateX = useTransform(y, (v) => {
		let rotate = clamp(-40 - i * 2 - v / 10, -135, -35)
		return rotate
	})

	const zIncrement = useTransform(y, [0, sceneHeight], [0, 180], {
		clamp: false,
	})
	const z = useTransform(zIncrement, (v) => {
		return v + i * 30
	})

	// calculate the top edge of the card to the bottom edge of the dragcontainer
	// the closer the distance, the bigger the rotateZ is, should be ranged from [0, 180]
	const cardToCardDis = 50

	// border-image: linear-gradient(180deg, var(--color-text-300) 0%, rgba(0, 0, 0, 0.5) 58%) 1;
	return (
		<motion.div
			layout
			className={styles.card}
			key={i}
			style={{
				position: 'absolute',
				left: 50,
				// rotateZ: singleView ? 0 : rotateZ,
				rotateX: singleView ? 0 : rotateX,
				z: singleView ? 0 : z,
				borderRadius: '.25em',
				pointerEvents:
					singleView && i !== cardClickedIndex ? 'none' : 'auto',
				// opacity: singleView ? 1 : opacity,
			}}
			onClick={() => handleCardClick(i)}
			variants={{
				single: {
					y: 0.25 * CARD_SIZE.height,
					scale: 1.5,
					rotateX: 0,

					borderColor: 'var(--color-surface-200)',
					transition: {
						type: 'spring',
						bounce: 0.2,
					},
				},
				stack: {
					y: cardToCardDis * i,
					scale: 1,
					borderColor: 'var(--color-text-100)',
					transition: {
						duration: 0.3,
						delay: i === cardClickedIndex ? 0 : 0.15,
						ease: 'easeIn',
					},
				},
				down: {
					y: CARD_SIZE.height * 1.5,
					scale: 0.7,
					transition: {
						type: 'spring',
						bounce: 0.2,
					},
				},
			}}
			animate={
				!singleView
					? 'stack'
					: i === cardClickedIndex
					? 'single'
					: 'down'
			}
			whileHover={{
				y: singleView
					? 0.25 * CARD_SIZE.height
					: cardToCardDis * i - 10,
				transition: { duration: 0.1 },
			}}
		>
			<AnimatePresence>
				{!singleView && (
					<motion.div
						className={styles.cardGradient}
						style={{ borderRadius: '.25em' }}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					/>
				)}
			</AnimatePresence>

			<Image
				src={`/VerticalCardStack/red${i + 1}.webp`}
				width={CARD_SIZE.width * 1.5}
				height={CARD_SIZE.height * 1.5}
				style={{ objectFit: 'cover', borderRadius: '.25em' }}
				alt="red color images"
			/>
		</motion.div>
	)
}
