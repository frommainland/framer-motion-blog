import React from 'react';
import { Code } from "bright"
import styles from './CodeSnippet.module.scss'

Code.theme = "dark-plus"

function CodeSnippet(props) {
    return <Code {...props} className={styles.wrapper} />;
}

export default CodeSnippet;
