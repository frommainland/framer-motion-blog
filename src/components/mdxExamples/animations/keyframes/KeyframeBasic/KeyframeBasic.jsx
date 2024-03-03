'use client'
import React from 'react'
import { motion } from 'framer-motion'
import styles from './KeyframeBasic.module.scss'
import RestartDemoWrap from '@/components/RestartDemoWrap'

export default function KeyframeBasic() {
	return (
		<RestartDemoWrap>
			<div className={styles.wrap}>
				<motion.div
					className={styles.item}
					animate={{ scale: [1, 0.5, 1.5, 1] }}
					transition={{ duration: 2 }}
				/>
			</div>
		</RestartDemoWrap>
	)
}
