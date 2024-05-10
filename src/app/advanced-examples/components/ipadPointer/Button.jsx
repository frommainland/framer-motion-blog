'use client'
import * as React from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

const Button = ({
	onHoverOn,
	onHoverOff,
	originX,
	originY,
	children,
	rect,
}) => {
	const buttonRef = React.useRef(null)
	const [buttonRect, setbuttonRect] = React.useState(null)

	const originXMV = useMotionValue(0)
	const originYMV = useMotionValue(0)

	React.useEffect(() => {
		originXMV.set(originX)
		originYMV.set(originY)
	}, [originX, originY])

	const x = useTransform(originXMV, [0, 1], [-2, 2])
	const y = useTransform(originYMV, [0, 1], [-2, 2])

	return (
		<motion.button
			ref={buttonRef}
			style={{
				width: 'fit-content',
				padding: '16px 24px',
				fontSize: 16,
				fontWeight: 500,
				position: 'relative',
				color: 'white',
				cursor: 'none',
			}}
			transition={{
				type: 'spring',
				stiffness: 1000,
				damping: 70,
			}}
			whileHover={{
				scale: 1.02,
			}}
			onMouseEnter={() => {
				if (buttonRef.current !== undefined) {
					const buttonRect = buttonRef.current.getBoundingClientRect()
					onHoverOn(buttonRect)
					setbuttonRect(buttonRect)
				}
			}}
			onMouseLeave={() => {
				onHoverOff()
			}}
		>
			<motion.div
				key="content"
				style={{
					position: 'relative',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					x: rect === buttonRect ? x : 0,
					y: rect === buttonRect ? y : 0,
				}}
			>
				{children}
			</motion.div>
		</motion.button>
	)
}

export default Button
