import React from 'react'
import styles from './VelocityCursor.module.scss'

export default function CursorTarget({ children, setIsActive, setData }) {
	function handleMouseOver() {
		setIsActive(true)
		setData(children)
	}

	function handleMouseLeave() {
		setIsActive(false)
		setData('')
	}

	return (
		<span
			className={styles.cursorTarget}
			onMouseOver={handleMouseOver}
			onMouseLeave={handleMouseLeave}
		>
			{children}
		</span>
	)
}
