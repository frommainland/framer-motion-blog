'use client'
import React from 'react'
import styles from './SharedLayout01.module.scss'
import { motion, MotionConfig } from 'framer-motion'
import SingleCheckBox from '@/components/SingleCheckBox'
import SingleSlider from '@/components/SingleSlider'

export default function SharedLayout01() {
	const tabs = [
		{ color: 'var(--color-accent-red)', title: '✔' },
		{ color: 'var(--color-accent-blue)', title: '✔' },
		{ color: 'var(--color-accent-yellow)', title: '✔' },
		{ color: 'var(--color-accent-purple)', title: '✔' },
	]

	const [useSharedLayout, setuseSharedLayout] = React.useState(true)
	const [currentIndex, setcurrentIndex] = React.useState(0)
	const [animationSpeed, setanimationSpeed] = React.useState(0.5)

	const [formerColor, setformerColor] = React.useState(tabs[0].color)

	const id = React.useId()

	return (
		<MotionConfig
			transition={{ duration: animationSpeed, ease: 'easeInOut' }}
		>
			<div className={styles.wrap}>
				<div className={styles.exampleWrap}>
					{tabs.map(({ color, title }, index) => {
						return (
							<motion.div
								key={index}
								className={styles.item}
								onClick={() => {
									setcurrentIndex(index)
									setformerColor(tabs[currentIndex].color)
								}}
								animate={{
									backgroundColor:
										index === currentIndex
											? tabs[index].color
											: 'var(--color-surface-200)',
								}}
							>
								{index === currentIndex &&
									useSharedLayout === true && (
										<motion.div
											className={styles.indicator}
											layoutId={`${id}-indicator`}
											initial={{
												color: formerColor,
											}}
											animate={{
												color: color,
											}}
										>
											{title}
										</motion.div>
									)}
								{index === currentIndex &&
									useSharedLayout === false && (
										<motion.div
											className={styles.indicator}
											initial={{
												color: formerColor,
											}}
											animate={{
												color: color,
											}}
										>
											{title}
										</motion.div>
									)}
							</motion.div>
						)
					})}
				</div>

				<div className={styles.configWrap}>
					<SingleCheckBox
						value={useSharedLayout}
						setValue={setuseSharedLayout}
						id="useSharedLayout"
						content="Shared Layout"
					/>
					<SingleSlider
						label="animation speed"
						id="shared layout animation speed"
						min={0.3}
						max={2}
						step={0.1}
						value={animationSpeed}
						setValue={setanimationSpeed}
					/>
				</div>
			</div>
		</MotionConfig>
	)
}
