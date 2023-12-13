import React from 'react'
import styles from './page.module.scss'
import { loadBlogPost } from '@/helper/file-helpers';
import { MDXRemote } from 'next-mdx-remote/rsc';
import mdxMapper from '@/helper/mdxMapper';
import CodeSnippet from '@/components/CodeSnippet';

function formatName(name) {
    let trimmedString = name.trim();
    let stringWithoutSpaces = trimmedString.replace(/\s+/g, '');
    return stringWithoutSpaces
}

const page = async ({ params, searchParams }) => {
    let folderName = formatName(searchParams.catergory)

    const contentData = await loadBlogPost(folderName, params.contentSlug)

    console.log(contentData)

    const { frontmatter, content } = contentData

    return (
        <div className={styles.layoutWrap}>
            <MDXRemote source={content} components={{
                pre: CodeSnippet
            }} />
        </div>
    )
}

export default page