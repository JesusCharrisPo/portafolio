"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, Sparkles, Code2, Film, Zap } from "lucide-react"

const WHATSAPP_URL = "https://wa.me/573043819731?text=%F0%9F%9A%80%20%C2%A1Hola%20Jesus!%20%F0%9F%91%8B%20Vi%20tu%20portafolio%20y%20me%20interesa%20una%20*consulta%20gratuita*%20para%20mi%20proyecto%20%F0%9F%92%A1%20%C2%BFPodemos%20agendar%20una%20llamada%3F%20%F0%9F%93%9E%E2%9C%A8"

// Words that cycle in the headline
const CYCLING_WORDS = ["Audiovisual.", "Marketing.", "Desarrollo.", "con IA."]

// Floating particles config
const PARTICLES = Array.from({ length: 38 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 0.5,
  duration: Math.random() * 18 + 10,
  delay: Math.random() * 8,
  opacity: Math.random() * 0.25 + 0.05,
}))

// Skills ticker
const SKILLS = [
  "Marketing Digital", "Facebook Ads", "Google Ads", "Desarrollo Web",
  "Shopify", "WordPress", "Producción Audiovisual", "IA Generativa",
  "Landing Pages", "E-commerce", "Motion Graphics", "Growth Hacking",
]

// ─── Letter-by-letter text ────────────────────────────────────────────

function TypedText({ text, started, delay = 0 }: { text: string; started: boolean; delay?: number }) {
  const [displayed, setDisplayed] = useState("")
  const indexRef = useRef(0)

  useEffect(() => {
    if (!started) return
    setDisplayed("")
    indexRef.current = 0
    const t = setTimeout(() => {
      const interval = setInterval(() => {
        indexRef.current += 1
        setDisplayed(text.slice(0, indexRef.current))
        if (indexRef.current >= text.length) clearInterval(interval)
      }, 38)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(t)
  }, [started, text, delay])

  return (
    <span>
      {displayed}
      {displayed.length < text.length && started && (
        <span className="inline-block w-0.5 h-[0.85em] bg-violet-400 ml-0.5 animate-pulse align-middle" />
      )}
    </span>
  )
}

// ─── Cycling word ─────────────────────────────────────────────────────

function CyclingWord({ started }: { started: boolean }) {
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (!started) return
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIdx(i => (i + 1) % CYCLING_WORDS.length)
        setVisible(true)
      }, 350)
    }, 2400)
    return () => clearInterval(interval)
  }, [started])

  return (
    <span
      className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-12px)",
        transition: "opacity 0.35s ease, transform 0.35s ease",
        display: "inline-block",
      }}
    >
      {CYCLING_WORDS[idx]}
    </span>
  )
}

// ─── Canvas Particles ─────────────────────────────────────────────────

function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    let w = canvas.offsetWidth
    let h = canvas.offsetHeight
    canvas.width = w
    canvas.height = h

    type P = { x: number; y: number; vx: number; vy: number; size: number; opacity: number; color: string }
    const colors = ["rgba(139,92,246,", "rgba(217,70,239,", "rgba(6,182,212,", "rgba(255,255,255,"]

    const pts: P[] = Array.from({ length: 55 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.8 + 0.4,
      opacity: Math.random() * 0.3 + 0.05,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color + p.opacity + ")"
        ctx.fill()
      })
      // Draw connecting lines between close particles
      pts.forEach((a, i) => {
        pts.slice(i + 1).forEach(b => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < 90) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(139,92,246,${0.04 * (1 - dist / 90)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })
      animId = requestAnimationFrame(draw)
    }

    draw()

    const resize = () => {
      w = canvas.offsetWidth; h = canvas.offsetHeight
      canvas.width = w; canvas.height = h
    }
    window.addEventListener("resize", resize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize) }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}

// ─── Hero ─────────────────────────────────────────────────────────────

export function Hero() {
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 120)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Mono:ital,wght@0,300;0,400;1,300&display=swap');

        @keyframes fade-up {
          from { opacity: 0; transform: translateY(30px) }
          to   { opacity: 1; transform: translateY(0) }
        }
        @keyframes fade-in {
          from { opacity: 0 }
          to   { opacity: 1 }
        }
        @keyframes ticker {
          from { transform: translateX(0) }
          to   { transform: translateX(-50%) }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.5 }
          50%       { opacity: 1 }
        }
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(120px) rotate(0deg) }
          to   { transform: rotate(360deg) translateX(120px) rotate(-360deg) }
        }

        .hero-reveal-1 { opacity:0; animation: fade-up 1s cubic-bezier(.22,1,.36,1) 0.15s forwards }
        .hero-reveal-2 { opacity:0; animation: fade-up 1s cubic-bezier(.22,1,.36,1) 0.35s forwards }
        .hero-reveal-3 { opacity:0; animation: fade-up 1s cubic-bezier(.22,1,.36,1) 0.55s forwards }
        .hero-reveal-4 { opacity:0; animation: fade-up 1s cubic-bezier(.22,1,.36,1) 0.75s forwards }
        .hero-reveal-5 { opacity:0; animation: fade-in 1s ease 1s forwards }
        .ticker-track  { animation: ticker 28s linear infinite }
        .ticker-track:hover { animation-play-state: paused }
      `}</style>

      <section
        id="inicio"
        className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#04040a]"
      >
        {/* ── Particles canvas ── */}
        <ParticlesCanvas />

        {/* ── Background glows ── */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-violet-700/[0.08] rounded-full blur-[160px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-700/[0.06] rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-fuchsia-700/[0.04] rounded-full blur-[100px]" style={{ animation: "glow-pulse 4s ease-in-out infinite" }} />
          {/* Grid */}
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px)", backgroundSize: "56px 56px" }} />
          {/* Scanlines */}
          <div className="absolute inset-0 opacity-[0.02]"
            style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,.5) 3px,rgba(0,0,0,.5) 4px)" }} />
        </div>

        {/* ── Main content ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 pb-24 sm:pt-32 sm:pb-28">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* ── LEFT: Text ── */}
            <div className="flex-1 min-w-0 text-center lg:text-left">

              {/* Status badge */}
              <div className="hero-reveal-1 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/[0.08] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono text-emerald-400 tracking-widest uppercase">Disponible para proyectos</span>
              </div>

              {/* Headline */}
              <h1
                className="font-black text-white leading-[0.9] tracking-tight mb-2"
                style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(3rem, 8.5vw, 7rem)" }}
              >
                <span className="hero-reveal-2 block">Jesus</span>
                <span className="hero-reveal-3 block">Charris</span>
              </h1>

              {/* Cycling subtitle */}
              <div
                className="hero-reveal-4 mb-5 flex items-center gap-3 justify-center lg:justify-start"
                style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.6rem, 4vw, 3rem)", fontWeight: 900 }}
              >
                <CyclingWord started={started} />
              </div>

              {/* Description — typed */}
              <p
                className="hero-reveal-4 text-white/40 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0"
                style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300, fontSize: "clamp(0.8rem, 1.5vw, 0.95rem)" }}
              >
                Estrategia de Marketing Digital, Desarrollo Web y Producción Audiovisual con IA.
                Convierto ideas en crecimiento sostenible con resultados medibles.
              </p>

              {/* CTAs */}
              <div className="hero-reveal-5 flex flex-wrap gap-3 justify-center lg:justify-start">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 group-hover:from-violet-500 group-hover:to-fuchsia-500 transition-all duration-300" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.12),transparent_70%)] transition-opacity duration-300" />
                  <Sparkles className="relative z-10 h-4 w-4 text-white" />
                  <span className="relative z-10 font-mono text-xs text-white font-bold tracking-wider uppercase">Solicitar consulta</span>
                  <ArrowRight className="relative z-10 h-3.5 w-3.5 text-white/70 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="#servicios"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 font-mono text-xs text-white/55 hover:text-white/80 tracking-wider uppercase"
                >
                  <Zap className="h-3.5 w-3.5" />
                  Ver servicios
                </a>
              </div>

              {/* Mini stats row */}
              <div className="hero-reveal-5 flex items-center gap-5 mt-10 justify-center lg:justify-start flex-wrap">
                {[
                  { icon: Film,   val: "80+",  label: "Proyectos" },
                  { icon: Code2,  val: "30+",  label: "Clientes" },
                  { icon: Zap,    val: "3+",   label: "Años exp." },
                ].map((s, i) => {
                  const Icon = s.icon
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                        <Icon className="h-3.5 w-3.5 text-violet-400" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-white leading-none" style={{ fontFamily: "'Syne', sans-serif" }}>{s.val}</p>
                        <p className="text-[9px] font-mono text-white/25 leading-none mt-0.5">{s.label}</p>
                      </div>
                      {i < 2 && <div className="w-px h-6 bg-white/[0.07] ml-3" />}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* ── RIGHT: Profile visual ── */}
            <div className="hero-reveal-3 relative shrink-0 flex items-center justify-center">
              {/* Outer orbit ring */}
              <div className="absolute w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] rounded-full border border-violet-500/10 animate-spin" style={{ animationDuration: "25s" }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-violet-500/50" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-500/40" />
              </div>
              {/* Inner orbit */}
              <div className="absolute w-[230px] h-[230px] sm:w-[280px] sm:h-[280px] rounded-full border border-fuchsia-500/[0.08] animate-spin" style={{ animationDuration: "18s", animationDirection: "reverse" }}>
                <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-fuchsia-500/50" />
              </div>

              {/* Glow behind photo */}
              <div className="absolute w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] rounded-full bg-violet-600/20 blur-[40px]" />

              {/* Photo */}
              <div className="relative w-[170px] h-[170px] sm:w-[210px] sm:h-[210px] rounded-full overflow-hidden border-2 border-violet-500/30 shadow-[0_0_60px_rgba(139,92,246,0.25)]">
                <img
                  src="/Perfil.jpg"
                  alt="Jesus Charris"
                  className="w-full h-full object-cover"
                />
                {/* Overlay tint */}
                <div className="absolute inset-0 bg-gradient-to-t from-violet-900/30 to-transparent" />
              </div>

              {/* Floating chips */}
              <div className="absolute -top-2 -right-4 sm:-right-8 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0d0d18] border border-violet-500/25 shadow-lg">
                <Sparkles className="h-3 w-3 text-violet-400" />
                <span className="text-[9px] font-mono text-violet-300 tracking-wide">IA Aplicada</span>
              </div>
              <div className="absolute -bottom-2 -left-4 sm:-left-8 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0d0d18] border border-cyan-500/20 shadow-lg">
                <Code2 className="h-3 w-3 text-cyan-400" />
                <span className="text-[9px] font-mono text-cyan-300 tracking-wide">Full Stack</span>
              </div>
              <div className="absolute top-1/2 -right-6 sm:-right-12 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0d0d18] border border-fuchsia-500/20 shadow-lg">
                <Film className="h-3 w-3 text-fuchsia-400" />
                <span className="text-[9px] font-mono text-fuchsia-300 tracking-wide">Audiovisual</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Skills ticker ── */}
        <div className="relative z-10 border-t border-white/[0.04] py-4 overflow-hidden">
          <div className="flex ticker-track whitespace-nowrap">
            {[...SKILLS, ...SKILLS].map((skill, i) => (
              <span key={i} className="inline-flex items-center gap-3 mx-5">
                <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">{skill}</span>
                <span className="w-1 h-1 rounded-full bg-violet-500/30" />
              </span>
            ))}
          </div>
        </div>

        {/* ── Scroll indicator ── */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[9px] font-mono text-white/50 tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>
    </>
  )
}