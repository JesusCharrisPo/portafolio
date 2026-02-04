import Link from "next/link"
import { Linkedin, Youtube } from "lucide-react"

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#sobre-mi", label: "Sobre Mi" },
  { href: "#servicios", label: "Servicios" },
  { href: "#portafolio", label: "Portafolio" },
  { href: "#blog", label: "Blog" },
  { href: "#contacto", label: "Contacto" },
]

export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-foreground">
            Jesus<span className="text-primary">Charris</span>
          </Link>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex gap-3">
            <a 
              href="#"
              className="w-10 h-10 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-primary/10 transition-all flex items-center justify-center group"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a 
              href="#"
              className="w-10 h-10 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-primary/10 transition-all flex items-center justify-center group"
              aria-label="YouTube"
            >
              <Youtube className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} Jesus Charris. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
