import Image from 'next/image'
import Link, { type LinkProps } from 'next/link'
import { PropsWithChildren } from 'react'
import { cn } from '@/lib/utils'

import portraitImage from '@/assets/Cat.jpg'
import portraitAltImage from '@/assets/Cat1.jpg'

type ComponentProps<P = object> = PropsWithChildren<
  {
    className?: string
  } & P
>

function AvatarContainer({ className, ...props }: ComponentProps) {
  return (
    <div
      className={cn(
        className,
        'h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10',
      )}
      {...props}
    />
  )
}

type AvatarImageProps = ComponentProps &
  Omit<LinkProps, 'href'> & {
    large?: boolean
    href?: string
    alt?: boolean
  }
function AvatarImage({
  large = false,
  className,
  href,
  alt,
  ...props
}: AvatarImageProps) {
  return (
    <Link
      aria-label="主页"
      className={cn(className, 'pointer-events-auto')}
      href={href ?? '/'}
      {...props}
    >
      <Image
        src={alt ? portraitAltImage : portraitImage}
        alt=""
        sizes={large ? '4rem' : '2.25rem'}
        className={cn(
          'rounded-full bg-zinc-100 object-cover dark:bg-zinc-800',
          large ? 'h-16 w-16' : 'h-9 w-9',
        )}
        priority
      />
    </Link>
  )
}

export const Avatar = Object.assign(AvatarContainer, { Image: AvatarImage })
