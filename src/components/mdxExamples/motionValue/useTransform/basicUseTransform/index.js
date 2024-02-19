'use client'
import dynamic from 'next/dynamic';

const BasicUseTransform = dynamic(() => import('./BasicUseTransform'))
export default BasicUseTransform