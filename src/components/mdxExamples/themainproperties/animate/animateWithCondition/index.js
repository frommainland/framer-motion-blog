import dynamic from 'next/dynamic';

const ConditionalAnim = dynamic(() => import('./ConditionalAnim'))
export default ConditionalAnim