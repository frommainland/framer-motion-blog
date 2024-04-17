'use client'
import React from 'react'
import styles from './ReorderBasic02.module.scss'
import { motion, Reorder } from 'framer-motion'
import { range } from '@/utils'
import SingleCheckBox from '@/components/SingleCheckBox'

export default function ReorderBasic02() {
	const contents = range(6)
	const [items, setitems] = React.useState(contents)

	const [flexRow, setflexRow] = React.useState(true)
	return (
		<div className={styles.wrap}>
			<SingleCheckBox
				value={flexRow}
				setValue={setflexRow}
				id="flexRow"
				content="flex row"
			/>
			<Reorder.Group
				values={items}
				onReorder={setitems}
				axis={flexRow ? 'x' : 'y'}
				style={{ flexDirection: flexRow ? 'row' : 'column' }}
			>
				{items.map((item) => (
					<Reorder.Item
						key={item}
						value={item}
						whileHover={{
							backgroundColor: 'var(--color-surface-300)',
						}}
						whileDrag={{
							backgroundColor: 'var(--color-accent-yellow)',
							scale: 1.15,
						}}
						style={{ width: flexRow ? '4em' : '10em' }}
					>
						{item}
					</Reorder.Item>
				))}
			</Reorder.Group>
		</div>
	)
}
