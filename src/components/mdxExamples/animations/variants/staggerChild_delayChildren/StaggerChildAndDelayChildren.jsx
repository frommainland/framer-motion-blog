'use client'
import React from 'react'
import styles from './StaggerChildAndDelayChildren.module.scss'
import { backIn, easeInOut, motion } from 'framer-motion'
import { useMeasure } from '@uidotdev/usehooks'
import RestartDemoWrap from '@/components/RestartDemoWrap'
import { smooth, flow, bouncy } from '@/helper/easing'

export default function StaggerChildAndDelayChildren() {
	const text = 'tenent'.toUpperCase()
	const textArray = [...text]
	const [wrapRef, { width }] = useMeasure()
	const [textRef, { height: textWrapHeight }] = useMeasure()

	const childVariants = {
		initial: { y: textWrapHeight },
		animate: { y: 0 },
	}

	return (
		<RestartDemoWrap>
			<div className={styles.wrap} ref={wrapRef}>
				<motion.div
					className={styles.textWrap}
					style={{ fontSize: width * 0.2 }}
					ref={textRef}
					initial="initial"
					animate="animate"
					transition={{
						delayChildren: 0.2,
						staggerChildren: 0.1,
					}}
				>
					{textArray.map((item, index) => (
						<motion.span
							key={index}
							variants={childVariants}
							transition={{
								duration: 0.5,
								ease: smooth,
							}}
						>
							{item}
						</motion.span>
					))}
				</motion.div>
			</div>
		</RestartDemoWrap>
	)
}
