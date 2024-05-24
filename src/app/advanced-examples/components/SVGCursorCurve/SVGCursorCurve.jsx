'use client'
import React from 'react'
import styles from './SVGCursorCurve.module.scss'
import SVGCursorCurveVertical from './svgCurveVertical/SVGCursorCurveVertical'
import { useMeasure } from '@uidotdev/usehooks'

function L({ width }) {
	return (
		<div
			style={{
				width: 1,
				position: 'absolute',
				top: '40%',
				left: '7%',
			}}
		>
			<SVGCursorCurveVertical
				svgWidth={160}
				svgHeight={(width * 0.2) / 1.5}
				strokeColor="#F3B53F"
			/>
		</div>
	)
}

function I({ width }) {
	return (
		<div
			style={{
				width: 1,
				position: 'absolute',
				top: '20%',
				left: '32%',
			}}
		>
			<SVGCursorCurveVertical
				svgWidth={160}
				svgHeight={(width * 0.2) / 3}
				strokeColor="#F3B53F"
			/>
		</div>
	)
}

function N({ width }) {
	return (
		<div
			style={{
				width: 1,
				position: 'absolute',
				top: '0%',
				left: '55%',
			}}
		>
			<SVGCursorCurveVertical
				svgWidth={160}
				svgHeight={(width * 0.2) / 1.2}
				strokeColor="#F3B53F"
			/>
		</div>
	)
}

function N2({ width }) {
	return (
		<div
			style={{
				width: 1,
				position: 'absolute',
				top: '10%',
				left: '67%',
			}}
		>
			<SVGCursorCurveVertical
				svgWidth={160}
				svgHeight={(width * 0.2) / 1.5}
				strokeColor="#F3B53F"
			/>
		</div>
	)
}

function E({ width }) {
	return (
		<div
			style={{
				width: 1,
				position: 'absolute',
				top: '-20%',
				left: '79%',
			}}
		>
			<SVGCursorCurveVertical
				svgWidth={160}
				svgHeight={(width * 0.2) / 1.5}
				strokeColor="#F3B53F"
			/>
		</div>
	)
}

const SVGCursorCurve = () => {
	const [wrapRef, { width }] = useMeasure()

	return (
		<div className={styles.wrap} ref={wrapRef}>
			<div
				style={{
					fontSize: width * 0.2,
					lineHeight: 0.8,
					fontFamily: 'var(--font-roobert)',
					fontWeight: 800,
					position: 'relative',
					color: 'var(--color-accent-purple)',
				}}
			>
				LINE
				<L width={width} />
				<I width={width} />
				<N width={width} />
				<N2 width={width} />
				<E width={width} />
			</div>
		</div>
	)
}

export default SVGCursorCurve
