'use client'

import { motion } from 'framer-motion'
import { AnimatedBackground } from '@/components/ui/animated-background'
import Link from 'next/link'

interface BlogPost {
  id: string
  title: string
  date: string
  slug: string
  content: string
  excerpt: string
}

interface BlogListProps {
  posts: BlogPost[]
  loading?: boolean
}

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const VARIANTS_ITEM = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const TRANSITION_ITEM = {
  duration: 0.3,
}

export function BlogList({ posts, loading = false }: BlogListProps) {
  return (
    <motion.div
      className="flex flex-col space-y-0"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <AnimatedBackground
        enableHover
        className="h-full w-full rounded-lg bg-zinc-100 dark:bg-zinc-950"
        transition={{
          type: 'spring',
          bounce: 0,
          duration: 0.2,
        }}
      >
        {loading ? (
          <div className="flex items-center justify-center p-6 text-zinc-500">
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-500 border-t-transparent" />
              <span>Loading blog posts...</span>
            </div>
          </div>
        ) : (
          posts.map((post) => (
            <motion.div
              key={post.id}
              variants={VARIANTS_ITEM}
              transition={TRANSITION_ITEM}
            >
              <Link
                className="group block -mx-3 rounded-xl px-3 py-4 transition-colors hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
                href={`/blog/${post.slug}`}
                data-id={post.id}
              >
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <h2 className="font-medium text-lg text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                      {post.title}
                    </h2>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-400 dark:group-hover:text-zinc-500 transition-colors">
                      {post.date}
                    </span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-500 dark:group-hover:text-zinc-500 transition-colors line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))
        )}
      </AnimatedBackground>
    </motion.div>
  )
}