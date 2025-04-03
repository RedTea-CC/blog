'use client'

import { useState } from 'react'

// 分享图标组件
const TwitterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
)

const CopyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
)

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
          aria-label="分享到 Twitter"
        >
          <TwitterIcon />
        </button>
        <button
          onClick={copyToClipboard}
          className="flex items-center rounded-full bg-zinc-100 p-2 transition hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
          aria-label="复制链接"
        >
          <CopyIcon />
          {copied && (
            <span className="ml-2 text-xs text-green-500">已复制</span>
          )}
        </button>
      </div>
    </div>
  )
}
