'use client'
import {
	motion,
	useTransform,
	useMotionValueEvent,
	useMotionValue,
} from 'framer-motion'
import React from 'react'
import styles from './AppleWatchDock.module.scss'

function rgbaToHsl(rgbaString) {
	// Parse the RGBA string
	const rgbaRegex = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/
	const match = rgbaString.match(rgbaRegex)
	if (!match) {
		return null // Invalid input
	}

	// Extract the red, green, and blue components
	const red = parseInt(match[1]) / 255
	const green = parseInt(match[2]) / 255
	const blue = parseInt(match[3]) / 255

	// Convert RGB to HSL
	const max = Math.max(red, green, blue)
	const min = Math.min(red, green, blue)
	let h,
		s,
		l = (max + min) / 2

	if (max === min) {
		h = s = 0 // Achromatic
	} else {
		const d = max - min
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
		switch (max) {
			case red:
				h = (green - blue) / d + (green < blue ? 6 : 0)
				break
			case green:
				h = (blue - red) / d + 2
				break
			case blue:
				h = (red - green) / d + 4
				break
		}
		h /= 6
	}

	// Convert HSL to HSL string
	h = Math.round(h * 360)
	s = Math.round(s * 100)
	l = Math.round(l * 100)

	return `hsl(${h}, ${s}%, ${l}%)`
}
function parseHSLString(hslString) {
	const hslRegex = /hsl\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)/
	const match = hslString.match(hslRegex)
	if (match) {
		return {
			h: parseInt(match[1]), // Hue value (0 to 360)
			s: parseInt(match[2]), // Saturation value (0 to 100)
			l: parseInt(match[3]), // Lightness value (0 to 100)
		}
	} else {
		// Handle invalid input
		return null
	}
}

function compareLightness(rgbaStringA, rgbaStringB) {
	let formatColorA = parseHSLString(rgbaToHsl(rgbaStringA))
	let formatColorB = parseHSLString(rgbaToHsl(rgbaStringB))
	const lightnessA = formatColorA.l
	const lightnessB = formatColorB.l
	return lightnessA > lightnessB ? rgbaStringB : rgbaStringA
}

function Ball({ column, row, x, y, columnIndex, rowIndex, duotone }) {
	const leftMargin = 0
	const topMargin = 0
	const ballSize = 50

	const dockSize = 200
	const scaleRange = [0.1, 1.1, 0.1]
	const xRange = [
		// 0,
		-30,
		// 40,
		// (dockSize - ballSize) / 2 - 10,
		(dockSize - ballSize) / 2,
		// (dockSize - ballSize) / 2 + 10,
		// dockSize - 40 - ballSize,
		dockSize + 30 - ballSize,
		// dockSize - ballSize,
	]

	// get balls x and y position using absolute position
	const xOffset =
		leftMargin +
		ballSize * columnIndex +
		leftMargin * columnIndex +
		(row % 2) * 25
	const yOffset = topMargin + ballSize * rowIndex + topMargin * rowIndex

	let divMoveXOffset = useTransform(() => x.get() + xOffset)

	const xScale = useTransform(divMoveXOffset, xRange, scaleRange)

	const [xOffsetValue, setXOffsetValue] = React.useState(divMoveXOffset.get())

	useMotionValueEvent(divMoveXOffset, 'change', (v) =>
		setXOffsetValue(Math.floor(v))
	)

	let divMoveYOffest = useTransform(() => y.get() + yOffset)
	const yRange = [
		// 0,
		-30,
		// 40,
		// (dockSize - ballSize) / 2 - 25,
		(dockSize - ballSize) / 2,
		// (dockSize - ballSize) / 2 + 25,
		// dockSize - 40 - ballSize,
		dockSize + 30 - ballSize,
		// dockSize - ballSize,
	]
	let yScale = useTransform(divMoveYOffest, yRange, scaleRange)

	const [yOffsetValue, setYOffsetValue] = React.useState(divMoveYOffest.get())

	useMotionValueEvent(divMoveYOffest, 'change', (v) =>
		setYOffsetValue(Math.floor(v))
	)

	// one problem, when div come to the top edge or bottom, they shrink to the same size. what i want is the middle one should be bigger than rest and shrink. i think the reason is they are all on the same line, if they are slightly off the line, it will create the effect. check divs move oout of left or right side, because they are off the line, they move out with different size.

	const scale = useMotionValue(1)
	const newScale = Math.min(xScale.current, yScale.current)
	scale.set(newScale)

	//---------------------
	// monotone transform
	const colorA = 'rgba(243, 181, 63, 1)'
	const colorB = 'rgba(54, 0, 223, 1)'

	const colorRange = [colorB, colorA, colorB]

	let xColor = useTransform(divMoveXOffset, yRange, colorRange)
	let yColor = useTransform(divMoveYOffest, yRange, colorRange)

	const duotoneColor = useMotionValue(colorA)
	const newDuotoneColor = compareLightness(xColor.current, yColor.current)
	duotoneColor.set(newDuotoneColor)

	//---------------------
	// get random bg color for ball
	const colors = [
		'var(--color-accent-yellow)',
		'var(--color-accent-red)',
		'var(--color-accent-purple)',
		'var(--color-accent-blue)',
		'var(--color-accent-green)',
		'var(--color-text-100)',
		'var(--color-surface-200)',
	]

	const [color, setColor] = React.useState(undefined)

	React.useEffect(() => {
		setColor(colors[Math.floor(Math.random() * colors.length)])
	}, [])

	return (
		<motion.div
			className={styles.ball}
			key={`${column}-${row}`}
			style={{
				left: xOffset,
				top: yOffset,
				scale,
				backgroundColor: duotone ? duotoneColor : color,
			}}
		></motion.div>
	)
}

export default Ball
