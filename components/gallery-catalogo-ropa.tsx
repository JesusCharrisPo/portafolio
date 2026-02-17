"use client"

import { useState, useRef, MouseEvent } from "react"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import {
  Play,
  ImageIcon,
  MessageCircle,
  Sparkles,
  Camera,
  Layers,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2
} from "lucide-react"

// ─── Data ─────────────────────────────────────────────────────────────

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

const categories: Category[] = [
  {
    id: "catalogo-producto",
    name: "Catálogo Producto",
    icon: <Layers className="h-3.5 w-3.5 sm:h-4 sm:w-4" />,
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
    icon: <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />,
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
    icon: <Camera className="h-3.5 w-3.5 sm:h-4 sm:w-4" />,
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

// ─── Spotlight Card (Masonry Ready) ────────────────────────────────

function SpotlightCard({
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

  const hasThumbnail = item.thumbnail || (item.images && item.images.length > 0)
  const displayImage = item.thumbnail || (item.images && item.images[0]) || ""
  const imageCount = item.images ? item.images.length : 0

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: index * 0.05 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      // mb-4 or mb-6 es vital para el layout tipo Masonry
      className="relative cursor-pointer group rounded-xl sm:rounded-2xl break-inside-avoid mb-4 sm:mb-6"
    >
      {/* Spotlight border glow (Cyan/Purple) */}
      <div
        className="absolute -inset-px rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: isHovered
            ? `radial-gradient(350px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(168,85,247,0.4), transparent 60%)`
            : "none",
        }}
      />

      {/* Glass card container */}
      <div className="relative h-full rounded-xl sm:rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl overflow-hidden">
        
        {/* Inner spotlight */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
            style={{
              background: `radial-gradient(300px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(34,211,238,0.08), transparent 60%)`,
            }}
          />
        )}

        {/* ── IA BADGE ── */}
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-cyan-400/30 bg-black/60 backdrop-blur-md shadow-[0_0_10px_rgba(34,211,238,0.2)]">
          <Sparkles className="h-3 w-3 text-cyan-400 animate-pulse" />
          <span className="text-[9px] sm:text-[10px] font-mono font-semibold text-cyan-300 tracking-wider">
            100% IA
          </span>
        </div>

        {/* Image area (Dynamic Height - NO aspect ratio forced) */}
        <div className="relative overflow-hidden bg-black/40">
          {hasThumbnail ? (
            <>
              {/* Usamos w-full y h-auto para que respete vertical u horizontal */}
              <img
                src={displayImage}
                alt={item.title}
                className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 gap-2 sm:gap-3 text-white/30">
              <ImageIcon className="h-8 w-8 sm:h-12 sm:w-12" />
              <span className="text-[10px] sm:text-xs font-mono tracking-widest uppercase">
                Próximamente
              </span>
            </div>
          )}

          {/* Hover gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Hover icon */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
            whileHover={{ scale: 1.1 }}
          >
            <div className="p-3 sm:p-4 rounded-full border border-purple-400/40 bg-black/40 backdrop-blur-sm shadow-[0_0_15px_rgba(168,85,247,0.4)]">
              <Maximize2 className="h-5 w-5 sm:h-6 sm:w-6 text-purple-300" />
            </div>
          </motion.div>

          {/* Image count badge */}
          {imageCount > 1 && (
            <div className="absolute bottom-3 left-3 z-20 px-2.5 py-1 rounded border border-white/10 bg-black/50 backdrop-blur-sm">
              <span className="text-[10px] sm:text-xs font-mono text-white/70">
                {imageCount} variaciones
              </span>
            </div>
          )}
        </div>

        {/* Content (Appears over the image on hover, or sits below depending on design. Here it sits below for Masonry) */}
        <div className="p-4 sm:p-5 space-y-1.5 relative z-20 bg-gradient-to-b from-transparent to-[#07080d]/80">
          <h3 className="font-bold text-white/95 font-mono tracking-wide text-xs sm:text-sm">
            {item.title}
          </h3>
          <p className="text-[11px] sm:text-xs text-white/50 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Image Slider Modal (Dynamic Aspect Ratio) ─────────────────────

function ImageSliderModal({
  item,
  onClose,
}: {
  item: MediaItem
  onClose: () => void
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const allImages =
    item.images && item.images.length > 0
      ? item.images
      : [item.thumbnail || ""]

  const hasMultiple = allImages.length > 1
  const validImages = allImages.filter((img) => img !== "")

  const goNext = () => {
    if (validImages.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % validImages.length)
    }
  }

  const goPrev = () => {
    if (validImages.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + validImages.length) % validImages.length)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl rounded-xl sm:rounded-2xl border border-cyan-500/20 bg-[#07080d] shadow-2xl overflow-hidden flex flex-col max-h-[95vh]"
      >
        {/* Top glow line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.8)]" />

        {/* Header */}
        <div className="flex-none flex items-center justify-between p-4 sm:p-5 border-b border-white/[0.06]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="h-3.5 w-3.5 text-purple-400" />
              <span className="text-[10px] font-mono text-purple-400 tracking-widest uppercase">
                Generación IA
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-mono font-bold text-white tracking-wide">
              {item.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:text-white text-white/50 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Image Slider - DYNAMIC RATIO */}
        <div className="flex-1 relative bg-black/50 min-h-0 flex items-center justify-center p-2 sm:p-4">
          {validImages.length > 0 ? (
            <AnimatePresence mode="wait">
              {/* object-contain asegura que no se recorte nada, sea vertical u horizontal */}
              <motion.img
                key={currentIndex}
                src={validImages[currentIndex]}
                alt={`${item.title} - ${currentIndex + 1}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="max-w-full max-h-[60vh] sm:max-h-[70vh] object-contain rounded-lg shadow-2xl"
              />
            </AnimatePresence>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 text-white/30">
              <ImageIcon className="h-12 w-12" />
            </div>
          )}

          {/* Navigation arrows */}
          {hasMultiple && validImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 bg-black/60 backdrop-blur-md flex items-center justify-center hover:bg-black/80 hover:border-cyan-400/40 transition-all group"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-white/70 group-hover:text-cyan-300 transition-colors" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 bg-black/60 backdrop-blur-md flex items-center justify-center hover:bg-black/80 hover:border-cyan-400/40 transition-all group"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-white/70 group-hover:text-cyan-300 transition-colors" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail strip */}
        {validImages.length > 1 && (
          <div className="flex-none flex justify-center gap-2 p-3 sm:p-4 border-t border-white/[0.06] bg-black/40 overflow-x-auto scrollbar-hide">
            {validImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`relative flex-shrink-0 h-12 w-12 sm:h-16 sm:w-16 rounded-md sm:rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  idx === currentIndex
                    ? "border-cyan-400 ring-2 ring-cyan-500/30 opacity-100"
                    : "border-transparent opacity-40 hover:opacity-80"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumb ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────

export function GalleryIAGenerativa() {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)
  const [activeTab, setActiveTab] = useState("catalogo-producto")

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
  const activeCategory = categories.find((c) => c.id === activeTab)

  return (
    <section id="galeria-ia" className="relative py-16 sm:py-24 bg-[#050508] overflow-hidden">
      
      {/* Background effects (Cyan & Purple AI vibe) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[400px] sm:w-[800px] h-[300px] sm:h-[500px] bg-cyan-600/[0.04] rounded-full blur-[100px] sm:blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] sm:w-[600px] h-[300px] sm:h-[500px] bg-purple-600/[0.05] rounded-full blur-[90px] sm:blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-purple-500/30 bg-purple-500/[0.08] mb-5 sm:mb-6 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
            <Sparkles className="h-3.5 w-3.5 text-purple-400 animate-pulse" />
            <span className="text-[10px] sm:text-xs font-mono text-purple-300 tracking-widest uppercase font-semibold">
              Innovación Visual
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 font-mono tracking-tight">
            Imágenes con{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
              IA Generativa
            </span>
          </h2>

          <p className="text-white/50 max-w-2xl mx-auto text-xs sm:text-base leading-relaxed px-4">
            Fotografía comercial, modelaje y CGI generativo. Elimina los costos de un estudio tradicional y crea campañas hiperrealistas impulsadas por Inteligencia Artificial.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="inline-flex gap-1 p-1.5 rounded-xl border border-white/[0.06] bg-[#0c0d14]/60 backdrop-blur-md w-full sm:w-auto overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`relative flex-shrink-0 flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-[10px] sm:text-xs font-mono tracking-wider uppercase transition-all duration-300 ${
                  activeTab === cat.id
                    ? "text-cyan-300"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                {activeTab === cat.id && (
                  <motion.div
                    layoutId="activeTabIA"
                    className="absolute inset-0 rounded-lg bg-cyan-500/[0.12] border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.1)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {cat.icon}
                  <span>{cat.name}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Grid (Adaptable Aspect Ratio) */}
        <LayoutGroup>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              // ¡Aquí está la magia del Masonry! column-count crea las columnas y los items se acomodan solos
              className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-6"
            >
              {activeCategory?.items.map((item, index) => (
                <SpotlightCard
                  key={`${activeTab}-${item.id}`}
                  item={item}
                  index={index}
                  onClick={() => setSelectedItem(item)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </LayoutGroup>

        {/* CTA WhatsApp */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 text-center"
        >
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-8 py-4 font-mono text-xs sm:text-sm tracking-wider uppercase overflow-hidden rounded-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 backdrop-blur-sm transition-all duration-500 group-hover:from-cyan-500/30 group-hover:to-purple-500/30 group-hover:border-cyan-300/60 shadow-[0_0_20px_rgba(34,211,238,0.1)] group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]" />
            
            <Sparkles className="relative z-10 h-5 w-5 text-cyan-400 group-hover:text-cyan-300 animate-pulse" />
            <span className="relative z-10 text-white font-semibold group-hover:text-cyan-100 transition-colors">
              Crear mi campaña IA
            </span>
          </a>
        </motion.div>

        {/* Slider Modal */}
        <AnimatePresence>
          {selectedItem && (
            <ImageSliderModal
              item={selectedItem}
              onClose={() => setSelectedItem(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}