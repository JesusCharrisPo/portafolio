"use client"

import { useState, useRef, MouseEvent } from "react"
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
  MessageCircle,
  Zap,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const WHATSAPP_NUMBER = "573019132001"

const services = [
  {
    id: 1,
    icon: Megaphone,
    title: "Marketing Digital Estratégico",
    shortDesc: "Análisis de negocio, embudos multicanal y planes de medios",
    fullDesc:
      "Desarrollo estrategias de marketing digital integrales que conectan cada punto de contacto con tu audiencia. Desde el análisis inicial hasta la implementación de embudos multicanal y dashboards de seguimiento.",
    capabilities: [
      "Análisis de negocio y competencia",
      "Embudos de conversión multicanal",
      "Planes de medios integrados",
      "Dashboards de métricas en tiempo real",
    ],
    kpis: ["CAC", "LTV", "ROAS", "Conversion Rate"],
    cta: "Solicitar Consultoría Estratégica",
    whatsappMessage:
      "📊 ¡Hola Jesus! 👋 Me interesa tu servicio de *Marketing Digital Estratégico* 🚀 Quiero mejorar mis embudos y estrategia. ¿Podemos hablar? 📞✨",
  },
  {
    id: 2,
    icon: Target,
    title: "Tráfico y Publicidad Digital",
    shortDesc: "Facebook Ads, Instagram Ads, Google Ads con optimización continua",
    fullDesc:
      "Gestión profesional de campañas publicitarias en las principales plataformas. Auditoría de accounts, estrategia de audiencias, pruebas A/B y reporting ejecutivo para maximizar tu inversión.",
    capabilities: [
      "Auditoría de cuentas publicitarias",
      "Estrategia de audiencias y segmentación",
      "Pruebas A/B y optimización continua",
      "Reporting ejecutivo mensual",
    ],
    kpis: ["CPL", "CPA", "CTR", "ROAS"],
    cta: "Ver Casos de Éxito",
    whatsappMessage:
      "🎯 ¡Hola Jesus! 👋 Necesito ayuda con *Tráfico y Publicidad Digital* 📈 Quiero mejorar mis campañas de ads. ¿Podemos revisar mi caso? 💰✨",
  },
  {
    id: 3,
    icon: Code,
    title: "Desarrollo Web",
    shortDesc: "WordPress, Shopify, arquitectura técnica e integraciones",
    fullDesc:
      "Creo sitios web profesionales y funcionales utilizando las mejores tecnologías. Desde landing pages hasta plataformas complejas con integraciones personalizadas.",
    capabilities: [
      "Desarrollo WordPress avanzado",
      "Tiendas Shopify optimizadas",
      "Arquitectura técnica escalable",
      "Integraciones con CRM y herramientas",
    ],
    kpis: ["Page Speed", "Core Web Vitals", "Conversion Rate"],
    cta: "Solicitar Propuesta Web",
    whatsappMessage:
      "💻 ¡Hola Jesus! 👋 Me interesa tu servicio de *Desarrollo Web* 🌐 Necesito un sitio profesional para mi negocio. ¿Podemos hablar? 🚀✨",
  },
  {
    id: 4,
    icon: Globe,
    title: "Landing Pages de Alta Conversión",
    shortDesc: "Diseño orientado a conversión, microcopys y pruebas A/B",
    fullDesc:
      "Diseño y desarrollo de landing pages optimizadas para convertir. Aplicando principios de UX, copywriting persuasivo y pruebas continuas para maximizar resultados.",
    capabilities: [
      "Diseño orientado a conversión",
      "Copywriting persuasivo",
      "Pruebas A/B sistemáticas",
      "Mapas de calor y optimización",
    ],
    kpis: ["Conversion Rate", "Bounce Rate", "Time on Page"],
    cta: "Ver Plantillas de Landing",
    whatsappMessage:
      "🚀 ¡Hola Jesus! 👋 Necesito una *Landing Page de Alta Conversión* 📈 Quiero maximizar mis resultados. ¿Podemos revisar mi proyecto? 💡✨",
  },
  {
    id: 5,
    icon: ShoppingCart,
    title: "E-commerce y Dropshipping",
    shortDesc: "Configuración, checkout UX, estrategias de tráfico y automatización",
    fullDesc:
      "Implementación completa de tiendas online con enfoque en experiencia de usuario y conversión. Desde la configuración hasta estrategias de tráfico y automatización de pedidos.",
    capabilities: [
      "Configuración de tiendas online",
      "Optimización de checkout y UX",
      "Estrategias de tráfico para e-commerce",
      "Automatización de flujos de pedidos",
    ],
    kpis: ["AOV", "Cart Abandonment", "Customer LTV"],
    cta: "Solicitar Estrategia eCommerce",
    whatsappMessage:
      "🛒 ¡Hola Jesus! 👋 Quiero crear o mejorar mi *E-commerce/Dropshipping* 🏪 Me interesa una estrategia completa. ¿Podemos conversar? 💰✨",
  },
  {
    id: 6,
    icon: Video,
    title: "Producción Audiovisual",
    shortDesc: "Guión, dirección, rodaje, edición y motion graphics",
    fullDesc:
      "Producción audiovisual profesional para marcas y empresas. Desde la conceptualización y guión hasta el rodaje, edición y post-producción con motion graphics.",
    capabilities: [
      "Guión y dirección creativa",
      "Rodaje profesional",
      "Edición y post-producción",
      "Motion graphics y animación",
    ],
    kpis: ["Engagement Rate", "View Duration", "Share Rate"],
    cta: "Ver Reel de Proyectos",
    whatsappMessage:
      "🎬 ¡Hola Jesus! 👋 Me interesa tu servicio de *Producción Audiovisual* 🎥 Quiero crear contenido profesional para mi marca. ¿Podemos hablar? ✨📞",
  },
  {
    id: 7,
    icon: Bot,
    title: "Inteligencia Artificial Aplicada",
    shortDesc: "IA generativa, chatbots, automatización y gobernanza",
    fullDesc:
      "Implementación de soluciones de IA para optimizar procesos de negocio. Desde chatbots inteligentes hasta automatización de tareas y generación de contenido.",
    capabilities: [
      "IA generativa para imágenes y video",
      "Chatbots y asistentes virtuales",
      "Automatización de procesos",
      "Gobernanza y ética de IA",
    ],
    kpis: ["Tiempo ahorrado", "Precisión", "ROI"],
    cta: "Explorar Soluciones IA",
    whatsappMessage:
      "🤖 ¡Hola Jesus! 👋 Me interesa implementar *Inteligencia Artificial* en mi negocio 🧠✨ Quiero automatizar y optimizar procesos. ¿Podemos hablar? 🚀",
  },
]

// ─── Spotlight Service Card ───────────────────────────────────────────

function ServiceCard({
  service,
  index,
  onClick,
}: {
  service: (typeof services)[0]
  index: number
  onClick: () => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setSpotlightPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="relative group cursor-pointer"
    >
      {/* Spotlight border glow */}
      <div
        className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: isHovered
            ? `radial-gradient(200px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(0,255,200,0.2), transparent 60%)`
            : "none",
        }}
      />

      {/* Card */}
      <div className="relative h-full rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden transition-all duration-500 group-hover:border-cyan-500/20">
        {/* Inner spotlight */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(180px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(0,255,200,0.04), transparent 60%)`,
            }}
          />
        )}

        {/* Scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
          }}
        />

        <div className="relative p-5 sm:p-6 space-y-4">
          {/* Icon */}
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-lg border border-cyan-500/20 bg-cyan-500/[0.06] flex items-center justify-center group-hover:border-cyan-500/40 group-hover:bg-cyan-500/[0.1] transition-all duration-500">
            <service.icon className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,200,0.3)] group-hover:drop-shadow-[0_0_12px_rgba(0,255,200,0.5)] transition-all duration-300" />
            {/* Pulse ring */}
            <div className="absolute inset-0 rounded-lg border border-cyan-500/10 animate-ping opacity-0 group-hover:opacity-20" />
          </div>

          {/* Title */}
          <h3 className="text-sm sm:text-base font-semibold text-white/90 font-mono tracking-wide group-hover:text-white transition-colors">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-[11px] sm:text-xs text-white/35 leading-relaxed line-clamp-2">
            {service.shortDesc}
          </p>

          {/* Bottom action */}
          <div className="pt-2 flex items-center gap-1.5 text-cyan-400/60 group-hover:text-cyan-400 transition-colors">
            <span className="text-[10px] sm:text-xs font-mono tracking-wider uppercase">
              Ver detalles
            </span>
            <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 group-hover:translate-x-1 transition-transform duration-300" />
          </div>

          {/* Decorative line */}
          <div className="h-px w-full bg-gradient-to-r from-cyan-500/20 via-transparent to-purple-500/20" />
        </div>

        {/* Corner cuts */}
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-cyan-500/0 group-hover:border-cyan-500/20 transition-colors duration-500" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-cyan-500/0 group-hover:border-cyan-500/20 transition-colors duration-500" />
      </div>
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────

export function Services() {
  const [selectedService, setSelectedService] = useState<(typeof services)[0] | null>(null)

  const getWhatsappUrl = (message: string) => {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  }

  return (
    <section id="servicios" className="relative py-16 sm:py-24 bg-[#07080d] overflow-hidden">
      {/* ── Background effects ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[400px] sm:w-[600px] h-[300px] sm:h-[500px] bg-cyan-500/[0.03] rounded-full blur-[100px] sm:blur-[140px]" />
        <div className="absolute bottom-1/4 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[400px] bg-purple-600/[0.03] rounded-full blur-[80px] sm:blur-[120px]" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/[0.05] mb-4 sm:mb-6">
            <Zap className="h-3 w-3 text-cyan-400" />
            <span className="text-[10px] sm:text-xs font-mono text-cyan-400 tracking-widest uppercase">
              Servicios
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 font-mono tracking-tight">
            Soluciones{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Integrales
            </span>
          </h2>

          <p className="text-white/35 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed px-4">
            Marketing digital, desarrollo web y producción audiovisual con un enfoque práctico en IA
            para acelerar el crecimiento de tu negocio.
          </p>
        </motion.div>

        {/* ── Services Grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              onClick={() => setSelectedService(service)}
            />
          ))}
        </div>

        {/* ── Detail Modal ── */}
        <AnimatePresence>
          {selectedService && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedService(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl sm:rounded-2xl border border-white/[0.08] bg-[#0c0d14]/95 backdrop-blur-xl"
              >
                {/* Scanline overlay */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.02] rounded-2xl"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
                  }}
                />

                {/* Top glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

                <div className="relative p-5 sm:p-8 space-y-5 sm:space-y-6">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg border border-cyan-500/30 bg-cyan-500/[0.08] flex items-center justify-center">
                        <selectedService.icon className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400 drop-shadow-[0_0_10px_rgba(0,255,200,0.4)]" />
                      </div>
                      <h3 className="text-base sm:text-xl font-bold text-white font-mono tracking-wide pr-8">
                        {selectedService.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedService(null)}
                      className="p-1.5 sm:p-2 rounded-lg border border-white/10 bg-white/5 text-white/50 hover:text-white hover:border-white/20 transition-all font-mono text-[10px] sm:text-xs flex-shrink-0"
                    >
                      ESC
                    </button>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-white/40 leading-relaxed">
                    {selectedService.fullDesc}
                  </p>

                  {/* Divider */}
                  <div className="h-px w-full bg-gradient-to-r from-cyan-500/20 via-white/[0.04] to-purple-500/20" />

                  {/* Capabilities */}
                  <div>
                    <h4 className="text-[10px] sm:text-xs font-mono text-cyan-400/70 tracking-widest uppercase mb-3">
                      Capacidades
                    </h4>
                    <ul className="space-y-2">
                      {selectedService.capabilities.map((cap, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + i * 0.08 }}
                          className="flex items-center gap-2.5 text-xs sm:text-sm text-white/50"
                        >
                          <span className="h-1 w-1 rounded-full bg-cyan-400/60 shadow-[0_0_4px_rgba(0,255,200,0.4)]" />
                          {cap}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* KPIs */}
                  <div>
                    <h4 className="text-[10px] sm:text-xs font-mono text-cyan-400/70 tracking-widest uppercase mb-3">
                      KPIs Clave
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedService.kpis.map((kpi, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 + i * 0.06 }}
                          className="px-3 py-1 text-[10px] sm:text-xs font-mono tracking-wider border border-cyan-500/20 bg-cyan-500/[0.06] text-cyan-400/80 rounded-full"
                        >
                          {kpi}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={getWhatsappUrl(selectedService.whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 font-mono text-xs tracking-wider uppercase overflow-hidden"
                    >
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/15 to-cyan-500/10 border border-cyan-500/30 transition-all duration-300 group-hover:from-cyan-500/25 group-hover:to-cyan-500/15 group-hover:border-cyan-400/50" />
                      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-400/50 rounded-tl-xl" />
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-400/50 rounded-br-xl" />

                      <MessageCircle className="relative z-10 h-4 w-4 text-cyan-400" />
                      <span className="relative z-10 text-cyan-300 group-hover:text-cyan-200 transition-colors">
                        {selectedService.cta}
                      </span>
                    </a>

                    <button
                      onClick={() => setSelectedService(null)}
                      className="px-5 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] text-white/40 hover:text-white/60 hover:border-white/[0.12] transition-all font-mono text-xs tracking-wider uppercase"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>

                {/* Corner decorations */}
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-cyan-500/15 rounded-tr-2xl" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-cyan-500/15 rounded-bl-2xl" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}