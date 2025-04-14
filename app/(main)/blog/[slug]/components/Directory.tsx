'use client'

import './tocbot.css'
import './scrollbar.css'
import { Variants, motion, useScroll } from 'framer-motion'
import { useEffect } from 'react'
import tocbot from 'tocbot'

const listVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.08,
      delay: 0.255,
      type: 'spring',
      stiffness: 150,
      damping: 20,
    },
  },
}

export default function Directory() {
  const { scrollY } = useScroll()

  useEffect(() => {
    tocbot.init({
      tocSelector: '.js-toc',
      contentSelector: '.js-toc-content',
      headingSelector: 'h1, h2, h3, h4, h5, h6',
      linkClass: 'toc-link',
      activeListItemClass: 'is-active-li',
      listClass: 'toc-list',
      listItemClass: 'toc-list-item',
      collapseDepth: 6,
      scrollSmooth: true,
      scrollSmoothDuration: 420,
      scrollSmoothOffset: -10,
    })

    const handleScroll = () => {
      const activeLink = document.querySelector('.toc-link.is-active-link')
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      tocbot.destroy()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [scrollY])

  return (
    <div className="sticky top-24 h-[calc(100vh-6rem)] w-44 shrink-0 overflow-y-auto">
      <div className="w-44 break-words break-all">
        <h2 className="mb-4 text-lg font-semibold">目录</h2>
        <motion.ul
          className="js-toc group pointer-events-auto flex flex-col space-y-2 text-zinc-500"
          initial="hidden"
          animate="visible"
          variants={listVariants}
        />
      </div>
    </div>
  )
}
