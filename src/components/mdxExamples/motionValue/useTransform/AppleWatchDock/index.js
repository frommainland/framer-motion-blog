'use client'
import dynamic from 'next/dynamic';

const AppleWatchDock = dynamic(() => import('./AppleWatchDock'))
export default AppleWatchDock