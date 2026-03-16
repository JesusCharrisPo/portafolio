"use client"

import { useEffect, useRef, useState } from "react"
import { MessageCircle, Lightbulb, Clapperboard, Sparkles, Send, ArrowRight } from "lucide-react"

// ─── Config ───────────────────────────────────────────────────────────

const STEPS = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Brief & Visión",
    duration: "Día 1",
    color: "violet",
    glow: "rgba(139,92,246,0.35)",
    border: "border-violet-500/30",
    bg: "bg-violet-500/10",
    text: "text-violet-400",
    ring: "ring-violet-500/30",
    description:
      "Hablamos por WhatsApp o videollamada. Entiendo tu marca, tu público y lo que quieres comunicar. Sin formularios complicados.",
    deliverable: "Brief creativo validado",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Concepto Creativo",
    duration: "Días 2–3",
    color: "fuchsia",
    glow: "rgba(217,70,239,0.35)",
    border: "border-fuchsia-500/30",
    bg: "bg-fuchsia-500/10",
    text: "text-fuchsia-400",
    ring: "ring-fuchsia-500/30",
    description:
      "Desarrollo la dirección de arte: paleta, estética, referencias visuales y el guión o storyboard del contenido.",
    deliverable: "Propuesta visual + moodboard",
  },
  {
    number: "03",
    icon: Clapperboard,
    title: "Producción",
    duration: "Días 4–7",
    color: "cyan",
    glow: "rgba(6,182,212,0.35)",
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
    ring: "ring-cyan-500/30",
    description:
      "Rodaje con equipo profesional o generación con IA según el proyecto. Cada toma pensada para máximo impacto visual.",
    deliverable: "Footage crudo + primera selección",
  },
  {
    number: "04",
    icon: Sparkles,
    title: "Post & IA",
    duration: "Días 7–10",
    color: "violet",
    glow: "rgba(139,92,246,0.35)",
    border: "border-violet-500/30",
    bg: "bg-violet-500/10",
    text: "text-violet-400",
    ring: "ring-violet-500/30",
    description:
      "Edición, color grading, efectos visuales y potenciación con IA donde suma. El paso que marca la diferencia entre bueno y épico.",
    deliverable: "Video masterizado listo para revisión",
  },
  {
    number: "05",
    icon: Send,
    title: "Entrega & Formatos",
    duration: "Día 10–12",
    color: "emerald",
    glow: "rgba(16,185,129,0.35)",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    ring: "ring-emerald-500/30",
    description:
      "Revisión con el cliente, ajustes si hace falta, y entrega en todos los formatos: vertical, horizontal, cortos, stories.",
    deliverable: "Pack de contenido listo para publicar",
  },
]

const WHATSAPP_NUMBER  = "573043819731"
const WHATSAPP_MESSAGE = "🎬 ¡Hola Jesus! Quiero empezar mi proyecto contigo 🚀"

// ─── Step Card ────────────────────────────────────────────────────────

function StepCard({ step, index, started }: { step: typeof STEPS[0]; index: number; started: boolean }) {
  const Icon = step.icon
  const isEven = index % 2 === 0

  return (
    <div
      className="relative flex items-start gap-5 sm:gap-7"
      style={{
        opacity: started ? 1 : 0,
        transform: started ? "translateX(0)" : `translateX(${isEven ? "-24px" : "24px"})`,
        transition: `opacity 0.75s ease ${index * 140}ms, transform 0.75s cubic-bezier(.22,1,.36,1) ${index * 140}ms`,
      }}
    >
      {/* ── Left: number + connector ── */}
      <div className="flex flex-col items-center shrink-0">
        {/* Circle */}
        <div className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${step.bg} border ${step.border} flex items-center justify-center
          ring-4 ${step.ring} ring-opacity-20 shadow-lg`}
          style={{ boxShadow: `0 0 24px ${step.glow}` }}>
          <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${step.text}`} />
          {/* Number badge */}
          <div className={`absolute -top-2 -right-2 w-5 h-5 rounded-full ${step.bg} border ${step.border} flex items-center justify-center`}>
            <span className={`text-[8px] font-black font-mono ${step.text}`}>{index + 1}</span>
          </div>
        </div>

        {/* Connector line */}
        {index < STEPS.length - 1 && (
          <div className="mt-2 w-px flex-1 min-h-[40px]"
            style={{
              background: `linear-gradient(to bottom, ${step.glow}, transparent)`,
              opacity: started ? 1 : 0,
              transition: `opacity 0.5s ease ${index * 140 + 400}ms`,
            }} />
        )}
      </div>

      {/* ── Right: content ── */}
      <div className={`group pb-8 sm:pb-10 flex-1 ${index < STEPS.length - 1 ? "" : "pb-0"}`}>
        <div className={`relative p-5 sm:p-6 rounded-2xl border border-white/[0.05] bg-white/[0.02]
          hover:border-white/10 hover:bg-white/[0.03] transition-all duration-400 overflow-hidden`}>

          {/* Hover glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
            style={{ background: `radial-gradient(circle at 20% 50%, ${step.glow.replace("0.35","0.12")}, transparent 70%)` }} />

          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              {/* Duration chip */}
              <span className={`inline-block text-[9px] font-mono ${step.text} ${step.bg} border ${step.border} px-2 py-0.5 rounded-full mb-2 tracking-wider uppercase`}>
                {step.duration}
              </span>
              <h3 className="text-base sm:text-lg font-black text-white leading-tight"
                style={{ fontFamily:"'Syne',sans-serif" }}>
                {step.title}
              </h3>
            </div>
            <span className="shrink-0 font-black text-white/[0.06] text-3xl sm:text-4xl leading-none"
              style={{ fontFamily:"'Syne',sans-serif" }}>
              {step.number}
            </span>
          </div>

          <p className="text-sm text-white/40 leading-relaxed mb-4">{step.description}</p>

          {/* Deliverable */}
          <div className={`flex items-center gap-2 ${step.bg} border ${step.border} rounded-xl px-3 py-2`}>
            <ArrowRight className={`h-3 w-3 ${step.text} shrink-0`} />
            <span className={`text-[11px] font-mono ${step.text} tracking-wide`}>{step.deliverable}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────

export function ProcesoCreativo() {
  const sectionRef = useRef<HTMLElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect() } },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap');`}</style>

      <section ref={sectionRef} className="relative py-20 sm:py-28 bg-[#060709] overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[600px] bg-violet-800/[0.05] rounded-full blur-[140px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-800/[0.04] rounded-full blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.018]"
            style={{ backgroundImage:"linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px)", backgroundSize:"44px 44px" }} />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-14 sm:mb-16"
            style={{
              opacity: started ? 1 : 0,
              transform: started ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(.22,1,.36,1)",
            }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/25 bg-violet-500/[0.07] mb-5">
              <Clapperboard className="h-3 w-3 text-violet-400" />
              <span className="text-[10px] font-mono text-violet-400 tracking-widest uppercase">Cómo trabajamos</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight"
              style={{ fontFamily:"'Syne',sans-serif" }}>
              Del brief al
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400"> contenido épico</span>
            </h2>
            <p className="text-white/35 text-sm max-w-md mx-auto leading-relaxed">
              Un proceso claro, sin sorpresas. Así es como convertimos tu idea en contenido que la gente no puede ignorar.
            </p>

            {/* Timeline total */}
            <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/[0.07] bg-white/[0.03]">
              <span className="text-[10px] font-mono text-white/30">Tiempo total estimado:</span>
              <span className="text-[10px] font-mono text-violet-400 font-bold">10–12 días hábiles</span>
            </div>
          </div>

          {/* Steps */}
          <div>
            {STEPS.map((step, i) => (
              <StepCard key={i} step={step} index={i} started={started} />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 text-center"
            style={{
              opacity: started ? 1 : 0,
              transition: "opacity 1s ease 0.9s",
            }}>
            <p className="text-xs font-mono text-white/25 mb-4 tracking-wide">
              ¿Listo para arrancar? El paso 01 empieza hoy.
            </p>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-mono text-xs tracking-wider uppercase hover:scale-105 transition-transform duration-300 overflow-hidden">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600/20 to-cyan-500/15 border border-violet-500/35
                group-hover:from-violet-600/30 group-hover:to-cyan-500/25 group-hover:border-violet-400/55 transition-all duration-300" />
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-violet-400/60 rounded-tl-xl" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400/60 rounded-br-xl" />
              <MessageCircle className="relative z-10 h-4 w-4 text-violet-400 group-hover:text-violet-300 transition-colors" />
              <span className="relative z-10 text-white/70 group-hover:text-white/95 transition-colors">
                Empezar ahora — WhatsApp
              </span>
            </a>
          </div>

        </div>
      </section>
    </>
  )
}
