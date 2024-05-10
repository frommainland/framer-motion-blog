'use client'

import React from 'react'
import styles from './IpadPointer.module.scss'
import Cursor from './Cursor'
import Button from './Button'
import { useMotionValue, transform } from 'framer-motion'
import { useMouse } from '@uidotdev/usehooks'
import { Menu, Share, Edit } from 'react-feather'

const IpadPointer = () => {
	const [rect, setRect] = React.useState()

	const cursorSize = 16

	const [mouse, ref] = useMouse()

	const mvX = useMotionValue(0)
	const mvY = useMotionValue(0)

	React.useEffect(() => {
		mvX.set(mouse.elementX)
		mvY.set(mouse.elementY)
	}, [mouse.elementX, mouse.elementY])

	// get .wrap div dom info
	const [wrapperRect, setWrapperRect] = React.useState(null)
	React.useEffect(() => {
		if (ref.current) {
			const rect = ref.current.getBoundingClientRect()
			setWrapperRect(rect)
		}
	}, [])

	const originX = rect
		? transform(
				[rect.left - wrapperRect.left, rect.right - wrapperRect.left],
				[0, 1]
		  )(mvX.get())
		: 0

	const originY = rect
		? transform(
				[rect.top - wrapperRect.top, rect.bottom - wrapperRect.top],
				[0, 1]
		  )(mvY.get())
		: 0

	return (
		<div className={styles.wrap} ref={ref}>
			<Cursor
				rect={rect}
				mvX={mvX}
				mvY={mvY}
				wrapperRect={wrapperRect}
				originX={originX}
				originY={originY}
			/>
			<Button
				onHoverOff={() => setRect(undefined)}
				onHoverOn={(rect) => setRect(rect)}
				originX={originX}
				originY={originY}
				rect={rect}
			>
				<Menu color="var(--color-text-100)" />
			</Button>
			<Button
				onHoverOff={() => setRect(undefined)}
				onHoverOn={(rect) => setRect(rect)}
				originX={originX}
				originY={originY}
				rect={rect}
			>
				<Share color="var(--color-text-100)" />
			</Button>
			<Button
				onHoverOff={() => setRect(undefined)}
				onHoverOn={(rect) => setRect(rect)}
				originX={originX}
				originY={originY}
				rect={rect}
			>
				<Edit color="var(--color-text-100)" />
			</Button>
		</div>
	)
}

export default IpadPointer
