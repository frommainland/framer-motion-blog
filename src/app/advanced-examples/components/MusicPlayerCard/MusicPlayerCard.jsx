'use client'
import { motion, MotionConfig, useCycle } from 'framer-motion'
import styles from './MusicPlayerCard.module.scss'
import Cover from './cover.jpg'
import Image from 'next/image'
import { Play, SkipForward, SkipBack, Shuffle, RotateCcw } from 'react-feather'

import React from 'react'
import { quick } from '@/helper/easing'

function Screen1() {
	return (
		<motion.div
			className={styles.playerContainer}
			layoutId="playerContainer"
			style={{ borderRadius: '22px' }}
		>
			<motion.div
				className={styles.cover}
				layoutId="music-player-cover"
				style={{ borderRadius: 12 }}
			>
				<Image src={Cover} alt="cover" />
			</motion.div>
			<motion.div className={styles.info} layoutId="music-player-info">
				<span className={styles.song}>Ocean City Girl</span>
				<span className={styles.singer}>Ivy</span>
			</motion.div>
			<motion.div
				className={styles.controls}
				layoutId="music-player-controls"
			>
				<motion.div
					layoutId="music-player-controls-play"
					className={styles.playWrap}
					whileHover={{ backgroundColor: 'var(--color-text-100)' }}
				>
					<Play
						color="var(--color-surface-100)"
						fill="var(--color-surface-100)"
						style={{ marginLeft: 5 }}
					/>
				</motion.div>

				<motion.div
					layoutId="music-player-controls-skipForward"
					className={styles.control}
				>
					<SkipForward
						color="var(--color-text-300)"
						fill="var(--color-text-300)"
					/>
				</motion.div>
			</motion.div>
		</motion.div>
	)
}

function Screen2({ progress, setProgress }) {
	return (
		<motion.div
			className={styles.playerContainer2}
			layoutId="playerContainer"
			style={{ borderRadius: '22px' }}
		>
			<motion.div
				className={styles.cover}
				layoutId="music-player-cover"
				style={{ borderRadius: 12 }}
			>
				<Image src={Cover} alt="cover" />
			</motion.div>
			<div className={styles.infoWrap}>
				<motion.div
					className={styles.info}
					layoutId="music-player-info"
				>
					<span className={styles.song}>Ocean City Girl</span>
					<span className={styles.singer}>Ivy</span>
				</motion.div>
				<motion.div
					className={styles.controls}
					layoutId="music-player-controls"
				>
					<motion.div
						layoutId="music-player-controls-skipBack"
						className={styles.control}
					>
						<SkipBack
							color="var(--color-text-300)"
							fill="var(--color-text-300)"
						/>
					</motion.div>
					<motion.div
						className={styles.playWrap}
						layoutId="music-player-controls-play"
						whileHover={{
							backgroundColor: 'var(--color-text-100)',
						}}
					>
						<Play
							color="var(--color-surface-100)"
							fill="var(--color-surface-100)"
							style={{ marginLeft: 5 }}
						/>
					</motion.div>
					<motion.div
						layoutId="music-player-controls-skipForward"
						className={styles.control}
					>
						<SkipForward
							color="var(--color-text-300)"
							fill="var(--color-text-300)"
						/>
					</motion.div>
				</motion.div>
				<motion.div
					className={styles.progress}
					layoutId="music-player-progress"
				>
					<span>{minutesToTime(0)}</span>
					<div className={styles.inputWrap}>
						<input
							type="range"
							id="music-player-volumn-slider"
							min={0}
							max={192}
							value={progress}
							onChange={(e) => setProgress(e.target.value)}
						/>
						<motion.div
							className={styles.bar}
							style={{ width: `${(progress / 192) * 100}%` }}
						>
							<div className={styles.thumb}></div>
						</motion.div>
					</div>
					<span>{minutesToTime(192)}</span>
				</motion.div>
			</div>
		</motion.div>
	)
}

function Screen3({ progress, setProgress }) {
	return (
		<motion.div
			className={styles.playerContainer3}
			layoutId="playerContainer"
			style={{ borderRadius: '22px' }}
		>
			<motion.div
				className={styles.cover}
				layoutId="music-player-cover"
				style={{ borderRadius: 12 }}
			>
				<Image src={Cover} alt="cover" />
			</motion.div>
			<div className={styles.infoWrap}>
				<motion.div
					className={styles.info}
					layoutId="music-player-info"
				>
					<span className={styles.song}>Ocean City Girl</span>
					<span className={styles.singer}>Ivy</span>
				</motion.div>
				<motion.div
					className={styles.progress}
					layoutId="music-player-progress"
				>
					<span>{minutesToTime(progress)}</span>
					<div className={styles.inputWrap}>
						<input
							type="range"
							id="music-player-volumn-slider"
							min={0}
							max={192}
							value={progress}
							onChange={(e) => setProgress(e.target.value)}
						/>
						<motion.div
							className={styles.bar}
							style={{ width: `${(progress / 192) * 100}%` }}
						>
							<div className={styles.thumb}></div>
						</motion.div>
					</div>

					<span>{minutesToTime(192)}</span>
				</motion.div>
				<motion.div
					className={styles.controls}
					layoutId="music-player-controls"
				>
					<motion.div
						layoutId="music-player-controls-Shuffle"
						className={styles.control}
					>
						<Shuffle
							color="var(--color-text-300)"
							fill="var(--color-text-300)"
						/>
					</motion.div>
					<motion.div
						layoutId="music-player-controls-skipBack"
						className={styles.control}
					>
						<SkipBack
							color="var(--color-text-300)"
							fill="var(--color-text-300)"
						/>
					</motion.div>
					<motion.div
						className={styles.playWrap}
						layoutId="music-player-controls-play"
						whileHover={{
							backgroundColor: 'var(--color-text-100)',
						}}
					>
						<Play
							color="var(--color-surface-100)"
							fill="var(--color-surface-100)"
							style={{ marginLeft: 5 }}
						/>
					</motion.div>
					<motion.div
						layoutId="music-player-controls-skipForward"
						className={styles.control}
					>
						<SkipForward
							color="var(--color-text-300)"
							fill="var(--color-text-300)"
						/>
					</motion.div>
					<motion.div
						layoutId="music-player-controls-RotateCcw"
						className={styles.control}
						data="data-RotateCcw"
					>
						<RotateCcw color="var(--color-text-300)" />
					</motion.div>
				</motion.div>
			</div>
		</motion.div>
	)
}

function minutesToTime(minutes) {
	const hours = Math.floor(minutes / 60)
	const mins = minutes % 60
	return `${hours.toString().padStart(2, '0')}:${mins
		.toString()
		.padStart(2, '0')}`
}

const MusicPlayerCard = () => {
	const [screen, cycleScreen] = useCycle(1, 2, 3)
	const [progress, setProgress] = React.useState(50)
	return (
		<MotionConfig transition={{ type: 'spring', ...quick }}>
			<div className={styles.wrap} onClick={cycleScreen}>
				{screen === 1 && <Screen1 />}
				{screen === 2 && (
					<Screen2 progress={progress} setProgress={setProgress} />
				)}
				{screen === 3 && (
					<Screen3 progress={progress} setProgress={setProgress} />
				)}
			</div>
		</MotionConfig>
	)
}

export default MusicPlayerCard
