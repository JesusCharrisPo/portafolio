"use client"

import Link from "next/link"
import { BarChart3, Globe, Sparkles, Video, MessageCircle, ChevronRight } from "lucide-react"
import { useState, useRef, MouseEvent } from "react"
import { motion } from "framer-motion"

// ─── Data ─────────────────────────────────────────────────────────────

const valuePoints = [
  { icon: BarChart3, text: "Business Analytics y Embudos Multicanal" },
  { icon: Globe, text: "Sitios Web de Alto Rendimiento" },
  { icon: Sparkles, text: "IA Aplicada a Negocios" },
  { icon: Video, text: "Producción Audiovisual Profesional" },
]

const WHATSAPP_NUMBER = "573019132001"
const WHATSAPP_MESSAGE =
  "🚀 ¡Hola Jesus! 👋 Vi tu portafolio y me interesa una *consulta gratuita* para mi proyecto 💡 ¿Podemos agendar una llamada? 📞✨"

// ─── Spotlight Value Card ─────────────────────────────────────────────

function ValueCard({ point, index }: { point: (typeof valuePoints)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setSpotlightPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 + index * 0.12, duration: 0.6, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      {/* Spotlight border glow */}
      <div
        className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: isHovered
            ? `radial-gradient(150px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(0,255,200,0.25), transparent 60%)`
            : "none",
        }}
      />

      <div className="relative flex flex-col items-center gap-3 p-5 sm:p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-500 overflow-hidden h-full">
        {/* Inner spotlight */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(120px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(0,255,200,0.05), transparent 60%)`,
            }}
          />
        )}

        <point.icon className="h-7 w-7 sm:h-8 sm:w-8 text-cyan-400 drop-shadow-[0_0_10px_rgba(0,255,200,0.4)] transition-transform duration-300 group-hover:scale-110" />
        <span className="text-xs sm:text-sm text-white/50 text-center font-mono tracking-wide group-hover:text-white/70 transition-colors">
          {point.text}
        </span>

        {/* Corner accents */}
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-cyan-500/0 group-hover:border-cyan-500/20 transition-colors duration-500" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-cyan-500/0 group-hover:border-cyan-500/20 transition-colors duration-500" />
      </div>
    </motion.div>
  )
}

// ─── Main Hero ────────────────────────────────────────────────────────

export function Hero() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center pt-16 bg-[#07080d] overflow-hidden">
      {/* ── Background effects ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Main glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[800px] h-[400px] sm:h-[600px] bg-cyan-500/[0.04] rounded-full blur-[100px] sm:blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[400px] bg-purple-600/[0.03] rounded-full blur-[80px] sm:blur-[120px]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        {/* Scanlines */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
          }}
        />

        {/* Floating particles (decorative lines) */}
        <div className="absolute top-[20%] left-[10%] w-px h-20 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />
        <div className="absolute top-[40%] right-[15%] w-px h-16 bg-gradient-to-b from-transparent via-purple-500/20 to-transparent" />
        <div className="absolute bottom-[30%] left-[20%] w-px h-24 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent" />
        <div className="absolute top-[60%] right-[8%] w-px h-12 bg-gradient-to-b from-transparent via-cyan-500/15 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* ── Status Badge ── */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/[0.05] mb-6 sm:mb-8"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_rgba(0,255,200,0.6)]" />
            <span className="text-[10px] sm:text-xs font-mono text-cyan-400 tracking-widest uppercase">
              Disponible para proyectos
            </span>
          </motion.div>

          {/* ── Name ── */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight font-mono tracking-tight"
          >
            Jesus{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-purple-500">
              Charris
            </span>
          </motion.h1>

          {/* ── Subtitle ── */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl text-white/40 font-mono tracking-wide"
          >
            Estrategia de{" "}
            <span className="text-cyan-400/80">Marketing Digital</span>
            {", "}
            <span className="text-purple-400/80">Desarrollo Web</span>
            {" y "}
            <span className="text-cyan-400/80">Producción Audiovisual</span>
            {" con IA"}
          </motion.p>

          {/* ── Description ── */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-white/30 max-w-3xl mx-auto leading-relaxed"
          >
            Convierto ideas en crecimiento sostenible: estrategia, ejecución y tecnología para resultados medibles
          </motion.p>

          {/* ── Decorative line ── */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 sm:mt-8 mx-auto w-40 sm:w-60 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"
          />

          {/* ── CTA Buttons ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            {/* WhatsApp Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 font-mono text-xs sm:text-sm tracking-wider uppercase overflow-hidden w-full sm:w-auto justify-center"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-cyan-500/10 border border-cyan-500/30 backdrop-blur-sm transition-all duration-300 group-hover:from-cyan-500/30 group-hover:to-cyan-500/20 group-hover:border-cyan-400/50" />
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400/60 rounded-tl-xl" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400/60 rounded-br-xl" />
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-cyan-500/[0.08] blur-xl" />

              <MessageCircle className="relative z-10 h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
              <span className="relative z-10 text-cyan-300 group-hover:text-cyan-200 transition-colors">
                Solicitar Consulta
              </span>
            </a>

            {/* Ver Servicios Button */}
            <Link
              href="#servicios"
              className="group relative inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 font-mono text-xs sm:text-sm tracking-wider uppercase overflow-hidden w-full sm:w-auto justify-center"
            >
              <div className="absolute inset-0 rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm transition-all duration-300 group-hover:border-white/[0.15] group-hover:bg-white/[0.04]" />

              <span className="relative z-10 text-white/50 group-hover:text-white/70 transition-colors">
                Ver Servicios
              </span>
              <ChevronRight className="relative z-10 h-4 w-4 text-white/30 group-hover:text-white/50 group-hover:translate-x-0.5 transition-all" />
            </Link>
          </motion.div>

          {/* ── Value Points Grid ── */}
          <div className="mt-14 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {valuePoints.map((point, index) => (
              <ValueCard key={index} point={point} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom fade to next section ── */}
      <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-32 bg-gradient-to-t from-[#07080d] to-transparent pointer-events-none" />
    </section>
  )
}