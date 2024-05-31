'use client'
import styles from './ShuffleFlipCard.module.scss'
import { motion, AnimatePresence } from 'framer-motion'
import React from 'react'

const ShuffleFlipCard = () => {
	const [isClicked, setIsClicked] = React.useState(false)
	const [isDragging, setIsDragging] = React.useState(false)
	const dragcontrol = React.useRef(null)

	const handleClick = () => {
		if (!isDragging) {
			setIsClicked(!isClicked)
		}
	}

	return (
		<div ref={dragcontrol} className={styles.wrap}>
			<motion.div
				drag
				dragConstraints={dragcontrol}
				onDragStart={() => setIsDragging(true)}
				onDragEnd={() => setIsDragging(false)}
				onClick={handleClick}
				layoutId="box"
				className={styles.box}
				style={{
					top: '50%',
					left: '50%',
					borderRadius: 20,
					width: 120,
					height: 120,
				}}
				transition={{ duration: 1, ease: 'circInOut' }}
			/>

			<AnimatePresence>
				{isClicked && (
					<motion.div
						drag
						onDragStart={() => setIsDragging(true)}
						onDragEnd={() => setIsDragging(false)}
						layoutId="box"
						className={styles.box}
						onClick={handleClick}
						style={{
							top: 60,
							right: 90,
							borderRadius: 60,
							backgroundColor: 'red',
							width: 40,
							height: 40,
						}}
						transition={{ duration: 1, ease: 'circInOut' }}
					/>
				)}
			</AnimatePresence>
		</div>
	)
}

export default ShuffleFlipCard

{
	/* <motion.div
				className={styles.scene}
				drag
				dragConstraints={dragcontrol}
				onDragStart={() => setIsDragging(true)}
				onDragEnd={() => setIsDragging(false)}
				onClick={handleClick}
				layoutId="card"
			>
				<motion.div
					className={styles.card}
					animate={{ rotateY: isClicked ? 180 : 0 }}
					transition={{ duration: 0.75 }}
				>
					<div
						className={`${styles.cardFace} ${styles.cardFace__front}`}
					></div>
					<div
						className={`${styles.cardFace} ${styles.cardFace__back}`}
					></div>
				</motion.div>
			</motion.div> */
}

{
	/* open */
}
{
	/* {isClicked && (
				<motion.div
					className={styles.sceneOpen}
					layoutId="card"
					onClick={handleClick}
				></motion.div>
			)} */
}
