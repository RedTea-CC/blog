'use server'

import { getAllBlogPosts } from '@/lib/blog'

export async function getBlogPosts() {
  try {
    const blogPosts = getAllBlogPosts()
    return blogPosts
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    throw new Error('Failed to fetch blog posts')
  }
}