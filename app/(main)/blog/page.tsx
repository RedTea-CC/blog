'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getAllBlogPosts } from '@/app/lib/actions'
import { AnimatedBackground } from '@/components/ui/animated-background'
import Link from 'next/link'

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const TRANSITION_SECTION = {
  duration: 0.3,
}

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const data = await getAllBlogPosts()
        setBlogPosts(data)
      } catch (error) {
        console.error('Error fetching blog posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogPosts()
  }, [])

  return (
    <motion.main
      className="space-y-8 py-8"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="space-y-4"
      >
        <h1 className="text-2xl font-medium">Blog</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Thoughts, stories, and ideas.
        </p>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
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
            blogPosts.map((post) => (
              <Link
                key={post.id}
                className="group -mx-3 block rounded-xl px-3 py-4"
                href={`/blog/${post.slug}`}
                data-id={post.id}
              >
                <div className="relative flex flex-col space-y-1">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                      {post.title}
                    </h2>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                      {post.date}
                    </span>
                  </div>
                  <p className="line-clamp-2 text-zinc-600 dark:text-zinc-400">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))
          )}
        </AnimatedBackground>
      </motion.section>
    </motion.main>
  )
}
