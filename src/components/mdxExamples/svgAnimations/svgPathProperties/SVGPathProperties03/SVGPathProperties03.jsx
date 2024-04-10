'use client'
import React from 'react'
import styles from './SVGPathProperties03.module.scss'
import { motion } from 'framer-motion'

export default function SVGPathProperties03() {
	const DATA = [
		{
			color: 'var(--color-accent-red)',
			delay: 0,
			pathLength: 0.1,
			pathSpacing: 0.1,
		},
		{
			color: 'var(--color-accent-blue)',
			delay: 0.1,
			pathLength: 0.2,
			pathSpacing: 0.4,
		},
		{
			color: 'var(--color-accent-yellow)',
			delay: 0.2,
			pathLength: 1,
			pathSpacing: 1,
		},
	]

	const transitionDefault = {
		duration: 3,
		repeat: Infinity,
		repeatType: 'mirror',
		type: 'spring',
		bounce: 0.25,
	}

	const H = () => {
		return (
			<svg
				style={{
					width: 54,
					height: 96,
					fill: 'none',
					marginRight: 18,
				}}
			>
				{DATA.map((item, i) => (
					<g key={i}>
						<motion.path
							d="M 2 2 V 48 V 94"
							stroke={item.color}
							strokeWidth="2"
							strokeLinecap="round"
							initial={{
								pathLength: item.pathLength,
								pathOffset: 1,
								pathSpacing: item.pathSpacing,
								opacity: 0,
							}}
							animate={{ pathOffset: 0, opacity: 1 }}
							transition={{
								delay: 0.1 * (i + 1) + item.delay,
								...transitionDefault,
							}}
						/>
						<motion.path
							d="M 2 48 C 3 43 7 38 11 35 C 16 32 22 30 28 30 C 33 30 37 31 41 33 C 44 34 47 37 49 40 C 51 44 52 48 52 53 V 94"
							stroke={item.color}
							strokeWidth="2"
							strokeLinecap="round"
							initial={{
								pathLength: item.pathLength,
								pathOffset: 1,
								pathSpacing: item.pathSpacing,
								opacity: 0,
							}}
							animate={{ pathOffset: 0, opacity: 1 }}
							transition={{
								delay: 0.2 * (i + 1) + item.delay,
								...transitionDefault,
							}}
						/>
					</g>
				))}
			</svg>
		)
	}

	const A = () => {
		return (
			<svg
				style={{
					width: 62,
					height: 69,
					fill: 'none',
					marginRight: 12,
					marginTop: 28,
				}}
			>
				{DATA.map((item, i) => (
					<g key={i}>
						<motion.path
							d="M 1 17 C 3 12 6 8 10 6 C 15 3 20 2 26 2 C 30 2 34 3 38 5 C 41 6 43 9 45 12 C 47 15 48 19 48 24 L 47 50 V 56 C 47 59 48 62 48 63 C 49 65 51 66 52 67 C 54 67 55 67 56 67 C 58 67 60 67 61 66"
							stroke={item.color}
							strokeWidth="2"
							strokeLinecap="round"
							initial={{
								pathLength: item.pathLength,
								pathOffset: 1,
								pathSpacing: item.pathSpacing,
								opacity: 0,
							}}
							animate={{ pathOffset: 0, opacity: 1 }}
							transition={{
								delay: 0.1 * (i + 1) + item.delay,
								...transitionDefault,
							}}
						/>
						<motion.path
							d="M 47 50 C 46 54 46 57 43 60 C 40 62 37 64 33 66 C 30 67 26 68 22 68 C 18 68 14 67 11 66 C 8 65 6 63 4 61 C 3 58 2 56 2 52 C 2 48 3 44 6 41 C 10 38 14 37 20 35 L 47 30"
							stroke={item.color}
							strokeWidth="2"
							strokeLinecap="round"
							initial={{
								pathLength: item.pathLength,
								pathOffset: 1,
								pathSpacing: item.pathSpacing,
								opacity: 0,
							}}
							animate={{ pathOffset: 0, opacity: 1 }}
							transition={{
								delay: 0.2 * (i + 1) + item.delay,
								...transitionDefault,
							}}
						/>
					</g>
				))}
			</svg>
		)
	}

	const R = () => {
		return (
			<svg
				style={{
					width: 34,
					height: 68,
					fill: 'none',
					marginRight: 15,
					marginTop: 28,
				}}
			>
				{DATA.map((item, i) => (
					<g key={i}>
						<motion.path
							d="M 2 3 C 2 24 2 45 2 66"
							stroke={item.color}
							strokeWidth="2"
							strokeLinecap="round"
							initial={{
								pathLength: item.pathLength,
								pathOffset: 1,
								pathSpacing: item.pathSpacing,
								opacity: 0,
							}}
							animate={{ pathOffset: 0, opacity: 1 }}
							transition={{
								delay: 0.1 * (i + 1) + item.delay,
								...transitionDefault,
							}}
						/>
						<motion.path
							d="M 2 20 C 4 12 9 6 16 3 C 21 1 27 1 31 4 C 31 4 32 5 32 5"
							stroke={item.color}
							strokeWidth="2"
							strokeLinecap="round"
							initial={{
								pathLength: item.pathLength,
								pathOffset: 1,
								pathSpacing: item.pathSpacing,
								opacity: 0,
							}}
							animate={{ pathOffset: 0, opacity: 1 }}
							transition={{
								delay: 0.2 * (i + 1) + item.delay,
								...transitionDefault,
							}}
						/>
					</g>
				))}
			</svg>
		)
	}

	const P = () => {
		return (
			<svg
				style={{
					width: 58,
					height: 94,
					fill: 'none',
					marginRight: 15,
					marginTop: 48,
				}}
			>
				{DATA.map((item, i) => (
					<g key={i}>
						<motion.path
							d="M 2 25 C 4 17 10 9 18 6 C 29 2 42 4 50 13 C 57 22 58 34 56 45 C 55 55 49 64 40 68 C 29 72 15 70 8 61 C 5 57 3 53 2 49"
							stroke={item.color}
							strokeWidth="2"
							strokeLinecap="round"
							initial={{
								pathLength: item.pathLength,
								pathOffset: 1,
								pathSpacing: item.pathSpacing,
								opacity: 0,
							}}
							animate={{ pathOffset: 0, opacity: 1 }}
							transition={{
								delay: 0.1 * (i + 1) + item.delay,
								...transitionDefault,
							}}
						/>
						<motion.path
							d="M 2 2 C 2 32 2 62 2 92"
							stroke={item.color}
							strokeWidth="2"
							strokeLinecap="round"
							initial={{
								pathLength: item.pathLength,
								pathOffset: 1,
								pathSpacing: item.pathSpacing,
								opacity: 0,
							}}
							animate={{ pathOffset: 0, opacity: 1 }}
							transition={{
								delay: 0.2 * (i + 1) + item.delay,
								...transitionDefault,
							}}
						/>
					</g>
				))}
			</svg>
		)
	}

	const E = () => {
		return (
			<svg
				style={{
					width: 58,
					height: 69,
					fill: 'none',
					marginRight: 19,
					marginTop: 28,
				}}
			>
				{DATA.map((item, i) => (
					<g key={i}>
						<motion.path
							d="M 57 33 C 57 27 55 21 53 17 C 51 12 48 8 44 6 C 40 3 35 2 30 2 C 25 2 20 3 15 6 C 11 8 8 12 5 17 C 3 22 1 28 1 35 C 1 42 3 48 5 52 C 8 57 11 61 16 64 C 20 66 25 68 31 68 C 35 68 38 67 41 66 C 45 65 48 63 50 61 C 53 58 55 56 56 53"
							stroke={item.color}
							strokeWidth="2"
							strokeLinecap="round"
							initial={{
								pathLength: item.pathLength,
								pathOffset: 1,
								pathSpacing: item.pathSpacing,
								opacity: 0,
							}}
							animate={{ pathOffset: 0, opacity: 1 }}
							transition={{
								delay: 0.1 * (i + 1) + item.delay,
								...transitionDefault,
							}}
						/>
						<motion.path
							d="M 2 34 H 57"
							stroke={item.color}
							strokeWidth="2"
							strokeLinecap="round"
							initial={{
								pathLength: item.pathLength,
								pathOffset: 1,
								pathSpacing: item.pathSpacing,
								opacity: 0,
							}}
							animate={{ pathOffset: 0, opacity: 1 }}
							transition={{
								delay: 0.2 * (i + 1) + item.delay,
								...transitionDefault,
							}}
						/>
					</g>
				))}
			</svg>
		)
	}

	return (
		<div className={styles.wrap}>
			<H />
			<A />
			<R />
			<P />
			<E />
			<R />
		</div>
	)
}
