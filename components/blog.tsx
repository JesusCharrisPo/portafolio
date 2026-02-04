import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BookOpen, Download, FileText, Sparkles, Video } from "lucide-react"
import Link from "next/link"

const articles = [
  {
    id: 1,
    icon: Sparkles,
    title: "Como Usar IA para Optimizar tus Campanas de Marketing",
    description: "Guia practica para implementar inteligencia artificial en tu estrategia de marketing digital y mejorar resultados.",
    category: "IA Aplicada",
    readTime: "8 min"
  },
  {
    id: 2,
    icon: Video,
    title: "Video Marketing: Tendencias para Este Ano",
    description: "Las tendencias de video marketing que estan dominando el mercado y como aplicarlas a tu negocio.",
    category: "Audiovisual",
    readTime: "6 min"
  },
  {
    id: 3,
    icon: BookOpen,
    title: "Embudos de Conversion: Guia Completa",
    description: "Todo lo que necesitas saber para disenar e implementar embudos de ventas que convierten.",
    category: "Marketing Digital",
    readTime: "12 min"
  },
]

const resources = [
  {
    id: 1,
    icon: FileText,
    title: "Checklist de Lanzamiento Digital",
    description: "Lista completa para lanzar tu producto o servicio online",
    type: "PDF"
  },
  {
    id: 2,
    icon: FileText,
    title: "Plantilla de Plan de Marketing",
    description: "Estructura tu estrategia de marketing paso a paso",
    type: "Template"
  },
  {
    id: 3,
    icon: FileText,
    title: "Guia de Prompts para IA",
    description: "Coleccion de prompts efectivos para ChatGPT y herramientas IA",
    type: "PDF"
  },
]

export function Blog() {
  return (
    <section id="blog" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Blog y Recursos
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Articulos, guias y recursos gratuitos sobre marketing digital, 
            desarrollo web, produccion audiovisual e IA aplicada a negocios.
          </p>
        </div>

        {/* Articles */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-foreground mb-6">Articulos Recientes</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Card 
                key={article.id}
                className="bg-card border-border hover:border-primary/50 transition-all group"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-primary font-medium">{article.category}</span>
                    <span className="text-xs text-muted-foreground">{article.readTime}</span>
                  </div>
                  <CardTitle className="text-foreground group-hover:text-primary transition-colors text-lg">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {article.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80">
                    Leer articulo
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-6">Recursos Descargables</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <div 
                key={resource.id}
                className="flex items-start gap-4 p-5 rounded-lg bg-card border border-border hover:border-primary/50 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <resource.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {resource.title}
                    </h4>
                    <span className="text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded">
                      {resource.type}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {resource.description}
                  </p>
                  <Button variant="ghost" size="sm" className="p-0 h-auto text-primary hover:text-primary/80">
                    <Download className="mr-1 h-4 w-4" />
                    Descargar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
