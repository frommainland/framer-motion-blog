
import React from 'react'

import styles from './advancedexamples.module.scss'
import IpadPointer from './components/ipadPointer/IpadPointer'
import { CustomCursor } from './components/CustomCursor/CustomCursor'
import { VelocityCursor } from './components/VelocityCursor/VelocityCursor'

const Advancedexamples = () => {
    return (
        <div className={styles.contentWrap}>
            <div className={styles.layoutWrap}>
                <div className={styles.layout}>
                    <h1>Advanced Examples</h1>
                    <section>
                        <h3>iPad Pointer Effect</h3>
                        <p>When you hover on any icons, it feels the icon pull the cursor in when it is near. This magnetic feel animations is explained by Apple designers at WWDC20.</p>
                        <IpadPointer />
                    </section>

                    <section>
                        <h3>Custom Cursor</h3>
                        <p>Cursor controled perspective and enter effect</p>
                        <CustomCursor />
                    </section>

                    <section>
                        <h3>Velocity Cursor</h3>
                        <p>You can access the velocity of a motion value and use it to skew shapes</p>
                        <VelocityCursor />
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Advancedexamples

