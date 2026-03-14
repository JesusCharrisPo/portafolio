"use client"

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
  { value: 5, suffix: "+", label: "Años Exp." },
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

// ─── Skill Card ──────────────────────────────────────────────────────

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
    setSpotlightPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
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
      <div
        className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: isHovered
            ? `radial-gradient(120px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(0,255,200,0.3), transparent 60%)`
            : "none",
        }}
      />

      <div className="relative flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-500 overflow-hidden">
        <skill.icon className="h-6 w-6 text-cyan-400" />

        <span className="text-xs text-white/50 text-center font-mono tracking-wide">
          {skill.label}
        </span>
      </div>
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────

export function About() {
  return (
    <section id="sobre-mi" className="relative py-24 bg-[#07080d] overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Image */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative aspect-square max-w-sm">

              <img
                src="/Perfil.jpg"
                alt="Jesus Charris"
                className="rounded-2xl object-cover"
              />

            </div>
          </motion.div>

          {/* Content */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >

            <h2 className="text-4xl font-bold text-white mb-6 font-mono">
              Jesús{" "}
              <span className="text-cyan-400">
                Charris
              </span>
            </h2>

            <p className="text-white/60 mb-6">
              Especialista en marketing digital, automatización, desarrollo web
              y producción audiovisual con enfoque en inteligencia artificial
              aplicada a negocios.
            </p>

            {/* Stats */}

            <div className="grid grid-cols-4 gap-4 mb-10">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-white/40">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Skills */}

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
              {skills.map((skill, index) => (
                <SkillCard key={index} skill={skill} index={index} />
              ))}
            </div>

            {/* BOTÓN DESCARGAR CV */}

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >

              <a
                href="/JESUS-CHARRIS.pdf"
                download
                target="_blank"
                className="group relative inline-flex items-center gap-3 px-8 py-4 font-mono text-sm uppercase border border-cyan-500/40 rounded-xl hover:bg-cyan-500/10 transition"
              >

                <Download className="h-5 w-5 text-cyan-400" />

                <span className="text-cyan-300">
                  Descargar CV
                </span>

              </a>

            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}