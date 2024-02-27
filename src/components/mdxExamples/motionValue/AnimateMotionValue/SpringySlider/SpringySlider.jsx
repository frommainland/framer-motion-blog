'use client'
import React from 'react'
import styles from './SpringySlider.module.scss'
import {
	animate,
	motion,
	useMotionValue,
	useMotionValueEvent,
	useTransform,
} from 'framer-motion'
import { VolumeX, Volume2, Volume1, Volume } from 'react-feather'

// Sigmoid-based decay function
function decay(value, max) {
	if (max === 0) {
		return 0
	}
	let entry = value / max
	let sigmoid = 2 * (1 / (1 + Math.exp(-entry)) - 0.5)

	return sigmoid * max
}

export default function SpringySlider() {
	const [volume, setVolume] = React.useState(50)
	const overflow = useMotionValue(0)
	const [mousePos, setMousePos] = React.useState('middle')
	const clientX = useMotionValue(0)
	const scaleX = useMotionValue(1)

	const scale = useMotionValue(1)
	const opacity = useMotionValue(0.7)

	const MAX_OVERFLOW = 50
	const sliderWidth = 200
	const sliderHeight = 10
	const SPRING = { type: 'spring', bounce: 0.5 }

	const height = useTransform(
		overflow,
		[0, MAX_OVERFLOW],
		[sliderHeight, sliderHeight * 0.7]
	)

	useMotionValueEvent(overflow, 'change', (v) => {
		let containedValue = decay(v, MAX_OVERFLOW)
		if (mousePos === 'left') {
			clientX.set(containedValue * -1)
			scaleX.set(1 + containedValue / sliderWidth)
		} else if (mousePos === 'right') {
			clientX.set(containedValue)
			scaleX.set(1 + containedValue / sliderWidth)
		} else {
			clientX.set(0)
		}
	})

	return (
		<div className={styles.wrap}>
			<motion.div
				className={styles.sliderWrap}
				style={{ scale, opacity }}
				onHoverStart={() => {
					animate(scale, 1, SPRING)
					animate(opacity, 1, SPRING)
				}}
				onHoverEnd={() => {
					animate(scale, 0.9, SPRING)
					animate(opacity, 0.7, SPRING)
				}}
			>
				<motion.div
					style={{
						x: mousePos === 'left' ? clientX : 0,
						lineHeight: 0,
					}}
					animate={{
						scale: mousePos === 'left' ? [1, 1.5, 1] : 1,
					}}
					transition={{ duration: 0.25 }}
				>
					{volume <= 1 ? (
						<VolumeX color="var(--color-text-200)" />
					) : (
						<Volume1 color="var(--color-text-200)" />
					)}
				</motion.div>

				<motion.form
					onSubmit={(event) => {
						event.preventDefault()
					}}
					onPointerMove={(e) => {
						const { left, right } =
							e.currentTarget.getBoundingClientRect()

						// mouse is dragging
						if (e.buttons > 0) {
							// mouse moves left outside the input
							if (e.clientX < left) {
								overflow.set(left - e.clientX)
								setMousePos('left')
							}
							// mouse moves right ouside the input
							else if (e.clientX > right) {
								overflow.set(e.clientX - right)
								setMousePos('right')
							} // mouse within the input
							else {
								overflow.set(0)
								setMousePos('middle')
                                overflow.jump
							}
						}
					}}
					onLostPointerCapture={(e) => {
						animate(overflow, 0, {
							type: 'spring',
							bounce: 0.5,
						})
					}}
					style={{ scaleX, originX: mousePos === 'left' ? 1 : 0 }}
				>
					<motion.input
						type="range"
						id="volume-slider"
						min={0}
						max={100}
						value={volume}
						onChange={(event) => {
							setVolume(event.target.value)
						}}
						className={styles.slider}
						style={{ width: sliderWidth, height }}
					/>
				</motion.form>
				<motion.div
					style={{
						x: mousePos === 'right' ? clientX : 0,
						lineHeight: 0,
					}}
					animate={{
						scale: mousePos === 'right' ? [1, 1.5, 1] : 1,
					}}
					transition={{ duration: 0.25 }}
				>
					<Volume2 color="var(--color-text-200)" />
				</motion.div>
			</motion.div>
			<div id={styles.springySliderContent}>
				<div className={styles.itemWrap}>
					<motion.p>
						{useTransform(() => Math.floor(clientX.get()))}
					</motion.p>
					<p>Offset</p>
				</div>
				<div className={styles.itemWrap}>
					<p>{volume}</p>
					<p>Volume</p>
				</div>
				<div className={styles.itemWrap}>
					<div className={styles.postionWrap}>
						<p data-open={mousePos === 'left' ? true : false}>L</p>
						<p data-open={mousePos === 'middle' ? true : false}>
							M
						</p>
						<p data-open={mousePos === 'right' ? true : false}>R</p>
					</div>
					<p>Position</p>
				</div>
			</div>
		</div>
	)
}
