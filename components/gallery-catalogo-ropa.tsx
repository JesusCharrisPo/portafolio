"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Play, ImageIcon, Sparkles, Camera, MessageCircle } from "lucide-react"

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
    name: "Catalogo Sin IA",
    icon: Camera,
    description: "Fotografia tradicional de moda y productos",
    items: [
      { id: 1, title: "Lookbook Verano", description: "Coleccion de temporada", type: "image", url: "", thumbnail: "" },
      { id: 2, title: "Sesion Estudio", description: "Fotografia de producto", type: "image", url: "", thumbnail: "" },
      { id: 3, title: "Catalogo Accesorios", description: "Complementos de moda", type: "image", url: "", thumbnail: "" },
      { id: 4, title: "Editorial Moda", description: "Sesion conceptual", type: "image", url: "", thumbnail: "" },
      { id: 5, title: "E-commerce Photos", description: "Para tienda online", type: "image", url: "", thumbnail: "" },
      { id: 6, title: "Flat Lay", description: "Composicion de productos", type: "image", url: "", thumbnail: "" },
    ]
  },
  {
    id: "con-ia",
    name: "Catalogo Con IA",
    icon: Sparkles,
    description: "Catalogo generado y mejorado con inteligencia artificial",
    items: [
      { id: 1, title: "Modelo Virtual 1", description: "Avatar generado con IA", type: "image", url: "", thumbnail: "" },
      { id: 2, title: "Cambio de Fondo IA", description: "Background swap", type: "image", url: "", thumbnail: "" },
      { id: 3, title: "Virtual Try-On", description: "Probador virtual", type: "image", url: "", thumbnail: "" },
      { id: 4, title: "Producto 3D IA", description: "Render generativo", type: "image", url: "", thumbnail: "" },
      { id: 5, title: "Variaciones IA", description: "Multiples versiones", type: "image", url: "", thumbnail: "" },
      { id: 6, title: "Lookbook IA", description: "Coleccion generada", type: "image", url: "", thumbnail: "" },
    ]
  }
]

const WHATSAPP_NUMBER = "573019132001"
const WHATSAPP_MESSAGE = "👗 ¡Hola Jesus! 👋 Estoy interesado en crear un *Catalogo de Ropa* profesional 📸✨ Me gustaria conocer tus opciones con IA y fotografia tradicional. ¿Podemos conversar? 🚀💼"

export function GalleryCatalogoRopa() {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)
  const [activeTab, setActiveTab] = useState("sin-ia")

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <section id="catalogo-ropa" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Catalogo de Ropa
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Fotografia de moda y catalogo de productos con produccion tradicional e IA
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8 bg-muted">
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
              <p className="text-muted-foreground text-center mb-8">{category.description}</p>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {category.items.map(item => (
                  <Card 
                    key={item.id}
                    className="bg-background border-border overflow-hidden cursor-pointer group hover:border-primary/50 transition-all"
                    onClick={() => item.url && setSelectedItem(item)}
                  >
                    <div className="aspect-[3/4] relative bg-muted flex items-center justify-center">
                      {item.thumbnail || item.url ? (
                        <>
                          <img 
                            src={item.thumbnail || item.url} 
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                          {item.type === "video" && (
                            <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                              <Play className="h-12 w-12 text-primary" />
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                          <ImageIcon className="h-12 w-12" />
                          <span className="text-sm">Proximamente</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <div>
                          <h3 className="font-semibold text-foreground">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* CTA WhatsApp */}
        <div className="mt-12 text-center">
          <Button asChild size="lg" className="text-base px-8">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" />
              Solicitar Catalogo de Ropa
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
                    className="w-full rounded-lg max-h-[70vh] object-contain"
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
