import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    // img: (props) => (
    //   <Image
    //     sizes="100vw"
    //     style={{ width: '100%', height: 'auto' }}
    //     {...(props as ImageProps)}
    //   />
    // ),
    // pre: (props) => (
    //   <div className="overflow-x-auto rounded-lg bg-zinc-100 dark:bg-zinc-800 p-5">
    //     <pre {...props} />
    //   </div>
    // ),
    code: (props) => (
      <code
        className="mdx-code rounded-sm bg-zinc-100 px-1 dark:bg-zinc-800"
        {...props}
      />
    ),
    ...components,
    Cover: ({
      src,
      alt,
      caption,
    }: {
      src: string
      alt: string
      caption: string
    }) => {
      return (
        <figure>
          <img src={src} alt={alt} className="rounded-xl" />
          <figcaption className="text-center">{caption}</figcaption>
        </figure>
      )
    },
  }
}
