"use client"

import { useState, useRef, MouseEvent } from "react"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import {
  ExternalLink,
  Play,
  ImageIcon,
  MessageCircle,
  Zap,
  Globe,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react"

// ─── Data ─────────────────────────────────────────────────────────────

type MediaItem = {
  id: number
  title: string
  description: string
  type: "image" | "video"
  images: string[]
  thumbnail: string
  liveUrl?: string
}

type Category = {
  id: string
  name: string
  icon: React.ReactNode
  items: MediaItem[]
}

const categories: Category[] = [
  {
    id: "shopify",
    name: "Shopify",
    icon: <ShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />,
    items: [
      {
        id: 1,
        title: "Tienda de Moda",
        description: "E-commerce completo con Shopify",
        type: "image",
        thumbnail: "/mac1.jpg",
        images: ["/mac1.jpg","/mac2.jpg","/mac3.jpg",],
      },
      {
        id: 2,
        title: "Tienda de Accesorios",
        description: "Shopify con integraciones",
        type: "image",
        thumbnail: "",
        images: [],
      },
      {
        id: 3,
        title: "Dropshipping Store",
        description: "Automatización completa",
        type: "image",
        thumbnail: "",
        images: [],
      },
    ],
  },
  {
    id: "wordpress",
    name: "WordPress",
    icon: <Globe className="h-3.5 w-3.5 sm:h-4 sm:w-4" />,
    items: [
      {
        id: 1,
        title: "Portafolio Creativo",
        description: "Sitio web profesional",
        type: "image",
        thumbnail: "",
        images: [],
      },
      {
        id: 2,
        title: "Blog Corporativo",
        description: "WordPress optimizado SEO",
        type: "image",
        thumbnail: "",
        images: [],
      },
      {
        id: 3,
        title: "Landing Page",
        description: "Alta conversión",
        type: "image",
        thumbnail: "",
        images: [],
      },
    ],
  },
  {
    id: "dropshipping",
    name: "Drop",
    icon: <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4" />,
    items: [
      {
        id: 1,
        title: "Tienda Nicho",
        description: "Dropshipping automatizado",
        type: "image",
        thumbnail: "",
        images: [],
      },
      {
        id: 2,
        title: "Multi-producto",
        description: "Catálogo extenso",
        type: "image",
        thumbnail: "",
        images: [],
      },
      {
        id: 3,
        title: "One Product Store",
        description: "Enfocado en conversión",
        type: "image",
        thumbnail: "",
        images: [],
      },
    ],
  },
]

const WHATSAPP_NUMBER = "573019132001"
const WHATSAPP_MESSAGE =
  "🚀 ¡Hola Jesus! 👋 Estoy interesado en tus servicios de *Desarrollo Web* 💻 Me gustaría saber más sobre cómo puedes ayudarme con mi proyecto. ¿Podemos agendar una llamada? 📞✨"

// ─── Spotlight Project Card ──────────────────────────────────────────

function SpotlightCard({
  item,
  onClick,
}: {
  item: MediaItem
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
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: -20 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="relative cursor-pointer group rounded-xl sm:rounded-2xl"
    >
      {/* Spotlight border glow */}
      <div
        className="absolute -inset-px rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: isHovered
            ? `radial-gradient(350px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(0,255,200,0.25), transparent 60%)`
            : "none",
        }}
      />

      {/* Glass card */}
      <div className="relative h-full rounded-xl sm:rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl overflow-hidden">
        {/* Inner spotlight */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(300px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(0,255,200,0.06), transparent 60%)`,
            }}
          />
        )}

        {/* Scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03] z-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)",
          }}
        />

        {/* Image area */}
        <div className="aspect-video relative overflow-hidden bg-black/40">
          {hasThumbnail ? (
            <>
              <img
                src={displayImage}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              {item.type === "video" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/50"
                >
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-cyan-400/30 blur-xl animate-pulse" />
                    <Play className="relative h-10 w-10 sm:h-14 sm:w-14 text-cyan-400 drop-shadow-[0_0_12px_rgba(0,255,200,0.6)]" />
                  </div>
                </motion.div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-2 sm:gap-3 text-white/30">
              <ImageIcon className="h-8 w-8 sm:h-12 sm:w-12" />
              <span className="text-[10px] sm:text-xs font-mono tracking-widest uppercase">
                Próximamente
              </span>
            </div>
          )}

          {/* Hover gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Hover icon */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            whileHover={{ scale: 1.1 }}
          >
            <div className="p-2.5 sm:p-3 rounded-full border border-cyan-400/40 bg-black/40 backdrop-blur-sm">
              <ExternalLink className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,200,0.5)]" />
            </div>
          </motion.div>

          {/* Image count badge */}
          {imageCount > 1 && (
            <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 px-2 py-0.5 rounded border border-white/10 bg-black/50 backdrop-blur-sm">
              <span className="text-[9px] sm:text-[10px] font-mono text-white/50">
                {imageCount} fotos
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3 sm:p-5 space-y-1">
          <h3 className="font-semibold text-white/90 font-mono tracking-wide text-xs sm:text-sm">
            {item.title}
          </h3>
          <p className="text-[11px] sm:text-xs text-white/40 leading-relaxed">
            {item.description}
          </p>
          <div className="pt-2 sm:pt-3">
            <div className="h-px w-full bg-gradient-to-r from-cyan-500/40 via-transparent to-purple-500/40" />
          </div>
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-t border-r border-cyan-500/20" />
        <div className="absolute bottom-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-b border-l border-cyan-500/20" />
      </div>
    </motion.div>
  )
}

// ─── Image Slider Modal ──────────────────────────────────────────────

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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl rounded-xl sm:rounded-2xl border border-white/[0.08] bg-[#0c0d14]/95 backdrop-blur-xl overflow-hidden"
      >
        {/* Top glow line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/[0.06]">
          <div>
            <h3 className="text-sm sm:text-base font-mono font-bold text-white tracking-wide">
              {item.title}
            </h3>
            <p className="text-[10px] sm:text-xs text-white/30 mt-0.5">
              {item.description}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4 text-white/50" />
          </button>
        </div>

        {/* Image Slider */}
        <div className="relative">
          <div className="aspect-video relative overflow-hidden bg-black/60">
            {validImages.length > 0 ? (
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={validImages[currentIndex]}
                  alt={`${item.title} - ${currentIndex + 1}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-3 text-white/30">
                <ImageIcon className="h-12 w-12" />
                <span className="text-xs font-mono tracking-widest uppercase">
                  Próximamente
                </span>
              </div>
            )}

            {/* Navigation arrows */}
            {hasMultiple && validImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    goPrev()
                  }}
                  className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-lg border border-white/10 bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 hover:border-cyan-500/20 transition-all group"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-white/50 group-hover:text-cyan-400 transition-colors" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    goNext()
                  }}
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-lg border border-white/10 bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 hover:border-cyan-500/20 transition-all group"
                  aria-label="Siguiente"
                >
                  <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-white/50 group-hover:text-cyan-400 transition-colors" />
                </button>
              </>
            )}

            {/* Image counter */}
            {validImages.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full border border-white/10 bg-black/50 backdrop-blur-sm">
                <span className="text-[10px] sm:text-xs font-mono text-white/50">
                  {currentIndex + 1} / {validImages.length}
                </span>
              </div>
            )}
          </div>

          {/* Thumbnail strip */}
          {validImages.length > 1 && (
            <div className="flex gap-1.5 sm:gap-2 p-3 sm:p-4 overflow-x-auto scrollbar-hide">
              {validImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative flex-shrink-0 w-14 h-10 sm:w-20 sm:h-14 rounded-md sm:rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    idx === currentIndex
                      ? "border-cyan-500/50 ring-1 ring-cyan-500/20"
                      : "border-white/[0.06] hover:border-white/15"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {idx === currentIndex && (
                    <div className="absolute inset-0 bg-cyan-500/10" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {item.liveUrl && (
          <div className="p-4 sm:p-5 border-t border-white/[0.06]">
            <a
              href={item.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg border border-cyan-500/30 bg-cyan-500/[0.08] text-cyan-400 text-[10px] sm:text-xs font-mono tracking-wider uppercase hover:bg-cyan-500/[0.15] transition-colors"
            >
              Ver sitio en vivo
              <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </a>
          </div>
        )}

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan-500/15" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyan-500/15" />
      </motion.div>
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────

export function GalleryDesarrolloWeb() {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)
  const [activeTab, setActiveTab] = useState("shopify")

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
  const activeCategory = categories.find((c) => c.id === activeTab)

  const getFullName = (id: string) => {
    if (id === "dropshipping") return "Dropshipping"
    return categories.find((c) => c.id === id)?.name || ""
  }

  return (
    <section
      id="galeria-web"
      className="relative py-12 sm:py-24 bg-[#07080d] overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[800px] h-[300px] sm:h-[500px] bg-cyan-500/[0.04] rounded-full blur-[80px] sm:blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[300px] sm:w-[500px] h-[250px] sm:h-[400px] bg-purple-600/[0.04] rounded-full blur-[70px] sm:blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/[0.05] mb-4 sm:mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] sm:text-xs font-mono text-cyan-400 tracking-widest uppercase">
              Portfolio
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-3 sm:mb-4 font-mono tracking-tight">
            Desarrollo{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Web
            </span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed px-4">
            Portafolio de sitios web en Shopify, WordPress y soluciones de Dropshipping
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="inline-flex gap-0.5 sm:gap-1 p-1 rounded-lg sm:rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm w-full max-w-md sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`relative flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-mono tracking-wider uppercase transition-all duration-300 ${
                  activeTab === cat.id
                    ? "text-cyan-300"
                    : "text-white/40 hover:text-white/60"
                }`}
              >
                {activeTab === cat.id && (
                  <motion.div
                    layoutId="activeTabWeb"
                    className="absolute inset-0 rounded-md sm:rounded-lg bg-cyan-500/[0.1] border border-cyan-500/20"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1 sm:gap-2">
                  {cat.icon}
                  <span className="hidden sm:inline">{getFullName(cat.id)}</span>
                  <span className="sm:hidden">{cat.name}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <LayoutGroup>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            >
              {activeCategory?.items.map((item) => (
                <SpotlightCard
                  key={`${activeTab}-${item.id}`}
                  item={item}
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
          className="mt-10 sm:mt-16 text-center"
        >
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 font-mono text-xs sm:text-sm tracking-wider uppercase overflow-hidden"
          >
            <div className="absolute inset-0 rounded-lg sm:rounded-xl border border-cyan-500/30 bg-cyan-500/[0.06] backdrop-blur-sm transition-all duration-300 group-hover:bg-cyan-500/[0.12] group-hover:border-cyan-400/50" />
            <div className="absolute top-0 left-0 w-2.5 h-2.5 sm:w-3 sm:h-3 border-t-2 border-l-2 border-cyan-400/60 rounded-tl-lg sm:rounded-tl-xl" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 border-b-2 border-r-2 border-cyan-400/60 rounded-br-lg sm:rounded-br-xl" />
            <MessageCircle className="relative z-10 h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
            <span className="relative z-10 text-cyan-300 group-hover:text-cyan-200 transition-colors">
              Solicitar Propuesta
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