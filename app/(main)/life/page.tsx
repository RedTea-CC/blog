'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100">
      <main className="mx-auto max-w-6xl px-4 py-8">
        <section className="mb-12">
          <h1 className="mb-6 text-4xl font-bold">最新文章</h1>
          <div className="grid gap-8 md:grid-cols-2">
            {[1, 2, 3, 4].map((post) => (
              <article
                key={post}
                className="border-b pb-8 dark:border-gray-800"
              >
                <div className="relative mb-4 h-60 overflow-hidden rounded-lg">
                  <Image
                    src={`/placeholder.svg?height=300&width=600&text=文章${post}`}
                    alt={`文章${post}封面`}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                  分类
                </span>
                <h2 className="mt-2 mb-3 text-xl font-bold">
                  <Link
                    href={`/posts/${post}`}
                    className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    这是第{post}篇博客文章的标题
                  </Link>
                </h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  这是文章{post}
                  的摘要。一个好的摘要应该能够吸引读者点击阅读全文。
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-2 h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                    <span className="text-sm">作者名</span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    2023年6月{post}日
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-6 text-2xl font-bold">推荐阅读</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((post) => (
              <article
                key={post}
                className="rounded-lg bg-gray-100 p-5 transition-shadow hover:shadow-md dark:bg-gray-800"
              >
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                  分类
                </span>
                <h3 className="mt-1 mb-2 text-lg font-bold">
                  <Link
                    href={`/posts/recommended-${post}`}
                    className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    这是第{post}篇推荐文章的标题
                  </Link>
                </h3>
                <p className="mb-3 text-sm text-gray-700 dark:text-gray-300">
                  这是推荐文章{post}的简短摘要。
                </p>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  2023年5月{post}日
                </span>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
