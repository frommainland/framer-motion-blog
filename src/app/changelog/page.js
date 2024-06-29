
import React from 'react'
import styles from './changelog.module.scss'

const ChangeLog = () => {
    return (
        <div className={styles.contentWrap}>
            <div className={styles.layoutWrap}>
                <div className={styles.layout}>
                    <h1>Changelog</h1>
                    {/* newer start here */}
                    {/* <BasicCounter /> */}
                    <section>
                        <h2>Cursor examples</h2>
                        <p className={styles.date}>May 24, 2024</p>
                        <p>Add 6 examples of cursor effect in advanced examples, mixing framer motion multiple features.</p>
                    </section>

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

export default ChangeLog