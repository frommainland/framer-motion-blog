'use client'
import dynamic from 'next/dynamic';

const OffsetConfig = dynamic(() => import('./OffsetConfig'))
export default OffsetConfig