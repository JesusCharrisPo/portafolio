"use client"

import { useEffect, useRef, useState } from "react"
import { TrendingUp, Film, Users, Sparkles, Star, Zap, Globe, Clock } from "lucide-react"

// ─── Stats basados en tu portafolio real ──────────────────────────────

const STATS = [
  {
    icon: Film,
    value: 80,
    suffix: "+",
    label: "Proyectos entregados",
    sub: "Web, audiovisual e IA para marcas reales",
    color: "from-violet-500 to-violet-400",
    glow: "rgba(139,92,246,0.3)",
  },
  {
    icon: Users,
    value: 30,
    suffix: "+",
    label: "Clientes satisfechos",
    sub: "Desde startups hasta empresas consolidadas",
    color: "from-fuchsia-500 to-pink-400",
    glow: "rgba(217,70,239,0.3)",
  },
  {
    icon: TrendingUp,
    value: 15,
    suffix: "M+",
    label: "Vistas generadas",
    sub: "Alcance orgánico en redes sociales",
    color: "from-cyan-500 to-sky-400",
    glow: "rgba(6,182,212,0.3)",
  },
  {
    icon: Sparkles,
    value: 3,
    suffix: "+",
    label: "Años de experiencia",
    sub: "Marketing, web y producción audiovisual con IA",
    color: "from-amber-500 to-orange-400",
    glow: "rgba(245,158,11,0.3)",
  },
  {
    icon: Globe,
    value: 100,
    suffix: "%",
    label: "Satisfacción del cliente",
    sub: "Consulta inicial gratuita · respuesta en menos de 24h",
    color: "from-emerald-500 to-teal-400",
    glow: "rgba(16,185,129,0.3)",
  },
  {
    icon: Clock,
    value: 48,
    suffix: "h",
    label: "Entrega con IA",
    sub: "Producción audiovisual IA sin estudio físico",
    color: "from-rose-500 to-pink-400",
    glow: "rgba(244,63,94,0.3)",
  },
]

// Marcas reales de tu portafolio
const LOGOS = [
  "Mac One",
  "Maringlow",
  "Henry Rivera",
  "Zume",
  "Oxxo",
  "Marenco",
  "MBloom",
  "Laurent",
  "Old Money Co.",
]

// ─── Counter Hook — con requestAnimationFrame y ease-out ─────────────

function useCounter(target: number, duration: number, started: boolean) {
  const [count, setCount] = useState(0)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    if (!started) return
    setCount(0)
    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setCount(Math.floor(eased * target))
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        setCount(target)
      }
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [started, target, duration])

  return count
}

// ─── Single Stat Card ─────────────────────────────────────────────────

function StatCard({
  stat,
  started,
  delay,
}: {
  stat: typeof STATS[0]
  started: boolean
  delay: number
}) {
  const Icon = stat.icon
  const count = useCounter(stat.value, 1600, started)

  return (
    <div
      className="group relative p-5 sm:p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-white/10 transition-all duration-500 overflow-hidden"
      style={{
        opacity: started ? 1 : 0,
        transform: started ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(circle at 30% 50%, ${stat.glow}, transparent 70%)`,
        }}
      />

      {/* Icon */}
      <div
        className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}
        style={{ boxShadow: `0 4px 20px ${stat.glow}` }}
      >
        <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
      </div>

      {/* Number */}
      <div className="flex items-end gap-1 mb-1.5">
        <span
          className="font-black text-white leading-none"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
          }}
        >
          {count}
        </span>
        <span
          className={`font-black pb-1 text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(1.2rem, 2.5vw, 2rem)",
          }}
        >
          {stat.suffix}
        </span>
      </div>

      <h3
        className="text-xs sm:text-sm font-bold text-white/80 mb-1"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        {stat.label}
      </h3>
      <p className="text-[10px] text-white/28 leading-relaxed">{stat.sub}</p>

      {/* Corner accent */}
      <div
        className={`absolute bottom-0 right-0 w-12 h-12 rounded-tl-full opacity-[0.07] bg-gradient-to-br ${stat.color}`}
      />
    </div>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    // Fallback: activa aunque el observer no dispare
    const fallback = setTimeout(() => setStarted(true), 400)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          clearTimeout(fallback)
          observer.disconnect()
        }
      },
      { threshold: 0.1 } // 10% visible ya dispara
    )

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => {
      observer.disconnect()
      clearTimeout(fallback)
    }
  }, [])

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap');`}</style>

      <section
        ref={sectionRef}
        className="relative py-20 sm:py-28 bg-[#060709] overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-violet-700/[0.05] rounded-full blur-[140px]" />
          <div
            className="absolute inset-0 opacity-[0.018]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div
            className="text-center mb-12 sm:mb-14"
            style={{
              opacity: started ? 1 : 0,
              transform: started ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.8s ease 0ms, transform 0.8s cubic-bezier(.22,1,.36,1) 0ms",
            }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/25 bg-violet-500/[0.07] mb-5">
              <Star className="h-3 w-3 text-violet-400" />
              <span className="text-[10px] font-mono text-violet-400 tracking-widest uppercase">
                Resultados reales
              </span>
            </div>
            <h2
              className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Números que
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                {" "}hablan solos
              </span>
            </h2>
            <p className="text-white/35 text-sm max-w-md mx-auto leading-relaxed">
              Marketing digital, desarrollo web y producción audiovisual con IA.
              Aquí está el impacto acumulado.
            </p>
          </div>

          {/* Stats grid — 2 cols mobile, 3 cols tablet+ */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-12">
            {STATS.map((stat, i) => (
              <StatCard key={i} stat={stat} started={started} delay={i * 100} />
            ))}
          </div>

          {/* Separator */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent mb-10" />

          {/* Brands */}
          <div
            style={{
              opacity: started ? 1 : 0,
              transition: "opacity 1s ease 600ms",
            }}
          >
            <p className="text-center text-[10px] font-mono text-white/20 tracking-widest uppercase mb-5">
              Marcas que han confiado en el proceso
            </p>
            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3">
              {LOGOS.map((logo, i) => (
                <div key={i} className="group flex items-center gap-1.5 cursor-default">
                  <Zap className="h-2.5 w-2.5 text-violet-500/40 group-hover:text-violet-400/70 transition-colors" />
                  <span className="font-mono text-xs text-white/20 group-hover:text-white/50 transition-colors tracking-wider uppercase">
                    {logo}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  )
}