/** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig
// const withMDX = require('@next/mdx')({
//     extension: /\.mdx?$/,
//     options: {
//         remarkPlugins: [require('remark-gfm')],
//     },
// });

module.exports = {
    experimental: {
        outputFileTracingIncludes: {
            '/*': ['./content/**/*'],
        },
    },
};
