'use client'
import React from 'react'
import styles from './WhileFocus01.module.scss'
import { motion } from 'framer-motion'

export default function WhileFocus01() {
	return (
		<div className={styles.wrap}>
			<div className={styles.exampleWrap}>
				<motion.input
					// onBlur={() => console.log('blur')}
					placeholder="type here"
					animate={{
						background:
							'linear-gradient(to right, #fff -200%, #fff -100%, #fff 0%,   #fff 100%)',
					}}
					whileFocus={{
						background: [
							'linear-gradient(to right, var(--color-accent-red) -200%, var(--color-accent-blue) -100%, var(--color-accent-red) 0%,   var(--color-accent-blue) 100%)',
							'linear-gradient(to right, var(--color-accent-red) -100%, var(--color-accent-blue) 0%,    var(--color-accent-red) 100%, var(--color-accent-blue) 200%)',
							'linear-gradient(to right, var(--color-accent-red) 0%,    var(--color-accent-blue) 100%,  var(--color-accent-red) 200%, var(--color-accent-blue) 300%)',
						],
						transition: {
							duration: 2,
							repeat: Infinity,
							ease: 'linear',
						},
					}}
				/>
			</div>
		</div>
	)
}
