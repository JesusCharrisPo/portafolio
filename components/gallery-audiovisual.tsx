"use client"

import { useState, useRef, MouseEvent } from "react"
import {
  Play,
  ImageIcon,
  Video,
  Sparkles,
  MessageCircle,
  X,
  Film,
  Smartphone,
  Monitor,
  Info,
  ChevronDown,
  ChevronUp,
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
          { id: 3, title: "Avatares Hiperrealistas y Efectos Visuales con (IA)", description: "Campaña de belleza impulsada al 100% por Inteligencia Artificial. Generación de modelos digitales con texturas de piel fotorrealistas e integración de efectos visuales (trazos de luz) para ilustrar conceptualmente los beneficios en la piel.", type: "video", url: "/1002.mp4", thumbnail: "/1002.mp4", duration: "0:08" },
        ],
      },
      {
        id: "horizontal-con-ia",
        name: "Formato Horizontal",
        icon: Monitor,
        aspect: "horizontal",
        items: [
          { id: 1, title: "Visualizer Musical | Animación Generativa (IA)", description: "Dirección de arte y animación mediante Inteligencia Artificial para la industria musical (formato Visualizer / Spotify Canvas). Transformación de un concepto estático en una escena de suspenso inmersiva con estética 'retro-slasher' e iluminación cinematográfica, ideal para elevar el lanzamiento de sencillos y retener la atención en plataformas de streaming.", type: "video", url: "/0930.mp4", thumbnail: "/0930.mp4", duration: "0:15" },
          { id: 2, title: "Videoclip Musical Urbano | Cinematografía Generativa (IA)", description: "Dirección y desarrollo de un videoclip oficial completo para el género Rap/Hip-Hop, renderizado 100% mediante Inteligencia Artificial. Creación de una atmósfera hiperrealista y cruda con iluminación nocturna, efectos atmosféricos (humo, luces de ciudad) y una narrativa visual coherente (storytelling). Esta pieza demuestra la capacidad de sustituir rodajes de alto presupuesto, entregando un producto cinematográfico que conecta perfectamente con la estética de la calle.", type: "video", url: "", thumbnail: "", duration: "" },
          { id: 3, title: "Animación IA", description: "Campaña de belleza impulsada al 100% por Inteligencia Artificial. Generación de modelos digitales con texturas de piel fotorrealistas e integración de efectos visuales (trazos de luz) para ilustrar conceptualmente los beneficios en la piel.", type: "video", url: "", thumbnail: "", duration: "" },
        ],
      },
    ],
  },
]

const WHATSAPP_NUMBER = "573019132001"
const WHATSAPP_MESSAGE =
  "🎬 ¡Hola Jesus! 👋 Me interesa tu servicio de *Producción Audiovisual* 🎥✨ Quiero crear contenido profesional para mi marca. ¿Podemos hablar sobre mi proyecto? 🚀📞"

// ─── Media Card with Spotlight (Limpia sin Framer Motion) ─────────────

function MediaCard({
  item,
  aspect,
  onClick,
}: {
  item: MediaItem
  index: number
  aspect: "vertical" | "horizontal"
  onClick: () => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setSpotlightPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    // Seek to first frame to ensure thumbnail is visible
    if (videoRef.current) {
      videoRef.current.currentTime = 0.1
    }
  }

  const hasContent = item.thumbnail || item.url
  const aspectClass = aspect === "vertical" ? "aspect-[9/16]" : "aspect-video"

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="relative group cursor-pointer transition-transform duration-300 hover:-translate-y-1"
    >
      {/* Spotlight outer glow */}
      <div
        className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: isHovered
            ? `radial-gradient(200px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(168,85,247,0.2), transparent 60%)`
            : "none",
        }}
      />

      <div className="relative rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden transition-all duration-500 group-hover:border-purple-500/20">
        {/* Inner spotlight */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: `radial-gradient(150px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(168,85,247,0.05), transparent 60%)`,
            }}
          />
        )}

        {/* Thumbnail area */}
        <div className={`${aspectClass} relative bg-[#0a0b10] flex items-center justify-center overflow-hidden`}>
          {hasContent ? (
            <>
              {/* ── VIDEO THUMBNAIL (reemplaza <img>) ── */}
              <video
                ref={videoRef}
                src={item.url || item.thumbnail}
                muted
                playsInline
                preload="metadata"
                // Seek slightly past 0 so browsers render the first frame
                onLoadedMetadata={(e) => {
                  (e.currentTarget as HTMLVideoElement).currentTime = 0.1
                }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080d] via-transparent to-transparent opacity-60" />

              {/* Play button */}
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-purple-500/30 bg-purple-500/[0.1] backdrop-blur-sm flex items-center justify-center group-hover:border-purple-400/50 group-hover:bg-purple-500/[0.2] group-hover:scale-110 transition-all duration-300">
                    <Play className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400 ml-0.5 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg border border-white/[0.06] bg-white/[0.02] flex items-center justify-center">
                <Video className="h-5 w-5 text-white/20" />
              </div>
              <span className="text-[10px] font-mono text-white/20 tracking-widest uppercase">
                Próximamente
              </span>
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.04) 2px, rgba(255,255,255,0.04) 4px)",
                }}
              />
            </div>
          )}

          {/* Duration badge */}
          {item.duration && (
            <div className="absolute bottom-2 right-2 z-10 px-2 py-0.5 rounded-md border border-white/[0.1] bg-black/60 backdrop-blur-sm">
              <span className="text-[10px] font-mono text-white/60 tracking-wider">
                {item.duration}
              </span>
            </div>
          )}

          {/* Format badge */}
          <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-md border border-purple-500/20 bg-black/40 backdrop-blur-sm">
            <span className="text-[9px] font-mono text-purple-400/70 tracking-wider uppercase">
              {aspect === "vertical" ? "9:16" : "16:9"}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-3 space-y-1">
          <h3 className="text-xs sm:text-sm font-semibold text-white/80 font-mono truncate group-hover:text-white transition-colors">
            {item.title}
          </h3>
          <p className="text-[10px] sm:text-xs text-white/30 truncate">{item.description}</p>
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-purple-500/0 group-hover:border-purple-500/20 transition-colors duration-500" />
        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-purple-500/0 group-hover:border-purple-500/20 transition-colors duration-500" />
      </div>
    </div>
  )
}

// ─── Tab Button (Ligero) ──────────────────────────────────────────────

function TabButton({
  active,
  onClick,
  icon: Icon,
  label,
  tooltip,
}: {
  active: boolean
  onClick: () => void
  icon: any
  label: string
  tooltip?: string
}) {
  return (
    <div className="relative group/tab">
      <button
        onClick={onClick}
        className={`relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg font-mono text-[10px] sm:text-xs tracking-wider uppercase transition-all duration-300 ${
          active
            ? "text-purple-400 border border-purple-500/30 bg-purple-500/[0.08]"
            : "text-white/30 border border-white/[0.06] bg-white/[0.02] hover:text-white/50 hover:border-white/[0.1]"
        }`}
      >
        <Icon className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${active ? "drop-shadow-[0_0_6px_rgba(168,85,247,0.3)]" : ""}`} />
        {label}
      </button>
      {/* Tooltip */}
      {tooltip && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black/80 border border-white/10 text-[9px] font-mono text-white/50 whitespace-nowrap opacity-0 group-hover/tab:opacity-100 transition-opacity duration-300 pointer-events-none hidden sm:block z-20">
          {tooltip}
        </div>
      )}
    </div>
  )
}

// ─── Main Component (Ligero) ──────────────────────────────────────────

export function GalleryAudiovisual() {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)
  const [activeMainTab, setActiveMainTab] = useState("sin-ia")
  const [activeSubTab, setActiveSubTab] = useState("vertical-sin-ia")
  const [showAll, setShowAll] = useState(false)

  const currentCategory = categories.find((c) => c.id === activeMainTab)
  const currentSubcategory = currentCategory?.subcategories.find((s) => s.id === activeSubTab)

  const allItems = currentSubcategory?.items || []
  const visibleItems = showAll ? allItems : allItems.slice(0, VISIBLE_COUNT)
  const hasMore = allItems.length > VISIBLE_COUNT

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  const handleMainTabChange = (id: string) => {
    setActiveMainTab(id)
    setShowAll(false)
    const cat = categories.find((c) => c.id === id)
    if (cat) setActiveSubTab(cat.subcategories[0].id)
  }

  const handleSubTabChange = (id: string) => {
    setActiveSubTab(id)
    setShowAll(false)
  }

  const getGridClass = () => {
    if (currentSubcategory?.aspect === "vertical") {
      return "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 animate-in fade-in duration-500"
    }
    return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 animate-in fade-in duration-500"
  }

  return (
    <section id="galeria-audiovisual" className="relative py-16 sm:py-24 bg-[#07080d] overflow-hidden">
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[500px] bg-purple-600/[0.03] rounded-full blur-[100px] sm:blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[400px] bg-cyan-500/[0.03] rounded-full blur-[80px] sm:blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <div className="text-center mb-10 sm:mb-14 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-purple-500/20 bg-purple-500/[0.05] mb-4 sm:mb-6">
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

          <p className="text-white/35 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed px-4">
            Galería de videos con producción tradicional y potenciada con IA
          </p>
        </div>

        {/* ── Main Tabs (Sin IA / Con IA) ── */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          {categories.map((cat) => (
            <TabButton
              key={cat.id}
              active={activeMainTab === cat.id}
              onClick={() => handleMainTabChange(cat.id)}
              icon={cat.icon}
              label={cat.name}
              tooltip={cat.id === "sin-ia" ? "Videos grabados con equipo profesional" : "Videos creados con inteligencia artificial"}
            />
          ))}
        </div>

        {/* ── Category description ── */}
        {currentCategory && (
          <p className="text-center text-white/25 text-[11px] sm:text-xs font-mono mb-5 sm:mb-6 animate-in fade-in duration-300">
            {currentCategory.description}
          </p>
        )}

        {/* ── Sub Tabs (Vertical / Horizontal) ── */}
        {currentCategory && (
          <div className="flex justify-center gap-2 mb-4 sm:mb-5 animate-in fade-in duration-300">
            {currentCategory.subcategories.map((sub) => (
              <TabButton
                key={sub.id}
                active={activeSubTab === sub.id}
                onClick={() => handleSubTabChange(sub.id)}
                icon={sub.icon}
                label={sub.name}
                tooltip={sub.aspect === "vertical" ? "Reels en formato 9:16" : "Videos en formato 16:9"}
              />
            ))}
          </div>
        )}

        {/* ── Guide text ── */}
        <div className="flex items-center justify-center gap-1.5 mb-6 sm:mb-8 animate-in fade-in duration-500">
          <Info className="h-3 w-3 text-white/20" />
          <p className="text-[10px] sm:text-xs font-mono text-white/20 text-center">
            Selecciona una categoría y haz click en cualquier video para reproducirlo
          </p>
        </div>

        {/* ── Grid ── */}
        {currentSubcategory && (
          <div key={activeSubTab} className={getGridClass()}>
            {visibleItems.map((item, index) => (
              <MediaCard
                key={item.id}
                item={item}
                index={index}
                aspect={currentSubcategory.aspect}
                onClick={() => (item.url || item.thumbnail) && setSelectedItem(item)}
              />
            ))}
          </div>
        )}

        {/* ── Ver más / Ver menos ── */}
        {hasMore && (
          <div className="mt-6 sm:mt-8 text-center animate-in fade-in duration-500">
            <button
              onClick={() => setShowAll(!showAll)}
              className="group relative inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-mono text-[10px] sm:text-xs tracking-wider uppercase transition-all duration-300 border border-white/[0.08] bg-white/[0.02] text-white/40 hover:text-white/70 hover:border-purple-500/30 hover:bg-purple-500/[0.05]"
            >
              {showAll ? (
                <>
                  <ChevronUp className="h-3.5 w-3.5 group-hover:text-purple-400 transition-colors" />
                  <span>Ver menos</span>
                </>
              ) : (
                <>
                  <ChevronDown className="h-3.5 w-3.5 group-hover:text-purple-400 transition-colors" />
                  <span>Ver más ({allItems.length - VISIBLE_COUNT} videos)</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* ── CTA ── */}
        <div className="mt-10 sm:mt-14 text-center">
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

        {/* ── Video Modal ── */}
        {selectedItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedItem(null)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl rounded-xl sm:rounded-2xl border border-white/[0.08] bg-[#0c0d14]/95 backdrop-blur-xl overflow-hidden animate-in zoom-in-95 duration-200"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg border border-purple-500/20 bg-purple-500/[0.08] flex items-center justify-center">
                    <Video className="h-4 w-4 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white font-mono">
                      {selectedItem.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-white/30">{selectedItem.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-white/50 hover:text-white hover:border-white/20 transition-all"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-4 sm:p-5">
                <video
                  src={selectedItem.url}
                  controls
                  autoPlay
                  className="w-full rounded-lg border border-white/[0.06] shadow-2xl"
                />
              </div>

              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-purple-500/15 rounded-tr-2xl" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-purple-500/15 rounded-bl-2xl" />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}