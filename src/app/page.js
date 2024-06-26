import { MDXRemote } from "next-mdx-remote/rsc"
import mdxMapper from "@/helper/mdxMapper"
import { loadBlogPost } from "@/helper/file-helpers"
import React from "react"

// keep the same styles from [contentSlug], the home page is same as in [contentSlug]-introduction page
import styles from '@/app/[contentSlug]/page.module.scss'
import Sidebar from "@/components/Sidebar"

export default async function Home() {
    const contentData = await loadBlogPost('Introduction', 'introduction')

    if (!contentData) {
        return <p style={{ color: `red` }}>no article here</p>
    }

    const { content } = contentData

    return (
        <div className={styles.contentWrap}>
            <Sidebar />
            <div className={styles.layoutWrap}>
                <div className={styles.layout}>
                    <MDXRemote source={content} components={mdxMapper} />
                </div>
            </div>
        </div>
    )
}


