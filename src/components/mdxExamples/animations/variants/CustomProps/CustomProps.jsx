'use client'
import React from 'react'
import styles from './CustomProps.module.scss'
import { backIn, easeInOut, motion } from 'framer-motion'
import RestartDemoWrap from '@/components/RestartDemoWrap'
import { range } from '@/utils'
import { smooth } from '@/helper/easing'

const itemSize = 50
const quantity = 3

const Item = ({ customNums }) => {
	const child = {
		initial: { scale: 0 },
		animate: (custom) => ({
			scale: custom >= 1 ? 1 : custom >= 0.5 && custom < 1 ? 0.5 : 0.2,
			transition: {
				delay: custom,
				duration: 1,
				type: 'spring',
				bounce: 0.6,
			},
		}),
	}

	// export function Example() {
	// const variants = {
	//     initial: { scale: 0, opacity: 0 },
	//     start: (custom) => ({
	//         scale: 1,
	//         opacity: 1,
	//         transition: { delay: custom }
	//     })
	// };

	return (
		<motion.div
			custom={customNums}
			className={styles.item}
			style={{ width: itemSize }}
			variants={child}
			initial="initial"
			animate="animate"
			// transition={{ duration: 1, type: 'spring', bounce: 0.5 }}
		></motion.div>
	)
}

export default function CustomProps() {
	const customNums = [0.5, 0.2, 0.5, 0.2, 1, 0.2, 0.5, 0.2, 0.5]
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
							const index = row * quantity + column
							return (
								<Item
									key={column}
									customNums={customNums[index]}
								/>
							)
						})
					)}
				</motion.div>
			</div>
		</RestartDemoWrap>
	)
}
