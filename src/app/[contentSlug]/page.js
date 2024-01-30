
import React from 'react'
import styles from './page.module.scss'
import { loadBlogPost } from '@/helper/file-helpers';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { BLOG_TITLE } from '@/constants';
import remarkGfm from 'remark-gfm'

import mdxMapper from '@/helper/mdxMapper';
import motionValueExampleMapper from '@/helper/motionValueExampleMapper';

const options = {
    mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: []
    }
}

const combinedMdxMapper = { ...mdxMapper, ...motionValueExampleMapper }

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

    if (!contentData) {
        return <p style={{ color: `red` }}>no article here</p>
    }

    const { frontmatter, content } = contentData


    return (
        <div className={styles.layoutWrap}>
            <div className={styles.layout}>
                <MDXRemote source={content} components={combinedMdxMapper} options={options} />
            </div>

        </div>
    )
}

export default ContentPage