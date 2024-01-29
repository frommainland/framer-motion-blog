'use client'
import dynamic from 'next/dynamic';

const InjectMotionValue = dynamic(() => import('./InjectMotionValue'))
export default InjectMotionValue