'use client'
import dynamic from "next/dynamic"
const DraggingBasicDirection = dynamic(() => import('./DraggingBasicDirection'))
export default DraggingBasicDirection