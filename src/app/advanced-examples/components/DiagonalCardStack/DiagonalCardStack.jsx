'use client'
import React from 'react'
import styles from './DiagonalCardStack.module.scss'
import { motion } from 'framer-motion'
import { range } from '@/utils'
import Image from 'next/image'
import ColorThief from 'colorthief'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { generateTextColor, rgbToHex } from './color'

const DiagonalCardStack = () => {
	// cardContainer size
	const cardContainerRef = React.useRef(null)
	const [cardContainerSize, setCardContainerSize] = React.useState({
		width: 0,
		height: 0,
	})
	React.useEffect(() => {
		if (cardContainerRef.current) {
			const { width, height } =
				cardContainerRef.current.getBoundingClientRect()
			setCardContainerSize({ width, height })
		}
	}, [])

	// get array from image files.
	function parseStrings(strings) {
		return strings.map((str) => {
			const [author, title] = str.split(' - ')
			return { author, title }
		})
	}

	const Image_Name = [
		'Carl Moll - The Big Poplar',
		'Diego Rivera - El peluquero',
		'Felix Bode - Aeroplane Window',
		'Francis Newton Souza - Men in Boats',
		'Heinrich Maria Davringhausen - Still Life with Ball',
		'John Bellany - Self-Portrait with Black Cat',
		'László Óvári - Spring',
		'Lesser Ury - Waldlandschaft im Abendlicht',
		'Maeve McCarthy - Nightblind',
		'Maurice Estève - Untitled',
		'Mimmo Paladino - La montagna bianca',
		'Natalie Terenzini - Smokers',
		'Shaun Richards - Libertines',
		'Victor Flavell - Four Figures Resting',
	]

	const Images = parseStrings(Image_Name)
	//
	const CARD_NUM = 14
	const CARD_SIZE = cardContainerSize.width / 3
	const CARD_SCALE = 0.38
	const CARD_DISTANCE = 25
	const SmallCardSize = CARD_SIZE * CARD_SCALE

	const [currentIndex, setCurrentIndex] = React.useState(6)

	// distance of two nearest card to the center card
	// since it is a square card and container, the horizotal and vertical distance is the same
	let distanceToCenterCard =
		cardContainerSize.width / 2 - SmallCardSize / 2 - CARD_DISTANCE * 2

	// get background color from current image
	const [donimantColorRaw, setDominantColorRaw] = React.useState(null)
	const [dominantColor, setDominantColor] = React.useState(null)
	const [textColor, setTextColor] = React.useState(null)

	const imageRef = React.useRef(null)
	React.useEffect(() => {
		const getColor = async () => {
			const colorThief = new ColorThief()
			if (imageRef.current) {
				const color = colorThief.getColor(imageRef.current)
				setDominantColorRaw(color)
				setDominantColor(`rgb(${color.join(',')})`)
			}
		}
		getColor()
	}, [currentIndex])

	React.useEffect(() => {
		if (donimantColorRaw) {
			let textColor = generateTextColor(donimantColorRaw)
			setTextColor(rgbToHex(textColor))
		}
	}, [donimantColorRaw])

	return (
		<div className={styles.wrap}>
			<div
				className={styles.cardContainer}
				ref={cardContainerRef}
				style={{
					'--bg': `url('/DiagonalCardStack/painting${currentIndex}.webp')`,
				}}
			>
				<motion.div
					className={styles.backdrop}
					animate={{ backgroundColor: dominantColor }}
				></motion.div>
				{range(Images.length).map((i) => (
					<motion.div
						key={i}
						className={styles.card}
						style={{ zIndex: Images.length - i, width: CARD_SIZE }}
						animate={{
							x:
								i < currentIndex
									? (distanceToCenterCard +
											(currentIndex - i) *
												CARD_DISTANCE) *
									  -1
									: i === currentIndex
									? 0
									: distanceToCenterCard +
									  (i - currentIndex) * CARD_DISTANCE,
							y:
								i < currentIndex
									? distanceToCenterCard +
									  (currentIndex - i) * CARD_DISTANCE
									: i === currentIndex
									? -30
									: (distanceToCenterCard +
											(i - currentIndex) *
												CARD_DISTANCE) *
									  -1,
							skewY: 15,
							scale: i === currentIndex ? 1 : CARD_SCALE,
						}}
						transition={{ duration: 0.35 }}
					>
						<Image
							alt="painting image"
							src={`/DiagonalCardStack/painting${i}.webp`}
							width={CARD_SIZE}
							height={CARD_SIZE}
							style={{ objectFit: 'cover' }}
							ref={(ref) => {
								if (i === currentIndex) {
									imageRef.current = ref
								}
							}}
							crossOrigin="anonymous"
						/>
					</motion.div>
				))}

				<motion.div
					className={styles.info}
					style={{
						top: cardContainerSize.height / 2 + CARD_SIZE / 2,
					}}
					animate={{ color: textColor }}
				>
					<p className={styles.contentNum}>
						-{' '}
						{currentIndex < 9
							? `0${currentIndex + 1}`
							: currentIndex + 1}{' '}
						-
					</p>
					<h3>{Images[currentIndex].title}</h3>
					<p>{Images[currentIndex].author}</p>
				</motion.div>

				<div className={styles.buttonWrap}>
					<motion.button
						style={{
							opacity: 0.5,
							visibility:
								currentIndex === Images.length - 1
									? 'hidden'
									: 'visible',
						}}
						whileHover={{ opacity: 1, scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						onClick={() => {
							setCurrentIndex((prevIndex) => {
								if (prevIndex === Images.length - 1) {
									return Images.length - 1
								} else {
									return prevIndex + 1
								}
							})
						}}
					>
						<ChevronLeft color={textColor} />
					</motion.button>
					<motion.button
						style={{
							opacity: 0.5,
							visibility:
								currentIndex === 0 ? 'hidden' : 'visible',
						}}
						whileHover={{ opacity: 1, scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						onClick={() => {
							setCurrentIndex((prevIndex) => {
								if (prevIndex === 0) {
									return 0
								} else {
									return prevIndex - 1
								}
							})
						}}
					>
						<ChevronRight color={textColor} />
					</motion.button>
				</div>
			</div>
		</div>
	)
}

export default DiagonalCardStack
