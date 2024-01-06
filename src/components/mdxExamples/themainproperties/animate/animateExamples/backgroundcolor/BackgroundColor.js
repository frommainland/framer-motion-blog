'use client'
import { motionValue, useTransform } from 'framer-motion'
import ExampleWrapper from '../exampleWrapper/ExampleWrapper'
import styles from './BackgroundColor.module.scss'

import React from 'react'

export default function BackgroundColor() {
    const redHSL = 'hsl(10, 80, 53)'
    const blueHSL = 'hsl(255, 100, 44)'

    const [volume, setVolume] = React.useState(0);

    const transferValue = motionValue(volume)
    const backgroundColor = useTransform(transferValue, [0, 100], [redHSL, blueHSL])

    return (
        <ExampleWrapper caption='background-color'>
            <div className={styles.wrapper} style={{ backgroundColor: backgroundColor.current }}>
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                    }}
                >
                    <input
                        type="range"
                        id="volume-slider"
                        min={0}
                        max={100}
                        value={volume}
                        onChange={event => {
                            setVolume(event.target.value);
                        }}
                        style={{
                            backgroundSize: `${volume}% 100%`
                        }}
                    />
                </form>
            </div>
        </ExampleWrapper>
    )
}
