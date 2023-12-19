
import React from 'react'
import styles from './page.module.scss'
import { loadBlogPost } from '@/helper/file-helpers';
import { MDXRemote } from 'next-mdx-remote/rsc';
import mdxMapper from '@/helper/mdxMapper';

function formatName(name) {
    let trimmedString = name.trim();
    let stringWithoutSpaces = trimmedString.replace(/\s+/g, '');
    return stringWithoutSpaces
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
        </div>
    )
}

export default ContentPage