'use client'
import dynamic from 'next/dynamic';

const Sandbox = dynamic(() => import('@/components/mdxExamples/themainproperties/animate/sandbox/Sandbox'))
export default Sandbox