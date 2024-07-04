'use client'
import { AnimatePresence, motion } from 'framer-motion'
import styles from './BottomNav.module.scss'
import { Smartphone, Code, Link } from 'react-feather'
import Image from 'next/image'

import { useMeasure } from '@uidotdev/usehooks'
import React from 'react'

import Klack from './klack.png'

const bottomData = [
	{
		text: 'Apps',
		component: <Smartphone />,
	},
	{
		text: 'Components',
		component: <Code />,
	},
	{
		text: 'Notes',
		component: <Link />,
	},
]

const DetailData = {
	Apps: [
		{
			image: <Image src={Klack} alt="klack icon" sizes="48px" />,
			title: 'Klack ↗',
			sub: 'Satisfying key sounds',
		},
	],
	Components: [
		{
			icon: <Code color="var(--color-text-200)" />,
			title: 'Action Bar',
			tag: 'Dynamic',
			date: '06-02',
		},
		{
			icon: <Code color="var(--color-text-200)" />,
			title: 'Image Expand',
			tag: 'Overlay',
			date: '05-24',
		},
		{
			icon: <Code color="var(--color-text-200)" />,
			title: 'Read Time',
			tag: 'Scroll',
			date: '03-02',
		},
	],
	Notes: [
		{
			icon: <Link color="var(--color-text-200)" />,
			title: 'Changelog using Github',
			tag: null,
			date: '06-02',
		},
		{
			icon: <Link color="var(--color-text-200)" />,
			title: 'Feedback in Slack',
			tag: null,
			date: '05-24',
		},
	],
}

function NavItem({ item, onMouseEnter, onMouseLeave, currentNav }) {
	return (
		<motion.div
			className={styles.navItemWrap}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			{currentNav === item.text && (
				<motion.div
					className={styles.indicator}
					layoutId="indicator"
					initial={{
						backgroundColor: 'var(--color-surface-300)',
					}}
					animate={{
						backgroundColor: 'var(--color-surface-200)',
					}}
				></motion.div>
			)}
			<div
				style={{
					position: 'relative',
					display: 'flex',
					gap: '.375em',
					zIndex: 2,
				}}
			>
				{item.component}
				<div className={styles.text}>{item.text}</div>
			</div>
		</motion.div>
	)
}

function NavDetails({ item }) {
	const [hover, setHover] = React.useState(false)
	return (
		<motion.div
			layout
			className={styles.navDetails}
			key={item.title}
			initial={{ opacity: 0, filter: 'blur(4px)' }}
			animate={{
				backgroundColor: hover
					? 'rgba(44, 45, 41, 0.5)'
					: 'rgba(44, 45, 41, 0)',
				opacity: 1,
				filter: 'blur(0)',
			}}
			exit={{ opacity: 0, filter: 'blur(4px)' }}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		>
			<motion.div
				className={styles.left}
				animate={{ paddingLeft: hover ? '.625em' : 0 }}
			>
				{/* {item.icon} */}
				<p>{item.title}</p>
			</motion.div>
			<motion.div
				className={styles.right}
				animate={{ paddingRight: hover ? '.625em' : 0 }}
			>
				{item.tag && <p className={styles.tag}>{item.tag}</p>}
				<p className={styles.date}>{item.date}</p>
			</motion.div>
		</motion.div>
	)
}

function NavDetailsApps({ item }) {
	const [hover, setHover] = React.useState(false)
	return (
		<motion.div
			layout
			className={styles.navDetails}
			key={item.title}
			initial={{ opacity: 0, filter: 'blur(4px)' }}
			animate={{
				backgroundColor: hover
					? 'rgba(44, 45, 41, 0.5)'
					: 'rgba(44, 45, 41, 0)',
				opacity: 1,
				filter: 'blur(0)',
			}}
			exit={{ opacity: 0, filter: 'blur(4px)' }}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		>
			<motion.div
				className={styles.Apps}
				animate={{ paddingLeft: hover ? '.625em' : 0 }}
			>
				{item.image}
				<div className={styles.content}>
					<p>{item.title}</p>
					<p>{item.sub}</p>
				</div>
			</motion.div>
		</motion.div>
	)
}

const BottomNav = () => {
	const [bottomNavWrapRef, { width, height }] = useMeasure()
	const [currentNav, setCurrentNav] = React.useState('')
	const [isPanelHovered, setIsPanelHovered] = React.useState(false)
	const timeoutRef = React.useRef(null)

	const handleMouseEnter = (text) => {
		setCurrentNav(text)
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current)
		}
	}

	const handleMouseLeave = () => {
		timeoutRef.current = setTimeout(() => {
			if (!isPanelHovered) {
				setCurrentNav('')
			}
		}, 100) // 100ms delay
	}

	const handlePanelMouseEnter = () => {
		setIsPanelHovered(true)
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current)
		}
	}

	const handlePanelMouseLeave = () => {
		setIsPanelHovered(false)
		setCurrentNav('')
	}
	return (
		<div className={styles.wrap}>
			<motion.div
				className={styles.navDetailsContainer}
				style={{
					position: 'absolute',
					bottom: 60,
					width: width,
					borderRadius: 16,
				}}
				animate={{
					width: currentNav !== '' ? width * 1.04 : width,
					bottom: currentNav !== '' ? 56 : 60,
				}}
				onMouseEnter={handlePanelMouseEnter}
				onMouseLeave={handlePanelMouseLeave}
				layout
			>
				<AnimatePresence mode="wait">
					<motion.div className={styles.navDetailsWrap}>
						{currentNav !== '' &&
							DetailData[currentNav].map((item, index) => {
								if (currentNav == 'Apps') {
									return (
										<NavDetailsApps
											key={index}
											item={item}
										/>
									)
								} else {
									return (
										<NavDetails item={item} key={index} />
									)
								}
							})}
						{currentNav !== '' && (
							<div
								className={styles.spacer}
								style={{ marginBottom: height }}
							></div>
						)}
					</motion.div>
				</AnimatePresence>
			</motion.div>
			<div
				className={styles.bottomNavWrap}
				ref={bottomNavWrapRef}
				style={{ outline: '3px solid var(--color-surface-300)' }}
			>
				{bottomData.map((item, index) => (
					<NavItem
						item={item}
						key={index}
						currentNav={currentNav}
						onMouseEnter={() => handleMouseEnter(item.text)}
						onMouseLeave={handleMouseLeave}
					/>
				))}
			</div>
		</div>
	)
}

export default BottomNav
