'use client'
import React from 'react'
import styles from './Initial.module.scss'
import { motion } from 'framer-motion'
import RestartDemoWrap from '@/components/RestartDemoWrap'
import { range } from '@/utils'

export default function Initial() {
	return (
		<RestartDemoWrap>
			<div className={styles.wrap}>
				<div className={styles.flexWrap}>
					<motion.div
						className={styles.item}
						initial={{ y: 200, scale: 0.5 }}
						animate={{ y: 0, scale: 1 }}
						transition={{
							duration: 1,
						}}
					></motion.div>
				</div>

				<div className={styles.flexWrap}>
					<motion.div className={styles.item}>
						{range(3).map((item) => {
							return (
								<motion.div
									className={styles.singleStripe}
									key={item}
									initial={{ scaleY: 0, originY: 1 }}
									animate={{ scaleY: 1 }}
									transition={{
										delay: 0.4 * item,
										duration: 0.4,
									}}
								></motion.div>
							)
						})}
					</motion.div>
				</div>
			</div>
		</RestartDemoWrap>
	)
}
