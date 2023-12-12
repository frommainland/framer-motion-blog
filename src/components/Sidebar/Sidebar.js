import React from 'react';
import styles from './Sidebar.module.scss'
import { getBlogPostList } from '@/helper/file-helpers';
import { ChevronDown } from 'react-feather';


function SidebarList({ title, content }) {
    return (
        <div className={styles.sidebarCatergory}>
            <div className={styles.sidebarTitle}>
                <h3>{title}</h3>
                <ChevronDown size={24} />
            </div>

            <ul>
                {content?.map((item) =>
                    <li key={item.slug}>{item.title}</li>
                )}
            </ul>
        </div>
    )
}

async function Sidebar() {
// sidebar list order as follows: 
//  'TheMainProperties', 'Animations', 'LayoutAnimations', 'MotionValues', 'ManualControls', 'SVGAnimations', 'Dragging', 'APIOverview', 'SomeExamples'


    const TheMainProperties = await getBlogPostList('TheMainProperties')

    console.log(TheMainProperties)
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
            <SidebarList title='The Main Properties' content={TheMainProperties} />
            <SidebarList title='Animations' content={Animations} />
            <SidebarList title='LayoutAnimations' content={LayoutAnimations} />
            <SidebarList title='MotionValues' content={MotionValues} />
            <SidebarList title='ManualControls' content={ManualControls} />
            <SidebarList title='SVGAnimations' content={SVGAnimations} />
            <SidebarList title='Dragging' content={Dragging} />
            <SidebarList title='APIOverview' content={APIOverview} />
            <SidebarList title='SomeExamples' content={SomeExamples} />
        </div>

    )
}

export default Sidebar;
