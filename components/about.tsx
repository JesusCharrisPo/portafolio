"use client"

import { Button } from "@/components/ui/button"
import {
  BarChart3,
  Code,
  Lightbulb,
  Megaphone,
  Sparkles,
  Target,
  TrendingUp,
  Video,
  Download,
} from "lucide-react"
import Link from "next/link"
import { useState, useRef, useEffect, MouseEvent } from "react"
import { motion, useInView, animate } from "framer-motion"

// ─── Skills Data ──────────────────────────────────────────────────────

const skills = [
  { icon: Megaphone, label: "Marketing Digital Estratégico" },
  { icon: Target, label: "Tráfico y Conversión" },
  { icon: Code, label: "Desarrollo Web" },
  { icon: Video, label: "Producción Audiovisual" },
  { icon: Sparkles, label: "Inteligencia Artificial" },
  { icon: BarChart3, label: "Analytics y Métricas" },
  { icon: TrendingUp, label: "Growth Hacking" },
  { icon: Lightbulb, label: "Estrategia de Negocio" },
]

// ─── Stats Data ───────────────────────────────────────────────────────

const stats = [
  { value: 50, suffix: "+", label: "Proyectos" },
  { value: 30, suffix: "+", label: "Clientes" },
  { value: 3, suffix: "+", label: "Años Exp." },
  { value: 98, suffix: "%", label: "Satisfacción" },
]

// ─── Animated Counter ─────────────────────────────────────────────────

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (!isInView) return
    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => setCount(Math.round(v)),
    })
    return () => controls.stop()
  }, [isInView, value])

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  )
}

// ─── Spotlight Skill Card ─────────────────────────────────────────────

function SkillCard({
  skill,
  index,
}: {
  skill: (typeof skills)[0]
  index: number
}) {
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
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
            ? `radial-gradient(120px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(0,255,200,0.3), transparent 60%)`
            : "none",
        }}
      />

      {/* Card */}
      <div className="relative flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-500 overflow-hidden">
        {/* Inner spotlight */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(100px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(0,255,200,0.06), transparent 60%)`,
            }}
          />
        )}

        <skill.icon className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,200,0.4)] transition-all duration-300 group-hover:scale-110" />
        <span className="text-[10px] sm:text-xs text-white/50 text-center font-mono tracking-wide group-hover:text-white/70 transition-colors">
          {skill.label}
        </span>

        {/* Corner accents */}
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500/0 group-hover:border-cyan-500/30 transition-colors duration-500" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500/0 group-hover:border-cyan-500/30 transition-colors duration-500" />
      </div>
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────

export function About() {
  return (
    <section id="sobre-mi" className="relative py-16 sm:py-24 bg-[#07080d] overflow-hidden">
      {/* ── Background effects ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-cyan-500/[0.03] rounded-full blur-[80px] sm:blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-purple-600/[0.03] rounded-full blur-[70px] sm:blur-[100px]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Scanlines */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Badge ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/[0.05] mb-4 sm:mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] sm:text-xs font-mono text-cyan-400 tracking-widest uppercase">
              Sobre Mí
            </span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
          {/* ── Image Section ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-sm mx-auto lg:mx-0">
              {/* Glow behind image */}
              <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 rounded-2xl blur-2xl" />

              {/* Image container */}
<div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm aspect-square">
  <img
    src="/Perfil.jpg"
    alt="Jesus Charris"
    className="w-full h-full object-cover"
  />

  {/* Overlay gradient */}
  <div className="absolute inset-0 bg-gradient-to-t from-[#07080d]/60 via-transparent to-transparent" />

  {/* Scanline on image */}
  <div
    className="absolute inset-0 opacity-[0.04] pointer-events-none"
    style={{
      backgroundImage:
        "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)",
    }}
  />
</div>

              {/* Corner decorations */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-cyan-500/40 rounded-tl-lg" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-cyan-500/40 rounded-br-lg" />
              <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-purple-500/30 rounded-tr-lg" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-purple-500/30 rounded-bl-lg" />

              {/* Floating status badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-cyan-500/30 bg-[#0c0d14]/90 backdrop-blur-xl"
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                  <span className="text-[10px] sm:text-xs font-mono text-white/70 tracking-wider">
                    Disponible
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* ── Content ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 font-mono tracking-tight">
              Jesús{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Charris
              </span>
            </h2>

            <div className="space-y-4 mb-8">
              <p className="text-white/50 leading-relaxed text-sm sm:text-base">
                Soy un especialista integral en{" "}
                <span className="text-cyan-400/80">marketing digital estratégico</span>,
                tráfico y conversión, desarrollo web y producción audiovisual, con un
                enfoque práctico en{" "}
                <span className="text-purple-400/80">inteligencia artificial</span>{" "}
                aplicada a negocios.
              </p>
              <p className="text-white/40 leading-relaxed text-sm sm:text-base">
                Mi valor diferencial radica en combinar una visión de negocio clara con
                ejecución técnica y creativa. Utilizo IA para optimizar procesos,
                acelerar lanzamientos y obtener resultados medibles para mis clientes.
              </p>
            </div>

            {/* ── Stats Counter ── */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-8 sm:mb-10">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="relative text-center p-2 sm:p-3 rounded-lg border border-white/[0.06] bg-white/[0.02]"
                >
                  <div className="text-lg sm:text-2xl lg:text-3xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 to-cyan-500">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-[9px] sm:text-[10px] font-mono text-white/30 tracking-wider uppercase mt-1">
                    {stat.label}
                  </div>
                  {/* Top line accent */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
                </motion.div>
              ))}
            </div>

            {/* ── Skills Grid ── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-8 sm:mb-10">
              {skills.map((skill, index) => (
                <SkillCard key={index} skill={skill} index={index} />
              ))}
            </div>

            {/* ── CTA Button ── */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Link
                href="#contacto"
                className="group relative inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 font-mono text-xs sm:text-sm tracking-wider uppercase overflow-hidden"
              >
                {/* Button bg */}
                <div className="absolute inset-0 rounded-xl border border-cyan-500/30 bg-cyan-500/[0.06] backdrop-blur-sm transition-all duration-300 group-hover:bg-cyan-500/[0.12] group-hover:border-cyan-400/50" />
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400/60 rounded-tl-xl" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400/60 rounded-br-xl" />

                <Download className="relative z-10 h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
                <span className="relative z-10 text-cyan-300 group-hover:text-cyan-200 transition-colors">
                  Descargar CV
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}