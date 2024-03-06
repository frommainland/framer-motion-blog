'use client'
import dynamic from "next/dynamic"
const OnExitComplete = dynamic(() => import('./OnExitComplete'))
export default OnExitComplete