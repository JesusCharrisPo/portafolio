"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  BarChart3, 
  Bot, 
  Code, 
  Globe, 
  Megaphone, 
  ShoppingCart, 
  Target, 
  Video,
  ChevronRight,
  X,
  MessageCircle
} from "lucide-react"

const WHATSAPP_NUMBER = "573019132001"

const services = [
  {
    id: 1,
    icon: Megaphone,
    title: "Marketing Digital Estrategico",
    shortDesc: "Analisis de negocio, embudos multicanal y planes de medios",
    fullDesc: "Desarrollo estrategias de marketing digital integrales que conectan cada punto de contacto con tu audiencia. Desde el analisis inicial hasta la implementacion de embudos multicanal y dashboards de seguimiento.",
    capabilities: [
      "Analisis de negocio y competencia",
      "Embudos de conversion multicanal",
      "Planes de medios integrados",
      "Dashboards de metricas en tiempo real"
    ],
    kpis: ["CAC", "LTV", "ROAS", "Conversion Rate"],
    cta: "📊 Solicitar Consultoria Estrategica",
    whatsappMessage: "📊 ¡Hola Jesus! 👋 Me interesa tu servicio de *Marketing Digital Estrategico* 🚀 Quiero mejorar mis embudos y estrategia. ¿Podemos hablar? 📞✨"
  },
  {
    id: 2,
    icon: Target,
    title: "Trafico y Publicidad Digital",
    shortDesc: "Facebook Ads, Instagram Ads, Google Ads con optimizacion continua",
    fullDesc: "Gestion profesional de campanas publicitarias en las principales plataformas. Auditoria de accounts, estrategia de audiencias, pruebas A/B y reporting ejecutivo para maximizar tu inversion.",
    capabilities: [
      "Auditoria de cuentas publicitarias",
      "Estrategia de audiencias y segmentacion",
      "Pruebas A/B y optimizacion continua",
      "Reporting ejecutivo mensual"
    ],
    kpis: ["CPL", "CPA", "CTR", "ROAS"],
    cta: "🎯 Ver Casos de Exito en Trafico",
    whatsappMessage: "🎯 ¡Hola Jesus! 👋 Necesito ayuda con *Trafico y Publicidad Digital* 📈 Quiero mejorar mis campanas de ads. ¿Podemos revisar mi caso? 💰✨"
  },
  {
    id: 3,
    icon: Code,
    title: "Desarrollo Web",
    shortDesc: "WordPress, Shopify, arquitectura tecnica e integraciones",
    fullDesc: "Creo sitios web profesionales y funcionales utilizando las mejores tecnologias. Desde landing pages hasta plataformas complejas con integraciones personalizadas.",
    capabilities: [
      "Desarrollo WordPress avanzado",
      "Tiendas Shopify optimizadas",
      "Arquitectura tecnica escalable",
      "Integraciones con CRM y herramientas"
    ],
    kpis: ["Page Speed", "Core Web Vitals", "Conversion Rate"],
    cta: "💻 Solicitar Propuesta de Web",
    whatsappMessage: "💻 ¡Hola Jesus! 👋 Me interesa tu servicio de *Desarrollo Web* 🌐 Necesito un sitio profesional para mi negocio. ¿Podemos hablar? 🚀✨"
  },
  {
    id: 4,
    icon: Globe,
    title: "Landing Pages de Alta Conversion",
    shortDesc: "Diseno orientado a conversion, microcopys y pruebas A/B",
    fullDesc: "Diseno y desarrollo de landing pages optimizadas para convertir. Aplicando principios de UX, copywriting persuasivo y pruebas continuas para maximizar resultados.",
    capabilities: [
      "Diseno orientado a conversion",
      "Copywriting persuasivo",
      "Pruebas A/B sistematicas",
      "Mapas de calor y optimizacion"
    ],
    kpis: ["Conversion Rate", "Bounce Rate", "Time on Page"],
    cta: "🚀 Ver Plantillas de Landing",
    whatsappMessage: "🚀 ¡Hola Jesus! 👋 Necesito una *Landing Page de Alta Conversion* 📈 Quiero maximizar mis resultados. ¿Podemos revisar mi proyecto? 💡✨"
  },
  {
    id: 5,
    icon: ShoppingCart,
    title: "E-commerce y Dropshipping",
    shortDesc: "Configuracion, checkout UX, estrategias de trafico y automatizacion",
    fullDesc: "Implementacion completa de tiendas online con enfoque en experiencia de usuario y conversion. Desde la configuracion hasta estrategias de trafico y automatizacion de pedidos.",
    capabilities: [
      "Configuracion de tiendas online",
      "Optimizacion de checkout y UX",
      "Estrategias de trafico para e-commerce",
      "Automatizacion de flujos de pedidos"
    ],
    kpis: ["AOV", "Cart Abandonment", "Customer LTV"],
    cta: "🛒 Solicitar Estrategia de eCommerce",
    whatsappMessage: "🛒 ¡Hola Jesus! 👋 Quiero crear o mejorar mi *E-commerce/Dropshipping* 🏪 Me interesa una estrategia completa. ¿Podemos conversar? 💰✨"
  },
  {
    id: 6,
    icon: Video,
    title: "Produccion Audiovisual",
    shortDesc: "Guion, direccion, rodaje, edicion y motion graphics",
    fullDesc: "Produccion audiovisual profesional para marcas y empresas. Desde la conceptualizacion y guion hasta el rodaje, edicion y post-produccion con motion graphics.",
    capabilities: [
      "Guion y direccion creativa",
      "Rodaje profesional",
      "Edicion y post-produccion",
      "Motion graphics y animacion"
    ],
    kpis: ["Engagement Rate", "View Duration", "Share Rate"],
    cta: "🎬 Ver Reel de Proyectos",
    whatsappMessage: "🎬 ¡Hola Jesus! 👋 Me interesa tu servicio de *Produccion Audiovisual* 🎥 Quiero crear contenido profesional para mi marca. ¿Podemos hablar? ✨📞"
  },
  {
    id: 7,
    icon: Bot,
    title: "Inteligencia Artificial Aplicada",
    shortDesc: "IA generativa, chatbots, automatizacion y gobernanza",
    fullDesc: "Implementacion de soluciones de IA para optimizar procesos de negocio. Desde chatbots inteligentes hasta automatizacion de tareas y generacion de contenido.",
    capabilities: [
      "IA generativa para imagenes y video",
      "Chatbots y asistentes virtuales",
      "Automatizacion de procesos",
      "Gobernanza y etica de IA"
    ],
    kpis: ["Tiempo ahorrado", "Precision", "ROI"],
    cta: "🤖 Explorar Soluciones IA",
    whatsappMessage: "🤖 ¡Hola Jesus! 👋 Me interesa implementar *Inteligencia Artificial* en mi negocio 🧠✨ Quiero automatizar y optimizar procesos. ¿Podemos hablar? 🚀"
  }
]

export function Services() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null)

  const getWhatsappUrl = (message: string) => {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  }

  return (
    <section id="servicios" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Servicios
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Soluciones integrales de marketing digital, desarrollo web y produccion audiovisual 
            con un enfoque practico en IA para acelerar el crecimiento de tu negocio.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card 
              key={service.id} 
              className="bg-card border-border hover:border-primary/50 transition-all cursor-pointer group"
              onClick={() => setSelectedService(service)}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-foreground">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {service.shortDesc}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80">
                  Ver detalles
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Service Detail Modal */}
        {selectedService && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedService(null)}
          >
            <div 
              className="bg-card border border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <selectedService.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{selectedService.title}</h3>
                  </div>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                    aria-label="Cerrar"
                  >
                    <X className="h-5 w-5 text-muted-foreground" />
                  </button>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {selectedService.fullDesc}
                </p>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-foreground mb-3">Capacidades</h4>
                  <ul className="space-y-2">
                    {selectedService.capabilities.map((cap, index) => (
                      <li key={index} className="flex items-center gap-2 text-muted-foreground">
                        <ChevronRight className="h-4 w-4 text-primary" />
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-foreground mb-3">KPIs Clave</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedService.kpis.map((kpi, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full"
                      >
                        {kpi}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild className="flex-1">
                    <a href={getWhatsappUrl(selectedService.whatsappMessage)} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      {selectedService.cta}
                    </a>
                  </Button>
                  <Button variant="outline" className="bg-transparent" onClick={() => setSelectedService(null)}>
                    Cerrar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
