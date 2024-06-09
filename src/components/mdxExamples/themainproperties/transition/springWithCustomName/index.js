'use client'
import dynamic from 'next/dynamic';

const SpringWithCustomName = dynamic(() => import('./SpringWithCustomName'))
export default SpringWithCustomName