'use client'
import React from 'react'
import { motion } from 'framer-motion'
import styles from './RepeatMix.module.scss'
import { range } from '@/utils'

export default function RepeatMix() {
	const [count, setCount] = React.useState(0)
	const [clicked, setClicked] = React.useState(false)
	function handleTest(params) {}
	return (
		<div
			className={styles.wrap}
			onClick={() => setCount((pre) => pre + 1)}
			key={count}
		>
			{/* <motion.div className={styles.outer} layout>
				{range(1).map((item) => (
					<motion.div
						className={styles.petal}
						key={item}
						animate={{ height: 180 }}
					></motion.div>
				))}
			</motion.div> */}
			<motion.div
				className={styles.test}
				animate={{ height: 180 }}
			></motion.div>

			<div
				className={`${styles.wrapper} ${
					clicked ? styles.expanded : ''
				}`}
				onClick={() => setClicked(!clicked)}
			>
				<div className={`${styles.scalingDiv} ${
					clicked ? styles.expanded : ''
				}`}></div>
			</div>
		</div>
	)
}
