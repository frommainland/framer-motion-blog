import dynamic from 'next/dynamic';

const ComplexProps = dynamic(() => import('@/components/mdxExamples/themainproperties/animate/complexProps/ComplexProps'))
export default ComplexProps