"use client";
import React from "react";
import styles from "./SetMotionValue.module.scss";
import { motion, useMotionValue } from "framer-motion";

export default function SetMotionValue() {
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
						duration: 0.35,
					}}
				/>
				<p>motionValue sync</p>
			</div>
			<div className={styles.rotateX}>
				<motion.div
					className={styles.box}
					style={{ rotateX }}
					whileHover={{ rotateX: 0 }}
				/>
				<p>rotateX</p>
			</div>
			<div className={styles.scale}>
				<motion.div
					className={styles.box}
					style={{ scale }}
					whileHover={{ scale: 0.75 }}
				/>
				<p>scale</p>
			</div>
			<div className={styles.color}>
				<motion.div
					className={styles.box}
					style={{ backgroundColor: color }}
					whileHover={{ backgroundColor: "var(--color-accent-yellow)" }}
				/>
				<p>color</p>
			</div>
			<div className={styles.rotateZ}>
				<motion.div
					className={styles.box}
					style={{ rotateZ }}
					whileHover={{ rotateZ: 0 }}
				/>
				<p>rotateZ</p>
			</div>
		</div>
	);
}
