import React from 'react';
import styles from './Sidebar.module.scss'
import { getBlogPostList } from '@/helper/file-helpers';
import { SidebarList } from '../SidebarList/SidebarList';
import SidebarListWrap from '../SidebarListWrap';
import SidebarListOnlyTitle from '../SidebarListOnlyTitle';

async function Sidebar() {
    // sidebar list order as follows: 
    //  'TheMainProperties', 'Animations', 'LayoutAnimations', 'MotionValues', 'ManualControls', 'SVGAnimations', 'Dragging', 'APIOverview', 'SomeExamples'

    const Introduction = await getBlogPostList('Introduction')
    const TheMainProperties = await getBlogPostList('TheMainProperties')
    // console.log(TheMainProperties)
    const Animations = await getBlogPostList('Animations')
    const LayoutAnimations = await getBlogPostList('LayoutAnimations')
    const MotionValues = await getBlogPostList('MotionValues')
    const SVGAnimations = await getBlogPostList('SVGAnimations')
    const Dragging = await getBlogPostList('Dragging')
    const Reorder = await getBlogPostList('Reorder')


    return (
        <div className={styles.sidebarWrap}>
            <SidebarListWrap>
                {/* <SidebarListOnlyTitle title='Introduction' content={Introduction} /> */}
                <SidebarList title='Introduction' content={Introduction} />
                <SidebarList title='The Main Properties' content={TheMainProperties} />
                <SidebarList title='Motion Values' content={MotionValues} />
                <SidebarList title='Animations' content={Animations} />
                <SidebarList title='Layout Animations' content={LayoutAnimations} />

                {/* <SidebarList title='Manual Controls' content={ManualControls} /> */}
                <SidebarList title='SVG Animations' content={SVGAnimations} />
                <SidebarList title='Dragging' content={Dragging} />
                <SidebarList title='Reorder' content={Reorder} />
                {/* <SidebarList title='API Overview' content={APIOverview} /> */}
                {/* <SidebarList title='Some Examples' content={SomeExamples} /> */}
            </SidebarListWrap>
        </div>

    )
}

export default Sidebar;
