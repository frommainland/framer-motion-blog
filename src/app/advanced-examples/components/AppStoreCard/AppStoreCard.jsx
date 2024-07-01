'use client'
import { AnimatePresence, motion, useIsPresent } from 'framer-motion'
import styles from './AppStoreCard.module.scss'
import { Maximize2, X } from 'react-feather'
import React from 'react'
import { useMeasure } from '@uidotdev/usehooks'

const data = [
	{
		id: 0,
		color: 'var(--color-accent-green)',
		p: 'Investor management',
		span: 'Investor management',
		svg: 'M 44 7 C 44 11 41 14 38 15 C 41 15 44 18 44 22 C 44 26 41 29 38 29 C 41 30 44 33 44 37 C 44 41 41 44 37 44 C 33 44 30 41 29 38 C 29 41 26 44 22 44 C 18 44 15 41 15 38 C 14 41 11 44 7 44 C 3 44 0 41 0 37 C 0 33 3 30 6 29 C 3 29 0 26 0 22 C 0 18 3 15 6 15 C 3 14 0 11 0 7 C 0 3 3 0 7 0 C 11 0 14 3 15 6 C 15 3 18 0 22 0 C 26 0 29 3 29 6 C 30 3 33 0 37 0 C 41 0 44 3 44 7 Z M 15 9 C 14 12 12 14 9 15 C 12 15 14 18 15 21 C 15 18 18 15 21 15 C 18 14 15 12 15 9 Z M 23 15 C 26 14 29 12 29 9 C 30 12 32 14 35 15 C 32 15 30 18 29 21 C 29 18 26 15 23 15 Z M 29 35 C 30 32 32 30 35 29 C 32 29 30 26 29 23 C 29 26 26 29 23 29 C 26 30 29 32 29 35 Z M 15 23 C 15 26 18 29 21 29 C 18 30 15 32 15 35 C 14 32 12 30 9 29 C 12 29 14 26 15 23 Z',
		articles: [
			'The State of US Early-Stage Venture & Startups: 3Q24',
			'Introducing: AngelList Data Room',
			'Introducing: AngelList Transact',
			'Introducing: AngelList Investor Portal',
		],
	},
	{
		id: 1,
		color: 'var(--color-accent-yellow)',
		p: 'Financial Service',
		span: 'Consolidate your capital management',
		svg: 'M44 22C44 22 44 12 38 6C32 0 22 0 22 0C22 0 22 0 22 0C22 0 12 0 6 6C0 12 0 22 0 22C0 22 10 23 16 16C22 11 22 2 22 0C22 2 22 11 27 16C33 23 44 22 44 22ZM6 38C0 32 0 22 0 22C0 22 10 21 16 28C22 34 22 42 22 44C22 42 22 34 27 28C33 21 44 22 44 22C44 22 44 32 38 38C32 44 22 44 22 44C22 44 22 43 22 43C22 43 22 44 22 44C22 44 12 44 6 38Z',
		articles: [
			'Introducing: AngelList Treasury',
			'Impact of new SEC Private Fund rules on VC',
			'How AngelList automates tax form parsing',
		],
	},
	{
		id: 2,
		color: 'var(--color-accent-purple)',
		p: 'Full Service Funds',
		span: 'Access 50+ services',
		svg: 'M44 22C44 22 34 36 22 36C10 36 0 22 0 22C0 22 10 8 22 8C34 8 44 22 44 22ZM32 22C32 27 28 32 22 32C16 32 12 27 12 22C12 17 16 12 22 12C28 12 32 17 32 22ZM22 27C25 27 28 25 28 22C28 19 25 17 22 17C19 17 16 19 16 22C16 25 19 27 22 27Z',
		articles: [
			'AngelList’s Full Service Fund Management Offering',
			'The plan for AngelList Equity',
			'A new way to navigate AngelList',
		],
	},
]

function Card({ data, setCurrentIndex }) {
	const { color, p, span, svg, id } = data
	const [isHover, setIsHover] = React.useState(false)
	return (
		<motion.div
			className={styles.cardWrap}
			style={{ borderRadius: 12 }}
			onClick={() => setCurrentIndex(id)}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
			layoutId={`cardWrap-${id}`}
		>
			<motion.div layoutId={`mark-${id}`} className={styles.mark}>
				<svg
					width="44"
					height="44"
					viewBox="0 0 44 44"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d={svg}
						fill={color}
					/>
				</svg>
			</motion.div>
			<motion.div className={styles.content} layoutId={`content-${id}`}>
				<p>{p}</p>
				<span>{span}</span>
			</motion.div>
			<motion.button
				layoutId={`expand-${id}`}
				className={styles.expand}
				style={{ rotate: -180 }}
				animate={{
					backgroundColor: isHover
						? 'var(--color-surface-200)'
						: 'var(--color-surface-300)',
				}}
			>
				<Maximize2 color="var(--color-text-200)" size={18} />
			</motion.button>
		</motion.div>
	)
}

function FullView({ currentIndex, setCurrentIndex, width, height }) {
	return (
		<AnimatePresence>
			{currentIndex !== null && (
				<div className={styles.boxOpenContainer}>
					<motion.div
						layoutId={`cardWrap-${currentIndex}`}
						className={styles.boxOpen}
						style={{
							width,
							height: (height / 3) * 4,
							borderRadius: 12,
							overflow: 'hidden',
						}}
					>
						<div className={styles.top}>
							<motion.div
								layoutId={`mark-${currentIndex}`}
								className={styles.mark}
								animate={{ x: -80 }}
							>
								<svg
									width="44"
									height="44"
									viewBox="0 0 44 44"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d={data[currentIndex].svg}
										fill={data[currentIndex].color}
									/>
								</svg>
							</motion.div>
							<motion.div
								className={styles.content}
								layoutId={`content-${currentIndex}`}
								animate={{ x: -40 }}
							>
								<p>{data[currentIndex].p}</p>
								<span>{data[currentIndex].span}</span>
							</motion.div>
							<motion.button
								layoutId={`expand-${currentIndex}`}
								className={styles.expand}
								animate={{
									rotate: 0,
								}}
								whileHover={{
									backgroundColor: 'var(--color-surface-200)',
								}}
								onClick={() => setCurrentIndex(null)}
							>
								<X color="var(--color-text-200)" />
							</motion.button>
						</div>
						<div className={styles.actionWrap}>
							<button
								style={{
									backgroundColor: data[currentIndex].color,
								}}
							>
								Get started
							</button>
							<button className={styles.secondary}>
								Explore Software Suite
							</button>
						</div>
						<div className={styles.articleWrap}>
							<span>articles</span>
							<ul>
								{data[currentIndex].articles.map((item) => (
									<li key={item}>{item}</li>
								))}
							</ul>
						</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	)
}

const AppStoreCard = () => {
	const [currentIndex, setCurrentIndex] = React.useState(null)
	const [allCardsRef, { width, height }] = useMeasure()

	return (
		<div className={styles.wrap}>
			<div ref={allCardsRef}>
				{data.map((item) => (
					<Card
						key={item.id}
						data={item}
						setCurrentIndex={setCurrentIndex}
					/>
				))}
			</div>
			<FullView
				currentIndex={currentIndex}
				setCurrentIndex={setCurrentIndex}
				width={width}
				height={height}
			/>
		</div>
	)
}

export default AppStoreCard
