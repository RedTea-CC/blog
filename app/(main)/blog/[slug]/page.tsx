export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  // fix:兼容一下是mdx或者md
  let Post
  try {
    const mdxModule = await import(`@/blog/${slug}.mdx`)
    Post = mdxModule.default
  } catch (error) {
    const mdModule = await import(`@/blog/${slug}.md`)
    Post = mdModule.default
  }

  return <Post />
}

// dynamicParams为false时，必须提供所有的params，否则会404
// dynamicParams为true时，params可以是任意值，next会自动生成所有的params
// export function generateStaticParams() {
//   return [
//     { slug: 'exploring-the-intersection-of-design-ai-and-design-engineering' },
//     { slug: 'diary-2025-W12' },
//   ]
// }

// export const dynamicParams = false
