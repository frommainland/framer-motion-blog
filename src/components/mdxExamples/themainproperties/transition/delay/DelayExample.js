'use client'
import React from 'react'
import styles from './DelayExample.module.scss'
import { useMeasure } from '@uidotdev/usehooks'
import Stripes from './Stripes'
import Control from './Control'

export default function DelayExample() {
    // control data
    const [values, setValues] = React.useState({
        size: 30,
        stripeNum: 20,
        singleTime: .8,
        totalTime: 8,
        easingName: 'easeIn',
        color: 'var(--color-accent-red)'
    })

    // control play 
    const [isPlay, setIsPlay] = React.useState(false)

    const [wrapRef, { width: wrapRefWidth, height }] = useMeasure()

    return (
        <div
            className={styles.wrap}
            ref={wrapRef}
        >
            <Stripes values={values} wrapRefWidth={wrapRefWidth} isPlay={isPlay} />
            <Control values={values} setValues={setValues} setIsPlay={setIsPlay} isPlay={isPlay} />
        </div>
    )
}






