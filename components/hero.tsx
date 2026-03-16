"use client"

import { useEffect, useRef, useState } from "react"
import {
  ArrowRight, Sparkles, Code2, Film, Zap,
  Megaphone, Target, BarChart2, TrendingUp,
  Lightbulb, Download, MapPin, Clock, CheckCircle2,
} from "lucide-react"

// ─── Config ───────────────────────────────────────────────────────────

const WHATSAPP_URL =
  "https://wa.me/573043819731?text=%F0%9F%9A%80%20%C2%A1Hola%20Jesus!%20%F0%9F%91%8B%20Vi%20tu%20portafolio%20y%20me%20interesa%20una%20*consulta%20gratuita*%20%F0%9F%92%A1%20%C2%BFPodemos%20agendar%20una%20llamada%3F"

const CYCLING_WORDS = ["Audiovisual.", "Marketing.", "Desarrollo.", "con IA."]

const SKILLS = [
  { icon: Megaphone,  label: "Marketing Digital",      color: "text-violet-400",  border: "border-violet-500/25",  bg: "bg-violet-500/[0.08]"  },
  { icon: Target,     label: "Tráfico y Conversión",   color: "text-fuchsia-400", border: "border-fuchsia-500/25", bg: "bg-fuchsia-500/[0.08]" },
  { icon: Code2,      label: "Desarrollo Web",         color: "text-cyan-400",    border: "border-cyan-500/25",    bg: "bg-cyan-500/[0.08]"    },
  { icon: Film,       label: "Producción Audiovisual", color: "text-pink-400",    border: "border-pink-500/25",    bg: "bg-pink-500/[0.08]"    },
  { icon: Sparkles,   label: "Inteligencia Artificial",color: "text-amber-400",   border: "border-amber-500/25",   bg: "bg-amber-500/[0.08]"   },
  { icon: BarChart2,  label: "Analytics y Métricas",   color: "text-emerald-400", border: "border-emerald-500/25", bg: "bg-emerald-500/[0.08]" },
  { icon: TrendingUp, label: "Growth Hacking",         color: "text-sky-400",     border: "border-sky-500/25",     bg: "bg-sky-500/[0.08]"     },
  { icon: Lightbulb,  label: "Estrategia de Negocio",  color: "text-rose-400",    border: "border-rose-500/25",    bg: "bg-rose-500/[0.08]"    },
]

const STATS = [
  { val: "50+",  label: "Proyectos",    color: "from-violet-400 to-violet-500"  },
  { val: "30+",  label: "Clientes",     color: "from-cyan-400 to-cyan-500"      },
  { val: "5+",   label: "Años Exp.",    color: "from-fuchsia-400 to-fuchsia-500"},
  { val: "98%",  label: "Satisfacción", color: "from-emerald-400 to-emerald-500"},
]

const TICKER = [
  "Marketing Digital", "Facebook Ads", "Google Ads", "Desarrollo Web",
  "Shopify", "WordPress", "Producción Audiovisual", "IA Generativa",
  "Landing Pages", "E-commerce", "Motion Graphics", "Growth Hacking",
]

// ─── Cycling word ─────────────────────────────────────────────────────

function CyclingWord() {
  const [idx, setIdx]       = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false)
      setTimeout(() => { setIdx(i => (i + 1) % CYCLING_WORDS.length); setVisible(true) }, 350)
    }, 2600)
    return () => clearInterval(t)
  }, [])

  return (
    <span
      className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 inline-block"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-10px)",
        transition: "opacity 0.35s ease, transform 0.35s ease",
      }}
    >
      {CYCLING_WORDS[idx]}
    </span>
  )
}

// ─── Canvas particles ─────────────────────────────────────────────────

function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf: number
    let W = canvas.offsetWidth
    let H = canvas.offsetHeight
    canvas.width = W; canvas.height = H

    const COLORS = ["rgba(139,92,246,", "rgba(217,70,239,", "rgba(6,182,212,", "rgba(255,255,255,"]
    type P = { x: number; y: number; vx: number; vy: number; r: number; op: number; c: string }
    const pts: P[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.6 + 0.3,
      op: Math.random() * 0.28 + 0.04,
      c: COLORS[Math.floor(Math.random() * COLORS.length)],
    }))

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.c + p.op + ")"; ctx.fill()
      })
      pts.forEach((a, i) => pts.slice(i + 1).forEach(b => {
        const d = Math.hypot(a.x - b.x, a.y - b.y)
        if (d < 95) {
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = `rgba(139,92,246,${0.035 * (1 - d / 95)})`
          ctx.lineWidth = 0.5; ctx.stroke()
        }
      }))
      raf = requestAnimationFrame(draw)
    }
    draw()

    const onResize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight
      canvas.width = W; canvas.height = H
    }
    window.addEventListener("resize", onResize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize) }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}

// ─── Hero (fused with About) ──────────────────────────────────────────

export function Hero() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  const reveal = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.9s ease ${delay}ms, transform 0.9s cubic-bezier(.22,1,.36,1) ${delay}ms`,
  })

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Mono:wght@300;400&display=swap');

        @keyframes ticker    { from { transform:translateX(0) } to { transform:translateX(-50%) } }
        @keyframes glow-bob  { 0%,100%{opacity:.5} 50%{opacity:1} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes spin-rev  { from{transform:rotate(360deg)} to{transform:rotate(0deg)} }

        .ticker-inner { animation: ticker 30s linear infinite }
        .ticker-inner:hover { animation-play-state: paused }
        .ring-a { animation: spin-slow 28s linear infinite }
        .ring-b { animation: spin-rev  20s linear infinite }
      `}</style>

      <section
        id="inicio"
        className="relative bg-[#04040a] overflow-hidden"
      >
        <ParticlesCanvas />

        {/* ── Ambient glows ── */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[700px] h-[700px] bg-violet-700/[0.07] rounded-full blur-[180px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-700/[0.05] rounded-full blur-[140px]" />
          <div className="absolute top-2/3 left-1/2 w-[300px] h-[300px] bg-fuchsia-700/[0.04] rounded-full blur-[100px]" style={{ animation: "glow-bob 5s ease-in-out infinite" }} />
          <div className="absolute inset-0 opacity-[0.022]"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px)", backgroundSize: "54px 54px" }} />
          <div className="absolute inset-0 opacity-[0.018]"
            style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,.4) 3px,rgba(0,0,0,.4) 4px)" }} />
        </div>

        {/* ════════════════════════════════════
            HERO BLOCK
        ════════════════════════════════════ */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 pb-16 sm:pt-36 sm:pb-20">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">

            {/* ── LEFT ── */}
            <div className="flex-1 min-w-0 text-center lg:text-left">

              {/* Available badge */}
              <div style={reveal(0)} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/[0.08] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono text-emerald-400 tracking-widest uppercase">Disponible para proyectos</span>
              </div>

              {/* Big name */}
              <h1 className="font-black text-white leading-[0.88] tracking-tight mb-2"
                style={{ ...reveal(120), fontFamily: "'Syne',sans-serif", fontSize: "clamp(3.2rem,9vw,7.5rem)" }}>
                Jesus<br />Charris
              </h1>

              {/* Cycling word */}
              <div className="mb-5 flex items-center gap-3 justify-center lg:justify-start"
                style={{ ...reveal(240), fontFamily: "'Syne',sans-serif", fontSize: "clamp(1.5rem,4vw,3rem)", fontWeight: 900 }}>
                <CyclingWord />
              </div>

              {/* Description */}
              <p className="text-white/38 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0"
                style={{ ...reveal(340), fontFamily: "'DM Mono',monospace", fontWeight: 300, fontSize: "clamp(.8rem,1.4vw,.9rem)" }}>
                Especialista en Marketing Digital, Desarrollo Web y Producción Audiovisual
                con IA. Convierto ideas en crecimiento sostenible con resultados medibles.
              </p>

              {/* CTAs */}
              <div style={reveal(440)} className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 group-hover:from-violet-500 group-hover:to-fuchsia-500 transition-all" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,.12),transparent_70%)] transition-opacity" />
                  <Sparkles className="relative z-10 h-4 w-4 text-white" />
                  <span className="relative z-10 font-mono text-xs text-white font-bold tracking-wider uppercase">Solicitar consulta</span>
                  <ArrowRight className="relative z-10 h-3.5 w-3.5 text-white/70 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#servicios"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20 transition-all font-mono text-xs text-white/50 hover:text-white/80 tracking-wider uppercase">
                  <Zap className="h-3.5 w-3.5" />Ver servicios
                </a>
              </div>

              {/* Mini stats */}
              <div style={reveal(540)} className="flex items-center gap-4 sm:gap-6 mt-10 justify-center lg:justify-start flex-wrap">
                {STATS.map((s, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div>
                      <p className={`font-black text-sm sm:text-base leading-none text-transparent bg-clip-text bg-gradient-to-r ${s.color}`}
                        style={{ fontFamily: "'Syne',sans-serif" }}>{s.val}</p>
                      <p className="text-[9px] font-mono text-white/25 mt-0.5">{s.label}</p>
                    </div>
                    {i < STATS.length - 1 && <div className="w-px h-6 bg-white/[0.07] ml-2" />}
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: Photo with orbital rings ── */}
            <div style={reveal(200)} className="relative shrink-0 flex items-center justify-center">
              {/* Rings */}
              <div className="ring-a absolute w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] rounded-full border border-violet-500/10">
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-violet-500/60" />
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-500/50" />
              </div>
              <div className="ring-b absolute w-[240px] h-[240px] sm:w-[290px] sm:h-[290px] rounded-full border border-fuchsia-500/[0.07]">
                <span className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-fuchsia-500/60" />
              </div>

              {/* Glow */}
              <div className="absolute w-[200px] h-[200px] rounded-full bg-violet-600/20 blur-[50px]" />

              {/* Photo */}
              <div className="relative w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] rounded-full overflow-hidden border-2 border-violet-500/30 shadow-[0_0_70px_rgba(139,92,246,0.22)]">
                <img src="/Perfil.jpg" alt="Jesus Charris" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-violet-900/35 to-transparent" />
              </div>

              {/* Floating chips */}
              <div className="absolute -top-3 -right-2 sm:-right-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0c0c18] border border-violet-500/25 shadow-lg whitespace-nowrap">
                <Sparkles className="h-3 w-3 text-violet-400" /><span className="text-[9px] font-mono text-violet-300">IA Aplicada</span>
              </div>
              <div className="absolute -bottom-3 -left-2 sm:-left-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0c0c18] border border-cyan-500/20 shadow-lg whitespace-nowrap">
                <Code2 className="h-3 w-3 text-cyan-400" /><span className="text-[9px] font-mono text-cyan-300">Full Stack</span>
              </div>
              <div className="absolute top-1/2 -right-3 sm:-right-14 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0c0c18] border border-fuchsia-500/20 shadow-lg whitespace-nowrap">
                <Film className="h-3 w-3 text-fuchsia-400" /><span className="text-[9px] font-mono text-fuchsia-300">Audiovisual</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
        </div>

        {/* ════════════════════════════════════
            ABOUT BLOCK (fused)
        ════════════════════════════════════ */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

            {/* ── LEFT: Status + CV ── */}
            <div style={reveal(100)} className="shrink-0 w-full lg:w-64 space-y-2.5">
              <p className="text-[9px] font-mono text-white/20 tracking-widest uppercase mb-4">Estado actual</p>

              {[
                { icon: CheckCircle2, label: "Disponibilidad",    val: "Abierto a proyectos",        dot: "bg-emerald-400", color: "text-emerald-400" },
                { icon: Clock,        label: "Tiempo respuesta",  val: "Menos de 24 horas",          dot: "bg-cyan-400",    color: "text-cyan-400"    },
                { icon: MapPin,       label: "Ubicación",         val: "Colombia 🇨🇴 · Remoto global", dot: "bg-violet-400",  color: "text-violet-400"  },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/[0.05] bg-white/[0.02]">
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.dot}`} />
                  <div className="min-w-0">
                    <p className="text-[8px] font-mono text-white/22 uppercase tracking-widest mb-0.5">{item.label}</p>
                    <p className={`text-[10px] font-mono ${item.color} truncate`}>{item.val}</p>
                  </div>
                </div>
              ))}

              <a href="/JESUS-CHARRIS.pdf" target="_blank" rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 w-full px-5 py-3 mt-2 rounded-xl border border-white/10 bg-white/[0.03] hover:border-violet-500/35 hover:bg-violet-500/[0.08] transition-all duration-300">
                <Download className="h-3.5 w-3.5 text-white/35 group-hover:text-violet-400 transition-colors" />
                <span className="font-mono text-[10px] text-white/35 group-hover:text-white/70 tracking-widest uppercase transition-colors">Descargar CV</span>
              </a>
            </div>

            {/* ── RIGHT: Bio + Skills ── */}
            <div className="flex-1 min-w-0">
              <div style={reveal(180)}>
                <div className="flex items-center gap-2 text-[10px] font-mono text-violet-400/55 tracking-widest uppercase mb-4">
                  <span className="w-5 h-px bg-gradient-to-r from-violet-500 to-transparent" />
                  Sobre mí
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight mb-4"
                  style={{ fontFamily: "'Syne',sans-serif" }}>
                  Especialista en Marketing,
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">
                    Web e IA Aplicada
                  </span>
                </h2>
                <p className="text-white/35 text-sm leading-relaxed max-w-2xl"
                  style={{ fontFamily: "'DM Mono',monospace", fontWeight: 300 }}>
                  Especialista en marketing digital, automatización, desarrollo web y producción audiovisual
                  con enfoque en inteligencia artificial aplicada a negocios. Convierto ideas en crecimiento
                  sostenible — estrategia, ejecución y tecnología para resultados medibles.
                </p>
              </div>

              {/* Skills grid */}
              <div style={reveal(300)} className="mt-8">
                <p className="text-[9px] font-mono text-white/18 tracking-widest uppercase mb-3">Especialidades</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {SKILLS.map((skill, i) => {
                    const Icon = skill.icon
                    return (
                      <div key={i}
                        className={`group flex items-center gap-2.5 p-3 rounded-xl border ${skill.border} ${skill.bg} hover:brightness-125 transition-all duration-300 cursor-default`}>
                        <Icon className={`h-4 w-4 shrink-0 ${skill.color}`} />
                        <span className="text-[10px] font-mono text-white/45 group-hover:text-white/70 leading-tight transition-colors">
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

        {/* ── Skills ticker ── */}
        <div className="relative z-10 border-t border-white/[0.04] py-3.5 overflow-hidden">
          <div className="flex ticker-inner whitespace-nowrap">
            {[...TICKER, ...TICKER].map((s, i) => (
              <span key={i} className="inline-flex items-center gap-3 mx-5">
                <span className="text-[9px] font-mono text-white/18 uppercase tracking-widest">{s}</span>
                <span className="w-1 h-1 rounded-full bg-violet-500/25" />
              </span>
            ))}
          </div>
        </div>

        {/* ── Scroll cue ── */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 opacity-30">
          <span className="text-[8px] font-mono text-white/50 tracking-[.2em] uppercase">Scroll</span>
          <div className="w-px h-7 bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </section>
    </>
  )
}