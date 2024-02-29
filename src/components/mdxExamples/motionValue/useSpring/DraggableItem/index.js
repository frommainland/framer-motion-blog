'use client'
import dynamic from 'next/dynamic';

const DraggableItem = dynamic(() => import('./DraggableItem'))
export default DraggableItem