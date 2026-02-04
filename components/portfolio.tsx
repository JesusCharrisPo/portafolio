"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  ExternalLink, 
  Play,
  X,
  BarChart3,
  Globe,
  Video,
  Bot
} from "lucide-react"

const categories = [
  { id: "all", label: "Todos" },
  { id: "marketing", label: "Marketing Digital" },
  { id: "web", label: "Desarrollo Web" },
  { id: "audiovisual", label: "Audiovisual" },
  { id: "ia", label: "IA Aplicada" },
]

const projects = [
  {
    id: 1,
    title: "Campana de Lanzamiento E-commerce",
    category: "marketing",
    icon: BarChart3,
    description: "Estrategia multicanal para lanzamiento de tienda online con +200% ROAS en 3 meses",
    metrics: ["ROAS 3.2x", "+150% Conversiones", "-40% CAC"],
    image: "/placeholder-project-1.jpg"
  },
  {
    id: 2,
    title: "Plataforma SaaS B2B",
    category: "web",
    icon: Globe,
    description: "Desarrollo completo de plataforma web con integraciones CRM y automatizaciones",
    metrics: ["99.9% Uptime", "Core Web Vitals A+", "+60% Leads"],
    image: "/placeholder-project-2.jpg"
  },
  {
    id: 3,
    title: "Video Corporativo Institucional",
    category: "audiovisual",
    icon: Video,
    description: "Produccion audiovisual completa para presentacion corporativa internacional",
    metrics: ["500K Views", "4.8/5 Rating", "12 Idiomas"],
    image: "/placeholder-project-3.jpg"
  },
  {
    id: 4,
    title: "Chatbot de Atencion al Cliente",
    category: "ia",
    icon: Bot,
    description: "Implementacion de asistente virtual con IA para automatizar soporte 24/7",
    metrics: ["-70% Tickets", "95% Precision", "24/7 Disponible"],
    image: "/placeholder-project-4.jpg"
  },
  {
    id: 5,
    title: "Embudo de Ventas High-Ticket",
    category: "marketing",
    icon: BarChart3,
    description: "Diseno e implementacion de funnel para servicios premium con webinars",
    metrics: ["$250K Generados", "8% Conversion", "LTV +180%"],
    image: "/placeholder-project-5.jpg"
  },
  {
    id: 6,
    title: "Landing Page de Alta Conversion",
    category: "web",
    icon: Globe,
    description: "Diseno y desarrollo de landing page optimizada con pruebas A/B continuas",
    metrics: ["12% Conversion", "-50% Bounce", "+3min Tiempo"],
    image: "/placeholder-project-6.jpg"
  },
]

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(p => p.category === activeCategory)

  return (
    <section id="portafolio" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Portafolio de Proyectos
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Casos de exito y proyectos destacados que demuestran resultados medibles 
            y el impacto de estrategias bien ejecutadas.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={activeCategory === cat.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(cat.id)}
              className={activeCategory === cat.id ? "" : "bg-transparent"}
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card 
              key={project.id}
              className="bg-background border-border hover:border-primary/50 transition-all cursor-pointer group overflow-hidden"
              onClick={() => setSelectedProject(project)}
            >
              <div className="aspect-video bg-muted relative overflow-hidden">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-muted">
                  <project.icon className="h-12 w-12 text-primary/50" />
                </div>
                <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Play className="h-12 w-12 text-primary" />
                </div>
              </div>
              <CardContent className="p-5">
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.metrics.slice(0, 2).map((metric, index) => (
                    <span 
                      key={index}
                      className="text-xs px-2 py-1 bg-primary/10 text-primary rounded"
                    >
                      {metric}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <div 
              className="bg-card border border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video bg-muted relative">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-muted">
                  <selectedProject.icon className="h-16 w-16 text-primary/50" />
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 bg-background/80 hover:bg-background rounded-full transition-colors"
                  aria-label="Cerrar"
                >
                  <X className="h-5 w-5 text-foreground" />
                </button>
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {selectedProject.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-foreground mb-3">Resultados Clave</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.metrics.map((metric, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild className="flex-1">
                    <a href="#contacto">
                      Solicitar Proyecto Similar
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
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
