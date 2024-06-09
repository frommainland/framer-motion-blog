'use client'
import React from 'react'
import { motion } from 'framer-motion'
import styles from './SpringWithCustomName.module.scss'
import RestartDemoWrap from '@/components/RestartDemoWrap'

export default function SpringWithCustomName() {
	const standard = {
		id: 'standard',
		config: { damping: 20, mass: 1, stiffness: 170 },
	}
	const gentle = {
		id: 'gentle',
		config: { damping: 15, mass: 2, stiffness: 100 },
	}
	const quick = {
		id: 'quick',
		config: { damping: 25, mass: 0.5, stiffness: 300 },
	}
	const springyPop = {
		id: 'springyPop',
		config: { damping: 20, mass: 0.5, stiffness: 500 },
	}
	const molasses = {
		id: 'molasses',
		config: { damping: 26, mass: 0.3, stiffness: 80 },
	}
	const softBounce = {
		id: 'softBounce',
		config: { damping: 15, mass: 1, stiffness: 120 },
	}
	const lazyDrift = {
		id: 'lazyDrift',
		config: { damping: 30, mass: 1, stiffness: 50 },
	}
	const gentleEase = {
		id: 'gentleEase',
		config: { damping: 20, mass: 1.5, stiffness: 90 },
	}
	const criticalDamping = {
		id: 'criticalDamping',
		config: { damping: 20, mass: 1, stiffness: 200 },
	}
	const rubberBandSnap = {
		id: 'rubberBandSnap',
		config: { damping: 10, mass: 0.5, stiffness: 600 },
	}
	const precisionStop = {
		id: 'precisionStop',
		config: { damping: 25, mass: 1, stiffness: 150 },
	}

	const Spring_template = [
		standard,
		gentle,
		quick,
		springyPop,
		molasses,
		softBounce,
		lazyDrift,
		gentleEase,
		criticalDamping,
		rubberBandSnap,
		precisionStop,
	]

	const [springConfigName, setSpringConfigName] = React.useState('standard')
	const [animationTrigger, setAnimationTrigger] = React.useState(false)
	const config = Spring_template.find(
		(name) => name.id === springConfigName
	).config

	return (
		<RestartDemoWrap>
			<div className={styles.wrap}>
				<motion.div
					className={styles.ballWrap}
					animate={{
						x: animationTrigger ? 'calc(100% - 60px - 2em)' : 0,
					}}
					transition={{ type: 'spring', ...config }}
				>
					<Ball1 />
				</motion.div>
				<div className={styles.buttonsWrap}>
					{Spring_template.map((item, i) => (
						<motion.button
							key={item.id}
							onClick={() => {
								setSpringConfigName(item.id)
								setAnimationTrigger(!animationTrigger)
							}}
							whileHover={{
								scale: 1.05,
								backgroundColor: 'var(--color-surface-300)',
							}}
							whileTap={{ scale: 0.95 }}
							animate={{
								borderColor:
									item.id === springConfigName
										? 'var(--color-text-200)'
										: 'var(--color-surface-200)',
								color:
									item.id === springConfigName
										? 'var(--color-text-100)'
										: 'var(--color-text-300)',
							}}
						>
							{item.id}
						</motion.button>
					))}
				</div>
			</div>
		</RestartDemoWrap>
	)
}

function Ball1({ width, curve }) {
	return (
		<motion.svg
			width={60}
			height={60}
			viewBox="0 0 80 80"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			// animate={{ rotate: 1080 }}
			// transition={{
			// 	ease: curve,
			// 	duration: 1,
			// }}
		>
			<circle cx={40} cy={40} r={40} fill="#9CD72B" />
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M 62 7 V 45 C 62 48 60 53 57 57 C 53 62 48 65 40 65 C 32 65 27 62 23 57 C 20 53 18 48 18 45 V 7 C 17 8 15 9 14 10 V 45 L 14 45 C 14 49 16 55 20 60 C 24 65 31 69 40 69 C 49 69 56 65 60 60 C 64 55 66 49 66 45 L 66 45 V 10 C 65 9 63 8 62 7 Z"
				fill="#FFFCE1"
			/>
		</motion.svg>
	)
}
