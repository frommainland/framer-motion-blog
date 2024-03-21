'use client'
import React from 'react'
import styles from './WhileFocus02.module.scss'
import { motion } from 'framer-motion'

export default function WhileFocus02() {
	const colors = {
		neutral: 'var(--color-surface-200)',
		valid: 'var(--color-accent-green',
		invalid: 'var(--color-accent-red)',
	}

	const [validity, setValidity] = React.useState('neutral')

	return (
		<div className={styles.wrap}>
			<div className={styles.exampleWrap}>
				<motion.input
					initial={false}
					placeholder="type here"
					animate={{
						boxShadow: `0 0 0 5px ${colors[validity]}, 0 0 0 4px transparent`,
					}}
					whileFocus={{
						boxShadow: `0 0 0 10px ${colors[validity]}, 0 0 0 50px transparent`,
						transition: {
							boxShadow: {
								duration: 0.3,
								from: `0 0 0 5px ${colors[validity]}, 0 0 0 4px transparent`,
							},
						},
					}}
					onBlur={(e) => {
						const { value } = e.currentTarget
						if (!value) {
							setValidity('neutral')
						} else if (value.includes(' ')) {
							setValidity('invalid')
						} else {
							setValidity('valid')
						}
					}}
				/>
			</div>
		</div>
	)
}
