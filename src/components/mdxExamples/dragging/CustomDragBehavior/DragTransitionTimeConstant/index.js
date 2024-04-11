'use client'
import dynamic from "next/dynamic"
const DragTransitionTimeConstant = dynamic(() => import('./DragTransitionTimeConstant'))
export default DragTransitionTimeConstant