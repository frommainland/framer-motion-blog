import React from 'react'
import styles from './page.module.scss'

const page = ({ params }) => {
    return (
        <div className={styles.layoutWrap}>{params.contentSlug}</div>
    )
}

export default page