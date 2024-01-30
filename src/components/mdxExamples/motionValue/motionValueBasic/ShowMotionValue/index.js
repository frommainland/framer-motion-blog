'use client'
import dynamic from 'next/dynamic';

const ShowMotionValue = dynamic(() => import('./ShowMotionValue'))
export default ShowMotionValue