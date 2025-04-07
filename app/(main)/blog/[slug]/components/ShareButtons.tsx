'use client'

import { useState } from 'react'
import { Copy as CopyIcon, ExternalLink } from 'lucide-react'

interface ShareButtonsProps {
  title: string
}

export function ShareButtons({ title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  // 分享功能
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  const shareToTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title,
      )}&url=${encodeURIComponent(shareUrl)}`,
      '_blank',
    )
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mb-10 border-t border-zinc-200 py-4 dark:border-zinc-800">
      <h3 className="mb-3 text-lg font-medium">分享这篇文章</h3>
      <div className="flex space-x-4">
        <button
          onClick={shareToTwitter}
          className="rounded-full bg-zinc-100 p-2 transition hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
          aria-label="分享到 X"
        >
          <ExternalLink className="h-4 w-4" />
        </button>
        <button
          onClick={copyToClipboard}
          className="flex items-center rounded-full bg-zinc-100 p-2 transition hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
          aria-label="复制链接"
        >
          <CopyIcon className="h-4 w-4" />
          {copied && (
            <span className="ml-2 text-xs text-green-500">已复制</span>
          )}
        </button>
      </div>
    </div>
  )
}
