'use client'
import dynamic from 'next/dynamic';

const DelayMix = dynamic(() => import('./DelayMix'))
export default DelayMix
