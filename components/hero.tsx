import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BarChart3, Globe, Sparkles, Video, MessageCircle } from "lucide-react"

const valuePoints = [
  { icon: BarChart3, text: "Business Analytics y Embudos Multicanal" },
  { icon: Globe, text: "Sitios Web de Alto Rendimiento" },
  { icon: Sparkles, text: "IA Aplicada a Negocios" },
  { icon: Video, text: "Produccion Audiovisual Profesional" },
]

const WHATSAPP_NUMBER = "573019132001"
const WHATSAPP_MESSAGE = "🚀 ¡Hola Jesus! 👋 Vi tu portafolio y me interesa una *consulta gratuita* para mi proyecto 💡 ¿Podemos agendar una llamada? 📞✨"

export function Hero() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
            Jesus Charris
          </h1>
          <p className="mt-4 text-xl sm:text-2xl text-primary font-medium">
            Estrategia de Marketing Digital, Desarrollo Web y Produccion Audiovisual con IA
          </p>
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
            Convierto ideas en crecimiento sostenible: estrategia, ejecucion y tecnologia para resultados medibles
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="text-base px-8">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                Solicitar Consulta
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-base px-8 bg-transparent">
              <Link href="#servicios">Ver Servicios</Link>
            </Button>
          </div>

          {/* Value Points */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valuePoints.map((point, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-3 p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
              >
                <point.icon className="h-8 w-8 text-primary" />
                <span className="text-sm text-foreground text-center font-medium">{point.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
