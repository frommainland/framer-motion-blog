'use client'
import {
	motion,
	useMotionValue,
	useTransform,
	useMotionTemplate,
	useMotionValueEvent,
	animate,
} from 'framer-motion'
import styles from './MapFold.module.scss'
import { useMeasure } from '@uidotdev/usehooks'
import React from 'react'
import Image from 'next/image'

const MapFold = () => {
	const [ref, { width: wrapWidth }] = useMeasure()
	const aspectRatio = 900 / 1397
	const mapContainerHeight = wrapWidth / 3 / aspectRatio
	const dragY = useMotionValue(0)
	const topMapY = useTransform(
		dragY,
		[0, mapContainerHeight / 3],
		[mapContainerHeight / 3, 0]
	)
	const centerScale = useTransform(dragY, [0, mapContainerHeight / 3], [0, 1])

	const brightnessMV = useTransform(
		dragY,
		[40, mapContainerHeight / 3],
		[0, 1]
	)

	const rotateZTop = useTransform(dragY, [0, mapContainerHeight / 3], [-1, 0])
	const rotateZBottom = useTransform(
		dragY,
		[0, mapContainerHeight / 3],
		[2, 0]
	)

	const brightness = useMotionTemplate`brightness(${brightnessMV})`

	const pinScale = useMotionValue(0)
	const contentOpacity = useMotionValue(0)

	useMotionValueEvent(dragY, 'change', (v) => {
		console.log(v)
		if (v == mapContainerHeight / 3) {
			animate(pinScale, 1)
			animate(contentOpacity, 1)
		} else {
			pinScale.set(0)
			contentOpacity.set(0)
		}
	})

	return (
		<div className={styles.wrap} ref={ref}>
			<div
				className={styles.mapContainer}
				style={{
					width: wrapWidth / 3,
					aspectRatio: aspectRatio,
				}}
			>
				<motion.div
					className={styles.mapPiece}
					style={{ y: topMapY, rotateZ: rotateZTop }}
				>
					<div className={styles.gradient}></div>
				</motion.div>
				<motion.div
					className={styles.mapPiece}
					style={{
						scaleY: centerScale,
						filter: brightness,
					}}
				></motion.div>
				<motion.div
					className={styles.mapPiece}
					drag="y"
					dragMomentum={false}
					dragElastic={0}
					dragConstraints={{ top: 0, bottom: mapContainerHeight / 3 }}
					style={{
						top: (mapContainerHeight / 3) * -1,
						y: dragY,
						rotateZ: rotateZBottom,
					}}
					dragTransition={{
						modifyTarget: (target) => {
							return target > mapContainerHeight / 3 / 2
								? mapContainerHeight / 3
								: 0
						},
						timeConstant: 45,
					}}
				>
					<div className={styles.gradient}></div>
				</motion.div>
			</div>
			<motion.div className={styles.mapPin} style={{ scale: pinScale }}>
				<Image
					src="/Mapfold/pin.png"
					alt="map pin"
					width={30}
					height={30}
				/>
			</motion.div>
			<motion.div
				className={styles.content}
				style={{ opacity: contentOpacity }}
			>
				42.7853° N - 108.2917° E
			</motion.div>
		</div>
	)
}

export default MapFold
