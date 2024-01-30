"use client";
import React from "react";
import styles from "./MotionValueInState.module.scss";
import { motion, useMotionValue, useMotionValueEvent } from "framer-motion";

export default function MotionValueInState() {
	const scale = useMotionValue(1);
	const rotateZ = useMotionValue(45);
	const color = useMotionValue("var(--color-surface-200)");
	const rotateX = useMotionValue(-45);

	const [scaleState, setScaleState] = React.useState(scale.get());
	const [rotateZState, setRotateZState] = React.useState(rotateZ.get());
	const [colorState, setcolorState] = React.useState(color.get());
	const [rotateXState, setRotateXState] = React.useState(rotateX.get());

	useMotionValueEvent(scale, "change", (value) => setScaleState(value.toFixed(2) * 100));
	useMotionValueEvent(rotateZ, "change", (value) =>
		setRotateZState(Math.floor(value)),
	);
	useMotionValueEvent(color, "change", (value) => setcolorState(value));
	useMotionValueEvent(rotateX, "change", (value) =>
		setRotateXState(Math.floor(value)),
	);

	return (
		<div className={styles.wrap}>
			<div className={styles.motionValue}>
				<motion.div
					className={styles.box}
					style={{
						scale,
						backgroundColor: color,
						rotateX,
						rotateZ,
					}}
					whileHover={{
						scale: 0.75,
						rotateX: 0,
						rotateZ: 0,
						backgroundColor: "var(--color-accent-yellow)",
					}}
					transition={{
						duration: 1,
					}}
				/>
				<p>motionValue sync</p>
			</div>
			<div className={styles.rotateX}>
				<motion.div className={styles.box} style={{ rotateX }} />
				<p>rotateX</p>
				<motion.span className={styles.motionNum}>{rotateXState}°</motion.span>
			</div>
			<div className={styles.scale}>
				<motion.div className={styles.box} style={{ scale }} />
				<p>scale</p>
				<motion.span className={styles.motionNum}>{scaleState}%</motion.span>
			</div>
			<div className={styles.color}>
				<motion.div className={styles.box} style={{ backgroundColor: color }} />
				<p>color</p>
				<motion.span className={styles.motionNum}>{colorState}</motion.span>
			</div>
			<div className={styles.rotateZ}>
				<motion.div className={styles.box} style={{ rotateZ }} />
				<p>rotateZ</p>
				<motion.span className={styles.motionNum}>{rotateZState}°</motion.span>
			</div>
		</div>
	);
}
