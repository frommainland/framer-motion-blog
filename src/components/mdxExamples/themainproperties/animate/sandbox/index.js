'use client'
import dynamic from 'next/dynamic';

const Sandbox = dynamic(() => import('./Sandbox'))
export default Sandbox