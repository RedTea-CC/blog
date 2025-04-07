'use client'

import Link from 'next/link'
import { ArrowLeftIcon, ArrowRight } from 'lucide-react'
import { BlogPost } from '@/app/lib/actions'

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
            <ArrowLeftIcon className="w-5" />{' '}
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
            <ArrowRight className="w-5" />
          </Link>
        )}
      </div>
    </nav>
  )
}
