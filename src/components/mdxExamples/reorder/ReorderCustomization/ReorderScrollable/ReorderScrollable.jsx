'use client'
import React from 'react'
import styles from './ReorderScrollable.module.scss'
import {
	Reorder,
	useScroll,
	useTransform,
	useMotionValueEvent,
} from 'framer-motion'

function ListItem({ item, groupRef }) {
	const ref = React.useRef(null)
	const { scrollYProgress } = useScroll({
		container: groupRef,
		target: ref,
		offset: ['start start', 'end end'],
		layoutEffect: false,
	})

	const [progress, setProgress] = React.useState(0)
	useMotionValueEvent(scrollYProgress, 'change', (v) => {
		setProgress(v.toFixed(2))
		// this not working, scrolloffset is no working, dont know why
		console.log(v)
	})

	const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])
	return (
		<Reorder.Item
			ref={ref}
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
			{progress}
		</Reorder.Item>
	)
}

export default function ReorderScrollable() {
	const [items, setitems] = React.useState([
		'animation',
		'motion values',
		'layout',
		'svg',
		'drag',
	])

	const groupRef = React.useRef(null)

	return (
		<div className={styles.wrap}>
			<Reorder.Group
				ref={groupRef}
				values={items}
				onReorder={setitems}
				axis="y"
				style={{ padding: '1em', listStyle: 'none' }}
				layoutScroll
			>
				{items.map((item) => (
					<ListItem key={item} groupRef={groupRef} item={item} />
				))}
			</Reorder.Group>
		</div>
	)
}
