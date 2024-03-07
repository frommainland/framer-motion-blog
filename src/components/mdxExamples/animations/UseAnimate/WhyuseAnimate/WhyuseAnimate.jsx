'use client'
import React from 'react'
import styles from './WhyuseAnimate.module.scss'
import { motion, useAnimate } from 'framer-motion'
import { useMeasure } from '@uidotdev/usehooks'
import { RefreshCcw } from 'react-feather'

export default function WhyuseAnimate() {
	const [count, setCount] = React.useState(0)
	const [scope, animate] = useAnimate()

	const [measureRef, { width }] = useMeasure()

	React.useEffect(() => {
		const animateEle = async () => {
			await animate(
				scope.current,
				{ x: width - 120 - 32 - 32 },
				{ duration: 2 }
			)
			await animate(scope.current, { y: 50 })
			await animate(scope.current, {
				backgroundColor: 'var(--color-accent-blue)',
				borderRadius: 0,
				scale: 0.45,
			})
			await animate(scope.current, { y: 50.1 }, { duration: 1 })
			await animate(scope.current, { x: 0, rotate: 360 })
			await animate(scope.current, {
				y: 0,
				backgroundColor: 'var(--color-surface-200)',
				borderRadius: '2em',
				scale: 1,
			})
		}
		animateEle()
	}, [count])

	return (
		<div className={styles.restartDemoWrap}>
			<div className={styles.wrap} ref={measureRef} key={count}>
				<motion.div
					ref={scope}
					className={styles.item}
					whileTap={{ scale: 0.9 }}
				></motion.div>
			</div>
			<motion.button
				onClick={() => setCount(count + 1)}
				whileHover={{ border: '1px solid var(--color-surface-200)' }}
				whileTap={{ scale: 0.95 }}
			>
				<RefreshCcw />
				Restart demo
			</motion.button>
		</div>
	)
}
