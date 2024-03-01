'use client'
import dynamic from "next/dynamic"
const CustomProps = dynamic(() => import('./CustomProps'))
export default CustomProps