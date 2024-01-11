'use client'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { flow } from '@/helper/easing'
import styles from './State01.module.scss'
import { useLongPress } from "@uidotdev/usehooks";
import { useMeasure } from "@uidotdev/usehooks";


function mapRange(input, rangeA, rangeB) {
    const [rangeAStart, rangeAEnd] = rangeA;
    const [rangeBStart, rangeBEnd] = rangeB;
    return rangeBStart + (rangeBEnd - rangeBStart) * (input - rangeAStart) / (rangeAEnd - rangeAStart);
}

export default function State01() {
    // mouse div circle stuff
    const [mPos, setMPos] = React.useState({ top: 0, left: 0 })
    const circleSize = 20
    const ref = React.useRef(null)

    //long press, div box stuff
    const [boxRef, { boxwidth, height }] = useMeasure();

    const [isLongPress, setIsLongPress] = React.useState(false)
    // when long pressed, get mouse position relative left postion percentage by container's width
    const [divScaleX, setDivScaleX] = React.useState(1)

    const handleMouseMove = (e) => {
        const containerRect = ref.current.getBoundingClientRect();
        const left = Math.max(Math.min(e.clientX - containerRect.left, containerRect.width - circleSize), 0);
        const top = Math.max(Math.min(e.clientY - containerRect.top, containerRect.height - circleSize), 0);
        setMPos({ top, left })
        if (isLongPress) {
            let widthPercent = left / (containerRect.width - circleSize) * 100
            setDivScaleX(mapRange(widthPercent, [0, 100], [0.1, 1.9]))
        }
    }

    const attrs = useLongPress(
        () => {
            setIsLongPress(true);
        },
        {
            // onStart: (event) => console.log("Press started"),
            onFinish: () => setIsLongPress(false),
            // onCancel: (event) => console.log("Press cancelled"),
            threshold: 500,
        }
    );

    const gauge = React.useRef(null)
    const [toGaugeDis, setToGaugeDis] = React.useState(null)
    React.useEffect(() => {
        const parentElement = ref.current;
        const childElement = gauge.current;
        const parentTop = parentElement.offsetTop;
        const childTop = childElement.offsetTop;
        const childLeft = childElement.offsetLeft;
        setToGaugeDis({ top: childTop, left: childLeft })
        // const topDistance = childTop - parentTop;
        // console.log('Top Distance:', topDistance);
    }, [])

    const [isMouseInside, setIsMouseInside] = React.useState(false);

    return (
        <div
            className={styles.outerFlex}
            ref={ref}
            {...attrs}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsMouseInside(true)}
            onMouseLeave={() => setIsMouseInside(false)}
        >
            <div className={styles.boxFlex}>
                <motion.div ref={boxRef} className={styles.box} animate={{ width: 200 * divScaleX }} />
            </div>

            <motion.div
                className={styles.gaugeFlex}
                ref={gauge}
                animate={{
                    opacity: isLongPress ? 1 : 0,
                    y: isLongPress ? 0 : 20
                }}
            >
                <div className={styles.gauge}>
                    <p>smaller</p>
                    <p>small</p>
                    <p>•</p>
                    <p>big</p>
                    <p>bigger</p>
                </div>
            </motion.div>

            <AnimatePresence mode='wait'>
                {isLongPress && <motion.div
                    style={{
                        top: mPos.top,
                        left: mPos.left + circleSize / 2,
                        zIndex: 20
                        // width: `${circleSize}px`,
                        // height: `${circleSize}px`,
                    }}
                    animate={{
                        top: isLongPress ? toGaugeDis.top + 2 : mPos.top,
                        left: isLongPress ? mPos.left + circleSize / 2 : toGaugeDis.left,
                        width: isLongPress ? 2 : 0,
                        height: isLongPress ? 32 : 0,
                    }}
                    exit={{ top: mPos.top, opacity: 0 }}
                    className={styles.hand} />
                }
            </AnimatePresence>

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
                    scale: isLongPress ? 0.5 : 1,
                    backgroundColor: isLongPress ? 'var(--color-text-100)' : 'var(--color-surface-200)'
                }}
            />

        </div>
    )
}

