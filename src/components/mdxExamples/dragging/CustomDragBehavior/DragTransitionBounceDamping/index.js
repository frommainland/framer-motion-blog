'use client'
import dynamic from "next/dynamic"
const DragTransitionBounceDamping = dynamic(() => import('./DragTransitionBounceDamping'))
export default DragTransitionBounceDamping