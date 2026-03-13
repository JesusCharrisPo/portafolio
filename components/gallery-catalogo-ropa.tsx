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
  icon: React.ReactNode
  description: string
  items: MediaItem[]
}

// ─── Data ─────────────────────────────────────────────────────────────

const categories: Category[] = [
  {
    id: "catalogo-producto",
    name: "Catálogo Producto",
    icon: <Layers className="h-3.5 w-3.5" />,
    description: "Visualización de producto generada 100% con IA (CGI Generativo)",
    items: [
      {
        id: "ia-mbloom",
        title: "MBloom Body Butters",
        description: "Set virtual botánico con simulación de luz natural.",
        type: "image",
        thumbnail: "/mbloom-ia-1.jpg",
        images: ["/mbloom-ia-1.jpg", "/mbloom-ia-2.jpg"],
      },
      {
        id: "ia-petcare",
        title: "Pet Care Brush",
        description: "Simulación de fluidos y partículas generativas.",
        type: "image",
        thumbnail: "/petcare-ia.jpg",
        images: ["/petcare-ia.jpg"],
      },
      {
        id: "ia-shoes",
        title: "Sneakers Focus",
        description: "Zapatos urbanos integrados en entornos sintéticos.",
        type: "image",
        thumbnail: "/sneaker-ia.jpg",
        images: ["/sneaker-ia.jpg", "/sneaker-ia-2.jpg"],
      },
    ],
  },
  {
    id: "modelos-ia",
    name: "Modelos IA",
    icon: <Sparkles className="h-3.5 w-3.5" />,
    description: "Avatares hiperrealistas y fashion films sintéticos",
    items: [
      {
        id: "ia-avatar-1",
        title: "Campaña Cosmética",
        description: "Modelaje hiperrealista con texturas de piel fotorrealistas.",
        type: "image",
        thumbnail: "/modelo-ia-1.jpg",
        images: ["/modelo-ia-1.jpg", "/modelo-ia-2.jpg"],
      },
      {
        id: "ia-macone-virtual",
        title: "Mac One | Virtual Try-On",
        description: "Prendas reales aplicadas sobre modelos generados por IA.",
        type: "image",
        thumbnail: "/macone-ia-modelo.jpg",
        images: ["/macone-ia-modelo.jpg"],
      },
    ],
  },
  {
    id: "editorial",
    name: "Editorial AI",
    icon: <Camera className="h-3.5 w-3.5" />,
    description: "Dirección de arte, iluminación cinematográfica y conceptos visuales",
    items: [
      {
        id: "ia-neon-concept",
        title: "Concepto Neón & Humo",
        description: "Iluminación dual retro-futurista generada por IA.",
        type: "image",
        thumbnail: "/neon-ia-1.jpg",
        images: ["/neon-ia-1.jpg", "/neon-ia-2.jpg"],
      },
    ],
  },
]

const WHATSAPP_NUMBER = "573019132001"
const WHATSAPP_MESSAGE =
  "🤖 ¡Hola Jesus! 👋 Vi tu portafolio de *Imágenes y CGI con Inteligencia Artificial*. Me interesa crear una campaña visual para mi marca sin necesidad de un estudio físico. ¿Podemos hablar? 🚀"

// ─── Utility: Glitch Text ─────────────────────────────────────────────

function GlitchText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={`relative inline-block ${className}`} data-text={text}>
      {text}
      <span
        aria-hidden
        className="absolute inset-0 text-cyan-400 opacity-0 hover:opacity-60 transition-opacity duration-75"
        style={{ clipPath: "polygon(0 20%, 100% 20%, 100% 40%, 0 40%)", transform: "translateX(-2px)" }}
      >
        {text}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 text-fuchsia-500 opacity-0 hover:opacity-40 transition-opacity duration-75"
        style={{ clipPath: "polygon(0 60%, 100% 60%, 100% 80%, 0 80%)", transform: "translateX(2px)" }}
      >
        {text}
      </span>
    </span>
  )
}



// ─── Scanline Overlay ─────────────────────────────────────────────────

function ScanlineOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-50 opacity-[0.03]"
      style={{
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,225,0.15) 2px, rgba(0,255,225,0.15) 4px)",
        backgroundSize: "100% 4px",
      }}
    />
  )
}

// ─── Corner Brackets ─────────────────────────────────────────────────

function CornerBrackets({ color = "#00ffe1", size = 14 }: { color?: string; size?: number }) {
  return (
    <>
      {/* TL */}
      <span className="absolute top-0 left-0 pointer-events-none" style={{ borderTop: `2px solid ${color}`, borderLeft: `2px solid ${color}`, width: size, height: size, opacity: 0.7 }} />
      {/* TR */}
      <span className="absolute top-0 right-0 pointer-events-none" style={{ borderTop: `2px solid ${color}`, borderRight: `2px solid ${color}`, width: size, height: size, opacity: 0.7 }} />
      {/* BL */}
      <span className="absolute bottom-0 left-0 pointer-events-none" style={{ borderBottom: `2px solid ${color}`, borderLeft: `2px solid ${color}`, width: size, height: size, opacity: 0.7 }} />
      {/* BR */}
      <span className="absolute bottom-0 right-0 pointer-events-none" style={{ borderBottom: `2px solid ${color}`, borderRight: `2px solid ${color}`, width: size, height: size, opacity: 0.7 }} />
    </>
  )
}

// ─── Smart Image ──────────────────────────────────────────────────────

function SmartImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [hasError, setHasError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  if (hasError) {
    return (
      <div className={`flex flex-col items-center justify-center gap-2 bg-[#050810] text-[#00ffe1]/20 py-20 ${className}`}>
        <AlertCircle className="h-6 w-6" />
        <span className="text-[9px] font-mono tracking-[0.3em] uppercase">SIN_SEÑAL</span>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden">
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#050810]">
          <div
            className="h-full w-full"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(0,255,225,0.04) 50%, transparent 100%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 2s infinite linear",
            }}
          />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`${className} transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  )
}

// ─── Holographic Card ─────────────────────────────────────────────────

function HoloCard({ item, index, onClick }: { item: MediaItem; index: number; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glow, setGlow] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const cx = (e.clientX - rect.left) / rect.width
    const cy = (e.clientY - rect.top) / rect.height
    setTilt({ x: (cy - 0.5) * -10, y: (cx - 0.5) * 10 })
    setGlow({ x: cx * 100, y: cy * 100 })
  }

  const resetTilt = () => {
    setTilt({ x: 0, y: 0 })
    setIsHovered(false)
  }

  const hasThumbnail = !!item.thumbnail || item.images.length > 0
  const displayImage = item.thumbnail || item.images[0] || ""
  const imageCount = item.images.length

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={resetTilt}
      onClick={onClick}
      className="relative cursor-pointer break-inside-avoid mb-5 sm:mb-6"
      style={{
        animation: `revealUp 0.5s cubic-bezier(0.16,1,0.3,1) both`,
        animationDelay: `${index * 90}ms`,
        perspective: "1000px",
      }}
    >
      {/* Outer glow ring on hover */}
      <div
        className="absolute -inset-[1px] rounded-lg transition-opacity duration-300 pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(ellipse at ${glow.x}% ${glow.y}%, rgba(0,255,225,0.35) 0%, rgba(180,0,255,0.15) 50%, transparent 70%)`,
        }}
      />

      {/* Card body */}
      <div
        className="relative rounded-lg border border-[#00ffe1]/10 bg-[#060a12] overflow-hidden transition-all duration-150"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`,
          transformStyle: "preserve-3d",
          boxShadow: isHovered
            ? "0 0 30px rgba(0,255,225,0.06), inset 0 0 40px rgba(0,0,0,0.5)"
            : "0 2px 20px rgba(0,0,0,0.6)",
        }}
      >
        {/* Scanlines on card */}
        <ScanlineOverlay />

        {/* Corner brackets */}
        <CornerBrackets color="#00ffe1" size={10} />

        {/* HUD badge */}
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2 py-1 rounded border border-[#00ffe1]/20 bg-black/70 backdrop-blur-md">
          <Activity className="h-2.5 w-2.5 text-[#00ffe1] animate-pulse" />
          <span className="text-[8px] font-mono font-bold text-[#00ffe1] tracking-[0.25em]">GEN·IA</span>
        </div>

        {/* Signal strength dots */}
        <div className="absolute top-3 right-3 z-20 flex gap-0.5 items-end">
          {[1, 2, 3, 4].map((bar) => (
            <span
              key={bar}
              className="w-1 rounded-sm bg-[#b400ff]"
              style={{ height: `${bar * 4}px`, opacity: 0.7 + bar * 0.05 }}
            />
          ))}
        </div>

        {/* Image area */}
        <div className="relative overflow-hidden">
          {hasThumbnail ? (
            <>
              <SmartImage
                src={displayImage}
                alt={item.title}
                className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Holographic shimmer on image hover */}
              {isHovered && (
                <div
                  className="absolute inset-0 pointer-events-none mix-blend-screen"
                  style={{
                    background: `radial-gradient(ellipse at ${glow.x}% ${glow.y}%, rgba(0,255,225,0.12) 0%, rgba(180,0,255,0.08) 40%, transparent 70%)`,
                  }}
                />
              )}

              {/* Hover overlay with grid */}
              <div
                className="absolute inset-0 transition-opacity duration-400 pointer-events-none"
                style={{
                  opacity: isHovered ? 1 : 0,
                  background: "linear-gradient(to top, rgba(0,8,16,0.95) 0%, rgba(0,8,16,0.4) 40%, transparent 100%)",
                }}
              />

              {/* Expand icon */}
              <div
                className="absolute inset-0 flex items-center justify-center transition-all duration-300 z-10"
                style={{ opacity: isHovered ? 1 : 0 }}
              >
                <div
                  className="p-3 rounded-lg border border-[#00ffe1]/40 bg-black/60 backdrop-blur-md"
                  style={{ boxShadow: "0 0 20px rgba(0,255,225,0.3), inset 0 0 10px rgba(0,255,225,0.05)" }}
                >
                  <Maximize2 className="h-5 w-5 text-[#00ffe1]" />
                </div>
              </div>

              {imageCount > 1 && (
                <div className="absolute bottom-3 right-3 z-20 px-2 py-0.5 rounded border border-[#b400ff]/30 bg-black/60 backdrop-blur-sm">
                  <span className="text-[9px] font-mono text-[#b400ff]/90 tracking-widest">{imageCount}×VAR</span>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 gap-2 text-[#00ffe1]/20">
              <ImageIcon className="h-10 w-10" />
              <span className="text-[9px] font-mono tracking-[0.3em] uppercase">OFFLINE</span>
            </div>
          )}
        </div>

        {/* Card content */}
        <div className="px-4 py-3 relative z-10">
          {/* Data label row */}
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[8px] font-mono text-[#00ffe1]/30 tracking-[0.2em] uppercase">
              ID::{String(item.id).toUpperCase().slice(0, 8)}
            </span>
            <span className="text-[8px] font-mono text-[#b400ff]/50 tracking-widest">●●●</span>
          </div>
          <h3 className="font-bold text-white/90 font-mono tracking-wider text-[11px] sm:text-xs mb-1">
            {item.title}
          </h3>
          <p className="text-[10px] sm:text-[11px] text-white/35 leading-relaxed font-mono">
            {item.description}
          </p>
          {/* Bottom scanline bar */}
          <div className="mt-3 h-px w-full bg-gradient-to-r from-transparent via-[#00ffe1]/20 to-transparent" />
        </div>
      </div>
    </div>
  )
}

// ─── Modal ────────────────────────────────────────────────────────────

function HoloModal({ item, onClose }: { item: MediaItem; onClose: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const allImages = item.images.length > 0 ? item.images : [item.thumbnail || ""]
  const validImages = allImages.filter(Boolean)
  const hasMultiple = validImages.length > 1

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setCurrentIndex((p) => (p + 1) % validImages.length)
      if (e.key === "ArrowLeft") setCurrentIndex((p) => (p - 1 + validImages.length) % validImages.length)
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [validImages.length, onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
      style={{ background: "rgba(0,4,10,0.96)", backdropFilter: "blur(16px)" }}
      onClick={onClose}
    >
      {/* Grid bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(rgba(0,255,225,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,225,0.4) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl rounded-lg border border-[#00ffe1]/15 bg-[#04080f] overflow-hidden flex flex-col max-h-[93vh]"
        style={{ animation: "revealUp 0.22s cubic-bezier(0.16,1,0.3,1) both", boxShadow: "0 0 60px rgba(0,255,225,0.06), 0 0 120px rgba(180,0,255,0.04)" }}
      >
        <ScanlineOverlay />
        <CornerBrackets color="#00ffe1" size={18} />

        {/* Top glow line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00ffe1]/60 to-transparent" style={{ boxShadow: "0 0 12px rgba(0,255,225,0.6)" }} />

        {/* Header */}
        <div className="flex-none flex items-center justify-between px-5 py-4 border-b border-[#00ffe1]/08">
          <div className="flex items-center gap-4">
            {/* Status indicator */}
            <div className="flex items-center gap-2 px-3 py-1 rounded border border-[#00ffe1]/20 bg-[#00ffe1]/05">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ffe1] animate-pulse" style={{ boxShadow: "0 0 6px rgba(0,255,225,0.8)" }} />
              <span className="text-[9px] font-mono text-[#00ffe1] tracking-[0.25em]">TRANSMITTING</span>
            </div>
            <div>
              <p className="text-[9px] font-mono text-[#b400ff]/60 tracking-widest mb-0.5 uppercase">
                Neural Render // {String(item.id).toUpperCase()}
              </p>
              <h3 className="text-sm sm:text-base font-mono font-bold text-white tracking-wider">
                {item.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded border border-white/08 bg-white/03 hover:border-[#00ffe1]/30 hover:text-[#00ffe1] text-white/40 transition-all duration-200 font-mono text-[10px] tracking-widest flex items-center gap-1.5"
          >
            <X className="h-4 w-4" />
            <span className="hidden sm:inline">ESC</span>
          </button>
        </div>

        {/* Image area */}
        <div className="flex-1 relative min-h-0 flex items-center justify-center p-4 sm:p-6 bg-black/60">
          {validImages.length > 0 ? (
            <SmartImage
              key={currentIndex}
              src={validImages[currentIndex]}
              alt={`${item.title} — ${currentIndex + 1}`}
              className="max-w-full max-h-[58vh] sm:max-h-[66vh] object-contain rounded"
            />
          ) : (
            <div className="flex flex-col items-center gap-3 text-[#00ffe1]/20">
              <ImageIcon className="h-14 w-14" />
              <span className="font-mono text-xs tracking-widest">NO_SIGNAL</span>
            </div>
          )}

          {/* Nav arrows */}
          {hasMultiple && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); setCurrentIndex((p) => (p - 1 + validImages.length) % validImages.length) }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded border border-[#00ffe1]/15 bg-black/70 backdrop-blur-md flex items-center justify-center hover:border-[#00ffe1]/50 hover:text-[#00ffe1] text-white/40 transition-all"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setCurrentIndex((p) => (p + 1) % validImages.length) }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded border border-[#00ffe1]/15 bg-black/70 backdrop-blur-md flex items-center justify-center hover:border-[#00ffe1]/50 hover:text-[#00ffe1] text-white/40 transition-all"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {/* Counter */}
          {hasMultiple && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded border border-white/08 bg-black/70 backdrop-blur-sm">
              <span className="text-[9px] font-mono text-[#00ffe1]/60 tracking-[0.2em]">
                FRAME {String(currentIndex + 1).padStart(2, "0")} / {String(validImages.length).padStart(2, "0")}
              </span>
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {validImages.length > 1 && (
          <div className="flex-none flex justify-center gap-2 p-3 sm:p-4 border-t border-[#00ffe1]/08 bg-black/40 overflow-x-auto">
            {validImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className="relative flex-shrink-0 h-12 w-12 sm:h-14 sm:w-14 rounded overflow-hidden border transition-all duration-300"
                style={{
                  borderColor: idx === currentIndex ? "rgba(0,255,225,0.6)" : "rgba(255,255,255,0.06)",
                  opacity: idx === currentIndex ? 1 : 0.35,
                  boxShadow: idx === currentIndex ? "0 0 10px rgba(0,255,225,0.3)" : "none",
                }}
              >
                <img src={img} alt={`Thumb ${idx + 1}`} loading="lazy" className="w-full h-full object-cover" />
                {idx === currentIndex && (
                  <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#00ffe1]" style={{ boxShadow: "0 0 6px rgba(0,255,225,0.8)" }} />
                )}
              </button>
            ))}
          </div>
        )}

        {/* Bottom data bar */}
        <div className="flex-none flex items-center justify-between px-4 py-2 border-t border-white/04 bg-black/60">
          <span className="text-[8px] font-mono text-white/15 tracking-[0.2em]">NEURAL_CGI::RENDER_ENGINE_v4</span>
          <span className="text-[8px] font-mono text-[#b400ff]/40 tracking-[0.15em]">RES:4K // FPS:60 // AI_DIFFUSION</span>
        </div>
      </div>
    </div>
  )
}

// ─── Tab Button ───────────────────────────────────────────────────────

function TabButton({ cat, isActive, onClick }: { cat: Category; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="relative flex-shrink-0 flex items-center gap-2 px-4 sm:px-5 py-2.5 text-[9px] sm:text-[10px] font-mono tracking-[0.2em] uppercase transition-all duration-250"
      style={{
        color: isActive ? "#00ffe1" : "rgba(255,255,255,0.3)",
        background: isActive ? "rgba(0,255,225,0.04)" : "transparent",
        borderBottom: isActive ? "1px solid rgba(0,255,225,0.5)" : "1px solid transparent",
      }}
    >
      {isActive && (
        <span
          className="w-1 h-1 rounded-full bg-[#00ffe1]"
          style={{ boxShadow: "0 0 6px rgba(0,255,225,1)", animation: "pulse 1.5s infinite" }}
        />
      )}
      {cat.icon}
      <span>{cat.name}</span>
    </button>
  )
}

// ─── Main Component ───────────────────────────────────────────────────

export function GalleryCatalogoRopa() {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)
  const [activeTab, setActiveTab] = useState("catalogo-producto")
  const [displayedTab, setDisplayedTab] = useState("catalogo-producto")
  const [isChangingTab, setIsChangingTab] = useState(false)

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
  const activeCategory = categories.find((c) => c.id === displayedTab)

  const handleTabChange = (id: string) => {
    if (id === activeTab) return
    setIsChangingTab(true)
    setTimeout(() => {
      setActiveTab(id)
      setDisplayedTab(id)
      setIsChangingTab(false)
    }, 180)
  }

  return (
    <section
      id="catalogo-ropa"
      className="relative py-16 sm:py-24 overflow-hidden"
      style={{ background: "#03050c" }}
    >
      {/* Global keyframes */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0 }
          100% { background-position: 200% 0 }
        }
        @keyframes revealUp {
          from { opacity: 0; transform: translateY(22px) scale(0.98) }
          to { opacity: 1; transform: translateY(0) scale(1) }
        }
        @keyframes glitch {
          0%, 100% { clip-path: none; transform: none }
          20% { clip-path: polygon(0 15%, 100% 15%, 100% 25%, 0 25%); transform: translate(-2px, 0) }
          40% { clip-path: polygon(0 60%, 100% 60%, 100% 75%, 0 75%); transform: translate(2px, 0) }
          60% { clip-path: none; transform: none }
        }
        @keyframes scanDown {
          0% { transform: translateY(-100%) }
          100% { transform: translateY(100vh) }
        }
        @keyframes borderPulse {
          0%, 100% { opacity: 0.15 }
          50% { opacity: 0.4 }
        }
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@400;600;700&display=swap');
      `}</style>

      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(rgba(0,255,225,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,225,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Radial glows */}
        <div className="absolute top-0 left-1/3 w-[600px] h-[400px] rounded-full blur-[140px]" style={{ background: "rgba(0,200,180,0.04)" }} />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] rounded-full blur-[120px]" style={{ background: "rgba(180,0,255,0.05)" }} />
        {/* Diagonal accent line */}
        <div
          className="absolute top-0 right-0 w-[1px] h-full opacity-10"
          style={{ background: "linear-gradient(to bottom, transparent, #00ffe1, transparent)", animation: "borderPulse 4s ease infinite" }}
        />
      </div>

      {/* Scan beam */}
      <div
        className="absolute left-0 right-0 h-[1px] pointer-events-none z-10 opacity-20"
        style={{
          background: "linear-gradient(90deg, transparent, #00ffe1, transparent)",
          animation: "scanDown 8s linear infinite",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-14" style={{ animation: "revealUp 0.7s cubic-bezier(0.16,1,0.3,1) both" }}>
          {/* System label */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded border border-[#00ffe1]/20 bg-[#00ffe1]/04 mb-6" style={{ boxShadow: "0 0 20px rgba(0,255,225,0.06)" }}>
            <Zap className="h-3 w-3 text-[#00ffe1]" />
            <span className="text-[9px] font-mono text-[#00ffe1] tracking-[0.35em] uppercase">
              SYSTEM::VISUAL_AI // MÓDULO_ACTIVO
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ffe1] animate-pulse" style={{ boxShadow: "0 0 8px rgba(0,255,225,0.9)" }} />
          </div>

          <h2
            className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 leading-none tracking-tight"
            style={{ fontFamily: "'Rajdhani', sans-serif", letterSpacing: "-0.02em" }}
          >
            <GlitchText text="IMÁGENES" className="text-white" />
            <br />
            <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(0,255,225,0.5)" }}>
              CON{" "}
            </span>
            <span
              className="text-transparent"
              style={{
                WebkitTextFillColor: "transparent",
                WebkitTextStroke: "0px",
                background: "linear-gradient(90deg, #00ffe1 0%, #b400ff 60%, #00ffe1 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
              }}
            >
              IA GENERATIVA
            </span>
          </h2>

          {/* Subtitle with terminal style */}
          <div className="inline-flex items-start gap-2 mt-2">
            <span className="text-[#00ffe1]/40 font-mono text-xs mt-0.5">$</span>
            <p className="text-white/35 max-w-xl text-[11px] sm:text-xs leading-relaxed font-mono text-left">
              Fotografía comercial, modelaje y CGI generativo. Elimina costos de estudio tradicional — crea campañas hiperrealistas impulsadas por Inteligencia Artificial.
            </p>
          </div>
        </div>

        {/* Tab bar — styled as terminal tabs */}
        <div
          className="flex border-b border-[#00ffe1]/10 mb-3 overflow-x-auto"
          style={{ animation: "revealUp 0.5s ease both 0.1s" }}
        >
          {/* Left indicator */}
          <div className="flex-none flex items-center pr-4 border-r border-[#00ffe1]/08 mr-2">
            <span className="text-[8px] font-mono text-[#00ffe1]/30 tracking-[0.25em] whitespace-nowrap">SYS:GALLERY</span>
          </div>
          {categories.map((cat) => (
            <TabButton
              key={cat.id}
              cat={cat}
              isActive={activeTab === cat.id}
              onClick={() => handleTabChange(cat.id)}
            />
          ))}
        </div>

        {/* Category description */}
        {activeCategory && (
          <p
            className="text-[9px] sm:text-[10px] font-mono text-[#00ffe1]/25 tracking-[0.2em] uppercase mb-8"
            style={{ animation: "revealUp 0.3s ease both" }}
          >
            <span className="text-[#b400ff]/50 mr-2">//</span>
            {activeCategory.description}
          </p>
        )}

        {/* Grid */}
        <div style={{ opacity: isChangingTab ? 0 : 1, transition: "opacity 0.18s ease" }}>
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-5">
            {activeCategory?.items.map((item, index) => (
              <HoloCard
                key={`${displayedTab}-${item.id}`}
                item={item}
                index={index}
                onClick={() => setSelectedItem(item)}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 sm:mt-20 text-center" style={{ animation: "revealUp 0.6s ease both 0.3s" }}>
          {/* Label above */}
          <p className="text-[9px] font-mono text-white/20 tracking-[0.3em] uppercase mb-4">
            INICIAR_PROTOCOLO::CAMPAÑA_IA
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 font-mono text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#00ffe1] overflow-hidden rounded transition-all duration-300"
            style={{
              border: "1px solid rgba(0,255,225,0.3)",
              background: "rgba(0,255,225,0.03)",
              boxShadow: "0 0 20px rgba(0,255,225,0.08), inset 0 0 20px rgba(0,255,225,0.02)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.boxShadow = "0 0 40px rgba(0,255,225,0.2), inset 0 0 30px rgba(0,255,225,0.05)"
              el.style.borderColor = "rgba(0,255,225,0.6)"
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.boxShadow = "0 0 20px rgba(0,255,225,0.08), inset 0 0 20px rgba(0,255,225,0.02)"
              el.style.borderColor = "rgba(0,255,225,0.3)"
            }}
          >
            {/* Sweep animation */}
            <span
              className="absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-700 pointer-events-none"
              style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,225,0.08), transparent)" }}
            />
            <CornerBrackets color="#00ffe1" size={8} />
            <Zap className="relative z-10 h-4 w-4 group-hover:animate-pulse" />
            <span className="relative z-10 font-bold">CREAR MI CAMPAÑA IA</span>
            <span className="relative z-10 text-[#00ffe1]/40">▶</span>
          </a>

          {/* Data footnote */}
          <p className="mt-4 text-[8px] font-mono text-white/12 tracking-[0.2em]">
            CONEXIÓN SEGURA // WhatsApp::{WHATSAPP_NUMBER} // LATENCIA:~0ms
          </p>
        </div>
      </div>

      {/* Modal */}
      {selectedItem && <HoloModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </section>
  )
}