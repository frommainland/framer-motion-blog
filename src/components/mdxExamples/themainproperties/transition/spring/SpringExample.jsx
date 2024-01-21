'use client'
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import styles from './SpringExample.module.scss'
import { Heart } from 'react-feather'
import Field from '@/components/Field'
import { useDebounce } from '@uidotdev/usehooks'

export default function SpringExample() {
	const [count, setCount] = React.useState(0)

	const [durationConfigValues, setDurationConfigValues] = React.useState({
		type: 'duration-based',
		duration: 0.8,
		bounce: 0.25,
	})

	const [physicsConfigValues, setPhysicsConfigValues] = React.useState({
		type: 'physics-based',
		stiffness: 100,
		damping: 10,
		mass: 1,
		velocity: 0,
		restDelta: 0.01,
		restSpeed: 0.01,
	})

	const [springType, setSpringType] = React.useState('duration-based')

	const heartAnimateValue =
		springType === 'duration-based'
			? durationConfigValues
			: physicsConfigValues

	const debouncedHeartAnimateValue = useDebounce(heartAnimateValue, 500)

	function handleSpringType(e) {
		setSpringType(e.target.id)
	}

	return (
		<div className={styles.wrap}>
			<div className={styles.heartWrap}>
				<HeartShape
					values={debouncedHeartAnimateValue}
					setCount={setCount}
					key={count}
				/>
			</div>
			<div className={styles.controlWrap}>
				<div className={styles.segmentWrap}>
					<div
						className={styles.left}
						onClick={handleSpringType}
						id="duration-based"
						data-ison={
							springType === 'duration-based' ? true : false
						}
					>
						duration-based
					</div>

					<div
						className={styles.right}
						onClick={handleSpringType}
						id="physics-based"
						data-ison={
							springType === 'physics-based' ? true : false
						}
					>
						physics-based
					</div>
				</div>
				<div className={styles.container}>
					<AnimatePresence mode="sync">
						{springType === 'duration-based' && (
							<DurationConfig
								values={durationConfigValues}
								setValues={setDurationConfigValues}
							/>
						)}
						{springType !== 'duration-based' && (
							<SpringConfig
								values={physicsConfigValues}
								setValues={setPhysicsConfigValues}
							/>
						)}
					</AnimatePresence>
				</div>
			</div>
		</div>
	)
}

function HeartShape({ values, setCount }) {
	const {
		type,
		duration,
		bounce,
		stiffness,
		damping,
		mass,
		velocity,
		restDelta,
		restSpeed,
	} = values

	const transition =
		type === 'duration-based'
			? {
					type: 'spring',
					duration,
					bounce,
			  }
			: {
					type: 'spring',
					stiffness,
					damping,
					mass,
					velocity,
					restDelta,
					restSpeed,
			  }
	return (
		<motion.div
			animate={{ scale: 2 }}
			transition={transition}
			key={
				type === 'duration-based'
					? `${duration}-${bounce}`
					: `${stiffness}-${damping}-${mass}-${velocity}-${restDelta}-${restSpeed}`
			}
			onClick={() => setCount((pre) => pre + 1)}
		>
			<Heart
				size={60}
				stroke="var(--color-accent-red)"
				fill="var(--color-accent-red)"
			/>
		</motion.div>
	)
}

function DurationConfig({ values, setValues }) {
	function onChange(e) {
		const { id, value } = e.target
		setValues({
			...values,
			[id]: Number(value),
		})
	}

	return (
		<motion.form
			className={styles.configWrap}
			initial={{ opacity: 0, x: '-100%' }}
			animate={{ opacity: 1, x: '0%' }}
			exit={{
				opacity: 0,
				x: '-100%',
			}}
		>
			<div className={styles.flex}>
				<Field label={`duration: ${values.duration}`}>
					<input
						type="range"
						id="duration"
						min={0.2}
						max={2}
						step={0.1}
						value={values.duration}
						onChange={onChange}
					/>
				</Field>
				<Field label={`bounce: ${values.bounce}`}>
					<input
						type="range"
						id="bounce"
						min={0.01}
						max={1}
						step={0.01}
						value={values.bounce}
						onChange={onChange}
					/>
				</Field>
			</div>
		</motion.form>
	)
}

function SpringConfig({ values, setValues }) {
	// const { stiffness, damping, mass, velocity, restDelta, restSpeed } = values
	function onChange(e) {
		const { id, value } = e.target
		setValues({
			...values,
			[id]: Number(value),
		})
	}

	return (
		<motion.form
			className={styles.configWrap}
			initial={{ opacity: 0, x: '100%' }}
			animate={{ opacity: 1, x: '0%' }}
			exit={{
				opacity: 0,
				x: '100%',
			}}
		>
			<div className={styles.flex}>
				<Field label={`stiffness: ${values.stiffness}`}>
					<input
						type="range"
						id="stiffness"
						min={1}
						max={300}
						step={1}
						value={values.stiffness}
						onChange={onChange}
					/>
				</Field>
				<Field label={`damping: ${values.damping}`}>
					<input
						type="range"
						id="damping"
						min={0}
						max={100}
						step={1}
						value={values.damping}
						onChange={onChange}
					/>
				</Field>
				<Field label={`mass: ${values.mass}`}>
					<input
						type="range"
						id="mass"
						min={0.1}
						max={10}
						step={0.1}
						value={values.mass}
						onChange={onChange}
					/>
				</Field>
			</div>

			<div className={styles.flex}>
				<Field label={`velocity: ${values.velocity}`}>
					<input
						type="range"
						id="velocity"
						min={0}
						max={50}
						step={1}
						value={values.velocity}
						onChange={onChange}
					/>
				</Field>
				<Field label={`restDelta: ${values.restDelta}`}>
					<input
						type="range"
						id="restDelta"
						min={0.01}
						max={1}
						step={0.01}
						value={values.restDelta}
						onChange={onChange}
					/>
				</Field>
				<Field label={`restSpeed: ${values.restSpeed}`}>
					<input
						type="range"
						id="restSpeed"
						min={0.01}
						max={1}
						step={0.01}
						value={values.restSpeed}
						onChange={onChange}
					/>
				</Field>
			</div>
		</motion.form>
	)
}
