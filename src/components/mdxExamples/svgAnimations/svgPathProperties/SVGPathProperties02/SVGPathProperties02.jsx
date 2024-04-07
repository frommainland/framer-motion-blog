'use client'
import React from 'react'
import styles from './SVGPathProperties02.module.scss'
import { motion } from 'framer-motion'
import { smooth } from '@/helper/easing'

export default function SVGPathProperties02() {
	const DATA = [
		{ color: 'var(--color-accent-yellow)', delay: 0 },
		{ color: 'var(--color-accent-purple)', delay: 0.6 },
		{ color: 'var(--color-text-100)', delay: 0.9 },
	]

	const transitionDefault = {
		duration: 1,
		repeat: Infinity,
		repeatType: 'reverse',
		repeatDelay: 2,
		ease: smooth,
	}
	return (
		<div className={styles.wrap}>
			<svg
				style={{
					width: 160,
					height: 160,
				}}
			>
				{DATA.map((item, i) => (
					<g key={i}>
						<motion.path
							d="M79.75 97.875V145.875"
							custom={0.1}
							stroke={item.color}
							strokeWidth="12"
							strokeLinecap="round"
							initial={{
								pathLength: 1,
								pathOffset: 1,
							}}
							animate={{ pathOffset: 0 }}
							transition={{
								delay: 0.1 * (i + 1) + item.delay,
								...transitionDefault,
							}}
						/>
						<motion.path
							d="M79.75 97.875L140.5 15"
							custom={0.2}
							stroke={item.color}
							strokeWidth="12"
							strokeLinecap="round"
							initial={{
								pathLength: 1,
								pathOffset: 1,
							}}
							animate={{ pathOffset: 0 }}
							transition={{
								delay: 0.2 * (i + 1) + item.delay,
								...transitionDefault,
							}}
						/>
						<motion.path
							d="M19 15L79.75 97.875"
							custom={0.3}
							stroke={item.color}
							strokeWidth="12"
							strokeLinecap="round"
							initial={{
								pathLength: 1,
								pathOffset: 1,
							}}
							animate={{ pathOffset: 0 }}
							transition={{
								delay: 0.25 * (i + 1) + item.delay,
								...transitionDefault,
							}}
						/>
					</g>
				))}
			</svg>
			<svg
				style={{
					width: 160,
					height: 160,
				}}
			>
				{DATA.map((item, i) => (
					<g key={i}>
						<motion.path
							d="M30 15H129.75"
							custom={0.1}
							stroke={item.color}
							strokeWidth="12"
							strokeLinecap="round"
							initial={{
								pathLength: 1,
								pathOffset: 1,
							}}
							animate={{ pathOffset: 0 }}
							transition={{
								delay: 0.1 * (i + 1) + item.delay,
								...transitionDefault,
							}}
						/>
						<motion.path
							d="M129.75 15L30 145.5"
							custom={0.2}
							stroke={item.color}
							strokeWidth="12"
							strokeLinecap="round"
							initial={{
								pathLength: 1,
								pathOffset: 1,
							}}
							animate={{ pathOffset: 0 }}
							transition={{
								delay: 0.2 * (i + 1) + item.delay,
								...transitionDefault,
							}}
						/>
						<motion.path
							d="M30 145.5H129.75"
							custom={0.3}
							stroke={item.color}
							strokeWidth="12"
							strokeLinecap="round"
							initial={{
								pathLength: 1,
								pathOffset: 1,
							}}
							animate={{ pathOffset: 0 }}
							transition={{
								delay: 0.2 * (i + 1) + item.delay,
								...transitionDefault,
							}}
						/>
					</g>
				))}
			</svg>
		</div>
	)
}
