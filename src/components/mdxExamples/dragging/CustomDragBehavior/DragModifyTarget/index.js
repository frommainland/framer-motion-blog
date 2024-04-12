'use client'
import dynamic from "next/dynamic"
const DragModifyTarget = dynamic(() => import('./DragModifyTarget'))
export default DragModifyTarget