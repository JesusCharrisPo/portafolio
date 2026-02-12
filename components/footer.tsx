"use client"

import { Linkedin, Youtube, Terminal } from "lucide-react"

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#sobre-mi", label: "Sobre Mí" },
  { href: "#servicios", label: "Servicios" },
  { href: "#portafolio", label: "Portafolio" },
  { href: "#blog", label: "Blog" },
  { href: "#contacto", label: "Contacto" },
]

const socials = [
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  { href: "https://youtube.com", icon: Youtube, label: "YouTube" },
]

export function Footer() {
  return (
    <footer className="relative bg-[#050608] overflow-hidden">
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[200px] bg-cyan-600/[0.02] rounded-full blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <a href="#inicio" className="group flex items-center gap-2">
            <Terminal className="h-4 w-4 text-cyan-500/40 group-hover:text-cyan-400 transition-colors" />
            <span className="text-base sm:text-lg font-mono font-bold tracking-tight">
              <span className="text-white/70 group-hover:text-white/90 transition-colors">Jesus</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">Charris</span>
            </span>
          </a>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 sm:gap-x-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[10px] sm:text-xs font-mono text-white/25 hover:text-cyan-400/70 tracking-wider uppercase transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex gap-2.5">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-white/[0.06] bg-white/[0.02] flex items-center justify-center hover:border-cyan-500/20 hover:bg-cyan-500/[0.05] transition-all duration-300 group"
              >
                <social.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white/20 group-hover:text-cyan-400 transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-white/[0.04]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[10px] sm:text-xs font-mono text-white/15 tracking-wider">
              © {new Date().getFullYear()} Jesus Charris. Todos los derechos reservados.
            </p>
            <p className="text-[9px] sm:text-[10px] font-mono text-white/10 tracking-wider">
              Diseñado con <span className="text-cyan-500/30">♦</span> en Colombia
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}