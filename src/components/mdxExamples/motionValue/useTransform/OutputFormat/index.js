'use client'
import dynamic from 'next/dynamic';

const OutputFormat = dynamic(() => import('./OutputFormat'))
export default OutputFormat