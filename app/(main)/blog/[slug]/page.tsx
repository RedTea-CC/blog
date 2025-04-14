import { getAllBlogPosts } from '@/app/lib/actions'
import Link from 'next/link'
import { Suspense } from 'react'
import { ShareButtons } from './components/ShareButtons'
import { PostNavigation } from './components/PostNavigation'
import Directory from './components/Directory'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: Props) {
  const { slug } = await params

  // 格式化标题显示（将连字符替换为空格）
  const formattedTitle = decodeURIComponent(slug)

  // 获取所有文章
  const allPosts = await getAllBlogPosts()

  // 找到当前文章的索引
  const currentPostIndex = allPosts.findIndex((post) => post.slug === slug)

  // 找出3篇相关文章（除了当前文章之外的其他文章）
  const relatedPosts = allPosts.filter((post) => post.slug !== slug).slice(0, 3)

  // 获取上一篇和下一篇文章
  const prevPost = currentPostIndex > 0 ? allPosts[currentPostIndex - 1] : null
  const nextPost =
    currentPostIndex < allPosts.length - 1
      ? allPosts[currentPostIndex + 1]
      : null

  // 尝试加载 MDX 或 MD 文件
  let Post
  try {
    // 首先尝试加载 .mdx 文件
    const { default: mdxModule } = await import(`@/blog/${formattedTitle}.mdx`)
    Post = mdxModule
  } catch {
    try {
      // 如果 .mdx 不存在，尝试加载 .md 文件
      const { default: mdModule } = await import(`@/blog/${formattedTitle}.md`)
      Post = mdModule
    } catch {
      // 两种文件都不存在时的错误处理
      return (
        <div className="py-8">
          <h1 className="text-2xl font-medium text-red-500">文章未找到</h1>
          <p className="mt-4">
            无法找到标题为&ldquo;{formattedTitle}&rdquo;的文章。
          </p>
        </div>
      )
    }
  }

  return (
    <div className="mx-auto max-w-7xl py-8">
      {/* 文章导航 */}
      <PostNavigation prevPost={prevPost} nextPost={nextPost} />

      {/* 文章内容 */}
      <div className="relative flex justify-between">
        {/* 目录 */}
        <Directory />
        <article className="mb-10 flex grow flex-col items-center">
          <h1 className="mb-6 text-3xl font-bold">{formattedTitle}</h1>
          <Suspense
            fallback={
              <div className="flex items-center justify-center py-8">
                <div className="flex items-center space-x-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-500 border-t-transparent" />
                  <span>加载中...</span>
                </div>
              </div>
            }
          >
            <div className="prose prose-gray prose-h4:prose-base dark:prose-invert prose-h1:text-xl prose-h1:font-medium prose-h2:mt-12 prose-h2:scroll-m-20 prose-h2:text-lg prose-h2:font-medium prose-h3:text-base prose-h3:font-medium prose-h4:font-medium prose-h5:text-base prose-h5:font-medium prose-h6:text-base prose-h6:font-medium prose-strong:font-medium js-toc-content mt-2 pb-20">
              <Post />
            </div>
          </Suspense>
        </article>
      </div>

      {/* 分享按钮 */}
      <Suspense
        fallback={
          <div className="mb-10 border-t border-zinc-200 py-4 dark:border-zinc-800">
            <h3 className="mb-3 text-lg font-medium">分享这篇文章</h3>
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-500 border-t-transparent" />
              <span>加载中...</span>
            </div>
          </div>
        }
      >
        <ShareButtons title={formattedTitle} />
      </Suspense>

      {/* 相关文章推荐 */}
      <Suspense
        fallback={
          <div className="border-t border-zinc-200 pt-8 dark:border-zinc-800">
            <h3 className="mb-4 text-xl font-medium">你可能也喜欢</h3>
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-500 border-t-transparent" />
              <span>加载中...</span>
            </div>
          </div>
        }
      >
        {relatedPosts.length > 0 && (
          <div className="border-t border-zinc-200 pt-8 dark:border-zinc-800">
            <h3 className="mb-4 text-xl font-medium">你可能也喜欢</h3>
            <div className="grid gap-4 md:grid-cols-3">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block rounded-lg border border-zinc-200 p-4 transition hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
                >
                  <h4 className="mb-2 line-clamp-2 font-medium">
                    {post.title}
                  </h4>
                  <p className="line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {post.excerpt}
                  </p>
                  <div className="mt-2 text-xs text-zinc-500">{post.date}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Suspense>
    </div>
  )
}
