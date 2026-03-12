"use client"

import { useState, useRef, useEffect } from "react"
import {
  Play,
  Sparkles,
  Zap,
  Cpu,
  X,
  Volume2,
  VolumeX,
  ChevronRight,
  MessageCircle,
} from "lucide-react"

// ─── Config ───────────────────────────────────────────────────────────

// 🔧 CAMBIA ESTA URL por la de tu video IA
const VIDEO_URL = "/PARDELOCOS.mp4"

const WHATSAPP_NUMBER = "573019132001"
const WHATSAPP_MESSAGE =
  "🤖 ¡Hola Jesus! 👋 Vi tu demo de *IA Aplicada a Producción Audiovisual* y quiero algo así para mi marca. ¿Podemos hablar? 🚀"

// ─── Datos de las métricas animadas ──────────────────────────────────

const stats = [
  { value: "100%", label: "Generado con IA", icon: Cpu },
  { value: "0$", label: "Costo de estudio", icon: Zap },
  { value: "48h", label: "Tiempo de entrega", icon: Sparkles },
]

// ─── Partícula flotante decorativa ───────────────────────────────────

function FloatingOrb({
  size,
  color,
  style,
}: {
  size: number
  color: string
  style?: React.CSSProperties
}) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        background: color,
        filter: `blur(${size * 0.6}px)`,
        ...style,
      }}
    />
  )
}

// ─── Línea de datos animada (HUD) ────────────────────────────────────

function HUDLine({ text, delay = 0 }: { text: string; delay?: number }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  return (
    <div
      className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] tracking-widest"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-8px)",
        transition: "all 0.5s ease",
      }}
    >
      <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
      <span className="text-cyan-400/60">{text}</span>
    </div>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────

export function AIVideoShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const modalVideoRef = useRef<HTMLVideoElement>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  // Autoplay del video de fondo (muted, loop)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [])

  // Progreso del video en modal
  useEffect(() => {
    const v = modalVideoRef.current
    if (!v) return
    const update = () => setProgress((v.currentTime / v.duration) * 100 || 0)
    v.addEventListener("timeupdate", update)
    return () => v.removeEventListener("timeupdate", update)
  }, [isModalOpen])

  const openModal = () => {
    setIsModalOpen(true)
    setHasStarted(true)
    setTimeout(() => {
      if (modalVideoRef.current) {
        modalVideoRef.current.play().catch(() => {})
        setIsPlaying(true)
      }
    }, 100)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    if (modalVideoRef.current) {
      modalVideoRef.current.pause()
      setIsPlaying(false)
    }
  }

  const toggleMute = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const togglePlay = () => {
    if (modalVideoRef.current) {
      if (isPlaying) {
        modalVideoRef.current.pause()
      } else {
        modalVideoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <section
      id="ia-video-showcase"
      className="relative py-0 bg-[#03040a] overflow-hidden min-h-screen flex flex-col items-center justify-center"
    >
      {/* ── Keyframes ── */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px) }
          to   { opacity: 1; transform: translateY(0) }
        }
        @keyframes fadeSlideLeft {
          from { opacity: 0; transform: translateX(24px) }
          to   { opacity: 1; transform: translateX(0) }
        }
        @keyframes scanH {
          0%   { transform: translateY(-100%) }
          100% { transform: translateY(100vh) }
        }
        @keyframes scanV {
          0%   { transform: translateX(-100%) }
          100% { transform: translateX(100vw) }
        }
        @keyframes glitch1 {
          0%,95%,100% { clip-path: none; transform: none }
          96% { clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%); transform: translateX(-3px) }
          97% { clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%); transform: translateX(3px) }
          98% { clip-path: polygon(0 10%, 100% 10%, 100% 30%, 0 30%); transform: translateX(-2px) }
        }
        @keyframes borderGlow {
          0%,100% { box-shadow: 0 0 15px rgba(34,211,238,0.2), inset 0 0 15px rgba(34,211,238,0.05) }
          50% { box-shadow: 0 0 30px rgba(168,85,247,0.3), inset 0 0 30px rgba(168,85,247,0.08) }
        }
        @keyframes progressPulse {
          0%,100% { opacity: 1 }
          50% { opacity: 0.5 }
        }
        @keyframes orb1 {
          0%,100% { transform: translate(0,0) scale(1) }
          33% { transform: translate(30px,-20px) scale(1.1) }
          66% { transform: translate(-20px,30px) scale(0.9) }
        }
        @keyframes orb2 {
          0%,100% { transform: translate(0,0) scale(1) }
          33% { transform: translate(-30px,20px) scale(0.9) }
          66% { transform: translate(20px,-30px) scale(1.1) }
        }
      `}</style>

      {/* ── Orbs de fondo ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{ animation: "orb1 12s ease-in-out infinite" }}>
          <FloatingOrb size={500} color="rgba(34,211,238,0.04)" style={{ top: "10%", left: "5%" }} />
        </div>
        <div style={{ animation: "orb2 15s ease-in-out infinite" }}>
          <FloatingOrb size={600} color="rgba(168,85,247,0.05)" style={{ bottom: "10%", right: "5%" }} />
        </div>
        <FloatingOrb size={200} color="rgba(34,211,238,0.06)" style={{ top: "40%", right: "20%" }} />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34,211,238,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Scan lines */}
        <div
          className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent pointer-events-none"
          style={{ animation: "scanH 8s linear infinite" }}
        />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">

        {/* ── Badge superior ── */}
        <div
          className="flex justify-center mb-8 sm:mb-10"
          style={{ animation: "fadeSlideUp 0.6s ease both" }}
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-cyan-400/25 bg-cyan-500/[0.06] backdrop-blur-md">
            <Cpu className="h-3.5 w-3.5 text-cyan-400" />
            <span className="text-[10px] sm:text-xs font-mono text-cyan-300 tracking-[0.2em] uppercase font-semibold">
              Inteligencia Artificial Aplicada
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          </div>
        </div>

        {/* ── Título principal ── */}
        <div
          className="text-center mb-10 sm:mb-14"
          style={{ animation: "fadeSlideUp 0.7s ease 0.1s both" }}
        >
          <h2
            className="text-4xl sm:text-6xl lg:text-7xl font-black font-mono tracking-tight text-white leading-[0.95] mb-4"
            style={{ animation: "glitch1 6s ease-in-out infinite" }}
          >
            El Futuro de la{" "}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400">
              Producción Visual
            </span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto text-xs sm:text-sm font-mono leading-relaxed mt-4">
            Contenido cinematográfico generado 100% con Inteligencia Artificial.
            Sin estudio. Sin equipo. Sin límites.
          </p>
        </div>

        {/* ── VIDEO HERO ── */}
        <div
          className="relative max-w-4xl mx-auto mb-12 sm:mb-16"
          style={{ animation: "fadeSlideUp 0.8s ease 0.2s both" }}
        >
          {/* Marco exterior con glow animado */}
          <div
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden"
            style={{ animation: "borderGlow 4s ease-in-out infinite" }}
          >
            {/* Línea superior */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent z-20" />
            {/* Línea inferior */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent z-20" />

            {/* Esquinas HUD */}
            {[
              "top-0 left-0 border-t-2 border-l-2 rounded-tl-2xl",
              "top-0 right-0 border-t-2 border-r-2 rounded-tr-2xl",
              "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-2xl",
              "bottom-0 right-0 border-b-2 border-r-2 rounded-br-2xl",
            ].map((cls, i) => (
              <div
                key={i}
                className={`absolute w-5 h-5 sm:w-7 sm:h-7 border-cyan-400/50 z-20 ${cls}`}
              />
            ))}

            {/* Video de fondo (muted loop, preview) */}
            <div className="relative aspect-video bg-[#03040a]">
              <video
                ref={videoRef}
                src={VIDEO_URL}
                muted
                loop
                playsInline
                preload="metadata"
                onLoadedMetadata={(e) => {
                  (e.currentTarget as HTMLVideoElement).currentTime = 0
                }}
                className="w-full h-full object-cover opacity-60"
              />

              {/* Overlay degradado */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#03040a]/80 via-transparent to-[#03040a]/30" />

              {/* Scanlines overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34,211,238,0.5) 2px, rgba(34,211,238,0.5) 3px)",
                  backgroundSize: "100% 5px",
                }}
              />

              {/* HUD info - esquina superior izquierda */}
              <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-10 space-y-1">
                <HUDLine text="SYS.AI_RENDER // ACTIVE" delay={800} />
                <HUDLine text="RESOLUTION: 4K_SYNTHETIC" delay={1000} />
                <HUDLine text="MODEL: DIFFUSION_v3.1" delay={1200} />
              </div>

              {/* Badge IA - esquina superior derecha */}
              <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-cyan-400/30 bg-black/60 backdrop-blur-md">
                <Sparkles className="h-3 w-3 text-cyan-400 animate-pulse" />
                <span className="text-[9px] font-mono text-cyan-300 tracking-wider">100% IA</span>
              </div>

              {/* Botón PLAY central */}
              <button
                onClick={openModal}
                className="absolute inset-0 flex items-center justify-center z-10 group"
              >
                <div className="relative">
                  {/* Anillo exterior pulsante */}
                  <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30 scale-150 animate-ping opacity-30" />
                  <div className="absolute inset-0 rounded-full border border-purple-400/20 scale-125 animate-pulse" />

                  {/* Botón principal */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-cyan-400/60 bg-black/60 backdrop-blur-md flex items-center justify-center group-hover:border-cyan-300 group-hover:bg-black/80 group-hover:scale-110 transition-all duration-300 shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                    <Play className="h-6 w-6 sm:h-8 sm:w-8 text-cyan-300 ml-1 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                  </div>
                </div>
              </button>

              {/* Texto play */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 text-center">
                <span className="text-[10px] sm:text-xs font-mono text-white/40 tracking-widest uppercase">
                  Reproducir Demo IA
                </span>
              </div>
            </div>
          </div>

          {/* Reflexión/sombra debajo del video */}
          <div
            className="absolute -bottom-6 left-8 right-8 h-12 rounded-full opacity-20 blur-xl pointer-events-none"
            style={{
              background: "linear-gradient(90deg, rgba(34,211,238,0.4), rgba(168,85,247,0.4))",
            }}
          />
        </div>

        {/* ── Stats row ── */}
        <div
          className="grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl mx-auto mb-12 sm:mb-16"
          style={{ animation: "fadeSlideUp 0.8s ease 0.35s both" }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="relative flex flex-col items-center gap-1.5 p-3 sm:p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm group hover:border-cyan-500/20 transition-colors duration-300"
            >
              <stat.icon className="h-4 w-4 text-cyan-400/60 group-hover:text-cyan-400 transition-colors" />
              <span className="text-xl sm:text-3xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                {stat.value}
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono text-white/30 tracking-wider text-center uppercase">
                {stat.label}
              </span>
              {/* Glow en hover */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(circle at center, rgba(34,211,238,0.04), transparent 70%)" }}
              />
            </div>
          ))}
        </div>

        {/* ── CTAs ── */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          style={{ animation: "fadeSlideUp 0.8s ease 0.45s both" }}
        >
          {/* CTA principal */}
          <button
            onClick={openModal}
            className="group relative inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 font-mono text-xs sm:text-sm tracking-wider uppercase rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 w-full sm:w-auto justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/25 to-purple-500/25 border border-cyan-500/40 transition-all duration-500 group-hover:from-cyan-500/35 group-hover:to-purple-500/35 group-hover:border-cyan-300/70 shadow-[0_0_20px_rgba(34,211,238,0.15)] group-hover:shadow-[0_0_35px_rgba(34,211,238,0.3)]" />
            <Play className="relative z-10 h-4 w-4 text-cyan-400 group-hover:text-cyan-300" />
            <span className="relative z-10 text-white/90 group-hover:text-white font-semibold">
              Ver Demo Completo
            </span>
          </button>

          {/* CTA WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 font-mono text-xs sm:text-sm tracking-wider uppercase rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 w-full sm:w-auto justify-center"
          >
            <div className="absolute inset-0 border border-white/[0.08] bg-white/[0.02] transition-all duration-300 group-hover:border-purple-500/30 group-hover:bg-purple-500/[0.05]" />
            <MessageCircle className="relative z-10 h-4 w-4 text-purple-400 group-hover:text-purple-300" />
            <span className="relative z-10 text-white/60 group-hover:text-white/90">
              Quiero esto para mi marca
            </span>
            <ChevronRight className="relative z-10 h-3.5 w-3.5 text-white/30 group-hover:text-purple-400 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          MODAL DE REPRODUCCIÓN COMPLETA
      ══════════════════════════════════════════ */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-md"
          onClick={closeModal}
          style={{ animation: "fadeSlideUp 0.2s ease both" }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl rounded-2xl border border-cyan-500/20 bg-[#03040a] overflow-hidden shadow-[0_0_60px_rgba(34,211,238,0.1)]"
          >
            {/* Top glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

            {/* Header del modal */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg border border-cyan-500/20 bg-cyan-500/[0.08] flex items-center justify-center">
                  <Cpu className="h-3.5 w-3.5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-[9px] font-mono text-cyan-400/70 tracking-widest uppercase">
                    Demo · IA Generativa
                  </p>
                  <h3 className="text-xs sm:text-sm font-bold font-mono text-white/90">
                    El Futuro de la Producción Visual
                  </h3>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Video */}
            <div className="relative bg-black aspect-video">
              <video
                ref={modalVideoRef}
                src={VIDEO_URL}
                playsInline
                className="w-full h-full object-contain"
              />

              {/* Scanlines sutiles */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34,211,238,0.5) 2px, rgba(34,211,238,0.5) 3px)",
                  backgroundSize: "100% 5px",
                }}
              />
            </div>

            {/* Barra de progreso */}
            <div className="h-[2px] bg-white/[0.05] relative">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300"
                style={{
                  width: `${progress}%`,
                  boxShadow: "0 0 8px rgba(34,211,238,0.6)",
                }}
              />
            </div>

            {/* Controles */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-t border-white/[0.06] bg-black/40">
              <div className="flex items-center gap-3">
                {/* Play/Pause */}
                <button
                  onClick={togglePlay}
                  className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 hover:bg-cyan-500/10 hover:border-cyan-500/30 flex items-center justify-center transition-all"
                >
                  {isPlaying ? (
                    <div className="flex gap-[3px]">
                      <div className="w-[3px] h-3.5 bg-cyan-400 rounded-full" />
                      <div className="w-[3px] h-3.5 bg-cyan-400 rounded-full" />
                    </div>
                  ) : (
                    <Play className="h-3.5 w-3.5 text-cyan-400 ml-0.5" />
                  )}
                </button>

                {/* Mute */}
                <button
                  onClick={toggleMute}
                  className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all"
                >
                  {isMuted ? (
                    <VolumeX className="h-3.5 w-3.5 text-white/40" />
                  ) : (
                    <Volume2 className="h-3.5 w-3.5 text-white/70" />
                  )}
                </button>

                <span className="text-[10px] font-mono text-white/25 tracking-wider">
                  {Math.round(progress)}%
                </span>
              </div>

              {/* CTA dentro del modal */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg border border-purple-500/30 bg-purple-500/[0.08] hover:bg-purple-500/[0.15] transition-all"
              >
                <MessageCircle className="h-3.5 w-3.5 text-purple-400" />
                <span className="text-[10px] font-mono text-purple-300 tracking-wider uppercase hidden sm:block">
                  Quiero esto
                </span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
