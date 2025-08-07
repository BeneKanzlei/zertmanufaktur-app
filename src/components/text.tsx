import { clsx } from 'clsx'

export function Heading({
  as: Component = 'h1',
  className,
  ...props
}: {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
} & React.ComponentPropsWithoutRef<'h1'>) {
  return (
    <Component
      className={clsx(
        'font-display text-4xl/[1.1] font-medium tracking-tight text-gray-950 sm:text-5xl/[1.1] md:text-6xl/[1.1]',
        className,
      )}
      {...props}
    />
  )
}

export function Subheading({
  as: Component = 'p',
  className,
  ...props
}: {
  as?: 'p' | 'span' | 'div'
} & React.ComponentPropsWithoutRef<'p'>) {
  return (
    <Component
      className={clsx(
        'text-sm font-semibold uppercase tracking-wider text-gray-950/75',
        className,
      )}
      {...props}
    />
  )
} 