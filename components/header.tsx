"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, MessageCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#sobre-mi", label: "Sobre Mi" },
  { href: "#servicios", label: "Servicios" },
  { href: "#galeria-web", label: "Desarrollo Web" },
  { href: "#galeria-audiovisual", label: "Audiovisual" },
  { href: "#catalogo-ropa", label: "Catálogo Ropa" },
  { href: "#portafolio", label: "Portafolio" },
  { href: "#contacto", label: "Contacto" },
]

const WHATSAPP_NUMBER = "573019132001"
const WHATSAPP_MESSAGE =
  "🚀 ¡Hola Jesus! 👋 Vi tu portafolio y me interesa una *consulta gratuita* para mi proyecto 💡 ¿Podemos agendar una llamada? 📞✨"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  // Detect scroll for header style change
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#07080d]/80 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ── Logo ── */}
          <Link href="/" className="relative group">
            <span className="text-lg sm:text-xl font-bold font-mono tracking-tight text-white/90">
              Jesus
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Charris
              </span>
            </span>
            {/* Underline glow on hover */}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-300" />
          </Link>

          {/* ── Desktop Navigation ── */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-3 py-2 text-xs font-mono tracking-wider uppercase text-white/40 hover:text-cyan-400 transition-colors duration-300 group"
              >
                {link.label}
                {/* Hover underline */}
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-px bg-cyan-500/50 group-hover:w-3/4 transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* ── Desktop CTA ── */}
          <div className="hidden lg:block">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 px-4 py-2 font-mono text-[11px] tracking-wider uppercase overflow-hidden"
            >
              <div className="absolute inset-0 rounded-lg border border-cyan-500/30 bg-cyan-500/[0.06] backdrop-blur-sm transition-all duration-300 group-hover:bg-cyan-500/[0.12] group-hover:border-cyan-400/50" />
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400/50 rounded-tl-lg" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-400/50 rounded-br-lg" />

              <MessageCircle className="relative z-10 h-3.5 w-3.5 text-cyan-400" />
              <span className="relative z-10 text-cyan-300 group-hover:text-cyan-200 transition-colors">
                Consulta
              </span>
            </a>
          </div>

          {/* ── Mobile Menu Button ── */}
          <button
            type="button"
            className="lg:hidden relative p-2 text-white/60 hover:text-cyan-400 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="absolute inset-0 rounded-lg border border-white/[0.06] bg-white/[0.02]" />
            {mobileMenuOpen ? (
              <X className="relative z-10 h-5 w-5" />
            ) : (
              <Menu className="relative z-10 h-5 w-5" />
            )}
          </button>
        </div>

        {/* ── Mobile Navigation ── */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 border-t border-white/[0.06]">
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-mono tracking-wide text-white/40 hover:text-cyan-400 hover:bg-white/[0.03] transition-all duration-300"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="h-px w-3 bg-cyan-500/30" />
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}

                  {/* Mobile CTA */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.05, duration: 0.3 }}
                    className="mt-3 pt-3 border-t border-white/[0.06]"
                  >
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex items-center justify-center gap-2 px-4 py-3 font-mono text-xs tracking-wider uppercase overflow-hidden"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="absolute inset-0 rounded-xl border border-cyan-500/30 bg-cyan-500/[0.06] backdrop-blur-sm transition-all duration-300 group-hover:bg-cyan-500/[0.12]" />
                      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-400/50 rounded-tl-xl" />
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-400/50 rounded-br-xl" />

                      <MessageCircle className="relative z-10 h-4 w-4 text-cyan-400" />
                      <span className="relative z-10 text-cyan-300">
                        Solicitar Consulta
                      </span>
                    </a>
                  </motion.div>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}