'use client'

import React from 'react'
import styles from './CursorConfetti.module.scss'
import Image from 'next/image'
import {
	motion,
	useMotionValue,
	useMotionValueEvent,
	useTransform,
	useSpring,
	useVelocity,
	animate,
	useCycle,
} from 'framer-motion'
import { range } from '@/utils'
import { smooth, bouncy } from '@/helper/easing'

const clamp = (num, min, max) => Math.min(Math.max(num, min), max)
const springConfig1 = { mass: 0.2, damping: 150, stiffness: 400 }
const springConfig = { type: 'spring', bounce: 0.7 }
function decay(value, max) {
	if (max === 0) {
		return 0
	}
	let entry = value / max
	let sigmoid = 2 * (1 / (1 + Math.exp(-entry)) - 0.5)

	return sigmoid * max
}

function CursorConfetti() {
	const wrapRef = React.useRef(null)

	const mouseXMV = useMotionValue(0)
	const mouseYMV = useMotionValue(0)

	const [wrapSize, setWrapSize] = React.useState({ width: 0, height: 0 })

	function handleMouseMove(e) {
		if (!wrapRef) return
		const { clientX, clientY } = e
		const rect = wrapRef.current.getBoundingClientRect()
		const duckCenterX = rect.left + rect.width / 2
		const duckCenterY = rect.top + rect.height / 2
		mouseXMV.set(clientX - duckCenterX)
		mouseYMV.set(clientY - duckCenterY)
	}

	React.useEffect(() => {
		if (!wrapRef.current) return
		setWrapSize({
			width: wrapRef.current.offsetWidth,
			height: wrapRef.current.offsetHeight,
		})
	}, [])

	const duckX = useTransform(mouseXMV, (x) => {
		const movableRange = (wrapSize.width / 2) * 0.3
		return decay(x, movableRange)
	})

	const duckY = useTransform(mouseYMV, (y) => {
		const movableRange = (wrapSize.height / 2) * 0.3
		return decay(y, movableRange)
	})

	const rotate = useTransform([duckX, duckY], ([x, y]) => {
		return clamp((Math.sign(x) * y) / 8, -40, 40)
	})
	const rotateSmooth = useSpring(rotate, springConfig)

	const distance = useTransform([duckX, duckY], ([x, y]) => {
		return Math.hypot(x, y)
	})

	const scale = useTransform(
		distance,
		[Math.hypot(wrapSize.width * 0.3, wrapSize.height * 0.3), 0],
		[3.2, 1]
	)

	// const scaleSmooth = useSpring(scale, springConfig)

	// confetti config
	const totalConfetti = 24
	const random = (min, max) => Math.floor(Math.random() * (max - min)) + min
	const radiusAverage = wrapSize.width / 2

	const [radius, setRadius] = React.useState([])

	const generateRandomRadii = () => {
		const array = range(totalConfetti).map((i) => {
			const newRadius = random(-60, 60) + radiusAverage
			return newRadius
		})
		setRadius(array)
	}

	const [degree, setDegree] = React.useState([])
	const degreeAverage = 360 / totalConfetti
	const generateDegrees = () => {
		const array = range(totalConfetti).map((i) => {
			const newDegree = i * degreeAverage + random(-20, 20)
			return newDegree
		})
		setDegree(array)
	}

	const [size, setSize] = React.useState([])
	const sizeBase = 50
	const generateSizes = () => {
		const array = range(totalConfetti).map((i) => {
			const newSize = sizeBase + random(-20, 20)
			return newSize
		})
		setSize(array)
	}

	function polarToCartesian(radius, degree) {
		const radians = degree * (Math.PI / 180)
		const x = radius * Math.cos(radians)
		const y = radius * Math.sin(radians)
		return { x, y }
	}

	function generateConfetti() {
		generateRandomRadii()
		generateDegrees()
		generateSizes()
	}

	const [confettiPos, setConfettiPos] = React.useState([])
	React.useEffect(() => {
		const positions = radius.map((r, index) =>
			polarToCartesian(r, degree[index])
		)
		setConfettiPos(positions)
	}, [radius, degree])

	function resetPos() {
		setConfettiPos([])
	}

	// change main image

	const [mainImg, cycleImg] = useCycle('duck.gif', 'coin.png', 'crystal.gif')

	return (
		<div
			className={styles.wrap}
			ref={wrapRef}
			onMouseMove={handleMouseMove}
			onMouseLeave={async () => {
				await Promise.all([
					animate(duckX, 0, {
						type: 'spring',
						bounce: 0.7,
					}).finished,
					animate(duckY, 0, {
						type: 'spring',
						bounce: 0.7,
					}).finished,
				]).then()
				cycleImg()
				mouseXMV.set(0)
				mouseYMV.set(0)
				generateConfetti()
			}}
		>
			<motion.div
				style={{
					x: duckX,
					y: duckY,
					rotate: rotateSmooth,
					zIndex: 1000,
					position: 'relative',
					width: 100,
					height: 120,
					scale,
				}}
			>
				<Image
					src={`/CursorConfetti/${mainImg}`}
					fill
					sizes="100px"
					alt="duck"
					style={{ objectFit: 'cover' }}
					priority
					as="image"
				/>
			</motion.div>

			{confettiPos.map((item, index) => (
				<motion.div
					key={index}
					initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
					className={styles.confettiItem}
					animate={{
						x: item.x,
						y: item.y,
						opacity: [0, 1, 1, 0],
						scale: [0.5, 1, 1, 0.2],
					}}
					transition={{
						ease: 'backOut',
						duration: 2,
						times: [0, 0.2, 0.8, 1],
					}}
					style={{ width: size[index] }}
					onAnimationComplete={() => resetPos()}
				>
					<Image
						src={`/CursorConfetti/${mainImg}`}
						fill
						sizes={`${size[index]}px`}
						style={{ objectFit: 'cover' }}
						alt="confetti"
						priority
						as="image"
					/>
				</motion.div>
			))}
		</div>
	)
}

export default CursorConfetti
