'use client'
import dynamic from "next/dynamic"
const SnapToCorner = dynamic(() => import('./SnapToCorner'))
export default SnapToCorner