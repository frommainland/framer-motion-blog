'use client'
import React from 'react'
import Image from 'next/image'
import styles from './VelocityCursor.module.scss'
import { useMouse } from '@uidotdev/usehooks'
import {
	motion,
	useSpring,
	useMotionValue,
	useTransform,
	useVelocity,
} from 'framer-motion'
import CursorTarget from './CursorTarget'

export const VelocityCursor = () => {
	const [isActive, setIsActive] = React.useState(false)
	const [data, setData] = React.useState('')
	const [mouse, ref] = useMouse()
	const cursorSize = 160

	const x = useMotionValue(0)
	const y = useMotionValue(0)

	React.useEffect(() => {
		x.set(mouse.elementX - cursorSize / 2)
		y.set(mouse.elementY - cursorSize / 2)
	}, [mouse])

	const springConfig = { mass: 0.2, damping: 50, stiffness: 400 }

	// const springConfig = {
	// 	mass: 0.75,
	// 	damping: 20,
	// 	stiffness: 150,
	// }

	const xSmooth = useSpring(x, springConfig)
	const ySmooth = useSpring(y, springConfig)

	const xVelocity = useVelocity(xSmooth)
	const yVelocity = useVelocity(ySmooth)

	const rawScale = useTransform([xVelocity, yVelocity], ([x, y]) => {
		const baseScale = 1
		const averageVelocity = Math.sqrt(x ** 2 + y ** 2)
		return isActive
			? baseScale + Math.min(averageVelocity / 1000, 0.2)
			: 0.1
	})

	const scale = useSpring(rawScale, springConfig)

	// not working
	// const rawSkewX = useTransform(xVelocity, [-700, 0, 700], [-40, 0, 40])
	// const rawSkewY = useTransform(yVelocity, [-700, 0, 700], [-40, 0, 40])
	// const skewX = useSpring(rawSkewX, springConfig)
	// const skewY = useSpring(rawSkewY, springConfig)

	const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

	const rawSkew = useTransform([xVelocity, yVelocity], ([x, y]) => {
		return clamp((Math.sign(y) * x) / 40, -40, 40)
	})
	const skew = useSpring(rawSkew, springConfig)

	return (
		<div className={styles.wrap} ref={ref}>
			<p>
				A digital design taste driven by{' '}
				<CursorTarget setIsActive={setIsActive} setData={setData}>
					efficiency
				</CursorTarget>{' '}
				&{' '}
				<CursorTarget setIsActive={setIsActive} setData={setData}>
					creativity
				</CursorTarget>
			</p>
			<motion.div
				className={styles.cursor}
				style={{
					x: xSmooth,
					y: ySmooth,
					width: cursorSize,
					height: cursorSize,
					scale,
					skewX: skew,
					skewY: skew,
					pointerEvents: 'none',
				}}
			>
				{isActive && (
					<Image
						src={`/VelocityCursor/${data}.webp`}
						width={cursorSize}
						height={cursorSize}
						alt={`Picture of the ${data}`}
						style={{
							borderRadius: '100em',
							objectFit: 'cover',
						}}
					/>
				)}
			</motion.div>
		</div>
	)
}
