'use client'
import React from 'react'
import styles from './DragEventsBasic.module.scss'
import { motion, useMotionValue, useMotionValueEvent } from 'framer-motion'

export default function DragEventsBasic() {
	const constraintsRef = React.useRef(null)
	const [drag, setdrag] = React.useState(false)

	const gridSize = 80

	const [panInfo, setPaninfo] = React.useState({
		point: { x: 0, y: 0 },
		delta: { x: 0, y: 0 },
		offset: { x: 0, y: 0 },
		velocity: { x: 0, y: 0 },
	})
	const [axis, setAxis] = React.useState('undefined')
	const x = useMotionValue(0)
	const y = useMotionValue(0)

	// Timer to limit the store updates triggered by the onDrag() event
	let updatePanInfo = false
	setInterval(function () {
		updatePanInfo = true
	}, 50)

	const [initialPos, setinitialPos] = React.useState({ x: 0, y: 0 })
	const boxRef = React.useRef(null)
	React.useEffect(() => {
		const rect = boxRef.current.getBoundingClientRect()
		setinitialPos({
			x: Math.floor(rect.x),
			y: Math.floor(rect.y),
		})
	}, [])

	const [initialPosContainer, setinitialPosContainer] = React.useState({
		x: 0,
		y: 0,
	})

	React.useEffect(() => {
		const containerRect = constraintsRef.current.getBoundingClientRect()
		setinitialPosContainer({
			x: Math.floor(containerRect.x),
			y: Math.floor(containerRect.y),
		})
	}, [])

	const [realDragX, setrealDragX] = React.useState(0)
	const [realDragY, setrealDragY] = React.useState(0)

	useMotionValueEvent(x, 'change', (v) => setrealDragX(Math.round(v)))
	useMotionValueEvent(y, 'change', (v) => setrealDragY(Math.round(v)))

	let xToParent = initialPos.x - initialPosContainer.x + realDragX
	let yToParent = initialPos.y - initialPosContainer.y + realDragY

	return (
		<div className={styles.wrap}>
			<div
				className={styles.measure}
				ref={constraintsRef}
				style={{ backgroundSize: `${gridSize}px ${gridSize}px` }}
			>
				<motion.div
					animate={{
						backgroundColor: drag
							? 'var(--color-accent-yellow)'
							: 'var(--color-surface-200)',
					}}
					style={{ x, y }}
					drag
					ref={boxRef}
					className={styles.box}
					onDrag={(_, i) => {
						setdrag(true)
						// Should we update the numbers?
						if (!updatePanInfo) return // No.
						// Yes.
						updatePanInfo = false
						setPaninfo(i)
					}}
					onDragEnd={() => setdrag(false)}
					dragConstraints={constraintsRef}
					dragDirectionLock={true}
					onDirectionLock={(axis) => {
						setAxis(axis)
					}}
				></motion.div>
			</div>

			<div className={styles.dragInfoContainer}>
				<div className={styles.group}>
					<div className={styles.draginfoFlex}>
						<p>{Math.round(panInfo.point.x)}</p>
						<p>.point.x</p>
					</div>
					<div className={styles.draginfoFlex}>
						<p>{Math.round(panInfo.point.y)}</p>
						<p>.point.y</p>
					</div>
					<div className={styles.draginfoFlex}>
						<p>{Math.round(panInfo.delta.x)}</p>
						<p>.delta.x</p>
					</div>
					<div className={styles.draginfoFlex}>
						<p>{Math.round(panInfo.delta.y)}</p>
						<p>.delta.y</p>
					</div>
				</div>

				<div className={styles.group}>
					<div className={styles.draginfoFlex}>
						<p>{Math.round(panInfo.offset.x)}</p>
						<p>.offset.x</p>
					</div>
					<div className={styles.draginfoFlex}>
						<p>{Math.round(panInfo.offset.y)}</p>
						<p>.offset.y</p>
					</div>

					<div className={styles.draginfoFlex}>
						<p>{Math.round(panInfo.velocity.x)}</p>
						<p>.velocity.x</p>
					</div>
					<div className={styles.draginfoFlex}>
						<p>{Math.round(panInfo.velocity.y)}</p>
						<p>.velocity.y</p>
					</div>
				</div>

				<div className={styles.group}>
					<div className={styles.draginfoFlex}>
						<p>
							axis: <code>{axis}</code>
						</p>
						<p>dragDirectionLock </p>
					</div>
				</div>

				<div className={styles.group}>
					<div className={styles.draginfoFlex}>
						<p>{Math.round(initialPos.x)}</p>
						<p>inital.x</p>
					</div>
					<div className={styles.draginfoFlex}>
						<p>{Math.round(initialPos.y)}</p>
						<p>initial.y</p>
					</div>
					<div className={styles.draginfoFlex}>
						<p>{xToParent}</p>
						<p>x to its parent</p>
					</div>
					<div className={styles.draginfoFlex}>
						<p>{yToParent}</p>
						<p>y to its parent</p>
					</div>
				</div>
			</div>
		</div>
	)
}
