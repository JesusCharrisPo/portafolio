"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { ExternalLink, MessageCircle, Zap, Globe, ShoppingCart, ChevronLeft, ChevronRight, X, ImageIcon } from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────

type MediaItem = {
  id: number
  title: string
  description: string
  images: string[]
  thumbnail: string
  liveUrl?: string
}

type Category = {
  id: string
  name: string
  short: string
  icon: any
  accent: string
  glow: string
  items: MediaItem[]
}

// ─── Data ─────────────────────────────────────────────────────────────

const categories: Category[] = [
  {
    id: "shopify",
    name: "Shopify",
    short: "Shopify",
    icon: ShoppingCart,
    accent: "#22d3ee",
    glow: "rgba(34,211,238,",
    items: [
      { id: 1, title: "Mac One | E-commerce Streetwear", description: "Tienda Shopify de alta conversión con integración de pagos contra entrega (COD), recuperación de carritos y diseño responsive adaptado a la estética de la marca.", thumbnail: "/mac1.jpg", images: ["/mac1.jpg","/mac2.jpg","/mac3.jpg"] },
      { id: 2, title: "Tienda Maringlow | Beauty & Skincare", description: "E-commerce de nicho belleza enfocado en la confianza del consumidor. Integra sistema de reseñas verificadas y pasarelas de pago locales para un checkout sin fricción.", thumbnail: "/mar1.jpg", images: ["/mar1.jpg","/mar2.jpg","/mar3.jpg"] },
      { id: 3, title: "Henry Rivera | Urban Shoes", description: "E-commerce de calzado urbano con identidad visual de alto impacto (High-Contrast). Experiencia de compra mobile-first optimizada para el mercado joven.", thumbnail: "/henr1.jpg", images: ["/henr1.jpg","/henr2.jpg","/henr3.jpg"] },
    ],
  },
  {
    id: "wordpress",
    name: "WordPress",
    short: "WP",
    icon: Globe,
    accent: "#a78bfa",
    glow: "rgba(167,139,250,",
    items: [
      { id: 1, title: "García & Asociados | Firma Legal", description: "Sitio WordPress corporativo diseñado para transmitir autoridad y generar leads. SEO local, formularios de alta conversión e integración de agendamiento.", thumbnail: "/abo1.jpg", images: ["/abo1.jpg","/abo2.jpg"] },
      { id: 2, title: "Agencia de Seguros | Blog SEO", description: "Sitio corporativo de alto rendimiento para agencia de seguros. Formularios de cotización especializados, blog de contenidos y estructura SEO para tráfico orgánico cualificado.", thumbnail: "/tru1.jpg", images: ["/tru1.jpg","/tru2.jpg"] },
      { id: 3, title: "SG Windows | Servicios Industriales", description: "Sitio web para empresa de vidrio y aluminio. Captación de clientes locales con botones de llamada directa, WhatsApp flotante y galería de proyectos.", thumbnail: "/sg1.jpg", images: ["/sg1.jpg","/sg2.jpg"] },
    ],
  },
  {
    id: "dropshipping",
    name: "Dropshipping",
    short: "Drop",
    icon: Zap,
    accent: "#f472b6",
    glow: "rgba(244,114,182,",
    items: [
      { id: 1, title: "Tienda Nicho", description: "Dropshipping automatizado con productos de alto margen y estrategia de tráfico pagado.", thumbnail: "", images: [] },
      { id: 2, title: "Multi-producto", description: "Catálogo extenso con segmentación por categoría y upsells automáticos.", thumbnail: "", images: [] },
      { id: 3, title: "One Product Store", description: "Tienda enfocada en un solo producto con storytelling y checkout optimizado para conversión máxima.", thumbnail: "", images: [] },
    ],
  },
]

const WHATSAPP_URL = "https://wa.me/573043819731?text=%F0%9F%9A%80%20%C2%A1Hola%20Jesus!%20Estoy%20interesado%20en%20Desarrollo%20Web"

// ─── Holographic Project Card ─────────────────────────────────────────

function HoloCard({ item, accent, glow, index, onClick }: {
  item: MediaItem; accent: string; glow: string; index: number; onClick: () => void
}) {
  const cardRef  = useRef<HTMLDivElement>(null)
  const [mouse, setMouse]     = useState({ x: 0.5, y: 0.5 })
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setVisible(true), index * 120); observer.disconnect() } },
      { threshold: 0.15 }
    )
    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [index])

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const r = cardRef.current.getBoundingClientRect()
    setMouse({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height })
  }, [])

  const rotX =  (mouse.y - 0.5) * -12
  const rotY =  (mouse.x - 0.5) *  16

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMouse({ x: 0.5, y: 0.5 }) }}
      onClick={onClick}
      className="cursor-pointer"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity .7s ease ${index * 120}ms, transform .7s cubic-bezier(.22,1,.36,1) ${index * 120}ms`,
        perspective: "800px",
      }}
    >
      <div
        className="relative rounded-2xl overflow-hidden border transition-all duration-200"
        style={{
          borderColor: hovered ? accent + "40" : "rgba(255,255,255,0.06)",
          background: hovered ? glow + "0.04)" : "rgba(255,255,255,0.02)",
          transform: hovered ? `rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(8px)` : "none",
          transition: "transform .15s ease-out, border-color .3s, background .3s",
          boxShadow: hovered ? `0 20px 60px ${glow}0.12), 0 0 0 1px ${glow}0.15)` : "none",
        }}
      >
        {/* Holographic sheen — follows mouse */}
        {hovered && (
          <div className="absolute inset-0 pointer-events-none z-10 rounded-2xl"
            style={{
              background: `radial-gradient(circle at ${mouse.x*100}% ${mouse.y*100}%, ${glow}0.12), transparent 60%)`,
              mixBlendMode: "screen",
            }} />
        )}

        {/* Image */}
        <div className="aspect-video relative overflow-hidden bg-[#070712]">
          {item.thumbnail ? (
            <>
              <img src={item.thumbnail} alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700"
                style={{ transform: hovered ? "scale(1.07)" : "scale(1)" }} />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
                style={{ opacity: hovered ? 1 : 0, background: "rgba(0,0,0,0.35)" }}>
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border backdrop-blur-sm"
                  style={{ borderColor: accent + "50", background: glow + "0.15)" }}>
                  <ExternalLink className="h-4 w-4" style={{ color: accent }} />
                  <span className="text-[11px] font-mono tracking-widest uppercase" style={{ color: accent }}>Ver proyecto</span>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl border flex items-center justify-center"
                  style={{ borderColor: accent + "25", background: glow + "0.08)" }}>
                  <ImageIcon className="h-5 w-5" style={{ color: accent + "80" }} />
                </div>
                <div className="absolute inset-0 rounded-xl border animate-ping opacity-20"
                  style={{ borderColor: accent }} />
              </div>
              <span className="text-[9px] font-mono tracking-widest uppercase" style={{ color: accent + "40" }}>Próximamente</span>
            </div>
          )}

          {/* Image count badge */}
          {item.images.length > 1 && (
            <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-lg text-[9px] font-mono backdrop-blur-sm border"
              style={{ borderColor: accent + "30", background: "rgba(0,0,0,0.6)", color: accent + "90" }}>
              {item.images.length} fotos
            </div>
          )}

          {/* HUD corners */}
          <div className="absolute top-2 left-2 w-3 h-3 opacity-60"
            style={{ borderTop: `1px solid ${accent}`, borderLeft: `1px solid ${accent}` }} />
          <div className="absolute top-2 right-2 w-3 h-3 opacity-60"
            style={{ borderTop: `1px solid ${accent}`, borderRight: `1px solid ${accent}` }} />
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <h3 className="text-xs sm:text-sm font-black text-white/85 leading-tight mb-2 transition-colors duration-300"
            style={{ fontFamily: "'Syne',sans-serif", color: hovered ? "rgba(255,255,255,0.95)" : undefined }}>
            {item.title}
          </h3>
          <p className="text-[11px] text-white/30 leading-relaxed line-clamp-2"
            style={{ fontFamily: "'DM Mono',monospace", fontWeight: 300 }}>
            {item.description}
          </p>

          {/* Bottom line */}
          <div className="mt-4 h-px w-full transition-all duration-500"
            style={{ background: hovered ? `linear-gradient(90deg, ${accent}60, transparent)` : "rgba(255,255,255,0.04)" }} />
        </div>

        {/* Scanlines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,.06) 2px,rgba(255,255,255,.06) 3px)" }} />
      </div>
    </div>
  )
}

// ─── Modal ────────────────────────────────────────────────────────────

function Modal({ item, accent, glow, onClose }: { item: MediaItem; accent: string; glow: string; onClose: () => void }) {
  const [idx, setIdx] = useState(0)
  const imgs = item.images.filter(Boolean)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") setIdx(i => (i+1) % imgs.length)
      if (e.key === "ArrowLeft")  setIdx(i => (i-1+imgs.length) % imgs.length)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [imgs.length, onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5"
      style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(12px)" }}
      onClick={onClose}>
      <div
        className="relative w-full max-w-4xl rounded-2xl overflow-hidden border"
        style={{ borderColor: accent + "25", background: "#08080f", animation: "modal-in .3s cubic-bezier(.22,1,.36,1)" }}
        onClick={e => e.stopPropagation()}>

        {/* Top glow line */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}60, transparent)` }} />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 p-4 sm:p-5 border-b border-white/[0.05]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accent }} />
              <span className="text-[9px] font-mono tracking-widest uppercase" style={{ color: accent + "80" }}>Proyecto</span>
            </div>
            <h3 className="text-sm sm:text-base font-black text-white leading-tight" style={{ fontFamily: "'Syne',sans-serif" }}>
              {item.title}
            </h3>
          </div>
          <button onClick={onClose}
            className="shrink-0 p-2 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition-all">
            <X className="h-4 w-4 text-white/50" />
          </button>
        </div>

        {/* Image area */}
        <div className="relative aspect-video bg-black overflow-hidden">
          {imgs.length > 0 ? (
            <>
              <img key={idx} src={imgs[idx]} alt={item.title}
                className="w-full h-full object-cover"
                style={{ animation: "img-in .25s ease" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

              {/* Nav arrows */}
              {imgs.length > 1 && (
                <>
                  <button onClick={() => setIdx(i => (i-1+imgs.length)%imgs.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-xl border border-white/10 bg-black/60 backdrop-blur-sm flex items-center justify-center hover:border-opacity-60 transition-all"
                    style={{ ['--hover-border' as any]: accent }}>
                    <ChevronLeft className="h-4 w-4 text-white/60" />
                  </button>
                  <button onClick={() => setIdx(i => (i+1)%imgs.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-xl border border-white/10 bg-black/60 backdrop-blur-sm flex items-center justify-center transition-all">
                    <ChevronRight className="h-4 w-4 text-white/60" />
                  </button>

                  {/* Counter */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full border border-white/10 bg-black/60 backdrop-blur-sm">
                    <span className="text-[10px] font-mono text-white/50">{idx+1} / {imgs.length}</span>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon className="h-10 w-10 text-white/10" />
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {imgs.length > 1 && (
          <div className="flex gap-2 px-4 py-3 overflow-x-auto">
            {imgs.map((img, i) => (
              <button key={i} onClick={() => setIdx(i)}
                className="shrink-0 w-16 h-11 sm:w-20 sm:h-14 rounded-lg overflow-hidden border-2 transition-all duration-200"
                style={{ borderColor: i === idx ? accent : "rgba(255,255,255,0.06)" }}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Description */}
        <div className="px-4 sm:px-5 pb-4 sm:pb-5">
          <p className="text-[11px] sm:text-xs text-white/35 leading-relaxed"
            style={{ fontFamily: "'DM Mono',monospace", fontWeight: 300 }}>
            {item.description}
          </p>
          {item.liveUrl && (
            <a href={item.liveUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-xl text-[10px] font-mono tracking-wider uppercase border transition-all hover:brightness-125"
              style={{ borderColor: accent + "35", background: glow + "0.08)", color: accent }}>
              <ExternalLink className="h-3.5 w-3.5" />Ver sitio en vivo
            </a>
          )}
        </div>

        {/* Corner HUD */}
        <div className="absolute bottom-0 right-0 w-4 h-4"
          style={{ borderBottom: `1px solid ${accent}25`, borderRight: `1px solid ${accent}25` }} />
      </div>
    </div>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────

export function GalleryDesarrolloWeb() {
  const [activeTab, setActiveTab]   = useState("shopify")
  const [selected, setSelected]     = useState<MediaItem | null>(null)
  const [headerVis, setHeaderVis]   = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)

  const cat = categories.find(c => c.id === activeTab)!

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setHeaderVis(true) }, { threshold: 0.2 })
    if (headerRef.current) observer.observe(headerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Mono:wght@300;400&display=swap');
        @keyframes modal-in { from{opacity:0;transform:scale(.95) translateY(16px)} to{opacity:1;transform:none} }
        @keyframes img-in   { from{opacity:0;transform:scale(1.03)} to{opacity:1;transform:none} }
      `}</style>

      <section id="galeria-web" className="relative py-20 sm:py-28 bg-[#03030a] overflow-hidden">

        {/* ── Background ── */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[160px]"
            style={{ background: cat.glow + "0.05)" }} />
          <div className="absolute bottom-0 right-0 w-[400px] h-[300px] rounded-full blur-[120px] bg-violet-800/[0.04]" />
          <div className="absolute inset-0 opacity-[0.02]"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px)", backgroundSize: "44px 44px" }} />
          {/* Scanlines */}
          <div className="absolute inset-0 opacity-[0.015]"
            style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,.5) 3px,rgba(0,0,0,.5) 4px)" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Header ── */}
          <div ref={headerRef} className="text-center mb-12 sm:mb-16"
            style={{
              opacity: headerVis ? 1 : 0,
              transform: headerVis ? "none" : "translateY(24px)",
              transition: "opacity .9s ease, transform .9s cubic-bezier(.22,1,.36,1)",
            }}>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/[0.06] mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[9px] font-mono text-cyan-400 tracking-[.18em] uppercase">Portafolio · Trabajos realizados</span>
            </div>

            <h2 className="font-black text-white leading-tight mb-4"
              style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2.2rem,6vw,4.5rem)" }}>
              Desarrollo
              <span className="ml-3" style={{ background: "linear-gradient(135deg,#22d3ee,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Web
              </span>
            </h2>

            <p className="text-white/30 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed"
              style={{ fontFamily: "'DM Mono',monospace", fontWeight: 300 }}>
              Tu visión es única, tu web también debería serlo. Transformo ideas en negocios digitales
              rentables — Shopify, WordPress, Dropshipping.
            </p>
          </div>

          {/* ── Tabs ── */}
          <div className="flex justify-center mb-10 sm:mb-12"
            style={{
              opacity: headerVis ? 1 : 0,
              transition: "opacity .9s ease .15s",
            }}>
            <div className="flex gap-1.5 p-1.5 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
              {categories.map(c => {
                const Icon = c.icon
                const active = activeTab === c.id
                return (
                  <button key={c.id} onClick={() => setActiveTab(c.id)}
                    className="relative flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl font-mono text-[10px] sm:text-xs tracking-wider uppercase transition-all duration-300"
                    style={{
                      color: active ? c.accent : "rgba(255,255,255,0.3)",
                      background: active ? c.glow + "0.1)" : "transparent",
                      border: active ? `1px solid ${c.accent}35` : "1px solid transparent",
                      boxShadow: active ? `0 0 20px ${c.glow}0.15)` : "none",
                    }}>
                    <Icon className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{c.name}</span>
                    <span className="sm:hidden">{c.short}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* ── Grid ── */}
          <div key={activeTab} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {cat.items.map((item, i) => (
              <HoloCard key={item.id} item={item} accent={cat.accent} glow={cat.glow}
                index={i} onClick={() => item.thumbnail && setSelected(item)} />
            ))}
          </div>

          {/* ── CTA ── */}
          <div className="mt-14 text-center"
            style={{ opacity: headerVis ? 1 : 0, transition: "opacity 1s ease .4s" }}>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-mono text-xs tracking-wider uppercase overflow-hidden hover:scale-105 transition-transform duration-300">
              <div className="absolute inset-0 rounded-xl border transition-all duration-300"
                style={{ borderColor: "rgba(34,211,238,0.3)", background: "rgba(34,211,238,0.06)" }} />
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "rgba(34,211,238,0.12)", borderColor: "rgba(34,211,238,0.5)" }} />
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400/60 rounded-tl-xl" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400/60 rounded-br-xl" />
              <MessageCircle className="relative z-10 h-4 w-4 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
              <span className="relative z-10 text-cyan-400/80 group-hover:text-cyan-300 transition-colors">Solicitar Propuesta</span>
            </a>
          </div>
        </div>

        {/* ── Modal ── */}
        {selected && (
          <Modal item={selected} accent={cat.accent} glow={cat.glow} onClose={() => setSelected(null)} />
        )}
      </section>
    </>
  )
}