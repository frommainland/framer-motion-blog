'use client'
import React from 'react'
import styles from './ReorderBasic.module.scss'
import { Reorder } from 'framer-motion'

export default function ReorderBasic() {
	const [items, setitems] = React.useState([
		'animation',
		'motion values',
		'layout',
		'svg',
		'drag',
	])
	return (
		<div className={styles.wrap}>
			<Reorder.Group values={items} onReorder={setitems} axis="y">
				{items.map((item) => (
					<Reorder.Item
						key={item}
						value={item}
						whileHover={{
							backgroundColor: 'var(--color-surface-300)',
						}}
						whileDrag={{
							backgroundColor: 'var(--color-accent-yellow)',
						}}
					>
						{item}
					</Reorder.Item>
				))}
			</Reorder.Group>
		</div>
	)
}
