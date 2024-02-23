'use client'
import dynamic from 'next/dynamic';

const ScrollOffset = dynamic(() => import('./ScrollOffset'))
export default ScrollOffset