'use client'
import React from 'react'
import styles from './style.module.scss'
import {
	animate,
	motion,
	useMotionTemplate,
	useMotionValue,
} from 'framer-motion'

const SVGCursorCurveVertical = ({
	svgWidth,
	svgHeight,
	strokeColor,
	circleR = 6,
}) => {
	const svgWrapRef = React.useRef(null)

	let xValue = svgWidth / 2

	const x = useMotionValue(svgWidth / 2)
	const y = useMotionValue(svgHeight / 2)

	const xAnimationRef = React.useRef(null)
	const yAnimationRef = React.useRef(null)

	const handleMouseEnter = () => {
		setIsHover(true)
		// Stop any ongoing animations
		if (xAnimationRef.current) {
			xAnimationRef.current.stop()
		}
		if (yAnimationRef.current) {
			yAnimationRef.current.stop()
		}
	}

	const handleMouseMove = (e) => {
		if (!svgWrapRef.current) return
		const { clientY, movementX } = e
		const rect = svgWrapRef.current.getBoundingClientRect()
		const mouseY = clientY - rect.top

		xValue = xValue + movementX
		x.set(xValue)
		y.set(mouseY)
	}

	// svg path
	const pathPoint = useMotionTemplate`M ${
		svgWidth / 2
	} ${circleR} Q ${x} ${y} ${svgWidth / 2} ${svgHeight - circleR}`

	function handleMouseLeave() {
		setIsHover(false)
		xValue = svgWidth / 2
		xAnimationRef.current = animate(x, svgWidth / 2, {
			type: 'spring',
			stiffness: 300,
		})
		yAnimationRef.current = animate(y, svgHeight / 2, {
			type: 'spring',
			stiffness: 300,
		})
	}

	const [isHover, setIsHover] = React.useState(false)

	return (
		<div className={styles.line} style={{ width: 1, height: svgHeight }}>
			<div
				className={styles.box}
				style={{
					width: isHover ? svgWidth : 20,
					height: '100%',
					left: isHover ? (svgWidth / 2) * -1 : -10,
				}}
				onMouseEnter={handleMouseEnter}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
			></div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox={`0 0 ${svgWidth} ${svgHeight}`}
				style={{
					width: svgWidth,
					height: svgHeight,
					top: 0,
					left: -svgWidth / 2,
				}}
			>
				<circle
					cx={svgWidth / 2}
					cy={circleR}
					r={circleR}
					fill="#D9D9D9"
				/>
				<circle
					cx={svgWidth / 2}
					cy={svgHeight - circleR}
					r={circleR}
					fill="#D9D9D9"
				/>
				<motion.path
					d={pathPoint}
					stroke={isHover ? '#BA7F0F' : `${strokeColor}`}
					strokeWidth="3"
					strokeLinecap="round"
					fill="none"
					ref={svgWrapRef}
				/>
			</svg>
		</div>
	)
}

export default SVGCursorCurveVertical
