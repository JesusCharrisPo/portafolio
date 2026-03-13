"use client"

import { useState, useRef, useEffect, useCallback, MouseEvent } from "react"
import {
  Sparkles, Camera, Layers, ChevronLeft, ChevronRight,
  X, Zap, Activity, ArrowUpRight, AlertCircle, Eye,
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
    id: "catalogo-producto", name: "Catálogo Producto", code: "01",
    icon: <Layers className="h-4 w-4" />,
    description: "CGI Generativo — visualización de producto 100% IA",
    items: [
      { id: "ia-mbloom",  title: "MBloom Body Butters", description: "Set virtual botánico con simulación de luz natural.",  type: "image", thumbnail: "/mbloom-ia-1.jpg",  images: ["/mbloom-ia-1.jpg", "/mbloom-ia-2.jpg"] },
      { id: "ia-petcare", title: "Pet Care Brush",      description: "Simulación de fluidos y partículas generativas.",     type: "image", thumbnail: "/petcare-ia.jpg",   images: ["/petcare-ia.jpg"] },
      { id: "ia-shoes",   title: "Sneakers Focus",      description: "Zapatos urbanos en entornos sintéticos.",             type: "image", thumbnail: "/sneaker-ia.jpg",   images: ["/sneaker-ia.jpg", "/sneaker-ia-2.jpg"] },
    ],
  },
  {
    id: "modelos-ia", name: "Modelos IA", code: "02",
    icon: <Sparkles className="h-4 w-4" />,
    description: "Avatares hiperrealistas — fashion films sintéticos",
    items: [
      { id: "ia-avatar-1",       title: "Campaña Cosmética",      description: "Modelaje hiperrealista con texturas fotorrealistas.", type: "image", thumbnail: "/modelo-ia-1.jpg",       images: ["/modelo-ia-1.jpg", "/modelo-ia-2.jpg"] },
      { id: "ia-macone-virtual", title: "Mac One | Virtual Try-On", description: "Prendas reales sobre modelos generados por IA.",   type: "image", thumbnail: "/macone-ia-modelo.jpg", images: ["/macone-ia-modelo.jpg"] },
    ],
  },
  {
    id: "editorial", name: "Editorial AI", code: "03",
    icon: <Camera className="h-4 w-4" />,
    description: "Dirección de arte — iluminación cinematográfica por IA",
    items: [
      { id: "ia-neon-concept", title: "Concepto Neón & Humo", description: "Iluminación dual retro-futurista generada por IA.", type: "image", thumbnail: "/neon-ia-1.jpg", images: ["/neon-ia-1.jpg", "/neon-ia-2.jpg"] },
    ],
  },
]

const WA_NUMBER  = "573019132001"
const WA_MESSAGE = "🤖 ¡Hola Jesus! Vi tu portafolio de *CGI con IA*. Me interesa crear una campaña visual para mi marca. ¿Podemos hablar? 🚀"

// ─── Helpers ──────────────────────────────────────────────────────────

function useGlitch() {
  const [active, setActive] = useState(false)
  const trigger = useCallback((fn: () => void) => {
    setActive(true)
    setTimeout(() => { fn(); setActive(false) }, 110)
  }, [])
  return { active, trigger }
}

// ─── Atoms ────────────────────────────────────────────────────────────

function Pill({ children, color = "#00ffe1" }: { children: React.ReactNode; color?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-mono tracking-[0.2em] uppercase"
      style={{ border: `1px solid ${color}30`, background: `${color}08`, color }}>
      {children}
    </span>
  )
}

function LiveDot({ color = "#00ffe1" }: { color?: string }) {
  return <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 6px ${color}`, animation: "pulse2 2s infinite" }} />
}

function SmartImage({ src, alt, className, style }: { src: string; alt: string; className?: string; style?: React.CSSProperties }) {
  const [err, setErr]       = useState(false)
  const [loaded, setLoaded] = useState(false)
  if (err) return (
    <div className={`flex flex-col items-center justify-center gap-2 ${className}`} style={{ background: "#020408", color: "rgba(0,255,225,0.15)", ...style }}>
      <AlertCircle className="h-6 w-6" />
      <span className="text-[9px] font-mono tracking-widest">SIN SEÑAL</span>
    </div>
  )
  return (
    <div className="relative w-full h-full">
      {!loaded && <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#020408,#060d18)", animation: "shimmer 1.8s infinite" }} />}
      <img src={src} alt={alt} loading="lazy"
        onLoad={() => setLoaded(true)} onError={() => setErr(true)}
        className={`${className} transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
        style={style} />
    </div>
  )
}

// ─── Category Tab Bar ─────────────────────────────────────────────────
// Horizontal, always visible, clearly labeled

function CategoryTabs({ active, onChange }: { active: string; onChange: (id: string) => void }) {
  return (
    <div className="flex items-stretch border-b" style={{ borderColor: "rgba(0,255,225,0.08)" }}>
      {categories.map((cat) => {
        const isActive = cat.id === active
        return (
          <button key={cat.id} onClick={() => onChange(cat.id)}
            className="relative flex items-center gap-2.5 px-6 py-4 transition-all duration-250 group"
            style={{
              color:      isActive ? "#e0fff8" : "rgba(255,255,255,0.35)",
              background: isActive ? "rgba(0,255,225,0.05)" : "transparent",
              borderBottom: isActive ? "2px solid #00ffe1" : "2px solid transparent",
              marginBottom: -1,
            }}
          >
            {/* sweep on hover */}
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ background: "linear-gradient(to top, rgba(0,255,225,0.04), transparent)" }} />

            <span style={{ color: isActive ? "#00ffe1" : "rgba(255,255,255,0.25)" }} className="transition-colors duration-200 relative z-10">
              {cat.icon}
            </span>
            <span className="relative z-10 text-sm font-semibold tracking-wide"
              style={{ fontFamily: "'Share Tech Mono', monospace" }}>
              {cat.name}
            </span>
            {isActive && <LiveDot />}
          </button>
        )
      })}
    </div>
  )
}

// ─── Item Filmstrip ───────────────────────────────────────────────────
// Horizontal thumbnails, clearly clickable

function Filmstrip({
  items, activeIdx, onSelect,
}: { items: MediaItem[]; activeIdx: number; onSelect: (i: number) => void }) {
  return (
    <div className="flex gap-2 p-3 overflow-x-auto" style={{ background: "rgba(0,0,0,0.4)", borderTop: "1px solid rgba(0,255,225,0.06)" }}>
      {items.map((item, i) => {
        const active = i === activeIdx
        const thumb  = item.thumbnail || item.images[0] || ""
        return (
          <button key={item.id} onClick={() => onSelect(i)}
            className="relative flex-shrink-0 rounded overflow-hidden transition-all duration-300 group"
            style={{
              width: 96, height: 64,
              border:     active ? "2px solid #00ffe1" : "2px solid rgba(255,255,255,0.08)",
              boxShadow:  active ? "0 0 16px rgba(0,255,225,0.3)" : "none",
              background: "#030609",
            }}>
            {thumb && <img src={thumb} alt={item.title} className="w-full h-full object-cover transition-all duration-300" style={{ opacity: active ? 1 : 0.4 }} />}
            {/* Hover tint */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ background: "rgba(0,255,225,0.08)" }} />
            {/* Active glow top bar */}
            {active && <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: "#00ffe1", boxShadow: "0 0 8px rgba(0,255,225,1)" }} />}
            {/* Number label */}
            <div className="absolute bottom-1 left-1.5">
              <span className="text-[8px] font-mono" style={{ color: active ? "#00ffe1" : "rgba(255,255,255,0.3)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          </button>
        )
      })}
    </div>
  )
}

// ─── Main Stage ───────────────────────────────────────────────────────

function MainStage({
  item, imgIdx, onPrev, onNext, onExpand, glitching, mouse,
}: {
  item: MediaItem; imgIdx: number; onPrev: () => void; onNext: () => void
  onExpand: () => void; glitching: boolean; mouse: { x: number; y: number }
}) {
  const imgs = item.images.length > 0 ? item.images : [item.thumbnail]
  const src  = imgs[imgIdx] || ""
  const hasMultiple = imgs.length > 1

  return (
    <div className="relative flex-1 overflow-hidden" style={{ minHeight: "52vh", background: "#020408" }}>
      {/* Image */}
      <SmartImage src={src} alt={item.title} className="absolute inset-0 w-full h-full object-cover"
        style={{
          transform: `scale(1.04) translate(${(mouse.x - 50) * -0.015}%,${(mouse.y - 50) * -0.015}%)`,
          transition: "transform 1.2s ease",
          opacity: glitching ? 0.15 : 1,
        }} />

      {/* Gradient overlays */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom,rgba(2,4,10,0.5) 0%,transparent 25%,transparent 55%,rgba(2,4,10,0.98) 100%)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to right,rgba(2,4,10,0.4),transparent 30%,transparent 70%,rgba(2,4,10,0.4))" }} />

      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,1) 3px,rgba(0,0,0,1) 4px)" }} />

      {/* Glitch flash */}
      {glitching && (
        <div className="absolute inset-0 pointer-events-none z-20"
          style={{ background: "#00ffe1", mixBlendMode: "exclusion", opacity: 0.12 }} />
      )}

      {/* ── NAV ARROWS — big, obvious ── */}
      {hasMultiple && (
        <>
          <button onClick={onPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center gap-2 px-4 py-3 transition-all duration-200 group"
            style={{ border: "1px solid rgba(0,255,225,0.3)", background: "rgba(0,0,0,0.75)", backdropFilter: "blur(12px)", color: "rgba(255,255,255,0.7)" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#00ffe1"; e.currentTarget.style.color = "#00ffe1"; e.currentTarget.style.boxShadow = "0 0 20px rgba(0,255,225,0.2)" }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,255,225,0.3)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; e.currentTarget.style.boxShadow = "none" }}>
            <ChevronLeft className="h-5 w-5" />
            <span className="text-xs font-mono tracking-widest hidden sm:inline">PREV</span>
          </button>
          <button onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center gap-2 px-4 py-3 transition-all duration-200"
            style={{ border: "1px solid rgba(0,255,225,0.3)", background: "rgba(0,0,0,0.75)", backdropFilter: "blur(12px)", color: "rgba(255,255,255,0.7)" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#00ffe1"; e.currentTarget.style.color = "#00ffe1"; e.currentTarget.style.boxShadow = "0 0 20px rgba(0,255,225,0.2)" }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,255,225,0.3)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; e.currentTarget.style.boxShadow = "none" }}>
            <span className="text-xs font-mono tracking-widest hidden sm:inline">NEXT</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* ── EXPAND BUTTON — top right, clear ── */}
      <button onClick={onExpand}
        className="absolute top-4 right-4 z-10 flex items-center gap-2 px-3 py-2 transition-all duration-200"
        style={{ border: "1px solid rgba(0,255,225,0.25)", background: "rgba(0,0,0,0.75)", backdropFilter: "blur(12px)", color: "rgba(255,255,255,0.6)" }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "#00ffe1"; e.currentTarget.style.color = "#00ffe1" }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,255,225,0.25)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)" }}>
        <Eye className="h-4 w-4" />
        <span className="text-[10px] font-mono tracking-widest">VER COMPLETA</span>
      </button>

      {/* ── BOTTOM INFO — title + badges ── */}
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 z-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            {/* Badges row */}
            <div className="flex items-center gap-2 mb-3">
              <Pill><Activity className="h-2.5 w-2.5" /> 100% IA</Pill>
              {hasMultiple && <Pill color="#b400ff">{imgs.length} variaciones</Pill>}
            </div>
            {/* Title */}
            <h3 className="text-white font-bold leading-none mb-2"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem,5vw,4rem)", textShadow: "0 2px 40px rgba(0,0,0,0.9)" }}>
              {item.title}
            </h3>
            <p className="text-sm font-mono" style={{ color: "rgba(255,255,255,0.45)", maxWidth: 420 }}>
              {item.description}
            </p>
          </div>

          {/* Dot nav for variants */}
          {hasMultiple && (
            <div className="flex gap-2 items-center pb-1 flex-shrink-0">
              {imgs.map((_, i) => (
                <button key={i} onClick={() => {}}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width:  i === imgIdx ? 24 : 8,
                    height: 8,
                    background: i === imgIdx ? "#00ffe1" : "rgba(255,255,255,0.2)",
                    boxShadow:  i === imgIdx ? "0 0 10px rgba(0,255,225,0.8)" : "none",
                  }} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Modal ────────────────────────────────────────────────────────────

function Modal({ item, imgIdx, onClose, onPrev, onNext }: {
  item: MediaItem; imgIdx: number
  onClose: () => void; onPrev: () => void; onNext: () => void
}) {
  const imgs = item.images.length > 0 ? item.images : [item.thumbnail]
  const src  = imgs[imgIdx] || ""

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape")      onClose()
      if (e.key === "ArrowRight")  onNext()
      if (e.key === "ArrowLeft")   onPrev()
    }
    window.addEventListener("keydown", h)
    return () => window.removeEventListener("keydown", h)
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: "rgba(0,2,8,0.97)", backdropFilter: "blur(24px)", animation: "fadeIn 0.15s ease both" }}
      onClick={onClose}>

      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: "linear-gradient(rgba(0,255,225,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,225,0.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

      {/* Top bar */}
      <div className="relative z-10 w-full flex items-center justify-between px-6 py-4 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(0,255,225,0.08)" }}
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3">
          <LiveDot />
          <span className="text-sm font-bold text-white font-mono tracking-wide">{item.title}</span>
          {imgs.length > 1 && (
            <span className="text-xs font-mono" style={{ color: "rgba(0,255,225,0.5)" }}>
              {String(imgIdx + 1).padStart(2,"0")} / {String(imgs.length).padStart(2,"0")}
            </span>
          )}
        </div>
        <button onClick={onClose}
          className="flex items-center gap-2 px-4 py-2 text-sm font-mono tracking-widest transition-all duration-200"
          style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.5)" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,255,225,0.5)"; e.currentTarget.style.color = "#00ffe1" }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)" }}>
          <X className="h-4 w-4" /> Cerrar
        </button>
      </div>

      {/* Image */}
      <div className="relative flex-1 flex items-center justify-center w-full px-20 py-6" onClick={e => e.stopPropagation()}>
        <img key={imgIdx} src={src} alt={item.title}
          className="max-w-full max-h-full object-contain rounded"
          style={{ animation: "scaleIn 0.2s cubic-bezier(0.16,1,0.3,1) both", boxShadow: "0 0 80px rgba(0,0,0,0.8)" }} />

        {/* Side nav — big clear arrows */}
        {imgs.length > 1 && (
          <>
            <button onClick={onPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 px-5 py-4 transition-all duration-200"
              style={{ border: "1px solid rgba(0,255,225,0.25)", background: "rgba(0,0,0,0.8)", backdropFilter: "blur(12px)", color: "rgba(255,255,255,0.6)" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#00ffe1"; e.currentTarget.style.color = "#00ffe1"; e.currentTarget.style.boxShadow = "0 0 20px rgba(0,255,225,0.15)" }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,255,225,0.25)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; e.currentTarget.style.boxShadow = "none" }}>
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button onClick={onNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 px-5 py-4 transition-all duration-200"
              style={{ border: "1px solid rgba(0,255,225,0.25)", background: "rgba(0,0,0,0.8)", backdropFilter: "blur(12px)", color: "rgba(255,255,255,0.6)" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#00ffe1"; e.currentTarget.style.color = "#00ffe1"; e.currentTarget.style.boxShadow = "0 0 20px rgba(0,255,225,0.15)" }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,255,225,0.25)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; e.currentTarget.style.boxShadow = "none" }}>
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
      </div>

      {/* Bottom thumbs */}
      {imgs.length > 1 && (
        <div className="relative z-10 flex gap-2 pb-5 flex-shrink-0" onClick={e => e.stopPropagation()}>
          {imgs.map((img, i) => (
            <button key={i} onClick={() => {}}
              className="rounded overflow-hidden transition-all duration-200"
              style={{
                width: 72, height: 48,
                border:    i === imgIdx ? "2px solid #00ffe1" : "2px solid rgba(255,255,255,0.1)",
                opacity:   i === imgIdx ? 1 : 0.4,
                boxShadow: i === imgIdx ? "0 0 14px rgba(0,255,225,0.4)" : "none",
              }}>
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────

export function GalleryCatalogoRopa() {
  const [catIdx,    setCatIdx]    = useState(0)
  const [itemIdx,   setItemIdx]   = useState(0)
  const [imgIdx,    setImgIdx]    = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [mouse,     setMouse]     = useState({ x: 50, y: 50 })
  const sectionRef = useRef<HTMLElement>(null)
  const { active: glitching, trigger } = useGlitch()

  const cat  = categories[catIdx]
  const item = cat.items[itemIdx]
  const imgs = item.images.length > 0 ? item.images : [item.thumbnail]
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`

  const selectCat  = (id: string) => { const i = categories.findIndex(c => c.id === id); if (i !== catIdx) trigger(() => { setCatIdx(i); setItemIdx(0); setImgIdx(0) }) }
  const selectItem = (i: number)  => { if (i !== itemIdx) trigger(() => { setItemIdx(i); setImgIdx(0) }) }
  const prevImg    = useCallback(() => { if (imgs.length > 1) trigger(() => setImgIdx(p => (p - 1 + imgs.length) % imgs.length)) }, [imgs.length, trigger])
  const nextImg    = useCallback(() => { if (imgs.length > 1) trigger(() => setImgIdx(p => (p + 1) % imgs.length)) }, [imgs.length, trigger])

  useEffect(() => {
    if (modalOpen) return
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextImg()
      if (e.key === "ArrowLeft")  prevImg()
    }
    window.addEventListener("keydown", h)
    return () => window.removeEventListener("keydown", h)
  }, [modalOpen, nextImg, prevImg])

  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return
    const r = sectionRef.current.getBoundingClientRect()
    setMouse({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 })
  }

  return (
    <section ref={sectionRef} onMouseMove={onMouseMove} id="catalogo-ropa"
      className="relative overflow-hidden flex flex-col"
      style={{ background: "#02030a", minHeight: "100vh" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Share+Tech+Mono&display=swap');
        @keyframes pulse2   { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes shimmer  { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
        @keyframes scaleIn  { from{opacity:0;transform:scale(1.03)} to{opacity:1;transform:scale(1)} }
        @keyframes scanV    { 0%{transform:translateY(-100%)} 100%{transform:translateY(200%)} }
        @keyframes slideUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        * { box-sizing: border-box; }
      `}</style>

      {/* ── AMBIENT BACKGROUND ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: "linear-gradient(rgba(0,255,225,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,225,0.6) 1px,transparent 1px)", backgroundSize: "72px 72px" }} />
        <div className="absolute rounded-full"
          style={{ top: "-20%", left: `${mouse.x * 0.25}%`, width: 900, height: 700, background: "radial-gradient(ellipse,rgba(0,200,180,0.06) 0%,transparent 65%)", transform: "translateX(-50%)", transition: "left 2s ease", pointerEvents: "none" }} />
        <div className="absolute rounded-full"
          style={{ bottom: "-20%", right: `${(100 - mouse.x) * 0.25}%`, width: 700, height: 600, background: "radial-gradient(ellipse,rgba(180,0,255,0.06) 0%,transparent 65%)", transform: "translateX(50%)", transition: "right 2s ease", pointerEvents: "none" }} />
      </div>

      {/* Scan beam */}
      <div className="absolute left-0 right-0 h-px pointer-events-none z-20"
        style={{ background: "linear-gradient(90deg,transparent,rgba(0,255,225,0.25),transparent)", animation: "scanV 10s linear infinite", boxShadow: "0 0 16px rgba(0,255,225,0.2)" }} />

      {/* ════ HEADER ════ */}
      <header className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-5"
        style={{ borderBottom: "1px solid rgba(0,255,225,0.06)", animation: "slideUp 0.5s ease both" }}>

        {/* Left: brand + title */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <LiveDot />
            <span className="text-[9px] font-mono tracking-[0.3em] uppercase" style={{ color: "rgba(0,255,225,0.5)" }}>
              Visual AI Studio
            </span>
          </div>
          <h2 className="font-bold leading-none text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.8rem,4vw,3rem)", letterSpacing: "0.04em" }}>
            Imágenes con IA Generativa
          </h2>
        </div>

        {/* Right: CTA */}
        <a href={waUrl} target="_blank" rel="noopener noreferrer"
          className="group flex-shrink-0 flex items-center gap-3 px-6 py-3.5 font-bold tracking-wide transition-all duration-300"
          style={{ border: "1px solid rgba(0,255,225,0.35)", background: "rgba(0,255,225,0.05)", color: "#e0fff8", fontFamily: "'Share Tech Mono', monospace", fontSize: 13 }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,255,225,0.12)"; e.currentTarget.style.borderColor = "#00ffe1"; e.currentTarget.style.boxShadow = "0 0 30px rgba(0,255,225,0.15)" }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,255,225,0.05)"; e.currentTarget.style.borderColor = "rgba(0,255,225,0.35)"; e.currentTarget.style.boxShadow = "none" }}>
          <Zap className="h-4 w-4 text-[#00ffe1]" />
          Crear mi campaña IA
          <ArrowUpRight className="h-4 w-4 text-[#00ffe1] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </a>
      </header>

      {/* ════ CATEGORY TABS ════ */}
      <div className="relative z-10" style={{ animation: "slideUp 0.5s ease both 0.05s" }}>
        <CategoryTabs active={cat.id} onChange={selectCat} />
      </div>

      {/* ════ MAIN STAGE ════ */}
      <div className="relative z-10 flex-1" style={{ animation: "slideUp 0.5s ease both 0.1s" }}>
        <MainStage
          item={item} imgIdx={imgIdx}
          onPrev={prevImg} onNext={nextImg}
          onExpand={() => setModalOpen(true)}
          glitching={glitching} mouse={mouse} />
      </div>

      {/* ════ FILMSTRIP ════ */}
      <div className="relative z-10" style={{ animation: "slideUp 0.5s ease both 0.15s" }}>
        <Filmstrip items={cat.items} activeIdx={itemIdx} onSelect={selectItem} />
      </div>

      {/* ════ MODAL ════ */}
      {modalOpen && (
        <Modal item={item} imgIdx={imgIdx} onClose={() => setModalOpen(false)} onPrev={prevImg} onNext={nextImg} />
      )}
    </section>
  )
}
