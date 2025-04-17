type Project = {
  name: string
  description: string
  link: string
  video: string
  id: string
}

type WorkExperience = {
  company: string
  title: string
  start: string
  end: string
  link: string
  id: string
}

type BlogPost = {
  title: string
  description: string
  link: string
  uid: string
}

type SocialLink = {
  label: string
  link: string
}

export const PROJECTS: Project[] = [
  {
    name: 'demo_experimental',
    description:
      '手动实现JavaScript数组的原生方法；算法练习；数据结构练习；常用工具函数的实现；',
    link: 'https://github.com/RedTea-CC/demo_experimental',
    video:
      'https://gitee.com/redtea25/note-img/raw/master/img/202504171648409.png',
    id: 'project1',
  },
  {
    name: 'nextjs-dashboard',
    description: 'nextjs',
    link: 'https://nextjs-dashboard-nine-peach-45.vercel.app/',
    video:
      'https://gitee.com/redtea25/note-img/raw/master/img/202504171650076.png',
    id: 'project2',
  },
  {
    name: 'cocos-demo',
    description: 'cocos2.4',
    link: 'https://github.com/RedTea-CC/cocos-demo',
    video:
      'https://gitee.com/redtea25/note-img/raw/master/img/202504171647428.png',
    id: 'project3',
  },
  {
    name: 'note-img',
    description: '笔记的图床仓库',
    link: 'https://gitee.com/redtea25/note-img',
    video:
      'https://gitee.com/redtea25/note-img/raw/master/img/202504171623132.png',
    id: 'project4',
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: "XI'AN CY",
    title: '西安诚优网络科技有限责任公司',
    start: '2023',
    end: 'Present',
    link: '/',
    id: 'work1',
  },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'Exploring the Intersection of Design, AI, and Design Engineering',
    description: 'How AI is changing the way we design',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-1',
  },
  {
    title: 'diary-2025-W12',
    description: 'Demo',
    link: '/blog/diary-2025-W12',
    uid: 'blog-4',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Github',
    link: 'https://github.com/RedTea-CC',
  },
  {
    label: 'Gitee',
    link: 'https://gitee.com/redtea25',
  },
  // {
  //   label: 'Twitter',
  //   link: 'https://twitter.com/ibelick',
  // },
  // {
  //   label: 'LinkedIn',
  //   link: 'https://www.linkedin.com/in/ibelick',
  // },
  // {
  //   label: 'Instagram',
  //   link: 'https://www.instagram.com/ibelick',
  // },
]

export const EMAIL = 'redtea25@qq.com'
