'use client'

import React from 'react'
import styles from './Sandbox.module.scss'
import { Sandpack } from '@codesandbox/sandpack-react';
import {
    SandpackProvider,
    SandpackLayout,
    SandpackPreview,
    SandpackCodeEditor,
    SandpackCodeViewer
} from "@codesandbox/sandpack-react";


export default function Sandbox() {
    const app = `import styles from './index.css'
import { motion } from 'framer-motion'

export default function App() {
return (
  <div className={styles.outerFlex}>
    <motion.div
      className={styles.wrap}
        whileHover={{
          maskPosition: '0% 0%',
          transform: 'translate3d(0px, 0px, -250px)',
          borderColor: 'var(--color-text-300)'
        }}
        transition={{
          duration: 0.35,
        }}
    ></motion.div>
  </div> )
}
`
    const intial = `.outerFlex {
  width: 100%;
  display: grid;
  place-items: center;
  aspect-ratio: 1 / 0.8;
  .wrap {
    aspect-ratio: 1;
    cursor: pointer;
    max-width: 450px;
    width: 30vw;
    background-color: var(--color-surface-200);
    background-image: linear-gradient(
        90deg,
        var(--color-surface-100) 1px,
        transparent 0
      ),
      linear-gradient(180deg, var(--color-surface-100) 1px, transparent 0);
    background-size: 2em 2em;
    border-radius: 2em;
    mask: linear-gradient(
        5deg,
        rgba(0, 0, 0, 0.6) 40%,
        #000,
        rgba(0, 0, 0, 0.68) 60%
      )
      100% 100%/250% 250%;
    transform: perspective(750px) translate3d(0px, 0px, -250px)
      rotateX(27deg) scale(0.9);
    border: 1px solid var(--color-surface-300);
  }
}
`
    const files = {
        '/App.js': app,
        '/index.scss': intial
    }

    return (
        // <Sandpack
        //   files={files}
        //   theme="auto"
        //   template="react"
        //   options={{
        //     showTabs: true,
        //     closableTabs: false,
        //   }}
        //   customSetup={{ 
        //     dependencies: { 
        //       "framer-motion": "latest" 
        //     }
        //   }}
        // />
        <SandpackProvider template="react" files={files} theme="dark" suppressHydrationWarning>
            <SandpackLayout>
                <SandpackCodeViewer
                //   showTabs
                //   showLineNumbers
                //   showInlineErrors
                //   wrapContent
                />
                {/* <SandpackPreview /> */}
            </SandpackLayout>
        </SandpackProvider>
    )
}
