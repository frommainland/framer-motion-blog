'use client'
import React from 'react'
import styles from './SVGDisplacementFilter.module.scss'
import { animate, motion, useMotionValue } from 'framer-motion'
import waterDisplacement from '@/app/images/waterdisplacement.jpg'
import SingleCheckBox from '@/components/SingleCheckBox'

export default function SVGDisplacementFilter() {
	const x = useMotionValue(0)
	const scale = useMotionValue(0)
	animate(x, [-500, 0], {
		duration: 10,
		repeat: Infinity,
		repeatType: 'mirror',
	})

	animate(scale, [0, 10, 60, 20, 0], {
		duration: 10,
		repeat: Infinity,
		repeatType: 'mirror',
	})

	const [showDisplacement, setshowDisplacement] = React.useState(false)
	return (
		<div className={styles.wrap}>
			<svg
				style={{
					width: 394,
					height: 128,
				}}
			>
				<defs>
					<filter
						id="displacement-filter"
						// width="394"
						// height="128"
						x={0}
						y="0"
						filterUnits="userSpaceOnUse"
						colorInterpolationFilters="sRGB"
					>
						<motion.feImage
							href={waterDisplacement.src}
							width={941}
							height={128}
							x={x}
							y={0}
						/>
						<motion.feDisplacementMap
							id="fedisplacementmap"
							in={!showDisplacement ? 'SourceGraphic' : null}
							in2={showDisplacement ? 'SourceGraphic' : null}
							xChannelSelector="R"
							yChannelSelector="B"
							scale={scale}
						/>
					</filter>
				</defs>
				<text
					className={styles.svgText}
					x="50%"
					y="50%"
					textAnchor="middle"
					dominantBaseline="middle"
					filter="url(#displacement-filter)"
				>
					Galexio
				</text>
			</svg>
			<div
				style={{
					position: 'absolute',
					bottom: 20,
					left: '50%',
					transform: 'translateX(-50%)',
				}}
			>
				<SingleCheckBox
					value={showDisplacement}
					setValue={setshowDisplacement}
					id="showDisplacement"
					content="Displacement Image"
				/>
			</div>
		</div>
	)
}
