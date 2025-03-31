'use server'

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Blog post type definition
export interface BlogPost {
  id: string
  title: string
  date: string
  slug: string
  content: string
  excerpt: string
}

const blogDirectory = path.join(process.cwd(), 'blog')

// Get all blog post IDs
export async function getBlogPostIds() {
  const fileNames = fs.readdirSync(blogDirectory)

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.(md|mdx)$/, ''),
      },
    }
  })
}

// Get all blog posts
export async function getAllBlogPosts(recentNums = 0): Promise<BlogPost[]> {
  const fileNames = fs.readdirSync(blogDirectory).slice(recentNums * -1)

  const allBlogPosts = fileNames.map((fileName) => {
    const id = fileName.replace(/\.(md|mdx)$/, '')
    const fullPath = path.join(blogDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const stats = fs.statSync(fullPath)

    const matterResult = matter(fileContents)

    return {
      id,
      slug: id,
      title: id,
      date: stats.birthtime.toISOString().split('T')[0], // Use file creation date
      content: matterResult.content,
      excerpt: matterResult.content.slice(0, 100) + '...',
    }
  })

  // Sort posts by date
  return allBlogPosts.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

// Get a single blog post by ID
export async function getBlogPostById(
  id: string,
): Promise<BlogPost | undefined> {
  const fullPath = path.join(blogDirectory, `${id}.md`)

  if (!fs.existsSync(fullPath)) {
    return undefined
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)

  return {
    id,
    slug: id,
    title: matterResult.data.title,
    date: matterResult.data.date,
    content: matterResult.content,
    excerpt: matterResult.content.slice(0, 100) + '...',
  }
}
