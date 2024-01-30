"use client";
import React from "react";
import styles from "./ShowMotionValue.module.scss";
import { motion, useMotionValue } from "framer-motion";

export default function ShowMotionValue() {
	const scale = useMotionValue(1);
	const rotateZ = useMotionValue(45);
	const color = useMotionValue("var(--color-surface-200)");
	const rotateX = useMotionValue(-45);

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
				<motion.span className={styles.motionNum}>{rotateX}</motion.span>
			</div>
			<div className={styles.scale}>
				<motion.div className={styles.box} style={{ scale }} />
				<p>scale</p>
				<motion.span className={styles.motionNum}>{scale}</motion.span>
			</div>
			<div className={styles.color}>
				<motion.div className={styles.box} style={{ backgroundColor: color }} />
				<p>color</p>
				<motion.span className={styles.motionNum}>{color}</motion.span>
			</div>
			<div className={styles.rotateZ}>
				<motion.div className={styles.box} style={{ rotateZ }} />
				<p>rotateZ</p>
				<motion.span className={styles.motionNum}>{rotateZ}</motion.span>
			</div>
		</div>
	);
}
