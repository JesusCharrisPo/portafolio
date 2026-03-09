"use client"

import { useState, useRef, MouseEvent } from "react"
import { Play, Video } from "lucide-react"

type MediaItem = {
  id: number
  title: string
  description: string
  type: "image" | "video"
  url: string
  thumbnail?: string
  duration?: string
}

type SubCategory = {
  id: string
  name: string
  aspect: "vertical" | "horizontal"
  items: MediaItem[]
}

type MainCategory = {
  id: string
  name: string
  subcategories: SubCategory[]
}

const categories: MainCategory[] = [
  {
    id: "sin-ia",
    name: "Sin IA",
    subcategories: [
      {
        id: "vertical-sin-ia",
        name: "Formato Vertical",
        aspect: "vertical",
        items: [
          {
            id: 1,
            title: "Lanzamiento Urbano",
            description: "Producción audiovisual",
            type: "video",
            url: "/twinz.mp4",
            duration: "0:42",
          },
          {
            id: 2,
            title: "Sneaker Focus",
            description: "Video streetwear",
            type: "video",
            url: "/ZUME.mp4",
            duration: "0:22",
          },
        ],
      },
    ],
  },
]

function MediaCard({
  item,
  aspect,
  onClick,
}: {
  item: MediaItem
  aspect: "vertical" | "horizontal"
  onClick: () => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const aspectClass = aspect === "vertical" ? "aspect-[9/16]" : "aspect-video"

  const handleHover = () => {
    if (videoRef.current) videoRef.current.play()
  }

  const handleLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <div
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className={`relative ${aspectClass} rounded-xl overflow-hidden`}>
        {item.type === "video" ? (
          <video
            ref={videoRef}
            src={item.url}
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          />
        ) : (
          <img src={item.thumbnail} className="w-full h-full object-cover" />
        )}

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center">
            <Play className="text-white" />
          </div>
        </div>

        {item.duration && (
          <div className="absolute bottom-2 right-2 text-xs bg-black/60 px-2 py-1 rounded">
            {item.duration}
          </div>
        )}
      </div>

      <div className="mt-2">
        <h3 className="text-white text-sm">{item.title}</h3>
        <p className="text-white/40 text-xs">{item.description}</p>
      </div>
    </div>
  )
}

export function GalleryAudiovisual() {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)

  const category = categories[0]
  const subcategory = category.subcategories[0]

  return (
    <section className="py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold mb-10">
          Producción Audiovisual
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {subcategory.items.map((item) => (
            <MediaCard
              key={item.id}
              item={item}
              aspect={subcategory.aspect}
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