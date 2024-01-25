import React from 'react'
import styles from './AnimateExamples.module.scss'
import WidthExample from './widthExample/WidthExample'
import YExample from './yExample/YExample'
import RotateExample from './rotate/RotateExample'
import BackgroundColor from './backgroundcolor/BackgroundColor'
import BorderExample from './border/BorderExample'
import BoxShadow from './boxshadow/BoxShadow'
import FontVariation from './fontVariation/FontVariation'
import Filter from './filter/Filter'

export default function AnimateExamples() {
    return (
        <div className={styles.gridWrap}>
            <WidthExample />
            <YExample />
            <RotateExample />
            <BackgroundColor />
            <BorderExample />
            <BoxShadow />
            <FontVariation />
            <Filter />
        </div>
    )
}
