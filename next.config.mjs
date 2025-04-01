import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
// import readingTime from 'reading-time'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow .mdx extensions for files
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      // 为代码添加特殊样式
      // @ts-ignore
      [rehypePrismPlus, { defaultLanguage: 'js', ignoreMissing: true }],
      // 为每个 header 添加 id
      rehypeSlug,
      //为 header 添加链接
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            className: ['anchor'],
          },
        },
      ],
      rehypeHighlight,
    ],
  },
})

// Combine MDX and Next.js config
export default withMDX(nextConfig)
