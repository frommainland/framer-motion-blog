'use client'
import dynamic from "next/dynamic"
const ScaleCorrection = dynamic(() => import('./ScaleCorrection'))
export default ScaleCorrection