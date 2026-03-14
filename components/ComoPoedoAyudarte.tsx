"use client"

import { useState, useRef, MouseEvent } from "react"
import {
  TrendingUp, Megaphone, Globe, Zap, ShoppingCart,
  Video, Bot, ChevronDown, ArrowUpRight, Check,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// ─── Data ─────────────────────────────────────────────────────────────

const services = [
  {
    id: "marketing",
    code: "01",
    icon: TrendingUp,
    color: "#00ffe1",
    category: "Estrategia",
    title: "Marketing Digital Estratégico",
    short: "Análisis de negocio, embudos multicanal y planes de medios",
    description:
      "Diseño estrategias de marketing basadas en datos reales de tu negocio. Identifico oportunidades, construyo embudos de conversión y ejecuto planes de medios que generan resultados medibles.",
    deliverables: [
      "Auditoría completa de tu negocio digital",
      "Mapa de embudo de ventas personalizado",
      "Plan de medios mensual con KPIs",
      "Reportes de rendimiento semanales",
      "Estrategia de contenido por canal",
    ],
    waText: "Hola Jesus! Me interesa tu servicio de *Marketing Digital Estratégico*. ¿Podemos hablar?",
  },
  {
    id: "trafico",
    code: "02",
    icon: Megaphone,
    color: "#b400ff",
    category: "Publicidad",
    title: "Tráfico y Publicidad Digital",
    short: "Facebook Ads, Instagram Ads, Google Ads con optimización continua",
    description:
      "Manejo campañas de pauta digital en todas las plataformas con optimización constante. Mi enfoque está en el ROAS: cada peso invertido debe generar retorno medible.",
    deliverables: [
      "Configuración y auditoría de cuentas publicitarias",
      "Creación de audiencias y segmentaciones",
      "Diseño de creativos y copys para anuncios",
      "Optimización continua de campañas",
      "Reporte mensual de resultados con ROAS",
    ],
    waText: "Hola Jesus! Me interesa tu servicio de *Tráfico y Publicidad Digital*. ¿Podemos hablar?",
  },
  {
    id: "web",
    code: "03",
    icon: Globe,
    color: "#00ffe1",
    category: "Desarrollo",
    title: "Desarrollo Web",
    short: "WordPress, Shopify, Next.js, arquitectura técnica e integraciones",
    description:
      "Desarrollo sitios web y tiendas online que no solo se ven bien, sino que convierten. Desde landing pages hasta e-commerce completos, con foco en velocidad, SEO y experiencia de usuario.",
    deliverables: [
      "Diseño UI/UX personalizado para tu marca",
      "Desarrollo en WordPress, Shopify o Next.js",
      "Integración de pasarelas de pago",
      "Optimización SEO técnico y velocidad",
      "Capacitación para gestionar tu sitio",
    ],
    waText: "Hola Jesus! Me interesa tu servicio de *Desarrollo Web*. ¿Podemos hablar?",
  },
  {
    id: "landing",
    code: "04",
    icon: Zap,
    color: "#f59e0b",
    category: "Conversión",
    title: "Landing Pages de Alta Conversión",
    short: "Diseño orientado a conversión, microcopys y pruebas A/B",
    description:
      "Creo landing pages diseñadas científicamente para convertir visitantes en clientes. Cada elemento tiene un propósito: desde el headline hasta el CTA, todo está pensado para vender.",
    deliverables: [
      "Investigación de competencia y propuesta de valor",
      "Diseño con psicología de conversión",
      "Copywriting persuasivo y microcopys",
      "Integración con CRM y email marketing",
      "Pruebas A/B para optimización continua",
    ],
    waText: "Hola Jesus! Me interesa tu servicio de *Landing Pages de Alta Conversión*. ¿Podemos hablar?",
  },
  {
    id: "ecommerce",
    code: "05",
    icon: ShoppingCart,
    color: "#10b981",
    category: "E-commerce",
    title: "E-commerce y Dropshipping",
    short: "Configuración, checkout UX, estrategias de tráfico y automatización",
    description:
      "Configuro tiendas online completas con enfoque en maximizar el ticket promedio y minimizar el abandono de carrito. Tengo experiencia real con dropshipping en el mercado latinoamericano.",
    deliverables: [
      "Configuración completa de tienda Shopify/WooCommerce",
      "Checkout optimizado para COD y pagos locales",
      "Estrategia de productos y pricing",
      "Automatizaciones de recuperación de carrito",
      "Sistema de tracking y analítica avanzada",
    ],
    waText: "Hola Jesus! Me interesa tu servicio de *E-commerce y Dropshipping*. ¿Podemos hablar?",
  },
  {
    id: "audiovisual",
    code: "06",
    icon: Video,
    color: "#ef4444",
    category: "Audiovisual",
    title: "Producción Audiovisual",
    short: "Guión, dirección, rodaje, edición y motion graphics",
    description:
      "Produzco contenido audiovisual profesional para marcas que quieren destacar. Desde reels para redes sociales hasta fashion films completos, con dirección de arte y estética de alto impacto.",
    deliverables: [
      "Conceptualización y guión creativo",
      "Dirección de arte y estilismo",
      "Rodaje con equipo profesional",
      "Edición, colorización y motion graphics",
      "Entrega en formatos optimizados para cada plataforma",
    ],
    waText: "Hola Jesus! Me interesa tu servicio de *Producción Audiovisual*. ¿Podemos hablar?",
  },
  {
    id: "ia",
    code: "07",
    icon: Bot,
    color: "#b400ff",
    category: "IA Aplicada",
    title: "Inteligencia Artificial Aplicada",
    short: "IA generativa, chatbots, automatización de procesos y CGI",
    description:
      "Implemento soluciones de IA que reducen costos operativos y aceleran resultados. Desde chatbots de atención al cliente hasta producción de imágenes y video con IA generativa para campañas.",
    deliverables: [
      "Chatbots de atención al cliente con IA",
      "Automatización de procesos repetitivos",
      "Producción de imágenes CGI con IA generativa",
      "Videos publicitarios generados con IA",
      "Estrategia de implementación de IA en tu negocio",
    ],
    waText: "Hola Jesus! Me interesa tu servicio de *Inteligencia Artificial Aplicada*. ¿Podemos hablar?",
  },
]

// ─── Spotlight Card ───────────────────────────────────────────────────

function SpotlightCard({ children, active }: { children: React.ReactNode; active: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const move = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top })
  }

  return (
    <div
      ref={ref}
      onMouseMove={move}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative"
    >
      {(hovered || active) && (
        <div
          className="absolute -inset-px pointer-events-none z-0 transition-opacity duration-300"
          style={{
            borderRadius: 12,
            background: hovered
              ? `radial-gradient(300px circle at ${pos.x}px ${pos.y}px, rgba(0,255,225,0.12), transparent 60%)`
              : "none",
            opacity: active ? 0 : 1,
          }}
        />
      )}
      {children}
    </div>
  )
}

// ─── Service Card ─────────────────────────────────────────────────────

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0]
  index: number
}) {
  const [open, setOpen] = useState(false)
  const Icon = service.icon
  const waUrl = `https://wa.me/573043819731?text=${encodeURIComponent(`🚀 ¡Hola Jesus! 👋 ${service.waText} 📞✨`)}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.45 }}
    >
      <SpotlightCard active={open}>
        <div
          className="relative rounded-xl overflow-hidden transition-all duration-300"
          style={{
            border: open
              ? `1px solid ${service.color}30`
              : "1px solid rgba(255,255,255,0.06)",
            background: open ? `${service.color}06` : "rgba(255,255,255,0.02)",
            boxShadow: open ? `0 0 40px ${service.color}08` : "none",
          }}
        >
          {/* Top accent line when open */}
          {open && (
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${service.color}60, transparent)`,
                boxShadow: `0 0 8px ${service.color}`,
              }}
            />
          )}

          {/* ── Header row ── */}
          <button
            onClick={() => setOpen(!open)}
            className="w-full flex items-center gap-4 p-5 sm:p-6 text-left group"
          >
            {/* Icon */}
            <div
              className="flex-shrink-0 w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-300"
              style={{
                border: `1px solid ${open ? service.color + "40" : "rgba(255,255,255,0.08)"}`,
                background: open ? `${service.color}10` : "rgba(255,255,255,0.03)",
              }}
            >
              <Icon
                className="h-5 w-5 transition-colors duration-300"
                style={{ color: open ? service.color : "rgba(255,255,255,0.3)" }}
              />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-[9px] font-mono tracking-[0.2em] uppercase px-2 py-0.5 rounded"
                  style={{
                    border: `1px solid ${service.color}25`,
                    background: `${service.color}08`,
                    color: `${service.color}99`,
                  }}
                >
                  {service.category}
                </span>
                <span className="text-[9px] font-mono" style={{ color: "rgba(255,255,255,0.15)" }}>
                  {service.code}
                </span>
              </div>
              <h3
                className="text-sm sm:text-base font-bold font-mono tracking-wide transition-colors duration-300"
                style={{ color: open ? "#fff" : "rgba(255,255,255,0.75)" }}
              >
                {service.title}
              </h3>
              <p className="text-[11px] sm:text-xs font-mono mt-0.5 hidden sm:block" style={{ color: "rgba(255,255,255,0.25)" }}>
                {service.short}
              </p>
            </div>

            {/* Chevron */}
            <div
              className="flex-shrink-0 w-7 h-7 rounded flex items-center justify-center transition-all duration-300"
              style={{
                border: `1px solid ${open ? service.color + "30" : "rgba(255,255,255,0.07)"}`,
                background: open ? `${service.color}08` : "transparent",
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              <ChevronDown
                className="h-4 w-4 transition-colors duration-300"
                style={{ color: open ? service.color : "rgba(255,255,255,0.3)" }}
              />
            </div>
          </button>

          {/* ── Expanded content ── */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div
                  className="px-5 sm:px-6 pb-6"
                  style={{ borderTop: `1px solid ${service.color}15` }}
                >
                  {/* Description */}
                  <p className="text-sm font-mono leading-relaxed mt-5 mb-5" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {service.description}
                  </p>

                  {/* Deliverables */}
                  <div className="mb-6">
                    <p className="text-[9px] font-mono tracking-[0.25em] uppercase mb-3" style={{ color: `${service.color}60` }}>
                      // QUÉ INCLUYE
                    </p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {service.deliverables.map((item, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <div
                            className="flex-shrink-0 w-4 h-4 rounded-sm flex items-center justify-center mt-0.5"
                            style={{ background: `${service.color}15`, border: `1px solid ${service.color}30` }}
                          >
                            <Check className="h-2.5 w-2.5" style={{ color: service.color }} />
                          </div>
                          <span className="text-[11px] sm:text-xs font-mono leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn relative inline-flex items-center gap-3 px-5 py-3 font-mono text-xs font-bold tracking-[0.15em] uppercase overflow-hidden transition-all duration-300"
                    style={{
                      border: `1px solid ${service.color}40`,
                      background: `${service.color}08`,
                      color: service.color,
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = `${service.color}16`
                      e.currentTarget.style.borderColor = `${service.color}70`
                      e.currentTarget.style.boxShadow = `0 0 20px ${service.color}20`
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = `${service.color}08`
                      e.currentTarget.style.borderColor = `${service.color}40`
                      e.currentTarget.style.boxShadow = "none"
                    }}
                  >
                    {/* sweep */}
                    <span
                      className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 pointer-events-none"
                      style={{ background: `linear-gradient(90deg,transparent,${service.color}10,transparent)` }}
                    />
                    <span className="relative z-10">Solicitar este servicio</span>
                    <ArrowUpRight className="relative z-10 h-3.5 w-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SpotlightCard>
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────

export function ComoPoedoAyudarte() {
  const waConsulta = `https://wa.me/573043819731?text=${encodeURIComponent("🚀 ¡Hola Jesus! 👋 Vi tu portafolio y me interesa una *consulta gratuita* para mi proyecto 💡 ¿Podemos agendar una llamada? 📞✨")}`

  return (
    <section id="servicios" className="relative py-16 sm:py-24 overflow-hidden" style={{ background: "#07080d" }}>

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full blur-[140px]" style={{ background: "rgba(0,200,180,0.04)" }} />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] rounded-full blur-[120px]" style={{ background: "rgba(180,0,255,0.04)" }} />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ border: "1px solid rgba(0,255,225,0.2)", background: "rgba(0,255,225,0.04)" }}>
            <div className="w-1.5 h-1.5 rounded-full bg-[#00ffe1] animate-pulse" style={{ boxShadow: "0 0 6px rgba(0,255,225,1)" }} />
            <span className="text-[10px] font-mono text-[#00ffe1]/60 tracking-[0.25em] uppercase">
              ¿Cómo puedo ayudarte?
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4 font-mono tracking-tight">
            ¿Cómo puedo{" "}
            <span
              className="text-transparent"
              style={{
                background: "linear-gradient(90deg,#00ffe1,#b400ff)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
              }}
            >
              ayudarte?
            </span>
          </h2>

          <p className="text-white/35 max-w-xl mx-auto text-sm font-mono leading-relaxed">
            Marketing digital, desarrollo web y producción audiovisual con IA. Haz clic en cada servicio para ver qué incluye.
          </p>
        </motion.div>

        {/* ── Services list ── */}
        <div className="flex flex-col gap-3">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <p className="text-[10px] font-mono tracking-[0.25em] uppercase mb-5" style={{ color: "rgba(255,255,255,0.2)" }}>
            ¿No sabes qué necesitas? Hablemos primero
          </p>
          <a
            href={waConsulta}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-8 py-4 font-mono text-sm font-bold tracking-[0.15em] uppercase overflow-hidden transition-all duration-300"
            style={{
              border: "1px solid rgba(0,255,225,0.3)",
              background: "rgba(0,255,225,0.05)",
              color: "#00ffe1",
              boxShadow: "0 0 20px rgba(0,255,225,0.06)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(0,255,225,0.12)"
              e.currentTarget.style.borderColor = "rgba(0,255,225,0.6)"
              e.currentTarget.style.boxShadow = "0 0 30px rgba(0,255,225,0.15)"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "rgba(0,255,225,0.05)"
              e.currentTarget.style.borderColor = "rgba(0,255,225,0.3)"
              e.currentTarget.style.boxShadow = "0 0 20px rgba(0,255,225,0.06)"
            }}
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"
              style={{ background: "linear-gradient(90deg,transparent,rgba(0,255,225,0.08),transparent)" }} />
            <Zap className="relative z-10 h-4 w-4" />
            <span className="relative z-10">Consulta gratuita — 30 min</span>
            <ArrowUpRight className="relative z-10 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
