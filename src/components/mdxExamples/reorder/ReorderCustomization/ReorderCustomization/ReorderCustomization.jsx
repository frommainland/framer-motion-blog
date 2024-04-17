'use client'
import React from 'react'
import styles from './ReorderCustomization.module.scss'
import { motion, Reorder, AnimatePresence } from 'framer-motion'
import { useCountDown } from './useCountDown'

const ListItem = React.forwardRef(({ item, deleteItem, setdrag }, ref) => {
	const [clicked, setClicked] = React.useState(false)

	const [deleteConfirm, setDeleteConfirm] = React.useState(false)
	const [counter, start, reset] = useCountDown(1, 1000, () =>
		setDeleteConfirm(true)
	)

	React.useEffect(() => {
		if (deleteConfirm) {
			deleteItem(item)
		}
	}, [deleteConfirm])

	return (
		<Reorder.Item
			ref={ref}
			value={item}
			whileHover={{
				backgroundColor: 'var(--color-surface-300)',
			}}
			whileDrag={{
				backgroundColor: 'var(--color-accent-yellow)',
			}}
			onDrag={() => setdrag(true)}
			onDragEnd={() => setdrag(false)}
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, x: 300 }}
		>
			<div className={styles.contentWrap}>
				<motion.button
					className={styles.selector}
					onClick={() => {
						setClicked(!clicked)

						if (clicked) {
							reset()
						} else {
							start()
						}
					}}
					animate={{
						borderColor: clicked
							? 'var(--color-accent-green)'
							: 'var(--color-text-300)',
					}}
				>
					<motion.div
						className={styles.dot}
						animate={{
							scale: clicked ? 1 : 0,
						}}
					></motion.div>
				</motion.button>
				<motion.p animate={{ opacity: clicked ? 0.25 : 1 }}>
					{item}
				</motion.p>
			</div>
		</Reorder.Item>
	)
})

ListItem.displayName = 'ListItem'

export default function ReorderCustomization() {
	const FULLITEMS = [
		'intro',
		'main props',
		'motion values',
		'animation',
		'layout',
		'svg',
		'drag',
		'reorder',
	]

	const [items, setitems] = React.useState(FULLITEMS)

	function deleteItem(item) {
		const newItems = [...items]
		newItems.splice(items.indexOf(item), 1)
		setitems(newItems)
	}

	function getNewItem() {
		const newAnimal = FULLITEMS.find((item) => !items.includes(item))
		if (newAnimal) setitems([...items, newAnimal])
	}

	const [drag, setdrag] = React.useState(false)

	const buttonVariant = {
		visible: {
			opacity: 1,
		},
		invisible: {
			opacity: 0,
		},
		disabled: {
			color: 'var(--color-surface-300)',
		},
	}

	const [buttondisable, setbuttondisable] = React.useState(true)

	React.useEffect(() => {
		if (items.length === FULLITEMS.length) {
			setbuttondisable(true)
		} else {
			setbuttondisable(false)
		}
	}, [items])

	return (
		<div className={styles.wrap}>
			<div className={styles.stickyButtonWrap}>
				<Reorder.Group
					values={items}
					onReorder={setitems}
					axis="y"
					id={styles.listWrap}
				>
					<AnimatePresence initial={false} mode="popLayout">
						{items.map((item, index) => (
							<ListItem
								item={item}
								key={item}
								deleteItem={deleteItem}
								setdrag={setdrag}
							/>
						))}
					</AnimatePresence>
					<div style={{ height: '1em' }}></div>
				</Reorder.Group>
				<motion.button
					variants={buttonVariant}
					className={styles.addItem}
					onClick={getNewItem}
					animate={
						drag
							? 'invisible'
							: buttondisable
							? 'disabled'
							: 'visible'
					}
					disabled={buttondisable}
				>
					add item
				</motion.button>
			</div>
		</div>
	)
}
