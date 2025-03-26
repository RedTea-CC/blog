export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { default: Post } = await import(`@/blog/${slug}.mdx`)

  return <Post />
}

// dynamicParams为false时，必须提供所有的params，否则会404
// dynamicParams为true时，params可以是任意值，next会自动生成所有的params
export function generateStaticParams() {
  return [{ slug: 'welcome' }, { slug: 'about' }, { slug: 'diary-2025-W12' }]
}

export const dynamicParams = false
