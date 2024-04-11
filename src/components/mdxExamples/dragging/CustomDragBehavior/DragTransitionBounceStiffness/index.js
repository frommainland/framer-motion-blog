'use client'
import dynamic from "next/dynamic"
const DragTransitionBounceStiffness = dynamic(() => import('./DragTransitionBounceStiffness'))
export default DragTransitionBounceStiffness