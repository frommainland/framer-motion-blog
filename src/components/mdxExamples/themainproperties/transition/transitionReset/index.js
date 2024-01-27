'use client'
import dynamic from 'next/dynamic';

const TransitionReset = dynamic(() => import('./TransitionReset'))
export default TransitionReset