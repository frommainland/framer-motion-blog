'use client'
import dynamic from "next/dynamic"
const DynamicVariants = dynamic(() => import('./DynamicVariants'))
export default DynamicVariants