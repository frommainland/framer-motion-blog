'use client'
import dynamic from 'next/dynamic';

const CursorTrack = dynamic(() => import('./CursorTrack'))
export default CursorTrack