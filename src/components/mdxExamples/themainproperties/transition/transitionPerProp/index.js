'use client'
import dynamic from 'next/dynamic';

const TransitionPerProp = dynamic(() => import('./TransitionPerProp'))
export default TransitionPerProp