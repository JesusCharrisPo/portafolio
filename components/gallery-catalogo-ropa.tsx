"use client"

import { useState, useRef, useEffect, useCallback, MouseEvent } from "react"
import {
  ImageIcon, Sparkles, Camera, Layers,
  ChevronLeft, ChevronRight, X, Zap,
  Activity, ArrowRight, AlertCircle,
} from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────

type MediaItem = {
  id: number | string
  title: string
  description: string
  type: "image" | "video"
  images: string[]
  thumbnail: string
}

type Category = {
  id: string
  name: string
  code: string
  icon: React.ReactNode
  description: string
  items: MediaItem[]
}

// ─── Data ─────────────────────────────────────────────────────────────

const categories: Category[] = [
  {
    id: "catalogo-producto",
    name: "Catálogo Producto",
    code: "01",
    icon: <Layers className="h-3.5 w-3.5" />,
    description: "CGI Generativo — visualización de producto 100% IA",
    items: [
      { id: "ia-mbloom",  title: "MBloom Body Butters", description: "Set virtual botánico con simulación de luz natural.",       type: "image", thumbnail: "/mbloom-ia-1.jpg",       images: ["/mbloom-ia-1.jpg", "/mbloom-ia-2.jpg"] },
      { id: "ia-petcare", title: "Pet Care Brush",      description: "Simulación de fluidos y partículas generativas.",          type: "image", thumbnail: "/petcare-ia.jpg",          images: ["/petcare-ia.jpg"] },
      { id: "ia-shoes",   title: "Sneakers Focus",      description: "Zapatos urbanos integrados en entornos sintéticos.",       type: "image", thumbnail: "/sneaker-ia.jpg",          images: ["/sneaker-ia.jpg", "/sneaker-ia-2.jpg"] },
    ],
  },
  {
    id: "modelos-ia",
    name: "Modelos IA",
    code: "02",
    icon: <Sparkles className="h-3.5 w-3.5" />,
    description: "Avatares hiperrealistas — fashion films sintéticos",
    items: [
      { id: "ia-avatar-1",      title: "Campaña Cosmética",    description: "Modelaje hiperrealista con texturas de piel fotorrealistas.", type: "image", thumbnail: "/modelo-ia-1.jpg",       images: ["/modelo-ia-1.jpg", "/modelo-ia-2.jpg"] },
      { id: "ia-macone-virtual",title: "Mac One | Virtual Try-On", description: "Prendas reales aplicadas sobre modelos IA.",           type: "image", thumbnail: "/macone-ia-modelo.jpg", images: ["/macone-ia-modelo.jpg"] },
    ],
  },
  {
    id: "editorial",
    name: "Editorial AI",
    code: "03",
    icon: <Camera className="h-3.5 w-3.5" />,
    description: "Dirección de arte — iluminación cinematográfica por IA",
    items: [
      { id: "ia-neon-concept", title: "Concepto Neón & Humo", description: "Iluminación dual retro-futurista generada por IA.", type: "image", thumbnail: "/neon-ia-1.jpg", images: ["/neon-ia-1.jpg", "/neon-ia-2.jpg"] },
    ],
  },
]

const WHATSAPP_NUMBER = "573019132001"
const WHATSAPP_MESSAGE = "🤖 ¡Hola Jesus! 👋 Vi tu portafolio de *Imágenes y CGI con Inteligencia Artificial*. Me interesa crear una campaña visual para mi marca sin necesidad de un estudio físico. ¿Podemos hablar? 🚀"

// ─── Noise texture SVG ────────────────────────────────────────────────

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`

// ─── Smart Image ──────────────────────────────────────────────────────

function SmartImage({ src, alt, className, style }: { src: string; alt: string; className?: string; style?: React.CSSProperties }) {
  const [err, setErr] = useState(false)
  const [loaded, setLoaded] = useState(false)
  if (err) return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`} style={{ background: "#020408", color: "rgba(0,255,225,0.15)", ...style }}>
      <AlertCircle className="h-8 w-8" />
      <span className="text-[9px] font-mono tracking-[0.3em]">NO_SIGNAL</span>
    </div>
  )
  return (
    <>
      {!loaded && <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #020408 0%, #060d18 100%)" }} />}
      <img src={src} alt={alt} loading="lazy" onLoad={() => setLoaded(true)} onError={() => setErr(true)}
        className={`${className} transition-opacity duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`} style={style} />
    </>
  )
}

// ─── Glitch transition overlay ────────────────────────────────────────

function GlitchOverlay({ active }: { active: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-100" style={{ opacity: active ? 1 : 0 }}>
      <div className="absolute inset-0" style={{ background: "#00ffe1", mixBlendMode: "exclusion", opacity: 0.15 }} />
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: NOISE_SVG, backgroundSize: "128px" }} />
      <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,225,0.08) 3px, rgba(0,255,225,0.08) 4px)" }} />
    </div>
  )
}

// ─── Corner brackets ─────────────────────────────────────────────────

function Brackets({ size = 16, color = "#00ffe1", opacity = 1 }: { size?: number; color?: string; opacity?: number }) {
  const b = { position: "absolute" as const, width: size, height: size, opacity }
  const c = color
  return (
    <>
      <span style={{ ...b, top: 0, left: 0,   borderTop:    `1.5px solid ${c}`, borderLeft:   `1.5px solid ${c}` }} />
      <span style={{ ...b, top: 0, right: 0,  borderTop:    `1.5px solid ${c}`, borderRight:  `1.5px solid ${c}` }} />
      <span style={{ ...b, bottom: 0, left: 0, borderBottom: `1.5px solid ${c}`, borderLeft:   `1.5px solid ${c}` }} />
      <span style={{ ...b, bottom: 0, right: 0,borderBottom: `1.5px solid ${c}`, borderRight:  `1.5px solid ${c}` }} />
    </>
  )
}

// ─── Main Gallery ─────────────────────────────────────────────────────

export function GalleryCatalogoRopa() {
  const [catIdx, setCatIdx]         = useState(0)
  const [itemIdx, setItemIdx]       = useState(0)
  const [imgIdx, setImgIdx]         = useState(0)
  const [glitching, setGlitching]   = useState(false)
  const [modalOpen, setModalOpen]   = useState(false)
  const [entering, setEntering]     = useState(false)
  const [mouse, setMouse]           = useState({ x: 50, y: 50 })
  const sectionRef = useRef<HTMLElement>(null)

  const cat  = categories[catIdx]
  const item = cat.items[itemIdx]
  const imgs = item.images.length > 0 ? item.images : [item.thumbnail]
  const src  = imgs[imgIdx] || ""

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  // Glitch transition helper
  const glitchTransition = useCallback((fn: () => void) => {
    setGlitching(true)
    setTimeout(() => { fn(); setGlitching(false) }, 120)
  }, [])

  const selectCat = (i: number) => {
    if (i === catIdx) return
    glitchTransition(() => { setCatIdx(i); setItemIdx(0); setImgIdx(0) })
  }

  const selectItem = (i: number) => {
    if (i === itemIdx) return
    glitchTransition(() => { setItemIdx(i); setImgIdx(0) })
  }

  const prevImg = () => {
    if (imgs.length <= 1) return
    glitchTransition(() => setImgIdx((p) => (p - 1 + imgs.length) % imgs.length))
  }

  const nextImg = () => {
    if (imgs.length <= 1) return
    glitchTransition(() => setImgIdx((p) => (p + 1) % imgs.length))
  }

  // Keyboard
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (modalOpen && e.key === "Escape") setModalOpen(false)
      if (!modalOpen && e.key === "ArrowRight") nextImg()
      if (!modalOpen && e.key === "ArrowLeft")  prevImg()
    }
    window.addEventListener("keydown", h)
    return () => window.removeEventListener("keydown", h)
  }, [modalOpen, imgs.length, itemIdx, catIdx])

  // Mouse parallax
  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return
    const r = sectionRef.current.getBoundingClientRect()
    setMouse({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 })
  }

  // Entrance animation
  useEffect(() => {
    setEntering(true)
    setTimeout(() => setEntering(false), 800)
  }, [])

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      id="catalogo-ropa"
      className="relative overflow-hidden"
      style={{ background: "#02030a", minHeight: "100vh" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Share+Tech+Mono&display=swap');

        @keyframes scanV {
          0%   { transform: translateY(-100%) }
          100% { transform: translateY(100vh) }
        }
        @keyframes pulse2 {
          0%,100% { opacity:1 } 50% { opacity:0.3 }
        }
        @keyframes slideInLeft {
          from { opacity:0; transform:translateX(-30px) }
          to   { opacity:1; transform:translateX(0) }
        }
        @keyframes slideInRight {
          from { opacity:0; transform:translateX(30px) }
          to   { opacity:1; transform:translateX(0) }
        }
        @keyframes slideInUp {
          from { opacity:0; transform:translateY(30px) }
          to   { opacity:1; transform:translateY(0) }
        }
        @keyframes fadeIn {
          from { opacity:0 } to { opacity:1 }
        }
        @keyframes scaleIn {
          from { opacity:0; transform:scale(1.04) }
          to   { opacity:1; transform:scale(1) }
        }
        @keyframes borderFlow {
          0%   { background-position: 0% 50%   }
          50%  { background-position: 100% 50% }
          100% { background-position: 0% 50%   }
        }
        @keyframes floatY {
          0%,100% { transform:translateY(0) }
          50%     { transform:translateY(-6px) }
        }
        .img-main {
          transition: transform 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.1s;
        }
        .hud-label {
          font-family: 'Share Tech Mono', monospace;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .title-font {
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 0.04em;
        }
      `}</style>

      {/* ── GRID BG ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(0,255,225,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,225,0.03) 1px,transparent 1px)", backgroundSize: "80px 80px" }} />

      {/* ── NOISE GRAIN ── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{ backgroundImage: NOISE_SVG, backgroundSize: "200px" }} />

      {/* ── AMBIENT GLOWS ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{ position:"absolute", top:"-20%", left:`${mouse.x * 0.3}%`, width:800, height:800, borderRadius:"50%", background:"radial-gradient(ellipse,rgba(0,200,180,0.07) 0%,transparent 65%)", transform:"translateX(-50%)", transition:"left 1.5s ease" }} />
        <div style={{ position:"absolute", bottom:"-20%", right:`${(100-mouse.x) * 0.3}%`, width:700, height:700, borderRadius:"50%", background:"radial-gradient(ellipse,rgba(180,0,255,0.07) 0%,transparent 65%)", transform:"translateX(50%)", transition:"right 1.5s ease" }} />
      </div>

      {/* ── SCAN BEAM ── */}
      <div className="absolute left-0 right-0 h-[1px] pointer-events-none z-20" style={{ background:"linear-gradient(90deg,transparent,rgba(0,255,225,0.3),transparent)", animation:"scanV 12s linear infinite", boxShadow:"0 0 20px rgba(0,255,225,0.2)" }} />

      {/* ── GLITCH OVERLAY ── */}
      <GlitchOverlay active={glitching || entering} />

      {/* ════════════════════════════════════════════════
          LAYOUT: 3 zones — left HUD | center stage | right panel
          ════════════════════════════════════════════════ */}
      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">

        {/* ── LEFT: CATEGORY SELECTOR ──────────────────── */}
        <aside
          className="flex-none flex flex-row lg:flex-col justify-start lg:justify-center gap-0 overflow-x-auto lg:overflow-x-visible"
          style={{ width:"auto", padding:"24px 20px", borderRight:"1px solid rgba(0,255,225,0.06)", animation:"slideInLeft 0.6s ease both" }}
        >
          {/* Top label (desktop) */}
          <div className="hidden lg:flex flex-col gap-1 mb-10">
            <span className="hud-label text-[8px] text-[#00ffe1]/30">SISTEMA</span>
            <span className="hud-label text-[8px] text-[#00ffe1]/30">VISUAL_AI</span>
            <div className="mt-2 h-px w-8" style={{ background:"rgba(0,255,225,0.3)" }} />
          </div>

          {categories.map((c, i) => {
            const active = i === catIdx
            return (
              <button key={c.id} onClick={() => selectCat(i)}
                className="relative flex flex-row lg:flex-col items-center lg:items-start gap-3 lg:gap-2 px-4 lg:px-0 py-3 lg:py-5 group transition-all duration-300"
                style={{ borderBottom: active ? "none" : "none", borderLeft: "none" }}
              >
                {/* Active bar */}
                <div className="hidden lg:block absolute left-[-20px] top-0 bottom-0 w-[2px] transition-opacity duration-300" style={{ background:"linear-gradient(to bottom,transparent,#00ffe1,transparent)", opacity: active ? 1 : 0, boxShadow:"0 0 8px rgba(0,255,225,0.8)" }} />

                {/* Number */}
                <span className="hud-label text-[10px] transition-colors duration-300" style={{ color: active ? "#00ffe1" : "rgba(255,255,255,0.15)" }}>
                  {c.code}
                </span>

                {/* Name — rotated on desktop */}
                <span
                  className="hud-label text-[9px] whitespace-nowrap transition-colors duration-300 lg:hidden"
                  style={{ color: active ? "#e0fff8" : "rgba(255,255,255,0.25)" }}
                >
                  {c.name}
                </span>

                {/* Vertical name (desktop) */}
                <span
                  className="hidden lg:block hud-label text-[9px] transition-colors duration-300"
                  style={{ color: active ? "rgba(224,255,248,0.9)" : "rgba(255,255,255,0.2)", writingMode:"vertical-rl", transform:"rotate(180deg)" }}
                >
                  {c.name}
                </span>

                {/* Active dot */}
                {active && <span className="hidden lg:block w-1 h-1 rounded-full bg-[#00ffe1] mt-2" style={{ boxShadow:"0 0 6px rgba(0,255,225,1)", animation:"pulse2 2s infinite" }} />}
              </button>
            )
          })}

          {/* Bottom status (desktop) */}
          <div className="hidden lg:flex flex-col gap-1 mt-auto">
            <div className="h-px w-8 mb-3" style={{ background:"rgba(0,255,225,0.2)" }} />
            <span className="hud-label text-[7px] text-[#00ffe1]/25">GEN·IA</span>
            <span className="hud-label text-[7px] text-[#00ffe1]/25">ACTIVO</span>
          </div>
        </aside>

        {/* ── CENTER: MAIN STAGE ───────────────────────── */}
        <main className="flex-1 relative flex flex-col">

          {/* Top HUD bar */}
          <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom:"1px solid rgba(0,255,225,0.05)", animation:"slideInUp 0.5s ease both 0.1s", opacity:0, animationFillMode:"forwards" }}>
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ffe1]" style={{ boxShadow:"0 0 8px rgba(0,255,225,1)", animation:"pulse2 2s infinite" }} />
              <span className="hud-label text-[8px] text-[#00ffe1]/50">{cat.description}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hud-label text-[8px] text-white/15">{String(itemIdx + 1).padStart(2,"0")} / {String(cat.items.length).padStart(2,"0")}</span>
              {imgs.length > 1 && <span className="hud-label text-[8px] text-[#b400ff]/40">{imgs.length} VAR</span>}
            </div>
          </div>

          {/* IMAGE STAGE — full bleed */}
          <div
            className="relative flex-1 cursor-pointer overflow-hidden"
            onClick={() => setModalOpen(true)}
            style={{ minHeight: "55vh" }}
          >
            {/* Main image */}
            <div className="absolute inset-0">
              <SmartImage
                src={src}
                alt={item.title}
                className="img-main w-full h-full object-cover"
                style={{
                  transform: `scale(1.03) translate(${(mouse.x - 50) * -0.02}%, ${(mouse.y - 50) * -0.02}%)`,
                  opacity: glitching ? 0.3 : 1,
                }}
              />
            </div>

            {/* Dark vignette */}
            <div className="absolute inset-0 pointer-events-none" style={{ background:"radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(2,3,10,0.7) 100%)" }} />
            <div className="absolute inset-0 pointer-events-none" style={{ background:"linear-gradient(to bottom, rgba(2,3,10,0.6) 0%, transparent 20%, transparent 60%, rgba(2,3,10,0.95) 100%)" }} />
            <div className="absolute inset-0 pointer-events-none" style={{ background:"linear-gradient(to right, rgba(2,3,10,0.5) 0%, transparent 30%, transparent 70%, rgba(2,3,10,0.5) 100%)" }} />

            {/* Scanlines on image */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,1) 3px,rgba(0,0,0,1) 4px)" }} />

            {/* CENTER: expand hint */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="relative px-5 py-3 hud-label text-[9px] text-[#00ffe1]/60 tracking-[0.3em] transition-opacity duration-500"
                style={{ border:"1px solid rgba(0,255,225,0.12)", background:"rgba(0,0,0,0.4)", backdropFilter:"blur(8px)", opacity: glitching ? 0 : 0.7 }}
              >
                <Brackets size={8} color="#00ffe1" opacity={0.4} />
                EXPANDIR IMAGEN
              </div>
            </div>

            {/* Nav arrows */}
            {imgs.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImg() }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center transition-all duration-200 group/btn"
                  style={{ border:"1px solid rgba(0,255,225,0.15)", background:"rgba(0,0,0,0.6)", backdropFilter:"blur(8px)" }}
                >
                  <ChevronLeft className="h-5 w-5 text-white/50 group-hover/btn:text-[#00ffe1] transition-colors" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImg() }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center transition-all duration-200 group/btn"
                  style={{ border:"1px solid rgba(0,255,225,0.15)", background:"rgba(0,0,0,0.6)", backdropFilter:"blur(8px)" }}
                >
                  <ChevronRight className="h-5 w-5 text-white/50 group-hover/btn:text-[#00ffe1] transition-colors" />
                </button>
              </>
            )}

            {/* Bottom-left: item info overlay */}
            <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 pointer-events-none" style={{ animation:"slideInUp 0.7s ease both 0.2s", opacity:0, animationFillMode:"forwards" }}>
              <div className="flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-3 w-3 text-[#00ffe1] animate-pulse" />
                    <span className="hud-label text-[8px] text-[#00ffe1]/60">GEN·IA // 100% GENERATIVO</span>
                  </div>
                  <h3
                    className="title-font text-white leading-none mb-1"
                    style={{ fontSize:"clamp(2.5rem,6vw,5rem)", textShadow:"0 0 60px rgba(0,0,0,0.9)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="hud-label text-[10px] text-white/40">{item.description}</p>
                </div>

                {/* Var dots */}
                {imgs.length > 1 && (
                  <div className="flex flex-col gap-1.5 items-center mb-1">
                    {imgs.map((_, i) => (
                      <button key={i} onClick={(e) => { e.stopPropagation(); glitchTransition(() => setImgIdx(i)) }}
                        className="pointer-events-auto w-1.5 rounded-full transition-all duration-300"
                        style={{ height: i === imgIdx ? 20 : 6, background: i === imgIdx ? "#00ffe1" : "rgba(255,255,255,0.2)", boxShadow: i === imgIdx ? "0 0 8px rgba(0,255,225,0.8)" : "none" }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Top-right: IA badge */}
            <div className="absolute top-4 right-4" style={{ animation:"slideInRight 0.5s ease both 0.15s", opacity:0, animationFillMode:"forwards" }}>
              <div className="flex items-center gap-2 px-3 py-1.5" style={{ border:"1px solid rgba(0,255,225,0.2)", background:"rgba(0,0,0,0.7)", backdropFilter:"blur(12px)" }}>
                <Zap className="h-3 w-3 text-[#00ffe1]" />
                <span className="hud-label text-[9px] text-[#00ffe1]">100% IA</span>
              </div>
            </div>
          </div>

          {/* Bottom HUD: item strip */}
          <div className="flex-none overflow-x-auto" style={{ borderTop:"1px solid rgba(0,255,225,0.06)", animation:"slideInUp 0.6s ease both 0.3s", opacity:0, animationFillMode:"forwards" }}>
            <div className="flex gap-0">
              {cat.items.map((it, i) => {
                const active = i === itemIdx
                const thumb  = it.thumbnail || it.images[0] || ""
                return (
                  <button
                    key={it.id}
                    onClick={() => selectItem(i)}
                    className="relative flex-shrink-0 group transition-all duration-300 overflow-hidden"
                    style={{ width: active ? 200 : 120, height: 72, borderRight:"1px solid rgba(0,255,225,0.06)" }}
                  >
                    {/* Thumbnail */}
                    {thumb && (
                      <img src={thumb} alt={it.title} className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
                        style={{ opacity: active ? 0.6 : 0.25, transform: active ? "scale(1.05)" : "scale(1)" }} />
                    )}
                    {/* Overlay */}
                    <div className="absolute inset-0" style={{ background: active ? "linear-gradient(to top,rgba(0,255,225,0.12),transparent)" : "rgba(2,3,10,0.5)" }} />
                    {/* Active top line */}
                    {active && <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background:"#00ffe1", boxShadow:"0 0 10px rgba(0,255,225,0.8)" }} />}
                    {/* Label */}
                    <div className="absolute bottom-0 left-0 right-0 px-3 pb-2">
                      <span className="hud-label text-[8px] block truncate transition-colors duration-300" style={{ color: active ? "#e0fff8" : "rgba(255,255,255,0.3)" }}>
                        {it.title}
                      </span>
                    </div>
                    {/* Number */}
                    <div className="absolute top-2 left-3">
                      <span className="hud-label text-[8px]" style={{ color: active ? "rgba(0,255,225,0.7)" : "rgba(255,255,255,0.15)" }}>
                        {String(i + 1).padStart(2,"0")}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </main>

        {/* ── RIGHT PANEL ──────────────────────────────── */}
        <aside
          className="hidden xl:flex flex-none flex-col justify-between"
          style={{ width: 220, borderLeft:"1px solid rgba(0,255,225,0.06)", padding:"32px 24px", animation:"slideInRight 0.6s ease both 0.1s" }}
        >
          {/* Top: category list mini */}
          <div className="flex flex-col gap-1">
            <span className="hud-label text-[7px] text-white/15 mb-4">MÓDULOS ACTIVOS</span>
            {categories.map((c, i) => (
              <div key={c.id} className="flex items-center gap-3 py-2.5 transition-opacity duration-300" style={{ opacity: i === catIdx ? 1 : 0.3, borderBottom:"1px solid rgba(255,255,255,0.03)" }}>
                <span style={{ color: i === catIdx ? "#00ffe1" : "rgba(255,255,255,0.3)" }}>{c.icon}</span>
                <span className="hud-label text-[8px] text-white/50">{c.name}</span>
                {i === catIdx && <span className="ml-auto w-1 h-1 rounded-full bg-[#00ffe1]" style={{ boxShadow:"0 0 6px rgba(0,255,225,1)" }} />}
              </div>
            ))}
          </div>

          {/* Middle: image info */}
          <div className="flex flex-col gap-4">
            <div className="h-px w-full" style={{ background:"linear-gradient(to right,rgba(0,255,225,0.2),transparent)" }} />
            <div className="relative p-4" style={{ border:"1px solid rgba(0,255,225,0.08)", background:"rgba(0,255,225,0.02)" }}>
              <Brackets size={8} color="#00ffe1" opacity={0.3} />
              <span className="hud-label text-[7px] text-[#00ffe1]/40 block mb-2">INFO RENDER</span>
              <span className="hud-label text-[8px] text-white/30 block leading-relaxed">{item.description}</span>
            </div>
            {/* Specs mini-grid */}
            <div className="grid grid-cols-2 gap-2">
              {[["RES","4K UHD"],["TIPO","CGI/IA"],["STEPS","50"],["CFG","7.5"]].map(([k,v]) => (
                <div key={k} className="p-2" style={{ border:"1px solid rgba(255,255,255,0.04)", background:"rgba(255,255,255,0.01)" }}>
                  <span className="hud-label text-[7px] text-white/20 block">{k}</span>
                  <span className="hud-label text-[8px] text-[#00ffe1]/60 block">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom: CTA */}
          <div className="flex flex-col gap-3">
            <div className="h-px w-full" style={{ background:"linear-gradient(to right,rgba(180,0,255,0.2),transparent)" }} />
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col gap-2 p-4 overflow-hidden transition-all duration-300"
              style={{ border:"1px solid rgba(0,255,225,0.2)", background:"rgba(0,255,225,0.03)" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(0,255,225,0.5)"; e.currentTarget.style.background="rgba(0,255,225,0.06)" }}
              onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(0,255,225,0.2)"; e.currentTarget.style.background="rgba(0,255,225,0.03)" }}
            >
              <Brackets size={8} color="#00ffe1" opacity={0.5} />
              {/* sweep */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" style={{ background:"linear-gradient(90deg,transparent,rgba(0,255,225,0.07),transparent)" }} />
              <div className="flex items-center justify-between">
                <Zap className="h-4 w-4 text-[#00ffe1]" />
                <ArrowRight className="h-3.5 w-3.5 text-[#00ffe1]/50 group-hover:text-[#00ffe1] group-hover:translate-x-1 transition-all duration-200" />
              </div>
              <div>
                <span className="hud-label text-[9px] text-white/80 block font-bold tracking-[0.15em]">CREAR CAMPAÑA</span>
                <span className="hud-label text-[8px] text-[#00ffe1]/50 block">CON IA GENERATIVA</span>
              </div>
            </a>

            <span className="hud-label text-[7px] text-white/10 text-center">NEURAL_CGI::v4.2</span>
          </div>
        </aside>
      </div>

      {/* Mobile CTA */}
      <div className="xl:hidden px-4 py-4" style={{ borderTop:"1px solid rgba(0,255,225,0.06)" }}>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
          className="group relative flex items-center justify-between px-5 py-4 overflow-hidden transition-all duration-300"
          style={{ border:"1px solid rgba(0,255,225,0.25)", background:"rgba(0,255,225,0.03)" }}
        >
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" style={{ background:"linear-gradient(90deg,transparent,rgba(0,255,225,0.06),transparent)" }} />
          <div className="flex items-center gap-3 relative z-10">
            <Zap className="h-4 w-4 text-[#00ffe1]" />
            <span className="hud-label text-[10px] text-white font-bold tracking-[0.2em]">CREAR MI CAMPAÑA IA</span>
          </div>
          <ArrowRight className="relative z-10 h-4 w-4 text-[#00ffe1]/60 group-hover:text-[#00ffe1] group-hover:translate-x-1 transition-all duration-200" />
        </a>
      </div>

      {/* ── FULLSCREEN MODAL ──────────────────────────── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background:"rgba(0,2,8,0.97)", backdropFilter:"blur(24px)", animation:"fadeIn 0.15s ease both" }}
          onClick={() => setModalOpen(false)}
        >
          <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage:"linear-gradient(rgba(0,255,225,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,225,0.5) 1px,transparent 1px)", backgroundSize:"60px 60px" }} />

          <div onClick={e => e.stopPropagation()} className="relative" style={{ maxWidth:"92vw", maxHeight:"90vh", animation:"scaleIn 0.2s cubic-bezier(0.16,1,0.3,1) both" }}>
            <Brackets size={20} color="#00ffe1" opacity={0.6} />
            <div className="absolute top-0 inset-x-0 h-px" style={{ background:"linear-gradient(90deg,transparent,#00ffe1,transparent)", boxShadow:"0 0 20px rgba(0,255,225,0.8)" }} />

            <img src={src} alt={item.title} className="block" style={{ maxWidth:"92vw", maxHeight:"85vh", objectFit:"contain" }} />

            {/* Controls */}
            <div className="absolute bottom-[-52px] left-0 right-0 flex items-center justify-between px-2">
              <span className="hud-label text-[9px] text-white/30">{item.title}</span>
              {imgs.length > 1 && (
                <div className="flex items-center gap-3">
                  <button onClick={prevImg} className="w-9 h-9 flex items-center justify-center transition-all duration-200" style={{ border:"1px solid rgba(0,255,225,0.15)", background:"rgba(0,0,0,0.7)", color:"rgba(255,255,255,0.5)" }} onMouseEnter={e=>{e.currentTarget.style.color="#00ffe1";e.currentTarget.style.borderColor="rgba(0,255,225,0.4)"}} onMouseLeave={e=>{e.currentTarget.style.color="rgba(255,255,255,0.5)";e.currentTarget.style.borderColor="rgba(0,255,225,0.15)"}}>
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="hud-label text-[9px] text-[#00ffe1]/50">{String(imgIdx+1).padStart(2,"0")}/{String(imgs.length).padStart(2,"0")}</span>
                  <button onClick={nextImg} className="w-9 h-9 flex items-center justify-center transition-all duration-200" style={{ border:"1px solid rgba(0,255,225,0.15)", background:"rgba(0,0,0,0.7)", color:"rgba(255,255,255,0.5)" }} onMouseEnter={e=>{e.currentTarget.style.color="#00ffe1";e.currentTarget.style.borderColor="rgba(0,255,225,0.4)"}} onMouseLeave={e=>{e.currentTarget.style.color="rgba(255,255,255,0.5)";e.currentTarget.style.borderColor="rgba(0,255,225,0.15)"}}>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
              <button onClick={() => setModalOpen(false)} className="flex items-center gap-1.5 px-3 py-1.5 hud-label text-[9px] transition-all duration-200" style={{ border:"1px solid rgba(255,255,255,0.07)", color:"rgba(255,255,255,0.35)" }} onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(0,255,225,0.3)";e.currentTarget.style.color="#00ffe1"}} onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.07)";e.currentTarget.style.color="rgba(255,255,255,0.35)"}}>
                <X className="h-3.5 w-3.5" /> ESC
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}