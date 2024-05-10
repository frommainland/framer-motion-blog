
import React from 'react'

import styles from './advancedexamples.module.scss'
import IpadPointer from './components/ipadPointer/IpadPointer'

const Advancedexamples = () => {
    return (
        <div className={styles.contentWrap}>
            <div className={styles.layoutWrap}>
                <div className={styles.layout}>
                    <h1>Advanced Examples</h1>
                    <section>
                        <h2>iPad Pointer Effect</h2>
                        <p>When you hover on any icons, it feels the icon pull the cursor in when it is near. This magnetic feel animations is explained by Apple designers at WWDC20.</p>
                        <IpadPointer />
                    </section>

                </div>
            </div>
        </div>
    )
}

export default Advancedexamples