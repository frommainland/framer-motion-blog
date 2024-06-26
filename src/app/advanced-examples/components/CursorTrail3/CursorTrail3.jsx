'use client'
import {
	motion,
	transform,
	useAnimate,
	useAnimationFrame,
	useMotionValue,
	useVelocity,
} from 'framer-motion'
import styles from './CursorTrail3.module.scss'
import React from 'react'
import { range } from '@/utils'
import Image from 'next/image'

function mix(a, b, x) {
	return a + (b - a) * x
}

function distance(p1, p2) {
	let x = p1.x - p2.x
	let y = p1.y - p2.y

	return Math.hypot(x, y)
}

function TrailImage({ position, item }) {
	const [scope, animate] = useAnimate()

	React.useEffect(() => {
		if (!position) return
		const { xOrigin, x, yOrigin, y, scale, blur } = position
		animate(
			scope.current,
			{
				// x: [xOrigin, x, x],
				// y: [yOrigin, y, y],
				// scale: [1, 1, 0.2],
				opacity: [1, 1, 0],
				transform: [
					`translate(-50%, -50%) translate(${xOrigin}px, ${yOrigin}px) scale(1)`,
					`translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`,
					`translate(-50%, -50%) translate(${x}px, ${y}px) scale(0.2)`,
				],
				// filter: [0, 4, 0],
				filter: [`blur(${blur}px)`, `blur(0)`, `blur(${blur}px)`],
			},
			{
				duration: 0.7,
				times: [0, 0.7, 1],
				ease: ['easeOut', 'easeIn', 'easeInOut'],
			}
		)
	}, [position])

	const style = position ? position.style : {}

	return (
		<motion.div
			ref={scope}
			initial={{ opacity: 0 }}
			className={styles.trailImageWrap}
			style={{ ...style }}
		>
			<Image
				src={`/CursorTrail3/image${item + 1}.webp`}
				alt="rebus"
				width={100}
				height={100}
				sizes="12vw"
				style={{ width: '100%', height: 'auto' }}
			/>
		</motion.div>
	)
}

function CursorTrail3({ distanceThreshold = 90 }) {
	const totalImages = 15

	const wrapRef = React.useRef(null)

	const mouseInfo = React.useRef({
		now: { x: 0, y: 0 },
		prev: { x: 0, y: 0 },
		prevImage: { x: 0, y: 0 },
	})

	const [index, setIndex] = React.useState(0)

	const imagePositions = React.useRef([])

	// console.log(imagePositions)
	const x = useMotionValue(0)
	const y = useMotionValue(0)
	const xVelocity = useVelocity(x)
	const yVelocity = useVelocity(y)

	useAnimationFrame(() => {
		const mouseDistance = distance(
			mouseInfo.current.now,
			mouseInfo.current.prevImage
		)

		mouseInfo.current.prev = {
			x: mix(mouseInfo.current.prev.x, mouseInfo.current.now.x, 0.1),
			y: mix(mouseInfo.current.prev.y, mouseInfo.current.now.y, 0.1),
		}

		if (mouseDistance > distanceThreshold) {
			const newIndex = index + 1
			// ?? totalImages or totalImages - 1
			const imageIndex = newIndex % (totalImages - 1)
			let currentXVelocity = xVelocity.current
			let currentYVelocity = yVelocity.current

			let currentVelocity = Math.hypot(currentXVelocity, currentYVelocity)

			const scaleTransformer = transform([0, 2000], [1, 2])
			const scaleFactor = scaleTransformer(currentVelocity)

			const blurTransformer = transform([0, 2000], [10, 0])
			const blurFactor = blurTransformer(currentVelocity)

			imagePositions.current[imageIndex] = {
				xOrigin: mouseInfo.current.prev.x,
				yOrigin: mouseInfo.current.prev.y,
				x: mouseInfo.current.now.x,
				y: mouseInfo.current.now.y,
				scale: scaleFactor,
				blur: blurFactor,
				style: {
					zIndex: newIndex,
				},
			}
			mouseInfo.current.prevImage = mouseInfo.current.now
			setIndex(newIndex)
		}
	})

	return (
		<div
			className={styles.wrap}
			ref={wrapRef}
			onMouseMove={(e) => {
				if (!wrapRef) return
				let rect = wrapRef.current.getBoundingClientRect()
				mouseInfo.current.now = {
					x: e.clientX - rect.left,
					y: e.clientY - rect.top,
				}
				x.set(e.clientX - rect.left)
				y.set(e.clientY - rect.top)
			}}
		>
			{range(15).map((item) => (
				<TrailImage
					position={imagePositions.current[item]}
					key={item}
					item={item}
				/>
			))}
		</div>
	)
}

export default CursorTrail3
