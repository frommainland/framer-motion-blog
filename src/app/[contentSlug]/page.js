
import React from 'react'
import styles from './page.module.scss'
import { loadBlogPost } from '@/helper/file-helpers';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { BLOG_TITLE } from '@/constants';
import remarkGfm from 'remark-gfm'
import Sidebar from '@/components/Sidebar'
import Custom404 from './Custom404';

import mdxMapper from '@/helper/mdxMapper';
import motionValueExampleMapper from '@/helper/motionValueExampleMapper';
import animationExampleMapper from '@/helper/animationsExampleMapper';
import layoutAnimationExampleMapper from '@/helper/layoutAnimation-ExampleMapper';
import svgAnimationExampleMapper from '@/helper/svgAnimation-ExampleMapper';
import draggingExampleMapper from '@/helper/draggingExampleMapper';
import reorderExampleMapper from '@/helper/reorderExampleMapper';

const options = {
    mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: []
    }
}

// all the example mappers go here under combinedMdxMapper
const combinedMdxMapper = { ...mdxMapper, ...motionValueExampleMapper, ...animationExampleMapper, ...layoutAnimationExampleMapper, ...svgAnimationExampleMapper, ...draggingExampleMapper, ...reorderExampleMapper }

function formatName(name) {
    let trimmedString = name.trim();
    let stringWithoutSpaces = trimmedString.replace(/\s+/g, '');
    return stringWithoutSpaces
}


export async function generateMetadata({ params, searchParams }) {

    let folderName = formatName(searchParams.catergory)
    const title = params.contentSlug;
    const catergory = searchParams.catergory
    const contentData = await loadBlogPost(folderName, params.contentSlug)

    if (!contentData) {
        return null
    }

    // const { frontmatter } = await (loadBlogPost(params.postSlug))
    return {
        title: `${title} • ${BLOG_TITLE}`,
        // description: blogData.frontmatter.abstract
        description: `${title} of ${catergory} in ${BLOG_TITLE}`
    };
}


const ContentPage = async ({ params, searchParams }) => {

    let folderName = formatName(searchParams.catergory)
    const contentData = await loadBlogPost(folderName, params.contentSlug)

    // example
    // http://localhost:3000/the-animate-property?catergory=The+Main+Properties+!@#@#$@
    // so it returns 404
    if (!contentData) {
        return <Custom404 />
    }

    const { frontmatter, content } = contentData
    return (
        <div className={styles.contentWrap}>
            <Sidebar />
            <div className={styles.layoutWrap}>
                <div className={styles.layout}>
                    <MDXRemote source={content} components={combinedMdxMapper} options={options} />
                </div>
            </div>
        </div>



    )
}

export default ContentPage

{/* <div className={styles.layoutWrap}>
            <div className={styles.layout}>
                <MDXRemote source={content} components={combinedMdxMapper} options={options} />
            </div>
</div> */}