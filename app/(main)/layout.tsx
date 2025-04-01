import { Header } from './header'
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
      <span className="pointer-events-none fixed top-0 block h-[800px] w-full bg-[radial-gradient(103.72%_46.58%_at_50%_0%,rgba(5,5,5,0.045)_0%,rgba(0,0,0,0)_100%)] select-none dark:bg-[radial-gradient(103.72%_46.58%_at_50%_0%,rgba(255,255,255,0.09)_0%,rgba(255,255,255,0)_100%)]" />

      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-zinc-50/90 opacity-95 ring-1 ring-zinc-100 dark:bg-zinc-900/80 dark:ring-zinc-400/20" />
        </div>
      </div>

      <div className="flex min-h-screen w-full flex-col font-[family-name:var(--font-inter-tight)]">
        <HeaderFixed />
        <div className="relative mx-auto w-full max-w-screen-sm flex-1 px-4 pt-20">
          <Header />
          {children}
          <Footer />
        </div>
      </div>
    </>
  )
}
