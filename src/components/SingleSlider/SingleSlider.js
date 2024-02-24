import React from 'react';
import Field from '../Field';

function SingleSlider({ label, id, min, max, step, value, setValue }) {

    function onChange(e) {
        const { id, value } = e.target
        setValue(value)
    }
    return (
        <Field label={`${label}: ${value}`}>
            <input
                type="range"
                id={id}
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={onChange}
            />
        </Field>
    );
}

export default SingleSlider;
