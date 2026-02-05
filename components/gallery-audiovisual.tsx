"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Play, ImageIcon, Video, Sparkles, MessageCircle, Zap, Camera, ArrowRight } from "lucide-react"

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
    name: "Producción Sin IA",
    icon: Camera,
    description: "Producción audiovisual tradicional con equipo profesional de última generación",
    subcategories: [
      {
        id: "videos-sin-ia",
        name: "Videos",
        icon: Video,
        items: [
          { id: 1, title: "Video Corporativo 1", description: "Producción profesional", type: "video", url: "", thumbnail: "" },
          { id: 2, title: "Spot Publicitario", description: "Campaña de marca", type: "video", url: "", thumbnail: "" },
          { id: 3, title: "Video Testimonial", description: "Cliente satisfecho", type: "video", url: "", thumbnail: "" },
          { id: 4, title: "Reel Institucional", description: "Presentación empresa", type: "video", url: "", thumbnail: "" },
          { id: 5, title: "Behind the Scenes", description: "Detrás de cámaras", type: "video", url: "", thumbnail: "" },
        ]
      },
      {
        id: "imagenes-sin-ia",
        name: "Imágenes",
        icon: ImageIcon,
        items: [
          { id: 1, title: "Fotografía Producto 1", description: "Sesión profesional", type: "image", url: "", thumbnail: "" },
          { id: 2, title: "Fotografía Corporativa", description: "Equipo de trabajo", type: "image", url: "", thumbnail: "" },
          { id: 3, title: "Fotografía Evento", description: "Cobertura completa", type: "image", url: "", thumbnail: "" },
          { id: 4, title: "Fotografía Lifestyle", description: "Estilo de vida", type: "image", url: "", thumbnail: "" },
          { id: 5, title: "Fotografía Editorial", description: "Para revista", type: "image", url: "", thumbnail: "" },
        ]
      }
    ]
  },
  {
    id: "con-ia",
    name: "Producción Con IA",
    icon: Sparkles,
    description: "Contenido de próxima generación potenciado con inteligencia artificial avanzada",
    subcategories: [
      {
        id: "videos-con-ia",
        name: "Videos IA",
        icon: Video,
        items: [
          { id: 1, title: "Video Generado IA 1", description: "Creado con IA generativa", type: "video", url: "", thumbnail: "" },
          { id: 2, title: "Animación IA", description: "Motion graphics con IA", type: "video", url: "", thumbnail: "" },
          { id: 3, title: "Avatar Digital", description: "Presentador virtual", type: "video", url: "", thumbnail: "" },
          { id: 4, title: "Video Editado IA", description: "Post-producción IA", type: "video", url: "", thumbnail: "" },
          { id: 5, title: "Contenido Social IA", description: "Para redes sociales", type: "video", url: "", thumbnail: "" },
        ]
      },
      {
        id: "imagenes-con-ia",
        name: "Imágenes IA",
        icon: ImageIcon,
        items: [
          { id: 1, title: "Imagen Generada IA 1", description: "Arte digital con IA", type: "image", url: "", thumbnail: "" },
          { id: 2, title: "Producto IA", description: "Mockup generado", type: "image", url: "", thumbnail: "" },
          { id: 3, title: "Banner IA", description: "Publicidad digital", type: "image", url: "", thumbnail: "" },
          { id: 4, title: "Ilustración IA", description: "Arte conceptual", type: "image", url: "", thumbnail: "" },
          { id: 5, title: "Retoque IA", description: "Edición avanzada", type: "image", url: "", thumbnail: "" },
        ]
      }
    ]
  }
]

const WHATSAPP_NUMBER = "573019132001"
const WHATSAPP_MESSAGE = "🎬 ¡Hola Jesus! 👋 Me interesa tu servicio de *Producción Audiovisual* 🎥✨ Quiero crear contenido profesional para mi marca. ¿Podemos hablar sobre mi proyecto? 🚀📞"

export function GalleryAudiovisual() {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)
  const [activeMainTab, setActiveMainTab] = useState("sin-ia")
  const [activeSubTab, setActiveSubTab] = useState("videos-sin-ia")

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <section id="galeria-audiovisual" className="py-24 bg-background relative overflow-hidden">
      {/* Línea superior sutil para separación visual */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header: Enfoque en Tipografía y Minimalismo Tech */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary font-mono text-sm tracking-tighter">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              03. PORTAFOLIO VISUAL
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Producción <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Audiovisual</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md text-balance md:text-right">
            Fusionamos la técnica cinematográfica tradicional con algoritmos de IA generativa para resultados de alto impacto.
          </p>
        </div>

        <Tabs value={activeMainTab} onValueChange={(v) => {
          setActiveMainTab(v)
          const cat = categories.find(c => c.id === v)
          if (cat) setActiveSubTab(cat.subcategories[0].id)
        }} className="w-full space-y-10">
          
          {/* Selector Principal: Estilo "Control Panel" */}
          <div className="flex justify-center">
            <TabsList className="inline-flex h-14 items-center justify-center rounded-full bg-muted/50 p-1.5 backdrop-blur-md border border-border/50">
              {categories.map(cat => (
                <TabsTrigger 
                  key={cat.id} 
                  value={cat.id}
                  className="rounded-full px-8 py-2.5 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm flex items-center gap-2"
                >
                  <cat.icon className="h-4 w-4" />
                  {cat.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map(category => (
            <TabsContent key={category.id} value={category.id} className="mt-0 outline-none">
              
              <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="space-y-8">
                {/* Sub-navegación minimalista */}
                <div className="flex items-center justify-between border-b border-border/50 pb-4">
                  <div className="flex gap-6">
                    {category.subcategories.map(sub => (
                      <TabsTrigger 
                        key={sub.id} 
                        value={sub.id}
                        className="relative py-2 text-sm font-medium transition-colors hover:text-primary data-[state=active]:text-primary group"
                      >
                        {sub.name}
                        {activeSubTab === sub.id && (
                          <div className="absolute bottom-0 left-0 h-0.5 w-full bg-primary" />
                        )}
                      </TabsTrigger>
                    ))}
                  </div>
                  <Zap className="h-4 w-4 text-muted-foreground/30 hidden sm:block" />
                </div>

                {category.subcategories.map(subcategory => (
                  <TabsContent key={subcategory.id} value={subcategory.id} className="outline-none">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {subcategory.items.map(item => (
                        <Card 
                          key={item.id}
                          className="group relative aspect-[4/5] overflow-hidden border-none bg-muted/30 cursor-pointer"
                          onClick={() => item.url && setSelectedItem(item)}
                        >
                          {/* Overlay de información que aparece en hover */}
                          <div className="absolute inset-0 z-20 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                            <h3 className="text-white font-bold text-sm translate-y-2 group-hover:translate-y-0 transition-transform">{item.title}</h3>
                            <p className="text-white/70 text-[10px] line-clamp-2">{item.description}</p>
                          </div>

                          {/* Contenedor de Imagen/Video */}
                          <div className="absolute inset-0 z-10 flex items-center justify-center">
                            {item.thumbnail || item.url ? (
                              <img 
                                src={item.thumbnail || item.url} 
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                            ) : (
                              <div className="flex flex-col items-center gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                                {item.type === "video" ? <Video className="h-6 w-6" /> : <ImageIcon className="h-6 w-6" />}
                                <span className="text-[10px] uppercase tracking-widest font-bold">Soon</span>
                              </div>
                            )}
                            
                            {item.type === "video" && (item.thumbnail || item.url) && (
                              <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md p-2 rounded-full border border-white/10">
                                <Play className="h-3 w-3 text-white fill-current" />
                              </div>
                            )}
                          </div>

                          {/* Borde de neón sutil en hover */}
                          <div className="absolute inset-0 border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity z-30 pointer-events-none" />
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </TabsContent>
          ))}
        </Tabs>

        {/* Footer de Sección: Call to Action Limpio */}
        <div className="mt-20 flex flex-col items-center gap-6">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-border to-transparent" />
          <Button 
            asChild 
            variant="outline" 
            size="lg" 
            className="rounded-full border-primary/20 hover:bg-primary/5 hover:border-primary transition-all group"
          >
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
              <MessageCircle className="h-5 w-5 text-primary" />
              <span>Ver Reel de Proyectos</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>

        {/* Preview Dialog */}
        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="bg-card/95 backdrop-blur-xl border-primary/20 max-w-4xl shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-foreground text-2xl font-bold flex items-center gap-2">
                {selectedItem?.type === "video" ? <Video className="h-6 w-6 text-primary" /> : <ImageIcon className="h-6 w-6 text-primary" />}
                {selectedItem?.title}
              </DialogTitle>
            </DialogHeader>
            {selectedItem && (
              <div className="space-y-6">
                <div className="relative rounded-xl overflow-hidden border border-border/50 shadow-xl">
                  {selectedItem.type === "video" ? (
                    <video 
                      src={selectedItem.url} 
                      controls 
                      className="w-full"
                    />
                  ) : (
                    <img 
                      src={selectedItem.url || "/placeholder.svg"} 
                      alt={selectedItem.title}
                      className="w-full"
                    />
                  )}
                </div>
                <p className="text-muted-foreground text-center">{selectedItem.description}</p>
                <Button asChild className="w-full rounded-full group">
                  <a href={selectedItem.url} target="_blank" rel="noopener noreferrer">
                    Ver en pantalla completa
                    <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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