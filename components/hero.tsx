"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { ArrowRight, Sparkles, Code2, Film, Zap, Megaphone, Target, BarChart2, TrendingUp, Lightbulb, Download, CheckCircle2 } from "lucide-react"

const WHATSAPP_URL = "https://wa.me/573043819731?text=%F0%9F%9A%80%20%C2%A1Hola%20Jesus!%20Vi%20tu%20portafolio%20y%20quiero%20una%20consulta%20gratuita"

const ROLES = ["Marketing Digital", "Desarrollo Web", "Producción Audiovisual", "IA Aplicada"]

const SKILLS = [
  { icon: Megaphone,  label: "Marketing",    color: "#a78bfa" },
  { icon: Target,     label: "Conversión",   color: "#e879f9" },
  { icon: Code2,      label: "Web Dev",      color: "#22d3ee" },
  { icon: Film,       label: "Audiovisual",  color: "#f472b6" },
  { icon: Sparkles,   label: "IA",           color: "#fbbf24" },
  { icon: BarChart2,  label: "Analytics",    color: "#34d399" },
  { icon: TrendingUp, label: "Growth",       color: "#38bdf8" },
  { icon: Lightbulb,  label: "Estrategia",   color: "#fb7185" },
]

const STATS = [
  { val: "50+", label: "Proyectos" },
  { val: "30+", label: "Clientes"  },
  { val: "5+",  label: "Años"      },
  { val: "98%", label: "Satisf."   },
]

// ── Holographic canvas ────────────────────────────────────────────────
function HoloCanvas({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef  = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => { mouseRef.current = { x: mouseX, y: mouseY } }, [mouseX, mouseY])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!
    let raf: number
    let W = window.innerWidth, H = window.innerHeight
    canvas.width = W; canvas.height = H

    // Grid lines
    type Line = { x1:number; y1:number; x2:number; y2:number; op:number; color:string }
    const HCOLS = ["rgba(139,92,246,", "rgba(6,182,212,", "rgba(217,70,239,"]

    // Particles
    type P = { x:number; y:number; vx:number; vy:number; r:number; op:number; c:string; pulse:number }
    const pts: P[] = Array.from({ length: 70 }, () => ({
      x: Math.random()*W, y: Math.random()*H,
      vx: (Math.random()-.5)*.22, vy: (Math.random()-.5)*.22,
      r: Math.random()*1.8+.3,
      op: Math.random()*.3+.04,
      c: HCOLS[Math.floor(Math.random()*HCOLS.length)],
      pulse: Math.random()*Math.PI*2,
    }))

    let t = 0
    const draw = () => {
      t += 0.008
      ctx.clearRect(0, 0, W, H)

      // Perspective grid — reacts to mouse
      const ox = (mouseRef.current.x - .5) * 60
      const oy = (mouseRef.current.y - .5) * 40
      const horizon = H * .55 + oy

      // Vertical lines
      for (let i = -10; i <= 10; i++) {
        const xBase = W/2 + i*(W/10) + ox
        ctx.beginPath()
        ctx.moveTo(xBase, horizon)
        ctx.lineTo(W/2 + i*(W*1.2) + ox*3, H+50)
        const alpha = Math.max(0, .12 - Math.abs(i)*.008)
        ctx.strokeStyle = `rgba(139,92,246,${alpha})`
        ctx.lineWidth = .8; ctx.stroke()
      }
      // Horizontal lines
      for (let j = 0; j <= 12; j++) {
        const y = horizon + (H - horizon) * Math.pow(j/12, 1.6)
        const alpha = (.12 - j*.008) * Math.max(0, 1)
        if (alpha <= 0) continue
        ctx.beginPath()
        ctx.moveTo(0, y); ctx.lineTo(W, y)
        ctx.strokeStyle = `rgba(6,182,212,${Math.max(0,alpha)})`
        ctx.lineWidth = .6; ctx.stroke()
      }

      // Particles
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.pulse += .03
        if (p.x<0) p.x=W; if (p.x>W) p.x=0
        if (p.y<0) p.y=H; if (p.y>H) p.y=0
        const r = p.r * (1 + Math.sin(p.pulse)*.3)
        const op = p.op * (1 + Math.sin(p.pulse)*.4)
        ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI*2)
        ctx.fillStyle = p.c + op + ")"; ctx.fill()
      })

      // Connections
      pts.forEach((a,i) => pts.slice(i+1).forEach(b => {
        const d = Math.hypot(a.x-b.x, a.y-b.y)
        if (d < 90) {
          ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y)
          ctx.strokeStyle = `rgba(139,92,246,${.04*(1-d/90)})`
          ctx.lineWidth=.4; ctx.stroke()
        }
      }))

      // Scan beam
      const scanY = (Math.sin(t*.4)+1)/2 * H
      const grad = ctx.createLinearGradient(0, scanY-30, 0, scanY+30)
      grad.addColorStop(0, "transparent")
      grad.addColorStop(.5, "rgba(139,92,246,0.04)")
      grad.addColorStop(1, "transparent")
      ctx.fillStyle = grad; ctx.fillRect(0, scanY-30, W, 60)

      raf = requestAnimationFrame(draw)
    }
    draw()

    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight
      canvas.width = W; canvas.height = H
    }
    window.addEventListener("resize", onResize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize) }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}

// ── Holographic photo card ────────────────────────────────────────────
function HoloPhoto({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const rotX =  (mouseY - .5) * -18
  const rotY =  (mouseX - .5) *  22

  return (
    <div className="relative select-none" style={{ perspective: "900px" }}>
      {/* Outer glow */}
      <div className="absolute -inset-6 rounded-3xl opacity-40"
        style={{ background: "radial-gradient(ellipse, rgba(139,92,246,.35) 0%, transparent 70%)", filter: "blur(20px)" }} />

      {/* Card */}
      <div
        className="relative rounded-2xl overflow-hidden border border-violet-500/25 shadow-[0_0_80px_rgba(139,92,246,0.2)]"
        style={{
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          transition: "transform .12s ease-out",
          width: "clamp(220px, 30vw, 300px)",
        }}
      >
        {/* Photo */}
        <img src="/Perfil.jpg" alt="Jesus Charris"
          className="w-full aspect-[3/4] object-cover block" />

        {/* Holographic overlay — shifts with mouse */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(${120 + mouseX*60}deg, rgba(139,92,246,.18) 0%, rgba(6,182,212,.12) 40%, rgba(217,70,239,.15) 80%, transparent 100%)`,
            mixBlendMode: "overlay",
          }} />

        {/* Rainbow sheen */}
        <div className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: `linear-gradient(${mouseX*360}deg, #ff000022, #ff7f0022, #ffff0022, #00ff0022, #0000ff22, #8b00ff22)`,
            mixBlendMode: "screen",
          }} />

        {/* Scan line */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.6) 2px,rgba(0,0,0,.6) 3px)" }} />

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
          <p className="font-black text-white text-base leading-tight" style={{ fontFamily:"'Syne',sans-serif" }}>
            Jesús Charris
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[9px] font-mono text-emerald-400 tracking-widest uppercase">Disponible</span>
          </div>
        </div>

        {/* Corner HUD marks */}
        {["top-2 left-2","top-2 right-2","bottom-2 left-2","bottom-2 right-2"].map((pos,i) => (
          <div key={i} className={`absolute ${pos} w-3 h-3 opacity-50`}
            style={{
              borderTop: i < 2 ? "1px solid rgba(139,92,246,.8)" : "none",
              borderBottom: i >= 2 ? "1px solid rgba(139,92,246,.8)" : "none",
              borderLeft: i%2===0 ? "1px solid rgba(139,92,246,.8)" : "none",
              borderRight: i%2===1 ? "1px solid rgba(139,92,246,.8)" : "none",
            }} />
        ))}

        {/* HUD label */}
        <div className="absolute top-3 right-3">
          <span className="text-[8px] font-mono text-violet-400/60 tracking-widest">ID://JC.2025</span>
        </div>
      </div>

      {/* Floating skill orbs around the card */}
      {SKILLS.map((skill, i) => {
        const angle = (i / SKILLS.length) * Math.PI * 2
        const rx = 160 + mouseX * 10
        const ry = 130 + mouseY * 8
        const x = Math.cos(angle) * rx
        const y = Math.sin(angle) * ry
        const Icon = skill.icon
        return (
          <div key={i}
            className="absolute flex items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-300 hover:scale-125 cursor-default"
            title={skill.label}
            style={{
              width: 32, height: 32,
              left: "50%", top: "50%",
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              borderColor: skill.color + "40",
              backgroundColor: skill.color + "18",
              boxShadow: `0 0 12px ${skill.color}30`,
            }}
          >
            <Icon style={{ color: skill.color, width: 13, height: 13 }} />
          </div>
        )
      })}
    </div>
  )
}

// ── Role cycler ───────────────────────────────────────────────────────
function RoleCycler() {
  const [idx, setIdx] = useState(0)
  const [show, setShow] = useState(true)

  useEffect(() => {
    const t = setInterval(() => {
      setShow(false)
      setTimeout(() => { setIdx(i => (i+1) % ROLES.length); setShow(true) }, 400)
    }, 2800)
    return () => clearInterval(t)
  }, [])

  return (
    <span className="inline-block"
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0) skewX(0deg)" : "translateY(-14px) skewX(-3deg)",
        transition: "all .4s cubic-bezier(.22,1,.36,1)",
        background: "linear-gradient(135deg, #a78bfa, #e879f9, #22d3ee)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
      }}>
      {ROLES[idx]}
    </span>
  )
}

// ── Main Hero ─────────────────────────────────────────────────────────
export function Hero() {
  const [mouse, setMouse]   = useState({ x: .5, y: .5 })
  const [show, setShow]     = useState(false)

  useEffect(() => { setTimeout(() => setShow(true), 100) }, [])

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })
  }, [])

  const s = (d: number): React.CSSProperties => ({
    opacity: show ? 1 : 0,
    transform: show ? "none" : "translateY(24px)",
    transition: `opacity .9s ease ${d}ms, transform .9s cubic-bezier(.22,1,.36,1) ${d}ms`,
  })

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Mono:wght@300;400&display=swap');
        @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .tk { animation: ticker 32s linear infinite }
        .tk:hover { animation-play-state:paused }
      `}</style>

      <section id="inicio" className="relative min-h-screen bg-[#03030a] overflow-hidden flex flex-col"
        onMouseMove={onMouseMove}>

        <HoloCanvas mouseX={mouse.x} mouseY={mouse.y} />

        {/* Radial vignette */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(3,3,10,.85) 100%)" }} />
        {/* Top/bottom fades */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#03030a] to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#03030a] to-transparent pointer-events-none" />

        {/* ── Content ── */}
        <div className="relative z-10 flex-1 flex items-center">
          <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-14 py-28 sm:py-32">
            <div className="flex flex-col xl:flex-row items-center gap-12 xl:gap-20">

              {/* ── TEXT SIDE ── */}
              <div className="flex-1 min-w-0 text-center xl:text-left">

                {/* HUD badge */}
                <div style={s(0)} className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/[0.07] mb-7">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[9px] font-mono text-emerald-400 tracking-[.18em] uppercase">SYS:ONLINE // Disponible para proyectos</span>
                </div>

                {/* Name */}
                <h1 style={{ ...s(80), fontFamily:"'Syne',sans-serif", fontSize:"clamp(3.5rem,10vw,8rem)" }}
                  className="font-black text-white leading-[.86] tracking-tight mb-4">
                  Jesus<br />
                  <span style={{ WebkitTextStroke:"2px rgba(139,92,246,.4)", color:"transparent" }}>Charris</span>
                </h1>

                {/* Role */}
                <div style={{ ...s(180), fontFamily:"'Syne',sans-serif", fontSize:"clamp(1.1rem,3vw,2rem)", fontWeight:900 }}
                  className="mb-6 leading-tight">
                  <RoleCycler />
                </div>

                {/* Bio — single clean line, no repeat */}
                <p style={{ ...s(260), fontFamily:"'DM Mono',monospace", fontWeight:300, fontSize:"clamp(.78rem,1.3vw,.88rem)" }}
                  className="text-white/35 mb-9 max-w-md mx-auto xl:mx-0 leading-relaxed">
                  Estrategia · Ejecución · Tecnología.<br />
                  Transformo ideas en resultados medibles con IA, web y producción audiovisual.
                </p>

                {/* CTAs */}
                <div style={s(340)} className="flex flex-wrap gap-3 justify-center xl:justify-start mb-10">
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 group-hover:from-violet-500 group-hover:to-fuchsia-500 transition-all" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background:"radial-gradient(circle at 50% 50%,rgba(255,255,255,.15),transparent 70%)" }} />
                    <Sparkles className="relative z-10 h-4 w-4 text-white" />
                    <span className="relative z-10 font-mono text-xs text-white font-bold tracking-wider uppercase">Consulta gratuita</span>
                    <ArrowRight className="relative z-10 h-3.5 w-3.5 text-white/70 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a href="#servicios"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/[0.09] bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/20 transition-all font-mono text-xs text-white/45 hover:text-white/75 tracking-wider uppercase">
                    <Zap className="h-3.5 w-3.5" />Ver servicios
                  </a>
                  <a href="/JESUS-CHARRIS.pdf" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-white/[0.07] bg-white/[0.02] hover:border-violet-500/30 hover:bg-violet-500/[0.06] transition-all font-mono text-xs text-white/35 hover:text-white/65 tracking-wider uppercase">
                    <Download className="h-3.5 w-3.5" />CV
                  </a>
                </div>

                {/* Stats row */}
                <div style={s(420)} className="flex items-center gap-5 sm:gap-8 justify-center xl:justify-start flex-wrap">
                  {STATS.map((st, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div>
                        <p className="font-black text-white leading-none"
                          style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(1.4rem,2.5vw,1.8rem)" }}>
                          <span style={{ background:"linear-gradient(135deg,#a78bfa,#22d3ee)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                            {st.val}
                          </span>
                        </p>
                        <p className="text-[9px] font-mono text-white/25 mt-0.5 tracking-wide">{st.label}</p>
                      </div>
                      {i < STATS.length-1 && <div className="w-px h-7 bg-white/[0.06]" />}
                    </div>
                  ))}
                </div>

                {/* Status pills */}
                <div style={s(500)} className="flex flex-wrap gap-2 mt-8 justify-center xl:justify-start">
                  {[
                    { icon: CheckCircle2, label: "Proyectos remotos globales",   color: "text-emerald-400", dot: "bg-emerald-400" },
                    { icon: Zap,          label: "Respuesta < 24h",              color: "text-cyan-400",    dot: "bg-cyan-400"    },
                    { icon: Sparkles,     label: "Consulta inicial gratuita",    color: "text-violet-400",  dot: "bg-violet-400"  },
                  ].map((p, i) => (
                    <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02]">
                      <span className={`w-1 h-1 rounded-full ${p.dot}`} />
                      <span className={`text-[9px] font-mono ${p.color} tracking-wide`}>{p.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── HOLO PHOTO SIDE ── */}
              <div style={s(150)} className="shrink-0 flex items-center justify-center">
                <HoloPhoto mouseX={mouse.x} mouseY={mouse.y} />
              </div>

            </div>
          </div>
        </div>

        {/* ── Ticker ── */}
        <div className="relative z-10 border-t border-white/[0.04] py-3 overflow-hidden shrink-0">
          <div className="tk flex whitespace-nowrap">
            {[...ROLES, ...SKILLS.map(s=>s.label), ...ROLES, ...SKILLS.map(s=>s.label)].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-3 mx-6">
                <span className="text-[9px] font-mono text-white/15 uppercase tracking-[.18em]">{item}</span>
                <span className="w-px h-3 bg-violet-500/20" />
              </span>
            ))}
          </div>
        </div>

        {/* ── Scroll cue ── */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
          style={{ opacity:.3, animation:"float 2.5s ease-in-out infinite" }}>
          <span className="text-[8px] font-mono text-white/40 tracking-[.22em] uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-violet-400/50 to-transparent" />
        </div>
      </section>
    </>
  )
}