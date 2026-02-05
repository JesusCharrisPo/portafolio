"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Play, ImageIcon, Video, Sparkles, MessageCircle, Zap, Cpu, Camera, ArrowRight } from "lucide-react"

// ... (Tipos y categorías se mantienen igual para no romper tu lógica de datos)

export function GalleryAudiovisual() {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)
  const [activeMainTab, setActiveMainTab] = useState("sin-ia")
  const [activeSubTab, setActiveSubTab] = useState("videos-sin-ia")

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <section id="galeria-audiovisual" className="py-24 bg-background relative overflow-hidden">
      {/* Sutiles acentos de luz para dar profundidad sin ensuciar otras secciones */}
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
                  {cat.id === "con-ia" ? <Sparkles className="h-4 w-4" /> : <Camera className="h-4 w-4" />}
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
                            
                            {item.type === "video" && (
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
              <span>SOLICITAR CONSULTORÍA VISUAL</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}