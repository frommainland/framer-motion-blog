'use client'
import dynamic from "next/dynamic"
const CursorSnapping = dynamic(() => import('./CursorSnapping'))
export default CursorSnapping