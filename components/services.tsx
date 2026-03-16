"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import {
  BarChart3, Bot, Code, Globe, Megaphone, ShoppingCart,
  Target, Video, MessageCircle, Zap, X, ArrowRight, ChevronRight,
} from "lucide-react"

// ─── Data ─────────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: 1, icon: Megaphone, color: "#a78bfa", glow: "rgba(167,139,250,",
    title: "Marketing Digital Estratégico",
    short: "Embudos multicanal y planes de medios",
    full: "Desarrollo estrategias de marketing digital integrales que conectan cada punto de contacto con tu audiencia. Desde el análisis inicial hasta la implementación de embudos multicanal y dashboards de seguimiento.",
    caps: ["Análisis de negocio y competencia", "Embudos de conversión multicanal", "Planes de medios integrados", "Dashboards de métricas en tiempo real"],
    kpis: ["CAC", "LTV", "ROAS", "Conv. Rate"],
    msg: "📊 ¡Hola Jesus! Me interesa tu servicio de *Marketing Digital Estratégico* 🚀 ¿Podemos hablar?",
  },
  {
    id: 2, icon: Target, color: "#f472b6", glow: "rgba(244,114,182,",
    title: "Tráfico y Publicidad Digital",
    short: "Facebook Ads, Google Ads con optimización continua",
    full: "Gestión profesional de campañas en las principales plataformas. Auditoría de accounts, estrategia de audiencias, pruebas A/B y reporting ejecutivo para maximizar tu inversión.",
    caps: ["Auditoría de cuentas publicitarias", "Estrategia de audiencias", "Pruebas A/B y optimización", "Reporting ejecutivo mensual"],
    kpis: ["CPL", "CPA", "CTR", "ROAS"],
    msg: "🎯 ¡Hola Jesus! Necesito ayuda con *Tráfico y Publicidad Digital* 📈 ¿Podemos revisar mi caso?",
  },
  {
    id: 3, icon: Code, color: "#22d3ee", glow: "rgba(34,211,238,",
    title: "Desarrollo Web",
    short: "WordPress, Shopify, arquitectura técnica",
    full: "Sitios web profesionales y funcionales con las mejores tecnologías. Desde landing pages hasta plataformas complejas con integraciones personalizadas y rendimiento optimizado.",
    caps: ["Desarrollo WordPress avanzado", "Tiendas Shopify optimizadas", "Arquitectura técnica escalable", "Integraciones con CRM y herramientas"],
    kpis: ["Page Speed", "Core Web Vitals", "Conv. Rate"],
    msg: "💻 ¡Hola Jesus! Me interesa tu servicio de *Desarrollo Web* 🌐 ¿Podemos hablar?",
  },
  {
    id: 4, icon: Globe, color: "#34d399", glow: "rgba(52,211,153,",
    title: "Landing Pages de Alta Conversión",
    short: "Diseño orientado a conversión y pruebas A/B",
    full: "Landing pages optimizadas para convertir aplicando principios de UX, copywriting persuasivo y pruebas continuas para maximizar resultados desde el primer día.",
    caps: ["Diseño orientado a conversión", "Copywriting persuasivo", "Pruebas A/B sistemáticas", "Mapas de calor y optimización"],
    kpis: ["Conv. Rate", "Bounce Rate", "Time on Page"],
    msg: "🚀 ¡Hola Jesus! Necesito una *Landing Page de Alta Conversión* 📈 ¿Podemos hablar?",
  },
  {
    id: 5, icon: ShoppingCart, color: "#fbbf24", glow: "rgba(251,191,36,",
    title: "E-commerce y Dropshipping",
    short: "Checkout UX, tráfico y automatización",
    full: "Implementación completa de tiendas online con foco en experiencia de usuario y conversión. Desde la configuración hasta estrategias de tráfico y automatización de pedidos.",
    caps: ["Configuración de tiendas online", "Optimización de checkout UX", "Estrategias de tráfico", "Automatización de pedidos"],
    kpis: ["AOV", "Cart Abandon.", "LTV"],
    msg: "🛒 ¡Hola Jesus! Quiero mejorar mi *E-commerce* 🏪 ¿Podemos conversar?",
  },
  {
    id: 6, icon: Video, color: "#fb7185", glow: "rgba(251,113,133,",
    title: "Producción Audiovisual",
    short: "Guión, dirección, edición y motion graphics",
    full: "Producción audiovisual profesional para marcas y empresas. Desde la conceptualización hasta el rodaje, edición, post-producción y motion graphics con IA.",
    caps: ["Guión y dirección creativa", "Rodaje profesional", "Edición y post-producción", "Motion graphics y animación IA"],
    kpis: ["Engagement", "View Duration", "Share Rate"],
    msg: "🎬 ¡Hola Jesus! Me interesa tu servicio de *Producción Audiovisual* 🎥 ¿Podemos hablar?",
  },
  {
    id: 7, icon: Bot, color: "#38bdf8", glow: "rgba(56,189,248,",
    title: "Inteligencia Artificial Aplicada",
    short: "IA generativa, chatbots y automatización",
    full: "Implementación de soluciones de IA para optimizar procesos de negocio. Chatbots inteligentes, automatización de tareas, generación de contenido y gobernanza responsable.",
    caps: ["IA generativa para imágenes y video", "Chatbots y asistentes virtuales", "Automatización de procesos", "Gobernanza y ética de IA"],
    kpis: ["Tiempo ahorrado", "Precisión", "ROI"],
    msg: "🤖 ¡Hola Jesus! Me interesa implementar *IA* en mi negocio 🧠 ¿Podemos hablar?",
  },
]

const WHATSAPP_BASE = "https://wa.me/573043819731?text="

// ─── Holo Card ────────────────────────────────────────────────────────

function HoloCard({ svc, index, onOpen }: { svc: typeof SERVICES[0]; index: number; onOpen: () => void }) {
  const ref    = useRef<HTMLDivElement>(null)
  const [m, setM]       = useState({ x: 0.5, y: 0.5 })
  const [hov, setHov]   = useState(false)
  const [vis, setVis]   = useState(false)
  const Icon = svc.icon

  useEffect(() => {
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setVis(true), index * 80); ob.disconnect() } },
      { threshold: 0.15 }
    )
    if (ref.current) ob.observe(ref.current)
    return () => ob.disconnect()
  }, [index])

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    setM({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height })
  }, [])

  const rx = (m.y - 0.5) * -10
  const ry = (m.x - 0.5) *  14

  return (
    <div ref={ref} onMouseMove={onMove} onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setM({ x: 0.5, y: 0.5 }) }}
      onClick={onOpen}
      className="cursor-pointer"
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(28px)",
        transition: `opacity .7s ease ${index*80}ms, transform .7s cubic-bezier(.22,1,.36,1) ${index*80}ms`,
        perspective: "700px",
      }}>
      <div className="relative h-full rounded-2xl overflow-hidden transition-all duration-150"
        style={{
          border: `1px solid ${hov ? svc.color+"35" : "rgba(255,255,255,0.05)"}`,
          background: hov ? svc.glow+"0.04)" : "rgba(255,255,255,0.015)",
          transform: hov ? `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)` : "none",
          boxShadow: hov ? `0 20px 50px ${svc.glow}0.1), 0 0 0 1px ${svc.glow}0.12)` : "none",
        }}>

        {/* Holographic sheen */}
        {hov && (
          <div className="absolute inset-0 pointer-events-none z-10 rounded-2xl"
            style={{ background: `radial-gradient(circle at ${m.x*100}% ${m.y*100}%, ${svc.glow}0.1), transparent 55%)`, mixBlendMode: "screen" }} />
        )}

        {/* Scanlines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.022]"
          style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,.06) 2px,rgba(255,255,255,.06) 3px)" }} />

        <div className="relative p-5 sm:p-6 flex flex-col gap-4 h-full">

          {/* Icon + HUD number */}
          <div className="flex items-start justify-between">
            <div className="w-11 h-11 rounded-xl border flex items-center justify-center transition-all duration-300"
              style={{
                borderColor: hov ? svc.color+"50" : svc.color+"20",
                background: svc.glow + (hov ? "0.14)" : "0.07)"),
                boxShadow: hov ? `0 0 20px ${svc.glow}0.25)` : "none",
              }}>
              <Icon className="h-5 w-5" style={{ color: svc.color }} />
            </div>
            <span className="font-mono text-[9px] font-bold" style={{ color: svc.color+"30" }}>
              {String(index+1).padStart(2,"0")}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-black text-sm sm:text-base leading-tight transition-colors duration-300"
            style={{ fontFamily:"'Syne',sans-serif", color: hov ? "rgba(255,255,255,.95)" : "rgba(255,255,255,.75)" }}>
            {svc.title}
          </h3>

          {/* Short desc */}
          <p className="text-[11px] text-white/28 leading-relaxed flex-1"
            style={{ fontFamily:"'DM Mono',monospace", fontWeight:300 }}>
            {svc.short}
          </p>

          {/* KPIs */}
          <div className="flex flex-wrap gap-1.5">
            {svc.kpis.map((k,i) => (
              <span key={i} className="px-2 py-0.5 rounded-full text-[8px] font-mono tracking-wider border transition-all duration-300"
                style={{
                  borderColor: hov ? svc.color+"30" : "rgba(255,255,255,.06)",
                  color: hov ? svc.color : "rgba(255,255,255,.2)",
                  background: hov ? svc.glow+"0.08)" : "transparent",
                }}>
                {k}
              </span>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="flex items-center gap-1.5 transition-all duration-300"
            style={{ color: hov ? svc.color : "rgba(255,255,255,.2)" }}>
            <span className="text-[9px] font-mono tracking-widest uppercase">Ver detalles</span>
            <ChevronRight className="h-3 w-3 transition-transform duration-300"
              style={{ transform: hov ? "translateX(3px)" : "none" }} />
          </div>

          {/* Bottom accent line */}
          <div className="h-px w-full transition-all duration-500"
            style={{ background: hov ? `linear-gradient(90deg,${svc.color}60,transparent)` : "rgba(255,255,255,.04)" }} />
        </div>

        {/* HUD corners */}
        <div className="absolute top-2.5 left-2.5 w-3 h-3 transition-opacity duration-300"
          style={{ borderTop:`1px solid ${svc.color}`, borderLeft:`1px solid ${svc.color}`, opacity: hov ? 0.7 : 0.2 }} />
        <div className="absolute bottom-2.5 right-2.5 w-3 h-3 transition-opacity duration-300"
          style={{ borderBottom:`1px solid ${svc.color}`, borderRight:`1px solid ${svc.color}`, opacity: hov ? 0.7 : 0.2 }} />
      </div>
    </div>
  )
}

// ─── Detail Modal ─────────────────────────────────────────────────────

function Modal({ svc, onClose }: { svc: typeof SERVICES[0]; onClose: () => void }) {
  const Icon = svc.icon

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", fn)
    return () => window.removeEventListener("keydown", fn)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.9)", backdropFilter: "blur(16px)" }}
      onClick={onClose}>
      <div className="relative w-full max-w-xl max-h-[88vh] overflow-y-auto rounded-2xl"
        style={{
          background: "#07070f",
          border: `1px solid ${svc.color}25`,
          animation: "modal-in .3s cubic-bezier(.22,1,.36,1)",
          boxShadow: `0 40px 100px ${svc.glow}0.15)`,
        }}
        onClick={e => e.stopPropagation()}>

        {/* Top line */}
        <div className="h-px" style={{ background: `linear-gradient(90deg,transparent,${svc.color}70,transparent)` }} />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 p-5 sm:p-6">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl border flex items-center justify-center shrink-0"
              style={{ borderColor: svc.color+"40", background: svc.glow+"0.12)", boxShadow: `0 0 24px ${svc.glow}0.2)` }}>
              <Icon className="h-6 w-6" style={{ color: svc.color }} />
            </div>
            <div>
              <span className="text-[8px] font-mono tracking-widest uppercase block mb-0.5" style={{ color: svc.color+"70" }}>
                Servicio #{String(svc.id).padStart(2,"0")}
              </span>
              <h3 className="font-black text-sm sm:text-base text-white leading-tight" style={{ fontFamily:"'Syne',sans-serif" }}>
                {svc.title}
              </h3>
            </div>
          </div>
          <button onClick={onClose}
            className="shrink-0 p-2 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition-all">
            <X className="h-4 w-4 text-white/40" />
          </button>
        </div>

        <div className="px-5 sm:px-6 pb-6 space-y-5">
          {/* Description */}
          <p className="text-xs sm:text-sm text-white/35 leading-relaxed"
            style={{ fontFamily:"'DM Mono',monospace", fontWeight:300 }}>
            {svc.full}
          </p>

          {/* Divider */}
          <div className="h-px" style={{ background: `linear-gradient(90deg,${svc.color}30,transparent)` }} />

          {/* Capabilities */}
          <div>
            <p className="text-[9px] font-mono tracking-widest uppercase mb-3" style={{ color: svc.color+"70" }}>
              Capacidades
            </p>
            <ul className="space-y-2">
              {svc.caps.map((c,i) => (
                <li key={i} className="flex items-center gap-2.5 text-xs text-white/45"
                  style={{ animation: `cap-in .4s ease ${i*60}ms both` }}>
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: svc.color, boxShadow: `0 0 6px ${svc.color}` }} />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* KPIs */}
          <div>
            <p className="text-[9px] font-mono tracking-widest uppercase mb-3" style={{ color: svc.color+"70" }}>
              KPIs Clave
            </p>
            <div className="flex flex-wrap gap-2">
              {svc.kpis.map((k,i) => (
                <span key={i} className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider border"
                  style={{ borderColor: svc.color+"30", background: svc.glow+"0.08)", color: svc.color }}>
                  {k}
                </span>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/[0.05]" />

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={WHATSAPP_BASE + encodeURIComponent(svc.msg)} target="_blank" rel="noopener noreferrer"
              className="group relative flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-mono text-xs tracking-wider uppercase overflow-hidden hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute inset-0 rounded-xl transition-all duration-300"
                style={{ background: svc.glow+"0.1)", border: `1px solid ${svc.color}35` }} />
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: svc.glow+"0.18)" }} />
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 rounded-tl-xl" style={{ borderColor: svc.color+"60" }} />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 rounded-br-xl" style={{ borderColor: svc.color+"60" }} />
              <MessageCircle className="relative z-10 h-4 w-4" style={{ color: svc.color }} />
              <span className="relative z-10" style={{ color: svc.color }}>Hablar sobre este servicio</span>
            </a>
            <button onClick={onClose}
              className="px-5 py-3.5 rounded-xl border border-white/[0.07] bg-white/[0.02] text-white/30 hover:text-white/55 font-mono text-xs tracking-wider uppercase transition-all">
              Cerrar
            </button>
          </div>
        </div>

        {/* HUD corners */}
        <div className="absolute top-0 right-0 w-5 h-5" style={{ borderTop:`1px solid ${svc.color}20`, borderRight:`1px solid ${svc.color}20` }} />
        <div className="absolute bottom-0 left-0 w-5 h-5" style={{ borderBottom:`1px solid ${svc.color}20`, borderLeft:`1px solid ${svc.color}20` }} />
      </div>
    </div>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────

export function Services() {
  const [open, setOpen]   = useState<typeof SERVICES[0] | null>(null)
  const [vis, setVis]     = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.1 })
    if (ref.current) ob.observe(ref.current)
    return () => ob.disconnect()
  }, [])

  const r = (d: number): React.CSSProperties => ({
    opacity: vis ? 1 : 0,
    transform: vis ? "none" : "translateY(24px)",
    transition: `opacity .8s ease ${d}ms, transform .8s cubic-bezier(.22,1,.36,1) ${d}ms`,
  })

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Mono:wght@300;400&display=swap');
        @keyframes modal-in { from{opacity:0;transform:scale(.95) translateY(14px)} to{opacity:1;transform:none} }
        @keyframes cap-in   { from{opacity:0;transform:translateX(-8px)} to{opacity:1;transform:none} }
      `}</style>

      <section ref={ref} id="servicios" className="relative py-20 sm:py-28 bg-[#03030a] overflow-hidden">

        {/* ── Ambient ── */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/3 w-[600px] h-[400px] rounded-full blur-[160px] bg-violet-700/[0.05]" />
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] rounded-full blur-[140px] bg-cyan-700/[0.04]" />
          <div className="absolute inset-0 opacity-[0.02]"
            style={{ backgroundImage:"linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px)", backgroundSize:"44px 44px" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Header ── */}
          <div style={r(0)} className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/[0.06] mb-5">
              <Zap className="h-3 w-3 text-violet-400" />
              <span className="text-[9px] font-mono text-violet-400 tracking-[.18em] uppercase">Servicios</span>
            </div>
            <h2 className="font-black text-white leading-tight mb-4"
              style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(2.5rem,7vw,5rem)" }}>
              Soluciones
              <span className="ml-3" style={{ background:"linear-gradient(135deg,#a78bfa,#22d3ee)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                Integrales
              </span>
            </h2>
            <p className="text-white/28 text-sm max-w-xl mx-auto leading-relaxed"
              style={{ fontFamily:"'DM Mono',monospace", fontWeight:300 }}>
              Marketing digital, desarrollo web y producción audiovisual con IA
              para acelerar el crecimiento de tu negocio.
            </p>
          </div>

          {/* ── Grid ── */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {SERVICES.map((svc, i) => (
              <HoloCard key={svc.id} svc={svc} index={i} onOpen={() => setOpen(svc)} />
            ))}
          </div>

          {/* ── CTA ── */}
          <div style={r(500)} className="mt-14 text-center">
            <a href={WHATSAPP_BASE + encodeURIComponent("🚀 ¡Hola Jesus! Vi tus servicios y me interesa hablar sobre mi proyecto")}
              target="_blank" rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-mono text-xs tracking-wider uppercase overflow-hidden hover:scale-105 transition-transform duration-300">
              <div className="absolute inset-0 rounded-2xl border transition-all duration-300"
                style={{ borderColor:"rgba(167,139,250,.25)", background:"rgba(167,139,250,.05)" }} />
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background:"rgba(167,139,250,.12)" }} />
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-violet-400/50 rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-violet-400/50 rounded-br-2xl" />
              <MessageCircle className="relative z-10 h-4 w-4 text-violet-400" />
              <span className="relative z-10 text-violet-400/80 group-hover:text-violet-300 transition-colors">
                Hablar sobre mi proyecto
              </span>
            </a>
          </div>
        </div>

        {/* Modal */}
        {open && <Modal svc={open} onClose={() => setOpen(null)} />}
      </section>
    </>
  )
}