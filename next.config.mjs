import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import matter from 'gray-matter'
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
  webpack: (config, { dev }) => {
    if (!dev) {
      // 直接禁用缓存
      config.cache = false
    }
    return config
  },
  images: {
    remotePatterns: [
      new URL('https://gitee.com/redtea25/note-img/raw/master/img/***'),
      // {
      //   protocol: 'https',
      //   hostname: 'gitee.com',
      //   port: '',
      //   pathname: 'redtea25/note-img/raw/master/img/**',
      //   search: '',
      // },
    ],
  },
}

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [
      () => (tree, file) => {
        const { content } = matter(file.value)
        console.log('content', content)
        file.value = content
        return tree
      },
      remarkGfm,
    ],
    rehypePlugins: [
      // 为代码添加特殊样式
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
