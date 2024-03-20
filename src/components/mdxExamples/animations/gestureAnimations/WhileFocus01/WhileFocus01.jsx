'use client'
import React from 'react'
import styles from './WhileFocus01.module.scss'
import { motion, easeOut } from 'framer-motion'

export default function WhileFocus01() {
	const containerRef = React.useRef(null)
	return (
		<div className={styles.wrap} ref={containerRef}>
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
							'linear-gradient(to right, #f0f -200%, #0ff -100%, #f0f 0%,   #0ff 100%)',
							'linear-gradient(to right, #f0f -100%, #0ff 0%,    #f0f 100%, #0ff 200%)',
							'linear-gradient(to right, #f0f 0%,    #0ff 100%,  #f0f 200%, #0ff 300%)',
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
