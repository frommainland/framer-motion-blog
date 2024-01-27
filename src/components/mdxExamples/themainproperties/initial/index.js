'use client'
import dynamic from 'next/dynamic';

const Initial = dynamic(() => import('./Initial'))
export default Initial