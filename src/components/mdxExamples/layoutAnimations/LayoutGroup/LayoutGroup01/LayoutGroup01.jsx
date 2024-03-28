'use client'
import React from 'react'
import styles from './LayoutGroup01.module.scss'
import { motion, LayoutGroup } from 'framer-motion'
import { range } from '@/utils'
import SingleCheckBox from '@/components/SingleCheckBox'

function Box() {
	const [clicked, setClicked] = React.useState(false)
	return (
		<motion.div
			layout
			className={styles.item}
			initial={{ borderRadius: 8 }}
			onClick={() => setClicked(!clicked)}
			style={{ width: clicked ? 100 : 50 }}
			animate={{
				backgroundColor: clicked
					? 'var(--color-accent-yellow)'
					: 'var(--color-surface-200)',
			}}
		></motion.div>
	)
}

export default function LayoutGroup01() {
	const [useLayoutGroup, setUseLayoutGroup] = React.useState(true)

	return (
		<div className={styles.wrap}>
			{useLayoutGroup ? (
				<LayoutGroup>
					<div className={styles.exampleWrap}>
						{range(10).map((item) => (
							<Box key={item} />
						))}
					</div>
				</LayoutGroup>
			) : (
				<div className={styles.exampleWrap}>
					{range(10).map((item) => (
						<Box key={item} />
					))}
				</div>
			)}

			<div
				style={{
					position: 'absolute',
					bottom: 20,
					left: '50%',
					transform: 'translateX(-50%)',
				}}
			>
				<SingleCheckBox
					value={useLayoutGroup}
					setValue={setUseLayoutGroup}
					id="useLayoutGroup"
					content="LayoutGroup"
				/>
			</div>
		</div>
	)
}
