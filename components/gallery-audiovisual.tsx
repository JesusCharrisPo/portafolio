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
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

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
          { id: 1, title: "Reel 1", description: "Producción profesional", type: "video", url: "", thumbnail: "", duration: "" },
          { id: 2, title: "Mac One | Discolandia Fashion Film", description: "Dirección y producción audiovisual en locación histórica (tienda de vinilos LP). Storytelling visual diseñado para conectar la herencia cultural con la identidad de la marca.", type: "video", url: "/DISCOLANDIA.mp4", thumbnail: "DISCOLANDIA.mp4", duration: "0:41" },
          { id: 3, title: "Reel 3", description: "Campaña publicitaria", type: "video", url: "", thumbnail: "", duration: "" },
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
          { id: 1, title: "Reel IA 1", description: "Generado con IA", type: "video", url: "", thumbnail: "", duration: "" },
          { id: 2, title: "Reel IA 2", description: "Animación IA", type: "video", url: "", thumbnail: "", duration: "" },
        ],
      },
      {
        id: "horizontal-con-ia",
        name: "Formato Horizontal",
        icon: Monitor,
        aspect: "horizontal",
        items: [
          { id: 1, title: "Video IA", description: "Producción con IA", type: "video", url: "", thumbnail: "", duration: "" },
          { id: 2, title: "Animación IA", description: "Motion graphics IA", type: "video", url: "", thumbnail: "", duration: "" },
        ],
      },
    ],
  },
]

const WHATSAPP_NUMBER = "573019132001"
const WHATSAPP_MESSAGE =
  "🎬 ¡Hola Jesus! 👋 Me interesa tu servicio de *Producción Audiovisual* 🎥✨ Quiero crear contenido profesional para mi marca. ¿Podemos hablar sobre mi proyecto? 🚀📞"

// ─── Media Card with Spotlight ────────────────────────────────────────

function MediaCard({
  item,
  index,
  aspect,
  onClick,
}: {
  item: MediaItem
  index: number
  aspect: "vertical" | "horizontal"
  onClick: () => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setSpotlightPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const hasContent = item.thumbnail || item.url
  const aspectClass = aspect === "vertical" ? "aspect-[9/16]" : "aspect-video"

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="relative group cursor-pointer"
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
              <img
                src={item.thumbnail || item.url}
                alt={item.title}
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
    </motion.div>
  )
}

// ─── Tab Button ───────────────────────────────────────────────────────

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
        {active && (
          <motion.div
            layoutId="activeTabGlow"
            className="absolute inset-0 rounded-lg border border-purple-500/10"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
      </button>
      {/* Tooltip */}
      {tooltip && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black/80 border border-white/10 text-[9px] font-mono text-white/50 whitespace-nowrap opacity-0 group-hover/tab:opacity-100 transition-opacity duration-300 pointer-events-none hidden sm:block">
          {tooltip}
        </div>
      )}
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────

export function GalleryAudiovisual() {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)
  const [activeMainTab, setActiveMainTab] = useState("sin-ia")
  const [activeSubTab, setActiveSubTab] = useState("vertical-sin-ia")

  const currentCategory = categories.find((c) => c.id === activeMainTab)
  const currentSubcategory = currentCategory?.subcategories.find((s) => s.id === activeSubTab)

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  const handleMainTabChange = (id: string) => {
    setActiveMainTab(id)
    const cat = categories.find((c) => c.id === id)
    if (cat) setActiveSubTab(cat.subcategories[0].id)
  }

  const getGridClass = () => {
    if (currentSubcategory?.aspect === "vertical") {
      return "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4"
    }
    return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
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
        </motion.div>

        {/* ── Main Tabs (Sin IA / Con IA) ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex justify-center gap-2 sm:gap-3 mb-4 sm:mb-6"
        >
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
        </motion.div>

        {/* ── Category description ── */}
        <AnimatePresence mode="wait">
          {currentCategory && (
            <motion.p
              key={currentCategory.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-white/25 text-[11px] sm:text-xs font-mono mb-5 sm:mb-6"
            >
              {currentCategory.description}
            </motion.p>
          )}
        </AnimatePresence>

        {/* ── Sub Tabs (Vertical / Horizontal) ── */}
        {currentCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center gap-2 mb-4 sm:mb-5"
          >
            {currentCategory.subcategories.map((sub) => (
              <TabButton
                key={sub.id}
                active={activeSubTab === sub.id}
                onClick={() => setActiveSubTab(sub.id)}
                icon={sub.icon}
                label={sub.name}
                tooltip={sub.aspect === "vertical" ? "Reels en formato 9:16" : "Videos en formato 16:9"}
              />
            ))}
          </motion.div>
        )}

        {/* ── Guide text ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center gap-1.5 mb-6 sm:mb-8"
        >
          <Info className="h-3 w-3 text-white/20" />
          <p className="text-[10px] sm:text-xs font-mono text-white/20 text-center">
            Selecciona una categoría y haz click en cualquier video para reproducirlo
          </p>
        </motion.div>

        {/* ── Grid ── */}
        <AnimatePresence mode="wait">
          {currentSubcategory && (
            <motion.div
              key={currentSubcategory.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={getGridClass()}
            >
              {currentSubcategory.items.map((item, index) => (
                <MediaCard
                  key={item.id}
                  item={item}
                  index={index}
                  aspect={currentSubcategory.aspect}
                  onClick={() => (item.url || item.thumbnail) && setSelectedItem(item)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-10 sm:mt-14 text-center"
        >
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 font-mono text-xs sm:text-sm tracking-wider uppercase overflow-hidden"
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/15 to-cyan-500/15 border border-purple-500/30 transition-all duration-300 group-hover:from-purple-500/25 group-hover:to-cyan-500/25 group-hover:border-purple-400/50" />
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-purple-400/50 rounded-tl-xl" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400/50 rounded-br-xl" />

            <MessageCircle className="relative z-10 h-4 w-4 text-purple-400 group-hover:text-purple-300 transition-colors" />
            <span className="relative z-10 text-white/70 group-hover:text-white/90 transition-colors">
              Solicitar Producción
            </span>
          </a>
        </motion.div>

        {/* ── Video Modal ── */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-sm"
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-4xl rounded-xl sm:rounded-2xl border border-white/[0.08] bg-[#0c0d14]/95 backdrop-blur-xl overflow-hidden"
              >
                {/* Top glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

                {/* Header */}
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

                {/* Video */}
                <div className="p-4 sm:p-5">
                  <video
                    src={selectedItem.url}
                    controls
                    autoPlay
                    className="w-full rounded-lg border border-white/[0.06]"
                  />
                </div>

                {/* Corner decorations */}
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-purple-500/15 rounded-tr-2xl" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-purple-500/15 rounded-bl-2xl" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}