"use client"

import { useState, useRef, useEffect } from "react"
import {
  Play, Video, Sparkles, MessageCircle,
  ChevronLeft, ChevronRight, Volume2, VolumeX,
  Smartphone, Monitor,
} from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────

type MediaItem = {
  id: number
  title: string
  shortTitle: string
  tag: string
  description: string
  url: string
  duration: string
}

type SubCategory = {
  id: string
  label: string
  aspect: "vertical" | "horizontal"
  items: MediaItem[]
}

type MainCategory = {
  id: string
  label: string
  icon: any
  subcategories: SubCategory[]
}

// ─── Data ─────────────────────────────────────────────────────────────

const categories: MainCategory[] = [
  {
    id: "sin-ia",
    label: "Sin IA",
    icon: Video,
    subcategories: [
      {
        id: "v-sin",
        label: "Vertical 9:16",
        aspect: "vertical",
        items: [
          { id: 1, shortTitle: "Lanzamiento Urbano", tag: "Concepto", title: "Lanzamiento Urbano | Concepto", description: "Iluminación dual Rojo/Azul. Set de alto contraste con utilería urbana.", url: "/twinz.mp4", duration: "0:42" },
          { id: 2, shortTitle: "Zume", tag: "Sneaker Focus", title: "Zume | Sneaker Focus", description: "Raíces y cultura del asfalto. La indumentaria como identidad.", url: "/ZUME.mp4", duration: "0:22" },
          { id: 3, shortTitle: "Oxxo", tag: "Urban Styling", title: "Oxxo | Urban Styling Concept", description: "Locaciones cotidianas con estética urbana cruda.", url: "/OXXO.mp4", duration: "0:37" },
          { id: 4, shortTitle: "Zapatos", tag: "Transiciones", title: "Exhibición de Zapatos | Transiciones Dinámicas", description: "Transiciones invisibles para alta retención en Reels/TikTok.", url: "/ZAPATOST.mp4", duration: "0:16" },
          { id: 5, shortTitle: "Barbería", tag: "Fashion Film B/N", title: "Cultura de Barbería | Fashion Film Retro B/N", description: "Blanco y negro. Grooming + streetwear. Estética cruda y nostálgica.", url: "/Barbería.mp4", duration: "0:27" },
          { id: 6, shortTitle: "Old Money", tag: "Editorial VHS", title: "Editorial Old Money | Campaña VHS", description: "Locación costera. Lujo, nostalgia y estilo de vida Old Money.", url: "/oldmoney.mp4", duration: "0:23" },
          { id: 7, shortTitle: "Centro", tag: "Raíces & Cultura", title: "Centro | Raíces & Cultura", description: "Cómo la indumentaria define la identidad en el asfalto.", url: "/CENTRO.mp4", duration: "0:23" },
          { id: 8, shortTitle: "Mac One Tienda", tag: "Retail Experience", title: "Mac One | Experiencia de Tienda", description: "Lanzamiento tienda física. Atmósfera de marca y hype comunitario.", url: "/TIENDA.mp4", duration: "0:39" },
          { id: 9, shortTitle: "Discolandia", tag: "Fashion Film", title: "Mac One | Discolandia Fashion Film", description: "Locación histórica. Herencia cultural + identidad de marca.", url: "/DISCOLANDIA.mp4", duration: "0:41" },
          { id: 10, shortTitle: "Street Medallo", tag: "Editorial", title: "Mac One | Street Medallo Editorial", description: "Calles de Medellín. Modelaje urbano y fluidez de prendas.", url: "/STREETMEDALLO.mp4", duration: "0:16" },
          { id: 11, shortTitle: "Marenco", tag: "Spot Comercial", title: "Estudio Marenco | Dirección Creativa", description: "Spot en estudio profesional. Iluminación y diseño de set.", url: "/SPOTMARENCO.mp4", duration: "0:27" },
          { id: 12, shortTitle: "Ojo de Pez", tag: "Estética Urbana", title: "Perspectiva Ojo de Pez | Estética Urbana", description: "Lente gran angular. Distorsión rebelde e inmersiva.", url: "/KEVINOP.mp4", duration: "0:26" },
        ],
      },
      {
        id: "h-sin",
        label: "Horizontal 16:9",
        aspect: "horizontal",
        items: [
          { id: 1, shortTitle: "Video Corporativo", tag: "Corporativo", title: "Video Corporativo", description: "Producción profesional de alto nivel.", url: "", duration: "" },
          { id: 2, shortTitle: "Spot Publicitario", tag: "Campaña", title: "Spot Publicitario", description: "Campaña de marca impactante.", url: "", duration: "" },
        ],
      },
    ],
  },
  {
    id: "con-ia",
    label: "Con IA",
    icon: Sparkles,
    subcategories: [
      {
        id: "v-con",
        label: "Vertical 9:16",
        aspect: "vertical",
        items: [
          { id: 1, shortTitle: "Cepillo Mascotas", tag: "CGI + Fluidos", title: "Cepillo Dispensador | CGI y Fluidos (IA)", description: "Simulaciones hiperrealistas de agua. Nivel televisivo sin rodaje.", url: "/cepillo .mp4", duration: "0:15" },
          { id: 2, shortTitle: "Avatares IA", tag: "Beauty Campaign", title: "Avatares Hiperrealistas | Efectos Visuales (IA)", description: "Modelos digitales fotorrealistas. Trazos de luz sobre la piel.", url: "/1002.mp4", duration: "0:08" },
          { id: 3, shortTitle: "Próximamente", tag: "En producción", title: "Próximamente", description: "Nuevo contenido en producción.", url: "", duration: "" },
        ],
      },
      {
        id: "h-con",
        label: "Horizontal 16:9",
        aspect: "horizontal",
        items: [
          { id: 1, shortTitle: "Visualizer Musical", tag: "Animación Generativa", title: "Visualizer Musical | Animación Generativa (IA)", description: "Estética retro-slasher. Cinematografía IA para streaming.", url: "/0930.mp4", duration: "0:15" },
          { id: 2, shortTitle: "Videoclip Hip-Hop", tag: "Videoclip IA", title: "Videoclip Musical Urbano | Cinematografía Generativa (IA)", description: "Videoclip 100% IA. Atmósfera nocturna hiperrealista.", url: "", duration: "" },
          { id: 3, shortTitle: "Brand Film IA", tag: "Brand Film", title: "Brand Film | Animación IA", description: "Campaña de marca generada por inteligencia artificial.", url: "", duration: "" },
        ],
      },
    ],
  },
]

const WHATSAPP_NUMBER = "573043819731"
const WHATSAPP_MESSAGE = "🎬 ¡Hola Jesus! 👋 Me interesa tu servicio de *Producción Audiovisual* 🎥✨ Quiero crear contenido profesional para mi marca. ¿Podemos hablar sobre mi proyecto? 🚀📞"

// ─── Canvas Thumbnail Hook ─────────────────────────────────────────────
// Extrae el primer frame real usando un <video> + <canvas> ocultos — sin precargar el archivo completo

function useVideoThumbnail(src: string) {
  const [thumb, setThumb] = useState<string | null>(null)
  const [loading, setLoading] = useState(!!src)

  useEffect(() => {
    if (!src) { setLoading(false); setThumb(null); return }
    setLoading(true)
    setThumb(null)

    const video = document.createElement("video")
    video.muted = true
    video.playsInline = true
    video.preload = "metadata"
    video.crossOrigin = "anonymous"

    const onSeeked = () => {
      try {
        const canvas = document.createElement("canvas")
        canvas.width = video.videoWidth || 360
        canvas.height = video.videoHeight || 640
        canvas.getContext("2d")?.drawImage(video, 0, 0, canvas.width, canvas.height)
        setThumb(canvas.toDataURL("image/jpeg", 0.75))
      } catch (_) {}
      setLoading(false)
      video.src = ""
    }

    video.addEventListener("seeked", onSeeked, { once: true })
    video.addEventListener("error", () => setLoading(false), { once: true })
    video.addEventListener("loadedmetadata", () => { video.currentTime = 0.5 }, { once: true })
    video.src = src

    return () => { video.src = "" }
  }, [src])

  return { thumb, loading }
}

// ─── Thumbnail Card ────────────────────────────────────────────────────

function ThumbCard({ item, aspect, isActive, index, onClick }: {
  item: MediaItem; aspect: "vertical" | "horizontal"; isActive: boolean; index: number; onClick: () => void
}) {
  const { thumb, loading } = useVideoThumbnail(item.url)

  return (
    <button onClick={onClick}
      className={`group relative w-full text-left focus:outline-none transition-all duration-200 ${isActive ? "scale-[0.96]" : "hover:scale-[0.98]"}`}>
      <div className={`relative overflow-hidden rounded-xl ${aspect === "vertical" ? "aspect-[9/16]" : "aspect-video"}
        ${isActive ? "ring-2 ring-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.35)]" : "ring-1 ring-white/[0.06] group-hover:ring-white/20"}`}>

        {item.url ? (
          <>
            {/* Shimmer skeleton */}
            {loading && (
              <div className="absolute inset-0 bg-[#0f0f18]">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="h-full w-full animate-[shimmer_1.4s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" style={{ transform: "translateX(-100%)" }} />
                </div>
              </div>
            )}
            {/* Thumbnail image — instant once generated */}
            {thumb && (
              <img src={thumb} alt={item.shortTitle}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            )}
            {!thumb && !loading && (
              <div className="w-full h-full bg-[#0f0f18] flex items-center justify-center">
                <Video className="h-4 w-4 text-white/10" />
              </div>
            )}

            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            {isActive && <div className="absolute inset-0 bg-violet-600/10" />}

            {/* Play icon */}
            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isActive ? "bg-violet-500 shadow-[0_0_16px_rgba(139,92,246,0.5)]" : "bg-black/60 border border-white/25"}`}>
                <Play className="h-3.5 w-3.5 text-white ml-0.5" />
              </div>
            </div>

            {/* Duration */}
            {item.duration && (
              <div className="absolute bottom-1.5 right-1.5 bg-black/80 backdrop-blur-sm px-1.5 py-px rounded text-[9px] font-mono text-white/65">
                {item.duration}
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-[#0f0f18] flex flex-col items-center justify-center gap-1.5">
            <Video className="h-4 w-4 text-white/10" />
            <span className="text-[8px] font-mono text-white/15 uppercase tracking-widest">Soon</span>
          </div>
        )}

        {/* Index number */}
        <div className={`absolute top-1.5 left-1.5 w-5 h-5 rounded text-[9px] font-bold font-mono flex items-center justify-center transition-colors ${isActive ? "bg-violet-500 text-white" : "bg-black/70 text-white/25"}`}>
          {index + 1}
        </div>
      </div>

      {/* Label */}
      <div className="mt-1.5 px-0.5">
        <p className={`text-[10px] font-mono leading-snug truncate transition-colors ${isActive ? "text-violet-400" : "text-white/35 group-hover:text-white/55"}`}>
          {item.shortTitle}
        </p>
        <p className="text-[8px] text-white/15 mt-0.5 truncate">{item.tag}</p>
      </div>
    </button>
  )
}

// ─── Feature Player ────────────────────────────────────────────────────

function FeaturePlayer({ item, aspect, totalCount, activeIdx, onPrev, onNext }: {
  item: MediaItem; aspect: "vertical" | "horizontal"; totalCount: number; activeIdx: number; onPrev: () => void; onNext: () => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const { thumb } = useVideoThumbnail(item.url)
  const isVertical = aspect === "vertical"

  useEffect(() => {
    setPlaying(false); setProgress(0)
    if (videoRef.current) { videoRef.current.pause(); videoRef.current.load() }
  }, [item.url])

  const togglePlay = () => {
    if (!videoRef.current || !item.url) return
    if (playing) { videoRef.current.pause(); setPlaying(false) }
    else { videoRef.current.play(); setPlaying(true) }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Player box */}
      <div className={`relative flex-1 rounded-2xl overflow-hidden bg-[#020204] flex items-center justify-center
        ${isVertical ? "min-h-[460px] sm:min-h-[540px] lg:min-h-[580px]" : "min-h-[200px] sm:min-h-[300px] lg:min-h-[360px]"}`}>

        {item.url ? (
          <>
            {/* Blurred bg for vertical */}
            {isVertical && thumb && (
              <img src={thumb} alt="" className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-20 pointer-events-none" />
            )}
            {isVertical && <div className="absolute inset-0 bg-black/50 pointer-events-none" />}

            {/* Video — preload=none for speed, uses poster thumbnail */}
            <video
              ref={videoRef}
              key={item.url}
              src={item.url}
              poster={thumb || undefined}
              muted={muted}
              playsInline
              preload="none"
              onTimeUpdate={() => {
                if (!videoRef.current) return
                const p = (videoRef.current.currentTime / videoRef.current.duration) * 100
                setProgress(isNaN(p) ? 0 : p)
              }}
              onEnded={() => setPlaying(false)}
              className={`relative z-10 ${isVertical ? "h-full w-auto max-w-full" : "w-full h-full object-contain"}`}
            />

            {/* Click to play */}
            <button onClick={togglePlay} className="absolute inset-0 z-20 flex items-center justify-center group/play">
              {!playing && (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/50 border-2 border-white/25 flex items-center justify-center backdrop-blur-sm
                  group-hover/play:bg-violet-500/50 group-hover/play:border-violet-400/70 group-hover/play:scale-110 transition-all duration-300
                  shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                  <Play className="h-7 w-7 sm:h-8 sm:w-8 text-white ml-1 drop-shadow-lg" />
                </div>
              )}
            </button>

            {/* Controls */}
            <div className="absolute bottom-0 left-0 right-0 z-30 px-4 pb-4 pt-14 bg-gradient-to-t from-black/95 via-black/40 to-transparent">
              {/* Seek bar */}
              <div
                onClick={(e) => {
                  if (!videoRef.current || !item.url) return
                  const rect = e.currentTarget.getBoundingClientRect()
                  videoRef.current.currentTime = ((e.clientX - rect.left) / rect.width) * videoRef.current.duration
                }}
                className="w-full h-1 bg-white/15 rounded-full cursor-pointer mb-3 hover:h-1.5 transition-all duration-150 group/seek"
              >
                <div className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full transition-none" style={{ width: `${progress}%` }} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <button onClick={togglePlay} className="p-1.5 sm:p-2 rounded-lg bg-white/10 hover:bg-violet-500/30 border border-white/[0.08] transition-all">
                    {playing
                      ? <span className="flex gap-[3px] px-0.5"><span className="w-[3px] h-3 bg-white rounded-sm"/><span className="w-[3px] h-3 bg-white rounded-sm"/></span>
                      : <Play className="h-3 w-3 text-white ml-0.5" />}
                  </button>
                  <button onClick={() => setMuted(m => !m)} className="p-1.5 sm:p-2 rounded-lg bg-white/10 border border-white/[0.08] hover:bg-white/20 transition-all">
                    {muted ? <VolumeX className="h-3 w-3 text-white/50" /> : <Volume2 className="h-3 w-3 text-white/60" />}
                  </button>
                  {item.duration && <span className="text-[10px] font-mono text-white/35 ml-1">{item.duration}</span>}
                </div>

                <div className="flex items-center gap-1">
                  <button onClick={onPrev} disabled={activeIdx === 0}
                    className="p-1.5 sm:p-2 rounded-lg bg-white/10 border border-white/[0.08] hover:bg-violet-500/20 disabled:opacity-20 disabled:cursor-not-allowed transition-all">
                    <ChevronLeft className="h-3 w-3 text-white" />
                  </button>
                  <span className="text-[10px] font-mono text-white/25 w-10 text-center">{activeIdx + 1}/{totalCount}</span>
                  <button onClick={onNext} disabled={activeIdx === totalCount - 1}
                    className="p-1.5 sm:p-2 rounded-lg bg-white/10 border border-white/[0.08] hover:bg-violet-500/20 disabled:opacity-20 disabled:cursor-not-allowed transition-all">
                    <ChevronRight className="h-3 w-3 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Coming soon */
          <div className="flex flex-col items-center gap-5 p-8 text-center">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-center">
                <Video className="h-8 w-8 text-white/10" />
              </div>
              <div className="absolute inset-0 rounded-2xl border border-violet-500/20 animate-ping opacity-20" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-mono text-white/20 tracking-widest uppercase">Próximamente</p>
              <p className="text-[10px] text-white/10">Contenido en producción</p>
            </div>
          </div>
        )}
      </div>

      {/* Info below player */}
      <div className="mt-4 space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-mono uppercase tracking-widest text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded-full">
            {item.tag}
          </span>
        </div>
        <h3 className="text-sm sm:text-[15px] font-bold text-white leading-snug" style={{ fontFamily: "'Syne', sans-serif" }}>
          {item.title}
        </h3>
        <p className="text-[11px] text-white/30 leading-relaxed line-clamp-2">{item.description}</p>
      </div>
    </div>
  )
}

// ─── Main Export ───────────────────────────────────────────────────────

export function GalleryAudiovisual() {
  const [activeMain, setActiveMain] = useState("sin-ia")
  const [activeSub, setActiveSub] = useState("v-sin")
  const [activeIdx, setActiveIdx] = useState(0)
  const [showAll, setShowAll] = useState(false)
  const VISIBLE = 8

  const cat = categories.find(c => c.id === activeMain)!
  const sub = cat.subcategories.find(s => s.id === activeSub)!
  const items = sub.items
  const visibleItems = showAll ? items : items.slice(0, VISIBLE)
  const activeItem = items[activeIdx] ?? items[0]

  const handleMainChange = (id: string) => {
    setActiveMain(id)
    const c = categories.find(c => c.id === id)!
    setActiveSub(c.subcategories[0].id)
    setActiveIdx(0); setShowAll(false)
  }

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
        @keyframes shimmer {
          0% { transform: translateX(-100%) }
          100% { transform: translateX(200%) }
        }
      `}</style>

      <section id="galeria-audiovisual" className="relative py-16 sm:py-24 bg-[#060709] overflow-hidden">
        {/* Ambient */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 left-1/3 w-[600px] h-[600px] bg-violet-800/[0.06] rounded-full blur-[140px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-700/[0.04] rounded-full blur-[110px]" />
          <div className="absolute inset-0 opacity-[0.015]"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px)", backgroundSize: "44px 44px" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Header ── */}
          <div className="mb-10 sm:mb-12">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-violet-400/60 tracking-widest uppercase mb-3">
                  <span className="w-5 h-px bg-gradient-to-r from-violet-500 to-transparent" />
                  Portafolio Audiovisual
                </div>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-none" style={{ fontFamily: "'Syne', sans-serif" }}>
                  Producción
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 mt-1">
                    Audiovisual
                  </span>
                </h2>
              </div>

              {/* Main tabs */}
              <div className="flex gap-2 shrink-0 self-start sm:self-auto">
                {categories.map(c => {
                  const Icon = c.icon
                  const active = activeMain === c.id
                  return (
                    <button key={c.id} onClick={() => handleMainChange(c.id)}
                      className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full font-mono text-[11px] tracking-wider uppercase transition-all duration-300 ${
                        active
                          ? "bg-gradient-to-r from-violet-600 to-violet-500 text-white shadow-[0_0_30px_rgba(139,92,246,0.3)]"
                          : "bg-white/[0.04] text-white/30 border border-white/[0.06] hover:text-white/50 hover:bg-white/[0.07]"
                      }`}>
                      <Icon className="h-3 w-3" />{c.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Sub tabs */}
            <div className="flex gap-2 mt-5">
              {cat.subcategories.map(s => {
                const Icon = s.aspect === "vertical" ? Smartphone : Monitor
                const active = activeSub === s.id
                return (
                  <button key={s.id}
                    onClick={() => { setActiveSub(s.id); setActiveIdx(0); setShowAll(false) }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-[10px] tracking-wider uppercase transition-all duration-300 ${
                      active
                        ? "text-violet-400 border border-violet-500/30 bg-violet-500/[0.08]"
                        : "text-white/22 border border-white/[0.05] bg-white/[0.02] hover:text-white/38"
                    }`}>
                    <Icon className="h-3 w-3" />{s.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* ── LAYOUT ── */}
          <div className={`flex gap-5 lg:gap-7 ${sub.aspect === "vertical" ? "flex-col lg:flex-row" : "flex-col"}`}>

            {/* Feature player */}
            <div className={`shrink-0 ${sub.aspect === "vertical" ? "w-full lg:w-[300px] xl:w-[320px]" : "w-full"}`}>
              <FeaturePlayer
                item={activeItem}
                aspect={sub.aspect}
                totalCount={items.length}
                activeIdx={activeIdx}
                onPrev={() => setActiveIdx(i => Math.max(0, i - 1))}
                onNext={() => setActiveIdx(i => Math.min(items.length - 1, i + 1))}
              />
            </div>

            {/* Thumbnails panel */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-3.5 rounded-full bg-gradient-to-b from-violet-500 to-cyan-400" />
                  <span className="text-[10px] font-mono text-white/25 uppercase tracking-widest">Lista</span>
                  <span className="text-[10px] font-mono text-violet-400/55 bg-violet-500/[0.08] border border-violet-500/15 px-2 py-px rounded-full">{items.length}</span>
                </div>
                <span className="hidden sm:block text-[9px] font-mono text-white/15 tracking-wide">
                  Click para seleccionar · {activeIdx + 1}/{items.length}
                </span>
              </div>

              <div className={`grid gap-2.5 sm:gap-3 ${
                sub.aspect === "vertical"
                  ? "grid-cols-3 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5"
                  : "grid-cols-2 sm:grid-cols-3 xl:grid-cols-4"
              }`}>
                {visibleItems.map((item, i) => (
                  <ThumbCard key={item.id} item={item} aspect={sub.aspect}
                    isActive={i === activeIdx} index={i} onClick={() => setActiveIdx(i)} />
                ))}
              </div>

              {items.length > VISIBLE && (
                <button onClick={() => setShowAll(v => !v)}
                  className="mt-4 w-full py-2.5 rounded-xl border border-white/[0.06] bg-white/[0.015] text-[10px] font-mono text-white/25
                    hover:text-white/50 hover:border-violet-500/20 hover:bg-violet-500/[0.04] transition-all duration-300 tracking-widest uppercase">
                  {showAll ? "↑ Ver menos" : `↓ Ver ${items.length - VISIBLE} videos más`}
                </button>
              )}
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="mt-14 sm:mt-16 h-px bg-gradient-to-r from-transparent via-violet-500/15 to-transparent" />

          {/* ── CTA ── */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="text-xs font-mono text-white/22 tracking-wide">¿Listo para crear contenido profesional?</p>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2.5 px-7 py-3 rounded-xl font-mono text-xs tracking-wider uppercase hover:scale-105 transition-transform duration-300 overflow-hidden">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600/18 to-cyan-500/12 border border-violet-500/32
                group-hover:from-violet-600/28 group-hover:to-cyan-500/22 group-hover:border-violet-400/55 transition-all duration-300" />
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-violet-400/55 rounded-tl-xl" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400/55 rounded-br-xl" />
              <MessageCircle className="relative z-10 h-4 w-4 text-violet-400 group-hover:text-violet-300 transition-colors" />
              <span className="relative z-10 text-white/65 group-hover:text-white/90 transition-colors">Solicitar Producción</span>
            </a>
          </div>

        </div>
      </section>
    </>
  )
}