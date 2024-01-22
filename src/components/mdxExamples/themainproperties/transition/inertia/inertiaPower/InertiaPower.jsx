'use client'
import React from 'react'
import styles from './InertiaPower.module.scss'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import RestartDemoWrap from '@/components/RestartDemoWrap'

export default function InertiaPower() {
	const velocitySpeed = [100, 200, 400]
	return (
		<RestartDemoWrap>
			<div className={styles.wrap}>
				<div className={styles.curlingStones}>
					{velocitySpeed.map((item, index) => (
						<CurlingStone
							velocity={item}
							key={item}
							index={index}
						/>
					))}
				</div>
				<Target />
			</div>
		</RestartDemoWrap>
	)
}

function CurlingStone({ velocity, index }) {
	return (
		<motion.div
			className={styles.curlingWrap}
			animate={{
				y: 1,
			}}
			transition={{
				type: 'inertia',
				velocity,
				delay: 1 * index,
			}}
		>
			<div className={styles.stone}></div>
			<Meter velocity={velocity} index={index} />
		</motion.div>
	)
}

function Meter({ velocity, index }) {
	const count = useMotionValue(0)
	const rounded = useTransform(count, (latest) => Math.round(latest))
	React.useEffect(() => {
		const controls = animate(count, velocity, {
			delay: 1 * index,
			type: 'inertia',
			velocity,
		})
		return controls.stop
	}, [])
	return <motion.p>{rounded}</motion.p>
}

function Target() {
	return (
		<div className={styles.outer}>
			<div className={styles.inner}></div>
		</div>
	)
}
