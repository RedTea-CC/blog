import { Header as HeaderFixed } from './HeaderFixed'
import { Footer } from './footer'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 bg-[url('/grid-black.svg')] bg-top bg-repeat select-none dark:bg-[url('/grid.svg')]" />

      {/* 固定在页面顶部的装饰性渐变背景元素 */}
      <span className="pointer-events-none fixed top-0 block h-[800px] w-full bg-[radial-gradient(103.72%_46.58%_at_50%_0%,rgba(5,5,5,0.045)_0%,rgba(0,0,0,0)_100%)] select-none dark:bg-[radial-gradient(103.72%_46.58%_at_50%_0%,rgba(255,255,255,0.09)_0%,rgba(255,255,255,0)_100%)]" />

      <div className="relative text-zinc-800 dark:text-zinc-200">
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col bg-zinc-50/90 shadow-xl ring-1 ring-zinc-100 lg:px-15 dark:bg-zinc-900/80 dark:ring-zinc-400/20">
          <HeaderFixed />
          <div className="grow">{children}</div>
          <Footer />
        </div>
      </div>
    </>
  )
}
