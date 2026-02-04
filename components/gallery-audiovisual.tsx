"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Play, ImageIcon, Video, Sparkles, MessageCircle } from "lucide-react"

type MediaItem = {
  id: number
  title: string
  description: string
  type: "image" | "video"
  url: string
  thumbnail: string
}

type SubCategory = {
  id: string
  name: string
  icon: typeof Video | typeof ImageIcon
  items: MediaItem[]
}

type MainCategory = {
  id: string
  name: string
  icon: typeof Sparkles
  description: string
  subcategories: SubCategory[]
}

const categories: MainCategory[] = [
  {
    id: "sin-ia",
    name: "Produccion Sin IA",
    icon: Video,
    description: "Produccion audiovisual tradicional con equipo profesional",
    subcategories: [
      {
        id: "videos-sin-ia",
        name: "Videos",
        icon: Video,
        items: [
          { id: 1, title: "Video Corporativo 1", description: "Produccion profesional", type: "video", url: "", thumbnail: "" },
          { id: 2, title: "Spot Publicitario", description: "Campana de marca", type: "video", url: "", thumbnail: "" },
          { id: 3, title: "Video Testimonial", description: "Cliente satisfecho", type: "video", url: "", thumbnail: "" },
          { id: 4, title: "Reel Institucional", description: "Presentacion empresa", type: "video", url: "", thumbnail: "" },
          { id: 5, title: "Behind the Scenes", description: "Detras de camaras", type: "video", url: "", thumbnail: "" },
        ]
      },
      {
        id: "imagenes-sin-ia",
        name: "Imagenes",
        icon: ImageIcon,
        items: [
          { id: 1, title: "Fotografia Producto 1", description: "Sesion profesional", type: "image", url: "", thumbnail: "" },
          { id: 2, title: "Fotografia Corporativa", description: "Equipo de trabajo", type: "image", url: "", thumbnail: "" },
          { id: 3, title: "Fotografia Evento", description: "Cobertura completa", type: "image", url: "", thumbnail: "" },
          { id: 4, title: "Fotografia Lifestyle", description: "Estilo de vida", type: "image", url: "", thumbnail: "" },
          { id: 5, title: "Fotografia Editorial", description: "Para revista", type: "image", url: "", thumbnail: "" },
        ]
      }
    ]
  },
  {
    id: "con-ia",
    name: "Produccion Con IA",
    icon: Sparkles,
    description: "Contenido potenciado con inteligencia artificial",
    subcategories: [
      {
        id: "videos-con-ia",
        name: "Videos IA",
        icon: Video,
        items: [
          { id: 1, title: "Video Generado IA 1", description: "Creado con IA generativa", type: "video", url: "", thumbnail: "" },
          { id: 2, title: "Animacion IA", description: "Motion graphics con IA", type: "video", url: "", thumbnail: "" },
          { id: 3, title: "Avatar Digital", description: "Presentador virtual", type: "video", url: "", thumbnail: "" },
          { id: 4, title: "Video Editado IA", description: "Post-produccion IA", type: "video", url: "", thumbnail: "" },
          { id: 5, title: "Contenido Social IA", description: "Para redes sociales", type: "video", url: "", thumbnail: "" },
        ]
      },
      {
        id: "imagenes-con-ia",
        name: "Imagenes IA",
        icon: ImageIcon,
        items: [
          { id: 1, title: "Imagen Generada IA 1", description: "Arte digital con IA", type: "image", url: "", thumbnail: "" },
          { id: 2, title: "Producto IA", description: "Mockup generado", type: "image", url: "", thumbnail: "" },
          { id: 3, title: "Banner IA", description: "Publicidad digital", type: "image", url: "", thumbnail: "" },
          { id: 4, title: "Ilustracion IA", description: "Arte conceptual", type: "image", url: "", thumbnail: "" },
          { id: 5, title: "Retoque IA", description: "Edicion avanzada", type: "image", url: "", thumbnail: "" },
        ]
      }
    ]
  }
]

const WHATSAPP_NUMBER = "573019132001"
const WHATSAPP_MESSAGE = "🎬 ¡Hola Jesus! 👋 Me interesa tu servicio de *Produccion Audiovisual* 🎥✨ Quiero crear contenido profesional para mi marca. ¿Podemos hablar sobre mi proyecto? 🚀📞"

export function GalleryAudiovisual() {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)
  const [activeMainTab, setActiveMainTab] = useState("sin-ia")
  const [activeSubTab, setActiveSubTab] = useState("videos-sin-ia")

  const currentCategory = categories.find(c => c.id === activeMainTab)

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <section id="galeria-audiovisual" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Produccion Audiovisual
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Galeria de videos e imagenes con produccion tradicional y potenciada con IA
          </p>
        </div>

        {/* Main Tabs: Sin IA / Con IA */}
        <Tabs value={activeMainTab} onValueChange={(v) => {
          setActiveMainTab(v)
          const cat = categories.find(c => c.id === v)
          if (cat) setActiveSubTab(cat.subcategories[0].id)
        }} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted">
            {categories.map(cat => (
              <TabsTrigger 
                key={cat.id} 
                value={cat.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-2"
              >
                <cat.icon className="h-4 w-4" />
                {cat.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map(category => (
            <TabsContent key={category.id} value={category.id}>
              <p className="text-muted-foreground text-center mb-6">{category.description}</p>
              
              {/* Subtabs: Videos / Imagenes */}
              <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8 bg-muted">
                  {category.subcategories.map(sub => (
                    <TabsTrigger 
                      key={sub.id} 
                      value={sub.id}
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-2"
                    >
                      <sub.icon className="h-4 w-4" />
                      {sub.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {category.subcategories.map(subcategory => (
                  <TabsContent key={subcategory.id} value={subcategory.id}>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                      {subcategory.items.map(item => (
                        <Card 
                          key={item.id}
                          className="bg-card border-border overflow-hidden cursor-pointer group hover:border-primary/50 transition-all"
                          onClick={() => item.url && setSelectedItem(item)}
                        >
                          <div className="aspect-square relative bg-muted flex items-center justify-center">
                            {item.thumbnail || item.url ? (
                              <>
                                <img 
                                  src={item.thumbnail || item.url} 
                                  alt={item.title}
                                  className="w-full h-full object-cover"
                                />
                                {item.type === "video" && (
                                  <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                                    <Play className="h-10 w-10 text-primary" />
                                  </div>
                                )}
                              </>
                            ) : (
                              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                {item.type === "video" ? <Video className="h-8 w-8" /> : <ImageIcon className="h-8 w-8" />}
                                <span className="text-xs">Proximamente</span>
                              </div>
                            )}
                          </div>
                          <CardContent className="p-3">
                            <h3 className="font-medium text-foreground text-sm truncate">{item.title}</h3>
                            <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </TabsContent>
          ))}
        </Tabs>

        {/* CTA WhatsApp */}
        <div className="mt-12 text-center">
          <Button asChild size="lg" className="text-base px-8">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" />
              Ver Reel de Proyectos
            </a>
          </Button>
        </div>

        {/* Preview Dialog */}
        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="bg-card border-border max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-foreground">{selectedItem?.title}</DialogTitle>
            </DialogHeader>
            {selectedItem && (
              <div className="space-y-4">
                {selectedItem.type === "video" ? (
                  <video 
                    src={selectedItem.url} 
                    controls 
                    className="w-full rounded-lg"
                  />
                ) : (
                  <img 
                    src={selectedItem.url || "/placeholder.svg"} 
                    alt={selectedItem.title}
                    className="w-full rounded-lg"
                  />
                )}
                <p className="text-muted-foreground">{selectedItem.description}</p>
                <Button asChild>
                  <a href={selectedItem.url} target="_blank" rel="noopener noreferrer">
                    Ver en pantalla completa
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
