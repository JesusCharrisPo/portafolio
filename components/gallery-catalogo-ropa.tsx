"use client"

import { useState, useRef, MouseEvent } from "react"
import {
  ExternalLink,
  Play,
  ImageIcon,
  Sparkles,
  Camera,
  MessageCircle,
  X,
  Shirt,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type MediaItem = {
  id: number
  title: string
  description: string
  type: "image" | "video"
  url: string
  thumbnail: string
}

type Category = {
  id: string
  name: string
  icon: typeof Sparkles | typeof Camera
  description: string
  items: MediaItem[]
}

const categories: Category[] = [
  {
    id: "sin-ia",
    name: "Sin IA",
    icon: Camera,
    description: "Fotografía tradicional de moda y productos",
    items: [
      { id: 1, title: "Lookbook Verano", description: "Colección de temporada", type: "image", url: "", thumbnail: "" },
      { id: 2, title: "Sesión Estudio", description: "Fotografía de producto", type: "image", url: "", thumbnail: "" },
      { id: 3, title: "Catálogo Accesorios", description: "Complementos de moda", type: "image", url: "", thumbnail: "" },
      { id: 4, title: "Editorial Moda", description: "Sesión conceptual", type: "image", url: "", thumbnail: "" },
      { id: 5, title: "E-commerce Photos", description: "Para tienda online", type: "image", url: "", thumbnail: "" },
      { id: 6, title: "Flat Lay", description: "Composición de productos", type: "image", url: "", thumbnail: "" },
    ],
  },
  {
    id: "con-ia",
    name: "Con IA",
    icon: Sparkles,
    description: "Catálogo generado y mejorado con inteligencia artificial",
    items: [
      { id: 1, title: "Modelo Virtual", description: "Avatar generado con IA", type: "image", url: "", thumbnail: "" },
      { id: 2, title: "Cambio de Fondo IA", description: "Background swap", type: "image", url: "", thumbnail: "" },
      { id: 3, title: "Virtual Try-On", description: "Probador virtual", type: "image", url: "", thumbnail: "" },
      { id: 4, title: "Producto 3D IA", description: "Render generativo", type: "image", url: "", thumbnail: "" },
      { id: 5, title: "Variaciones IA", description: "Múltiples versiones", type: "image", url: "", thumbnail: "" },
      { id: 6, title: "Lookbook IA", description: "Colección generada", type: "image", url: "", thumbnail: "" },
    ],
  },
]

const WHATSAPP_NUMBER = "573019132001"
const WHATSAPP_MESSAGE =
  "👗 ¡Hola Jesus! 👋 Estoy interesado en crear un *Catálogo de Ropa* profesional 📸✨ Me gustaría conocer tus opciones con IA y fotografía tradicional. ¿Podemos conversar? 🚀💼"

// ─── Fashion Card with Spotlight ──────────────────────────────────────

function FashionCard({
  item,
  index,
  onClick,
}: {
  item: MediaItem
  index: number
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

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.45 }}
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
            ? `radial-gradient(180px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(236,72,153,0.15), transparent 60%)`
            : "none",
        }}
      />

      <div className="relative rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden transition-all duration-500 group-hover:border-pink-500/20">
        {/* Inner spotlight */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: `radial-gradient(150px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(236,72,153,0.04), transparent 60%)`,
            }}
          />
        )}

        {/* Image area — 3:4 fashion ratio */}
        <div className="aspect-[3/4] relative bg-[#0a0b10] flex items-center justify-center overflow-hidden">
          {hasContent ? (
            <>
              <img
                src={item.thumbnail || item.url}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080d] via-transparent to-transparent opacity-70" />

              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-pink-500/30 bg-pink-500/[0.1] backdrop-blur-sm flex items-center justify-center group-hover:border-pink-400/50 group-hover:bg-pink-500/[0.15] transition-all duration-300">
                    <Play className="h-4 w-4 sm:h-5 sm:w-5 text-pink-400 ml-0.5 drop-shadow-[0_0_8px_rgba(236,72,153,0.4)]" />
                  </div>
                </div>
              )}

              {/* Hover info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-10 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <h3 className="text-xs sm:text-sm font-bold text-white font-mono truncate">
                  {item.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-white/40 truncate mt-0.5">
                  {item.description}
                </p>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-lg border border-white/[0.06] bg-white/[0.02] flex items-center justify-center">
                <ImageIcon className="h-6 w-6 text-white/15" />
              </div>
              <span className="text-[10px] font-mono text-white/20 tracking-widest uppercase">
                Próximamente
              </span>
              {/* Scanlines */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.04) 2px, rgba(255,255,255,0.04) 4px)",
                }}
              />
            </div>
          )}

          {/* Index badge */}
          <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-md border border-white/[0.08] bg-black/40 backdrop-blur-sm">
            <span className="text-[9px] font-mono text-white/30 tracking-wider">
              {String(item.id).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-pink-500/0 group-hover:border-pink-500/20 transition-colors duration-500" />
        <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-pink-500/0 group-hover:border-pink-500/20 transition-colors duration-500" />
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
}: {
  active: boolean
  onClick: () => void
  icon: typeof Camera | typeof Sparkles
  label: string
}) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-2 px-4 sm:px-5 py-2 rounded-lg font-mono text-[11px] sm:text-xs tracking-wider uppercase transition-all duration-300 ${
        active
          ? "text-pink-400 border border-pink-500/30 bg-pink-500/[0.08]"
          : "text-white/30 border border-white/[0.06] bg-white/[0.02] hover:text-white/50 hover:border-white/[0.1]"
      }`}
    >
      <Icon className={`h-3.5 w-3.5 ${active ? "drop-shadow-[0_0_6px_rgba(236,72,153,0.3)]" : ""}`} />
      {label}
    </button>
  )
}

// ─── Main Component ───────────────────────────────────────────────────

export function GalleryCatalogoRopa() {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)
  const [activeTab, setActiveTab] = useState("sin-ia")

  const currentCategory = categories.find((c) => c.id === activeTab)
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <section id="catalogo-ropa" className="relative py-16 sm:py-24 bg-[#08090e] overflow-hidden">
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[500px] bg-pink-600/[0.03] rounded-full blur-[100px] sm:blur-[140px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-amber-500/[0.02] rounded-full blur-[80px] sm:blur-[120px]" />
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
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-pink-500/20 bg-pink-500/[0.05] mb-4 sm:mb-6">
            <Shirt className="h-3 w-3 text-pink-400" />
            <span className="text-[10px] sm:text-xs font-mono text-pink-400 tracking-widest uppercase">
              Catálogo
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 font-mono tracking-tight">
            Catálogo de{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-amber-400">
              Ropa
            </span>
          </h2>

          <p className="text-white/35 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed px-4">
            Fotografía de moda y catálogo de productos con producción tradicional e IA
          </p>
        </motion.div>

        {/* ── Tabs ── */}
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
              active={activeTab === cat.id}
              onClick={() => setActiveTab(cat.id)}
              icon={cat.icon}
              label={cat.name}
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
              className="text-center text-white/25 text-[11px] sm:text-xs font-mono mb-8 sm:mb-10"
            >
              {currentCategory.description}
            </motion.p>
          )}
        </AnimatePresence>

        {/* ── Grid ── */}
        <AnimatePresence mode="wait">
          {currentCategory && (
            <motion.div
              key={currentCategory.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4"
            >
              {currentCategory.items.map((item, index) => (
                <FashionCard
                  key={item.id}
                  item={item}
                  index={index}
                  onClick={() => item.url && setSelectedItem(item)}
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
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/15 to-amber-500/15 border border-pink-500/30 transition-all duration-300 group-hover:from-pink-500/25 group-hover:to-amber-500/25 group-hover:border-pink-400/50" />
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-pink-400/50 rounded-tl-xl" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-amber-400/50 rounded-br-xl" />

            <MessageCircle className="relative z-10 h-4 w-4 text-pink-400 group-hover:text-pink-300 transition-colors" />
            <span className="relative z-10 text-white/70 group-hover:text-white/90 transition-colors">
              Solicitar Catálogo
            </span>
          </a>
        </motion.div>

        {/* ── Preview Modal ── */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm"
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-3xl rounded-xl sm:rounded-2xl border border-white/[0.08] bg-[#0c0d14]/95 backdrop-blur-xl overflow-hidden"
              >
                {/* Top glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-pink-500/40 to-transparent" />

                {/* Header */}
                <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg border border-pink-500/20 bg-pink-500/[0.08] flex items-center justify-center">
                      <ImageIcon className="h-4 w-4 text-pink-400" />
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
                    className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-white/50 hover:text-white hover:border-white/20 transition-all font-mono text-[10px]"
                  >
                    ESC
                  </button>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  {selectedItem.type === "video" ? (
                    <video
                      src={selectedItem.url}
                      controls
                      className="w-full rounded-lg border border-white/[0.06]"
                    />
                  ) : (
                    <img
                      src={selectedItem.url || "/placeholder.svg"}
                      alt={selectedItem.title}
                      className="w-full rounded-lg border border-white/[0.06] max-h-[65vh] object-contain"
                    />
                  )}
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 p-4 sm:p-5 border-t border-white/[0.06]">
                  {selectedItem.url && (
                    <a
                      href={selectedItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-pink-500/20 bg-pink-500/[0.06] text-pink-400 text-xs font-mono tracking-wider hover:bg-pink-500/[0.12] transition-all"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Pantalla completa
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="px-4 py-2 rounded-lg border border-white/[0.08] bg-white/[0.02] text-white/40 text-xs font-mono tracking-wider hover:text-white/60 transition-all"
                  >
                    Cerrar
                  </button>
                </div>

                {/* Corner decorations */}
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-pink-500/15 rounded-tr-2xl" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-pink-500/15 rounded-bl-2xl" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}