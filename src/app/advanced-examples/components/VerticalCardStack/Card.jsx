'use client'
import React from 'react'
import { motion, useMotionValueEvent, useTransform } from 'framer-motion'
import styles from './VerticalCardStack.module.scss'
import { clamp } from '@/utils'
import Image from 'next/image'

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
	function handleCardClick(i) {
		if (!isDragging) {
			setCardClickedIndex(i)
			setsingleView(!singleView)
			y.set(0)
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
				// pointerEvents: singleView ? 'none' : 'auto',
			}}
			onClick={() => handleCardClick(i)}
			variants={{
				single: {
					y: 0.25 * CARD_SIZE.height,
					scale: 1.5,
					rotateX: 0,
				},
				stack: {
					y: cardToCardDis * i,
					scale: 1,
				},
				down: {
					y: CARD_SIZE.height * 1.5,
					scale: 1,
				},
			}}
			animate={
				!singleView
					? 'stack'
					: i === cardClickedIndex
					? 'single'
					: 'down'
			}
			transition={{ duration: 0.5 }}
			whileHover={{
				y: singleView
					? 0.25 * CARD_SIZE.height
					: cardToCardDis * i - 10,
				transition: { duration: 0.2 },
			}}
		>
			{!singleView && (
				<div
					className={styles.cardGradient}
					style={{ borderRadius: '.25em' }}
				></div>
			)}

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
