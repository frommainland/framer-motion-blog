'use client'
import React from 'react'
import styles from './SubElementUseAnimate.module.scss'
import { motion, useAnimate } from 'framer-motion'
import { RefreshCcw } from 'react-feather'

export default function SubElementUseAnimate() {
	const [ref, animate] = useAnimate()
	const bgRef = React.useRef(null)

	const [count, setCount] = React.useState(0)

	const transition = {
		duration: 1,
	}
	React.useEffect(() => {
		animate(
			'section',
			{ borderColor: 'var(--color-surface-200)' },
			transition
		)
		// animate(
		// 	bgRef.current,
		// 	{ backgroundColor: 'var(--color-surface-200)' },
		// 	transition
		// )
		animate(
			`div.${styles.bg}`,
			{ backgroundColor: 'var(--color-surface-200)' },
			transition
		)
		animate('path', { pathLength: 0 }, transition)
	}, [count])

	return (
		<div className={styles.restartDemoWrap}>
			<div className={styles.wrap} key={count}>
				<div className={styles.item} ref={ref}>
					<section id={styles.ring}>
						<div className={styles.bg} ref={bgRef}>
							<svg
								width={60}
								height={60}
								viewBox="0 0 60 60"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<motion.path
									d="M50 15L22.5 42.5L10 30"
									stroke="var(--color-text-100)"
									strokeWidth={5}
									strokeLinecap="round"
									strokeLinejoin="round"
									pathLength="1"
								/>
							</svg>
						</div>
					</section>
				</div>
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
