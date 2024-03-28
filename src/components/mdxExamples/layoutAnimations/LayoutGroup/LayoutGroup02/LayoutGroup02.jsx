'use client'
import React from 'react'
import styles from './LayoutGroup02.module.scss'
import { motion, LayoutGroup } from 'framer-motion'
import { range } from '@/utils'
import SingleCheckBox from '@/components/SingleCheckBox'

function Box({ layoutId, index, clicked, onToggleClicked, useLayoutId }) {
	return (
		<motion.div
			layout
			{...(useLayoutId && { layoutId: layoutId })}
			className={styles.item}
			initial={{ borderRadius: 8 }}
			onClick={() => onToggleClicked(index, clicked)}
			animate={{
				backgroundColor: clicked
					? 'var(--color-accent-yellow)'
					: 'var(--color-surface-200)',
			}}
		>
			{index}
		</motion.div>
	)
}

export default function LayoutGroup02() {
	const totalBoxesNum = 12

	const [totalBox, setTotalBox] = React.useState(() =>
		range(totalBoxesNum).map((value) => {
			return { index: value, clicked: false }
		})
	)

	const onToggleClicked = (index, clicked) => {
		const newTotalBox = totalBox.filter((item) => item.index !== index)
		if (clicked) {
			newTotalBox.push({ index: index, clicked: false })
		} else {
			newTotalBox.unshift({ index: index, clicked: true })
		}
		setTotalBox(newTotalBox)
	}

	const unClickedBoxes = totalBox.filter((item) => item.clicked === false)
	const clickedBoxes = totalBox.filter((item) => item.clicked === true)

	const id = React.useId()

	const [useLayoutId, setUseLayoutId] = React.useState(true)

	return (
		<motion.div className={styles.wrap} layout>
			<LayoutGroup>
				<p
					style={{
						marginBottom: 0,
						color:
							unClickedBoxes.length > 0
								? 'var(--color-text-300)'
								: 'var(--color-surface-200)',
					}}
				>
					{unClickedBoxes.length}
				</p>
				<div className={styles.exampleWrap}>
					{unClickedBoxes.map((item) => {
						const layoutId = `${id}-${item.index}`
						return (
							<Box
								key={item.index}
								layoutId={layoutId}
								index={item.index}
								clicked={item.clicked}
								onToggleClicked={onToggleClicked}
								useLayoutId={useLayoutId}
							/>
						)
					})}
				</div>
				<p
					style={{
						marginBottom: 0,
						color:
							clickedBoxes.length < 1
								? 'var(--color-surface-300)'
								: 'var(--color-accent-yellow)',
					}}
				>
					{clickedBoxes.length}
				</p>
				<div className={styles.exampleWrap}>
					{clickedBoxes.map((item) => {
						const layoutId = `${id}-${item.index}`
						return (
							<Box
								layoutId={layoutId}
								key={item.index}
								index={item.index}
								clicked={item.clicked}
								onToggleClicked={onToggleClicked}
								useLayoutId={useLayoutId}
							/>
						)
					})}
				</div>
			</LayoutGroup>
			<div
				style={{
					position: 'absolute',
					bottom: 20,
					left: '50%',
					transform: 'translateX(-50%)',
				}}
			>
				<SingleCheckBox
					value={useLayoutId}
					setValue={setUseLayoutId}
					id="useLayoutId"
					content="layoutId"
				/>
			</div>
		</motion.div>
	)
}
