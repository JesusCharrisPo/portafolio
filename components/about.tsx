"use client"

import { useEffect, useRef, useState } from "react"
import {
  Megaphone, Target, Code2, Film, Sparkles,
  BarChart2, TrendingUp, Lightbulb, Download,
  MapPin, Clock, CheckCircle2,
} from "lucide-react"

const SKILLS = [
  { icon: Megaphone,  label: "Marketing Digital Estratégico", color: "text-violet-400",  border: "border-violet-500/20", bg: "bg-violet-500/[0.07]" },
  { icon: Target,     label: "Tráfico y Conversión",          color: "text-fuchsia-400", border: "border-fuchsia-500/20", bg: "bg-fuchsia-500/[0.07]" },
  { icon: Code2,      label: "Desarrollo Web",                color: "text-cyan-400",    border: "border-cyan-500/20",    bg: "bg-cyan-500/[0.07]" },
  { icon: Film,       label: "Producción Audiovisual",        color: "text-pink-400",    border: "border-pink-500/20",    bg: "bg-pink-500/[0.07]" },
  { icon: Sparkles,   label: "Inteligencia Artificial",       color: "text-amber-400",   border: "border-amber-500/20",   bg: "bg-amber-500/[0.07]" },
  { icon: BarChart2,  label: "Analytics y Métricas",          color: "text-emerald-400", border: "border-emerald-500/20", bg: "bg-emerald-500/[0.07]" },
  { icon: TrendingUp, label: "Growth Hacking",                color: "text-sky-400",     border: "border-sky-500/20",     bg: "bg-sky-500/[0.07]" },
  { icon: Lightbulb,  label: "Estrategia de Negocio",         color: "text-rose-400",    border: "border-rose-500/20",    bg: "bg-rose-500/[0.07]" },
]

const STATS = [
  { val: "50+",  label: "Proyectos",  color: "text-violet-400" },
  { val: "30+",  label: "Clientes",   color: "text-cyan-400" },
  { val: "5+",   label: "Años Exp.",  color: "text-fuchsia-400" },
  { val: "98%",  label: "Satisfacción", color: "text-emerald-400" },
]

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const fallback = setTimeout(() => setStarted(true), 300)
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); clearTimeout(fallback); observer.disconnect() } },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => { observer.disconnect(); clearTimeout(fallback) }
  }, [])

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Mono:wght@300;400&display=swap');`}</style>

      <section ref={sectionRef} id="sobre-mi" className="relative py-20 sm:py-28 bg-[#060709] overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-violet-700/[0.06] rounded-full blur-[140px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-cyan-700/[0.04] rounded-full blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.018]"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px)", backgroundSize: "44px 44px" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Two column layout ── */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

            {/* ── LEFT: Photo + status cards ── */}
            <div
              className="shrink-0 w-full lg:w-auto flex flex-col items-center lg:items-start gap-5"
              style={{
                opacity: started ? 1 : 0,
                transform: started ? "translateX(0)" : "translateX(-28px)",
                transition: "opacity 0.9s ease 0.1s, transform 0.9s cubic-bezier(.22,1,.36,1) 0.1s",
              }}
            >
              {/* Photo card */}
              <div className="relative">
                {/* Glow */}
                <div className="absolute inset-0 rounded-2xl bg-violet-600/15 blur-[30px] scale-110" />
                <div className="relative w-64 sm:w-72 rounded-2xl overflow-hidden border border-violet-500/20 shadow-[0_0_50px_rgba(139,92,246,0.15)]">
                  <img
                    src="/Perfil.jpg"
                    alt="Jesus Charris"
                    className="w-full aspect-[3/4] object-cover"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060709]/90 via-transparent to-transparent" />
                  {/* Name overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="font-black text-white text-lg leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
                      Jesús Charris
                    </p>
                    <p className="text-[10px] font-mono text-violet-400/80 tracking-wider">
                      Marketing · Web · IA · Audiovisual
                    </p>
                  </div>
                </div>
              </div>

              {/* Status cards */}
              <div className="w-64 sm:w-72 space-y-2">
                {[
                  { icon: CheckCircle2, label: "Disponibilidad", val: "Abierto a proyectos", color: "text-emerald-400", dot: "bg-emerald-400" },
                  { icon: Clock,        label: "Tiempo respuesta", val: "Menos de 24 horas",  color: "text-cyan-400",    dot: "bg-cyan-400" },
                  { icon: MapPin,       label: "Ubicación",        val: "Colombia 🇨🇴 · Remoto global", color: "text-violet-400", dot: "bg-violet-400" },
                ].map((item, i) => {
                  const Icon = item.icon
                  return (
                    <div key={i} className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-white/[0.05] bg-white/[0.02]">
                      <span className={`w-1.5 h-1.5 rounded-full ${item.dot} shrink-0`} />
                      <div className="min-w-0">
                        <p className="text-[9px] font-mono text-white/25 uppercase tracking-widest leading-none mb-0.5">{item.label}</p>
                        <p className={`text-[11px] font-mono ${item.color} leading-tight truncate`}>{item.val}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* CV Button */}
              <a
                href="/JESUS-CHARRIS.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-64 sm:w-72 flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/10 bg-white/[0.03] hover:border-violet-500/35 hover:bg-violet-500/[0.08] transition-all duration-300"
              >
                <Download className="h-4 w-4 text-white/35 group-hover:text-violet-400 transition-colors" />
                <span className="font-mono text-xs text-white/35 group-hover:text-white/70 tracking-widest uppercase transition-colors">
                  Descargar CV
                </span>
              </a>
            </div>

            {/* ── RIGHT: Content ── */}
            <div className="flex-1 min-w-0">

              {/* Header */}
              <div
                style={{
                  opacity: started ? 1 : 0,
                  transform: started ? "translateY(0)" : "translateY(24px)",
                  transition: "opacity 0.8s ease 0.2s, transform 0.8s cubic-bezier(.22,1,.36,1) 0.2s",
                }}
              >
                <div className="flex items-center gap-2 text-[10px] font-mono text-violet-400/60 tracking-widest uppercase mb-4">
                  <span className="w-5 h-px bg-gradient-to-r from-violet-500 to-transparent" />
                  Sobre mí
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4"
                  style={{ fontFamily: "'Syne', sans-serif" }}>
                  Especialista en
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">
                    Marketing, Web e IA
                  </span>
                </h2>
                <p className="text-white/40 text-sm leading-relaxed mb-3 max-w-xl"
                  style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300 }}>
                  Especialista en marketing digital, automatización, desarrollo web y producción audiovisual
                  con enfoque en inteligencia artificial aplicada a negocios.
                </p>
                <p className="text-white/30 text-sm leading-relaxed max-w-xl"
                  style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300 }}>
                  Convierto ideas en crecimiento sostenible: estrategia, ejecución y tecnología
                  para resultados medibles.
                </p>
              </div>

              {/* Stats row */}
              <div
                className="grid grid-cols-4 gap-3 my-8"
                style={{
                  opacity: started ? 1 : 0,
                  transform: started ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.8s ease 0.35s, transform 0.8s cubic-bezier(.22,1,.36,1) 0.35s",
                }}
              >
                {STATS.map((s, i) => (
                  <div key={i} className="text-center p-3 rounded-xl border border-white/[0.05] bg-white/[0.02]">
                    <p className={`font-black text-xl sm:text-2xl ${s.color} leading-none mb-1`}
                      style={{ fontFamily: "'Syne', sans-serif" }}>
                      {s.val}
                    </p>
                    <p className="text-[9px] font-mono text-white/25 leading-tight">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Skills grid */}
              <div
                style={{
                  opacity: started ? 1 : 0,
                  transform: started ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.8s ease 0.5s, transform 0.8s cubic-bezier(.22,1,.36,1) 0.5s",
                }}
              >
                <p className="text-[9px] font-mono text-white/20 tracking-widest uppercase mb-3">
                  Especialidades
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {SKILLS.map((skill, i) => {
                    const Icon = skill.icon
                    return (
                      <div
                        key={i}
                        className={`group flex items-center gap-2.5 p-3 rounded-xl border ${skill.border} ${skill.bg} hover:brightness-125 transition-all duration-300 cursor-default`}
                      >
                        <Icon className={`h-4 w-4 shrink-0 ${skill.color}`} />
                        <span className="text-[10px] font-mono text-white/50 group-hover:text-white/70 leading-tight transition-colors">
                          {skill.label}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}