"use client"

import { Button } from "@/components/ui/button"
import { 
  Calendar,
  Linkedin, 
  Mail, 
  MapPin, 
  Phone, 
  Youtube,
  MessageCircle
} from "lucide-react"

const WHATSAPP_NUMBER = "573019132001"
const WHATSAPP_MESSAGE_GENERAL = "🚀 ¡Hola Jesus! 👋 Vi tu portafolio y me gustaria hablar sobre un proyecto 💡 ¿Tienes disponibilidad para una llamada? 📞✨"
const WHATSAPP_MESSAGE_MEETING = "📅 ¡Hola Jesus! 👋 Me gustaria *agendar una consulta gratuita* de 30 minutos para conocer mi proyecto 🚀 ¿Cual es tu disponibilidad? 📞✨"

export function Contact() {
  const whatsappUrlGeneral = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE_GENERAL)}`
  const whatsappUrlMeeting = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE_MEETING)}`

  return (
    <section id="contacto" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Contacto
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            ¿Listo para llevar tu negocio al siguiente nivel? 
            Escríbeme por WhatsApp y conversemos sobre tu proyecto.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* WhatsApp CTA Principal */}
          <div className="bg-background rounded-2xl p-6 sm:p-8 border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              💬 Escribeme por WhatsApp
            </h3>

            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                La forma mas rapida de contactarme es por WhatsApp. Respondo en menos de 24 horas y podemos agendar una llamada para conocer tu proyecto.
              </p>

              <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">WhatsApp Directo</p>
                    <p className="text-sm text-muted-foreground">+57 301 913 2001</p>
                  </div>
                </div>
                <Button asChild size="lg" className="w-full text-base">
                  <a href={whatsappUrlGeneral} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    💬 Iniciar Conversacion
                  </a>
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-card rounded-lg border border-border">
                  <p className="text-2xl font-bold text-primary">{"<"}24h</p>
                  <p className="text-sm text-muted-foreground">Tiempo de respuesta</p>
                </div>
                <div className="text-center p-4 bg-card rounded-lg border border-border">
                  <p className="text-2xl font-bold text-primary">100%</p>
                  <p className="text-sm text-muted-foreground">Consulta gratuita</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Direct Contact */}
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-6">
                Informacion de Contacto
              </h3>
              <div className="space-y-4">
                <a 
                  href={whatsappUrlGeneral}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg bg-background border border-border hover:border-primary/50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">WhatsApp / Telefono</p>
                    <p className="text-foreground group-hover:text-primary transition-colors">
                      +57 301 913 2001 🇨🇴
                    </p>
                  </div>
                </a>

                <a 
                  href="mailto:contacto@jesuscharris.com"
                  className="flex items-center gap-4 p-4 rounded-lg bg-background border border-border hover:border-primary/50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Correo Electronico</p>
                    <p className="text-foreground group-hover:text-primary transition-colors">
                      contacto@jesuscharris.com
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-lg bg-background border border-border">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ubicacion</p>
                    <p className="text-foreground">
                      Colombia 🇨🇴 - Proyectos remotos globales 🌎
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule Meeting */}
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                📅 Agendar Reunion
              </h3>
              <a 
                href={whatsappUrlMeeting}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                    Agenda una consulta gratuita ✨
                  </p>
                  <p className="text-sm text-muted-foreground">
                    30 minutos para conocer tu proyecto 🚀
                  </p>
                </div>
              </a>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Redes Sociales
              </h3>
              <div className="flex gap-3">
                <a 
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-lg bg-background border border-border hover:border-primary/50 hover:bg-primary/10 transition-all flex items-center justify-center group"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
                <a 
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-lg bg-background border border-border hover:border-primary/50 hover:bg-primary/10 transition-all flex items-center justify-center group"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
