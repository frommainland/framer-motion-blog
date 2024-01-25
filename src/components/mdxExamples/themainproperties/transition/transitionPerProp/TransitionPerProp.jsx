'use client'
import React from 'react'
import styles from './TransitionPerProp.module.scss'
import { motion } from 'framer-motion'
import { useMeasure } from '@uidotdev/usehooks'
import bezier from 'bezier-easing'
import Field from '@/components/Field'

export default function TransitionPerProp() {
	const [values, setValues] = React.useState({
		xPos: {
			posEase: 'easeIn',
			posRepeatType: 'mirror',
			horizontal: true,
			vertical: false,
		},
		yPos: {
			posEase: 'easeOut',
			posRepeatType: 'mirror',
			horizontal: false,
			vertical: true,
		},
	})

	let key = JSON.stringify(values)

	return (
		<div className={styles.wrap} key={key}>
			<DiagramMix values={values} />
			<Arrow />
			<div
				style={{
					display: 'flex',
					gap: '8em',
					justifyContent: 'center',
				}}
			>
				<Diagram values={values} setValues={setValues} title="xPos" />
				<Diagram values={values} setValues={setValues} title="yPos" />
			</div>
		</div>
	)
}

function Diagram({ values, setValues, title }) {
	const easingName = [
		'easeIn',
		'easeOut',
		'easeInOut',
		'easeIn-Cubic',
		'easeOut-Cubic',
		'easeInOut-Cubic',
	]

	const repeatTypeName = ['mirror', 'reverse']

	const handleEase = (e) => {
		const { id, value } = e.target
		let splitId = id.split('.')
		setValues({
			...values,
			[splitId[0]]: {
				...values[splitId[0]],
				[splitId[1]]: value,
			},
		})
	}

	return (
		<div className={styles.gridWrap}>
			<CurveBall values={values} title={title} />
			<Field label="ease">
				<select
					id={`${title}.posEase`}
					value={values[title].posEase}
					onChange={handleEase}
				>
					{easingName.map((item) => {
						return (
							<option key={item} value={item}>
								{item}
							</option>
						)
					})}
				</select>
			</Field>
			<Field label="RepeatType">
				<select
					id={`${title}.posRepeatType`}
					value={values[title].posRepeatType}
					onChange={handleEase}
				>
					{repeatTypeName.map((item) => {
						return (
							<option key={item} value={item}>
								{item}
							</option>
						)
					})}
				</select>
			</Field>
		</div>
	)
}
function CurveBall({ values, title }) {
	const id = React.useId()
	const [ref, { width, height }] = useMeasure()
	const ballSize = 16
	const easeName = values[title].posEase
	const { posRepeatType, horizontal, vertical } = values[title]

	const EASINGS = {
		easeIn: [0.42, 0, 1, 1],
		easeOut: [0, 0, 0.58, 1.0],
		easeInOut: [0.42, 0, 0.58, 1.0],
		'easeIn-Cubic': [0.32, 0, 0.67, 0],
		'easeOut-Cubic': [0.33, 1, 0.68, 1],
		'easeInOut-Cubic': [0.65, 0, 0.35, 1],
		custom01: [0.65, 0, 0.35, 1],
		custom02: [0.45, 0.1, 0.45, 0.8],
		linear: [0, 0, 1, 1],
	}
	return (
		<div>
			<div className={styles.grid} ref={ref} key={id}>
				<motion.div
					style={{ width: ballSize }}
					className={styles.ball}
					initial={{ x: 0, y: 0 }}
					animate={{
						x: horizontal ? width - ballSize : 0,
						y: vertical ? height - ballSize : 0,
					}}
					key={`${easeName}-${posRepeatType}`}
					transition={{
						x: {
							ease: EASINGS[easeName],
							repeatType: posRepeatType,
							repeat: Infinity,
							duration: 2,
						},
						y: {
							ease: EASINGS[easeName],
							repeatType: posRepeatType,
							repeat: Infinity,
							duration: 2,
						},
					}}
				></motion.div>
			</div>
			<p>{title}</p>
		</div>
	)
}

function DiagramMix({ values }) {
	const newValues = {
		...values,
		xPos: {
			...values.xPos,
			horizontal: true,
			vertical: true,
		},
		yPos: {
			...values.yPos,
			horizontal: true,
			vertical: true,
		},
	}

	const [ref, { width: gridWidth, height: gridHeight }] = useMeasure()
	const ballSize = 16
	const easeXName = newValues.xPos.posEase
	const easeYName = newValues.yPos.posEase
	const repeatX = values.xPos.posRepeatType
	const repeatY = values.yPos.posRepeatType

	const EASINGS = {
		easeIn: [0.42, 0, 1, 1],
		easeOut: [0, 0, 0.58, 1.0],
		easeInOut: [0.42, 0, 0.58, 1.0],
		'easeIn-Cubic': [0.32, 0, 0.67, 0],
		'easeOut-Cubic': [0.33, 1, 0.68, 1],
		'easeInOut-Cubic': [0.65, 0, 0.35, 1],
	}
	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<div className={styles.gridWrap}>
				<div>
					<div className={styles.grid} ref={ref}>
						<motion.div
							style={{ width: ballSize }}
							className={styles.ball}
							initial={{ x: 0, y: 0 }}
							animate={{
								x: gridWidth - ballSize,
								y: gridHeight - ballSize,
							}}
							transition={{
								x: {
									ease: EASINGS[easeXName],
									repeatType: repeatX,
									repeat: Infinity,
									duration: 2,
								},
								y: {
									ease: EASINGS[easeYName],
									repeatType: repeatY,
									repeat: Infinity,
									duration: 2,
								},
							}}
						></motion.div>
						<Trail
							values={newValues}
							EASINGS={EASINGS}
							gridWidth={gridWidth}
						/>
					</div>
					<p>combined path</p>
				</div>
			</div>
		</div>
	)
}

function Trail({ values, EASINGS, gridWidth }) {
	const trailBallSize = 8
	const fps = 10
	const gridSize = gridWidth - trailBallSize

	// get name: easeIn
	let easingXname = values.xPos.posEase

	// get array[0.42, 0, 1, 1]
	let easingXCurve = EASINGS[easingXname]

	let easingYname = values.yPos.posEase
	let easingYCurve = EASINGS[easingYname]

	let xRepeatType = values.xPos.posRepeatType
	let yRepeatType = values.yPos.posRepeatType

	const EASING_SWITCH_LOOKUP = {
		easeIn: 'easeOut',
		easeOut: 'easeIn',
		'easeIn-Cubic': 'easeOut-Cubic',
		'easeOut-Cubic': 'easeIn-Cubic',
		easeInOut: 'easeInOut',
		'easeInOut-Cubic': 'easeInOut-Cubic',
		// Add more lookup pairs here...
	}

	function switchEasing(easing) {
		const easingName = Object.keys(EASINGS).find(
			(key) => EASINGS[key] === easing
		)
		return EASINGS[EASING_SWITCH_LOOKUP[easingName]]
	}

	// first half
	let easingX = bezier(
		easingXCurve[0],
		easingXCurve[1],
		easingXCurve[2],
		easingXCurve[3]
	)
	let easingY = bezier(
		easingYCurve[0],
		easingYCurve[1],
		easingYCurve[2],
		easingYCurve[3]
	)

	const pos1stHalf = []

	for (let index = 0; index < fps; index++) {
		const x = easingX(index / fps) * gridSize
		const y = easingY(index / fps) * gridSize
		pos1stHalf.push({ x, y })
	}
	pos1stHalf.push({ x: gridSize, y: gridSize })

	// second half if else
	let pos2ndHalf = []
	// default value when BOTH are 'mirror'
	for (let index = 0; index < fps; index++) {
		const x = gridSize - easingX(index / fps) * gridSize
		const y = gridSize - easingY(index / fps) * gridSize
		pos2ndHalf.push({ x, y })
	}
	pos2ndHalf.shift()

	if (xRepeatType === 'mirror' && yRepeatType === 'reverse') {
		let newEasingYArray = switchEasing(EASINGS[easingYname])
		let neweasingY = bezier(
			newEasingYArray[0],
			newEasingYArray[1],
			newEasingYArray[2],
			newEasingYArray[3]
		)
		pos2ndHalf = []
		for (let index = 0; index < fps; index++) {
			const x = gridSize - easingX(index / fps) * gridSize
			const y = gridSize - neweasingY(index / fps) * gridSize
			pos2ndHalf.push({ x, y })
		}
		pos2ndHalf.shift()
	}

	if (xRepeatType === 'reverse' && yRepeatType === 'mirror') {
		let newEasingXArray = switchEasing(EASINGS[easingXname])
		let neweasingX = bezier(
			newEasingXArray[0],
			newEasingXArray[1],
			newEasingXArray[2],
			newEasingXArray[3]
		)
		pos2ndHalf = []
		for (let index = 0; index < fps; index++) {
			const x = gridSize - neweasingX(index / fps) * gridSize
			const y = gridSize - easingY(index / fps) * gridSize
			pos2ndHalf.push({ x, y })
		}
		pos2ndHalf.shift()
	}

	if (xRepeatType === 'reverse' && yRepeatType === 'reverse') {
		pos2ndHalf = pos1stHalf
		pos2ndHalf.shift()
	}

	return (
		<>
			{pos1stHalf.map((item, index) => (
				<div
					className={styles.trailPos}
					key={index}
					style={{ left: item.x, top: item.y, width: trailBallSize }}
				>
					{index}
				</div>
			))}
			{pos2ndHalf.map((item, index) => (
				<div
					className={styles.trailPos}
					key={index}
					style={{ left: item.x, top: item.y, width: trailBallSize }}
				>
					{index + 1 + fps}
				</div>
			))}
		</>
	)
}

function Arrow() {
	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<svg
				width={332}
				height={62}
				viewBox="0 0 332 62"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				preserveAspectRatio="xMidYMid meet"
			>
				<path
					d="M1 32V31H0V32H1ZM331 32H332V31H331V32ZM171.293 7.70711C171.683 8.09763 172.317 8.09763 172.707 7.70711C173.098 7.31658 173.098 6.68342 172.707 6.29289L171.293 7.70711ZM166 1L166.707 0.292893C166.317 -0.0976311 165.683 -0.0976311 165.293 0.292893L166 1ZM159.293 6.29289C158.902 6.68342 158.902 7.31658 159.293 7.70711C159.683 8.09763 160.317 8.09763 160.707 7.70711L159.293 6.29289ZM1 33H331V31H1V33ZM0 32V62H2V32H0ZM330 32V62H332V32H330ZM172.707 6.29289L166.707 0.292893L165.293 1.70711L171.293 7.70711L172.707 6.29289ZM165.293 0.292893L159.293 6.29289L160.707 7.70711L166.707 1.70711L165.293 0.292893ZM165 1V32H167V1H165Z"
					fill="var(--color-surface-200)"
				/>
			</svg>
		</div>
	)
}
