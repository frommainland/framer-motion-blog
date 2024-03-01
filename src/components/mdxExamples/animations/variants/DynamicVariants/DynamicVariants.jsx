'use client'
import React from 'react'
import styles from './DynamicVariants.module.scss'
import { backIn, easeInOut, motion } from 'framer-motion'
import RestartDemoWrap from '@/components/RestartDemoWrap'
import { range } from '@/utils'
import { smooth } from '@/helper/easing'

const itemSize = 50
const quantity = 4

const Item = () => {
	const [child, setChild] = React.useState(null)

	React.useEffect(() => {
		setChild({
			initial: { rotate: Math.floor(Math.random() * 360) },
			animate: { rotate: 0 },
		})
	}, [])

	// const child = {
	// 	initial: () => ({
	// 		rotate: Math.floor(Math.random() * 360),
	// 	}),
	// 	animate: {
	// 		rotate: 0,
	// 	},
	// }

	return (
		<motion.div
			className={styles.item}
			style={{ width: itemSize }}
			variants={child}
			initial="initial"
			animate="animate"
			// set a key, so child obj could be refresh again in nextjs, i guess
			key={child}
			///
			transition={{ duration: 2, ease: smooth }}
		></motion.div>
	)
}

export default function DynamicVariants() {
	return (
		<RestartDemoWrap>
			<div className={styles.wrap}>
				<motion.div
					className={styles.itemWrap}
					style={{ width: itemSize * quantity }}
					initial="initial"
					animate="animate"
				>
					{range(quantity).map((row) =>
						range(quantity).map((column) => {
							return (
								<Item row={row} column={column} key={column} />
							)
						})
					)}
				</motion.div>
			</div>
		</RestartDemoWrap>
	)
}
