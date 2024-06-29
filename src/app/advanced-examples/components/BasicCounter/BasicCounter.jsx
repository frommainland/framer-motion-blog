'use client'
import { AnimatePresence, motion } from 'framer-motion'
import styles from './BasicCounter.module.scss'

import React from 'react'
import { range } from '@/utils'
import { smooth } from '@/helper/easing'

function BasicCounter() {
	const [counter, setCounter] = React.useState(9)
	const [direction, setDirection] = React.useState()

	const counterDigits = counter.toString().split('')

	const [additionalRotation, setAdditionalRotation] = React.useState(0)

	return (
		<div className={styles.wrap}>
			<div className={styles.counterWrap}>
				<button
					onClick={() => {
						setCounter((pre) => pre - 1)
						setDirection('down')
					}}
				>
					-
				</button>

				{/* <div className={styles.digitsWrap}>
					{counterDigits.map((item, index) => (
						<motion.div className={styles.digit} key={index}>
							<AnimatePresence initial={false}>
								<motion.span
									key={item}
									initial={{
										y:
											direction === 'up'
												? '100%'
												: '-200%',
										x: '-50%',
										filter: 'blur(2px)',
										opacity: 0,
										scale: 0.6,
									}}
									animate={{
										y: '-50%',
										x: '-50%',
										filter: 'blur(0px)',
										opacity: 1,
										scale: 1,
									}}
									exit={{
										y:
											direction === 'up'
												? '-200%'
												: '100%',
										x: '-50%',
										filter: 'blur(2px)',
										opacity: 0,
										scale: 0.6,
									}}
								>
									{item}
								</motion.span>
							</AnimatePresence>
						</motion.div>
					))}
				</div> */}

				<div className={styles.digitsWrap}>
					{counterDigits.map((item, index) => (
						<motion.div className={styles.digit} key={index}>
							<AnimatePresence initial={false}>
								<motion.span
									key={item}
									initial={{
										y:
											direction === 'up'
												? '100%'
												: '-200%',
										x: '-50%',
										filter: 'blur(2px)',
										opacity: 0,
										scale: 0.6,
									}}
									animate={{
										y: '-50%',
										x: '-50%',
										filter: 'blur(0px)',
										opacity: 1,
										scale: 1,
									}}
									exit={{
										y:
											direction === 'up'
												? '-200%'
												: '100%',
										x: '-50%',
										filter: 'blur(2px)',
										opacity: 0,
										scale: 0.6,
									}}
								>
									{item}
								</motion.span>
							</AnimatePresence>
						</motion.div>
					))}
				</div>

				<button
					onClick={() => {
						setDirection('up')
						setCounter((pre) => pre + 1)
					}}
				>
					+
				</button>
			</div>
			{/* <motion.div
				style={{
					width: 44,
					height: 44,
					border: '1px solid red',
					position: 'relative',
					// overflow: 'hidden',
				}}
			>
				{range(10).map((item) => (
					<motion.div
						key={item}
						style={{
							rotate: (360 / 10) * item,
							border: '1px solid green',
							position: 'absolute',
							top: '50%',
							y: '-50%',
							width: 200,
						}}
						animate={{
							rotate: (360 / 10) * item + additionalRotation,
						}}
						transition={{
							duration: 1,
						}}
						onAnimationComplete={() =>
							setAdditionalRotation(additionalRotation - 36)
						}
					>
						<p
							style={{
								margin: '0 !important',
								paddingLeft: 10,
							}}
						>
							{item}
						</p>
					</motion.div>
				))}
			</motion.div> */}

			<motion.div
				style={{
					width: 44,
					height: 44,
					border: '1px solid red',
					position: 'relative',
					// overflow: 'hidden',
				}}
			>
				<motion.div
					key={1}
					style={{
						rotate: 36,
						border: '1px solid green',
						position: 'absolute',
						top: '50%',
						y: '-50%',
						width: 200,
					}}
					// animate={{
					// 	rotate: (360 / 10) * item + additionalRotation,
					// }}
                    animate={{rotate: -36}}
					transition={{
						duration: 1,
					}}
				>
					<p
						style={{
							margin: '0 !important',
							paddingLeft: 10,
						}}
					>
						{0}
					</p>
				</motion.div>
			</motion.div>
		</div>
	)
}

export default BasicCounter
