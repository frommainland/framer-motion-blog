import React from 'react';
import Field from '../Field';
import styles from './SingleSlider.module.scss'
import { transform } from 'framer-motion';

function SingleSlider({ label, id, min, max, step, value, setValue }) {

    function onChange(e) {
        const { id, value } = e.target
        setValue(value)
    }

    let range = transform([min, max], [0, 1])
    let rangeValue = range(value)

    return (
        <Field label={`${label}: ${value}`}>
            <div className={styles.wrap}>
                <span
                    className={styles.activeRange}
                    style={{ width: `calc(${rangeValue * 100}%)` }}></span>
                <input
                    type="range"
                    id={id}
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={onChange}
                />
            </div>

        </Field>
    );
}

export default SingleSlider;
