"use client"

import { useState, useRef, useEffect } from "react"
import { ExternalLink, MessageCircle, Zap, Globe, ShoppingCart, ChevronLeft, ChevronRight, X, ImageIcon, ArrowRight } from "lucide-react"

// ─── Types & Data ─────────────────────────────────────────────────────

type Project = {
  id: number
  title: string
  short: string
  tag: string
  description: string
  images: string[]
}

type Category = {
  id: string
  name: string
  icon: any
  accent: string
  glow: string
  projects: Project[]
}

const CATS: Category[] = [
  {
    id: "shopify", name: "Shopify", icon: ShoppingCart,
    accent: "#22d3ee", glow: "rgba(34,211,238,",
    projects: [
      { id: 1, short: "Mac One", tag: "E-commerce · Streetwear", title: "Mac One | E-commerce Streetwear", description: "Tienda Shopify de alta conversión con integración COD, recuperación de carritos automática y diseño responsive adaptado a la estética urbana de la marca.", images: ["/mac1.jpg","/mac2.jpg","/mac3.jpg"] },
      { id: 2, short: "Maringlow", tag: "Beauty & Skincare · E-commerce", title: "Tienda Maringlow | Beauty & Skincare", description: "E-commerce de nicho belleza con sistema de reseñas verificadas y pasarelas de pago locales para checkout sin fricción.", images: ["/mar1.jpg","/mar2.jpg","/mar3.jpg"] },
      { id: 3, short: "Henry Rivera", tag: "Urban Shoes · Mobile-first", title: "Henry Rivera | Urban Shoes", description: "Tienda de calzado urbano con identidad visual high-contrast. Experiencia mobile-first optimizada para el mercado joven.", images: ["/henr1.jpg","/henr2.jpg","/henr3.jpg"] },
    ],
  },
  {
    id: "wordpress", name: "WordPress", icon: Globe,
    accent: "#a78bfa", glow: "rgba(167,139,250,",
    projects: [
      { id: 1, short: "García & Asoc.", tag: "Firma Legal · SEO Local", title: "García & Asociados | Firma Legal", description: "Sitio corporativo para transmitir autoridad y generar leads. SEO local, formularios de alta conversión e integración de agendamiento.", images: ["/abo1.jpg","/abo2.jpg"] },
      { id: 2, short: "Agencia Seguros", tag: "Seguros · Blog SEO", title: "Agencia de Seguros | Blog Corporativo", description: "Sitio de alto rendimiento con formularios de cotización especializados, blog de contenidos y estructura SEO para tráfico cualificado.", images: ["/tru1.jpg","/tru2.jpg"] },
      { id: 3, short: "SG Windows", tag: "Servicios Industriales · Local", title: "SG Windows | Vidrio y Aluminio", description: "Sitio web para captación de clientes locales — botones de llamada directa, WhatsApp flotante y galería de proyectos completados.", images: ["/sg1.jpg","/sg2.jpg"] },
    ],
  },
  {
    id: "dropshipping", name: "Dropshipping", icon: Zap,
    accent: "#f472b6", glow: "rgba(244,114,182,",
    projects: [
      { id: 1, short: "Tienda Nicho", tag: "Dropshipping · Automatizado", title: "Tienda Nicho Automatizada", description: "Dropshipping con productos de alto margen, estrategia de tráfico pagado y fulfillment automatizado.", images: [] },
      { id: 2, short: "Multi-producto", tag: "Catálogo · Upsells", title: "Tienda Multi-producto", description: "Catálogo extenso con segmentación por categoría, upsells automáticos y estrategia omnicanal.", images: [] },
      { id: 3, short: "One Product", tag: "One Product Store · CRO", title: "One Product Store", description: "Tienda enfocada en un solo producto con storytelling cinematográfico y checkout optimizado para máxima conversión.", images: [] },
    ],
  },
]

const WHATSAPP_URL = "https://wa.me/573043819731?text=%F0%9F%9A%80%20%C2%A1Hola%20Jesus!%20Estoy%20interesado%20en%20Desarrollo%20Web"

// ─── Modal ────────────────────────────────────────────────────────────

function Modal({ project, accent, glow, onClose }: {
  project: Project; accent: string; glow: string; onClose: () => void
}) {
  const [idx, setIdx] = useState(0)
  const imgs = project.images.filter(Boolean)

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight" && imgs.length > 1) setIdx(i => (i+1)%imgs.length)
      if (e.key === "ArrowLeft"  && imgs.length > 1) setIdx(i => (i-1+imgs.length)%imgs.length)
    }
    window.addEventListener("keydown", fn)
    return () => window.removeEventListener("keydown", fn)
  }, [imgs.length, onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(16px)" }}
      onClick={onClose}>
      <div className="relative w-full max-w-3xl rounded-2xl overflow-hidden"
        style={{ background: "#070710", border: `1px solid ${accent}25`, animation: "modal-in .3s cubic-bezier(.22,1,.36,1)" }}
        onClick={e => e.stopPropagation()}>

        {/* Top accent line */}
        <div className="h-px w-full" style={{ background: `linear-gradient(90deg,transparent,${accent}80,transparent)` }} />

        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-white/[0.05]">
          <div>
            <span className="text-[9px] font-mono tracking-widest uppercase block mb-1" style={{ color: accent + "70" }}>{project.tag}</span>
            <h3 className="text-sm sm:text-base font-black text-white" style={{ fontFamily:"'Syne',sans-serif" }}>{project.title}</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition-all ml-4 shrink-0">
            <X className="h-4 w-4 text-white/50" />
          </button>
        </div>

        {/* Image */}
        <div className="aspect-video relative overflow-hidden bg-black">
          {imgs.length > 0 ? (
            <>
              <img key={idx} src={imgs[idx]} alt={project.title}
                className="w-full h-full object-cover" style={{ animation: "img-in .25s ease" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              {imgs.length > 1 && (
                <>
                  <button onClick={() => setIdx(i => (i-1+imgs.length)%imgs.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-black/70 border border-white/10 flex items-center justify-center hover:border-white/30 transition-all">
                    <ChevronLeft className="h-5 w-5 text-white/60" />
                  </button>
                  <button onClick={() => setIdx(i => (i+1)%imgs.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-black/70 border border-white/10 flex items-center justify-center hover:border-white/30 transition-all">
                    <ChevronRight className="h-5 w-5 text-white/60" />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/70 border border-white/10">
                    <span className="text-[10px] font-mono text-white/50">{idx+1} / {imgs.length}</span>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-3">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl border flex items-center justify-center" style={{ borderColor: accent+"25", background: glow+"0.06)" }}>
                  <ImageIcon className="h-6 w-6" style={{ color: accent+"60" }} />
                </div>
                <div className="absolute inset-0 rounded-2xl border animate-ping opacity-15" style={{ borderColor: accent }} />
              </div>
              <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: accent+"40" }}>Próximamente</span>
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {imgs.length > 1 && (
          <div className="flex gap-2 px-5 pt-3">
            {imgs.map((img, i) => (
              <button key={i} onClick={() => setIdx(i)}
                className="w-16 h-11 rounded-lg overflow-hidden border-2 transition-all"
                style={{ borderColor: i===idx ? accent : "rgba(255,255,255,.06)" }}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Description */}
        <div className="p-5">
          <p className="text-xs text-white/35 leading-relaxed" style={{ fontFamily:"'DM Mono',monospace", fontWeight:300 }}>
            {project.description}
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────

export function GalleryDesarrolloWeb() {
  const [activeCat, setActiveCat]       = useState("shopify")
  const [activeProject, setActiveProject] = useState(0)
  const [modal, setModal]               = useState<Project | null>(null)
  const [vis, setVis]                   = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const cat = CATS.find(c => c.id === activeCat)!
  const featured = cat.projects[activeProject]

  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.1 })
    if (sectionRef.current) ob.observe(sectionRef.current)
    return () => ob.disconnect()
  }, [])

  // Reset active project when category changes
  useEffect(() => { setActiveProject(0) }, [activeCat])

  const r = (d: number): React.CSSProperties => ({
    opacity: vis ? 1 : 0,
    transform: vis ? "none" : "translateY(28px)",
    transition: `opacity .8s ease ${d}ms, transform .8s cubic-bezier(.22,1,.36,1) ${d}ms`,
  })

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Mono:wght@300;400&display=swap');
        @keyframes modal-in { from{opacity:0;transform:scale(.96) translateY(12px)} to{opacity:1;transform:none} }
        @keyframes img-in   { from{opacity:0;transform:scale(1.04)} to{opacity:1;transform:none} }
        @keyframes featured-in { from{opacity:0;transform:scale(.98)} to{opacity:1;transform:scale(1)} }
      `}</style>

      <section ref={sectionRef} id="galeria-web" className="relative py-20 sm:py-28 bg-[#03030a] overflow-hidden">

        {/* ── Ambient ── */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full blur-[180px] transition-all duration-1000"
            style={{ background: cat.glow + "0.04)" }} />
          <div className="absolute inset-0 opacity-[0.02]"
            style={{ backgroundImage:"linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px)", backgroundSize:"44px 44px" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Header ── */}
          <div style={r(0)} className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/[0.06] mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[9px] font-mono text-cyan-400 tracking-[.18em] uppercase">Portafolio · Trabajos realizados</span>
            </div>
            <h2 className="font-black text-white leading-tight mb-3"
              style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(2.5rem,7vw,5rem)" }}>
              Desarrollo{" "}
              <span style={{ background:"linear-gradient(135deg,#22d3ee,#a78bfa)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                Web
              </span>
            </h2>
            <p className="text-white/28 text-sm max-w-lg mx-auto leading-relaxed"
              style={{ fontFamily:"'DM Mono',monospace", fontWeight:300 }}>
              Transformo ideas en negocios digitales rentables — Shopify, WordPress, Dropshipping.
            </p>
          </div>

          {/* ── Category tabs ── */}
          <div style={r(100)} className="mb-10 sm:mb-14">
            {/* Tabs — scrollable en móvil, centrado en desktop */}
            <div className="flex justify-center overflow-x-auto pb-1 scrollbar-hide">
              <div className="flex gap-1.5 p-1.5 rounded-2xl border border-white/[0.05] bg-white/[0.02] shrink-0 mx-auto">
                {CATS.map(c => {
                  const Icon = c.icon
                  const active = activeCat === c.id
                  return (
                    <button key={c.id} onClick={() => setActiveCat(c.id)}
                      className="relative flex items-center gap-2 px-4 sm:px-7 py-2.5 rounded-xl font-mono text-[10px] sm:text-xs tracking-wider uppercase transition-all duration-300 whitespace-nowrap"
                      style={{
                        color: active ? c.accent : "rgba(255,255,255,.28)",
                        background: active ? c.glow+"0.1)" : "transparent",
                        border: active ? `1px solid ${c.accent}35` : "1px solid transparent",
                        boxShadow: active ? `0 0 24px ${c.glow}0.18)` : "none",
                      }}>
                      <Icon className="h-3.5 w-3.5 shrink-0" />
                      {c.name}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Category hints — incentiva a explorar las otras categorías */}
            <div className="flex justify-center gap-4 sm:gap-8 mt-5 flex-wrap">
              {CATS.filter(c => c.id !== activeCat).map(c => {
                const Icon = c.icon
                return (
                  <button key={c.id} onClick={() => setActiveCat(c.id)}
                    className="group flex items-center gap-2 transition-all duration-300 hover:scale-105">
                    <div className="w-6 h-6 rounded-lg border flex items-center justify-center transition-all duration-300 group-hover:brightness-125"
                      style={{ borderColor: c.accent+"25", background: c.glow+"0.07)" }}>
                      <Icon className="h-3 w-3" style={{ color: c.accent+"80" }} />
                    </div>
                    <span className="text-[10px] font-mono tracking-wider uppercase transition-colors"
                      style={{ color: "rgba(255,255,255,.2)" }}>
                      Ver {c.name}
                    </span>
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0"
                      style={{ color: c.accent }} />
                  </button>
                )
              })}
            </div>
          </div>

          {/* ── EDITORIAL LAYOUT ── */}
          <div style={r(200)} className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-stretch">

            {/* ── FEATURED (LEFT — big) ── */}
            <div className="relative lg:flex-[3] rounded-2xl overflow-hidden cursor-pointer group"
              style={{ height: "clamp(320px, 55vw, 580px)", animation: vis ? "featured-in .6s ease" : "none" }}
              onClick={() => featured.images.length > 0 && setModal(featured)}>

              {/* Image */}
              {featured.images[0] ? (
                <img key={featured.id} src={featured.images[0]} alt={featured.title}
                  className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105"
                  style={{ objectFit: "cover", objectPosition: "center 20%", animation: "featured-in .5s ease" }} />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center" style={{ background: cat.glow+"0.06)" }}>
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 rounded-2xl border mx-auto flex items-center justify-center" style={{ borderColor: cat.accent+"30" }}>
                      <ImageIcon className="h-7 w-7" style={{ color: cat.accent+"50" }} />
                    </div>
                    <p className="text-[10px] font-mono tracking-widest uppercase" style={{ color: cat.accent+"40" }}>Próximamente</p>
                  </div>
                </div>
              )}

              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />

              {/* Hover overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: cat.glow+"0.08)" }} />

              {/* Border */}
              <div className="absolute inset-0 rounded-2xl border transition-all duration-300"
                style={{ borderColor: `${cat.accent}20` }} />

              {/* HUD corners */}
              <div className="absolute top-4 left-4 w-4 h-4 opacity-60 transition-opacity group-hover:opacity-100"
                style={{ borderTop:`1.5px solid ${cat.accent}`, borderLeft:`1.5px solid ${cat.accent}` }} />
              <div className="absolute top-4 right-4 w-4 h-4 opacity-60 transition-opacity group-hover:opacity-100"
                style={{ borderTop:`1.5px solid ${cat.accent}`, borderRight:`1.5px solid ${cat.accent}` }} />

              {/* Category badge */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border backdrop-blur-sm"
                  style={{ borderColor: cat.accent+"30", background: "rgba(0,0,0,0.5)" }}>
                  <span className="w-1 h-1 rounded-full animate-pulse" style={{ background: cat.accent }} />
                  <span className="text-[8px] font-mono tracking-widest uppercase" style={{ color: cat.accent }}>Destacado</span>
                </div>
              </div>

              {/* Content bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                <span className="text-[9px] font-mono tracking-widest uppercase block mb-2" style={{ color: cat.accent+"80" }}>
                  {featured.tag}
                </span>
                <h3 className="font-black text-white text-lg sm:text-2xl leading-tight mb-2"
                  style={{ fontFamily:"'Syne',sans-serif" }}>
                  {featured.title}
                </h3>
                <p className="text-white/40 text-xs sm:text-sm leading-relaxed mb-4 max-w-md line-clamp-2"
                  style={{ fontFamily:"'DM Mono',monospace", fontWeight:300 }}>
                  {featured.description}
                </p>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border backdrop-blur-sm text-[10px] font-mono tracking-wider uppercase"
                    style={{ borderColor: cat.accent+"40", background: cat.glow+"0.15)", color: cat.accent }}>
                    <ExternalLink className="h-3 w-3" />Ver proyecto
                  </div>
                  {featured.images.length > 1 && (
                    <span className="text-[9px] font-mono text-white/30">{featured.images.length} fotos</span>
                  )}
                </div>
              </div>
            </div>

            {/* ── PROJECT LIST (RIGHT) ── */}
            <div className="lg:flex-[1.4] flex flex-col gap-3">
              {cat.projects.map((proj, i) => {
                const isActive = i === activeProject
                return (
                  <div key={proj.id}
                    className="group relative flex gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 border"
                    style={{
                      borderColor: isActive ? cat.accent+"30" : "rgba(255,255,255,.04)",
                      background: isActive ? cat.glow+"0.07)" : "rgba(255,255,255,.015)",
                      boxShadow: isActive ? `0 0 30px ${cat.glow}0.1)` : "none",
                    }}
                    onClick={() => setActiveProject(i)}>

                    {/* Thumbnail */}
                    <div className="shrink-0 w-20 h-16 sm:w-24 sm:h-18 rounded-xl overflow-hidden relative"
                      style={{ background: cat.glow+"0.08)" }}>
                      {proj.images[0] ? (
                        <img src={proj.images[0]} alt={proj.short}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="h-5 w-5" style={{ color: cat.accent+"40" }} />
                        </div>
                      )}
                      {isActive && (
                        <div className="absolute inset-0 rounded-xl border-2" style={{ borderColor: cat.accent+"60" }} />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <span className="text-[8px] font-mono tracking-widest uppercase block mb-1"
                        style={{ color: isActive ? cat.accent : cat.accent+"50" }}>
                        {proj.tag.split("·")[0].trim()}
                      </span>
                      <h4 className="font-black text-xs sm:text-sm leading-tight transition-colors"
                        style={{ fontFamily:"'Syne',sans-serif", color: isActive ? "rgba(255,255,255,.95)" : "rgba(255,255,255,.5)" }}>
                        {proj.short}
                      </h4>
                      <p className="text-[10px] text-white/25 mt-1 line-clamp-1"
                        style={{ fontFamily:"'DM Mono',monospace", fontWeight:300 }}>
                        {proj.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="shrink-0 flex items-center">
                      <ArrowRight className="h-4 w-4 transition-all duration-300"
                        style={{ color: isActive ? cat.accent : "rgba(255,255,255,.12)", transform: isActive ? "translateX(2px)" : "none" }} />
                    </div>

                    {/* Active left bar */}
                    {isActive && (
                      <div className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full"
                        style={{ background: cat.accent }} />
                    )}
                  </div>
                )
              })}

              {/* Open modal button */}
              {featured.images.length > 0 && (
                <button onClick={() => setModal(featured)}
                  className="w-full mt-1 py-3 rounded-2xl border font-mono text-[10px] tracking-widest uppercase transition-all duration-300 hover:brightness-125"
                  style={{ borderColor: cat.accent+"25", background: cat.glow+"0.05)", color: cat.accent+"80" }}>
                  Ver galería completa →
                </button>
              )}
            </div>
          </div>

          {/* ── CTA ── */}
          <div style={r(400)} className="mt-14 sm:mt-16 text-center">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-mono text-xs tracking-wider uppercase overflow-hidden hover:scale-105 transition-transform duration-300">
              <div className="absolute inset-0 rounded-2xl border transition-all duration-300 group-hover:border-cyan-400/50"
                style={{ borderColor:"rgba(34,211,238,.25)", background:"rgba(34,211,238,.05)" }} />
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background:"rgba(34,211,238,.1)" }} />
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400/50 rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400/50 rounded-br-2xl" />
              <MessageCircle className="relative z-10 h-4 w-4 text-cyan-400" />
              <span className="relative z-10 text-cyan-400/80 group-hover:text-cyan-300 transition-colors">Solicitar Propuesta</span>
            </a>
          </div>
        </div>

        {/* Modal */}
        {modal && <Modal project={modal} accent={cat.accent} glow={cat.glow} onClose={() => setModal(null)} />}
      </section>
    </>
  )
}