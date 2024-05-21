
import React from 'react'

import styles from './advancedexamples.module.scss'
import IpadPointer from './components/ipadPointer/IpadPointer'
import { CustomCursor } from './components/CustomCursor/CustomCursor'
import { VelocityCursor } from './components/VelocityCursor/VelocityCursor'
import { CursorTrail } from './components/CursorTrail/CursorTrail'
import { CustomCursorDirectionalBokeh } from './components/CustomCursorDirectionalBokeh/CustomCursorDirectionalBokeh'
import { CursorBackgroundPointer } from './components/CursorBackgroundPointer/CursorBackgroundPointer'
import CursorConfetti from './components/CursorConfetti/CursorConfetti'
const Advancedexamples = () => {
    return (
        <div className={styles.contentWrap}>
            <div className={styles.layoutWrap}>
                <div className={styles.layout}>
                    <h1>Advanced Examples</h1>
                    {/* ---- */}
                    {/* unused or not ready */}
                    {/* <section>
                        <h3>Custom Cursor</h3>
                        <p>Cursor controled perspective and enter effect</p>
                        <CustomCursor />
                    </section> */}

                    {/* ---- */}

                    {/* <section>
                        <h3>Cursor Trail</h3>
                        <CursorTrail />
                    </section> */}


                    <section>
                        <h3>iPad Pointer Effect</h3>
                        <p>When you hover on any icons, it feels the icon pull the cursor in when it is near. This magnetic feel animations is explained by Apple designers at WWDC20.</p>
                        <IpadPointer />
                    </section>


                    <section>
                        <h3>Velocity Cursor</h3>
                        <p>You can access the velocity of a motion value and use it to skew shapes</p>
                        <VelocityCursor />
                    </section>


                    <section>
                        <h3>Cursor Directional Bokeh</h3>
                        <p>Move the cursor around, and the image will rotate. The blur effect will also go along the rotation.</p>
                        <CustomCursorDirectionalBokeh />
                    </section>

                    <section>
                        <h3>Background Reveal</h3>
                        <p>Background will reveal its details when you move cursor over and hide it when you stop moving</p>
                        <CursorBackgroundPointer />
                    </section>

                    <section>
                        <h3>Cursor Confetti</h3>
                        <p>wip</p>
                        <CursorConfetti />
                    </section>

                </div>
            </div>
        </div>
    )
}

export default Advancedexamples

