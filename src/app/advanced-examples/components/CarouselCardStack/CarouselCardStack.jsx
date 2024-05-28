'use client'
import styles from './CarouselCardStack.module.scss'
import React from 'react'
import { data } from './data'
import Image from 'next/image'
import { motion, LayoutGroup, AnimatePresence } from 'framer-motion'
import { range } from '@/utils'
import { smooth } from '@/helper/easing'
import { CloudLightning } from 'react-feather'

const CarouselCardStack = () => {
	const cardVariants = {
		visible: (i) => ({
			opacity: 1,
			zIndex: [5, 4, 3, 2, 1][i],
			scale: [1, 0.9, 0.8, 0.7, 0.6][i],
			y: [0, 4, 8, 12, 16][i], // Vertical position depending on index (keep scale in mind)
			rotate: [0, 2, 4, 6, 8][i],
			x: [0, 20, 40, 60, 80][i],
			transition: {
				// opacity: { duration: 0.3 },
				zIndex: { delay: 0.05 }, // Delay zIndex to avoid visual stacking issues during transition
				scale: { type: 'spring', duration: 0.3, bounce: 0.3 },
				y: { type: 'spring', duration: 0.3, bounce: 0.3 },
				x: { type: 'spring', duration: 0.5, bounce: 0.1 },
			},
		}),
		exit: { opacity: 0, scale: 0.5, y: 50 },
	}

	const [indices, setIndices] = React.useState([0, 1, 2, 3, 4])

	const [currentIndex, setCurrentIndex] = React.useState(0)
	console.log(currentIndex)

	/**
	 * Experimenting with distilling swipe offset and velocity into a single variable, so the
	 * less distance a user has swiped, the more velocity they need to register as a swipe.
	 * Should accomodate longer swipes and short flicks without having binary checks on
	 * just distance thresholds and velocity > 0.
	 */

	const swipeConfidenceThreshold = 10000
	const swipePower = (offset, velocity) => {
		return Math.abs(offset) * velocity
	}

	const paginate = () => {
		// Rotate the indices array to move each card to the next position
		setIndices((prevIndices) => [
			prevIndices[1],
			prevIndices[2],
			prevIndices[3],
			prevIndices[4],
			prevIndices[0],
		])
	}

	const [cardItemClicked, setCardItemClicked] = React.useState(false)

	const [dragging, setDragging] = React.useState(false)
	const [mouseDown, setMouseDown] = React.useState(false)

	const handleMouseDown = (event) => {
		setMouseDown(true)
	}

	const handleMouseMove = (event) => {
		if (mouseDown) {
			setDragging(true)
		}
	}

	const handleMouseUp = (event) => {
		setMouseDown(false)
		if (!dragging) {
			console.log('Click')
		} else {
			console.log('Drag')
		}
		setDragging(false)
	}
	return (
		<div className={styles.wrap}>
			<div
				className={styles.cardsContainer}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
			>
				{indices.map((item, index) => (
					<motion.div
						className={styles.cardItem}
						key={data[item].id}
						custom={index}
						variants={cardVariants}
						initial="exit"
						animate="visible"
						exit="exit"
						drag={true}
						dragConstraints={{
							left: 0,
							right: 0,
							top: 0,
							bottom: 0,
						}}
						onDragEnd={(e, { offset, velocity }) => {
							e.stopPropagation()
							const swipe = swipePower(offset.x, velocity.x)
							if (
								swipe < -swipeConfidenceThreshold ||
								swipe > swipeConfidenceThreshold
							) {
								paginate()
							}
							setCurrentIndex((pre) => (pre + 1) % data.length)
						}}
						layoutId={`card-container-${index}`}
						onClick={(e) => {
							e.stopPropagation()
							if (!dragging) {
								setCardItemClicked(true)
							}
						}}
					>
						<motion.div
							className={styles.imageContainer}
							layoutId={`card-image-${index}`}
						>
							<Image
								src={data[item].image}
								alt={data[item].title}
								width={650}
								height={320}
								style={{ objectFit: 'cover' }}
							/>
						</motion.div>
						<motion.div
							className={styles.gradient}
							layoutId={`gradient-${index}`}
						></motion.div>
						<motion.div
							className={styles.title}
							layoutId={`title-container-${index}`}
						>
							<p>{data[item].author}</p>
							<h3>{data[item].title}</h3>
						</motion.div>
					</motion.div>
				))}
				{/* bottom indicator bar */}
				<div className={styles.indicatorContainer}>
					{range(data.length).map((item) => (
						<motion.div
							key={item}
							className={styles.indicator}
							animate={{
								backgroundColor:
									item === currentIndex
										? 'var(--color-text-100)'
										: 'var(--color-surface-300)',
							}}
							onClick={() => {
								console.log(123)
								setIndices((prevIndices) => [
									prevIndices[1],
									prevIndices[2],
									prevIndices[3],
									prevIndices[4],
									prevIndices[0],
								])
							}}
						></motion.div>
					))}
				</div>
			</div>

			{/* card detail view */}
			<AnimatePresence>
				{cardItemClicked && !dragging && (
					<>
						<motion.div
							className={styles.overlay}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2, delay: 0.1 }}
						></motion.div>
						<div className={styles.detailViewContainer}>
							<motion.div
								className={styles.cardItemClicked}
								layoutId={`card-container-${currentIndex}`}
								onClick={() => setCardItemClicked(false)}
							>
								<motion.div
									className={styles.imageContainerClicked}
									layoutId={`card-image-${currentIndex}`}
								>
									<Image
										src={data[currentIndex].image}
										alt={data[currentIndex].title}
										fill
										sizes="320px"
										style={{ objectFit: 'cover' }}
									/>
								</motion.div>
								<motion.div
									className={styles.gradientClicked}
									layoutId={`gradient-${currentIndex}`}
								></motion.div>
								<motion.div
									className={styles.titleClicked}
									layoutId={`title-container-${currentIndex}`}
								>
									<p>{data[currentIndex].author}</p>
									<h3>{data[currentIndex].title}</h3>
								</motion.div>
								<motion.p
									className={styles.content}
									initial={{ y: 500, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									exit={{ y: 500, opacity: 0 }}
									transition={{ ease: smooth }}
								>
									Wanderer above the Sea of Fog[a] is a
									painting by German Romanticist artist Caspar
									David Friedrich made in 1818.[2] It depicts
									a man standing upon a rocky precipice with
									his back to the viewer; he is gazing out on
									a landscape covered in a thick sea of fog
									through which other ridges, trees, and
									mountains pierce, which stretches out into
									the distance indefinitely. It has been
									considered one of the masterpieces of
									the Romantic movement and one of its most
									representative works.
								</motion.p>
							</motion.div>
						</div>
					</>
				)}
			</AnimatePresence>
		</div>
	)
}

export default CarouselCardStack
