"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Play, ImageIcon, MessageCircle } from "lucide-react"

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
  items: MediaItem[]
}

const categories: Category[] = [
  {
    id: "shopify",
    name: "Shopify",
    items: [
      { id: 1, title: "Tienda de Moda", description: "E-commerce completo con Shopify", type: "image", url: "", thumbnail: "" },
      { id: 2, title: "Tienda de Accesorios", description: "Shopify con integraciones", type: "image", url: "", thumbnail: "" },
      { id: 3, title: "Dropshipping Store", description: "Automatizacion completa", type: "image", url: "", thumbnail: "" },
    ]
  },
  {
    id: "wordpress",
    name: "WordPress",
    items: [
      { id: 1, title: "Portafolio Creativo", description: "Sitio web profesional", type: "image", url: "", thumbnail: "" },
      { id: 2, title: "Blog Corporativo", description: "WordPress optimizado SEO", type: "image", url: "", thumbnail: "" },
      { id: 3, title: "Landing Page", description: "Alta conversion", type: "image", url: "", thumbnail: "" },
    ]
  },
  {
    id: "dropshipping",
    name: "Dropshipping",
    items: [
      { id: 1, title: "Tienda Nicho", description: "Dropshipping automatizado", type: "image", url: "", thumbnail: "" },
      { id: 2, title: "Multi-producto", description: "Catalogo extenso", type: "image", url: "", thumbnail: "" },
      { id: 3, title: "One Product Store", description: "Enfocado en conversion", type: "image", url: "", thumbnail: "" },
    ]
  }
]

const WHATSAPP_NUMBER = "573019132001"
const WHATSAPP_MESSAGE = "🚀 ¡Hola Jesus! 👋 Estoy interesado en tus servicios de *Desarrollo Web* 💻 Me gustaria saber mas sobre como puedes ayudarme con mi proyecto. ¿Podemos agendar una llamada? 📞✨"

export function GalleryDesarrolloWeb() {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)
  const [activeTab, setActiveTab] = useState("shopify")

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <section id="galeria-web" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Desarrollo Web
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Portafolio de sitios web en Shopify, WordPress y soluciones de Dropshipping
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-muted">
            {categories.map(cat => (
              <TabsTrigger 
                key={cat.id} 
                value={cat.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {cat.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map(category => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map(item => (
                  <Card 
                    key={item.id}
                    className="bg-background border-border overflow-hidden cursor-pointer group hover:border-primary/50 transition-all"
                    onClick={() => item.url && setSelectedItem(item)}
                  >
                    <div className="aspect-video relative bg-muted flex items-center justify-center">
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
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
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
              Solicitar Propuesta de Web
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
