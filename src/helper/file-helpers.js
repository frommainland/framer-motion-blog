import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import React from 'react';

export async function getBlogPostList(subFolderName) {
    // const fileNames = await readDirectory('/content');
    const fileNames = await readDirectory(`/content/${subFolderName}`);

    const blogPosts = [];

    for (let fileName of fileNames) {
        const rawContent = await readFile(
            `/content/${subFolderName}/${fileName}`
        );

        const { data: frontmatter } = matter(rawContent);

        blogPosts.push({
            slug: fileName.replace('.mdx', ''),
            ...frontmatter,
        });
    }

    return blogPosts.sort((a, b) =>
        a.order - b.order
    );
}

// export async function loadBlogPost(slug) {
//   const rawContent = await readFile(
//     `/content/${slug}.mdx`
//   );

//   const { data: frontmatter, content } =
//     matter(rawContent);

//   return { frontmatter, content };
// }


export const loadBlogPost = React.cache(async function loadBlogPost(folder, slug) {
    // const rawContent = await readFile(
    //     `/content/${slug}.mdx`
    // );

    let rawContent

    try {
        rawContent = await readFile(`/content/${folder}/${slug}.mdx`)
    } catch (error) {
        return 'from main'
    }

    const { data: frontmatter, content } = matter(rawContent);

    // return { frontmatter, content };
    return { content };
})

function readFile(localPath) {
    return fs.readFile(
        path.join(process.cwd(), localPath),
        'utf8'
    );
}

function readDirectory(localPath) {
    return fs.readdir(
        path.join(process.cwd(), localPath)
    );
}
