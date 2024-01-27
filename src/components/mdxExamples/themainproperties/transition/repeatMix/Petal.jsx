import React from 'react'
import { easeIn, motion } from 'framer-motion'
import styles from './Petal.module.scss'
import { range } from '@/utils'

export default function Petal({ repeatType, animOptions }) {
	const { duration, repeatDelay } = animOptions

	const [petalNum, setPetalNum] = React.useState(12)
	let transition = {
		duration,
		ease: easeIn,
		repeat: Infinity,
		repeatType: repeatType,
	}
	return (
		<div className={styles.container}>
			<motion.div
				className={styles.outer}
				layout
				animate={{ width: 220, height: 220 }}
				transition={transition}
			>
				{range(petalNum).map((item) => {
					return (
						<motion.div
							className={styles.petalWrap}
							key={item}
							initial={{ x: '-50%', y: '-50%' }}
							animate={{
								rotate: 360 - item * (360 / petalNum),
								x: '-50%',
								y: '-50%',
							}}
							transition={transition}
							style={{ zIndex: petalNum - item }}
						>
							<motion.div
								className={styles.petal}
								animate={{ height: 120 }}
								transition={transition}
							></motion.div>
						</motion.div>
					)
				})}
			</motion.div>
			<p>{repeatType}</p>
		</div>
	)
}
