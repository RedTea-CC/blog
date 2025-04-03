'use client'

import Link from 'next/link'
import { BlogPost } from '@/app/lib/actions'

// 箭头图标组件
const ArrowLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
)

interface PostNavigationProps {
  prevPost: BlogPost | null
  nextPost: BlogPost | null
}

export function PostNavigation({ prevPost, nextPost }: PostNavigationProps) {
  return (
    <nav className="mb-4 flex items-center justify-between text-sm text-zinc-500">
      <div>
        {prevPost && (
          <Link
            href={`/blog/${prevPost.slug}`}
            className="group flex items-center transition hover:text-zinc-900 dark:hover:text-zinc-200"
          >
            <ArrowLeftIcon />{' '}
            <span className="ml-1 group-hover:underline">上一篇</span>
          </Link>
        )}
      </div>
      <Link
        href="/blog"
        className="transition hover:text-zinc-900 dark:hover:text-zinc-200"
      >
        所有文章
      </Link>
      <div>
        {nextPost && (
          <Link
            href={`/blog/${nextPost.slug}`}
            className="group flex items-center transition hover:text-zinc-900 dark:hover:text-zinc-200"
          >
            <span className="mr-1 group-hover:underline">下一篇</span>{' '}
            <ArrowRightIcon />
          </Link>
        )}
      </div>
    </nav>
  )
}
