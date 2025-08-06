import { Container } from './container'
import Logo from './Logo'

export function Navbar({
  banner,
  ...props
}: {
  banner?: React.ReactNode
} & React.ComponentPropsWithoutRef<'header'>) {
  return (
    <header {...props}>
      {banner && (
        <div className="bg-gray-950 py-2">
          <Container>
            <div className="flex items-center justify-center">
              {banner}
            </div>
          </Container>
        </div>
      )}
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Logo />
          <nav className="flex items-center gap-8">
            <a
              href="/login"
              className="text-sm font-medium text-gray-950/75 data-hover:text-gray-950"
            >
              Anmelden
            </a>
            <a
              href="/register"
              className="text-sm font-medium text-gray-950/75 data-hover:text-gray-950"
            >
              Registrieren
            </a>
          </nav>
        </div>
      </Container>
    </header>
  )
} 