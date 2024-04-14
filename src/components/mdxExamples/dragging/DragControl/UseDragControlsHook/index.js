'use client'
import dynamic from "next/dynamic"
const UseDragControlsHook = dynamic(() => import('./UseDragControlsHook'))
export default UseDragControlsHook