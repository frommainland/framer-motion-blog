'use client'
import React from 'react'
import styles from './LayoutGroupNaming.module.scss'
import { LayoutGroup, motion } from 'framer-motion'
import SingleCheckBox from '@/components/SingleCheckBox'

function SharedLayoutComponent() {
	const tabs = [
		{ color: 'var(--color-accent-red)', title: '✔' },
		{ color: 'var(--color-accent-blue)', title: '✔' },
		{ color: 'var(--color-accent-yellow)', title: '✔' },
		{ color: 'var(--color-accent-purple)', title: '✔' },
	]

	const [currentIndex, setcurrentIndex] = React.useState(0)

	const [formerColor, setformerColor] = React.useState(tabs[0].color)

	return (
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
						{index === currentIndex && (
							<motion.div
								className={styles.indicator}
								layoutId="layoutGroupNamingTest"
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
	)
}

export default function LayoutGroupNaming() {
	const [useLayoutGroupNaming, setuseLayoutGroupNaming] =
		React.useState(false)

	return (
		<div className={styles.wrap}>
			{useLayoutGroupNaming ? (
				<>
					<LayoutGroup id="layoutGroupNaming1">
						<SharedLayoutComponent />
					</LayoutGroup>
					<LayoutGroup id="layoutGroupNaming2">
						<SharedLayoutComponent />
					</LayoutGroup>
				</>
			) : (
				<>
					<SharedLayoutComponent />
					<SharedLayoutComponent />
				</>
			)}

			<div
				style={{
					position: 'absolute',
					bottom: 20,
					left: '50%',
					transform: 'translateX(-50%)',
				}}
			>
				<SingleCheckBox
					value={useLayoutGroupNaming}
					setValue={setuseLayoutGroupNaming}
					id="useLayoutGroupNaming"
					content="LayoutGroup Naming"
				/>
			</div>
		</div>
	)
}
