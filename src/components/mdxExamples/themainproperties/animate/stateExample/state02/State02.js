'use client'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './State02.module.scss'
import { useMeasure } from "@uidotdev/usehooks";
import { range } from '@/utils'
import { RefreshCcw } from 'react-feather'


function mapRange(input, rangeA, rangeB) {
    const [rangeAStart, rangeAEnd] = rangeA;
    const [rangeBStart, rangeBEnd] = rangeB;
    return rangeBStart + (rangeBEnd - rangeBStart) * (input - rangeAStart) / (rangeAEnd - rangeAStart);
}


function Rulers({ mouseP, degrees }) {
    const [gaugeRef, { width, height }] = useMeasure();

    const nums = [-360, -270, -180, -90, 0, 90, 180, 270, 360]
    const redHandStartPos = -(width / 2 - mouseP)
    return (
        <motion.div
            className={styles.gauge}
            ref={gaugeRef}
            style={{
                left: degrees > 360 || degrees < -360
                    ? redHandStartPos + (width / 720) * (degrees % 360)
                    : redHandStartPos + (width / 720) * degrees
            }}
        >
            {range(nums.length - 1).map((item) => {
                return (
                    <div className={styles.cm} key={item}>
                        {range(nums.length).map((line) =>
                            <div className={styles.mm} key={line}></div>
                        )}
                    </div>
                )
            })
            }
        </motion.div>
    )
}

export default function State02() {
    // mouse div circle stuff
    const [mPos, setMPos] = React.useState({ top: 0, left: 0 })
    const circleSize = 20
    const ref = React.useRef(null)
    const handleMouseMove = (e) => {
        const containerRect = ref.current.getBoundingClientRect();
        const left = Math.max(Math.min(e.clientX - containerRect.left, containerRect.width - circleSize), 0);
        const top = Math.max(Math.min(e.clientY - containerRect.top, containerRect.height - circleSize), 0);
        setMPos({ top, left })
    }

    // get gauge width
    const gauge = React.useRef(null)
    const [toGaugeDis, setToGaugeDis] = React.useState(null)
    React.useEffect(() => {
        const childElement = gauge.current;
        const childTop = childElement.offsetTop;
        const childLeft = childElement.offsetLeft;
        setToGaugeDis({ top: childTop, left: childLeft })
    }, [])



    // box pan state
    const [isPan, setIsPan] = React.useState(false)
    const [degrees, setDegrees] = React.useState(0)

    function handlePanStart() {
        setIsPan(true)
    }
    function handlePanEnd() {
        setIsPan(false)
    }


    // hide / show mouse inside the whole example canvas
    const [isMouseInside, setIsMouseInside] = React.useState(false);


    // hand gradient mask
    const [handGradientMaskRef, { width }] = useMeasure()
    const redHandGradientMidPos = mPos.left / width * 100

    return (
        <div
            className={styles.outerFlex}
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsMouseInside(true)}
            onMouseLeave={() => setIsMouseInside(false)}
        >
            <div className={styles.boxFlex}>
                <motion.div
                    className={styles.box}
                    onPanStart={handlePanStart}
                    onPanEnd={handlePanEnd}
                    animate={{ rotate: degrees, scale: isPan ? 0.9 : 1 }}
                    onPan={(_, info) => {
                        setDegrees(degrees + info.delta.x)
                    }}
                >
                    <motion.div animate={{ scale: isPan ? 1 : 0 }} initial={{ scale: 0 }}>
                        <RefreshCcw color="var(--color-surface-300)" size={32} strokeWidth={2} />
                    </motion.div>

                </motion.div>
            </div>

            <motion.div
                className={styles.gaugeFlex}
                ref={gauge}
                animate={{
                    opacity: isPan ? 1 : 0,
                    y: isPan ? 0 : 10
                }}
            >
                <div
                    className={styles.handGradientMask}
                    style={{
                        background: `linear-gradient(90deg,#0e100f 0%,rgba(14, 16, 15, 0) ${redHandGradientMidPos}%,#0e100f 100%)`
                    }}
                    ref={handGradientMaskRef}
                ></div>
                <Rulers
                    mouseP={mPos.left}
                    degrees={degrees}
                />
            </motion.div >

            <AnimatePresence mode='wait'>
                {isPan && <motion.div
                    style={{
                        top: mPos.top,
                        left: mPos.left + circleSize / 2,
                        zIndex: 20
                    }}
                    animate={{
                        top: isPan ? toGaugeDis.top - 6 : mPos.top,
                        width: isPan ? 2 : 0,
                        height: isPan ? 32 : 0,
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
                    scale: isPan ? 0.5 : 1,
                    backgroundColor: isPan ? 'var(--color-text-100)' : 'var(--color-surface-200)'
                }}
            />
        </div >
    )
}

