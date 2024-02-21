import React from 'react';
import styles from './SingleCheckBox.module.scss'

function SingleCheckBox({ value, setValue, id, content }) {
    return (
        <form className={styles.SingleCheckBoxWrap}
            onSubmit={(event) => {
                event.preventDefault();
            }}
        >
            <input
                type="checkbox"
                id={id}
                checked={value}
                onChange={event => {
                    setValue(event.target.checked);
                }}
            />
            <label htmlFor={id}>
                {content}
            </label>
        </form>);
}

export default SingleCheckBox;
