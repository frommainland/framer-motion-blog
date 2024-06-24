'use client'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import styles from './CardWheel.module.scss'
import React from 'react'
import { useMeasure } from '@uidotdev/usehooks'
import { range } from '@/utils'
import { gentleEase, quick } from '@/helper/easing'
import Wheel from './Wheel'
import Image from 'next/image'
import ColorThief from 'colorthief'

const CardWheel = () => {
	const [currentSignIndex, setCurrentSignIndex] = React.useState(0)
	const [wheelDirection, setWheelDirection] = React.useState(null)

	const [dominantColor, setDominantColor] = React.useState(null)

	const imageRef = React.useRef(null)
	const handleImageLoad = async () => {
		if (!imageRef.current || imageRef.current.naturalWidth === 0) return
		const colorThief = new ColorThief()
		const color = colorThief.getColor(imageRef.current)
		if (color) {
			setDominantColor(`rgb(${color.join(',')})`)
		}
	}

	React.useEffect(() => {
		if (imageRef.current) {
			if (imageRef.current.complete) {
				handleImageLoad()
			} else {
				imageRef.current.addEventListener('load', handleImageLoad)
			}
			return () => {
				if (imageRef.current) {
					imageRef.current.removeEventListener(
						'load',
						handleImageLoad
					)
				}
			}
		}
	}, [currentSignIndex])

	const [circleWrapRef, { width: circleWrapWidth }] = useMeasure()

	return (
		<div className={styles.wrap}>
			<Wheel
				currentSignIndex={currentSignIndex}
				setCurrentSignIndex={setCurrentSignIndex}
				setWheelDirection={setWheelDirection}
			/>
			<motion.div
				ref={circleWrapRef}
				className={styles.circleWrap}
				animate={{ outlineColor: dominantColor }}
				style={{
					outlineWidth: circleWrapWidth * 0.1,
					outlineOffset: -circleWrapWidth * 0.1,
				}}
			>
				<AnimatePresence>
					<motion.div
						className={styles.circle}
						style={{ width: circleWrapWidth * 0.6 }}
						initial={{
							x: circleWrapWidth,
							y:
								wheelDirection === 'up'
									? circleWrapWidth
									: -circleWrapWidth,
						}}
						animate={{
							x: circleWrapWidth * 0.2,
							y: circleWrapWidth * 0.2,
							transition: {
								x: {
									// ease: 'easeOut',
									type: 'spring',
									...quick,
								},
								y: {
									// ease: 'easeIn',
									type: 'spring',
									...gentleEase,
								},
							},
						}}
						exit={{
							x: circleWrapWidth,
							y:
								wheelDirection === 'up'
									? -circleWrapWidth
									: circleWrapWidth,
							transition: {
								x: {
									// ease: 'easeIn',
									type: 'spring',
									...gentleEase,
								},
								y: {
									// ease: 'easeOut',
									type: 'spring',
									...quick,
								},
							},
						}}
						key={currentSignIndex}
					>
						<Image
							src={`/CardWheel/emotion${currentSignIndex}.webp`}
							alt="emotions"
							width={circleWrapWidth * 0.6}
							height={circleWrapWidth * 0.6}
							style={{ objectFit: 'cover' }}
							ref={imageRef}
						/>
					</motion.div>
				</AnimatePresence>
			</motion.div>
			{/* <div style={{ position: 'absolute', bottom: 0 }}>
				{wheelDirection}
			</div> */}
		</div>
	)
}

export default CardWheel
