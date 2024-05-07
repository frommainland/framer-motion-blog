
import React from 'react'

import styles from './advancedexamples.module.scss'

const Advancedexamples = () => {
    return (
        <div className={styles.contentWrap}>
            <div className={styles.layoutWrap}>
                <div className={styles.layout}>
                    <h1>Advanced Examples</h1>
                    <section>
                        <h2>Site launch</h2>
                        <p className={styles.date}>May 06, 2024</p>
                        <p>This site is alive, including the most basic examples of how framer motion works in web animations.</p>
                    </section>

                </div>
            </div>
        </div>
    )
}

export default Advancedexamples