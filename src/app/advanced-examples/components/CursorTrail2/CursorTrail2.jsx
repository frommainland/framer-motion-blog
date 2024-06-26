'use client'
import styles from './CursorTrail2.module.scss'
import React from 'react'
import { range } from '@/utils'
import Image from 'next/image'

const CursorTrail2 = () => {
	let totalImgNum = 10
	// let refs = []
	const [refs, setRefs] = React.useState([])
	React.useEffect(() => {
		setRefs(range(totalImgNum).map(() => React.createRef()))
	}, [])

	let maxNumberOfImages = 4
	let currentIndex = 0
	let steps = 0
	let nbOfImages = 0

	const wrapRef = React.useRef(null)
	function handleMouseMove(e) {
		if (wrapRef === null) return
		let rect = wrapRef.current.getBoundingClientRect()
		const { clientX, clientY, movementX, movementY } = e
		steps = steps + Math.abs(movementX) + Math.abs(movementY)
		if (steps >= currentIndex * 150) {
			moveImage(clientX - rect.left, clientY - rect.top)
			if (nbOfImages === maxNumberOfImages) {
				removeImage()
			}
		}

		if (currentIndex === refs.length) {
			currentIndex = 0
			steps = -150
		}
	}

	function moveImage(x, y) {
		const currentImage = refs[currentIndex].current
		currentImage.style.left = x + 'px'
		currentImage.style.top = y + 'px'
		currentImage.style.display = 'block'
		currentIndex++
		nbOfImages++
		setZIndex()
	}

	function removeImage() {
		const images = getCurrentImages()
		images[0].style.display = 'none'
		nbOfImages--
	}

	const getCurrentImages = () => {
		let images = []

		let indexOfFirst = currentIndex - nbOfImages

		for (let i = indexOfFirst; i < currentIndex; i++) {
			let targetIndex = i

			if (targetIndex < 0) targetIndex += refs.length

			images.push(refs[targetIndex].current)
		}

		return images
	}

	const setZIndex = () => {
		const images = getCurrentImages()

		for (let i = 0; i < images.length; i++) {
			images[i].style.zIndex = i
		}
	}

	return (
		<div
			className={styles.wrap}
			onMouseMove={handleMouseMove}
			ref={wrapRef}
		>
			{/* {range(totalImgNum).map((item) => {
				const ref = React.useRef(null)
				refs.push(ref)
				return (
					<img
						key={item}
						ref={ref}
						src={`/CursorTrail2/image${item + 1}.webp`}
					/>
				)
			})} */}
			{refs.map((ref, index) => (
				<Image
					key={index}
					ref={ref}
					alt="typo rebus background"
					src={`/CursorTrail2/image${index + 1}.webp`}
					width={500}
					height={500}
					style={{ height: 'auto', width: '30%' }}
				/>
			))}
		</div>
	)
}

export default CursorTrail2
