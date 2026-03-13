"use client"

import { useState, useRef, useEffect, MouseEvent } from "react"
import {
  ImageIcon,
  Sparkles,
  Camera,
  Layers,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  AlertCircle,
  Zap,
  Activity,
  ArrowUpRight,
} from "lucide-react"

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
  shortCode: string
  icon: React.ReactNode
  description: string
  items: MediaItem[]
}

const categories: Category[] = [
  {
    id: "catalogo-producto",
    name: "Catálogo Producto",
    shortCode: "CAT",
    icon: <Layers className="h-4 w-4" />,
    description: "Visualización de producto generada 100% con IA (CGI Generativo)",
    items: [
      { id: "ia-mbloom",  title: "MBloom Body Butters", description: "Set virtual botánico con simulación de luz natural.",       type: "image", thumbnail: "/mbloom-ia-1.jpg",       images: ["/mbloom-ia-1.jpg", "/mbloom-ia-2.jpg"] },
      { id: "ia-petcare", title: "Pet Care Brush",      description: "Simulación de fluidos y partículas generativas.",          type: "image", thumbnail: "/petcare-ia.jpg",          images: ["/petcare-ia.jpg"] },
      { id: "ia-shoes",   title: "Sneakers Focus",      description: "Zapatos urbanos integrados en entornos sintéticos.",       type: "image", thumbnail: "/sneaker-ia.jpg",          images: ["/sneaker-ia.jpg", "/sneaker-ia-2.jpg"] },
    ],
  },
  {
    id: "modelos-ia",
    name: "Modelos IA",
    shortCode: "MDL",
    icon: <Sparkles className="h-4 w-4" />,
    description: "Avatares hiperrealistas y fashion films sintéticos",
    items: [
      { id: "ia-avatar-1",       title: "Campaña Cosmética",       description: "Modelaje hiperrealista con texturas de piel fotorrealistas.", type: "image", thumbnail: "/modelo-ia-1.jpg",       images: ["/modelo-ia-1.jpg", "/modelo-ia-2.jpg"] },
      { id: "ia-macone-virtual", title: "Mac One | Virtual Try-On", description: "Prendas reales aplicadas sobre modelos generados por IA.",   type: "image", thumbnail: "/macone-ia-modelo.jpg", images: ["/macone-ia-modelo.jpg"] },
    ],
  },
  {
    id: "editorial",
    name: "Editorial AI",
    shortCode: "EDT",
    icon: <Camera className="h-4 w-4" />,
    description: "Dirección de arte, iluminación cinematográfica y conceptos visuales",
    items: [
      { id: "ia-neon-concept", title: "Concepto Neón & Humo", description: "Iluminación dual retro-futurista generada por IA.", type: "image", thumbnail: "/neon-ia-1.jpg", images: ["/neon-ia-1.jpg", "/neon-ia-2.jpg"] },
    ],
  },
]

const WHATSAPP_NUMBER = "573019132001"
const WHATSAPP_MESSAGE = "🤖 ¡Hola Jesus! 👋 Vi tu portafolio de *Imágenes y CGI con Inteligencia Artificial*. Me interesa crear una campaña visual para mi marca sin necesidad de un estudio físico. ¿Podemos hablar? 🚀"

function ScanlineOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 opacity-[0.025]"
      style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,225,0.2) 2px, rgba(0,255,225,0.2) 4px)" }} />
  )
}

function CornerBrackets({ color = "#00ffe1", size = 12, thickness = 1.5, opacity = 0.6 }: { color?: string; size?: number; thickness?: number; opacity?: number }) {
  const s = { borderColor: color, opacity }
  const bw = `${thickness}px`
  return (
    <>
      <span className="absolute top-0 left-0 pointer-events-none" style={{ ...s, borderTopWidth: bw, borderLeftWidth: bw, borderTopStyle: "solid", borderLeftStyle: "solid", width: size, height: size }} />
      <span className="absolute top-0 right-0 pointer-events-none" style={{ ...s, borderTopWidth: bw, borderRightWidth: bw, borderTopStyle: "solid", borderRightStyle: "solid", width: size, height: size }} />
      <span className="absolute bottom-0 left-0 pointer-events-none" style={{ ...s, borderBottomWidth: bw, borderLeftWidth: bw, borderBottomStyle: "solid", borderLeftStyle: "solid", width: size, height: size }} />
      <span className="absolute bottom-0 right-0 pointer-events-none" style={{ ...s, borderBottomWidth: bw, borderRightWidth: bw, borderBottomStyle: "solid", borderRightStyle: "solid", width: size, height: size }} />
    </>
  )
}

function SmartImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [hasError, setHasError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  if (hasError) {
    return (
      <div className={`flex flex-col items-center justify-center gap-2 bg-[#060b12] text-[#00ffe1]/20 py-24 ${className}`}>
        <AlertCircle className="h-5 w-5" />
        <span className="text-[8px] font-mono tracking-[0.3em] uppercase">NO_SIGNAL</span>
      </div>
    )
  }
  return (
    <div className="relative w-full h-full">
      {!isLoaded && <div className="absolute inset-0 bg-[#060b12]" style={{ background: "linear-gradient(90deg, #060b12 0%, rgba(0,255,225,0.03) 50%, #060b12 100%)", backgroundSize: "200% 100%", animation: "shimmer 2s infinite linear" }} />}
      <img src={src} alt={alt} loading="lazy" onLoad={() => setIsLoaded(true)} onError={() => setHasError(true)}
        className={`${className} transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`} />
    </div>
  )
}

function CategorySidebar({ categories, activeId, onChange }: { categories: Category[]; activeId: string; onChange: (id: string) => void }) {
  return (
    <aside className="w-full lg:w-[200px] flex-shrink-0 flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
      <div className="hidden lg:flex items-center gap-2 mb-4 px-1">
        <span className="text-[8px] font-mono text-[#00ffe1]/30 tracking-[0.3em] uppercase">// MÓDULOS</span>
        <span className="flex-1 h-px" style={{ background: "linear-gradient(to right, rgba(0,255,225,0.2), transparent)" }} />
      </div>
      {categories.map((cat, i) => {
        const isActive = cat.id === activeId
        return (
          <button key={cat.id} onClick={() => onChange(cat.id)}
            className="relative flex-shrink-0 group flex items-center gap-3 px-4 py-3 lg:py-4 rounded-sm text-left transition-all duration-200 overflow-hidden"
            style={{ background: isActive ? "rgba(0,255,225,0.05)" : "rgba(255,255,255,0.01)", border: isActive ? "1px solid rgba(0,255,225,0.2)" : "1px solid rgba(255,255,255,0.04)", animation: `revealLeft 0.4s ease both ${i * 80}ms` }}>
            {isActive && <span className="absolute left-0 top-0 bottom-0 w-[2px]" style={{ background: "linear-gradient(to bottom, transparent, #00ffe1, transparent)", boxShadow: "0 0 8px rgba(0,255,225,0.8)" }} />}
            <span className="hidden lg:block text-[9px] font-mono font-bold tracking-[0.15em] transition-colors duration-200" style={{ color: isActive ? "#00ffe1" : "rgba(255,255,255,0.2)" }}>{cat.shortCode}</span>
            <span style={{ color: isActive ? "#00ffe1" : "rgba(255,255,255,0.25)" }} className="transition-colors duration-200">{cat.icon}</span>
            <span className="text-[10px] sm:text-[11px] font-mono tracking-wider whitespace-nowrap transition-colors duration-200" style={{ color: isActive ? "#e0fff8" : "rgba(255,255,255,0.3)" }}>{cat.name}</span>
            <span className="ml-auto text-[8px] font-mono hidden lg:block transition-colors duration-200" style={{ color: isActive ? "rgba(0,255,225,0.5)" : "rgba(255,255,255,0.1)" }}>{String(cat.items.length).padStart(2, "0")}</span>
            <span className="absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-500 pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,225,0.04), transparent)" }} />
          </button>
        )
      })}
      <div className="hidden lg:block mt-6 px-1">
        <div className="h-px w-full mb-4" style={{ background: "linear-gradient(to right, rgba(0,255,225,0.15), transparent)" }} />
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ffe1] animate-pulse" style={{ boxShadow: "0 0 6px rgba(0,255,225,0.9)" }} />
          <span className="text-[8px] font-mono text-[#00ffe1]/40 tracking-[0.2em]">ONLINE</span>
        </div>
      </div>
    </aside>
  )
}

function GalleryCard({ item, index, featured, onClick }: { item: MediaItem; index: number; featured?: boolean; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [mouse, setMouse] = useState({ x: 50, y: 50 })
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    const cx = (e.clientX - r.left) / r.width
    const cy = (e.clientY - r.top) / r.height
    setMouse({ x: cx * 100, y: cy * 100 })
    setTilt({ x: (cy - 0.5) * -8, y: (cx - 0.5) * 8 })
  }

  const hasThumbnail = !!item.thumbnail || item.images.length > 0
  const displayImage = item.thumbnail || item.images[0] || ""
  const imageCount = item.images.length

  return (
    <div ref={ref} onMouseMove={onMove} onMouseEnter={() => setHovered(true)} onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }) }}
      onClick={onClick} className="relative cursor-pointer group"
      style={{ animation: `revealUp 0.5s cubic-bezier(0.16,1,0.3,1) both ${index * 80}ms`, perspective: "1000px" }}>
      <div className="absolute -inset-px rounded-sm pointer-events-none transition-opacity duration-300"
        style={{ opacity: hovered ? 1 : 0, background: `radial-gradient(ellipse at ${mouse.x}% ${mouse.y}%, rgba(0,255,225,0.28) 0%, rgba(180,0,255,0.1) 50%, transparent 70%)` }} />
      <div className="relative overflow-hidden rounded-sm"
        style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transformStyle: "preserve-3d", transition: "transform 0.15s ease", border: hovered ? "1px solid rgba(0,255,225,0.22)" : "1px solid rgba(255,255,255,0.05)", background: "#060b12", boxShadow: hovered ? "0 8px 40px rgba(0,0,0,0.6)" : "0 4px 20px rgba(0,0,0,0.5)" }}>
        <ScanlineOverlay />
        <CornerBrackets color={hovered ? "#00ffe1" : "rgba(0,255,225,0.2)"} size={featured ? 14 : 10} opacity={hovered ? 0.8 : 0.3} />
        <div className={`relative overflow-hidden ${featured ? "aspect-[4/3]" : "aspect-[3/2]"}`}>
          {hasThumbnail ? (
            <>
              <SmartImage src={displayImage} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
              {hovered && <div className="absolute inset-0 pointer-events-none mix-blend-screen" style={{ background: `radial-gradient(ellipse at ${mouse.x}% ${mouse.y}%, rgba(0,255,225,0.1) 0%, rgba(180,0,255,0.06) 45%, transparent 70%)` }} />}
              <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(6,11,18,0.9) 0%, rgba(6,11,18,0.2) 40%, transparent 100%)" }} />
              <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300" style={{ opacity: hovered ? 1 : 0 }}>
                <div className="p-2.5 rounded-sm" style={{ border: "1px solid rgba(0,255,225,0.4)", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", boxShadow: "0 0 16px rgba(0,255,225,0.25)" }}>
                  <Maximize2 className="h-4 w-4 text-[#00ffe1]" />
                </div>
              </div>
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded-sm" style={{ border: "1px solid rgba(0,255,225,0.15)", background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}>
                <Activity className="h-2.5 w-2.5 text-[#00ffe1] animate-pulse" />
                <span className="text-[8px] font-mono text-[#00ffe1]/80 tracking-[0.2em]">GEN·IA</span>
              </div>
              {imageCount > 1 && (
                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-sm" style={{ border: "1px solid rgba(180,0,255,0.2)", background: "rgba(0,0,0,0.7)" }}>
                  <span className="text-[8px] font-mono text-[#b400ff]/80 tracking-widest">{imageCount}×</span>
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-[#00ffe1]/15">
              <ImageIcon className="h-8 w-8" />
              <span className="text-[8px] font-mono tracking-[0.3em] uppercase">OFFLINE</span>
            </div>
          )}
        </div>
        <div className="px-3.5 py-3 relative">
          <div className="absolute top-0 inset-x-3.5 h-px" style={{ background: hovered ? "linear-gradient(to right, transparent, rgba(0,255,225,0.2), transparent)" : "linear-gradient(to right, transparent, rgba(255,255,255,0.04), transparent)" }} />
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="text-[11px] sm:text-xs font-mono font-bold text-white/90 tracking-wider truncate mb-0.5">{item.title}</h3>
              <p className="text-[9px] sm:text-[10px] font-mono text-white/30 leading-relaxed line-clamp-2">{item.description}</p>
            </div>
            <ArrowUpRight className="h-3.5 w-3.5 flex-shrink-0 mt-0.5 transition-all duration-200" style={{ color: hovered ? "#00ffe1" : "rgba(255,255,255,0.15)" }} />
          </div>
        </div>
      </div>
    </div>
  )
}

function HoloModal({ item, onClose }: { item: MediaItem; onClose: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const allImages = item.images.length > 0 ? item.images : [item.thumbnail || ""]
  const validImages = allImages.filter(Boolean)
  const hasMultiple = validImages.length > 1

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setCurrentIndex((p) => (p + 1) % validImages.length)
      if (e.key === "ArrowLeft")  setCurrentIndex((p) => (p - 1 + validImages.length) % validImages.length)
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [validImages.length, onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
      style={{ background: "rgba(2,4,10,0.97)", backdropFilter: "blur(20px)" }} onClick={onClose}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: "linear-gradient(rgba(0,255,225,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,225,0.5) 1px,transparent 1px)", backgroundSize: "50px 50px" }} />
      <div onClick={e => e.stopPropagation()}
        className="relative w-full max-w-5xl rounded-sm flex flex-col max-h-[92vh] overflow-hidden"
        style={{ border: "1px solid rgba(0,255,225,0.12)", background: "#050910", boxShadow: "0 0 80px rgba(0,255,225,0.05)", animation: "revealUp 0.22s cubic-bezier(0.16,1,0.3,1) both" }}>
        <ScanlineOverlay />
        <CornerBrackets color="#00ffe1" size={20} thickness={1.5} />
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #00ffe1, transparent)", boxShadow: "0 0 16px rgba(0,255,225,0.7)" }} />

        <div className="flex-none flex items-center justify-between px-5 py-3.5" style={{ borderBottom: "1px solid rgba(0,255,225,0.06)" }}>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-sm" style={{ border: "1px solid rgba(0,255,225,0.15)", background: "rgba(0,255,225,0.04)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ffe1]" style={{ boxShadow: "0 0 6px rgba(0,255,225,0.9)", animation: "pulse 1.5s infinite" }} />
              <span className="text-[8px] font-mono text-[#00ffe1] tracking-[0.3em]">LIVE</span>
            </div>
            <div>
              <p className="text-[8px] font-mono text-[#b400ff]/50 tracking-[0.25em] mb-0.5 uppercase">Neural Render // {String(item.id).slice(0, 10).toUpperCase()}</p>
              <h3 className="text-sm font-mono font-bold text-white tracking-wider">{item.title}</h3>
            </div>
          </div>
          <button onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm font-mono text-[9px] tracking-[0.2em] transition-all duration-200"
            style={{ border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.35)" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,255,225,0.3)"; e.currentTarget.style.color = "#00ffe1" }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "rgba(255,255,255,0.35)" }}>
            <X className="h-3.5 w-3.5" /><span>ESC</span>
          </button>
        </div>

        <div className="flex-1 min-h-0 relative flex items-center justify-center bg-black/50 p-4 sm:p-8">
          {validImages.length > 0 ? (
            <img key={currentIndex} src={validImages[currentIndex]} alt={`${item.title} ${currentIndex + 1}`}
              className="max-w-full max-h-[55vh] sm:max-h-[62vh] object-contain rounded-sm"
              style={{ animation: "revealUp 0.2s ease both" }} />
          ) : (
            <div className="flex flex-col items-center gap-3 text-[#00ffe1]/15"><ImageIcon className="h-14 w-14" /></div>
          )}
          {hasMultiple && (
            <>
              <button onClick={e => { e.stopPropagation(); setCurrentIndex(p => (p - 1 + validImages.length) % validImages.length) }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-sm transition-all duration-200"
                style={{ border: "1px solid rgba(0,255,225,0.12)", background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", color: "rgba(255,255,255,0.4)" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,255,225,0.4)"; e.currentTarget.style.color = "#00ffe1" }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,255,225,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.4)" }}>
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button onClick={e => { e.stopPropagation(); setCurrentIndex(p => (p + 1) % validImages.length) }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-sm transition-all duration-200"
                style={{ border: "1px solid rgba(0,255,225,0.12)", background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", color: "rgba(255,255,255,0.4)" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,255,225,0.4)"; e.currentTarget.style.color = "#00ffe1" }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,255,225,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.4)" }}>
                <ChevronRight className="h-4 w-4" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-sm" style={{ border: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}>
                <span className="text-[8px] font-mono text-[#00ffe1]/50 tracking-[0.25em]">
                  {String(currentIndex + 1).padStart(2, "0")} / {String(validImages.length).padStart(2, "0")}
                </span>
              </div>
            </>
          )}
        </div>

        {validImages.length > 1 && (
          <div className="flex-none flex justify-center gap-2 p-3 overflow-x-auto" style={{ borderTop: "1px solid rgba(0,255,225,0.06)", background: "rgba(0,0,0,0.4)" }}>
            {validImages.map((img, idx) => (
              <button key={idx} onClick={() => setCurrentIndex(idx)}
                className="relative flex-shrink-0 h-12 w-16 rounded-sm overflow-hidden transition-all duration-200"
                style={{ border: idx === currentIndex ? "1px solid rgba(0,255,225,0.5)" : "1px solid rgba(255,255,255,0.05)", opacity: idx === currentIndex ? 1 : 0.35, boxShadow: idx === currentIndex ? "0 0 12px rgba(0,255,225,0.2)" : "none" }}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        <div className="flex-none flex items-center justify-between px-5 py-2" style={{ borderTop: "1px solid rgba(255,255,255,0.03)", background: "rgba(0,0,0,0.5)" }}>
          <span className="text-[7px] font-mono text-white/10 tracking-[0.25em]">NEURAL_CGI::RENDER_ENGINE_v4.2</span>
          <span className="text-[7px] font-mono text-[#b400ff]/30 tracking-[0.2em]">4K // AI_DIFFUSION // 50_STEPS</span>
        </div>
      </div>
    </div>
  )
}

function BentoGrid({ items, onSelect }: { items: MediaItem[]; onSelect: (item: MediaItem) => void }) {
  if (items.length === 0) return null
  const [featured, ...rest] = items
  return (
    <div className="grid gap-3 sm:gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
      <div style={{ gridColumn: "1 / -1" }}>
        <GalleryCard item={featured} index={0} featured onClick={() => onSelect(featured)} />
      </div>
      {rest.length > 0 && (
        <div className="grid gap-3 sm:gap-4" style={{ gridColumn: "1 / -1", gridTemplateColumns: `repeat(${Math.min(rest.length, 2)}, 1fr)` }}>
          {rest.map((item, i) => (
            <GalleryCard key={item.id} item={item} index={i + 1} onClick={() => onSelect(item)} />
          ))}
        </div>
      )}
    </div>
  )
}

export function GalleryCatalogoRopa() {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)
  const [activeTab, setActiveTab]       = useState("catalogo-producto")
  const [displayedTab, setDisplayedTab] = useState("catalogo-producto")
  const [isChangingTab, setIsChangingTab] = useState(false)

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
  const activeCategory = categories.find((c) => c.id === displayedTab)

  const handleTabChange = (id: string) => {
    if (id === activeTab) return
    setIsChangingTab(true)
    setTimeout(() => { setActiveTab(id); setDisplayedTab(id); setIsChangingTab(false) }, 180)
  }

  return (
    <section id="catalogo-ropa" className="relative py-16 sm:py-24 overflow-hidden" style={{ background: "#03050c" }}>
      <style>{`
        @keyframes shimmer   { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes revealUp  { from{opacity:0;transform:translateY(20px) scale(0.985)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes revealLeft{ from{opacity:0;transform:translateX(-16px)} to{opacity:1;transform:translateX(0)} }
        @keyframes scanDown  { 0%{transform:translateY(-100vh)} 100%{transform:translateY(100vh)} }
        @keyframes floatGlow { 0%,100%{opacity:0.04;transform:scale(1)} 50%{opacity:0.07;transform:scale(1.05)} }
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Share+Tech+Mono&display=swap');
      `}</style>

      {/* Ambient BG */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.018]" style={{ backgroundImage: "linear-gradient(rgba(0,255,225,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,225,0.6) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
        <div className="absolute top-[-10%] left-[20%] w-[700px] h-[500px] rounded-full" style={{ background: "radial-gradient(ellipse,rgba(0,200,180,0.05) 0%,transparent 70%)", animation: "floatGlow 8s ease infinite" }} />
        <div className="absolute bottom-[-10%] right-[15%] w-[600px] h-[400px] rounded-full" style={{ background: "radial-gradient(ellipse,rgba(180,0,255,0.05) 0%,transparent 70%)", animation: "floatGlow 10s ease infinite 2s" }} />
        <div className="absolute top-0 left-0 w-px h-full" style={{ background: "linear-gradient(to bottom,transparent,rgba(0,255,225,0.06),transparent)" }} />
        <div className="absolute top-0 right-0 w-px h-full" style={{ background: "linear-gradient(to bottom,transparent,rgba(180,0,255,0.06),transparent)" }} />
      </div>

      {/* Scan beam */}
      <div className="absolute left-0 right-0 h-[2px] pointer-events-none z-10"
        style={{ background: "linear-gradient(90deg,transparent,rgba(0,255,225,0.15),transparent)", animation: "scanDown 10s linear infinite", boxShadow: "0 0 12px rgba(0,255,225,0.1)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16" style={{ animation: "revealUp 0.7s cubic-bezier(0.16,1,0.3,1) both" }}>
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ffe1]" style={{ boxShadow: "0 0 8px rgba(0,255,225,1)", animation: "pulse 2s infinite" }} />
              <span className="text-[9px] font-mono text-[#00ffe1]/50 tracking-[0.35em] uppercase">VISUAL_AI // SISTEMA ACTIVO</span>
              <span className="flex-1 h-px" style={{ background: "linear-gradient(to right,rgba(0,255,225,0.2),transparent)" }} />
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-none tracking-tight mb-4" style={{ fontFamily: "'Rajdhani',sans-serif" }}>
              <span className="block text-white">IMÁGENES</span>
              <span className="block text-transparent" style={{ WebkitTextStroke: "1px rgba(0,255,225,0.35)" }}>CON IA</span>
              <span className="block text-transparent" style={{ background: "linear-gradient(100deg,#00ffe1 0%,#b400ff 55%,#00ffe1 100%)", backgroundClip: "text", WebkitBackgroundClip: "text" }}>GENERATIVA</span>
            </h2>
          </div>

          <div className="lg:max-w-xs xl:max-w-sm flex flex-col gap-5 lg:pb-2">
            <div className="p-4 rounded-sm relative" style={{ border: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.015)" }}>
              <CornerBrackets color="rgba(0,255,225,0.2)" size={8} thickness={1} />
              <p className="text-[11px] font-mono text-white/30 leading-relaxed">Fotografía comercial, modelaje y CGI generativo. Elimina los costos de un estudio tradicional y crea campañas hiperrealistas.</p>
            </div>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
              className="group relative flex items-center justify-between px-5 py-3.5 rounded-sm overflow-hidden transition-all duration-300"
              style={{ border: "1px solid rgba(0,255,225,0.25)", background: "rgba(0,255,225,0.03)", boxShadow: "0 0 20px rgba(0,255,225,0.06)" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,255,225,0.5)"; e.currentTarget.style.boxShadow = "0 0 30px rgba(0,255,225,0.12)" }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,255,225,0.25)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(0,255,225,0.06)" }}>
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" style={{ background: "linear-gradient(90deg,transparent,rgba(0,255,225,0.06),transparent)" }} />
              <div className="flex items-center gap-2.5 relative z-10">
                <Zap className="h-4 w-4 text-[#00ffe1]" />
                <span className="text-[11px] font-mono font-bold text-white tracking-[0.2em] uppercase">Crear campaña IA</span>
              </div>
              <ArrowUpRight className="relative z-10 h-4 w-4 text-[#00ffe1]/60 group-hover:text-[#00ffe1] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
            </a>
          </div>
        </div>

        {/* BODY */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          <CategorySidebar categories={categories} activeId={activeTab} onChange={handleTabChange} />
          <div className="flex-1 min-w-0">
            {activeCategory && (
              <div className="flex items-center gap-3 mb-5" style={{ animation: "revealUp 0.3s ease both" }}>
                <span className="text-[#b400ff]/60 font-mono text-[9px]">//</span>
                <span className="text-[9px] font-mono text-white/20 tracking-[0.2em] uppercase">{activeCategory.description}</span>
              </div>
            )}
            <div style={{ opacity: isChangingTab ? 0 : 1, transition: "opacity 0.16s ease" }}>
              {activeCategory && <BentoGrid items={activeCategory.items} onSelect={setSelectedItem} />}
            </div>
          </div>
        </div>
      </div>

      {selectedItem && <HoloModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </section>
  )
}