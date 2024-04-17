'use client'
import React from 'react'
import styles from './ReorderPartDrag.module.scss'
import { Reorder, useDragControls, motion } from 'framer-motion'
import { Menu } from 'react-feather'

function ListItem({ item }) {
	const dragControls = useDragControls()
	return (
		<Reorder.Item
			value={item}
			whileHover={{
				backgroundColor: 'var(--color-surface-300)',
			}}
			whileDrag={{
				backgroundColor: 'var(--color-accent-yellow)',
			}}
			dragListener={false}
			dragControls={dragControls}
		>
			<p style={{ marginBottom: 0 }}>{item}</p>
			<motion.button
				whileHover={{
					backgroundColor: 'var(--color-accent-yellow)',
				}}
				onTapStart={(event) => dragControls.start(event)}
			>
				<Menu color="var(--color-surface-100)" />
			</motion.button>
		</Reorder.Item>
	)
}

export default function ReorderPartDrag() {
	const [items, setitems] = React.useState([
		'animation',
		'motion values',
		'layout',
		'svg',
		'drag',
	])

	return (
		<div className={styles.wrap}>
			<Reorder.Group
				values={items}
				onReorder={setitems}
				axis="y"
				style={{ listStyle: 'none', paddingLeft: 0 }}
			>
				{items.map((item) => (
					<ListItem key={item} item={item} />
				))}
			</Reorder.Group>
		</div>
	)
}
