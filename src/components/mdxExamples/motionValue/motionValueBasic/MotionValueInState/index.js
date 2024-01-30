'use client'
import dynamic from 'next/dynamic';

const MotionValueInState = dynamic(() => import('./MotionValueInState'))
export default MotionValueInState