import React from 'react';
import styles from './Sidebar.module.scss'
import { getBlogPostList } from '@/helper/file-helpers';
import { SidebarList } from '../SidebarList/SidebarList';
import SidebarListWrap from '../SidebarListWrap';


async function Sidebar() {
    // sidebar list order as follows: 
    //  'TheMainProperties', 'Animations', 'LayoutAnimations', 'MotionValues', 'ManualControls', 'SVGAnimations', 'Dragging', 'APIOverview', 'SomeExamples'

    const TheMainProperties = await getBlogPostList('TheMainProperties')
    // console.log(TheMainProperties)
    const Animations = await getBlogPostList('Animations')
    const LayoutAnimations = await getBlogPostList('LayoutAnimations')
    const MotionValues = await getBlogPostList('MotionValues')
    const ManualControls = await getBlogPostList('ManualControls')
    const SVGAnimations = await getBlogPostList('SVGAnimations')
    const Dragging = await getBlogPostList('Dragging')
    const APIOverview = await getBlogPostList('APIOverview')
    const SomeExamples = await getBlogPostList('SomeExamples')


    return (
        <div className={styles.sidebarWrap}>
            <SidebarListWrap>
                <SidebarList title='The Main Properties' content={TheMainProperties} />
                <SidebarList title='Animations' content={Animations} />
                <SidebarList title='Layout Animations' content={LayoutAnimations} />
                <SidebarList title='Motion Values' content={MotionValues} />
                <SidebarList title='Manual Controls' content={ManualControls} />
                <SidebarList title='SVG Animations' content={SVGAnimations} />
                <SidebarList title='Dragging' content={Dragging} />
                <SidebarList title='API Overview' content={APIOverview} />
                <SidebarList title='Some Examples' content={SomeExamples} />
            </SidebarListWrap>
        </div>

    )
}

export default Sidebar;
