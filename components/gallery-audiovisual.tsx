"use client"

import { useState, useRef, useEffect, MouseEvent } from "react"
import {
  Play,
  Video,
  Sparkles,
  MessageCircle,
  X,
  Film,
  Smartphone,
  Monitor,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Maximize2,
} from "lucide-react"

type MediaItem = {
  id: number
  title: string
  description: string
  type: "image" | "video"
  url: string
  thumbnail: string
  duration?: string
}

type SubCategory = {
  id: string
  name: string
  icon: any
  aspect: "vertical" | "horizontal"
  items: MediaItem[]
}

type MainCategory = {
  id: string
  name: string
  icon: any
  description: string
  subcategories: SubCategory[]
}

const VISIBLE_COUNT = 6

const categories: MainCategory[] = [
  {
    id: "sin-ia",
    name: "Sin IA",
    icon: Video,
    description: "Producción audiovisual tradicional con equipo profesional",
    subcategories: [
      {
        id: "vertical-sin-ia",
        name: "Formato Vertical",
        icon: Smartphone,
        aspect: "vertical",
        items: [
          { id: 1, title: "Lanzamiento Urbano | Concepto", description: "Pieza audiovisual disruptiva con iluminación dual (Rojo/Azul) en set de alto contraste. Uso de utilería urbana (máscara de humo) y acción dinámica para promocionar un lanzamiento masivo de mercancía con actitud agresiva", type: "video", url: "/twinz.mp4", thumbnail: "/twinz.mp4", duration: "0:42" },
          { id: 2, title: "Zume | Sneaker Focus", description: "Pieza audiovisual conceptual dirigida a exaltar las raíces y la cultura del asfalto. Dirección de arte enfocada en cómo la indumentaria define nuestra identidad.", type: "video", url: "/ZUME.mp4", thumbnail: "/ZUME.mp4", duration: "0:22" },
          { id: 3, title: "Oxxo | Urban Styling Concept", description: "Dirección creativa de video de styling. Uso de locaciones cotidianas para crear una estética urbana cruda y conectar la moda con el estilo de vida de la calle.", type: "video", url: "/OXXO.mp4", thumbnail: "/OXXO.mp4", duration: "0:37" },
          { id: 4, title: "Exhibición de Zapatos | Transiciones Dinámicas", description: "Creación de contenido orgánico en tendencia diseñado para alta retención (Reels/TikTok). Uso de modelaje estático y transiciones invisibles en cámara para destacar la rotación de modelos de calzado con un ritmo visual magnético.", type: "video", url: "/ZAPATOST.mp4", thumbnail: "/ZAPATOST.mp4", duration: "0:16" },
          { id: 5, title: "Cultura de Barbería | Fashion Film Retro B/N", description: "Pieza audiovisual en blanco y negro orientada a conectar el streetwear con las raíces de la cultura urbana. Dirección de arte en locación real, donde la acción del corte de cabello (grooming) complementa la exhibición orgánica de las prendas, aportando una estética cruda, nostálgica y auténtica a la marca", type: "video", url: "/Barbería.mp4", thumbnail: "/Barbería.mp4", duration: "0:27" },
          { id: 6, title: "Editorial Old Money | Campaña Cinematográfica VHS", description: "Fashion film guionizado con estética retro (formato VHS) grabado en locación costera. Dirección de arte, actuación y estilismo orientados a transmitir lujo, nostalgia y la exclusividad del estilo de vida 'Old Money'.", type: "video", url: "/oldmoney.mp4", thumbnail: "/oldmoney.mp4", duration: "0:23" },
          { id: 7, title: "Centro | Raíces & Cultura", description: "Pieza audiovisual conceptual dirigida a exaltar las raíces y la cultura del asfalto. Dirección de arte enfocada en cómo la indumentaria define nuestra identidad.", type: "video", url: "/CENTRO.mp4", thumbnail: "/CENTRO.mp4", duration: "0:23" },
          { id: 8, title: "Mac One | Experiencia de Tienda.", description: "Dirección audiovisual para el evento de lanzamiento de la tienda física. Captura dinámica de la experiencia del cliente (Retail Experience) para transmitir la atmósfera de la marca y consolidar el 'hype' de la comunidad.", type: "video", url: "/TIENDA.mp4", thumbnail: "/TIENDA.mp4", duration: "0:39" },
          { id: 9, title: "Mac One | Discolandia Fashion Film", description: "Dirección y producción audiovisual en locación histórica (tienda de vinilos LP). Storytelling visual diseñado para conectar la herencia cultural con la identidad de la marca.", type: "video", url: "/DISCOLANDIA.mp4", thumbnail: "DISCOLANDIA.mp4", duration: "0:41" },
          { id: 10, title: "Mac One | Street Medallo Editorial", description: "Fashion film producido en las calles de Medellín. Cinematografía dinámica enfocada en el modelaje urbano para exhibir el fit y fluidez de las prendas en su entorno natural.", type: "video", url: "/STREETMEDALLO.mp4", thumbnail: "/STREETMEDALLO.mp4", duration: "0:16" },
          { id: 11, title: "Estudio Marenco | Dirección Creativa Comercial", description: "Participación en la dirección y producción de un spot comercial en entorno de estudio profesional. Enfoque técnico en iluminación, diseño de set y ángulos de cámara para elevar el valor visual del espacio.", type: "video", url: "/SPOTMARENCO.mp4", thumbnail: "/SPOTMARENCO.mp4", duration: "0:27" },
          { id: 12, title: "Perspectiva Ojo de Pez | Estética Urbana", description: "Producción audiovisual dinámica utilizando un lente súper gran angular (Ojo de Pez). Esta técnica de distorsión visual aporta un carácter rebelde e inmersivo al video, rompiendo los esquemas tradicionales para destacar la indumentaria de forma creativa y atractiva para el público joven.", type: "video", url: "/KEVINOP.mp4", thumbnail: "/KEVINOP.mp4", duration: "0:26" },
        ],
      },
      {
        id: "horizontal-sin-ia",
        name: "Formato Horizontal",
        icon: Monitor,
        aspect: "horizontal",
        items: [
          { id: 1, title: "Video Corporativo", description: "Producción profesional", type: "video", url: "", thumbnail: "", duration: "" },
          { id: 2, title: "Spot Publicitario", description: "Campaña de marca", type: "video", url: "", thumbnail: "", duration: "" },
        ],
      },
    ],
  },
  {
    id: "con-ia",
    name: "Con IA",
    icon: Sparkles,
    description: "Contenido potenciado con inteligencia artificial",
    subcategories: [
      {
        id: "vertical-con-ia",
        name: "Formato Vertical",
        icon: Smartphone,
        aspect: "vertical",
        items: [
          { id: 1, title: "Cepillo Dispensador para Mascotas | CGI y Simulación de Fluidos(IA)", description: "Visualización comercial generada con Inteligencia Artificial para un innovador cepillo de baño con dispensador de jabón para perros. Integración de simulaciones hiperrealistas de agua y dinámicas de fluidos para destacar la funcionalidad del producto, logrando un acabado de nivel televisivo sin necesidad de rodaje físico.", type: "video", url: "/cepillo .mp4", thumbnail: "/cepillo .mp4", duration: "0:15" },
          { id: 2, title: "Avatares Hiperrealistas y Efectos Visuales con (IA)", description: "Campaña de belleza impulsada al 100% por Inteligencia Artificial. Generación de modelos digitales con texturas de piel fotorrealistas e integración de efectos visuales (trazos de luz) para ilustrar conceptualmente los beneficios en la piel.", type: "video", url: "/1002.mp4", thumbnail: "/1002.mp4", duration: "0:08" },
          { id: 3, title: "Producto 3D | Render Fotorrealista (IA)", description: "Visualización de producto en 3D generada por IA con iluminación de estudio hiperrealista.", type: "video", url: "", thumbnail: "", duration: "0:10" },
        ],
      },
      {
        id: "horizontal-con-ia",
        name: "Formato Horizontal",
        icon: Monitor,
        aspect: "horizontal",
        items: [
          { id: 1, title: "Visualizer Musical | Animación Generativa (IA)", description: "Dirección de arte y animación mediante Inteligencia Artificial para la industria musical (formato Visualizer / Spotify Canvas). Transformación de un concepto estático en una escena de suspenso inmersiva con estética 'retro-slasher' e iluminación cinematográfica, ideal para elevar el lanzamiento de sencillos y retener la atención en plataformas de streaming.", type: "video", url: "/0930.mp4", thumbnail: "/0930.mp4", duration: "0:15" },
          { id: 2, title: "Videoclip Musical Urbano | Cinematografía Generativa (IA)", description: "Dirección y desarrollo de un videoclip oficial completo para el género Rap/Hip-Hop, renderizado 100% mediante Inteligencia Artificial. Creación de una atmósfera hiperrealista y cruda con iluminación nocturna, efectos atmosféricos (humo, luces de ciudad) y una narrativa visual coherente (storytelling).", type: "video", url: "", thumbnail: "", duration: "" },
          { id: 3, title: "Animación IA | Brand Film", description: "Campaña de belleza impulsada al 100% por Inteligencia Artificial. Generación de modelos digitales con texturas de piel fotorrealistas.", type: "video", url: "", thumbnail: "", duration: "" },
        ],
      },
    ],
  },
]

const WHATSAPP_NUMBER = "573043819731"
const WHATSAPP_MESSAGE =
  "🎬 ¡Hola Jesus! 👋 Me interesa tu servicio de *Producción Audiovisual* 🎥✨ Quiero crear contenido profesional para mi marca. ¿Podemos hablar sobre mi proyecto? 🚀📞"

// ── Thumbnail Card ────────────────────────────────────────────────────

function ThumbnailCard({
  item,
  aspect,
  isActive,
  index,
  onClick,
}: {
  item: MediaItem
  aspect: "vertical" | "horizontal"
  isActive: boolean
  index: number
  onClick: () => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0.1
    }
  }, [])

  const hasContent = item.url || item.thumbnail
  const aspectClass = aspect === "vertical" ? "aspect-[9/16]" : "aspect-video"

  return (
    <button
      onClick={onClick}
      className={`group relative w-full rounded-lg overflow-hidden transition-all duration-300 text-left ${
        isActive
          ? "ring-2 ring-purple-500 ring-offset-2 ring-offset-[#07080d] scale-[0.98]"
          : "hover:ring-1 hover:ring-purple-500/40 hover:scale-[0.99]"
      }`}
    >
      <div className={`${aspectClass} relative bg-[#0a0b10]`}>
        {hasContent ? (
          <>
            <video
              ref={videoRef}
              src={item.url || item.thumbnail}
              muted
              playsInline
              preload="metadata"
              onLoadedMetadata={(e) => {
                (e.currentTarget as HTMLVideoElement).currentTime = 0.1
              }}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            {isActive && (
              <div className="absolute inset-0 bg-purple-500/10" />
            )}
            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isActive ? "bg-purple-500/80" : "bg-black/50 backdrop-blur-sm border border-white/20"}`}>
                <Play className="h-3.5 w-3.5 text-white ml-0.5" />
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#0d0e16]">
            <div className="text-center space-y-1.5">
              <Video className="h-4 w-4 text-white/15 mx-auto" />
              <span className="text-[9px] font-mono text-white/15 tracking-widest uppercase block">Próximamente</span>
            </div>
          </div>
        )}

        {/* Duration */}
        {item.duration && (
          <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-sm">
            <span className="text-[9px] font-mono text-white/60">{item.duration}</span>
          </div>
        )}

        {/* Index number */}
        <div className={`absolute top-1.5 left-1.5 w-5 h-5 rounded flex items-center justify-center text-[9px] font-mono font-bold transition-colors ${isActive ? "bg-purple-500 text-white" : "bg-black/60 text-white/40"}`}>
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      {/* Title below thumbnail */}
      <div className="p-2 bg-[#0a0b10]/80">
        <p className={`text-[10px] font-mono truncate transition-colors ${isActive ? "text-purple-400" : "text-white/40 group-hover:text-white/60"}`}>
          {item.title.split("|")[0].trim()}
        </p>
      </div>
    </button>
  )
}

// ── Main Feature Player ───────────────────────────────────────────────

function FeaturePlayer({
  item,
  aspect,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
}: {
  item: MediaItem
  aspect: "vertical" | "horizontal"
  onNext: () => void
  onPrev: () => void
  hasNext: boolean
  hasPrev: boolean
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setPlaying(false)
    setProgress(0)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }, [item])

  const togglePlay = () => {
    if (!videoRef.current || !item.url) return
    if (playing) {
      videoRef.current.pause()
      setPlaying(false)
    } else {
      videoRef.current.play()
      setPlaying(true)
    }
  }

  const handleTimeUpdate = () => {
    if (!videoRef.current) return
    const p = (videoRef.current.currentTime / videoRef.current.duration) * 100
    setProgress(isNaN(p) ? 0 : p)
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    videoRef.current.currentTime = ratio * videoRef.current.duration
  }

  const hasContent = !!item.url

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Video wrapper — centers a vertical 9:16 on desktop */}
      <div className="relative flex-1 flex items-center justify-center bg-black rounded-xl overflow-hidden group">
        {hasContent ? (
          <>
            <video
              ref={videoRef}
              key={item.url}
              src={item.url}
              muted={muted}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setPlaying(false)}
              className={`h-full ${aspect === "vertical" ? "w-auto max-w-full" : "w-full"} object-contain`}
            />

            {/* Subtle blur bg for vertical vids on desktop */}
            {aspect === "vertical" && (
              <video
                src={item.url}
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-20 blur-2xl scale-110 pointer-events-none"
                ref={(el) => {
                  if (el) {
                    el.currentTime = videoRef.current?.currentTime || 0
                    if (playing) el.play().catch(() => {})
                    else el.pause()
                  }
                }}
              />
            )}

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Center play / pause on click */}
            <button
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center z-10"
            >
              {!playing && (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white/30 bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-purple-500/30 hover:border-purple-400/60 transition-all duration-300 hover:scale-110">
                  <Play className="h-7 w-7 sm:h-8 sm:h-8 text-white ml-1" />
                </div>
              )}
            </button>

            {/* Controls bar */}
            <div className="absolute bottom-0 left-0 right-0 z-20 px-4 pb-4 pt-12 bg-gradient-to-t from-black/80 to-transparent">
              {/* Progress bar */}
              <div
                className="w-full h-1 bg-white/20 rounded-full cursor-pointer mb-3 hover:h-1.5 transition-all"
                onClick={handleSeek}
              >
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={togglePlay}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-purple-500/30 border border-white/10 hover:border-purple-400/40 transition-all"
                  >
                    {playing ? (
                      <span className="flex gap-0.5 px-0.5">
                        <span className="w-0.5 h-3 bg-white rounded-full" />
                        <span className="w-0.5 h-3 bg-white rounded-full" />
                      </span>
                    ) : (
                      <Play className="h-3 w-3 text-white ml-0.5" />
                    )}
                  </button>
                  <button
                    onClick={() => setMuted(!muted)}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 transition-all"
                  >
                    {muted ? (
                      <VolumeX className="h-3 w-3 text-white/60" />
                    ) : (
                      <Volume2 className="h-3 w-3 text-white/60" />
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={onPrev}
                    disabled={!hasPrev}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-purple-500/20 border border-white/10 disabled:opacity-30 transition-all"
                  >
                    <ChevronLeft className="h-3 w-3 text-white" />
                  </button>
                  <button
                    onClick={onNext}
                    disabled={!hasNext}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-purple-500/20 border border-white/10 disabled:opacity-30 transition-all"
                  >
                    <ChevronRight className="h-3 w-3 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Coming soon state */
          <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-center">
                <Video className="h-7 w-7 text-white/15" />
              </div>
              <div className="absolute inset-0 rounded-2xl border border-purple-500/20 animate-ping opacity-30" />
            </div>
            <div className="text-center space-y-1">
              <p className="text-xs font-mono text-white/20 tracking-widest uppercase">Próximamente</p>
              <p className="text-[10px] font-mono text-white/10">Contenido en producción</p>
            </div>
          </div>
        )}
      </div>

      {/* Info below player */}
      <div className="mt-3 sm:mt-4 space-y-1.5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm sm:text-base font-bold text-white font-mono leading-tight truncate">
              {item.title}
            </h3>
          </div>
          {item.duration && (
            <span className="shrink-0 text-[10px] font-mono text-purple-400/70 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded">
              {item.duration}
            </span>
          )}
        </div>
        <p className="text-xs text-white/30 leading-relaxed line-clamp-2">
          {item.description}
        </p>
      </div>
    </div>
  )
}

// ── Tab Button ────────────────────────────────────────────────────────

function TabButton({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean
  onClick: () => void
  icon: any
  label: string
}) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg font-mono text-[10px] sm:text-xs tracking-wider uppercase transition-all duration-300 ${
        active
          ? "text-white bg-gradient-to-r from-purple-600/80 to-purple-500/60 border border-purple-400/40 shadow-[0_0_20px_rgba(168,85,247,0.2)]"
          : "text-white/30 border border-white/[0.06] bg-white/[0.02] hover:text-white/50 hover:border-white/[0.1]"
      }`}
    >
      <Icon className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${active ? "text-purple-200" : ""}`} />
      {label}
    </button>
  )
}

// ── Gallery Audiovisual ───────────────────────────────────────────────

export function GalleryAudiovisual() {
  const [activeMainTab, setActiveMainTab] = useState("sin-ia")
  const [activeSubTab, setActiveSubTab] = useState("vertical-sin-ia")
  const [activeIndex, setActiveIndex] = useState(0)
  const [showAll, setShowAll] = useState(false)

  const currentCategory = categories.find((c) => c.id === activeMainTab)
  const currentSubcategory = currentCategory?.subcategories.find((s) => s.id === activeSubTab)
  const allItems = currentSubcategory?.items || []
  const visibleItems = showAll ? allItems : allItems.slice(0, VISIBLE_COUNT)
  const activeItem = allItems[activeIndex] || allItems[0]
  const aspect = currentSubcategory?.aspect || "vertical"

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  const handleMainTabChange = (id: string) => {
    setActiveMainTab(id)
    setActiveIndex(0)
    setShowAll(false)
    const cat = categories.find((c) => c.id === id)
    if (cat) setActiveSubTab(cat.subcategories[0].id)
  }

  const handleSubTabChange = (id: string) => {
    setActiveSubTab(id)
    setActiveIndex(0)
    setShowAll(false)
  }

  const handleNext = () => {
    if (activeIndex < allItems.length - 1) setActiveIndex(activeIndex + 1)
  }

  const handlePrev = () => {
    if (activeIndex > 0) setActiveIndex(activeIndex - 1)
  }

  const hasMore = allItems.length > VISIBLE_COUNT

  return (
    <section id="galeria-audiovisual" className="relative py-16 sm:py-24 bg-[#07080d] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-[600px] h-[500px] bg-purple-600/[0.04] rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-cyan-500/[0.03] rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        {/* Scan line effect */}
        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(168,85,247,0.08) 3px, rgba(168,85,247,0.08) 4px)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/[0.06] mb-5 sm:mb-6">
            <Film className="h-3 w-3 text-purple-400" />
            <span className="text-[10px] sm:text-xs font-mono text-purple-400 tracking-widest uppercase">
              Audiovisual
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 font-mono tracking-tight">
            Producción{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              Audiovisual
            </span>
          </h2>
          <p className="text-white/35 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed">
            Galería de videos con producción tradicional y potenciada con IA
          </p>
        </div>

        {/* ── Main Tabs ── */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-4 sm:mb-5">
          {categories.map((cat) => (
            <TabButton
              key={cat.id}
              active={activeMainTab === cat.id}
              onClick={() => handleMainTabChange(cat.id)}
              icon={cat.icon}
              label={cat.name}
            />
          ))}
        </div>

        {/* ── Sub Tabs ── */}
        {currentCategory && (
          <div className="flex justify-center gap-2 mb-8 sm:mb-10">
            {currentCategory.subcategories.map((sub) => (
              <TabButton
                key={sub.id}
                active={activeSubTab === sub.id}
                onClick={() => handleSubTabChange(sub.id)}
                icon={sub.icon}
                label={sub.name}
              />
            ))}
          </div>
        )}

        {/* ── MAIN LAYOUT ── */}
        {/* Mobile: stacked. Desktop: side-by-side feature + thumbnails */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

          {/* ── Feature Player (LEFT / TOP) ── */}
          <div className={`w-full ${aspect === "vertical" ? "lg:w-[340px] xl:w-[380px] shrink-0" : "lg:flex-1"}`}>
            {/* Player container — fixed height on desktop */}
            <div className={`w-full ${aspect === "vertical" ? "h-[520px] sm:h-[600px] lg:h-[640px]" : "h-[250px] sm:h-[340px] lg:h-[420px]"}`}>
              {activeItem && (
                <FeaturePlayer
                  item={activeItem}
                  aspect={aspect}
                  onNext={handleNext}
                  onPrev={handlePrev}
                  hasNext={activeIndex < allItems.length - 1}
                  hasPrev={activeIndex > 0}
                />
              )}
            </div>
          </div>

          {/* ── Thumbnails panel (RIGHT / BOTTOM) ── */}
          <div className="w-full lg:flex-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center gap-2">
                <div className="w-1 h-4 rounded-full bg-gradient-to-b from-purple-500 to-cyan-400" />
                <span className="text-[10px] sm:text-xs font-mono text-white/40 tracking-widest uppercase">
                  {allItems.length} Videos
                </span>
              </div>
              <span className="text-[10px] font-mono text-purple-400/60 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded">
                {String(activeIndex + 1).padStart(2, "0")} / {String(allItems.length).padStart(2, "0")}
              </span>
            </div>

            {/* Grid — vertical: more cols, horizontal: fewer */}
            <div
              className={`grid gap-2 sm:gap-3 ${
                aspect === "vertical"
                  ? "grid-cols-3 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5"
                  : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-3"
              }`}
            >
              {visibleItems.map((item, i) => (
                <ThumbnailCard
                  key={item.id}
                  item={item}
                  aspect={aspect}
                  isActive={i === activeIndex}
                  index={i}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>

            {/* Ver más / Ver menos */}
            {hasMore && (
              <div className="mt-4 text-center">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-[10px] tracking-wider uppercase border border-white/[0.08] bg-white/[0.02] text-white/30 hover:text-white/60 hover:border-purple-500/30 hover:bg-purple-500/[0.04] transition-all duration-300"
                >
                  {showAll ? "Ver menos" : `Ver más (${allItems.length - VISIBLE_COUNT} videos)`}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Separator line ── */}
        <div className="mt-12 sm:mt-16 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

        {/* ── CTA ── */}
        <div className="mt-10 sm:mt-12 text-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 font-mono text-xs sm:text-sm tracking-wider uppercase overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/15 to-cyan-500/15 border border-purple-500/30 transition-all duration-300 group-hover:from-purple-500/25 group-hover:to-cyan-500/25 group-hover:border-purple-400/50" />
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-purple-400/50 rounded-tl-xl" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400/50 rounded-br-xl" />
            <MessageCircle className="relative z-10 h-4 w-4 text-purple-400 group-hover:text-purple-300 transition-colors" />
            <span className="relative z-10 text-white/70 group-hover:text-white/90 transition-colors">
              Solicitar Producción
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}