'use client'
import dynamic from 'next/dynamic';

const DelayExample = dynamic(() => import('./DelayExample'))
export default DelayExample
