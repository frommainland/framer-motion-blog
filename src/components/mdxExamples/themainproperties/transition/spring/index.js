'use client'
import dynamic from 'next/dynamic';

const SpringExample = dynamic(() => import('./SpringExample'))
export default SpringExample