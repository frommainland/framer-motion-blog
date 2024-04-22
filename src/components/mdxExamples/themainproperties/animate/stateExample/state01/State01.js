import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLongPress, useMeasure } from "@uidotdev/usehooks";
import styles from './State01.module.scss'

// Function to map a value from one range to another
function mapRange(input, rangeA, rangeB) {
    const [rangeAStart, rangeAEnd] = rangeA;
    const [rangeBStart, rangeBEnd] = rangeB;
    return rangeBStart + (rangeBEnd - rangeBStart) * (input - rangeAStart) / (rangeAEnd - rangeAStart);
}

export default function State01() {
    const circleSize = 20
    const ref = React.useRef(null)
    const gauge = React.useRef(null)

    // get ref width
    const [outerFlexWidth, setOuterFlexWidth] = React.useState(0);
    const [outerFlexHeight, setOuterFlexHeight] = React.useState(0);

    const updateDimensions = () => {
        if (ref.current) {
            setOuterFlexWidth(ref.current.offsetWidth);
            setOuterFlexHeight(ref.current.offsetHeight);
        }
    }

    React.useEffect(() => {
        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    // State for mouse position
    const [mPos, setMPos] = React.useState({ top: 0, left: 0 })

    // State for long press
    const [isLongPress, setIsLongPress] = React.useState(false)

    // State for div scale
    const [divScaleX, setDivScaleX] = React.useState(1)

    // State for mouse inside
    const [isMouseInside, setIsMouseInside] = React.useState(false);

    // State for gauge distance
    const [toGaugeDis, setToGaugeDis] = React.useState(null)

    // Measure box
    // const [boxRef, { boxwidth, height }] = useMeasure();

    // Handle mouse move
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

    // Long press attributes
    const attrs = useLongPress(
        () => {
            setIsLongPress(true);
        },
        {
            onFinish: () => setIsLongPress(false),
            threshold: 500,
        }
    );

    // Calculate gauge distance
    React.useEffect(() => {
        const parentElement = ref.current;
        const childElement = gauge.current;
        const parentTop = parentElement.offsetTop;
        const childTop = childElement.offsetTop;
        const childLeft = childElement.offsetLeft;
        setToGaugeDis({ top: childTop, left: childLeft })
    }, [])

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
                <motion.div className={styles.box} animate={{ width: outerFlexWidth * 0.3 * divScaleX }} />
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
                    <p style={{ color: 'var(--color-accent-red)' }}>•</p>
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
                    border: 'solid var(--color-text-100) 4px',
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