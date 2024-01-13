'use client'
import React from 'react'
import styles from './ConditionalAnim.module.scss'
import { clamp, motion, transform } from 'framer-motion'
import { useMeasure } from "@uidotdev/usehooks";


export default function ConditionalAnim() {
    const [dragging, setDragging] = React.useState(false);
    const constraintsRef = React.useRef(null);
    const [dragDis, setDragDis] = React.useState(0)


    const [isMouseInside, setIsMouseInside] = React.useState(false);

    const [mPos, setMPos] = React.useState({ top: 0, left: 0 })
    const circleSize = 20
    const ref = React.useRef(null)
    const handleMouseMove = (e) => {
        const containerRect = ref.current.getBoundingClientRect();
        const left = Math.max(Math.min(e.clientX - containerRect.left, containerRect.width - circleSize), 0);
        const top = Math.max(Math.min(e.clientY - containerRect.top, containerRect.height - circleSize), 0);
        setMPos({ top, left })
    }


    // calculate dis to the middle of the measureRef
    const [measureRef, { width, height }] = useMeasure()

    function getDis(left, top) {
        let xOffset = Math.abs(width / 2 - left)
        let yOffset = Math.abs(height / 2 - top)
        let result = Math.sqrt(Math.pow(xOffset, 2) + Math.pow(yOffset, 2))
        return result
    }

    const maxDistoCenter = getDis(width, height)
    const mouseDisToCenter = getDis(mPos.left, mPos.top)

    const transformer = transform([0, maxDistoCenter], [1, .5])
    const scaleBox = transformer(mouseDisToCenter)
    // console.log(scaleBox)


    return (
        <div ref={measureRef}>
            <div
                ref={ref}
                className={styles.outerFlex}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsMouseInside(true)}
                onMouseLeave={() => setIsMouseInside(false)}
            >
                <div className={styles.boxFlex} ref={constraintsRef}>
                    <motion.div
                        className={styles.box}
                        dragConstraints={constraintsRef}
                        drag
                        dragElastic={0.01}
                        animate={{
                            backgroundColor: dragging ? 'var(--color-surface-300)' : 'var(--color-surface-100)',
                            scale: dragging ? 0.9 : 1
                        }}
                        onDragStart={() => setDragging(true)}
                        onDragEnd={() => setDragging(false)}
                    >
                    </motion.div>
                </div>
                <motion.div className={styles.mouse}
                    style={{
                        opacity: isMouseInside ? 1 : 0,
                        position: 'absolute',
                        borderRadius: '50%',
                        width: `${circleSize}px`,
                        height: `${circleSize}px`,
                        border: `solid var(--color-text-100) 4px`,
                        zIndex: 30,
                        ...mPos
                    }}
                    animate={{
                        scale: dragging ? 0.5 : 1,
                        backgroundColor: dragging ? 'var(--color-text-100)' : 'var(--color-surface-200)'
                    }}
                />
            </div>
        </div>
    )
}
