"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, ChevronDown, Sparkles } from "lucide-react"

// ─── Config — cambia estos valores ───────────────────────────────────
// Pon aquí tus mejores clips en orden de impacto visual
const REEL_CLIPS = [
  "/twinz.mp4",
  "/ZUME.mp4",
  "/oldmoney.mp4",
  "/1002.mp4",
  "/DISCOLANDIA.mp4",
]

const WHATSAPP_NUMBER  = "573043819731"
const WHATSAPP_MESSAGE = "🎬 ¡Hola Jesus! Vi tu showreel y quiero hablar sobre mi proyecto 🚀"

// ─── Showreel Hero ────────────────────────────────────────────────────

export function ShowreelHero() {
  const videoRef        = useRef<HTMLVideoElement>(null)
  const [clipIdx, setClipIdx]   = useState(0)
  const [muted, setMuted]       = useState(true)
  const [playing, setPlaying]   = useState(true)
  const [visible, setVisible]   = useState(false)   // stagger trigger
  const [fade, setFade]         = useState(true)    // clip crossfade

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  // Entrance animation
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  // Auto-advance clips
  const nextClip = () => {
    setFade(false)
    setTimeout(() => {
      setClipIdx(i => (i + 1) % REEL_CLIPS.length)
      setFade(true)
    }, 400)
  }

  // Play/pause
  useEffect(() => {
    if (!videoRef.current) return
    if (playing) videoRef.current.play().catch(() => {})
    else videoRef.current.pause()
  }, [playing, clipIdx])

  const toggleMute  = () => setMuted(m => !m)
  const togglePlay  = () => setPlaying(p => !p)
  const scrollDown  = () => {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" })
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Mono:wght@300;400&display=swap');

        @keyframes fade-up   { from { opacity:0; transform:translateY(28px) } to { opacity:1; transform:translateY(0) } }
        @keyframes fade-in   { from { opacity:0 } to { opacity:1 } }
        @keyframes line-grow { from { width:0 } to { width:100% } }
        @keyframes bob       { 0%,100% { transform:translateY(0) } 50% { transform:translateY(6px) } }
        @keyframes scan      { 0% { top:-8px } 100% { top:100% } }

        .reveal-1  { opacity:0; animation: fade-up 0.9s cubic-bezier(.22,1,.36,1) 0.2s forwards }
        .reveal-2  { opacity:0; animation: fade-up 0.9s cubic-bezier(.22,1,.36,1) 0.5s forwards }
        .reveal-3  { opacity:0; animation: fade-up 0.9s cubic-bezier(.22,1,.36,1) 0.8s forwards }
        .reveal-4  { opacity:0; animation: fade-up 0.9s cubic-bezier(.22,1,.36,1) 1.1s forwards }
        .reveal-5  { opacity:0; animation: fade-in 1.2s ease 1.5s forwards }
        .line-anim { width:0;   animation: line-grow 1s cubic-bezier(.22,1,.36,1) 0.6s forwards }
        .bob-anim  { animation: bob 2s ease-in-out infinite }
      `}</style>

      <section className="relative w-full h-screen min-h-[600px] max-h-[1000px] overflow-hidden bg-black">

        {/* ── Video background ── */}
        <div className={`absolute inset-0 transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"}`}>
          <video
            ref={videoRef}
            key={REEL_CLIPS[clipIdx]}
            src={REEL_CLIPS[clipIdx]}
            muted={muted}
            loop={REEL_CLIPS.length === 1}
            playsInline
            autoPlay
            preload="auto"
            onEnded={nextClip}
            className="w-full h-full object-cover"
          />
        </div>

        {/* ── Overlays ── */}
        {/* Dark vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30 pointer-events-none" />

        {/* Scanline texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.4) 3px,rgba(0,0,0,0.4) 4px)" }} />

        {/* Moving scan beam */}
        <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-violet-500/30 to-transparent pointer-events-none"
          style={{ animation:"scan 6s linear infinite" }} />

        {/* ── Clip progress dots ── */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {REEL_CLIPS.map((_, i) => (
            <button key={i} onClick={() => { setFade(false); setTimeout(() => { setClipIdx(i); setFade(true) }, 300) }}
              className={`rounded-full transition-all duration-500 ${i === clipIdx ? "w-6 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/25 hover:bg-white/50"}`} />
          ))}
        </div>

        {/* ── Main content ── */}
        <div className="relative z-10 h-full flex flex-col justify-end pb-16 sm:pb-20 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">

          {visible && (
            <div className="max-w-3xl">

              {/* Eyebrow */}
              <div className="reveal-1 flex items-center gap-3 mb-5">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10">
                  <Sparkles className="h-2.5 w-2.5 text-violet-400" />
                  <span className="text-[9px] font-mono text-violet-400 tracking-[0.2em] uppercase">Showreel 2024</span>
                </div>
                <div className="line-anim h-px bg-gradient-to-r from-violet-500/60 to-transparent max-w-[120px]" />
              </div>

              {/* Headline */}
              <h1 className="reveal-2 font-black text-white leading-[0.92] tracking-tight mb-2"
                style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(2.8rem, 8vw, 6.5rem)" }}>
                Contenido que
              </h1>
              <h1 className="reveal-3 font-black leading-[0.92] tracking-tight mb-6"
                style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(2.8rem, 8vw, 6.5rem)" }}>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-400">
                  impacta.
                </span>
              </h1>

              {/* Sub */}
              <p className="reveal-4 text-white/45 text-sm sm:text-base leading-relaxed max-w-md mb-8"
                style={{ fontFamily:"'DM Mono', monospace", fontWeight:300 }}>
                Producción audiovisual tradicional + Inteligencia Artificial.<br />
                Para marcas que no quieren pasar desapercibidas.
              </p>

              {/* CTAs */}
              <div className="reveal-5 flex flex-wrap items-center gap-3">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 group-hover:from-violet-500 group-hover:to-fuchsia-500 transition-all duration-300" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background:"radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1), transparent 70%)" }} />
                  <Sparkles className="relative z-10 h-3.5 w-3.5 text-white" />
                  <span className="relative z-10 font-mono text-xs text-white tracking-wider uppercase">Iniciar proyecto</span>
                </a>

                <button onClick={scrollDown}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/15 bg-white/[0.05] backdrop-blur-sm hover:bg-white/10 hover:border-white/25 transition-all duration-300">
                  <span className="font-mono text-xs text-white/60 tracking-wider uppercase">Ver trabajo</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Video controls (top right) ── */}
        <div className="absolute top-5 right-5 z-20 flex items-center gap-2">
          <button onClick={toggleMute}
            className="p-2 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 hover:bg-black/60 hover:border-white/20 transition-all">
            {muted
              ? <VolumeX className="h-3.5 w-3.5 text-white/50" />
              : <Volume2 className="h-3.5 w-3.5 text-white/70" />}
          </button>
          <button onClick={togglePlay}
            className="p-2 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 hover:bg-black/60 hover:border-white/20 transition-all">
            {playing
              ? <Pause className="h-3.5 w-3.5 text-white/50" />
              : <Play  className="h-3.5 w-3.5 text-white/70 ml-px" />}
          </button>
        </div>

        {/* ── Scroll down indicator ── */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 bob-anim cursor-pointer"
          onClick={scrollDown}>
          <span className="text-[9px] font-mono text-white/25 tracking-[0.2em] uppercase">Scroll</span>
          <ChevronDown className="h-4 w-4 text-white/25" />
        </div>

        {/* ── Bottom right — clip counter ── */}
        <div className="absolute bottom-6 right-6 z-20">
          <span className="font-mono text-[10px] text-white/20">
            {String(clipIdx + 1).padStart(2, "0")} / {String(REEL_CLIPS.length).padStart(2, "0")}
          </span>
        </div>

      </section>
    </>
  )
}
