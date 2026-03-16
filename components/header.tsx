"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, X, MessageCircle, Sparkles } from "lucide-react"

const NAV = [
  { href: "#inicio",             label: "Inicio"        },
  { href: "#servicios",          label: "Servicios"     },
  { href: "#galeria-web",        label: "Web"           },
  { href: "#galeria-audiovisual",label: "Audiovisual"   },
  { href: "#catalogo-ropa",      label: "Catálogo"      },
  { href: "#portafolio",         label: "Portafolio"    },
  { href: "#blog",               label: "Blog"          },
  { href: "#contacto",           label: "Contacto"      },
]

const WHATSAPP_URL = "https://wa.me/573043819731?text=%F0%9F%9A%80%20%C2%A1Hola%20Jesus!%20Vi%20tu%20portafolio%20y%20me%20interesa%20una%20consulta%20gratuita%20%F0%9F%92%A1"

export function Header() {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive]   = useState("")
  const [mouseX, setMouseX]   = useState(0)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Track mouse X for logo sheen
  const onMouseMove = (e: React.MouseEvent) => {
    if (!headerRef.current) return
    const r = headerRef.current.getBoundingClientRect()
    setMouseX((e.clientX - r.left) / r.width)
  }

  // Close mobile menu on resize
  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 1024) setOpen(false) }
    window.addEventListener("resize", fn)
    return () => window.removeEventListener("resize", fn)
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:wght@400&display=swap');
        @keyframes nav-in  { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:none} }
        @keyframes mob-in  { from{opacity:0;transform:translateX(-12px)} to{opacity:1;transform:none} }
        @keyframes slide-down { from{opacity:0;transform:translateY(-100%)} to{opacity:1;transform:none} }
        .nav-link-line::after {
          content:''; position:absolute; bottom:0; left:50%; transform:translateX(-50%);
          width:0; height:1px; background:linear-gradient(90deg,#a78bfa,#22d3ee);
          transition:width .3s ease;
        }
        .nav-link-line:hover::after { width:70%; }
        .nav-link-line.nav-active::after { width:70%; }
      `}</style>

      <header
        ref={headerRef}
        onMouseMove={onMouseMove}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(3,3,10,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.4)" : "none",
        }}
      >
        {/* Top accent line — only when scrolled */}
        {scrolled && (
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: `linear-gradient(90deg,transparent,rgba(167,139,250,${0.3 + mouseX*0.4}),rgba(34,211,238,${0.2 + (1-mouseX)*0.3}),transparent)` }} />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* ── Logo ── */}
            <Link href="/" className="relative group shrink-0"
              style={{ animation: "nav-in .6s ease both" }}>
              <span className="text-lg font-black tracking-tight"
                style={{ fontFamily:"'Syne',sans-serif" }}>
                <span className="text-white/90 group-hover:text-white transition-colors duration-300">Jesus</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">
                  Charris
                </span>
              </span>
              {/* Underline */}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-400"
                style={{ background: "linear-gradient(90deg,#a78bfa,#22d3ee)" }} />
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {NAV.map((link, i) => (
                <Link key={link.href} href={link.href}
                  onClick={() => setActive(link.href)}
                  className={`nav-link-line relative px-3 py-2 text-[10px] font-mono tracking-widest uppercase transition-colors duration-300 hover:text-white/80 ${active === link.href ? "nav-active text-white/70" : "text-white/32"}`}
                  style={{ animation: `nav-in .5s ease ${i*40}ms both` }}>
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* ── Desktop CTA ── */}
            <div className="hidden lg:flex items-center gap-3"
              style={{ animation: "nav-in .5s ease .4s both" }}>

              {/* Status dot */}
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[9px] font-mono text-emerald-400/70 tracking-widest uppercase hidden xl:block">Online</span>
              </div>

              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-[10px] tracking-wider uppercase overflow-hidden hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0 rounded-xl transition-all duration-300"
                  style={{ background:"rgba(167,139,250,0.08)", border:"1px solid rgba(167,139,250,0.25)" }} />
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background:"rgba(167,139,250,0.16)" }} />
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-violet-400/50 rounded-tl-xl" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-400/50 rounded-br-xl" />
                <Sparkles className="relative z-10 h-3.5 w-3.5 text-violet-400 group-hover:text-violet-300 transition-colors" />
                <span className="relative z-10 text-violet-300 group-hover:text-violet-200 transition-colors">Consulta</span>
              </a>
            </div>

            {/* ── Mobile button ── */}
            <button type="button" onClick={() => setOpen(!open)}
              className="lg:hidden relative p-2.5 rounded-xl border border-white/[0.07] bg-white/[0.03] text-white/50 hover:text-white/80 hover:border-violet-500/30 transition-all duration-300"
              aria-label="Menu">
              {open
                ? <X className="h-5 w-5" />
                : <Menu className="h-5 w-5" />
              }
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <div
          className="lg:hidden overflow-hidden transition-all duration-400"
          style={{
            maxHeight: open ? "600px" : "0px",
            opacity: open ? 1 : 0,
            transition: "max-height .4s cubic-bezier(.22,1,.36,1), opacity .3s ease",
          }}>
          <div className="border-t border-white/[0.05] mx-4 pb-5 pt-4"
            style={{ background: "rgba(3,3,10,0.95)" }}>

            {/* Nav links */}
            <nav className="flex flex-col gap-0.5 mb-4">
              {NAV.map((link, i) => (
                <Link key={link.href} href={link.href}
                  onClick={() => { setOpen(false); setActive(link.href) }}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-mono tracking-wide text-white/38 hover:text-white/80 hover:bg-white/[0.04] transition-all duration-200"
                  style={{
                    animation: open ? `mob-in .4s ease ${i*50}ms both` : "none",
                  }}>
                  <span className="w-3 h-px shrink-0" style={{ background: "linear-gradient(90deg,#a78bfa,#22d3ee)" }} />
                  <span>{link.label}</span>
                  <span className="ml-auto text-[8px] font-mono text-white/15 tracking-widest">
                    {String(i+1).padStart(2,"0")}
                  </span>
                </Link>
              ))}
            </nav>

            {/* Divider */}
            <div className="h-px mb-4" style={{ background: "linear-gradient(90deg,transparent,rgba(167,139,250,.2),transparent)" }} />

            {/* Mobile CTA */}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="group relative flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-mono text-xs tracking-wider uppercase overflow-hidden"
              style={{ animation: open ? "mob-in .4s ease .4s both" : "none" }}>
              <div className="absolute inset-0 rounded-xl"
                style={{ background:"rgba(167,139,250,0.08)", border:"1px solid rgba(167,139,250,0.25)" }} />
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-violet-400/50 rounded-tl-xl" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400/60 rounded-br-xl" />
              <MessageCircle className="relative z-10 h-4 w-4 text-violet-400" />
              <span className="relative z-10 text-violet-300">Solicitar Consulta Gratuita</span>
            </a>

            {/* Status + info */}
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[9px] font-mono text-emerald-400/60 tracking-widest uppercase">Disponible</span>
              </div>
              <span className="text-white/10 text-xs">·</span>
              <span className="text-[9px] font-mono text-white/20 tracking-wide">Respuesta &lt; 24h</span>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}