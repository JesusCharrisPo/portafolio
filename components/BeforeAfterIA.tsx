"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Sparkles, Video, ArrowLeftRight, Zap, MessageCircle } from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────

type CompareItem = {
  id: number
  label: string
  tag: string
  before: { src: string; type: "video" | "image"; caption: string }
  after:  { src: string; type: "video" | "image"; caption: string }
}

// ─── Data — reemplaza los src con tus archivos reales ─────────────────

const items: CompareItem[] = [
  {
    id: 1,
    label: "Lanzamiento Urbano",
    tag: "Producción física → IA",
    before: { src: "/twinz.mp4",   type: "video", caption: "Grabado en set — cámara real" },
    after:  { src: "/1002.mp4",    type: "video", caption: "Potenciado con efectos de IA" },
  },
  {
    id: 2,
    label: "Beauty Campaign",
    tag: "Raw footage → CGI IA",
    before: { src: "/ZUME.mp4",    type: "video", caption: "Video original sin edición IA" },
    after:  { src: "/cepillo .mp4", type: "video", caption: "Simulación de fluidos + CGI" },
  },
  {
    id: 3,
    label: "Visualizer Musical",
    tag: "Concepto → Animación IA",
    before: { src: "/OXXO.mp4",    type: "video", caption: "Clip urbano tradicional" },
    after:  { src: "/0930.mp4",    type: "video", caption: "Visualizer cinematográfico IA" },
  },
]

const WHATSAPP_NUMBER  = "573043819731"
const WHATSAPP_MESSAGE = "🎬 ¡Hola Jesus! Quiero potenciar mi contenido con IA 🚀"

// ─── Draggable Slider ─────────────────────────────────────────────────

function CompareSlider({ item }: { item: CompareItem }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const beforeVideoRef = useRef<HTMLVideoElement>(null)
  const afterVideoRef  = useRef<HTMLVideoElement>(null)
  const [pos, setPos]          = useState(50)           // 0–100 %
  const [dragging, setDragging] = useState(false)
  const [hinted, setHinted]    = useState(false)        // auto-animate hint on mount
  const [bothReady, setBothReady] = useState(false)
  const readyCount = useRef(0)

  // Entrance hint animation — wiggles the handle once
  useEffect(() => {
    const t1 = setTimeout(() => setHinted(true),  600)
    const t2 = setTimeout(() => setHinted(false), 1800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [item.id])

  // Sync videos: both play/pause together
  useEffect(() => {
    readyCount.current = 0
    setBothReady(false)
    const onReady = () => {
      readyCount.current += 1
      if (readyCount.current >= 2) setBothReady(true)
    }
    beforeVideoRef.current?.addEventListener("canplay", onReady, { once: true })
    afterVideoRef.current?.addEventListener("canplay",  onReady, { once: true })
  }, [item.id])

  useEffect(() => {
    if (!bothReady) return
    beforeVideoRef.current?.play().catch(() => {})
    afterVideoRef.current?.play().catch(() => {})
  }, [bothReady])

  const getPos = useCallback((clientX: number) => {
    if (!containerRef.current) return 50
    const { left, width } = containerRef.current.getBoundingClientRect()
    return Math.min(100, Math.max(0, ((clientX - left) / width) * 100))
  }, [])

  // Mouse
  const onMouseDown = (e: React.MouseEvent) => { e.preventDefault(); setDragging(true) }
  useEffect(() => {
    const move = (e: MouseEvent) => { if (dragging) setPos(getPos(e.clientX)) }
    const up   = () => setDragging(false)
    window.addEventListener("mousemove", move)
    window.addEventListener("mouseup",   up)
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up) }
  }, [dragging, getPos])

  // Touch
  const onTouchStart = (e: React.TouchEvent) => { setDragging(true); setPos(getPos(e.touches[0].clientX)) }
  useEffect(() => {
    const move = (e: TouchEvent) => { if (dragging) { e.preventDefault(); setPos(getPos(e.touches[0].clientX)) } }
    const up   = () => setDragging(false)
    window.addEventListener("touchmove", move, { passive: false })
    window.addEventListener("touchend",  up)
    return () => { window.removeEventListener("touchmove", move); window.removeEventListener("touchend", up) }
  }, [dragging, getPos])

  const MediaEl = ({ side }: { side: "before" | "after" }) => {
    const data = item[side]
    const ref  = side === "before" ? beforeVideoRef : afterVideoRef
    if (data.type === "video") return (
      <video ref={ref} src={data.src} muted loop playsInline preload="auto"
        className="absolute inset-0 w-full h-full object-cover" />
    )
    return <img src={data.src} alt={data.caption} className="absolute inset-0 w-full h-full object-cover" />
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[9/16] sm:aspect-video rounded-2xl overflow-hidden cursor-col-resize select-none"
      style={{ touchAction: "none" }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      {/* ── BEFORE (full) ── */}
      <div className="absolute inset-0">
        <MediaEl side="before" />
        {/* Label */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-sm border border-white/10">
          <Video className="h-3 w-3 text-white/60" />
          <span className="text-[10px] font-mono text-white/70 uppercase tracking-widest">Sin IA</span>
        </div>
        <div className="absolute bottom-4 left-4 z-10">
          <p className="text-[10px] font-mono text-white/40">{item.before.caption}</p>
        </div>
      </div>

      {/* ── AFTER (clipped) ── */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <MediaEl side="after" />
        {/* Glow tint */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-transparent to-cyan-500/10 pointer-events-none" />
        {/* Label */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-600/80 backdrop-blur-sm border border-violet-400/30">
          <Sparkles className="h-3 w-3 text-violet-200" />
          <span className="text-[10px] font-mono text-violet-100 uppercase tracking-widest">Con IA</span>
        </div>
        <div className="absolute bottom-4 right-4 z-10 text-right">
          <p className="text-[10px] font-mono text-violet-300/70">{item.after.caption}</p>
        </div>
      </div>

      {/* ── Divider line ── */}
      <div
        className="absolute top-0 bottom-0 w-px bg-white/80 z-20 pointer-events-none shadow-[0_0_12px_rgba(255,255,255,0.4)]"
        style={{ left: `${pos}%` }}
      />

      {/* ── Handle ── */}
      <div
        className={`absolute top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 transition-transform duration-150
          ${dragging ? "scale-110" : "scale-100"}
          ${hinted ? "animate-[nudge_0.6s_ease-in-out_2]" : ""}`}
        style={{ left: `${pos}%` }}
      >
        {/* Outer ring pulse */}
        <div className={`absolute inset-0 rounded-full bg-white/20 ${dragging ? "" : "animate-ping"} opacity-40`}
          style={{ transform: "scale(1.6)" }} />

        <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-[0_0_24px_rgba(255,255,255,0.3)] flex items-center justify-center">
          <ArrowLeftRight className="h-4 w-4 sm:h-5 sm:w-5 text-[#07080d]" strokeWidth={2.5} />
        </div>

        {/* Top/bottom line extensions */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 w-px h-6 bg-white/60" />
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-px h-6 bg-white/60" />
      </div>

      {/* Drag hint on first load */}
      {!dragging && pos === 50 && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <p className="text-[9px] font-mono text-white/30 tracking-widest uppercase text-center animate-pulse">
            ← arrastra →
          </p>
        </div>
      )}
    </div>
  )
}

// ─── Main Section ──────────────────────────────────────────────────────

export function BeforeAfterIA() {
  const [active, setActive] = useState(0)
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap');
        @keyframes nudge {
          0%,100% { transform: translate(-50%,-50%) translateX(0) }
          25%      { transform: translate(-50%,-50%) translateX(-10px) }
          75%      { transform: translate(-50%,-50%) translateX(10px) }
        }
        @keyframes glow-in {
          from { opacity:0; transform:translateY(16px) }
          to   { opacity:1; transform:translateY(0) }
        }
        .glow-in { animation: glow-in 0.7s ease forwards }
      `}</style>

      <section className="relative py-20 sm:py-28 bg-[#060709] overflow-hidden">

        {/* ── Background ── */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-violet-700/[0.07] rounded-full blur-[130px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-cyan-700/[0.04] rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-fuchsia-700/[0.04] rounded-full blur-[100px]" />
          {/* Grid */}
          <div className="absolute inset-0 opacity-[0.018]"
            style={{ backgroundImage:"linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px)", backgroundSize:"44px 44px" }} />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Header ── */}
          <div className="text-center mb-12 sm:mb-16 glow-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/25 bg-violet-500/[0.07] mb-6">
              <Zap className="h-3 w-3 text-violet-400" />
              <span className="text-[10px] font-mono text-violet-400 tracking-widest uppercase">Poder de la IA</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-none mb-4"
              style={{ fontFamily:"'Syne',sans-serif" }}>
              Antes
              <span className="mx-3 sm:mx-4 text-transparent bg-clip-text bg-gradient-to-r from-white/20 to-white/20" style={{ WebkitTextStroke:"1px rgba(255,255,255,0.15)" }}>vs</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">Después</span>
            </h2>

            <p className="text-white/35 max-w-xl mx-auto text-sm leading-relaxed">
              Arrastra el slider y descubre la diferencia que hace la Inteligencia Artificial en cada producción
            </p>
          </div>

          {/* ── Tab selector ── */}
          <div className="flex justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 flex-wrap">
            {items.map((item, i) => (
              <button key={item.id} onClick={() => setActive(i)}
                className={`relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-mono text-[10px] sm:text-xs tracking-wider uppercase transition-all duration-300 ${
                  active === i
                    ? "text-white border border-violet-500/40 bg-violet-500/15 shadow-[0_0_20px_rgba(139,92,246,0.2)]"
                    : "text-white/25 border border-white/[0.06] bg-white/[0.02] hover:text-white/45 hover:border-white/10"
                }`}>
                {active === i && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-px bg-gradient-to-r from-transparent via-violet-400 to-transparent" />
                )}
                <span className="text-white/20 mr-1.5">{String(i+1).padStart(2,"0")}</span>
                {item.label}
              </button>
            ))}
          </div>

          {/* ── Slider area ── */}
          <div className="max-w-3xl mx-auto">
            {/* Tag */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-violet-500/20" />
              <span className="text-[10px] font-mono text-violet-400/60 bg-violet-500/[0.07] border border-violet-500/15 px-3 py-1 rounded-full">
                {items[active].tag}
              </span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-violet-500/20" />
            </div>

            {/* The slider itself */}
            <CompareSlider key={active} item={items[active]} />

            {/* Side labels below */}
            <div className="flex justify-between mt-4 px-1">
              <div className="flex items-center gap-1.5">
                <Video className="h-3 w-3 text-white/20" />
                <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Sin IA</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono text-violet-400/60 uppercase tracking-widest">Con IA</span>
                <Sparkles className="h-3 w-3 text-violet-400/60" />
              </div>
            </div>
          </div>

          {/* ── What's different callout ── */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { icon: "⚡", title: "Sin rodaje extra", desc: "Transformamos tu footage existente con IA sin volver a grabar." },
              { icon: "🎨", title: "Estética premium", desc: "CGI, efectos de luz y simulaciones que elevan cualquier video." },
              { icon: "🚀", title: "Entrega rápida", desc: "Producción IA 3x más rápida que el flujo tradicional." },
            ].map((f, i) => (
              <div key={i} className="group p-4 rounded-xl border border-white/[0.05] bg-white/[0.02] hover:border-violet-500/20 hover:bg-violet-500/[0.04] transition-all duration-300">
                <div className="text-xl mb-2">{f.icon}</div>
                <h4 className="text-xs font-bold text-white/70 font-mono mb-1">{f.title}</h4>
                <p className="text-[10px] text-white/30 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* ── CTA ── */}
          <div className="mt-12 text-center">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-mono text-xs tracking-wider uppercase hover:scale-105 transition-transform duration-300 overflow-hidden">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600/20 to-cyan-500/15 border border-violet-500/35
                group-hover:from-violet-600/30 group-hover:to-cyan-500/25 group-hover:border-violet-400/55 transition-all duration-300" />
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-violet-400/60 rounded-tl-xl" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400/60 rounded-br-xl" />
              <Zap className="relative z-10 h-4 w-4 text-violet-400 group-hover:text-violet-300 transition-colors" />
              <span className="relative z-10 text-white/70 group-hover:text-white/95 transition-colors">
                Quiero esto para mi marca
              </span>
            </a>
            <p className="mt-3 text-[10px] font-mono text-white/18">Respuesta en menos de 24h · WhatsApp directo</p>
          </div>

        </div>
      </section>
    </>
  )
}
