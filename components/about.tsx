import Image from "next/image"
import { Button } from "@/components/ui/button"
import { 
  BarChart3, 
  Code, 
  Lightbulb, 
  Megaphone, 
  Sparkles, 
  Target, 
  TrendingUp, 
  Video,
  Download
} from "lucide-react"
import Link from "next/link"

const skills = [
  { icon: Megaphone, label: "Marketing Digital Estrategico" },
  { icon: Target, label: "Trafico y Conversion" },
  { icon: Code, label: "Desarrollo Web" },
  { icon: Video, label: "Produccion Audiovisual" },
  { icon: Sparkles, label: "Inteligencia Artificial" },
  { icon: BarChart3, label: "Analytics y Metricas" },
  { icon: TrendingUp, label: "Growth Hacking" },
  { icon: Lightbulb, label: "Estrategia de Negocio" },
]

export function About() {
  return (
    <section id="sobre-mi" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Section - AQUI ESTA EL CAMBIO */}
          <div className="relative">
            <div className="aspect-square max-w-md mx-auto lg:mx-0 rounded-2xl bg-muted overflow-hidden border border-border relative">
              <Image 
                src="/Perfil.jpg" 
                alt="Jesus Charris" 
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-2xl -z-10" />
          </div>

          {/* Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Sobre Mi
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Soy un especialista integral en marketing digital estrategico, trafico y conversion, 
              desarrollo web y produccion audiovisual, con un enfoque practico en inteligencia 
              artificial aplicada a negocios.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Mi valor diferencial radica en combinar una vision de negocio clara con ejecucion 
              tecnica y creativa. Utilizo IA para optimizar procesos, acelerar lanzamientos y 
              obtener resultados medibles para mis clientes.
            </p>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg bg-background border border-border hover:border-primary/50 transition-colors"
                >
                  <skill.icon className="h-5 w-5 text-primary" />
                  <span className="text-xs text-muted-foreground text-center">{skill.label}</span>
                </div>
              ))}
            </div>

            <Button variant="outline" asChild>
              <Link href="#contacto">
                <Download className="mr-2 h-4 w-4" />
                Descargar CV
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}