
import React from 'react'
import styles from './page.module.scss'
import { loadBlogPost } from '@/helper/file-helpers';
import { MDXRemote } from 'next-mdx-remote/rsc';
import mdxMapper from '@/helper/mdxMapper';
import { BLOG_TITLE } from '@/constants';

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

    const { content } = contentData


    return (
        <div className={styles.layoutWrap}>
            <MDXRemote source={content} components={mdxMapper} />
            <h1>next</h1>
            <h1>previous</h1>
        </div>
    )
}

export default ContentPage