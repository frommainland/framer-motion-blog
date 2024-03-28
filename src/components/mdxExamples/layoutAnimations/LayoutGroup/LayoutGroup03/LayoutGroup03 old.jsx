'use client'
import React from 'react'
import styles from './LayoutGroup03.module.scss'
import {
	motion,
	LayoutGroup,
	MotionConfig,
	useTransform,
	useMotionValue,
} from 'framer-motion'
import { range } from '@/utils'
import useKeypress from 'react-use-keypress'

function Box({ currentIndex, index, handleClick }) {
	const indexMotionValue = useMotionValue(index)
	const backgroundColor = useTransform(
		indexMotionValue,
		[currentIndex - 5, currentIndex, currentIndex + 5],
		['#2C2D29', '#F3B53F', '#2C2D29']
	)

	return (
		<motion.div
			layout
			className={styles.item}
			initial={{ borderRadius: 8 }}
			onClick={() => handleClick(index)}
			style={{
				width: index === currentIndex ? 120 : 40,
			}}
			animate={{
				backgroundColor: backgroundColor.get(),
				marginLeft: index === currentIndex ? '6%' : 0,
				marginRight: index === currentIndex ? '6%' : 0,
			}}
		></motion.div>
	)
}

export default function LayoutGroup03() {
	const totalBox = 14
	const [currentIndex, setCurrentIndex] = React.useState(0)

	function handleClick(index) {
		setCurrentIndex(index)
	}

	useKeypress('ArrowLeft', () => {
		if (currentIndex < totalBox - 1) {
			setCurrentIndex(currentIndex + 1)
		}
	})

	useKeypress('ArrowRight', () => {
		if (currentIndex > 0) {
			setCurrentIndex(currentIndex - 1)
		}
	})
	return (
		<MotionConfig transition={{ ease: [0.32, 0.72, 0, 1], duration: 0.7 }}>
			<div className={styles.wrap}>
				<LayoutGroup>
					<div className={styles.exampleWrap}>
						<motion.div
							className={styles.exampleViewbox}
							animate={{
								x: `-${
									(1 / 3) * 100 * currentIndex +
									6 +
									currentIndex * 4
								}%`,
							}}
						>
							{range(totalBox).map((item, index) => (
								<Box
									key={item}
									index={index}
									currentIndex={currentIndex}
									handleClick={handleClick}
								/>
							))}
						</motion.div>
					</div>
                    <div>test</div>
				</LayoutGroup>
				<p>click or press key ← → </p>
			</div>
		</MotionConfig>
	)
}
