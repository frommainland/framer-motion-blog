'use client'
import React from 'react';
import { RefreshCcw } from 'react-feather';
import styles from './RestartDemoWrap.module.scss'
import { motion } from 'framer-motion';

function RestartDemoWrap({ children }) {
    const [count, setCount] = React.useState(0)
    return (
        <div className={styles.restartDemoWrap}>
            {React.cloneElement(children, { key: count })}
            <motion.button onClick={() => setCount(count + 1)} whileHover={{ border: '1px solid var(--color-surface-200)' }} whileTap={{ scale: .95 }}>
                <RefreshCcw />
                Restart demo
            </motion.button>
        </div>
    );
}

export default RestartDemoWrap;
