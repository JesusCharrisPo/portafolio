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
          { id: 1, title: "Lanzamiento Urbano | Concepto", description: "Pieza audiovisual disruptiva con iluminación dual (Rojo/Azul) en set de alto contraste.", type: "video", url: "/twinz.mp4", thumbnail: "/twinz.mp4", duration: "0:42" },
          { id: 2, title: "Zume | Sneaker Focus", description: "Pieza audiovisual conceptual dirigida a exaltar las raíces.", type: "video", url: "/ZUME.mp4", thumbnail: "/ZUME.mp4", duration: "0:22" },
          { id: 3, title: "Oxxo | Urban Styling Concept", description: "Dirección creativa de video de styling.", type: "video", url: "/OXXO.mp4", thumbnail: "/OXXO.mp4", duration: "0:37" },
          { id: 4, title: "Exhibición de Zapatos | Transiciones Dinámicas", description: "Contenido orgánico en tendencia.", type: "video", url: "/ZAPATOST.mp4", thumbnail: "/ZAPATOST.mp4", duration: "0:16" },
          { id: 5, title: "Cultura de Barbería | Fashion Film Retro B/N", description: "Pieza audiovisual en blanco y negro.", type: "video", url: "/Barbería.mp4", thumbnail: "/Barbería.mp4", duration: "0:27" },
          { id: 6, title: "Editorial Old Money | Campaña Cinematográfica VHS", description: "Fashion film con estética VHS.", type: "video", url: "/oldmoney.mp4", thumbnail: "/oldmoney.mp4", duration: "0:23" },
          { id: 7, title: "Centro | Raíces & Cultura", description: "Pieza audiovisual conceptual.", type: "video", url: "/CENTRO.mp4", thumbnail: "/CENTRO.mp4", duration: "0:23" },
          { id: 8, title: "Mac One | Experiencia de Tienda.", description: "Dirección audiovisual para evento.", type: "video", url: "/TIENDA.mp4", thumbnail: "/TIENDA.mp4", duration: "0:39" },
          { id: 9, title: "Mac One | Discolandia Fashion Film", description: "Dirección audiovisual en locación histórica.", type: "video", url: "/DISCOLANDIA.mp4", thumbnail: "/DISCOLANDIA.mp4", duration: "0:41" },
          { id: 10, title: "Mac One | Street Medallo Editorial", description: "Fashion film urbano.", type: "video", url: "/STREETMEDALLO.mp4", thumbnail: "/STREETMEDALLO.mp4", duration: "0:16" },
          { id: 11, title: "Estudio Marenco | Dirección Creativa Comercial", description: "Producción comercial en estudio.", type: "video", url: "/SPOTMARENCO.mp4", thumbnail: "/SPOTMARENCO.mp4", duration: "0:27" },
          { id: 12, title: "Perspectiva Ojo de Pez | Estética Urbana", description: "Producción con lente ojo de pez.", type: "video", url: "/KEVINOP.mp4", thumbnail: "/KEVINOP.mp4", duration: "0:26" },
        ],
      },
    ],
  },
]

const WHATSAPP_NUMBER = "573019132001"
const WHATSAPP_MESSAGE =
  "🎬 ¡Hola Jesus! 👋 Me interesa tu servicio de Producción Audiovisual."

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
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="relative group cursor-pointer transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">

        <div className={`${aspectClass} relative bg-[#0a0b10] overflow-hidden`}>
          {hasContent ? (
            <>
              {item.type === "video" ? (
                <video
                  src={item.url}
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-[#07080d] via-transparent to-transparent opacity-60" />

              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="w-12 h-12 rounded-full border border-purple-500/30 bg-purple-500/[0.1] flex items-center justify-center">
                    <Play className="h-6 w-6 text-purple-400 ml-1" />
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <Video className="h-6 w-6 text-white/30" />
              <span className="text-xs text-white/30">Próximamente</span>
            </div>
          )}
        </div>

        <div className="p-3">
          <h3 className="text-sm text-white">{item.title}</h3>
          <p className="text-xs text-white/40">{item.description}</p>
        </div>
      </div>
    </div>
  )
}

export function GalleryAudiovisual() {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)

  const items = categories[0].subcategories[0].items

  return (
    <section className="py-20 bg-[#07080d]">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <MediaCard
              key={item.id}
              item={item}
              index={index}
              aspect="vertical"
              onClick={() => setSelectedItem(item)}
            />
          ))}
        </div>

        {selectedItem && (
          <div
            className="fixed inset-0 bg-black/90 flex items-center justify-center"
            onClick={() => setSelectedItem(null)}
          >
            <video
              src={selectedItem.url}
              controls
              autoPlay
              className="max-w-4xl w-full"
            />
          </div>
        )}
      </div>
    </section>
  )
}