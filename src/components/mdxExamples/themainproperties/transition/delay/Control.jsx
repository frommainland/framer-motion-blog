import React from 'react'
import styles from './DelayExample.module.scss'
import { Play, RotateCcw } from 'react-feather'
import { motion } from 'framer-motion'

function Field({ label, children }) {
	return (
		<div style={{ flex: '1 1 0%' }}>
			<label>{label}</label>
			{children}
		</div>
	)
}

const easingName = [
	'easeIn',
	'easeOut',
	'easeInOut',
	'easeIn-Cubic',
	'easeOut-Cubic',
	'easeInOut-Cubic',
	// 'backIn',
	// 'backOut',
	// 'backInOut',
	'linear',
]

const COLORS = [
	'var(--color-accent-red)',
	'var(--color-accent-yellow)',
	'var(--color-accent-green)',
	'var(--color-accent-blue)',
	'var(--color-accent-purple)',
	'var(--color-text-300)',
	'var(--color-surface-300)',
]

export default function Control({ values, setValues, ...rest }) {
	const { setIsPlay, isPlay } = rest

	const onChange = (e) => {
		const { id, value } = e.target
		setValues({
			...values,
			[id]: Number(value),
		})
		setIsPlay(!isPlay)
	}

	const handleEase = (e) => {
		const { id, value } = e.target
		setValues({
			...values,
			[id]: value,
		})
		setIsPlay(!isPlay)
	}

	const onColorChange = (e) => {
		const { _, value } = e.target
		setValues({
			...values,
			color: value,
		})
	}

	const [playOnce, setPlayOnce] = React.useState(false)

	// console.log(values)

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
			}}
		>
			<div className={styles.column3items}>
				<Field label="color">
					<div className={styles.colorWrap}>
						{COLORS.map((item) => {
							return (
								<div key={item}>
									<input
										type="radio"
										name="current-color"
										id={item}
										value={item}
										checked={item == values.color}
										onChange={onColorChange}
									/>
									<label htmlFor={item}>
										<span
											style={{ backgroundColor: item }}
										></span>
									</label>
								</div>
							)
						})}
					</div>
				</Field>
				<Field label="dot size">
					<input
						type="range"
						id="size"
						min={10}
						max={60}
						step={1}
						value={values.size}
						onChange={onChange}
					/>
				</Field>
				<motion.button
					className={styles.playButton}
					onClick={() => {
						setIsPlay(!isPlay)
						setPlayOnce(true)
					}}
					whileTap={{ scale: 0.85 }}
				>
					{playOnce ? (
						<RotateCcw size={24} stroke="var(--color-text-200)" />
					) : (
						<Play size={24} stroke="var(--color-text-200)" />
					)}
				</motion.button>
			</div>
			<div className={styles.column3items}>
				<Field label="total stripes">
					<input
						type="range"
						id="stripeNum"
						min={10}
						max={30}
						value={values.stripeNum}
						onChange={onChange}
					/>
				</Field>
				<Field label="stripe duration">
					<input
						type="range"
						id="singleTime"
						min={0.2}
						max={0.8}
						value={values.singleTime}
						step={0.1}
						onChange={onChange}
					/>
				</Field>
				<Field label="dot duration">
					<input
						type="range"
						id="totalTime"
						min={5}
						max={10}
						value={values.totalTime}
						onChange={onChange}
					/>
				</Field>
			</div>

			<Field label="ease">
				<select
					id="easingName"
					value={values.easingName}
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
		</form>
	)
}
