'use client'
import styles from './CardHoverAccordian.module.scss'
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { range } from '@/utils'
import { useMeasure } from '@uidotdev/usehooks'
import Image from 'next/image'
import { Plus } from 'react-feather'
import { quick } from '@/helper/easing'

const CardHoverAccordian = () => {
	const cardNum = 4

	const images = [
		{ title: 'Little Girl Practicing at the Bar', time: 'ca. unkown' },
		{ title: 'Seated Dancer', time: 'ca. 1873–1874' },
		{ title: 'The Dance Lesson', time: 'ca. 1873–1874' },
		{ title: 'The Star', time: 'ca. 1879–1881' },
	]
	const [ref, { width, height }] = useMeasure()

	const [hoverIndex, setHoverIndex] = React.useState(null)

	return (
		<div className={styles.wrap} ref={ref}>
			<div
				className={styles.cardsWrap}
				style={{ width: 0.6 * width, height: 0.6 * height }}
			>
				{range(cardNum).map((i) => (
					<motion.div
						layout
						key={i}
						className={styles.card}
						whileHover={{ flex: 5 }}
						style={{ flex: 1 }}
						onMouseEnter={() => {
							setHoverIndex(i)
						}}
						onMouseLeave={() => {
							setHoverIndex(null)
						}}
					>
						<motion.div
							layout
							className={styles.imageWrap}
							animate={{
								height:
									hoverIndex === i
										? 0.48 * height
										: 0.6 * height,
							}}
						>
							<Image
								src={`/CardHoverAccordian/${images[i].title}.webp`}
								width={600}
								height={600}
								style={{
									objectFit: 'cover',
								}}
								alt="Edgar Degas's painting"
							/>
						</motion.div>
						<AnimatePresence>
							{hoverIndex === i && (
								<div className={styles.contentWrap}>
									<motion.p
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										style={{
											fontWeight: 500,
											paddingBottom: '.25em',
										}}
									>
										{images[i].title}
									</motion.p>
									<motion.p
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
									>
										{images[i].time}
									</motion.p>
								</div>
							)}
						</AnimatePresence>
						<AnimatePresence>
							{hoverIndex === i && (
								<motion.button
									className={styles.add}
									initial={{ bottom: -48, scale: 0 }}
									animate={{ bottom: 24, scale: 1 }}
									exit={{ bottom: -48, scale: 0 }}
									transition={{
										type: 'spring',
										...quick,
									}}
								>
									<Plus />
								</motion.button>
							)}
						</AnimatePresence>
					</motion.div>
				))}
			</div>
		</div>
	)
}

export default CardHoverAccordian
