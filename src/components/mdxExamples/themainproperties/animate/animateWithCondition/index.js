'use client'
import dynamic from 'next/dynamic';

const ConditionalAnim = dynamic(() => import('@/components/mdxExamples/themainproperties/animate/animateWithCondition/ConditionalAnim'))
export default ConditionalAnim